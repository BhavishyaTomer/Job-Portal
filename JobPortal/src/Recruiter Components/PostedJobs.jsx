import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { POSTED_JOB } from '../config/endpoint';
import { FaEye } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const PostedJobs = () => {
  const [postedJobs, setPostedJobs] = useState([]);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await axios(POSTED_JOB, { withCredentials: true });
        setPostedJobs(response.data.jobs);
      } catch (error) {
        console.log(error);
      }
    };

    fetchJobs();
  }, []);

  const dateConverter = (date) => {
    return new Date(date).toLocaleDateString();
  };

  const navigate = useNavigate();

  return (
    <div className='min-h-screen flex flex-col items-center p-4'>
      <section className='text-4xl mb-4 text-center'>Find your posted job here</section>
      <div className='w-full overflow-x-auto'>
        <table className="min-w-full text-2xl border border-white">
          <thead>
            <tr className="border-b border-white">
              <th className="px-4 py-2">Company Name</th>
              <th className="px-4 py-2">Title</th>
              <th className="px-4 py-2">Posted Date</th>
              <th className="px-4 py-2">Vacancy</th>
              <th className="px-4 py-2">Applicants</th>
              <th className="px-4 py-2">Take Actions</th>
            </tr>
          </thead>
          <tbody>
            {postedJobs.map((info) => (
              <tr className='text-center border-b border-white' key={info._id}>
                <td className="px-4 py-2">{info.company.name}</td>
                <td className="px-4 py-2">{info.title}</td>
                <td className="px-4 py-2">{dateConverter(info.createdAt)}</td>
                <td className="px-4 py-2">{info.position}</td>
                <td className="px-4 py-2">{info.application.length}</td>
                <td className="px-4 py-2 flex justify-center hover:text-green-400">
                  <FaEye onClick={() => navigate(`/changeStatus/${info._id}`)} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PostedJobs;
