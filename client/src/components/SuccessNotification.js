import React from 'react';
import Notifcation from './Notification';

const SuccessNotification = ({ message }) => {
  const style = {
    border: '2px green solid',
    backgroundColor: '#D3D3D3',
    padding: '10px'
  }

  return (
    <>
      <Notifcation
        style={style}
        message={message}
      />
    </>
  )
};

export default SuccessNotification;