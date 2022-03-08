const initialState = {
  loading: false,
  allMins: [],
  allOwnerMins: [],
  error: false,
  errorMsg: "",
}

const dataReducer = (state = initialState, action) => {
  switch (action.type) {
    case "CHECK_DATA_REQUEST":
      return {
        ...initialState,
        loading: true,
      }
    case "CHECH_DATA_SUCCESS":
      return {
        ...initialState,
        loading: false,
        allMins: action.payload.allMins,
        allOwnerMins: action.payload.allOwnerMins,
      }
    case "CHECK_DATA_FAILED":
      return {
        ...initialState,
        loading: false,
        error: true,
        errorMsg: action.payload,
      }
    default:
      return state;
  }
}

export default dataReducer;