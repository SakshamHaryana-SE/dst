import React, { useEffect } from 'react';
import { browserHistory } from 'react-router';
import Header from '../components/Header';
import formSpec from '../form_spec.json';
import withUser from '../redux/HOC/withUser';
import withTrainee from '../redux/HOC/withTrainee';
import { storeUser } from '../common/globals';

const TraineeLogin = ({ setUser, setTrainee }) => {
  const triggers = JSON.stringify(formSpec[0].triggers);

  useEffect(() => {
    console.log('Test');
    window.addEventListener('message', (e) => {
      const { data } = e;
      console.log('data', data);
      try {
        const decoded = JSON.parse(data);
        if (decoded.channel === 'enketo') {
          setTimeout(() => {
            const { resp } = decoded.loginRes;
            console.log('TraineeDetail', decoded.message);
            console.log('resp.result.data.user', resp.result.data.user);
            setTrainee(decoded.message);
            storeUser(resp.result.data.user);
            setUser(resp.result.data.user);
            // need to redirect
            browserHistory.push('/trainee');
          }, 1000);
        }
      } catch (error) {
        // console.log(e)
      }
    });
  }, []);
  return (
    <>
      <Header />
      <div className="m-10 text-xl font-bold text-teal-800 text-center">
        <h2 className="header-text-color">DST Trainee Attendance</h2>
      </div>
      <iframe
        frameBorder="0"
        src={`${process.env.REACT_APP_ENKETO}/preview?xform=${process.env.REACT_APP_GET_FORM}/getForm/enrollment&id=enrollment&triggers=${triggers}`}
        title="Enrollment"
        allow="geolocation"
        width="100%"
        height="500px"
      />
    </>
  );
};
export default withTrainee(withUser(TraineeLogin));