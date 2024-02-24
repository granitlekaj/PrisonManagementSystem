import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Modal, Form, Image } from 'react-bootstrap';

import "./components.css";

const Drejtori = () => {
  const [drejtoriList, setDrejtoriList] = useState([]);
  const [drejtoriID, setDrejtoriID] = useState('');
  const [sektoriID, setSektoriID] = useState(0);
  const [emri, setEmri] = useState('');
  const [mbiemri, setMbiemri] = useState('');
  const [adresa, setAdresa] = useState('');
  const [dateLindja, setDateLindja] = useState('');
  const [gjinia, setGjinia] = useState('');
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
    fetchDrejtoriData();
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
  
  
  
  const fetchDrejtoriData = () => {
    fetch('https://localhost:7160/api/Drejtori')
      .then((response) => response.json())
      .then((data) => setDrejtoriList(data))
      .catch((error) => console.log(error));
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setModalTitle('');
    setModalAction('');
    setDrejtoriID('');
    setSektoriID('');
    setEmri('');
    setMbiemri('');
    setAdresa('');
    setDateLindja('');
    setGjinia('');
    setCreatedAt('');
    setUpdatedAt('');
  };

  const handleShowCreateModal = () => {
    setShowModal(true);
    setModalTitle('Create Drejtori');
    setModalAction('create');
    const currentLocalTime = new Date().toISOString();
    setCreatedAt(currentLocalTime);
    setUpdatedAt(currentLocalTime);
  };

  const handleShowEditModal = (drejtori) => {
    setShowModal(true);
    setModalTitle('Edit Drejtori');
    setModalAction('edit');
    setDrejtoriID(drejtori.drejtoriID);
    setSektoriID(drejtori.sektoriID);
    setEmri(drejtori.emri);
    setMbiemri(drejtori.mbiemri);
    setAdresa(drejtori.adresa);
    setDateLindja(drejtori.dateLindja);
    setGjinia(drejtori.gjinia);
    setCreatedAt(drejtori.created_at);
    setUpdatedAt(new Date().toISOString());
  };

  const handleCreate = () => {
    if (!drejtoriID ) {
      setError('Please fill drejtoriID.');
      return;
    }
    if(!sektoriID){
      setError('Please fill Sektori Field.');
      return;
    }
    if (!emri ) {
      setError('Please fill the name of Director.');
      return;
    }
    if(!mbiemri){
      setError('Please fill last name of Director.');
      return;
    }
    if (!adresa ) {
      setError('Please fill Adresa.');
      return;
    }
    if(!dateLindja){
      setError('Please fill the date of birth.');
      return;
    }
    if (!gjinia ) {
      setError('Please fill the gender.');
      return;
    }
   

    /**if (!drejtoriID || !sektoriID || !emri || !mbiemri || !adresa || !dateLindja || !gjinia) {
      setError('Please fill in all the fields.');
      return;
    } */

    const newDrejtori = {
      drejtoriID: drejtoriID,
      sektoriID: sektoriID,
      emri: emri,
      mbiemri: mbiemri,
      adresa: adresa,
      dateLindja: dateLindja,
      gjinia: gjinia,
      created_at: created_at,
      updated_at: updated_at,
    };

    const existingSektori = drejtoriList.find(
      (sektori) => Number(sektori.sektoriID) === Number(sektoriID)
    );
  
    if (existingSektori) {
      setError('The Sector you added has already a Director assigened!');
      return;
    }

    const existingDrejtori=drejtoriList.find((drejtori) => Number(drejtori.drejtoriID)=== Number(drejtoriID));

    if(existingDrejtori){
      setError('There is already a director with the same ID');
      return;
    }

    fetch('https://localhost:7160/api/Drejtori/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newDrejtori)
    })
      .then((response) => response.json())
      .then(() => {
        fetchDrejtoriData();
        handleCloseModal();
      })
      .catch((error) => console.log(error));
  };

  const handleUpdate = () => {
    if(!sektoriID){
      setError('Please fill Sektori Field.');
      return;
    }
    if (!emri ) {
      setError('Please fill the name of Director.');
      return;
    }
    if(!mbiemri){
      setError('Please fill last name of Director.');
      return;
    }
    if (!adresa ) {
      setError('Please fill Adresa.');
      return;
    }
    if(!dateLindja){
      setError('Please fill the date of birth.');
      return;
    }
    if (!gjinia ) {
      setError('Please fill the gender.');
      return;
    }
   
    const updatedDrejtori = {
      drejtoriID: drejtoriID,
      sektoriID: sektoriID,
      emri: emri,
      mbiemri: mbiemri,
      adresa: adresa,
      dateLindja: dateLindja,
      gjinia: gjinia,
      created_at: created_at,
      updated_at: updated_at,
    };

    const existingSektori = drejtoriList.find(
      (sektori) => Number(sektori.sektoriID) === Number(sektoriID)
    );
  
    if (existingSektori) {
      setError('The Sector you added has already a Director assigened!');
      return;
    }
    
    fetch(`https://localhost:7160/api/Drejtori/${drejtoriID}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(updatedDrejtori)
    })
      .then((response) => response.json())
      .then(() => {
        fetchDrejtoriData();
        handleCloseModal();
      })
      .catch((error) => console.log(error));
  };

  const handleDelete = (drejtoriID) => {
    fetch(`https://localhost:7160/api/Drejtori/${drejtoriID}`, {
      method: 'DELETE'
    })
      .then((response) => response.json())
      .then(() => {
        fetchDrejtoriData();
      })
      .catch((error) => console.log(error));
  };
  const handleSearch = (e) => {
    const searchValue = e.target.value;
    setSearchText(searchValue);
  };

  const filtredDrejtoriList = searchText
  ? drejtoriList.filter((drejtori) => drejtori.drejtoriID.toString().includes(searchText)) 
    : drejtoriList;

  return (
    <div className="container mt-5">
    <h1>Drejtori CRUD</h1>
    <div className="mb-3">
        <input
          type="text"
          placeholder="Search by ID of Director"
          value={searchText}
          onChange={handleSearch}
          className="form-control"
        />
      </div>
      <button className="btn btn-primary mb-3" onClick={handleShowCreateModal}>Create Drejtori</button>
  
      <h2>Drejtori List</h2>
      <div className="table-container">
      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>SektoriID-Emri Sektorit</th>
            <th>Emri</th>
            <th>Mbiemri</th>
            <th>Adresa</th>
            <th>Date Lindja</th>
            <th>Gjinia</th>
            <th>Created At</th>
            <th>Updated At</th>
            
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
        {filtredDrejtoriList.map((drejtori) => {
  const sektori = sektoriOptions.find((sektor) => sektor.sektoriID === drejtori.sektoriID);
  const emriSektorit = sektori ? sektori.emriSektorit : '';

  return (
    <tr key={drejtori.drejtoriID}>
      <td>{drejtori.drejtoriID}</td>
      <td>{drejtori.sektoriID} - {emriSektorit}</td>
      <td>{drejtori.emri}</td>
      <td>{drejtori.mbiemri}</td>
      <td>{drejtori.adresa}</td>
      <td>{drejtori.dateLindja}</td>
      <td>{drejtori.gjinia}</td>
      <td>{drejtori.created_at}</td>
      <td>{drejtori.updated_at}</td>
      
      <td>
        <button className="btn btn-primary btn-sm" onClick={() => handleShowEditModal(drejtori)}>Edit</button>
        <button className="btn btn-danger btn-sm ml-2" onClick={() => handleDelete(drejtori.drejtoriID)}>Delete</button>
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
            <Form.Group controlId="drejtoriID">
              <Form.Label>Drejtori ID:</Form.Label>
              <Form.Control type="number" value={drejtoriID} onChange={(e) => setDrejtoriID(e.target.value)} disabled={modalAction === 'edit'} />
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

            <Form.Group controlId="emri">
              <Form.Label>Emri:</Form.Label>
              <Form.Control type="text" value={emri} onChange={(e) => setEmri(e.target.value)} />
            </Form.Group>
            <Form.Group controlId="mbiemri">
              <Form.Label>Mbiemri:</Form.Label>
              <Form.Control type="text" value={mbiemri} onChange={(e) => setMbiemri(e.target.value)} />
            </Form.Group>
            <Form.Group controlId="adresa">
              <Form.Label>Adresa:</Form.Label>
              <Form.Control type="text" value={adresa} onChange={(e) => setAdresa(e.target.value)} />
            </Form.Group>
            <Form.Group controlId="dateLindja">
              <Form.Label>Date Lindja:</Form.Label>
              <Form.Control type="date" value={dateLindja} onChange={(e) => setDateLindja(e.target.value)} />
            </Form.Group>
            <Form.Group controlId="gjinia">
                <Form.Label>Gjinia:</Form.Label>
                <Form.Control as="select" value={gjinia} onChange={(e) => setGjinia(e.target.value)}>
                    {modalAction === 'create' && (<option value="Choose">Choose</option>)}
                    <option value="M">M</option>
                    <option value="F">F</option>
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

export default Drejtori;
