import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { API_ENDPOINT } from '../config/endpoint';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { Audio } from 'react-loader-spinner';

const Registration = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedRole, setSelectedRole] = useState('Role');
  const [profileImage, setProfileImage] = useState(null);

  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    role: '',
    file: '', // Initially null
  });

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const selector = useSelector((state) => state.auth.value)

  const handleRoleSelect = (role) => {
    setSelectedRole(role)
    setForm((prevForm) => ({
      ...prevForm,
      role: role,
    }));
    setIsDropdownOpen(false);
  };

  const changeEventHandler = (e) => {
    setForm((prevForm) => ({
      ...prevForm,
      [e.target.name]: e.target.value,
    }));
  };

  const changeFileHandler = (e) => {
    setForm((prevForm) => ({
      ...prevForm,
      file: e.target.files[0], // Use e.target.files[0] to get the file object
    }));
  };

  const onSubmit = async (form) => {
    try {

      const formdata = new FormData();
      formdata.append("firstName", form.firstName);
      formdata.append("lastName", form.lastName);
      formdata.append("email", form.email);
      formdata.append("password", form.password);
      formdata.append("role", form.role);
      if (form.file) {
        formdata.append("file", form.file);
      }

      await axios.post(API_ENDPOINT, formdata, {
        headers: {
          "Content-Type": "multipart/form-data"
        },
        withCredentials: true,
      }).then(res => {
        console.log("fetching", res);
        localStorage.setItem('user', JSON.stringify(res.data.user));
        toast(res.data.message);
        navigate('/');
      }).catch(error => {
        console.log(error);
        toast(error.response.data.message);
      });
    } catch (error) {
      console.log(error);
      toast(error.response.data.message);
    } finally {
      dispatch(setLoading(false));  // Ensure this line runs regardless of the outcome
    }
  };


  return (
    <div className='bg-backGround w-full h-screen flex flex-col items-center'>
      <section className='text-textColor flex justify-center items-center font-google text-6xl'>
        Yahan Apni Registry karen!!
      </section>
      <form className='grid grid-cols-2 w-2/3 m-10' onSubmit={onSubmit}>
        <section className='flex flex-col ml-10 my-7'>
          <span className='text-textColor font-google text-3xl'>First Name</span>
          <input
            className='text-textColor bg-backGround border-border border-2 w-1/2 my-2 rounded-md h-10'
            type='text'
            name='firstName'
            onChange={changeEventHandler}
            value={form.firstName}
          />
        </section>
        <section className='flex flex-col ml-10 my-7'>
          <span className='text-textColor font-google text-3xl'>Last Name</span>
          <input
            className='text-textColor bg-backGround border-border border-2 w-1/2 my-2 rounded-md h-10'
            type='text'
            name='lastName'
            value={form.lastName}
            onChange={changeEventHandler}
          />
        </section>
        <section className='flex flex-col ml-10 my-7'>
          <span className='text-textColor font-google text-3xl'>Email</span>
          <input
            className='text-textColor bg-backGround border-border border-2 w-1/2 my-2 rounded-md h-10'
            type='email'
            name='email'
            onChange={changeEventHandler}
            value={form.email}
          />
        </section>
        <section className='flex flex-col ml-10 my-7'>
          <span className='text-textColor font-google text-3xl'>Password</span>
          <input
            className='text-textColor bg-backGround border-border border-2 w-1/2 my-2 rounded-md h-10'
            type='password'
            onChange={changeEventHandler}
            name='password'
            value={form.password}
          />
        </section>
        <section className='flex flex-col ml-12 my-10 w-1/2'>
          <div className='relative inline-block text-left'>
            <div>
              <button
                type='button'
                className='inline-flex w-auto gap-x-1.5 rounded-md bg-transparent px-3 py-2 font-google text-3xl font-semibold text-textColor shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 hover:text-blue-950'
                id='menu-button'
                aria-expanded={isDropdownOpen}
                aria-haspopup='true'
                onClick={toggleDropdown}
              >
                {selectedRole ? selectedRole : selectedRole}
                <svg
                  className='-mr-1 h-5 w-5 text-gray-400'
                  viewBox='0 0 20 20'
                  fill='currentColor'
                  aria-hidden='true'
                >
                  <path
                    fillRule='evenodd'
                    d='M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z'
                    clipRule='evenodd'
                  />
                </svg>
              </button>
            </div>
            {isDropdownOpen && (
              <div
                className='absolute left-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-bodyColor text-textColor shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none border-2 border-border'
                role='menu'
                aria-orientation='vertical'
                aria-labelledby='menu-button'
              >
                <div className='py-1' role='none'>
                  <div
                    onClick={() => handleRoleSelect('Recruiter')}
                    className='block bg-backGround py-2 font-google text-3xl cursor-pointer border-b border-border hover:bg-gray-50 hover:text-blue-950'
                    role='menuitem'
                    id='menu-item-0'
                  >
                    Recruiter
                  </div>
                  <div
                    onClick={() => handleRoleSelect('Job seeker')}
                    className='block bg-backGround px-4 py-2 font-google text-3xl text-textColor cursor-pointer hover:bg-gray-50 hover:text-blue-950'
                    role='menuitem'
                    id='menu-item-1'
                  >
                    Job seeker
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>
        <section className='flex flex-col ml-10 my-7'>
          <span className='text-textColor font-google text-3xl'>Profile Pic</span>
          <input
            className='block w-1/2 text-sm text-textColor border border-border rounded-lg cursor-pointer bg-backGround focus:outline-none'
            id='file_input'
            type='file'
            name='file'
            onChange={changeFileHandler}
            accept='image/*'
          />

        </section>
        <section className='flex flex-col ml-12 my-10 w-1/2'>
          <button
            className='bg-blue-800 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded-md font-google '
            type='submit'
          >
            {
    selector ? (
      <Audio
        height="20"
        width="20"
        radius="9"
        color="white"
        ariaLabel="loading"
        wrapperStyle={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
        wrapperClass="text-center"
        className="text-center"
      />
    ) : "Register Account"
  }
          </button>
        </section>
      </form>
      <ToastContainer />
    </div>
  );
};

export default Registration;
