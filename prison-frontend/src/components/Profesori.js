import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Modal, Form } from 'react-bootstrap';
import "./components.css";

const Profesori = () => {
  const [profesoriList, setProfesoriList] = useState([]);
  const [profesoriId, setProfesoriId] = useState('');
  const [emriProfesorit, setEmriProfesorit] = useState('');
  const [lendaId, setLendaId] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [modalTitle, setModalTitle] = useState('');
  const [modalAction, setModalAction] = useState('');
  const [searchText, setSearchText] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    fetchProfesoriData();
  }, []);

  const fetchProfesoriData = () => {
    fetch('https://localhost:7160/api/Profesori')
      .then((response) => response.json())
      .then((data) => setProfesoriList(data))
      .catch((error) => console.log(error));
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setModalTitle('');
    setModalAction('');
    setProfesoriId('');
    setEmriProfesorit('');
    setLendaId('');
    setError('');
  };

  const handleShowCreateModal = () => {
    setShowModal(true);
    setModalTitle('Create Profesori');
    setModalAction('create');
  };

  const handleShowEditModal = (profesori) => {
    setShowModal(true);
    setModalTitle('Edit Profesori');
    setModalAction('edit');
    setProfesoriId(profesori.profesoriId);
    setEmriProfesorit(profesori.emri);
    setLendaId(profesori.lendaId);
  };

  const handleCreate = () => {
    const newProfesori = {
      Emri: emriProfesorit,
      LendaId: parseInt(lendaId),
    };

    fetch('https://localhost:7160/api/Profesori', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newProfesori),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to create Profesori');
        }
        return response.json();
      })
      .then((data) => {
        fetchProfesoriData();
        handleCloseModal();
        // Show success message
        alert('Profesori successfully created');
      })
      .catch((error) => {
        console.error('Error creating Profesori:', error);
        setError('Failed to create Profesori. Please check your network connection and try again.');
      });
  };

  const handleUpdate = () => {
    if (!emriProfesorit || !lendaId) {
      setError('Please fill in all the fields.');
      return;
    }

    const updatedProfesori = {
      ProfesoriId: profesoriId,
      Emri: emriProfesorit,
      LendaId: parseInt(lendaId),
    };

    fetch(`https://localhost:7160/api/Profesori/${profesoriId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedProfesori),
    })
      .then(() => {
        fetchProfesoriData();
        handleCloseModal();
      })
      .catch((error) => console.log(error));
  };

  const handleDelete = (id) => {
    fetch(`https://localhost:7160/api/Profesori/${id}`, {
      method: 'DELETE',
    })
      .then(() => {
        fetchProfesoriData();
      })
      .catch((error) => console.log(error));
  };

  const handleSearch = (e) => {
    const searchValue = e.target.value;
    setSearchText(searchValue);
  };

  const filteredProfesoriList = searchText
    ? profesoriList.filter((profesori) =>
        profesori.ProfesoriId.toString().includes(searchText)
      )
    : profesoriList;

  return (
    <div className="container mt-5">
      <h1>Profesori CRUD</h1>

      <div className="mb-3">
        <input
          type="text"
          placeholder="Search by ID of Profesori"
          value={searchText}
          onChange={handleSearch}
          className="form-control"
        />
      </div>

      <button className="btn btn-primary mb-3" onClick={handleShowCreateModal}>
        Create Profesori
      </button>

      <h2>Profesori List</h2>
      <div className="table-container">
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Emri</th>
              <th>Lenda ID</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredProfesoriList.map((profesori) => (
              <tr key={profesori.profesoriId}>
                <td>{profesori.profesoriId}</td>
                <td>{profesori.emri}</td>
                <td>{profesori.lendaId}</td>
                <td>
                  <button
                    className="btn btn-primary btn-sm"
                    onClick={() => handleShowEditModal(profesori)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-danger btn-sm ml-2"
                    onClick={() => handleDelete(profesori.profesoriId)}
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
            <Form.Group controlId="emriProfesorit">
              <Form.Label>Emri</Form.Label>
              <Form.Control
                type="text"
                value={emriProfesorit}
                onChange={(e) => setEmriProfesorit(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="lendaId">
              <Form.Label>Lenda ID</Form.Label>
              <Form.Control
                type="text"
                value={lendaId}
                onChange={(e) => setLendaId(e.target.value)}
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

export default Profesori;
