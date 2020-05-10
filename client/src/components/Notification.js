import React from 'react';

const Notification = ({ style, message, className = '' }) => {

  if (!message) {
    return null;
  } else {
    return (
      <div style={style} className={className}>
        <h3>{message}</h3>
      </div>
    );
  }
};

export default Notification;