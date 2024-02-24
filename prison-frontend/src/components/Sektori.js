import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Modal, Form } from 'react-bootstrap';
import "./components.css";


const Sektori = () => {
  const [sektoriList, setSektoriList] = useState([]);
  const [sektoriID, setSektoriID] = useState('');
  const [emriSektorit, setEmriSektorit] = useState('');
  const [created_at, setCreatedAt] = useState('');
  const [updated_at, setUpdatedAt] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [modalTitle, setModalTitle] = useState('');
  const [modalAction, setModalAction] = useState('');
  const [searchText, setSearchText] = useState('');
  const [error, setError] = useState('');
  

  useEffect(() => {
    fetchSektoriData();
  }, []);

  const fetchSektoriData = () => {
    fetch('https://localhost:7160/api/Sektori')
      .then((response) => response.json())
      .then((data) => setSektoriList(data))
      .catch((error) => console.log(error));
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setModalTitle('');
    setModalAction('');
    setSektoriID('');
    setEmriSektorit('');
    setCreatedAt('');
    setUpdatedAt('');
    setError('');
  };

  const handleShowCreateModal = (sektori) => {
    setShowModal(true);
    setModalTitle('Create Sektori');
    setModalAction('create');
    const currentLocalTime = new Date().toLocaleString();
    setCreatedAt(currentLocalTime);
    setUpdatedAt(sektori.created_at);
  };

  const handleShowEditModal = (sektori) => {
    setShowModal(true);
    setModalTitle('Edit Sektori');
    setModalAction('edit');
    setSektoriID(sektori.sektoriID);
    setEmriSektorit(sektori.emriSektorit);
    setCreatedAt(sektori.created_at);

    // Set updated_at to the current local time
    const currentLocalTime = new Date().toLocaleString();
    setUpdatedAt(currentLocalTime);
  };

  const handleCreate = () => {
    if (!sektoriID ) {
      setError('Please fill Sector ID.');
      return;
    }
    if(!emriSektorit){
      setError('Please fill the name of Sector.');
      return;
    }
  
    const newSektori = {
      sektoriID: sektoriID,
      emriSektorit: emriSektorit,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };
  
    const existingSektori = sektoriList.find(
      (sektori) => Number(sektori.sektoriID) === Number(sektoriID)
    );
  
    if (existingSektori) {
      setError('A Sektor with the same ID already exists.');
      return;
    }

    if (sektoriID <= 0) {
      setError('ID must be a positive number greater than zero.');
      return;
    }
  
    fetch('https://localhost:7160/api/Sektori/', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify(newSektori)
})
  .then((response) => response.json())
  .then(() => {
    fetchSektoriData();
    handleCloseModal();
    // Show success message
    alert('Data successfully created');
  })
  .catch((error) => console.log(error));
  };
  
  

  const handleUpdate = () => {
    if (!emriSektorit) {
      setError('Please fill in all the fields.');
      return;
    }

    const updatedSektori = {
      sektoriID: sektoriID,
      emriSektorit: emriSektorit,
      created_at: created_at,
      updated_at: new Date().toISOString()
    };

    fetch(`https://localhost:7160/api/Sektori/${sektoriID}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(updatedSektori)
    })
      .then((response) => response.json())
      .then(() => {
        fetchSektoriData();
        handleCloseModal();
      })
      .catch((error) => console.log(error));
  };

  const handleDelete = (sektoriID) => {
    fetch(`https://localhost:7160/api/Sektori/${sektoriID}`, {
      method: 'DELETE'
    })
      .then((response) => response.json())
      .then(() => {
        fetchSektoriData();
      })
      .catch((error) => console.log(error));
  };

  const handleSearch = (e) => {
    const searchValue = e.target.value;
    setSearchText(searchValue);
  };

  const filteredSektoriList = searchText
    ? sektoriList.filter((drejtori) =>
        drejtori.sektoriID.toString().includes(searchText)
      )
    : sektoriList;

  return (
    <div className="container mt-5">
      <h1>Sektori CRUD</h1>

      <div className="mb-3">
        <input
          type="text"
          placeholder="Search by ID of Sector"
          value={searchText}
          onChange={handleSearch}
          className="form-control"
        />
      </div>

      <button className="btn btn-primary mb-3" onClick={handleShowCreateModal}>
        Create Sektori
      </button>

      <h2>Sektori List</h2>
      <div className="table-container">
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Emri</th>
              <th>Created At</th>
              <th>Updated At</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredSektoriList.map((sektori) => (
              <tr key={sektori.sektoriID}>
                <td>{sektori.sektoriID}</td>
                <td>{sektori.emriSektorit}</td>
                <td>{sektori.created_at}</td>
                <td>{sektori.updated_at}</td>
                <td>
                  <button
                    className="btn btn-primary btn-sm"
                    onClick={() => handleShowEditModal(sektori)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-danger btn-sm ml-2"
                    onClick={() => handleDelete(sektori.sektoriID)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>{modalTitle}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        {error && <p className="text-danger">{error}</p>} 
          <Form>
            <Form.Group controlId="sektoriID">
              <Form.Label>ID</Form.Label>
              <Form.Control
                type="text"
                value={sektoriID}
                onChange={(e) => setSektoriID(e.target.value)}
                disabled={modalAction === 'edit'}
              />
              
            </Form.Group>
            <Form.Group controlId="emriSektorit">
              <Form.Label>Emri</Form.Label>
              <Form.Control
                type="text"
                value={emriSektorit}
                onChange={(e) => setEmriSektorit(e.target.value)}
              />
              
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
          {modalAction === 'edit' && (
            <Button variant="primary" onClick={handleUpdate}>
              Update
            </Button>
          )}
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Sektori;
