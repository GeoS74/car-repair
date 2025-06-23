import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import serviceHost from "../../libs/service.host";
import tokenManager from "../../libs/token.manager";
import fetchWrapper from "../../libs/fetch.wrapper"
import { responseNotIsArray } from "../../middleware/response.validator";


export const fetchStatus = createAsyncThunk(
  'data/fetchData',
  async () => fetchWrapper(_getStatuses)
    .then(responseNotIsArray)
    .then(async res => {
      if (res.ok) {
        return await res.json()
      }
      throw new Error(`error fetch status code ${res.status}`)
    })
);

function _getStatuses() {
  return fetch(`${serviceHost("informator")}/api/informator/status`, {
    headers: {
      'Authorization': `Bearer ${tokenManager.getAccess()}`
    }
  })
}

const initialState: {
  items: IStatus[],
  loading: boolean
  error?: string
} = {
  items: [],
  loading: false,
  error: undefined,
};

const dataSlice = createSlice({
  name: 'status',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchStatus.pending, (state) => {
        state.loading = true;
        state.error = undefined;
      })
      .addCase(fetchStatus.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
  },
});

export default dataSlice.reducer