import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../api.js";

export const fetchUsers = createAsyncThunk("users/fetch", async () => {
  const { data } = await api.get("/api/users");
  return data;
});

const slice = createSlice({
  name: "users",
  initialState: { items: [] },
  reducers: {},
  extraReducers: (b) => {
    b.addCase(fetchUsers.fulfilled, (s, a) => { s.items = a.payload; });
  }
});
export default slice.reducer;
