import React, { useEffect, useRef, useState } from 'react';
import Sidebar from '../components/SIdebar/Sidebar';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import MobileSidebar from '../components/SIdebar/MobileSidebar';
import { FaRegMoon } from 'react-icons/fa';
import { LuSunMedium } from 'react-icons/lu';
import logo from '../assets/react.svg';
import { TbLogout2 } from 'react-icons/tb';
import { toast } from 'react-toastify';
import axios from 'axios';
import MemberSidebar from '../components/MemberSidebar/MemberSidebar';

const MainLayout = ({ toggleTheme, darkMode }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const user = JSON.parse(localStorage.getItem('user'));
  const token = user.token;
  const modalRef = useRef(null); // Create a ref for the sidebar
  const navigate = useNavigate();
  const logout = async () => {
    try {
      // Make API request with axios
      const response = await axios.get('http://127.0.0.1:8000/api/logout', {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`, // Include the Bearer token
        },
      });
      toast.success('Logged-out successfully');
      localStorage.removeItem('user');
      navigate('/login');
    } catch (error) {
      if (error.response) {
        toast.error('logout failed: ' + error.response.data); // Customize error message
      } else if (error.request) {
        toast.error('No response from server. Please try again later.');
      } else {
        toast.error('An error occurred while logout.');
      }
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setIsModalOpen(false);
      }
    };

    if (isModalOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isModalOpen]);

  function closeDropdown() {
    const dropdown = document.getElementById('userDropdown');
    if (dropdown) {
          console.log('done.');

      dropdown.classList.add('hidden');
    } else {
    console.warn('Dropdown element not found.');
    }
  }

  return (
    <>
      <MemberSidebar />
      {/* <MobileSidebar
        logout={logout}
        setIsModalOpen={setIsModalOpen}
        isModalOpen={isModalOpen}
        darkMode={darkMode}
        toggleTheme={toggleTheme}
      /> */}
      <div className=" bg-gray-50 min-h-screen dark:bg-gray-900 flex md:flex-row flex-col ">
        {/* <Sidebar /> */}
        <div className="  flex-1 h-screen text-2xl font-semibold overflow-y-auto">
          <div className="bg-blue-500 p-3 flex items-center justify-between">
            <div className=" flex gap-4 justify-start">
              <p className=" text-white text-base">Leads</p>
              <p className=" text-white text-base">Contacts</p>{' '}
              <p className=" text-white text-base">Accounts</p>{' '}
              <p className=" hidden md:block text-white text-base">Deals</p>{' '}
              <p className="hidden md:block text-white text-base">Tasks</p>{' '}
              <p className="hidden md:block text-white text-base">Meetings</p>{' '}
              <p className="hidden md:block text-white text-base">Calls</p>{' '}
              <p className="hidden md:block text-white text-base">Reports</p>
              <p className=" text-white text-base">
                <button
                  id="avatarButtonn"
                  type="button"
                  data-dropdown-toggle="userDropdown"
                  data-dropdown-placement="bottom-start"
                >
                  . . .
                </button>

                {/* <!-- Dropdown menu --> */}
                <div
                  id="userDropdown"
                  class="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow  dark:bg-gray-700 dark:divide-gray-600"
                >
                  <ul
                    class="py-2 text-sm text-gray-700 dark:text-gray-200"
                    aria-labelledby="avatarButtonn"
                  >
                    <li>
                      <div className="px-4 search">
                        <div className="relative p-0.5 ">
                          <div className="absolute inset-y-0 left-0 rtl:inset-r-0 rtl:right-0 flex items-center ps-3 pointer-events-none">
                            <svg
                              className="w-5 h-5 text-gray-500 dark:text-gray-400"
                              aria-hidden="true"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                fillRule="evenodd"
                                d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                                clipRule="evenodd"
                              ></path>
                            </svg>
                          </div>
                          <input
                            type="text"
                            id="table-search"
                            className=" w-full block p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-slate-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="Search for items"
                          />
                        </div>
                      </div>
                    </li>
                    <li className="md:hidden">
                      <a
                        href="#"
                        class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                      >
                        Deals
                      </a>
                    </li>
                    <li className="md:hidden">
                      <a
                        href="#"
                        class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                      >
                        Tasks
                      </a>
                    </li>
                    <Link to="/projects" className="md:hidden">
                      <a
                        href="#"
                        class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                        onClick={closeDropdown()}
                      >
                        Reports
                      </a>
                    </Link>{' '}
                    <li className="md:hidden">
                      <a
                        href="#"
                        class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                      >
                        Calls
                      </a>
                    </li>
                    <li className="md:hidden">
                      <a
                        href="#"
                        class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                      >
                        Meetings
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                      >
                        Analysis
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                      >
                        Products
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                      >
                        Quotes
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                      >
                        Vendors
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                      >
                        Campaigns
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                      >
                        Solutions
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                      >
                        Documents
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                      >
                        Forcasts
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                      >
                        Visits
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                      >
                        Social
                      </a>
                    </li>
                  </ul>
                </div>
              </p>
            </div>
            <div className=" flex gap-4 justify-end">
              <button
                className="text-dark-purple rounded dark:text-white"
                onClick={() => toggleTheme()}
              >
                {darkMode ? <LuSunMedium /> : <FaRegMoon />}
              </button>
              <button
                className=" rounded-full"
                onClick={() => setIsModalOpen(!isModalOpen)}
              >
                <img src={logo} alt="logo" />
              </button>

              <img
                id="ggg"
                type="button"
                data-dropdown-toggle="ttt"
                data-dropdown-placement="bottom-start"
                class="w-10 h-10 rounded-full cursor-pointer"
                src="/docs/images/people/profile-picture-5.jpg"
                alt="User dropdown"
              />

              {/* <!-- Dropdown menu --> */}
              <div
                id="ttt"
                class="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600"
              >
                <div class="px-4 py-3 text-sm text-gray-900 dark:text-white">
                  <div>Bonnie Green</div>
                  <div class="font-medium truncate">name@flowbite.com</div>
                </div>
                <ul
                  class="py-2 text-sm text-gray-700 dark:text-gray-200"
                  aria-labelledby="ggg"
                >
                  <li>
                    <a
                      href="#"
                      class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                    >
                      Dashboard
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                    >
                      Settings
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                    >
                      Earnings
                    </a>
                  </li>
                </ul>
                <div class="py-1">
                  <a
                    href="#"
                    class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                  >
                    Sign out
                  </a>
                </div>
              </div>
            </div>
          </div>

          {isModalOpen && (
            <div ref={modalRef} className="md:block hidden">
              <div className="border text-dark-purple dark:text-white dark:text-white border rounded bg-slate-50 dark:bg-gray-900 w-48 h-16 absolute top-20 right-10 z-50">
                <button
                  onClick={() => {
                    logout();
                  }}
                  className="m-4 text-sm flex gap-4 items-center"
                >
                  <TbLogout2 />
                  Logout
                </button>
              </div>
            </div>
          )}

          <Outlet />
        </div>
      </div>
    </>
  );
};

export default MainLayout;
