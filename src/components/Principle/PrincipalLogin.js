import React from 'react';
import { browserHistory } from 'react-router';
import { Field, Form } from 'react-final-form';
import withGoBack from '../../redux/HOC/withGoBack';
import withLoader from '../../redux/HOC/withLoader';
import withNotify from '../../redux/HOC/withNotify';
import withUser from '../../redux/HOC/withUser';
import { onGoBack } from '../../common/globals';
import { renderField, required } from '../../helpers/form-validations';
import { sendOTP } from '../../utils/utils';
import Header from '../Header';

const PrincipalLogin = ({
  goBack, setGoBack, setLoader, setNotify, setUser,
}) => {
  const onSubmit = async (formData) => {
    browserHistory.push('/verify-otp');
    const otpData = {
      phone: formData.hrms,
    };
    setLoader(true);
    const otpRes = await sendOTP(otpData);
    const { responseStatus, message, resp } = otpRes;
    if (responseStatus) {
      setUser({ ...resp.result.data });
      setNotify({ message: 'OTP send successfully.', type: 'success' });
      goBack.push(window.location.pathname);
      setGoBack(goBack);
      browserHistory.push('/verify-otp');
    } else {
      setNotify({ message, type: 'error' });
    }
    setLoader(false);
  };
  const onBack = () => {
    onGoBack(goBack);
  };

  return (
    <div>
      <Header />
      <div className="m-10 font-bold text-2xl text-teal-800 text-center">
        <h2 className="header-text-color">Principal Log in</h2>
      </div>
      <div className="flex justify-center items-center">
        <Form
          onSubmit={onSubmit}
          render={({ handleSubmit }) => (
            <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
              <div className="mb-4">
                <label className="block text-teal-700 text-sm font-bold mb-2" htmlFor="username">
                  Enter your HRMS Code
                </label>
                <Field
                  className="shadow appearance-none border border-teal-600 rounded w-full py-2 px-3 text-teal-700 leading-tight focus:outline-none focus:shadow-outline"
                  name="hrms"
                  type="text"
                  id="hrms"
                  validate={required}
                >
                  {renderField}
                </Field>
              </div>
              <div className="p-10 flex item-center justify-center">
                <button
                  onClick={onBack}
                  type="button"
                  className="bg-teal-700 text-white p-2 text-lg w-auto"
                >
                  Go Back
                </button>
                <button
                  type="submit"
                  className="bg-teal-700 text-white p-2 ml-6 text-lg w-auto"
                >
                  Submit
                </button>
              </div>
            </form>
          )}
        />
      </div>
    </div>
  );
};
export default withUser(withNotify(withLoader(withGoBack(PrincipalLogin))));
