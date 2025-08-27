import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../api.js";
import jwt_decode from "jwt-decode";
// import { jwtDecode } from "jwt-decode";

export const login = createAsyncThunk("auth/login", async (payload, { rejectWithValue }) => {
  try {
    const { data } = await api.post("/api/auth/login", payload);
    return data;
  } catch (e) { return rejectWithValue(e.response?.data || { message: "Login failed" }); }
});

export const register = createAsyncThunk("auth/register", async (payload, { rejectWithValue }) => {
  try {
    const { data } = await api.post("/api/auth/register", payload);
    return data;
  } catch (e) { return rejectWithValue(e.response?.data || { message: "Register failed" }); }
});

const slice = createSlice({
  name: "auth",
  initialState: { user: null, token: localStorage.getItem("token") || null, status: "idle", error: null },
  reducers: {
    logout(state){ state.user=null; state.token=null; localStorage.removeItem("token"); },
    bootstrap(state){
      const token = localStorage.getItem("token");
      if (token) {
        try { const decoded = jwt_decode(token); state.user = { id: decoded.id, role: decoded.role }; state.token = token; }
        catch { localStorage.removeItem("token"); }
      }
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.fulfilled, (state, action) => {
        state.token = action.payload.token; localStorage.setItem("token", state.token);
        state.user = action.payload.user; state.status = "succeeded"; state.error = null;
      })
      .addCase(login.rejected, (state, action) => { state.status="failed"; state.error = action.payload?.message; })
      .addCase(register.fulfilled, (state, action) => {
        state.token = action.payload.token; localStorage.setItem("token", state.token);
        state.user = action.payload.user; state.status = "succeeded"; state.error = null;
      })
      .addCase(register.rejected, (state, action) => { state.status="failed"; state.error = action.payload?.message; });
  }
});

export const { logout, bootstrap } = slice.actions;
export default slice.reducer;
