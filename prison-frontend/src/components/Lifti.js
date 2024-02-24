import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Modal, Form } from 'react-bootstrap';
import "./components.css";

const Lifti = () => {
  const [liftiList, setLiftiList] = useState([]);
  const [liftiId, setLiftiId] = useState('');
  const [emri, setEmri] = useState('');
  const [ndertesaId, setNdertesaId] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [modalTitle, setModalTitle] = useState('');
  const [modalAction, setModalAction] = useState('');
  const [searchText, setSearchText] = useState('');
  const [error, setError] = useState('');
  const [ndertesaOptions, setNdertesaOptions] = useState([]);
  const [showLiftiIdInput, setShowLiftiIdInput] = useState(false); // Control visibility of LiftiId input

  useEffect(() => {
    fetchLiftiData();
    fetchNdertesaOptions();
  }, []);

  const fetchLiftiData = () => {
    fetch('https://localhost:7160/api/Lifti')
      .then((response) => response.json())
      .then((data) => setLiftiList(data))
      .catch((error) => console.log(error));
  };

  const fetchNdertesaOptions = () => {
    fetch('https://localhost:7160/api/Ndertesa')
      .then((response) => response.json())
      .then((data) => {
        const options = data.map((ndertesa) => ({
          value: ndertesa.ndertesaId,
          label: ndertesa.ndertesaId.toString(), // You can customize the label as needed
        }));
        setNdertesaOptions(options);
      })
      .catch((error) => console.log(error));
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setModalTitle('');
    setModalAction('');
    setLiftiId('');
    setEmri('');
    setNdertesaId('');
    setError('');
    setShowLiftiIdInput(false); // Reset the visibility of LiftiId input
  };

  const handleShowCreateModal = () => {
    setShowModal(true);
    setModalTitle('Create Lifti');
    setModalAction('create');
    setShowLiftiIdInput(false); // Hide LiftiId input when creating a new record
  };

  const handleShowEditModal = (lifti) => {
    setShowModal(true);
    setModalTitle('Edit Lifti');
    setModalAction('edit');
    setLiftiId(lifti.liftiId);
    setEmri(lifti.emri);
    setNdertesaId(lifti.ndertesaId);
    setShowLiftiIdInput(true); // Show LiftiId input when editing a record
  };

  const handleCreate = () => {
    const newLifti = {
      Emri: emri,
      NdertesaId: ndertesaId,
    };
  
    fetch('https://localhost:7160/api/Lifti', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newLifti),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to create Lifti');
        }
        return response.json();
      })
      .then((data) => {
        fetchLiftiData();
        handleCloseModal();
        // Show success message
        alert('Lifti successfully created');
      })
      .catch((error) => {
        console.error('Error creating Lifti:', error);
        setError('Failed to create Lifti. Please check your network connection and try again.');
      });
  };

  const handleUpdate = () => {
    if (!emri || !ndertesaId) {
      setError('Please fill in all the fields.');
      return;
    }

    const updatedLifti = {
      LiftiId: liftiId,
      Emri: emri,
      NdertesaId: ndertesaId,
    };

    fetch(`https://localhost:7160/api/Lifti/${liftiId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedLifti),
    })
      .then(() => {
        fetchLiftiData();
        handleCloseModal();
      })
      .catch((error) => console.log(error));
  };

  const handleDelete = (id) => {
    fetch(`https://localhost:7160/api/Lifti/${id}`, {
      method: 'DELETE',
    })
      .then(() => {
        fetchLiftiData();
      })
      .catch((error) => console.log(error));
  };

  const handleSearch = (e) => {
    const searchValue = e.target.value;
    setSearchText(searchValue);
  };

  const filteredLiftiList = searchText
    ? liftiList.filter((lifti) =>
        lifti.LiftiId.toString().includes(searchText)
      )
    : liftiList;

  return (
    <div className="container mt-5">
      <h1>Lifti CRUD</h1>

      <div className="mb-3">
        <input
          type="text"
          placeholder="Search by ID of Lifti"
          value={searchText}
          onChange={handleSearch}
          className="form-control"
        />
      </div>

      <button className="btn btn-primary mb-3" onClick={handleShowCreateModal}>
        Create Lifti
      </button>

      <h2>Lifti List</h2>
      <div className="table-container">
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Emri</th>
              <th>NdertesaId</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredLiftiList.map((lifti) => (
              <tr key={lifti.liftiId}>
                <td>{lifti.liftiId}</td>
                <td>{lifti.emri}</td>
                <td>{lifti.ndertesaId}</td>
                <td>
                  <button
                    className="btn btn-primary btn-sm"
                    onClick={() => handleShowEditModal(lifti)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-danger btn-sm ml-2"
                    onClick={() => handleDelete(lifti.liftiId)}
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
            {showLiftiIdInput && (
              <Form.Group controlId="liftiId">
                <Form.Label>ID</Form.Label>
                <Form.Control
                  type="text"
                  value={liftiId}
                  onChange={(e) => setLiftiId(e.target.value)}
                  disabled={modalAction === 'edit'}
                />
              </Form.Group>
            )}
            <Form.Group controlId="emri">
              <Form.Label>Emri</Form.Label>
              <Form.Control
                type="text"
                value={emri}
                onChange={(e) => setEmri(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="ndertesaId">
              <Form.Label>NdertesaId</Form.Label>
              <Form.Control
                as="select"
                value={ndertesaId}
                onChange={(e) => setNdertesaId(e.target.value)}
              >
                <option value="">Select NdertesaId</option>
                {ndertesaOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </Form.Control>
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

export default Lifti; 