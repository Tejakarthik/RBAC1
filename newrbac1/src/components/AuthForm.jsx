import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

import { Lock, User } from 'lucide-react';

const AuthForm = ({ onAuthSuccess }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  
  const { login } = useAuth();
  const navigate = useNavigate();


  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    
    const user = login(username, password);
    if (user) {
      // onAuthSuccess(user);
      navigate('/dashboard');
    } else {
      setError('Invalid username or password');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-purple-100 p-4">
      <div className="w-full max-w-md bg-white shadow-2xl rounded-2xl overflow-hidden">
        <div className="p-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-800">Welcome Back</h2>
            <p className="text-gray-500 mt-2">Sign in to continue</p>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-300 text-red-600 px-4 py-3 rounded-lg mb-4 text-center">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <User className="h-5 w-5 text-gray-400" />
              </div>
              <input 
                type="text" 
                placeholder="Username" 
                value={username} 
                onChange={(e) => setUsername(e.target.value)} 
                required 
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
              />
            </div>

            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock className="h-5 w-5 text-gray-400" />
              </div>
              <input 
                type={isPasswordVisible ? "text" : "password"} 
                placeholder="Password" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
                required 
                className="w-full pl-10 pr-10 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
              />
              <button 
                type="button"
                onClick={() => setIsPasswordVisible(!isPasswordVisible)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-blue-500 transition"
              >
                {isPasswordVisible ? 
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                    <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                  </svg>
                  :
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M3.707 2.293a1 1 0 00-1.414 1.414l14 14a1 1 0 001.414-1.414l-1.475-1.475a9.981 9.981 0 002.269-3.838c-1.274-4.057-5.064-7-9.542-7-.967 0-1.907.146-2.801.42L3.707 2.293zm4.344 4.344A3 3 0 017 10a3 3 0 01-.293 1.121L5.44 9.268a3 3 0 011.611-2.634zM10 7c.457 0 .884.12 1.254.334L8.663 5.123A3 3 0 0110 7zm4.533 4.533l-2.864-2.864a3 3 0 00.331-1.412 3 3 0 00-3-3c-.488 0-.937.147-1.33.392l-1.682-1.682a8.934 8.934 0 013.012-.59c4.478 0 8.268 2.943 9.542 7a9.954 9.954 0 01-2.269 3.838z" clipRule="evenodd" />
                  </svg>
                }
              </button>
            </div>

            <button 
              type="submit" 
              className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105 shadow-lg"
            >
              Sign In
            </button>
          </form>

          <div className="mt-6 text-center">
            <a href="#" className="text-blue-500 hover:underline">Forgot Password?</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthForm;


























// import React, { useState } from 'react';
// import { useAuth } from '../context/AuthContext';

// const AuthForm = ({ onAuthSuccess }) => {
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');
//   const [error, setError] = useState('');
  
//   const { login } = useAuth();

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     setError('');
    
//     const user = login(username, password);
//     if (user) {
//       onAuthSuccess(user);
//     } else {
//       setError('Invalid username or password');
//     }
//   };

//   return (
//     <div className="auth-form">
//       <h2>Login</h2>
//       {error && <p className="error">{error}</p>}
//       <form onSubmit={handleSubmit}>
//         <input 
//           type="text" 
//           placeholder="Username" 
//           value={username} 
//           onChange={(e) => setUsername(e.target.value)} 
//           required 
//         />
//         <input 
//           type="password" 
//           placeholder="Password" 
//           value={password} 
//           onChange={(e) => setPassword(e.target.value)} 
//           required 
//         />
//         <button type="submit">Login</button>
//       </form>
//     </div>
//   );
// };

// export default AuthForm;