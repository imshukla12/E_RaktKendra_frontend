import React from "react";
import Navbar from "../components/Navbar";
import logo from "../images/GradientLogo.png";
import { useNavigate } from "react-router-dom";

const FieldWorkerLogin = () => {
  const navigate = useNavigate();

  const handleSubmit = () => {
    navigate(`/fieldWorker`);
  };

  return (
    <div className="flex flex-col items-center">
      {/* Navbar */}
      <Navbar />
      <div className="px-4 md:px-0 lg:w-2/5 p-2 flex flex-col items-center justify-around border-2 rounded-lg mt-8 border-zinc-500 shadow-lg">
        <div className="md:mx-6 md:p-4 w-4/5 items-center flex flex-col justify-center">
          {/* Logo */}
          <div className="text-center w-full">
            <img className="mx-auto w-48" src={logo} alt="logo" />
            <h4 className="mb-4 pb-1 text-3xl font-serif font-bold text-red-700 mt-8 border-b border-solid border-gray-900">
              FieldWorker Login Portal
            </h4>
          </div>
          <form className="w-4/5 p-4 font-serif flex flex-col justify-center items-center">
            <div className="relative z-0 w-full mb-6 group">
              <input
                type="email"
                name="floating_email"
                id="floating_email"
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:border-gray-600 focus:outline-none focus:ring-0 focus:border-gray-600 peer"
                placeholder=" "
                required
              />
              <label
                for="floating_email"
                className="peer-focus:font-medium absolute text-sm text-gray-700 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-gray-700 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Email address
              </label>
            </div>
            <div className="relative z-0 w-full mb-6 group">
              <input
                type="password"
                name="floating_password"
                id="floating_password"
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:border-gray-600 focus:outline-none focus:ring-0 focus:border-gray-600 peer"
                placeholder=" "
                required
              />
              <label
                for="floating_password"
                className="peer-focus:font-medium absolute text-sm text-gray-700 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-gray-700 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Password
              </label>
            </div>
            <div className="relative z-0 w-2/3 mb-6 group items-center flex justify-center">
              <button
                type="submit"
                className="md:w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                onClick={handleSubmit}
              >
                LogIn
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default FieldWorkerLogin;
