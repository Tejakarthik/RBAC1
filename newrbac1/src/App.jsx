// // src/App.jsx
// import React, { useState } from 'react';
// import { Routes, Route, Navigate } from 'react-router-dom';

// import { AuthProvider } from './context/AuthContext';
// import AuthForm from './components/AuthForm';
// import Dashboard from './components/Dashboard';

// function App() {
//   const [isAuthenticated, setIsAuthenticated] = useState(false);
//   const [authenticatedUser, setAuthenticatedUser] = useState(null);

//   const handleAuthSuccess = (user) => {
//     setIsAuthenticated(true);
//     setAuthenticatedUser(user);
//   };

//   const handleLogout = () => {
//     setIsAuthenticated(false);
//     setAuthenticatedUser(null);
//   };

//   return (
//     <AuthProvider>
//       <div className="min-h-screen bg-gray-100">
//         <div className="container mx-auto px-4 py-8">
//           {!isAuthenticated ? (
//             <AuthForm onAuthSuccess={handleAuthSuccess} />
//           ) : (
//             <Dashboard 
//               user={authenticatedUser} 
//               onLogout={handleLogout} 
//             />
//           )}
//         </div>
//       </div>
//     </AuthProvider>
//   );
// }

// export default App;







// import React, { useState } from 'react';
// import { Routes, Route, Navigate } from 'react-router-dom';
// import AuthForm from './components/AuthForm';
// import Dashboard from './components/Dashboard';


// function App() {
//   const [isAuthenticated, setIsAuthenticated] = useState(false);
//   const [authenticatedUser, setAuthenticatedUser] = useState(null);

//   const handleAuthSuccess = (user) => {
//     setIsAuthenticated(true);
//     setAuthenticatedUser(user);
//   };

//   const handleLogout = () => {
//     setIsAuthenticated(false);
//     setAuthenticatedUser(null);
//   };

//   return (
    
//       <Routes>
//         <Route
//           path="/login"
//           element={
//             !isAuthenticated ? (
//               <AuthForm onAuthSuccess={handleAuthSuccess} />
//             ) : (
//               <Navigate to="/dashboard" />
//             )
//           }
//         />
//         <Route
//           path="/dashboard"
//           element={
//             isAuthenticated ? (
//               <Dashboard user={authenticatedUser} onLogout={handleLogout} />
//             ) :
//               <Navigate to="/login" />

//           }
//         />
//         {/* Default route */}
//         <Route path="*" element={<Navigate to="/login" />} />
//       </Routes>
    
//   );
// }

// export default App;







import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import AuthForm from './components/AuthForm';
import Dashboard from './components/Dashboard';

function App() {
  const { user } = useAuth();

  return (
    <Routes>
      <Route
        path="/login"
        element={
          !user ? (
            <AuthForm />
          ) : (
            <Navigate to="/dashboard" replace />
          )
        }
      />
      <Route
        path="/dashboard"
        element={
          user ? (
            <Dashboard />
          ) : (
            <Navigate to="/login" replace />
          )
        }
      />
      {/* Default route */}
      <Route 
        path="/" 
        element={<Navigate to="/login" replace />} 
      />
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}

export default App;