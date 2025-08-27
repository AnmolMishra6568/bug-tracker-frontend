import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../api.js";

export const fetchTickets = createAsyncThunk("tickets/fetch", async (params) => {
  const { data } = await api.get("/api/tickets", { params });
  return data;
});

export const createTicket = createAsyncThunk("tickets/create", async (payload) => {
  const { data } = await api.post("/api/tickets", payload);
  return data;
});

export const updateTicket = createAsyncThunk("tickets/update", async ({ id, updates }) => {
  const { data } = await api.patch(`/api/tickets/${id}`, updates);
  return data;
});

export const deleteTicket = createAsyncThunk("tickets/delete", async (id) => {
  await api.delete(`/api/tickets/${id}`);
  return id;
});

export const resolveTicket = createAsyncThunk("tickets/resolve", async (id) => {
  const { data } = await api.patch(`/api/tickets/${id}`, { status: "resolved" });
  return data;
});

const slice = createSlice({
  name: "tickets",
  initialState: { items: [], status: "idle", filter: {}, error: null },
  reducers: {
    setFilter(s, a){ s.filter = { ...s.filter, ...a.payload }; }
  },
  extraReducers: (b) => {
    b.addCase(fetchTickets.fulfilled, (s, a) => { s.items = a.payload; s.status = "succeeded"; })
     .addCase(createTicket.fulfilled, (s, a) => { s.items.unshift(a.payload); })
     .addCase(updateTicket.fulfilled, (s, a) => {
        const i = s.items.findIndex(t => t._id === a.payload._id);
        if (i !== -1) s.items[i] = a.payload;
     })
     .addCase(deleteTicket.fulfilled, (s, a) => { s.items = s.items.filter(t => t._id !== a.payload); })
     .addCase(resolveTicket.fulfilled, (s, a) => {
        const i = s.items.findIndex(t => t._id === a.payload._id);
        if (i !== -1) s.items[i] = a.payload;
     });
  }
});
export const { setFilter } = slice.actions;
export default slice.reducer;
