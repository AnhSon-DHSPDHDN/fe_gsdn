import { TypeContextInfoMe } from '../../configs/typeContext'

const initialState = {
  avatar: '',
  _idCustomer: null,
  _idRole: '',
  createBy: null,
  _id: '',
  username: '',
  email: '',
  createdAt: 0,
  __v: 0
}

export const infoMeReducer = (state, action) => {
  switch (action.type) {
    case TypeContextInfoMe.GET_INFO_ME: {
      state = { ...action.data };
      return { ...state }
    }
    case TypeContextInfoMe.CLEAR_INFO_ME: {
      state = { ...initialState }
      return { ...state }
    }
    default: {
      return state
    }
  }
}
