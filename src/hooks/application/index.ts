import { useCallback } from 'react';
import { useSelector, shallowEqual, useDispatch } from 'react-redux';
import { ApplicationModal, setOpenModal } from '@/actions/application';
import { TRootState } from '@/store';

export const useModalOpen = (modal: ApplicationModal): boolean => {
  const openModal = useSelector((state: TRootState) => state.application.openModal, shallowEqual);
  return modal === openModal;
};

export const useToggleModal = (modal: ApplicationModal): (() => void) => {
  const open = useModalOpen(modal);
  const dispatch = useDispatch();
  return useCallback(() => dispatch(setOpenModal(open ? null : modal)), [dispatch, modal, open]);
};

export function useWalletModalToggle(): () => void {
  return useToggleModal(ApplicationModal.WALLET);
}
