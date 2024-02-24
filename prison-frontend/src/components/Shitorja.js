import React, { useState, useEffect } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';

const Shitorja = () => {
  const [shitorjaList, setShitorjaList] = useState([]);
  const [shitorjaId, setShitorjaId] = useState('');
  const [emri, setEmri] = useState('');
  const [dataEHapjas, setDataEHapjas] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [modalTitle, setModalTitle] = useState('');
  const [modalAction, setModalAction] = useState('');
  const [searchText, setSearchText] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    fetchShitorjaData();
  }, []);

  const fetchShitorjaData = () => {
    fetch('https://localhost:7160/api/Shitorja')
      .then((response) => response.json())
      .then((data) => setShitorjaList(data))
      .catch((error) => console.log(error));
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setModalTitle('');
    setModalAction('');
    setShitorjaId('');
    setEmri('');
    setDataEHapjas('');
    setError('');
  };

  const handleShowCreateModal = () => {
    setShowModal(true);
    setModalTitle('Create Shitorja');
    setModalAction('create');
  };

  const handleShowEditModal = (shitorja) => {
    setShowModal(true);
    setModalTitle('Edit Shitorja');
    setModalAction('edit');
    setShitorjaId(shitorja.shitorjaId);
    setEmri(shitorja.emri);
    setDataEHapjas(shitorja.dataEHapjas);
  };

  const handleCreate = () => {
    const newShitorja = {
      emri: emri,
      dataEHapjas: parseInt(dataEHapjas),
    };

    fetch('https://localhost:7160/api/Shitorja', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newShitorja),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to create Shitorja');
        }
        return response.json();
      })
      .then((data) => {
        fetchShitorjaData();
        handleCloseModal();
        alert('Shitorja successfully created');
      })
      .catch((error) => {
        console.error('Error creating Shitorja:', error);
        setError('Failed to create Shitorja. Please check your network connection and try again.');
      });
  };

  const handleUpdate = () => {
    if (!emri || !dataEHapjas) {
      setError('Please fill in all the fields.');
      return;
    }

    const updatedShitorja = {
      ShitorjaId: shitorjaId,
      Emri: emri,
      DataEHapjas: parseInt(dataEHapjas),
    };

    fetch(`https://localhost:7160/api/Shitorja/${shitorjaId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedShitorja),
    })
      .then(() => {
        fetchShitorjaData();
        handleCloseModal();
      })
      .catch((error) => console.log(error));
  };

  const handleDelete = (id) => {
    fetch(`https://localhost:7160/api/Shitorja/${id}`, {
      method: 'DELETE',
    })
      .then(() => {
        fetchShitorjaData();
      })
      .catch((error) => console.log(error));
  };

  const handleSearch = (e) => {
    const searchValue = e.target.value;
    setSearchText(searchValue);
  };

  const filteredShitorjaList = searchText
    ? shitorjaList.filter((shitorja) =>
        shitorja.ShitorjaId.toString().includes(searchText)
      )
    : shitorjaList;

  return (
    <div className="container mt-5">
      <h1>Shitorja CRUD</h1>

      <div className="mb-3">
        <input
          type="text"
          placeholder="Search by ID of Shitorja"
          value={searchText}
          onChange={handleSearch}
          className="form-control"
        />
      </div>

      <button className="btn btn-primary mb-3" onClick={handleShowCreateModal}>
        Create Shitorja
      </button>

      <h2>Shitorja List</h2>
      <div className="table-container">
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Emri</th>
              <th>Data e Hapjes</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredShitorjaList.map((shitorja) => (
              <tr key={shitorja.shitorjaId}>
                <td>{shitorja.shitorjaId}</td>
                <td>{shitorja.emri}</td>
                <td>{shitorja.dataEHapjas}</td>
                <td>
                  <button
                    className="btn btn-primary btn-sm"
                    onClick={() => handleShowEditModal(shitorja)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-danger btn-sm ml-2"
                    onClick={() => handleDelete(shitorja.shitorjaId)}
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
            <Form.Group controlId="dataEHapjas">
              <Form.Label>Data e Hapjes</Form.Label>
              <Form.Control
                type="text"
                value={dataEHapjas}
                onChange={(e) => setDataEHapjas(e.target.value)}
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

export default Shitorja;
