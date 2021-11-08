import { produce, Draft } from 'immer';

import {
  EMulticallActionType,
  MulticallState,
  TMulticallActions,
  IAddAndRemoveMulticallListenersPayload,
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

export default produce(
  (draft: Draft<MulticallState>, { type, payload }: TMulticallActions): MulticallState => {
    console.log(draft, payload);
    switch (type) {
      case EMulticallActionType.ADD_MULTICALL_LISTENERS:
        return addMulticallListeners(draft, payload as IAddAndRemoveMulticallListenersPayload);
      case EMulticallActionType.REMOVE_MULTICALL_LISTENERS:
        return removeMulticallListeners(draft, payload as IAddAndRemoveMulticallListenersPayload);
      default:
        break;
    }
  },
  { callResults: {} }
);
