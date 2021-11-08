import { produce, Draft } from 'immer';

import {
  EMulticallActionType,
  MulticallState,
  TMulticallActions,
  IAddAndRemoveMulticallListenersPayload,
  IFetchingMulticallListenersPayload,
  IUpdateMulticallListenersPayload,
} from '@/actions/multicall';
import { Call, toCallKey } from '@/utils';

const addMulticallListeners = (
  draft: MulticallState,
  payload: IAddAndRemoveMulticallListenersPayload
) => {
  const {
    calls,
    chainId,
    options: { blocksPerFetch },
  } = payload;
  const listeners: MulticallState['callListeners'] = draft.callListeners ?? {};
  listeners[chainId] = listeners[chainId] ?? {};

  calls.forEach((call: Call) => {
    const callKey = toCallKey(call);
    listeners[chainId][callKey] = listeners[chainId][callKey] ?? {};
    listeners[chainId][callKey][blocksPerFetch] =
      (listeners[chainId][callKey][blocksPerFetch] ?? 0) + 1;
  });
  draft.callListeners = listeners;
  return draft;
};

const removeMulticallListeners = (
  draft: MulticallState,
  payload: IAddAndRemoveMulticallListenersPayload
) => {
  const {
    calls,
    chainId,
    options: { blocksPerFetch },
  } = payload;
  const listeners: MulticallState['callListeners'] = draft.callListeners ?? {};

  if (!listeners[chainId]) return;
  calls.forEach((call: Call) => {
    const callKey = toCallKey(call);
    if (!listeners[chainId][callKey]) return;
    if (!listeners[chainId][callKey][blocksPerFetch]) return;

    if (listeners[chainId][callKey][blocksPerFetch] === 1) {
      delete listeners[chainId][callKey][blocksPerFetch];
    } else {
      listeners[chainId][callKey][blocksPerFetch]--;
    }
  });
  draft.callListeners = listeners;
  return draft;
};

const fetchingMulticallResults = (
  draft: MulticallState,
  payload: IFetchingMulticallListenersPayload
) => {
  const { calls, chainId, fetchingBlockNumber } = payload;
  draft.callResults[chainId] = draft.callResults[chainId] ?? {};
  calls.forEach((call) => {
    const callKey = toCallKey(call);
    const current = draft.callResults[chainId][callKey];
    if (!current) {
      draft.callResults[chainId][callKey] = {
        fetchingBlockNumber,
      };
    } else {
      if ((current.fetchingBlockNumber ?? 0) >= fetchingBlockNumber) return;
      draft.callResults[chainId][callKey].fetchingBlockNumber = fetchingBlockNumber;
    }
  });
  return draft;
};

const errorFetchingMulticallResults = (
  draft: MulticallState,
  payload: IFetchingMulticallListenersPayload
) => {
  const { calls, chainId, fetchingBlockNumber } = payload;
  draft.callResults[chainId] = draft.callResults[chainId] ?? {};
  calls.forEach((call) => {
    const callKey = toCallKey(call);
    const current = draft.callResults[chainId][callKey];
    if (!current || typeof current.fetchingBlockNumber !== 'number') return;
    if (current.fetchingBlockNumber <= fetchingBlockNumber) {
      delete current.fetchingBlockNumber;
      current.data = null;
      current.blockNumber = fetchingBlockNumber;
    }
  });
  return draft;
};

const updateMulticallResults = (
  draft: MulticallState,
  payload: IUpdateMulticallListenersPayload
) => {
  const { chainId, results, blockNumber } = payload;
  draft.callResults[chainId] = draft.callResults[chainId] ?? {};
  Object.keys(results).forEach((callKey) => {
    const current = draft.callResults[chainId][callKey];
    if ((current?.blockNumber ?? 0) > blockNumber) return;
    draft.callResults[chainId][callKey] = {
      data: results[callKey],
      blockNumber,
    };
  });
  return draft;
};

export default produce(
  (draft: Draft<MulticallState>, { type, payload }: TMulticallActions): MulticallState => {
    switch (type) {
      case EMulticallActionType.ADD_MULTICALL_LISTENERS:
        return addMulticallListeners(draft, payload as IAddAndRemoveMulticallListenersPayload);
      case EMulticallActionType.REMOVE_MULTICALL_LISTENERS:
        return removeMulticallListeners(draft, payload as IAddAndRemoveMulticallListenersPayload);
      case EMulticallActionType.FETCHING_MULTICALL_LISTENERS:
        return fetchingMulticallResults(draft, payload as IFetchingMulticallListenersPayload);
      case EMulticallActionType.ERRORFETCHING_MULTICALL_LISTENERS:
        return errorFetchingMulticallResults(draft, payload as IFetchingMulticallListenersPayload);
      case EMulticallActionType.UPDATE_MULTICALL_LISTENERS:
        return updateMulticallResults(draft, payload as IUpdateMulticallListenersPayload);
      default:
        break;
    }
  },
  { callResults: {} }
);
