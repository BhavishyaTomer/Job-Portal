import { createSlice } from "@reduxjs/toolkit";

const jobSlice = createSlice({
    name: "job",
    initialState: {
        allJobs: [],
        filteredJobs: [],
        jobWall: []
    },
    reducers: {
        getJobs: (state, action) => {
            state.allJobs = action.payload;
            state.filteredJobs = action.payload;
            state.jobWall = action.payload;
        },

        filterJobs: (state, action) => {
            const keyword = action.payload.toLowerCase();
            state.filteredJobs = state.allJobs.filter(job =>
                job.description.toLowerCase().includes(keyword)
            );
        },

        filterByLocation: (state, action) => {
            const location = action.payload.toLowerCase();
            state.filteredJobs = state.allJobs.filter(job =>
                job.location.toLowerCase().includes(location)
            );
        },

        filterBySalary: (state, action) => {
            const salaryRange = action.payload; // assuming a range is passed as [min, max]
            state.filteredJobs = state.allJobs.filter(job => {
                const salary = parseInt(job.salary, 10);
                return salary >= salaryRange[0] && salary <= salaryRange[1];
            });
        },

        filterByCreatedAt: (state, action) => {
            const days = action.payload; // number of days
            const now = new Date();
            state.filteredJobs = state.allJobs.filter(job => {
                const jobDate = new Date(job.createdAt);
                const diffTime = Math.abs(now - jobDate);
                const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
                return diffDays <= days;
            });
        },
    }
});

export const { getJobs, filterJobs, filterByLocation, filterBySalary, filterByCreatedAt } = jobSlice.actions;
export default jobSlice.reducer;
