import React, { useState, useImperativeHandle } from 'react';
import PropTypes from 'prop-types';

// forwardRef attaches the ref from App.js to the mounted Toggleable react element
// ie ref.current points to the Toggleable react element
const Toggleable = React.forwardRef((props, ref) => {

  Toggleable.propTypes = {
    buttonLabel: PropTypes.string.isRequired
  };

  const [visibility, setVisibility] = useState(false);

  const showWhenVisible = { display: visibility ? '' : 'none' };
  const hideWhenVisible = { display: visibility ? 'none' : '' };
  const toggleVisibility = () => setVisibility(!visibility);

  // customizes the instance value that is exposed to the parent
  // ref.current in the parent can now access the toggleVisibility function
  useImperativeHandle(ref, () => {
    return {
      toggleVisibility
    };
  });

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
});

Toggleable.displayName = 'Toggleable';

export default Toggleable;