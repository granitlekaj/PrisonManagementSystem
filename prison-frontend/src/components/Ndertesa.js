import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Modal, Form } from 'react-bootstrap';
import "./components.css";

const Ndertesa = () => {
  const [ndertesaList, setNdertesaList] = useState([]);
  const [ndertesaId, setNdertesaId] = useState('');
  const [emriNderteses, setEmriNderteses] = useState('');
  const [dataPranimitTeknik, setDataPranimitTeknik] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [modalTitle, setModalTitle] = useState('');
  const [modalAction, setModalAction] = useState('');
  const [searchText, setSearchText] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    fetchNdertesaData();
  }, []);

  const fetchNdertesaData = () => {
    fetch('https://localhost:7160/api/Ndertesa')
      .then((response) => response.json())
      .then((data) => setNdertesaList(data))
      .catch((error) => console.log(error));
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setModalTitle('');
    setModalAction('');
    setNdertesaId('');
    setEmriNderteses('');
    setError('');
  };

  const handleShowCreateModal = () => {
    setShowModal(true);
    setModalTitle('Create Ndertesa');
    setModalAction('create');
  };
  const handleShowEditModal = (ndertesa) => {
    setShowModal(true);
    setModalTitle('Edit Ndertesa');
    setModalAction('edit');
    setNdertesaId(ndertesa.ndertesaId);
    setEmriNderteses(ndertesa.emri);
    setDataPranimitTeknik(ndertesa.dataPranimitTeknik);
  };

  const handleCreate = () => {
    const newNdertesa = {
      Emri: emriNderteses,
      DataPranimitTeknik: parseInt(dataPranimitTeknik),
    };
  
    fetch('https://localhost:7160/api/Ndertesa', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newNdertesa),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to create Ndertesa');
        }
        return response.json();
      })
      .then((data) => {
        fetchNdertesaData();
        handleCloseModal();
        // Show success message
        alert('Ndertesa successfully created');
      })
      .catch((error) => {
        console.error('Error creating Ndertesa:', error);
        setError('Failed to create Ndertesa. Please check your network connection and try again.');
      });
  };
  
  
  

  const handleUpdate = () => {
    if (!emriNderteses) {
      setError('Please fill in all the fields.');
      return;
    }

    const updatedNdertesa = {
      NdertesaId: ndertesaId,
      Emri: emriNderteses,
      DataPranimitTeknik: parseInt(dataPranimitTeknik),
    };

    fetch(`https://localhost:7160/api/Ndertesa/${ndertesaId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedNdertesa),
    })
      .then(() => {
        fetchNdertesaData();
        handleCloseModal();
      })
      .catch((error) => console.log(error));
  };

  const handleDelete = (id) => {
    fetch(`https://localhost:7160/api/Ndertesa/${id}`, {
      method: 'DELETE',
    })
      .then(() => {
        fetchNdertesaData();
      })
      .catch((error) => console.log(error));
  };

  const handleSearch = (e) => {
    const searchValue = e.target.value;
    setSearchText(searchValue);
  };

  const filteredNdertesaList = searchText
    ? ndertesaList.filter((ndertesa) =>
        ndertesa.NdertesaId.toString().includes(searchText)
      )
    : ndertesaList;

  return (
    <div className="container mt-5">
      <h1>Ndertesa CRUD</h1>

      <div className="mb-3">
        <input
          type="text"
          placeholder="Search by ID of Ndertesa"
          value={searchText}
          onChange={handleSearch}
          className="form-control"
        />
      </div>

      <button className="btn btn-primary mb-3" onClick={handleShowCreateModal}>
        Create Ndertesa
      </button>

      <h2>Ndertesa List</h2>
      <div className="table-container">
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Emri</th>
              <th>VitiPranitmit</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredNdertesaList.map((ndertesa) => (
              <tr key={ndertesa.ndertesaId}>
                <td>{ndertesa.ndertesaId}</td>
                <td>{ndertesa.emri}</td>
                <td>{ndertesa.dataPranimitTeknik}</td>
                <td>
                  <button
                    className="btn btn-primary btn-sm"
                    onClick={() => handleShowEditModal(ndertesa)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-danger btn-sm ml-2"
                    onClick={() => handleDelete(ndertesa.ndertesaId)}
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
          <Form.Group controlId="ndertesaId">
  <Form.Label>ID</Form.Label>
  <Form.Control
    type="text"
    value={ndertesaId}
    onChange={(e) => setNdertesaId(e.target.value)}
    disabled={modalAction === 'edit'} // Disable the input when editing
    style={{ display: modalAction === 'edit' ? 'block' : 'none' }} // Hide the input when creating
  />
</Form.Group>
            <Form.Group controlId="emriNderteses">
              <Form.Label>Emri</Form.Label>
              <Form.Control
                type="text"
                value={emriNderteses}
                onChange={(e) => setEmriNderteses(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="dataPranimitTeknik">
  <Form.Label>Data Pranimit Teknik (Year)</Form.Label>
  <Form.Control
    type="text"
    value={dataPranimitTeknik}
    onChange={(e) => setDataPranimitTeknik(e.target.value)}
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

export default Ndertesa; 