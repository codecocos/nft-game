const initalState = {
  loading: false,
  account: null,
  minToken: null,
  web3: null,
  errorMsg: "",
}

const blockchainReducer = (state = initalState, action) => {
  switch (action.type) {
    case "CONNECTION_REQUEST":
      return {
        ...initalState,
        loading: true,
      }
    case "CONNECTION_SUCCESS":
      return {
        ...state,
        loading: false,
        account: action.payload.account,
        minToken: action.payload.minToken,
        web3: action.payload.web3,
      }
    case "CONNECTION_FAILED":
      return {
        ...initalState,
        loading: false,
        errorMsg: action.payload,
      }
    case "UPDATE_ACCOUNT":
      return {
        ...state,
        account: action.payload.account,
      }
    default:
      return state;
  }
}

export default blockchainReducer;