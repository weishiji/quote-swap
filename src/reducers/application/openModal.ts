import { ApplicationModal, SET_OPEN_MODAL, TSetOpenModalActions } from '@/actions/application';
import produce, { Draft } from 'immer';

export default produce(
  (draft: Draft<ApplicationModal>, action: TSetOpenModalActions): ApplicationModal => {
    switch (action.type) {
      case SET_OPEN_MODAL:
        return action.payload;
      default:
        return draft;
    }
  },
  null
);
