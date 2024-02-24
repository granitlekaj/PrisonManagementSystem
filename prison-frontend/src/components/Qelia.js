import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Modal, Form } from 'react-bootstrap';
import "./components.css";

const Qelia = () => {
  const [qeliaList, setQeliaList] = useState([]);
  const [qeliaID, setQeliaID] = useState('');
  const [emriQelis, setEmriQelis] = useState('');
  const [kapacitetiTeBurgosurve, setKapacitetiTeBurgosurve] = useState('');
  const [sektoriID, setSektoriID] = useState(0);
  const [created_at, setCreatedAt] = useState('');
  const [updated_at, setUpdatedAt] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [modalTitle, setModalTitle] = useState('');
  const [modalAction, setModalAction] = useState('');
  const [sektoriOptions, setSektoriOptions] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [error, setError]=useState('');
  

  useEffect(() => {
    fetchSektoriData();
    fetchQeliaData();
  }, []);
  
  

  const fetchSektoriData = async () => {
    try {
      const response = await fetch('https://localhost:7160/api/Sektori');
      const data = await response.json();
      setSektoriOptions(data);
    } catch (error) {
      console.log(error);
    }
  };
  
  
  
  const fetchQeliaData = () => {
    fetch('https://localhost:7160/api/Qelia')
      .then((response) => response.json())
      .then((data) => setQeliaList(data))
      .catch((error) => console.log(error));
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setModalTitle('');
    setModalAction('');
    setQeliaID(0);
    setEmriQelis('');
    setKapacitetiTeBurgosurve('');
    setSektoriID(0);
    setCreatedAt('');
    setUpdatedAt('');
  };

  const handleShowCreateModal = () => {
    setShowModal(true);
    setModalTitle('Create Qelia');
    setModalAction('create');
    const currentLocalTime = new Date().toISOString();
    setCreatedAt(currentLocalTime);
    setUpdatedAt(currentLocalTime);
  };

  const handleShowEditModal = (qelia) => {
    setShowModal(true);
    setModalTitle('Edit Qelia');
    setModalAction('edit');
    setQeliaID(qelia.qeliaID);
    setEmriQelis(qelia.emriQelis)
    setKapacitetiTeBurgosurve(qelia.kapacitetiTeBurgosurve);
    setSektoriID(qelia.sektoriID);
    setCreatedAt(qelia.created_at);
    setUpdatedAt(new Date().toISOString());
  };

  const handleCreate = () => {
    if (!qeliaID ) {
      setError('Please fill Cell ID.');
      return;
    }
    if(!emriQelis){
      setError('Please fill the name of Cell!');
      return;
    }
    if(!kapacitetiTeBurgosurve){
      setError('Please fill capacity!');
      return;
    }
    if(!sektoriID){
      setError('Please fill the Sector');
      return;
    }
    
    
    const newQelia = {
      qeliaID: qeliaID,
      emriQelis:emriQelis,
      kapacitetiTeBurgosurve: kapacitetiTeBurgosurve,
      sektoriID: sektoriID,
      created_at: created_at,
      updated_at: updated_at
    };

    const existingQelia = qeliaList.find(
      (sektori) => Number(sektori.qeliaID) === Number(qeliaID)
    );
  
    if (existingQelia) {
      setError('A Cell with the same ID already exists.');
      return;
    }

    fetch('https://localhost:7160/api/Qelia/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newQelia)
    })
      .then((response) => response.json())
      .then(() => {
        fetchQeliaData();
        handleCloseModal();
      })
      .catch((error) => console.log(error));
  };

  const handleUpdate = () => {
    if(!emriQelis){
      setError('Please fill the name of Cell!');
      return;
    }
    if(!kapacitetiTeBurgosurve){
      setError('Please fill capacity!');
      return;
    }
    if(!sektoriID){
      setError('Please fill the Sector');
      return;
    }
    const updateQelia = {
      qeliaID: qeliaID,
      emriQelis:emriQelis,
      kapacitetiTeBurgosurve: kapacitetiTeBurgosurve,
      sektoriID: sektoriID,
      created_at: created_at,
      updated_at: updated_at
    };

    fetch(`https://localhost:7160/api/Qelia/${qeliaID}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(updateQelia)
    })
      .then((response) => response.json())
      .then(() => {
        fetchQeliaData();
        handleCloseModal();
      })
      .catch((error) => console.log(error));
  };

  const handleDelete = (qeliaID) => {
    fetch(`https://localhost:7160/api/Qelia/${qeliaID}`, {
      method: 'DELETE'
    })
      .then((response) => response.json())
      .then(() => {
        fetchQeliaData();
      })
      .catch((error) => console.log(error));
  };

  const handleSearch = (e) => {
    const searchValue = e.target.value;
    setSearchText(searchValue);
  };

  const filteredQeliaList = searchText
  ? qeliaList.filter((qelia) => qelia.qeliaID.toString().includes(searchText)) 
  : qeliaList;

  return (
    <div className="container mt-5">
      <h1>Qelia CRUD</h1>
      <div className="mb-3">
        <input
          type="text"
          placeholder="Search by ID of Cell"
          value={searchText}
          onChange={handleSearch}
          className="form-control"
        />
      </div>
      <button className="btn btn-primary mb-3" onClick={handleShowCreateModal}>Create Qelia</button>
  
      <h2>Qelia List</h2>
      <div className="table-container">
      <table className="table">
        <thead>
          <tr>
            <th>QeliaID</th>
            <th>Emri Qelis</th>
            <th>Kapaciteti</th>
            <th>SektoriID-Emri Sektorit</th>
            <th>Created At</th>
            <th>Updated At</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
        {filteredQeliaList.map((qelia) => {
  const sektori = sektoriOptions.find((sektor) => sektor.sektoriID === qelia.sektoriID);
  const emriSektorit = sektori ? sektori.emriSektorit : '';

  return (
    <tr key={qelia.qeliaID}>
      <td>{qelia.qeliaID}</td>
      <td>{qelia.emriQelis}</td>
      <td>{qelia.kapacitetiTeBurgosurve}</td>
      <td>{qelia.sektoriID} - {emriSektorit}</td>
      <td>{qelia.created_at}</td>
      <td>{qelia.updated_at}</td>
      <td>
        <button className="btn btn-primary btn-sm" onClick={() => handleShowEditModal(qelia)}>Edit</button>
        <button className="btn btn-danger btn-sm ml-2" onClick={() => handleDelete(qelia.qeliaID)}>Delete</button>
      </td>
    </tr>
  );
})}
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
          <Form.Group controlId="qeliaID">
              <Form.Label>Qelia ID:</Form.Label>
              <Form.Control
                type="number"
                value={qeliaID}
                onChange={(e) => setQeliaID(e.target.value)}
                disabled={modalAction === "edit"}
              />
              </Form.Group>
            <Form.Group controlId="emriQelise">
                <Form.Label>Emri Qelis:</Form.Label>
                <Form.Control type="text" value={emriQelis} onChange={(e) => setEmriQelis(e.target.value)}>
                </Form.Control>
            
            </Form.Group>
            <Form.Group controlId="kapacitetiTeBurgosurve">
                <Form.Label>Kapaciteti:</Form.Label>
                <Form.Control type="text" value={kapacitetiTeBurgosurve} onChange={(e) => setKapacitetiTeBurgosurve(e.target.value)}>
                </Form.Control>
            </Form.Group>
            <Form.Group controlId="sektoriID">
  <Form.Label>Sektori ID:</Form.Label>
  <Form.Control as="select" value={sektoriID} onChange={(e) => setSektoriID(parseInt(e.target.value))}>
    <option value="">Select Sektori</option>
    {sektoriOptions.map((sektori) => (
      <option key={sektori.sektoriID} value={sektori.sektoriID}>
        {`${sektori.sektoriID} - ${sektori.emriSektorit}`}
      </option>
    ))}
  </Form.Control>
</Form.Group>


            {modalAction === 'create' && (
              <Form.Group controlId="createdAt">
                <Form.Label>Created At:</Form.Label>
                <Form.Control type="text" value={created_at} onChange={(e) => setCreatedAt(e.target.value)} disabled />
              </Form.Group>
            )}
            {modalAction === 'edit' && (
              <Form.Group controlId="createdAt">
                <Form.Label>Created At:</Form.Label>
                <Form.Control type="text" value={created_at} onChange={(e) => setCreatedAt(e.target.value)} disabled />
              </Form.Group>
            )}
            <Form.Group controlId="updatedAt">
              <Form.Label>Updated At:</Form.Label>
              <Form.Control type="text" value={updated_at} onChange={(e) => setUpdatedAt(e.target.value)} disabled={modalAction === 'create'} readOnly />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>Close</Button>
          {modalAction === 'create' && (
            <Button variant="primary" onClick={handleCreate}>Create</Button>
          )}
          {modalAction === 'edit' && (
            <Button variant="primary" onClick={handleUpdate}>Update</Button>
          )}
        </Modal.Footer>
      </Modal>
    </div>
  );
  
};

export default Qelia;


