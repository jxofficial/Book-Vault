import React, { useState } from 'react';

const Toggleable = props => {
  const [visibility, setVisibility] = useState(false);

  const showWhenVisible = { display: visibility ? '' : 'none' };
  const hideWhenVisible = { display: visibility ? 'none' : '' };
  const toggleVisibility = () => setVisibility(!visibility);

  return (
    <>
      <div style={hideWhenVisible}>
        <button type="button" onClick={toggleVisibility}>
          {props.buttonLabel}
        </button>
      </div>
      <div style={showWhenVisible}>
        {props.children}
        <button type="button" onClick={toggleVisibility}>Cancel</button>
      </div>
    </>
  );
};

export default Toggleable;