import React from 'react';
import Notifcation from './Notification';

const ErrorNotification = ({ message }) => {
  const style = {
    border: '2px red solid',
    backgroundColor: '#D3D3D3',
    padding: '10px'
  };

  return (
    <>
      <Notifcation
        className='error'
        style={style}
        message={message}
      />
    </>
  );
};

export default ErrorNotification;