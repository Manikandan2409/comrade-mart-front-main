// // // AuthContext.js
// // import React, { createContext, useState, useEffect } from 'react';
// // import {jwtDecode} from 'jwt-decode';

// // const AuthContext = createContext();

// // const AuthProvider = ({ children }) => {
// //   const [authState, setAuthState] = useState({
// //     username: null,
// //     email: null,
// //   });

// //   useEffect(() => {
// //     const token = localStorage.getItem('token');
// //     if (token) {
// //       const { name, emailId } = jwtDecode(token);
     
// //       setAuthState({ username: name, email: emailId });
// //      // alert(`Username: ${name} email: ${emailId}`);
// //      // alert(" use effect Value setted successfully")
// //     }
// //   }, []);

// //   const login = (token) => {
// //     localStorage.setItem('token', token);
// //     const { name, emailId } = jwtDecode(token);
    
// //     setAuthState({ username: name, email: emailId });
// //     //alert(`Username: ${name} email: ${emailId}`);
// //     //alert("Value setted successfully")
// //   };

// //   const logout = () => {
// //     localStorage.removeItem('token');
// //     setAuthState({ username: null, email: null });
// //    // alert("Value removed successfully")
// //   };

// //   return (
// //     <AuthContext.Provider value={{ authState, login, logout }}>
// //       {children}
// //     </AuthContext.Provider>
// //   );
// // };

// // export { AuthProvider, AuthContext };
// // AuthContext.js
// import React, { createContext, useState, useEffect } from 'react';
// import {jwtDecode} from 'jwt-decode';

// const AuthContext = createContext();

// const AuthProvider = ({ children }) => {
//   const [authState, setAuthState] = useState({
//     username: null,
//     userId: null,
//   });

//   useEffect(() => {
//     const token = localStorage.getItem('token');
//     if (token) {
//       const { name, userId } = jwtDecode(token);
//       setAuthState({ username: name, userId: userId });
//     }
//   }, []);

//   const login = (token) => {
//     localStorage.setItem('token', token);
//     const { name, userId } = jwtDecode(token);
//     setAuthState({ username: name, userId: userId });
//   };

//   const logout = () => {
//     localStorage.removeItem('token');
//     setAuthState({ username: null, userId: null });
//   };

//   return (
//     <AuthContext.Provider value={{ authState, login, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export { AuthProvider, AuthContext };
import React, { createContext, useState, useEffect } from 'react';
 import {jwtDecode} from 'jwt-decode';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [authState, setAuthState] = useState({
    username: null,
    userId: null,
  });

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const { name, userId } = jwtDecode(token);
      setAuthState({ username: name, userId: userId });
    }
  }, []);

  const login = (token) => {
    localStorage.setItem('token', token);
    const { name, userId } = jwtDecode(token);
    setAuthState({ username: name, userId: userId });
  };

  const logout = () => {
    localStorage.removeItem('token');
    setAuthState({ username: null, userId: null });
  };

  return (
    <AuthContext.Provider value={{ authState, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider, AuthContext };
