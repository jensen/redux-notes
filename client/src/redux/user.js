const USER_SET_NAME = 'USER_SET_NAME';
const USER_SET_COLOR = 'USER_SET_COLOR';

export function setName(name) {
  return {
    type: USER_SET_NAME,
    name
  };
}

export function setColor(color) {
  return {
    type: USER_SET_COLOR,
    color
  };
}

const initialState = {
  name: '',
  color: '#f44336'
};

export default (state = initialState, action) => {
  const { type, name, color } = action;

  if(type === USER_SET_NAME) {
    return {
      ...state,
      name
    };
  }

  if(type === USER_SET_COLOR) {
    return {
      ...state,
      color
    };
  }

  return state;
};
