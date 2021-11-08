import { Dispatch } from 'redux';
import { Call } from '@/utils';

export enum EMulticallActionType {
  ADD_MULTICALL_LISTENERS = 'ADD_MULTICALL_LISTENERS',
  REMOVE_MULTICALL_LISTENERS = 'REMOVE_MULTICALL_LISTENERS',
  FETCHING_MULTICALL_LISTENERS = 'FETCHING_MULTICALL_LISTENERS',
  ERRORFETCHING_MULTICALL_LISTENERS = 'ERRORFETCHING_MULTICALL_LISTENERS',
  UPDATE_MULTICALL_LISTENERS = 'UPDATE_MULTICALL_LISTENERS',
}

export interface MulticallState {
  callListeners?: {
    // on a per-chain basis
    [chainId: number]: {
      // stores for each call key the listeners' preferences
      [callKey: string]: {
        // stores how many listeners there are per each blocks per fetch preference
        [blocksPerFetch: number]: number;
      };
    };
  };

  callResults: {
    [chainId: number]: {
      [callKey: string]: {
        data?: string | null;
        blockNumber?: number;
        fetchingBlockNumber?: number;
      };
    };
  };
}

export interface ListenerOptions {
  // how often this data should be fetched, by default 1
  readonly blocksPerFetch: number;
}

export interface IAddAndRemoveMulticallListenersPayload {
  chainId: number;
  calls: Call[];
  options: ListenerOptions;
}

export interface IFetchingMulticallListenersPayload {
  chainId: number;
  calls: Call[];
  fetchingBlockNumber: number;
}

export interface IUpdateMulticallListenersPayload {
  chainId: number;
  blockNumber: number;
  results: {
    [callKey: string]: string | null;
  };
}

export type TMulticallActions = {
  type: EMulticallActionType;
  payload:
    | IAddAndRemoveMulticallListenersPayload
    | IFetchingMulticallListenersPayload
    | IUpdateMulticallListenersPayload;
};

export const addMulticallListeners =
  (payload: IAddAndRemoveMulticallListenersPayload) => (dispatch: Dispatch<TMulticallActions>) =>
    dispatch({
      type: EMulticallActionType.ADD_MULTICALL_LISTENERS,
      payload,
    });

export const removeMulticallListeners =
  (payload: IAddAndRemoveMulticallListenersPayload) => (dispatch: Dispatch<TMulticallActions>) =>
    dispatch({
      type: EMulticallActionType.REMOVE_MULTICALL_LISTENERS,
      payload,
    });

export const fetchingMulticallResults =
  (payload: IFetchingMulticallListenersPayload) => (dispatch: Dispatch<TMulticallActions>) =>
    dispatch({
      type: EMulticallActionType.FETCHING_MULTICALL_LISTENERS,
      payload,
    });

export const errorFetchingMulticallResults =
  (payload: IFetchingMulticallListenersPayload) => (dispatch: Dispatch<TMulticallActions>) =>
    dispatch({
      type: EMulticallActionType.ERRORFETCHING_MULTICALL_LISTENERS,
      payload,
    });

export const updateMulticallResults =
  (payload: IUpdateMulticallListenersPayload) => (dispatch: Dispatch<TMulticallActions>) =>
    dispatch({
      type: EMulticallActionType.UPDATE_MULTICALL_LISTENERS,
      payload,
    });
