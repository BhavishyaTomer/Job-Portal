import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { COMPANY_CREATE, COMPANY_ENDPOINT } from '../config/endpoint';
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import Loader from '../service/Loader';

const ListedCompany = () => {
  const [companyDetails, setCompanyDetails] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const { register, handleSubmit, formState: { errors } } = useForm();

  useEffect(() => {
    const fetchCompanyDetails = async () => {
      setIsLoading(true);  // Start loading
      try {
        const response = await axios.get(COMPANY_ENDPOINT, { withCredentials: true });
        if (response) {
          setCompanyDetails(response.data);
        }
      } catch (error) {
        console.error('Failed to fetch company details:', error);
        toast.error(error.response?.data?.message || 'Failed to fetch company details');
      } finally {
        setIsLoading(false);  // Stop loading
      }
    };

    fetchCompanyDetails();
  }, []);

  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      const parsedUser = JSON.parse(user);
      const role = parsedUser.role;
      if (role === "Job seeker") {
        navigate("/redirect");
      }
    } else {
      navigate("/redirect");
    }
  }, [navigate]);

  const onSubmit = async (data) => {
    setIsLoading(true);  // Start loading
    try {
      await axios.post(COMPANY_CREATE, data, { withCredentials: true });
      toast.success('Company registered successfully!');
      toggleModal();
      const response = await axios.get(COMPANY_ENDPOINT, { withCredentials: true });
      setCompanyDetails(response.data);
    } catch (error) {
      console.error('Failed to register company:', error);
      toast.error(error.response?.data?.message || 'Failed to register company');
    } finally {
      setIsLoading(false);  // Stop loading
    }
  };

  const dateConverter = (date) => {
    return new Date(date).toLocaleDateString();
  };

  return (
    <div className='min-h-screen flex flex-col items-center p-4'>
      <ToastContainer />
      {isLoading && <Loader />} {/* Show loader when loading */}
      
      <section className='text-4xl mb-8 text-center'>
        Register Your Company Here
      </section>
      
      <div className='flex justify-end w-full max-w-4xl mb-4'>
        <button className='bg-red-600 text-white p-3 rounded-lg' onClick={toggleModal}>
          Create a Company
        </button>
      </div>

      <div className='w-full max-w-4xl overflow-x-auto'>
        <table className="min-w-full text-lg md:text-2xl border border-white">
          <thead>
            <tr className="border-b border-white">
              <th className="px-4 py-2">Name</th>
              <th className="px-4 py-2">Website</th>
              <th className="px-4 py-2">Location</th>
              <th className="px-4 py-2">Registered At</th>
            </tr>
          </thead>
          <tbody>
            {companyDetails.map((info) => (
              <tr className='text-center border-b border-white' key={info._id}>
                <td className="px-4 py-2">{info.name}</td>
                <td className="px-4 py-2">{info.website}</td>
                <td className="px-4 py-2">{info.Location}</td>
                <td className="px-4 py-2">{dateConverter(info.createdAt)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="relative p-4 w-full max-w-lg bg-backGround rounded-lg shadow dark:bg-gray-700">
            <div className="flex items-center justify-between p-4 border-b dark:border-gray-600">
              <h3 className="text-xl font-semibold text-textColor dark:text-white">
                Register a company
              </h3>
              <button
                type="button"
                onClick={toggleModal}
                className="text-textColor bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
              >
                <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                </svg>
                <span className="sr-only">Close modal</span>
              </button>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="p-4 space-y-4">
              <div className='flex flex-col'>
                <label className='my-2 text-lg'>Company's Name</label>
                <input
                  type='text'
                  className='rounded-md text-backGround font-semibold px-3 py-2'
                  placeholder='Google'
                  {...register('name', { required: true })}
                />
                {errors.name && <span className="text-red-500">This field is required</span>}
              </div>

              <div className='flex flex-col'>
                <label className='my-2 text-lg'>Company's Website</label>
                <input
                  type='text'
                  className='rounded-md text-backGround font-semibold px-3 py-2'
                  placeholder='www.google.com'
                  {...register('website', { required: true })}
                />
                {errors.website && <span className="text-red-500">This field is required</span>}
              </div>

              <div className='flex flex-col'>
                <label className='my-2 text-lg'>Company's Location</label>
                <input
                  type='text'
                  className='rounded-md text-backGround font-semibold px-3 py-2'
                  placeholder='Gurgaon'
                  {...register('Location', { required: true })}
                />
                {errors.Location && <span className="text-red-500">This field is required</span>}
              </div>

              <div className="flex justify-between p-4 border-t dark:border-gray-600">
                <button
                  type="submit"
                  className="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700"
                >
                  Register
                </button>
                <button
                  type="button"
                  onClick={toggleModal}
                  className="py-2.5 px-5 text-sm font-medium text-gray-900 bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ListedCompany;
