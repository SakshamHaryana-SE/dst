import {
  GO_BACK_SET,
  RESET_REDUX,
  LOADER_SET,
  NOTIFY_SET,
  USER_SET,
} from './actions';

export const DEFAULT_USER = {
  phone: '',
};

export const goBack = (state = [], action) => {
  switch (action.type) {
    case GO_BACK_SET: {
      return action.data.filter((item, pos) => action.data[pos - 1] !== item);
    }
    case RESET_REDUX:
      return [];
    default:
      return state;
  }
};

export const loader = (state = false, action) => {
  switch (action.type) {
    case LOADER_SET:
      return action.data;

    default:
      return state;
  }
};

export const notify = (state = {}, action) => {
  switch (action.type) {
    case NOTIFY_SET:
      return action.state;

    default:
      return state;
  }
};

export const user = (state = DEFAULT_USER, action) => {
  switch (action.type) {
    case USER_SET:
      return action.user;
    case RESET_REDUX: {
      const userData = DEFAULT_USER;
      return userData;
    }

    default:
      return state;
  }
};
