import React from 'react';
import JobTile from './JobTile';

const JobCrads = () => {
    const cards = [1, 2, 3, 4, 5, 6];
    
    return (
        <div className="bg-backGround flex justify-center items-center p-12">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full bg-backGround">
                {cards.map((data, index) => {
                    return (
                        <JobTile data={data} key={index}/>
                    );
                })}
            </div>
        </div>
    );
};

export default JobCrads;
