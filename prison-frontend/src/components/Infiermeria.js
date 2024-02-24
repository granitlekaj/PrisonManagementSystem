import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Modal, Form } from 'react-bootstrap';
import "./components.css";

const Infiermeria = () => {
  const [infiermeriaList, setInfiermeriaList] = useState([]);
  const [infiermeriaID, setInfiermeriaID] = useState('');
  const [sektoriID, setSektoriID] = useState(0);
  const [kapaciteti, setKapaciteti] = useState('');
  const [created_at, setCreatedAt] = useState('');
  const [updated_at, setUpdatedAt] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [modalTitle, setModalTitle] = useState('');
  const [modalAction, setModalAction] = useState('');
  const [sektoriOptions, setSektoriOptions] = useState([]);
  const [searchText, setSearchText]=useState('');
  const [error, setError]=useState('');

  useEffect(() => {
    fetchSektoriData();
    fetchInfiermeriaData();
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
  
  
  
  const fetchInfiermeriaData = () => {
    fetch('https://localhost:7160/api/Infiermeria')
      .then((response) => response.json())
      .then((data) => setInfiermeriaList(data))
      .catch((error) => console.log(error));
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setModalTitle('');
    setModalAction('');
    setInfiermeriaID('');
    setSektoriID('');
    setKapaciteti('');
    setCreatedAt('');
    setUpdatedAt('');
  };

  const handleShowCreateModal = () => {
    setShowModal(true);
    setModalTitle('Create Infiermeria');
    setModalAction('create');
    const currentLocalTime = new Date().toISOString();
    setCreatedAt(currentLocalTime);
    setUpdatedAt(currentLocalTime);
  };

  const handleShowEditModal = (infermieria) => {
    setShowModal(true);
    setModalTitle('Edit Infiermeria');
    setModalAction('edit');
    setInfiermeriaID(infermieria.infiermeriaID);
    setSektoriID(infermieria.sektoriID);
    setKapaciteti(infermieria.kapaciteti);
    setCreatedAt(infermieria.created_at);
    setUpdatedAt(new Date().toISOString());
  };

  const handleCreate = () => {
    if (!infiermeriaID ) {
      setError('Please fill Infiermeria ID.');
      return;
    }
    if(!sektoriID){
      setError('Please fill the Sector');
      return;
    }
    if(!kapaciteti){
      setError('Please fill capacity!');
      return;
    }

    const newInfiermeria = {
      infiermeriaID: infiermeriaID,
      sektoriID: sektoriID,
      kapaciteti:kapaciteti,
      created_at: created_at,
      updated_at: updated_at
    };

    const existingInfiermeria = infiermeriaList.find(
      (sektori) => Number(sektori.infiermeriaID) === Number(infiermeriaID)
    );
  
    if (existingInfiermeria) {
      setError('There is already a Infiermeria with this ID');
      return;
    }

    fetch('https://localhost:7160/api/Infiermeria/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newInfiermeria)
    })
      .then((response) => response.json())
      .then(() => {
        fetchInfiermeriaData();
        handleCloseModal();
      })
      .catch((error) => console.log(error));
  };

  const handleUpdate = () => {
    if(!sektoriID){
      setError('Please fill the Sector');
      return;
    }
    if(!kapaciteti){
      setError('Please fill capacity!');
      return;
    }

    const updateInfiermeria = {
      infiermeriaID: infiermeriaID,
      sektoriID: sektoriID,
      kapaciteti: kapaciteti,
      created_at: created_at,
      updated_at: updated_at
    };

    fetch(`https://localhost:7160/api/Infiermeria/${infiermeriaID}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(updateInfiermeria)
    })
      .then((response) => response.json())
      .then(() => {
        fetchInfiermeriaData();
        handleCloseModal();
      })
      .catch((error) => console.log(error));
  };

  const handleDelete = (infiermeriaID) => {
    fetch(`https://localhost:7160/api/Infiermeria/${infiermeriaID}`, {
      method: 'DELETE'
    })
      .then((response) => response.json())
      .then(() => {
        fetchInfiermeriaData();
      })
      .catch((error) => console.log(error));
  };
  const handleSearch = (e) => {
    const searchValue = e.target.value;
    setSearchText(searchValue);
  };

  const filtredInfiermeriaList = searchText
  ? infiermeriaList.filter((drejtori) => drejtori.infiermeriaID.toString().includes(searchText)) 
    : infiermeriaList;

  return (
    <div className="container mt-5">
    <h1>Infiermeria CRUD</h1>
    <div className="mb-3">
        <input
          type="text"
          placeholder="Search by ID of Infiermeria"
          value={searchText}
          onChange={handleSearch}
          className="form-control"
        />
      </div>
      <button className="btn btn-primary mb-3" onClick={handleShowCreateModal}>Create Infiermeria</button>
  
      <h2>Infiermeria List</h2>
      <div className="table-container">
      <table className="table">
        <thead>
          <tr>
            <th>infiermeriaID</th>
            <th>SektoriID-Emri Sektorit</th>
            <th>Kapaciteti</th>
            <th>Created At</th>
            <th>Updated At</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
        {filtredInfiermeriaList.map((infiermeria) => {
  const sektori = sektoriOptions.find((sektor) => sektor.sektoriID === infiermeria.sektoriID);
  const emriSektorit = sektori ? sektori.emriSektorit : '';

  return (
    <tr key={infiermeria.infiermeriaID}>
      <td>{infiermeria.infiermeriaID}</td>
      <td>{infiermeria.sektoriID} - {emriSektorit}</td>
      <td>{infiermeria.kapaciteti}</td>
      <td>{infiermeria.created_at}</td>
      <td>{infiermeria.updated_at}</td>
      <td>
        <button className="btn btn-primary btn-sm" onClick={() => handleShowEditModal(infiermeria)}>Edit</button>
        <button className="btn btn-danger btn-sm ml-2" onClick={() => handleDelete(infiermeria.infiermeriaID)}>Delete</button>
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
          <Form.Group controlId="infiermeriaID">
              <Form.Label>Infiermeria ID:</Form.Label>
              <Form.Control
                type="number"
                value={infiermeriaID}
                onChange={(e) => setInfiermeriaID(e.target.value)}
                disabled={modalAction === "edit"}
              />
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

<Form.Group controlId="kapaciteti">
                <Form.Label>Kapaciteti:</Form.Label>
                <Form.Control as="select" value={kapaciteti} onChange={(e) => setKapaciteti(e.target.value)}>
                    {modalAction === 'create' && (<option value="Choose">Choose</option>)}
                    <option value="5">5</option>
                    <option value="6">6</option>
                    <option value="7">7</option>
                    <option value="9">8</option>
                    <option value="9">9</option>
                    <option value="10">10</option>
                    <option value="11">11</option>
                    <option value="12">12</option>
                    <option value="13">13</option>
                    <option value="14">14</option>
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

export default Infiermeria;
