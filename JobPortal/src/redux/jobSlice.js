import { createSlice } from "@reduxjs/toolkit";
const jobSlice = createSlice({
    name: "job",
    initialState: {
       allJobs:[]
    },
    reducers: {
        getJobs: (state, action) => {
            state.allJobs = action.payload;
        }
    }
});
export const { getJobs } = jobSlice.actions;
export default jobSlice.reducer;