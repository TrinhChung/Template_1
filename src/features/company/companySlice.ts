import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import customFetch from "../../axios/custom";

export interface Company {
  id: number;
  name: string;
  address: string;
  hotline: string;
  email: string;
  license_no?: string;
  google_map_embed?: string;
  logo_url?: string;
  footer_text?: string;
  description?: string;
  note?: string;
  user_id?: number;
}

export interface CompanyState {
  data: Company | null;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: CompanyState = {
  data: null,
  status: "idle",
  error: null,
};

export const fetchCompany = createAsyncThunk(
  "company/fetchCompany",
  async () => {
    const response = await customFetch.get("/company");
    return response.data;
  }
);

const companySlice = createSlice({
  name: "company",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCompany.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchCompany.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(fetchCompany.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || null;
      });
  },
});

export default companySlice.reducer;
