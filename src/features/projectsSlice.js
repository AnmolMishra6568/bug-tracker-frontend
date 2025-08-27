import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../api.js";

export const fetchProjects = createAsyncThunk("projects/fetch", async (_, { rejectWithValue }) => {
  try {
    const { data } = await api.get("/api/projects");
    return data;
  } catch (e) {
    return rejectWithValue(e.response?.data || { message: "Failed to fetch projects" });
  }
});

export const createProject = createAsyncThunk("projects/create", async (payload, { rejectWithValue }) => {
  try {
    const { data } = await api.post("/api/projects", payload);
    return data;
  } catch (e) {
    return rejectWithValue(e.response?.data || { message: "Failed to create project" });
  }
});

export const updateProject = createAsyncThunk("projects/update", async ({ id, updates }, { rejectWithValue }) => {
  try {
    const { data } = await api.patch(`/api/projects/${id}`, updates);
    return data;
  } catch (e) {
    return rejectWithValue(e.response?.data || { message: "Failed to update project" });
  }
});

export const deleteProject = createAsyncThunk("projects/delete", async (id, { rejectWithValue }) => {
  try {
    await api.delete(`/api/projects/${id}`);
    return id;
  } catch (e) {
    return rejectWithValue(e.response?.data || { message: "Failed to delete project" });
  }
});

const slice = createSlice({
  name: "projects",
  initialState: { items: [], status: "idle", error: null },
  reducers: {},
  extraReducers: (b) => {
    b.addCase(fetchProjects.pending, (s) => { s.status = "loading"; s.error = null; })
     .addCase(fetchProjects.fulfilled, (s, a) => { s.items = a.payload; s.status = "succeeded"; })
     .addCase(fetchProjects.rejected, (s, a) => { s.status = "failed"; s.error = a.payload?.message || "Failed"; })

     .addCase(createProject.fulfilled, (s, a) => { s.items.unshift(a.payload); })
     .addCase(updateProject.fulfilled, (s, a) => {
        const i = s.items.findIndex(p => p._id === a.payload._id);
        if (i !== -1) s.items[i] = a.payload;
     })
     .addCase(deleteProject.fulfilled, (s, a) => {
        s.items = s.items.filter(p => p._id !== a.payload);
     });
  }
});

export default slice.reducer;
