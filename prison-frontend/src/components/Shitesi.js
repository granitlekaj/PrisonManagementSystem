import React, { useState, useEffect } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';

const Shitesi = () => {
  const [shitesiList, setShitesiList] = useState([]);
  const [shitesiId, setShitesiId] = useState('');
  const [emri, setEmri] = useState('');
  const [shitorjaId, setShitorjaId] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [modalTitle, setModalTitle] = useState('');
  const [modalAction, setModalAction] = useState('');
  const [searchText, setSearchText] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    fetchShitesiData();
  }, []);

  const fetchShitesiData = () => {
    fetch('https://localhost:7160/api/Shitesi')
      .then((response) => response.json())
      .then((data) => setShitesiList(data))
      .catch((error) => console.log(error));
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setModalTitle('');
    setModalAction('');
    setShitesiId('');
    setEmri('');
    setShitorjaId('');
    setError('');
  };

  const handleShowCreateModal = () => {
    setShowModal(true);
    setModalTitle('Create Shitesi');
    setModalAction('create');
  };

  const handleShowEditModal = (shitesi) => {
    setShowModal(true);
    setModalTitle('Edit Shitesi');
    setModalAction('edit');
    setShitesiId(shitesi.shitesiId);
    setEmri(shitesi.emri);
    setShitorjaId(shitesi.shitorjaId);
  };

  const handleCreate = () => {
    const newShitesi = {
      emri: emri,
      shitorjaId: shitorjaId,
    };

    fetch('https://localhost:7160/api/Shitesi', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newShitesi),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to create Shitesi');
        }
        return response.json();
      })
      .then((data) => {
        fetchShitesiData();
        handleCloseModal();
        alert('Shitesi successfully created');
      })
      .catch((error) => {
        console.error('Error creating Shitesi:', error);
        setError('Failed to create Shitesi. Please check your network connection and try again.');
      });
  };

  const handleUpdate = () => {
    if (!emri || !shitorjaId) {
      setError('Please fill in all the fields.');
      return;
    }

    const updatedShitesi = {
      ShitesiId: shitesiId,
      Emri: emri,
      ShitorjaId: shitorjaId,
    };

    fetch(`https://localhost:7160/api/Shitesi/${shitesiId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedShitesi),
    })
      .then(() => {
        fetchShitesiData();
        handleCloseModal();
      })
      .catch((error) => console.log(error));
  };

  const handleDelete = (id) => {
    fetch(`https://localhost:7160/api/Shitesi/${id}`, {
      method: 'DELETE',
    })
      .then(() => {
        fetchShitesiData();
      })
      .catch((error) => console.log(error));
  };

  const handleSearch = (e) => {
    const searchValue = e.target.value;
    setSearchText(searchValue);
  };

  const filteredShitesiList = searchText
    ? shitesiList.filter((shitesi) =>
        shitesi.ShitesiId.toString().includes(searchText)
      )
    : shitesiList;

  return (
    <div className="container mt-5">
      <h1>Shitesi CRUD</h1>

      <div className="mb-3">
        <input
          type="text"
          placeholder="Search by ID of Shitesi"
          value={searchText}
          onChange={handleSearch}
          className="form-control"
        />
      </div>

      <button className="btn btn-primary mb-3" onClick={handleShowCreateModal}>
        Create Shitesi
      </button>

      <h2>Shitesi List</h2>
      <div className="table-container">
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Emri</th>
              <th>Shitorja ID</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredShitesiList.map((shitesi) => (
              <tr key={shitesi.shitesiId}>
                <td>{shitesi.shitesiId}</td>
                <td>{shitesi.emri}</td>
                <td>{shitesi.shitorjaId}</td>
                <td>
                  <button
                    className="btn btn-primary btn-sm"
                    onClick={() => handleShowEditModal(shitesi)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-danger btn-sm ml-2"
                    onClick={() => handleDelete(shitesi.shitesiId)}
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
            <Form.Group controlId="emri">
              <Form.Label>Emri</Form.Label>
              <Form.Control
                type="text"
                value={emri}
                onChange={(e) => setEmri(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="shitorjaId">
              <Form.Label>Shitorja ID</Form.Label>
              <Form.Control
                type="text"
                value={shitorjaId}
                onChange={(e) => setShitorjaId(e.target.value)}
              />
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

export default Shitesi;
