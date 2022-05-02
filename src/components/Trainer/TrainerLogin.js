import React from 'react';
import { browserHistory } from 'react-router';
import { onGoBack } from '../../common/globals';
import withGoBack from '../../redux/HOC/withGoBack';
import Header from '../Header';

const TrainerLogin = ({ goBack, setGoBack }) => {
  const onSendOTP = () => {
    goBack.push(window.location.pathname);
    setGoBack(goBack);
    browserHistory.push('/verify-otp');
  };
  const onBack = () => {
    onGoBack(goBack);
  };

  return (
    <div>
      <Header />
      <div className="m-10 text-2xl font-bold text-teal-800 text-center">
        <h2 className="header-text-color">Trainer Log in</h2>
      </div>
      <div className="flex justify-center items-center">
        <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <div className="mb-4">
            <label className="block text-teal-700 text-sm font-bold mb-2" htmlFor="username">
              Enter your HRMS Employee Code
            </label>
            <input
              className="shadow appearance-none border border-teal-600 rounded w-full py-2 px-3 text-teal-700 leading-tight focus:outline-none focus:shadow-outline"
              id="hrms"
              type="text"
            />
          </div>
          <div className="mb-4">
            <label className="block text-teal-700 text-sm font-bold mb-2" htmlFor="username">
              Enter your mobile number
            </label>
            <input
              className="shadow appearance-none border border-teal-600 rounded w-full py-2 px-3 text-teal-700 leading-tight focus:outline-none focus:shadow-outline"
              id="mobile"
              type="number"
            />
          </div>
          <div className="flex items-center justify-center">
            <button
              onClick={onSendOTP}
              className="bg-teal-700 hover:bg-teal-500 text-white font-bold py-2 px-4 focus:outline-none focus:shadow-outline"
              type="button"
            >
              Send OTP
            </button>
          </div>
        </form>
      </div>
      <div className="flex items-center justify-center">
        <button
          onClick={onBack}
          className="bg-teal-700 hover:bg-teal-500 text-white font-bold py-2 px-4 focus:outline-none focus:shadow-outline"
          type="button"
        >
          Go Back
        </button>
      </div>
    </div>
  );
};
export default withGoBack(TrainerLogin);
