// log
import store from '../store'

const fetchDataRequest = () => {
  return {
    type: "CHECK_DATA_REQUEST",
  }
}

const fetchDataSuccess = (payload) => {
  return {
    type: "CHECH_DATA_SUCCESS",
    payload: payload,
  }
}

const fetchDataFailed = (payload) => {
  return {
    type: "CHECK_DATA_FAILED",
    payload: payload,
  }
}

export const fetchData = (account) => {
  return async (dispatch) => {
    dispatch(fetchDataRequest());
    try {
      let allMins = await store
        .getState()
        .blockchain.minToken.methods.getMins()
        .call();


      let allOwnerMins = await store
        .getState()
        .blockchain.minToken.methods.getOwnerMins(account)
        .call();

      dispatch(fetchDataSuccess({ allMins: allMins, allOwnerMins: allOwnerMins }))
    } catch (err) {
      dispatch(fetchDataFailed("Could not load data from contract."))
    }
  }
}
