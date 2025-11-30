import { configureStore } from "@reduxjs/toolkit";
import stepFormSlice from "./slices/stepFormSlice";
import { suggestionsApi } from "./slices/apiSlices/suggestionApiSlice";
import { postForm } from "./slices/apiSlices/formSubmitSlice";

const appStore = configureStore({
  reducer: {
    currentTab: stepFormSlice,
    [suggestionsApi.reducerPath]: suggestionsApi.reducer,
    postForm: postForm.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      suggestionsApi.middleware,
      postForm.middleware,
    ),
});

export type RootState = ReturnType<typeof appStore.getState>;
export type AppDispatch = typeof appStore.dispatch;

export default appStore;
