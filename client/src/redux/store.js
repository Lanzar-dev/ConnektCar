import { createStore, applyMiddleware, combineReducers } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import { alertsReducer } from "./reducers/alertsReducer";
import { bookingsReducer } from "./reducers/bookingsReducer";
import { carsReducer } from "./reducers/carsReducer";

const composeEnhancers = composeWithDevTools({});

const rootReducer = combineReducers({
  carsReducer,
  alertsReducer,
  bookingsReducer,
});

const middleware = [thunk];

const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(...middleware))
);

export default store;
