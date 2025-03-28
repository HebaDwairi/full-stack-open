import { createContext, useContext, useReducer } from "react";

const NotificationContext = createContext();


const notificationReducer = (state, action) => {
  switch(action.type) {
    case 'SET': return action.payload;
    case 'CLEAR': return '';
    default: return state;
  }
}


export const NotificationContextProvider = (props) => {

  const [notification, notificationDispatch] = useReducer(notificationReducer, '');

  return (
    <NotificationContext.Provider value={[notification, notificationDispatch]}>
      {props.children}
    </NotificationContext.Provider>
  );
}

export const useSetNotification = () => {
  const [notification, dispatch] = useContext(NotificationContext);

  return (text) => {
    dispatch({
      type: 'SET',
      payload: text
    });
  
    setTimeout(() => {
      dispatch({ type: 'CLEAR' })
    }, 5000);
  }
}

export const useNotification = () => {
  const context = useContext(NotificationContext);
  return context[0];
}
export default NotificationContext;