import React, { useState, useEffect } from 'react';
import img from '../config/logo.png';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useCookies } from 'react-cookie';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { API_ENDPOINT } from '../config/endpoint';
import { useDispatch, useSelector } from 'react-redux';
import { setLoading } from '../redux/authSlice';
import { Audio } from 'react-loader-spinner'

const Header = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [profileImageUrl, setProfileImageUrl] = useState('');
  const toggleDropdown = () => {
    
    setIsOpen(!isOpen);
  }
  const closeDropdown = () => setIsOpen(false);
  const toggleModal = () => setIsModalOpen(!isModalOpen);
  const dispatch = useDispatch();
  const selector = useSelector((state) => state.auth.value)

  const navigate = useNavigate();
  const [cookies, setCookie, removeCookie] = useCookies(['token']);
  const user = localStorage.getItem('user')

  useEffect(() => {
    const checkLoginStatus = () => {
      const token = cookies.token;
      const userString = localStorage.getItem('user');

      if (userString) {
        const user = JSON.parse(userString);
        const base64String = user.file.buffer;
        console.log(user.file.mimetype)
        const imageUrl = `data:${user.file.mimetype};base64,${base64String}`;
        // console.log(userString.file.mimetype)
        // console.log(user.file.mimetype)
       
        setProfileImageUrl(imageUrl)
        setLoggedIn(true);
      } else {
        setLoggedIn(false);
        setProfileImageUrl('');
      }
    };

    checkLoginStatus();
    window.addEventListener('storage', checkLoginStatus);

    return () => {
      window.removeEventListener('storage', checkLoginStatus);
    };
  }, );

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsScrolled(scrollTop > 50);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);



  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = (data) => {
    dispatch(setLoading(true))
    axios.post(`${API_ENDPOINT}/login`, data, {
      withCredentials: true
    })
      .then(res => {
        setCookie('token', res.data.token, {
          path: '/',
          maxAge: 86400,
          sameSite: 'lax',
          secure: process.env.NODE_ENV === 'production'
        });
        localStorage.setItem('user', JSON.stringify(res.data.user));
        navigate('/');
        setLoggedIn(true);
        toast(res.data.message);
      })
      .catch(error => {

        toast(error.response.data.message);
      }).finally(() => {
        dispatch(setLoading(false))
      });
    toggleModal();
  };

  const signOut = () => {
    removeCookie('token', { path: '/' });
    localStorage.removeItem('user');
    navigate('/');
    console.log("ran")
    setLoggedIn(false)
    toast("Logged Out Succesfully");
  };

  return (
    <div
      className={`sticky top-0 z-[20] mx-auto flex justify-between items-center p-8 transition-colors duration-300 ${isScrolled ? 'bg-backGround/30 backdrop-blur-lg' : 'bg-backGround'
        }`}
    >
      <img src={img} alt="Logo" className='w-auto h-20' onClick={() => navigate("/")} />
      <ToastContainer />

      {!loggedIn ? (
        <button
          onClick={toggleModal}
          className="bg-transparent hover:bg-red-500 text-textColor font-semibold hover:text-white py-2 px-4 border border-border hover:border-transparent rounded-lg"
        >
          Login
        </button>
      ) : (
        <div className="relative inline-block text-left">
          <div>
            <button
              type="button"
              className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
              id="menu-button"
              aria-expanded={isOpen}
              aria-haspopup="true"
              onClick={toggleDropdown}
            >
              {profileImageUrl ? (
                <img src={profileImageUrl} alt="Profile" className="w-8 h-8 rounded-full" />
              ) : (
                <div className="w-8 h-8 rounded-full bg-gray-300">Pic here</div>
              )}

            </button>
          </div>

          {isOpen && (
            <div
              className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-backGround shadow-lg ring-1 ring-white ring-opacity-5 focus:outline-none transition ease-out duration-100 transform opacity-100 scale-100"
              role="menu"
              aria-orientation="vertical"
              aria-labelledby="menu-button"
              tabIndex="-1"
            >
              <div className="py-1" role="none">
                <span
                  className="block px-4 py-2 text-md text-textColor bg-backGround border-b border-border cursor-pointer "
                  role="menuitem"
                  tabIndex="-1"
                  id="menu-item-0"
                  onClick={closeDropdown}
                >
                  Applied Jobs
                </span>

                <button
                  type="submit"
                  className="block w-full px-4 py-2 text-left text-md text-textColor bg-backGround border-b border-border"
                  role="menuitem"
                  tabIndex="-1"
                  id="menu-item-3"
                  onClick={signOut}
                >
                  Sign out
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {isModalOpen && (
        <div
          id="authentication-modal"
          tabIndex="-1"
          aria-hidden="true"
          className="fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full h-screen bg-black bg-opacity-50"
        >
          <div className="relative p-4 w-full max-w-md max-h-full">
            <div className="relative bg-backGround rounded-lg shadow dark:bg-gray-700">
              <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                <h3 className="text-xl font-semibold text-textColor dark:text-white">
                  Sign in to our platform
                </h3>
                <button
                  type="button"
                  onClick={toggleModal}
                  className="text-textColor bg-transparent rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center"
                >
                  <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                  </svg>
                  <span className="sr-only">Close modal</span>
                </button>
              </div>
              <div className="p-4 md:p-5">
                <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
                  <div>
                    <label htmlFor="email" className="block mb-2 text-sm font-medium text-textColor dark:text-white">Your email</label>
                    <input
                      type="email"
                      name="email"
                      id="email"
                      className="bg-backGround border border-gray-300 text-textColor text-sm rounded-lg block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500"
                      placeholder="name@company.com"
                      required
                      {...register("email")}
                    />
                  </div>
                  <div>
                    <label htmlFor="password" className="block mb-2 text-sm font-medium text-textColor dark:text-white">Your password</label>
                    <input
                      type="password"
                      name="password"
                      id="password"
                      placeholder="••••••••"
                      className="bg-backGround border border-gray-300 text-textColor text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                      required
                      {...register("password")}
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 flex justify-center items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
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
                      ) : "Login to your account"
                    }
                  </button>

                  <div className="text-sm font-medium text-gray-500 dark:text-gray-300">
                    Not registered?
                    <Link to="/register" className="text-blue-700 hover:underline dark:text-blue-500" onClick={toggleModal}>Create account</Link>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Header;
