import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Modal, Form } from 'react-bootstrap';
import "./components.css";

const Lenda = () => {
  const [lendaList, setLendaList] = useState([]);
  const [lendaId, setLendaId] = useState('');
  const [emriLendes, setEmriLendes] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [modalTitle, setModalTitle] = useState('');
  const [modalAction, setModalAction] = useState('');
  const [searchText, setSearchText] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    fetchLendaData();
  }, []);

  const fetchLendaData = () => {
    fetch('https://localhost:7160/api/Lenda')
      .then((response) => response.json())
      .then((data) => setLendaList(data))
      .catch((error) => console.log(error));
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setModalTitle('');
    setModalAction('');
    setLendaId('');
    setEmriLendes('');
    setError('');
  };

  const handleShowCreateModal = () => {
    setShowModal(true);
    setModalTitle('Create Lenda');
    setModalAction('create');
  };

  const handleShowEditModal = (lenda) => {
    setShowModal(true);
    setModalTitle('Edit Lenda');
    setModalAction('edit');
    setLendaId(lenda.lendaId);
    setEmriLendes(lenda.emri);
  };

  const handleCreate = () => {
    const newLenda = {
      Emri: emriLendes,
    };

    fetch('https://localhost:7160/api/Lenda', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newLenda),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to create Lenda');
        }
        return response.json();
      })
      .then((data) => {
        fetchLendaData();
        handleCloseModal();
        // Show success message
        alert('Lenda successfully created');
      })
      .catch((error) => {
        console.error('Error creating Lenda:', error);
        setError('Failed to create Lenda. Please check your network connection and try again.');
      });
  };

  const handleUpdate = () => {
    if (!emriLendes) {
      setError('Please fill in all the fields.');
      return;
    }

    const updatedLenda = {
      LendaId: lendaId,
      Emri: emriLendes,
    };

    fetch(`https://localhost:7160/api/Lenda/${lendaId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedLenda),
    })
      .then(() => {
        fetchLendaData();
        handleCloseModal();
      })
      .catch((error) => console.log(error));
  };

  const handleDelete = (id) => {
    fetch(`https://localhost:7160/api/Lenda/${id}`, {
      method: 'DELETE',
    })
      .then(() => {
        fetchLendaData();
      })
      .catch((error) => console.log(error));
  };

  const handleSearch = (e) => {
    const searchValue = e.target.value;
    setSearchText(searchValue);
  };

  const filteredLendaList = searchText
    ? lendaList.filter((lenda) =>
        lenda.LendaId.toString().includes(searchText)
      )
    : lendaList;

  return (
    <div className="container mt-5">
      <h1>Lenda CRUD</h1>

      <div className="mb-3">
        <input
          type="text"
          placeholder="Search by ID of Lenda"
          value={searchText}
          onChange={handleSearch}
          className="form-control"
        />
      </div>

      <button className="btn btn-primary mb-3" onClick={handleShowCreateModal}>
        Create Lenda
      </button>

      <h2>Lenda List</h2>
      <div className="table-container">
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Emri</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredLendaList.map((lenda) => (
              <tr key={lenda.lendaId}>
                <td>{lenda.lendaId}</td>
                <td>{lenda.emri}</td>
                <td>
                  <button
                    className="btn btn-primary btn-sm"
                    onClick={() => handleShowEditModal(lenda)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-danger btn-sm ml-2"
                    onClick={() => handleDelete(lenda.lendaId)}
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
            <Form.Group controlId="emriLendes">
              <Form.Label>Emri</Form.Label>
              <Form.Control
                type="text"
                value={emriLendes}
                onChange={(e) => setEmriLendes(e.target.value)}
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

export default Lenda;
