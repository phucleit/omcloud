import React from "react";
import axios from 'axios';

var UserStateContext = React.createContext();
var UserDispatchContext = React.createContext();

function userReducer(state, action) {
  switch (action.type) {
    case "LOGIN_SUCCESS":
      return { ...state, isAuthenticated: true };
    case "SIGN_OUT_SUCCESS":
      return { ...state, isAuthenticated: false };
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
}

function UserProvider({ children }) {
  var [state, dispatch] = React.useReducer(userReducer, {
    isAuthenticated: !!localStorage.getItem("id_token"),
  });

  return (
    <UserStateContext.Provider value={state}>
      <UserDispatchContext.Provider value={dispatch}>
        {children}
      </UserDispatchContext.Provider>
    </UserStateContext.Provider>
  );
}

function useUserState() {
  var context = React.useContext(UserStateContext);
  if (context === undefined) {
    throw new Error("useUserState must be used within a UserProvider");
  }
  return context;
}

function useUserDispatch() {
  var context = React.useContext(UserDispatchContext);
  if (context === undefined) {
    throw new Error("useUserDispatch must be used within a UserProvider");
  }
  return context;
}

export { UserProvider, useUserState, useUserDispatch, loginUser, signOut };

// ###########################################################

function loginUser(dispatch, login, password, history, setIsLoading, setError) {
  setError(false);
  setIsLoading(true);

  const userLogin = {
    username: login,
    password: password,
  };

  const config = {
    method: 'post',
    url: 'https://backend.omcloud.vn/api/login',
    headers: { 
        'Authorization': 'Bearer 10|wrpJyOOlFaGAbvXyOsSvHJQbpYmP0HiPi2KVMck4', 
        'Content-Type': 'application/json'
    },
    data: userLogin
  };

  axios(config)
    .then(res => {
      if (res.data.status_code === 500) {
        alert('Username hoặc password không đúng. Vui lòng nhập lại!');
        history.push('/');
      } else {
        setTimeout(() => {
          localStorage.setItem('token', res.data.access_token);
          localStorage.setItem('abilities', res.data.abilities);

          localStorage.setItem('user_info', JSON.stringify(res.data.user_info));
          setError(null)
          setIsLoading(false)
          dispatch({ type: 'LOGIN_SUCCESS' })

          history.push('/app/dashboard')
        }, 2000);
      }
    })
    .catch(error => console.log(error));

  // axios.post(API_URL, userLogin)
  // .then((response) => {
  // if (response.data.accessToken) {
  //   setTimeout(() => {
  //     localStorage.setItem("user", JSON.stringify(response.data));
  //     setError(null)
  //     setIsLoading(false)
  //     dispatch({ type: 'LOGIN_SUCCESS' })

  //     history.push('/app/dashboard')
  //   }, 2000);
  // } else {
  //   dispatch({ type: "LOGIN_FAILURE" });
  //   setError(true);
  //   setIsLoading(false);
  // }
  // return response.data;
  // });

  // if (!!login && !!password) {
  //   setTimeout(() => {
  //     localStorage.setItem('id_token', 1)
  //     setError(null)
  //     setIsLoading(false)
  //     dispatch({ type: 'LOGIN_SUCCESS' })

  //     history.push('/app/dashboard')
  //   }, 2000);
  // } else {
  //   dispatch({ type: "LOGIN_FAILURE" });
  //   setError(true);
  //   setIsLoading(false);
  // }
}

function signOut(dispatch, history) {
  localStorage.removeItem("token");
  localStorage.removeItem("abilities");
  dispatch({ type: "SIGN_OUT_SUCCESS" });
  history.push("/login");
}
