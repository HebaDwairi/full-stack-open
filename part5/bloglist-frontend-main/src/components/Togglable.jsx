import { useImperativeHandle, forwardRef, useState } from 'react';

const Togglable = forwardRef((props, refs) => {
  const [visible, setVisible] = useState(false);
  const showWhenVisible = { display: visible ? '' : 'none' };
  const hideWhenVisible = { display: visible ? 'none' : '' };

  const toggleVisibility = () => {
    setVisible(!visible);
  }

  useImperativeHandle(refs, () => {
    return {
      toggleVisibility
    }
  });

  return(
    <div>
      <div style={hideWhenVisible}>
        <button onClick={toggleVisibility}>{props.value}</button>
      </div>
      <div style={showWhenVisible}>
        {props.children}
      </div>
      <button style={showWhenVisible} onClick={toggleVisibility}>cancel</button>
    </div>
  );
});

Togglable.displayName = 'Togglable';

export default Togglable;