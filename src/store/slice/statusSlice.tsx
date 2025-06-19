import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import serviceHost from "../../libs/service.host";

export const fetchStatus = createAsyncThunk(
  'data/fetchData',
  async () => fetch(`${serviceHost("informator")}/api/informator/status`)
  .then(async res => {
    if(res.ok) {
      return await res.json()
    }
    throw new Error(`error fetch status code ${res.status}`)
  })
);



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