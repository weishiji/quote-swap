import { Dispatch } from 'redux';

const prefix = 'APPLICATION';

export const SET_OPEN_MODAL = `${prefix}_SET_OPEN_MODAL`;

export enum ApplicationModal {
  WALLET = 'WALLET',
}

export type TSetOpenModalActions = {
  type: string;
  payload: ApplicationModal | null;
};

export type TSetOpenModal = (
  payload: ApplicationModal | null
) => (dispatch: Dispatch<TSetOpenModalActions>) => void;

export const setOpenModal: TSetOpenModal = (payload) => (dispatch) => {
  dispatch({
    type: SET_OPEN_MODAL,
    payload,
  });
};
