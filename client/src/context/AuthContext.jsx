// AuthContext.jsx
import { createContext, useContext, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [points, setPoints] = useState(0);
  const [isVerifying, setIsVerifying] = useState(false);
  const [lastVerifyTime, setLastVerifyTime] = useState(null);
  const navigate = useNavigate();

  const showSuccessAlert = (title, text) => {
    Swal.fire({
      title,
      text,
      icon: 'success',
      confirmButtonColor: '#ffcc00',
      background: '#2d2d2d',
      color: 'white'
    });
  };

  const showErrorAlert = (text) => {
    Swal.fire({
      title: 'Error!',
      text,
      icon: 'error',
      confirmButtonColor: '#ff6b6b',
      background: '#2d2d2d',
      color: 'white'
    });
  };

  const login = async (email, password) => {
    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', { email, password });
      localStorage.setItem('token', response.data.token);
      setToken(response.data.token);
      setUser(response.data.result);
      setPoints(response.data.result.points || 0);
      setLastVerifyTime(Date.now());
      showSuccessAlert('Login Successful', 'Welcome back!');
      navigate('/Dashboard');
    } catch (error) {
      showErrorAlert(error.response?.data?.message || 'Login failed. Please try again.');
      throw error;
    }
  };

  const signup = async (username, email, password) => {
    try {
      const response = await axios.post('http://localhost:5000/api/auth/signup', { username, email, password });
      localStorage.setItem('token', response.data.token);
      setToken(response.data.token);
      setUser(response.data.result);
      setPoints(response.data.result.points || 0);
      setLastVerifyTime(Date.now());
      showSuccessAlert('Account Created', 'Your account has been created successfully!');
      navigate('/Dashboard');
    } catch (error) {
      showErrorAlert(error.response?.data?.message || 'Signup failed. Please try again.');
      throw error;
    }
  };

  const verifyToken = useCallback(async () => {
    const storedToken = localStorage.getItem('token');
    if (!storedToken) {
      setUser(null);
      setToken(null);
      throw new Error('No token found');
    }

    if (isVerifying) {
      return new Promise((resolve, reject) => {
        const checkStatus = () => {
          if (!isVerifying) {
            verifyToken()
              .then(resolve)
              .catch(reject);
          } else {
            setTimeout(checkStatus, 100);
          }
        };
        checkStatus();
      });
    }

    if (lastVerifyTime && Date.now() - lastVerifyTime < 5 * 60 * 1000 && user) {
      return user;
    }

    try {
      setIsVerifying(true);
      const res = await axios.get('http://localhost:5000/api/auth/verify', {
        headers: {
          Authorization: `Bearer ${storedToken}`,
        },
      });
      setUser(res.data.user);
      setPoints(res.data.user.points || 0);
      setLastVerifyTime(Date.now());
      return res.data.user;
    } catch (error) {
      if (error.response?.status === 401) {
        localStorage.removeItem('token');
        setToken(null);
        setUser(null);
        setPoints(0);
        throw new Error('Session expired. Please login again.');
      }
      console.error('VerifyToken error:', error.message);
      throw error;
    } finally {
      setIsVerifying(false);
    }
  }, [isVerifying, lastVerifyTime, user]);

  const logout = () => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You will be logged out of your account',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#ffcc00',
      cancelButtonColor: '#ff6b6b',
      background: '#2d2d2d',
      color: 'white'
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem('token');
        setToken(null);
        setUser(null);
        setPoints(0);
        setLastVerifyTime(null);
        navigate('/');
      }
    });
  };

  // ADDING redeemPoints function to deduct points and update backend
  const redeemPoints = async (pointsToRedeem) => {
    if (pointsToRedeem > points) {
      showErrorAlert("You don't have enough points to redeem.");
      return false;
    }

    try {
      const response = await axios.post(
        'http://localhost:5000/api/user/redeem',
        { points: pointsToRedeem },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      const updatedPoints = response.data.points;
      setPoints(updatedPoints);
      showSuccessAlert('Points Redeemed', `You redeemed ${pointsToRedeem} points successfully.`);
      return true;
    } catch (error) {
      showErrorAlert(error.response?.data?.message || 'Redeem failed. Please try again.');
      return false;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        points,
        setPoints,
        login,
        signup,
        logout,
        verifyToken,
        isVerifying,
        redeemPoints, // expose redeemPoints in context
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
