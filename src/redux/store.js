import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import thunk from "redux-thunk";
import blockchainReducer from './blockchain/blockchainReducer'
import dataReducer from './data/dataReducer'


const rootReducer = combineReducers({
  blockchain: blockchainReducer,
  data: dataReducer,
})

const middleware = [thunk];
const composeEnhancerss = compose(applyMiddleware(...middleware));

const configureStore = () => {
  return createStore(rootReducer, composeEnhancerss);
}

const store = configureStore();

export default store;