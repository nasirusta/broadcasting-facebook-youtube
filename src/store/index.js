import { createStore, applyMiddleware, compose, combineReducers } from "redux";
import thunk from "redux-thunk";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import foodReducer from "./reducers/foods";
import faceebookUserReducer from "./reducers/faceebookUser";
import faceebookPagesReducer from "./reducers/faceebookPages";
import broadcastReducer from "./reducers/broadcast";
import broadcastLiveReducer from "./reducers/broadcastLive";

const reducers = combineReducers({
  foods: foodReducer,
  faceebookUser: faceebookUserReducer,
  faceebookPages: faceebookPagesReducer,
  broadcast: broadcastReducer,
  broadcastLive: broadcastLiveReducer,
});

const persistConfig = {
  key: "root",
  storage,
  // blacklist: ["faceebookUser"],
};

const persistedReducer = persistReducer(persistConfig, reducers);
const store = createStore(persistedReducer, compose(applyMiddleware(thunk)));

const persistor = persistStore(store);

export { store, persistor };
