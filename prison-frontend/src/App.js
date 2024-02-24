import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from "react-router-dom";
import Sektori from "./components/Sektori";
import Drejtori from "./components/Drejtori";
import Oficeri from "./components/Oficeri";
import Mjeku from "./components/Mjeku";
import Qelia from "./components/Qelia";
import Infiermeria from "./components/Infiermeria";
import Burgosuri from "./components/Burgosuri";
import Krimi from "./components/Krimi";
import Kontrolla from "./components/Kontrolla";
import Vizitori from "./components/Vizitori";
import Vizita from "./components/Vizita";
import Login from "./components/Login";
import Home from "./components/Home";
import Users from "./components/Users";
import Profile from "./components/Profile";
import Header from "./components/Header";
import Ndertesa from "./components/Ndertesa";
import Lifti from "./components/Lifti";
import Lenda from "./components/Lenda";
import Profesori from "./components/Profesori";
import Shitorja from "./components/Shitorja";
import Shitesi from "./components/Shitesi";
import "./App.css";
import Footer from "./components/Footer";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState("");
  const [username, setUsername] = useState('');
  const [token, setToken] = useState('');



  const handleLogin = (role, token) => {
    setIsLoggedIn(true);
    setUserRole(role);
    setToken(token);
    setUsername('');
    sessionStorage.setItem("isLoggedIn", "true");
    sessionStorage.setItem("userRole", role);
    sessionStorage.setItem("token", token);
  };
  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserRole("");
    sessionStorage.removeItem("isLoggedIn");
    sessionStorage.removeItem("userRole");
  };
  

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
    const fetchUsername = () => {
      console.log('Token:', token);
      fetch('https://localhost:7160/api/Profile/name', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => {
          // Check the Authorization header in the request
          console.log('Request Headers:', response.headers.get('Authorization'));
  
          if (response.ok) {
            return response.json();
          } else {
            throw new Error('Failed to fetch username');
          }
        })
        .then((data) => {
          setUsername(data.username);
          console.log('Response Data:', data);
        })
        .catch((error) => {
          console.error('Failed to fetch username:', error);
        });
    };
  
    fetchUsername();
  }, [token]);
  
  


  const guard = (element, allowedRoles) => {
    return allowedRoles.includes(userRole) ? element : <Navigate to="/" />;
  };

  return (
    <Router>
      <div className="app-container">
        {isLoggedIn && (
          <>
            <div>
              <Header username={username} handleLogout={handleLogout} />           
            </div>
            <div className="content-container">
              <div className="sidebar">
                <nav>
                  <ul>
                    <li>
                      <Link to="/home">Home</Link>
                    </li>
                    {userRole === "Director" && (
                      <>
                       <li>
                          <Link to="/users">Users</Link>
                        </li>
                        <li>
                          <Link to="/sektori">Sektori</Link>
                        </li>
                        <li>
                          <Link to="/drejtori">Drejtori</Link>
                        </li>
                        <li>
                          <Link to="/oficeri">Oficeri</Link>
                        </li>
                        <li>
                          <Link to="/mjeku">Mjeku</Link>
                        </li>
                        <li>
                          <Link to="/infiermeria">Infiermeria</Link>
                        </li>
                        <li>
                          <Link to="/qelia">Qelia</Link>
                        </li>
                        <li>
                          <Link to="/burgosuri">Burgosuri</Link>
                        </li>
                        <li>
                          <Link to="/krimi">Krimi</Link>
                        </li>
                        <li>
                          <Link to="/kontrolla">Kontrolla</Link>
                        </li>
                        <li>
                          <Link to="/vizitori">Vizitori</Link>
                        </li>
                        <li>
                          <Link to="/vizita">Vizita</Link>
                        </li>
                        <li>
                          <Link to="/ndertesa">Ndertesa</Link>
                        </li>
                        <li>
                          <Link to="/lifti">Lifti</Link>
                        </li>
                        <li>
                          <Link to="/lenda">Lenda</Link>
                        </li>
                        <li>
                          <Link to="/profesori">Profesori</Link>
                        </li>
                        <li>
                          <Link to="/shitorja">Shitorja</Link>
                        </li>
                        <li>
                          <Link to="/shitesi">Shitesi</Link>
                        </li>
                      </>
                    )}
                    {userRole === "Officer" && (
                      <>
                        <li>
                          <Link to="/sektori">Sektori</Link>
                        </li>
                        <li>
                          <Link to="/qelia">Qelia</Link>
                        </li>
                        <li>
                          <Link to="/burgosuri">Burgosuri</Link>
                        </li>
                        <li>
                          <Link to="/krimi">Krimi</Link>
                        </li>
                        <li>
                          <Link to="/vizitori">Vizitori</Link>
                        </li>
                        <li>
                          <Link to="/vizita">Vizita</Link>
                        </li>
                      </>
                    )}
                    {userRole === "Doctor" && (
                      <>
                        <li>
                          <Link to="/infiermeria">Infiermeria</Link>
                        </li>
                        <li>
                          <Link to="/kontrolla">Kontrolla</Link>
                        </li>
                      </>
                    )}
                  </ul>
                </nav>
              </div>
              <div className="content">
                <Routes>
                  <Route
                    exact
                    path="/"
                    element={guard(<Navigate to="/home" />, ["Director", "Officer", "Doctor"])}
                  />
        
                  <Route path="/home" element={guard(<Home />, ["Director", "Officer", "Doctor"])} />
                  <Route path="/profile" element={guard(<Profile />, ["Director", "Officer", "Doctor"])}/>
                  {userRole === "Director" && (
                    <>
            
                      <Route path="/users" element={guard(<Users />, ["Director"])} />
                      <Route path="/sektori" element={guard(<Sektori />, ["Director"])} />
                      <Route path="/drejtori" element={guard(<Drejtori />, ["Director"])} />
                      <Route path="/oficeri" element={guard(<Oficeri />, ["Director"])} />
                      <Route path="/mjeku" element={guard(<Mjeku />, ["Director"])} />
                      <Route path="/infiermeria" element={guard(<Infiermeria />, ["Director"])} />
                      <Route path="/qelia" element={guard(<Qelia />, ["Director"])} />
                      <Route path="/burgosuri" element={guard(<Burgosuri />, ["Director"])} />
                      <Route path="/krimi" element={guard(<Krimi />, ["Director"])} />
                      <Route path="/kontrolla" element={guard(<Kontrolla />, ["Director"])} />
                      <Route path="/vizitori" element={guard(<Vizitori />, ["Director"])} />
                      <Route path="/vizita" element={guard(<Vizita />, ["Director"])} />
                      <Route path="/ndertesa" element={guard(<Ndertesa />, ["Director"])} />
                      <Route path="/lifti" element={guard(<Lifti />, ["Director"])} />
                      <Route path="/lenda" element={guard(<Lenda />, ["Director"])} />
                      <Route path="profesori" element={guard(<Profesori/>, ["Director"])} />
                      <Route path="shitorja" element={guard(<Shitorja/>, ["Director"])} />
                      <Route path="shitesi" element={guard(<Shitesi/>, ["Director"])} />
                    </>
                  )}
                  {userRole === "Officer" && (
                    <>
                      
                      <Route path="/sektori" element={guard(<Sektori />, ["Officer"])} />
                      <Route path="/qelia" element={guard(<Qelia />, ["Officer"])} />
                      <Route path="/burgosuri" element={guard(<Burgosuri />, ["Officer"])} />
                      <Route path="/krimi" element={guard(<Krimi />, ["Officer"])} />
                      <Route path="/vizitori" element={guard(<Vizitori />, ["Officer"])} />
                      <Route path="/vizita" element={guard(<Vizita />, ["Officer"])} />
                    </>
                  )}
                  {userRole === "Doctor" && (
                    <>
                      
                      <Route path="/infiermeria" element={guard(<Infiermeria />, ["Doctor"])} />
                      <Route path="/kontrolla" element={guard(<Kontrolla />, ["Doctor"])} />
                    </>
                  )}
                </Routes>
              </div>
            </div>
          </>
        )}
        {!isLoggedIn && (
          <div className="content-container">
            <div className="content">
              <Routes>
                <Route
                  exact
                  path="/"
                  element={isLoggedIn ? <Navigate to="/home" /> : <Login onLogin={handleLogin} />}
                />
                <Route path="*" element={<Navigate to="/" />} />
                
              </Routes>
            </div>
          </div>
        )}
        <Footer />
      </div>
    </Router>
  );
};

export default App;
