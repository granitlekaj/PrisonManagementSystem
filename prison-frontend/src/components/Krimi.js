import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Modal, Form } from 'react-bootstrap';
import "./components.css";

const Krimi = () => {
  const [krimiList, setKrimiList] = useState([]);
  const [krimiID, setKrimiID] = useState(0);
  const [burgosuriID, setBurgosuriID] = useState('');
  const [dataKrimit, setDataKrimit] = useState('');
  const [llojiKrimit, setLlojiKrimit] = useState('');
  const [created_at, setCreatedAt] = useState('');
  const [updated_at, setUpdatedAt] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [modalTitle, setModalTitle] = useState('');
  const [modalAction, setModalAction] = useState('');
  const [burgosuriOptions, setBurgosuriOptions] = useState([]);
  const [searchText, setSearchText]=useState('');
  const [error, setError]=useState('');
  

  useEffect(() => {
    fetchBurgosuriData();
    fetchKrimiData();
  }, []);
  
  

  const fetchBurgosuriData = async () => {
    try {
      const response = await fetch('https://localhost:7160/api/Burgosuri');
      const data = await response.json();
      setBurgosuriOptions(data);
    } catch (error) {
      console.log(error);
    }
  };
  
  
  
  const fetchKrimiData = () => {
    fetch('https://localhost:7160/api/Krimi')
      .then((response) => response.json())
      .then((data) => setKrimiList(data))
      .catch((error) => console.log(error));
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setModalTitle('');
    setModalAction('');
    setKrimiID(0);
    setBurgosuriID(0);
    setDataKrimit('');
    setLlojiKrimit('');
    setCreatedAt('');
    setUpdatedAt('');
  };

  const handleShowCreateModal = () => {
    setShowModal(true);
    setModalTitle('Create Krimi');
    setModalAction('create');
    const currentLocalTime = new Date().toISOString();
    setCreatedAt(currentLocalTime);
    setUpdatedAt(currentLocalTime);
  };

  const handleShowEditModal = (krimi) => {
    setShowModal(true);
    setModalTitle('Edit Krimi');
    setModalAction('edit');
    setKrimiID(krimi.krimiID);
    setBurgosuriID(krimi.burgosuriID);
    setDataKrimit(krimi.dataKrimit)
    setLlojiKrimit(krimi.llojiKrimit);
    setCreatedAt(krimi.created_at);
    setUpdatedAt(new Date().toISOString());
  };

  const handleCreate = () => {
    if (!burgosuriID ) {
      setError('Please fill Prisoner ID.');
      return;
    }
    if(!dataKrimit){
      setError('Please fill date of crime.');
      return;
    }
    if(!llojiKrimit){
      setError('Please fill the type of crime.');
      return;
    }
    const newKrimi = {
      krimiID: krimiID,
      burgosuriID:burgosuriID,
      dataKrimit: dataKrimit,
      llojiKrimit: llojiKrimit,
      created_at: created_at,
      updated_at: updated_at
    };

    fetch('https://localhost:7160/api/Krimi/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newKrimi)
    })
      .then((response) => response.json())
      .then(() => {
        fetchKrimiData();
        handleCloseModal();
      })
      .catch((error) => console.log(error));
  };

  const handleUpdate = () => {
    if (!burgosuriID ) {
      setError('Please fill Prisoner ID.');
      return;
    }
    if(!dataKrimit){
      setError('Please fill date of crime.');
      return;
    }
    if(!llojiKrimit){
      setError('Please fill the type of crime.');
      return;
    }
    const updateKrimi = {
        krimiID: krimiID,
        burgosuriID:burgosuriID,
        dataKrimit: dataKrimit,
        llojiKrimit: llojiKrimit,
        created_at: created_at,
        updated_at: updated_at
    };

    fetch(`https://localhost:7160/api/Krimi/${krimiID}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(updateKrimi)
    })
      .then((response) => response.json())
      .then(() => {
        fetchKrimiData();
        handleCloseModal();
      })
      .catch((error) => console.log(error));
  };

  const handleDelete = (krimiID) => {
    fetch(`https://localhost:7160/api/Krimi/${krimiID}`, {
      method: 'DELETE'
    })
      .then((response) => response.json())
      .then(() => {
        fetchKrimiData();
      })
      .catch((error) => console.log(error));
  };
  const handleSearch = (e) => {
    const searchValue = e.target.value;
    setSearchText(searchValue);
  };

  const filtredKrimiiList = searchText
  ? krimiList.filter((drejtori) => drejtori.burgosuriID.toString().includes(searchText)) 
    : krimiList;

  return (
    <div className="container mt-5">
    <h1>Krimi CRUD</h1>
    <div className="mb-3">
        <input
          type="text"
          placeholder="Search by ID of Prisoner"
          value={searchText}
          onChange={handleSearch}
          className="form-control"
        />
      </div>
      <button className="btn btn-primary mb-3" onClick={handleShowCreateModal}>Create Krimi</button>
  
      <h2>Krimi List</h2>
      <div className="table-container">
      <table className="table">
        <thead>
          <tr>
            <th>BurgosuriID- Emri dhe Mbiemri</th>
            <th>Data Krimit</th>
            <th>Lloji Krimit</th>
            <th>Created At</th>
            <th>Updated At</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
        {filtredKrimiiList.map((krimi) => {
  const burgosuri = burgosuriOptions.find((burgosur) => burgosur.burgosuriID === krimi.burgosuriID);
  const emri = burgosuri ? burgosuri.emri : '';
  const mbiemri = burgosuri? burgosuri.mbiemri : '';

  return (
    <tr key={krimi.krimiID}>
      <td>{krimi.burgosuriID} - {emri} {mbiemri}</td>
      <td>{krimi.dataKrimit}</td>
      <td>{krimi.llojiKrimit}</td>
      <td>{krimi.created_at}</td>
      <td>{krimi.updated_at}</td>
      <td>
        <button className="btn btn-primary btn-sm" onClick={() => handleShowEditModal(krimi)}>Edit</button>
        <button className="btn btn-danger btn-sm ml-2" onClick={() => handleDelete(krimi.krimiID)}>Delete</button>
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
          {error && <p className='text-danger'>{error}</p>}
          <Form>
          

            <Form.Group controlId="burgosuriID">
              <Form.Label>Burgosuri ID:</Form.Label>
              <Form.Control as="select" value={burgosuriID} disabled={modalAction === "edit"} onChange={(e) => setBurgosuriID(parseInt(e.target.value))}>
                <option value="">Select Burgosuri</option>
                {burgosuriOptions.map((burgosuri) => (
                  <option key={burgosuri.burgosuriID} value={burgosuri.burgosuriID}>
                    {`${burgosuri.burgosuriID} - ${burgosuri.emri} - ${burgosuri.mbiemri}`}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>

            <Form.Group controlId="dataKrimit">
                <Form.Label>Data Krimit:</Form.Label>
                <Form.Control type="date" value={dataKrimit} onChange={(e) => setDataKrimit(e.target.value)}>
                </Form.Control>
            
            </Form.Group>
            <Form.Group controlId="llojiKrimit">
                <Form.Label>Lloji Krimit:</Form.Label>
                <Form.Control type="text" value={llojiKrimit} onChange={(e) => setLlojiKrimit(e.target.value)}>
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

export default Krimi;


