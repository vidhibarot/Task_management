import * as actionTypes from '../actions';
export const initialState = {
  userData: {},
  token: '',
  isLogin: false,
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_LOGIN_DATA:
      localStorage.setItem('authorization', action.payload);
      localStorage.setItem('isLogin', 'true');
      return {
        ...state,
        token: action.payload,
        isLogin: true
      };
    case actionTypes.SET_USER_DATA:
      return {
        ...state,
        userData: action.payload
      };

    default:
      return state;
  }
};

export default userReducer;
