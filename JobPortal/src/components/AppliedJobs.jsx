import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { APllIED_JOB } from '../config/endpoint';
import Loader from '../service/Loader';

const AppliedJobs = () => {
  const [appliedJob, setAppliedJob] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getAppliedJobs = async () => {
      try {
        setIsLoading(true);
        const jobList = await axios.get(APllIED_JOB, { withCredentials: true });
        if (jobList) {
          setAppliedJob(jobList.data.applicationApplied);
        }
      } catch (error) {
        console.error('Error fetching applied jobs:', error);
        setError('Failed to fetch applied jobs. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };
    getAppliedJobs();
  }, []);

  const dateConverter = (date) => {
    return new Date(date).toLocaleDateString();
  };

  if (isLoading) {
    return <div className="min-h-screen flex items-center justify-center"><Loader /></div>;
  }

  if (error) {
    return <div className="min-h-screen flex items-center justify-center text-red-500">{error}</div>;
  }

  return (
    <div className='min-h-screen flex flex-col items-center p-4'>
      <h1 className='text-3xl md:text-5xl mb-4 md:mb-8 font-bold text-center'>
        Applied Companies
      </h1>
      <div className='w-full max-w-7xl'>
        <div className='bg-white shadow-md rounded-lg overflow-hidden'>
          <div className='overflow-x-auto'>
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Job Role</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Company</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {appliedJob.map((info) => (
                  <tr key={info.job._id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{dateConverter(info.job.updatedAt)}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{info.job.title}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{info.job.company.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        info.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                        info.status === 'Approved' ? 'bg-green-100 text-green-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {info.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppliedJobs;
