import produce, { Draft } from 'immer';

import {
  ApplicationBlockNumber,
  UPDATE_BLOCK_NUMBER,
  TUpdateBlockNumberActions,
} from '@/actions/application';

export default produce(
  (
    draft: Draft<ApplicationBlockNumber>,
    action: TUpdateBlockNumberActions
  ): ApplicationBlockNumber => {
    switch (action.type) {
      case UPDATE_BLOCK_NUMBER:
        return action.payload;
      default:
        return draft;
    }
  },
  {}
);
