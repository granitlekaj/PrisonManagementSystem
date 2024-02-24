import React, { useEffect, useState } from 'react';

const Profile = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState('');
  const [userData, setUserData] = useState(null);
  const [token, setToken] = useState('');
  

  useEffect(() => {
    const storedLoginStatus = sessionStorage.getItem('isLoggedIn');
    const storedUserRole = sessionStorage.getItem('userRole');
    const storedToken = sessionStorage.getItem('token');
    if (storedLoginStatus === 'true' && storedUserRole && storedToken) {
      setIsLoggedIn(true);
      setUserRole(storedUserRole);
      setToken(storedToken);
    }
  }, []);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        console.log('Token:', token);
        const response = await fetch('https://localhost:7160/api/Profile/user-data', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        // Check the Authorization header in the request
        console.log('Request Headers:', response.headers.get('Authorization'));

        if (response.ok) {
          const data = await response.text();
          setUserData(data);
          console.log('Response Data:', data);
        } else {
          throw new Error('Failed to fetch user data');
        }
      } catch (error) {
        console.error('Failed to fetch user data:', error);
      }
    };

    if (token) {
      fetchUserData();
    }
  }, [token]);

  if (!isLoggedIn) {
    // Render your login component here
    return null;
  }

  return (
    <div>
      <h1>Profile</h1>
      {userData ? (
        <div>
          {userData.split('\n').map((line, index) => (
            <p key={index}>{line}</p>
          ))}
        </div>
      ) : (
        <div>No user data available.</div>
      )}
      
    </div>
  );
};

export default Profile;
