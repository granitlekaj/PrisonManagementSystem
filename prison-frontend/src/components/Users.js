import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Modal, Form } from 'react-bootstrap';
import './components.css';
import "./Home.css";

const Users = () => {
  const [usersList, setUsersList] = useState([]);
  const [userId, setUserId] = useState('');
  const [username, setUsername] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');
  const [roleName, setRoleName] = useState('');
  const [created_at, setCreatedAt] = useState('');
  const [updated_at, setUpdatedAt] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [modalTitle, setModalTitle] = useState('');
  const [modalAction, setModalAction] = useState('');
  const [error, setError] = useState('');
  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    fetchUsersData();
  }, []);

  const fetchUsersData = () => {
    fetch('https://localhost:7160/api/Auth')
      .then((response) => response.json())
      .then((data) => setUsersList(data))
      .catch((error) => console.log(error));
  };
  console.log(usersList)
  const handleCloseModal = () => {
    setShowModal(false);
    setModalTitle('');
    setModalAction('');
    setUserId('');
    setUsername('');
    setFirstName('');
    setLastName('');
    setEmail('');
    setPassword('');
    setRole('');
  };

  const handleShowCreateModal = (user) => {
    setShowModal(true);
    setModalTitle('Create User');
    setModalAction('create');
    const currentLocalTime = new Date().toLocaleString();
    setCreatedAt(currentLocalTime);
    setUpdatedAt(user.created_at);
  };

  const handleShowEditModal = (user) => {
    setShowModal(true);
    setModalTitle('Edit User');
    setModalAction('edit');
    setUserId(user.userId);
    setUsername(user.username);
    setFirstName(user.firstName);
    setLastName(user.lastName);
    setEmail(user.email);
    setPassword(user.password);
    setRole(user.role);
    setCreatedAt(user.created_at);
    // Set updated_at to the current local time
    const currentLocalTime = new Date().toLocaleString();
    setUpdatedAt(currentLocalTime);
  };

  const handleCreate = () => {
    if (!username) {
      setError('Please fill in the username.');
      return;
    }
    if (!firstName) {
      setError('Please fill in the username.');
      return;
    }
    if (!lastName) {
      setError('Please fill in the username.');
      return;
    }
    if (!email) {
      setError('Please fill in the email.');
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('Please enter a valid email address.');
      return;
    }
    if (!password) {
      setError('Please fill in the password.');
      return;
    }
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()])[A-Za-z\d!@#$%^&*()]{6,}$/; //Password should contain a uppercase, have at least one number and symbol and the length should be greater than 6 characters

  if (!passwordRegex.test(password)) {
    setError(
      'Password must contain at least one uppercase letter, one number, one symbol, and be at least 6 characters long.'
    );
    return;
  }

    if (!role) {
      setError('Please fill in the role.');
      return;
    }

    const newUser = {
      userId: userId,
      username: username,
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: password,
      role: role,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    const existingUser = usersList.find((user) => user.username === username);

    if (existingUser) {
      setError('There is already a user with this username.');
      return;
    }
    const existingEmail = usersList.find((user) => user.email === email);

    if (existingEmail) {
      setError('There is already a user with this email.');
      return;
    }

    fetch('https://localhost:7160/api/Auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newUser),
    })
      .then((response) => response.json())
      .then(() => {
        fetchUsersData();
        handleCloseModal();
      })
      .catch((error) => console.log(error));
  };

  const handleUpdate = () => {
    if (!firstName) {
      setError('Please fill in the username.');
      return;
    }
    if (!lastName) {
      setError('Please fill in the username.');
      return;
    }
    if (!email) {
      setError('Please fill in the email.');
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailRegex.test(email)) {
    setError('Please enter a valid email address.');
    return;
  }
    if (!password) {
      setError('Please fill in the password.');
      return;
    }
    const passwordRegex2 = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()])[A-Za-z\d!@#$%^&*()]{6,}$/; //Password should contain a uppercase, have at least one number and symbol and the length should be greater than 6 characters

    if (!passwordRegex2.test(password)) {
      setError(
        'Password must contain at least one uppercase letter, one number, one symbol, and be at least 6 characters long.'
      );
      return;
    }
    if (!role) {
      setError('Please fill in the role.');
      return;
    }


    const updatedUser = {
      userId: userId,
      username: username,
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: password,
      role: role,
      created_at: created_at,
      updated_at: new Date().toISOString()
    };

    
    

    fetch(`https://localhost:7160/api/Auth/${username}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(updatedUser)
    })
      .then((response) => response.json())
      .then(() => {
        fetchUsersData();
        handleCloseModal();
      })
      .catch((error) => console.log(error));
  };

  const handleDelete = (userId) => {
    fetch(`https://localhost:7160/api/Auth/${userId}`, {
      method: 'DELETE',
    })
      .then((response) => response.json())
      .then(() => {
        fetchUsersData();
      })
      .catch((error) => console.log(error));
  };

  const handleSearch = (e) => {
    const searchValue = e.target.value;
    setSearchText(searchValue);
  };

  const filtredUsersList = searchText
    ? usersList.filter((user) =>
    user.username.toString().includes(searchText)
      )
    : usersList;


  return (
    <div>
      <h1 className='h1'>Users</h1>
      <div className="mb-3">
        <input
          type="text"
          placeholder="Search by username of User"
          value={searchText}
          onChange={handleSearch}
          className="form-control"
        />
      </div>
      <div className="action-buttons">
    <Button variant="primary" onClick={handleShowCreateModal}>
      Create User
    </Button>
  </div>

  <table className="users-table">
    <thead>
      <tr>
      
            <th>Username</th>
            <th>Name</th>
            <th>Surname</th>
            <th>Email</th>
            <th>Password</th>
            <th>Role</th>
            <th>Created At</th>
            <th>Updated At</th>
            <th>Action</th>
      </tr>
    </thead>
    <tbody>
      {filtredUsersList.map((user) => (
        <tr key={user.userId}>
           
              <td>{user.username}</td>
              <td>{user.firstName}</td>
              <td>{user.lastName}</td>
              <td>{user.email}</td>
              <td>{user.password}</td>
              <td>{user.roleName}</td>
              <td>{user.created_at}</td>
              <td>{user.updated_at}</td>
          <td>
            <Button
              className='btn btn-primary btn-sm'
              onClick={() => handleShowEditModal(user)}
            >
              Edit
            </Button>
            <Button
              className='btn btn-danger btn-sm ml-2'
              onClick={() => handleDelete(user.userId)}
            >
              Delete
            </Button>
          </td>
        </tr>
      ))}
    </tbody>
  </table>

  <Modal show={showModal} onHide={handleCloseModal}>
    <Modal.Header closeButton>
      <Modal.Title>{modalTitle}</Modal.Title>
    </Modal.Header>
    <Modal.Body>
      {error && <div className="error">{error}</div>}
      <Form>
        <Form.Group controlId="username">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            value={username}
            disabled={modalAction === 'edit'}
            onChange={(e) => setUsername(e.target.value)}
            
          />
        </Form.Group>
        <Form.Group controlId="firstName">
          <Form.Label>First Name</Form.Label>
          <Form.Control
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="lastName">
          <Form.Label>Last Name</Form.Label>
          <Form.Control
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>
          <Form.Group controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>
        
        <Form.Group controlId="role">
          <Form.Label>Role</Form.Label>
          <Form.Control
            as="select"
            value={role}
            onChange={(e) => setRole(e.target.value)}
          >
            <option value="">Select Role</option>
            <option value="Director">Director</option>
            <option value="Doctor">Doctor</option>
            <option value="Officer">Officer</option>
          </Form.Control>
        </Form.Group>
        <Form.Group controlId="createdAt">
              <Form.Label>Created At</Form.Label>
              <Form.Control type="text" value={created_at} readOnly />
            </Form.Group>
            <Form.Group controlId="updatedAt">
              <Form.Label>Updated At</Form.Label>
              <Form.Control type="text" value={updated_at} readOnly />
            </Form.Group>
      </Form>
    </Modal.Body>
    <Modal.Footer>
    {modalAction === 'create' && (
            <Button variant="primary" onClick={handleCreate}>
              Create
            </Button>
          )}
      <Button variant="secondary" onClick={handleCloseModal}>
        Close
      </Button>
      {modalAction === 'edit' && (
            <Button variant="primary" onClick={handleUpdate}>
              Update
            </Button>
          )}
      
    </Modal.Footer>
  </Modal>
</div>
);
};

export default Users;