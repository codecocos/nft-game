// constants
import Web3 from "web3";
import MinToken from "../../contracts/MinToken.json";
// log
// import { fetchData } from "..";

const connectRequest = () => {
  return {
    type: "CONNECTION_REQUEST",
  };
}

const connectSuccess = (payload) => {
  return {
    type: "CONNECTION_SUCCESS",
    payload: payload,
  }
}

const connectFailed = (payload) => {
  return {
    type: "CONNECTION_FAILED",
    payload: payload,
  }
}

const updateAccountRequest = (payload) => {
  return {
    type: "UPDATE_ACCOUNT",
    payload: payload,
  }
}

export const connect = () => {
  return async (dispatch) => {

    dispatch(connectRequest());

    if (window.ethereum) {
      let web3 = new Web3(window.ethereum);
      try {
        const accounts = await window.ethereum.request({
          method: "eth_accounts",
        });
        console.log("Account ", accounts[0]);
        const networkId = await window.ethereum.request({
          method: "net_version"
        });
        console.log("NetworkId ", networkId);
        //const minTokenNetworkData = await MinToken.networks[networkId];

        //if (minTokenNetworkData) {
        if (networkId == 80001) {
          const minToken = new web3.eth.Contract(
            MinToken.abi,
            "0x11eb3AC397457a3292Ffc2Bd5755187eaB8486CD"//minTokenNetworkData.address,
          )
          dispatch(
            connectSuccess({
              account: accounts[0],
              minToken: minToken,
              web3: web3,
            })
          )

          // Add listeners start
          window.ethereum.on("accountsChanged", (accounts) => {
            dispatch(updateAccount(accounts[0]));
          })
          window.ethereum.on("chainChanged", () => {
            window.location.reload();
          })
          // Add listners end
        } else {
          dispatch(connectFailed("Change network to Polygon."));
        }
      } catch (err) {
        dispatch(connectFailed("Something went wrong."))
      }
    } else {
      dispatch(connectFailed("Install Metamask."))
    }
  }
}

export const updateAccount = (account) => {
  return async (dispatch) => {
    dispatch(updateAccountRequest({ account: account }));
    //dispatch(fetchData(account));
  }
}