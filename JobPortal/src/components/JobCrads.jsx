import React from 'react';
import JobTile from './JobTile';
import { useSelector } from 'react-redux';
import Loader from '../service/Loader';

const JobCrads = () => {
    const fetchedJobs = useSelector((state) => state.jobs.filteredJobs);

    // If jobs are not fetched yet, display the loader
    if (fetchedJobs.length === 0) {
        return (
            <div className="flex justify-center items-center h-screen bg-backGround">
                <Loader />
            </div>
        );
    }

    const limitedJobs = fetchedJobs.slice(0, 6);

    return (
        <div className="bg-backGround flex justify-center items-center p-12">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full bg-backGround">
                {limitedJobs.map((data) => {
                    return (
                        <JobTile data={data} key={data._id} />
                    );
                })}
            </div>
        </div>
    );
};

export default JobCrads;
