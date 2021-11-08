import { Dispatch } from 'redux';

const prefix = 'APPLICATION';

export const UPDATE_BLOCK_NUMBER = `${prefix}_UPDATE_BLOCK_NUMBER`;

export interface ApplicationBlockNumber {
  readonly [chainId: number]: number;
}

export type TUpdateBlockNumberActions = {
  type: string;
  payload: ApplicationBlockNumber;
};

export type TUpdateBlockNumber = (
  payload: ApplicationBlockNumber
) => (dispatch: Dispatch<TUpdateBlockNumberActions>) => void;

export const updateBlockNumber: TUpdateBlockNumber = (payload) => (dispatch) => {
  dispatch({
    type: UPDATE_BLOCK_NUMBER,
    payload,
  });
};
