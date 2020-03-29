import React from 'react';

const Notification = ({ style, message }) => {

  if (message === null) {
    return null;
  } else {
    return (
      <div style={style}>
        <h3>{message}</h3>
      </div>
    );
  }
};

export default Notification;