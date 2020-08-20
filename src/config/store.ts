import form from "features/MultiStageForm/formUtils/form";
import {
  Action,
  ThunkAction,
  configureStore,
  combineReducers,
} from "@reduxjs/toolkit";
import {
  createBrowserStorage,
  getGlobalState,
} from "features/MultiStageForm/formUtils/persist-state";

createBrowserStorage();

const rootReducer = combineReducers({
  form,
});

const store = configureStore({
  reducer: rootReducer,
  preloadedState: {
    form: getGlobalState(),
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof rootReducer>;
export type AppThunk = ThunkAction<void, RootState, null, Action<string>>;

export default store;
