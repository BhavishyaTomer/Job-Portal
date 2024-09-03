import { createSlice } from "@reduxjs/toolkit";
const jobSlice = createSlice({
    name: "job",
    initialState: {
       allJobs:[]
    },
    reducers: {
        applyJobs: (state, action) => {
            state.allJobs = action.payload;
        }
    }
});
export const { applyJobs } = jobSlice.actions;
export default jobSlice.reducer;