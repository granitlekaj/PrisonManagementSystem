import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Modal, Form } from 'react-bootstrap';
import "./components.css";

const Kontrolla = () => {
  const [kontrollaList, setKontrollaList] = useState([]);
  const [kontrollaID, setKontrollaID] = useState(0);
  const [mjekuID, setMjekuID] = useState(0);
  const [burgosuriID, setBurgosuriID] = useState(0);
  const [infiermeriaID, setInfiermeriaID] = useState(0);
  const [data, setData] = useState('');
  const [arsyeja, setArsyeja] = useState('');
  const [created_at, setCreatedAt] = useState('');
  const [updated_at, setUpdatedAt] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [modalTitle, setModalTitle] = useState('');
  const [modalAction, setModalAction] = useState('');
  const [mjekuOptions, setMjekuOptions]=useState([]);
  const [burgosuriOptions, setBurgosuriOptions]=useState([]);
  const [infiermeriaOptions, setInfiermeriaOptions]=useState([]);
  const [searchText, setSearchText]=useState('');
  const [error, setError]=useState('');

  useEffect(() => {
    fetchMjekuData();
    fetchBurgosuriData();
    fetchInfiermeriaData();
    fetchKontrollaData();
  }, []);

  const fetchKontrollaData = () => {
    fetch('https://localhost:7160/api/Kontrolla')
      .then((response) => response.json())
      .then((data) => setKontrollaList(data))
      .catch((error) => console.log(error));
  };

  const fetchMjekuData = () => {
    fetch('https://localhost:7160/api/Mjeku')
      .then((response) => response.json())
      .then((data) => setMjekuOptions(data))
      .catch((error) => console.log(error));
  };
  const fetchBurgosuriData = () => {
    fetch('https://localhost:7160/api/Burgosuri')
      .then((response) => response.json())
      .then((data) => setBurgosuriOptions(data))
      .catch((error) => console.log(error));
  };
  const fetchInfiermeriaData = () => {
    fetch('https://localhost:7160/api/Infiermeria')
      .then((response) => response.json())
      .then((data) => setInfiermeriaOptions(data))
      .catch((error) => console.log(error));
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setModalTitle('');
    setModalAction('');
    setKontrollaID(0);
    setMjekuID(0);
    setBurgosuriID(0);
    setInfiermeriaID(0);
    setData('');
    setArsyeja('');
    setCreatedAt('');
    setUpdatedAt('');
  };

  const handleShowCreateModal = () => {
    setShowModal(true);
    setModalTitle('Create Kontrolla');
    setModalAction('create');
    const currentLocalTime = new Date().toISOString();
    setCreatedAt(currentLocalTime);
    setUpdatedAt(currentLocalTime);
  };

  const handleShowEditModal = (kontrolla) => {
    setShowModal(true);
    setModalTitle('Edit Kontrolla');
    setModalAction('edit');
    setKontrollaID(kontrolla.kontrollaID);
    setMjekuID(kontrolla.mjekuID);
    setBurgosuriID(kontrolla.burgosuriID);
    setInfiermeriaID(kontrolla.infiermeriaID);
    setData(kontrolla.data);
    setArsyeja(kontrolla.arsyeja);
    setCreatedAt(kontrolla.created_at);
    setUpdatedAt(new Date().toISOString());
  };

  const handleCreate = () => {
    if (!mjekuID ) {
      setError('Please fill Doctor ID.');
      return;
    }
    if(!burgosuriID){
      setError('Please fill the prisoner id!.');
      return;
    }
    if(!infiermeriaID){
      setError('Please fill the InfiermeriaID.');
      return;
    }
    if(!data){
      setError('Please fill the date!.');
      return;
    }
    if(!arsyeja){
      setError('Please fill the reason!');
      return;
    }
    const newKontrolla = {
      kontrollaID: kontrollaID,
      mjekuID: mjekuID,
      burgosuriID: burgosuriID,
      infiermeriaID: infiermeriaID,
      data: data,
      arsyeja: arsyeja,
      created_at: created_at,
      updated_at: updated_at
    };

    fetch('https://localhost:7160/api/Kontrolla/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newKontrolla)
    })
      .then((response) => response.json())
      .then(() => {
        fetchKontrollaData();
        handleCloseModal();
      })
      .catch((error) => console.log(error));
  };

  const handleUpdate = () => {
    if (!mjekuID ) {
      setError('Please fill Doctor ID.');
      return;
    }
    if(!burgosuriID){
      setError('Please fill the prisoner id!.');
      return;
    }
    if(!infiermeriaID){
      setError('Please fill the InfiermeriaID.');
      return;
    }
    if(!data){
      setError('Please fill the date!.');
      return;
    }
    if(!arsyeja){
      setError('Please fill the reason!');
      return;
    }
    const updateKontrolla = {
      kontrollaID: kontrollaID,
      mjekuID: mjekuID,
      burgosuriID: burgosuriID,
      infiermeriaID: infiermeriaID,
      data: data,
      arsyeja: arsyeja,
      created_at: created_at,
      updated_at: updated_at
    };

    fetch(`https://localhost:7160/api/Kontrolla/${kontrollaID}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(updateKontrolla)
    })
      .then((response) => response.json())
      .then(() => {
        fetchKontrollaData();
        handleCloseModal();
      })
      .catch((error) => console.log(error));
  };

  const handleDelete = (kontrollaID) => {
    fetch(`https://localhost:7160/api/Kontrolla/${kontrollaID}`, {
      method: 'DELETE'
    })
      .then((response) => response.json())
      .then(() => {
        fetchKontrollaData();
      })
      .catch((error) => console.log(error));
  };

  const handleSearch = (e) => {
    const searchValue = e.target.value;
    setSearchText(searchValue);
  };

  const filtredKontrollaList = searchText
  ? kontrollaList.filter((drejtori) => drejtori.burgosuriID.toString().includes(searchText)) 
    : kontrollaList;

  return (
    <div className="container mt-5">
    <h1>Kontrolla CRUD</h1>
    <div className="mb-3">
        <input
          type="text"
          placeholder="Search by ID of Prisoner"
          value={searchText}
          onChange={handleSearch}
          className="form-control"
        />
      </div>
    <button className="btn btn-primary mb-3" onClick={handleShowCreateModal}>Create Kontrolla</button>

    <h2>Kontrolla List</h2>
    <div className="table-container">
    <table className="table">
      <thead>
        <tr>
          <th>KontrollaID</th>
          <th>MjekuID</th>
          <th>BurgosuriID</th>
          <th>InfiermeriaID</th>
          <th>Data</th>
          <th>Arsyeja</th>
          <th>Created At</th>
          <th>Updated At</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {filtredKontrollaList.map((kontrolla) => {
          const mjeku = mjekuOptions.find((mjek) => mjek.mjekuID === kontrolla.mjekuID);
          const emri = mjeku ? mjeku.emri : '';
          const mbiemri = mjeku ? mjeku.mbiemri : '';

          const burgosuri = burgosuriOptions.find((burgosur) => burgosur.burgosuriID === kontrolla.burgosuriID);
          const emriB = burgosuri ? burgosuri.emri : '';
          const mbiemriB = burgosuri ? burgosuri.mbiemri : '';
        
          const infiermeria = infiermeriaOptions.find((infermieri) => infermieri.infiermeriaID === kontrolla.infiermeriaID);
          const sektoriID = infiermeria ? infiermeria.sektoriID : '';
          
          return (
            <tr key={kontrolla.kontrollaID}>
              <td>{kontrolla.kontrollaID}</td>
              <td>{kontrolla.mjekuID}- {emri} {mbiemri}</td>
              <td>{kontrolla.burgosuriID}- {emriB} {mbiemriB}</td>
              <td>{kontrolla.infiermeriaID} - Sektori {sektoriID}</td>
              <td>{kontrolla.data}</td>
              <td>{kontrolla.arsyeja}</td>
              <td>{kontrolla.created_at}</td>
              <td>{kontrolla.updated_at}</td>
              <td>
                <button className="btn btn-primary btn-sm" onClick={() => handleShowEditModal(kontrolla)}>Edit</button>
                <button className="btn btn-danger btn-sm ml-2" onClick={() => handleDelete(kontrolla.kontrollaID)}>Delete</button>
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
            <Form.Group controlId="mjekuID">
              <Form.Label>Mjeku ID:</Form.Label>
              <Form.Control
                as="select"
                value={mjekuID}
                onChange={(e) => setMjekuID(parseInt(e.target.value))}
              >
                <option value="">Select Mjeku</option>
                {mjekuOptions.map((mjeku) => (
                  <option key={mjeku.mjekuID} value={mjeku.mjekuID}>
                    {`${mjeku.mjekuID} - ${mjeku.emri}  ${mjeku.mbiemri}`}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>

            <Form.Group controlId="burgosuriID">
  <Form.Label>Burgosuri ID:</Form.Label>
  <Form.Control
    as="select"
    value={burgosuriID}
    onChange={(e) => setBurgosuriID(parseInt(e.target.value))}
  >
    <option value="">Select Burgosuri</option>
    {burgosuriOptions.map((burgosuri) => (
      <option key={burgosuri.burgosuriID} value={burgosuri.burgosuriID}>
        {`${burgosuri.burgosuriID} - ${burgosuri.emri}  ${burgosuri.mbiemri}`}
      </option>
    ))}
  </Form.Control>
</Form.Group>

<Form.Group controlId="infiermeriaID">
  <Form.Label>Infiermeria ID:</Form.Label>
  <Form.Control
    as="select"
    value={infiermeriaID}
    onChange={(e) => setInfiermeriaID(parseInt(e.target.value))}
  >
    <option value="">Select Infiermeria</option>
    {infiermeriaOptions.map((infiermeria) => (
      <option key={infiermeria.infiermeriaID} value={infiermeria.infiermeriaID}>
        {`${infiermeria.infiermeriaID} - Sektori ${infiermeria.sektoriID} `} 
      </option>
    ))}
  </Form.Control>
</Form.Group>


            <Form.Group controlId="data">
              <Form.Label>Data:</Form.Label>
              <Form.Control
                type="date"
                value={data}
                onChange={(e) => setData(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="arsyeja">
              <Form.Label>Arsyeja:</Form.Label>
              <Form.Control
                type="text"
                value={arsyeja}
                onChange={(e) => setArsyeja(e.target.value)}
              ></Form.Control>
            </Form.Group>

            {modalAction === 'create' && (
              <Form.Group controlId="createdAt">
                <Form.Label>Created At:</Form.Label>
                <Form.Control
                  type="text"
                  value={created_at}
                  onChange={(e) => setCreatedAt(e.target.value)}
                  disabled
                />
              </Form.Group>
            )}
            {modalAction === 'edit' && (
              <Form.Group controlId="createdAt">
                <Form.Label>Created At:</Form.Label>
                <Form.Control
                  type="text"
                  value={created_at}
                  onChange={(e) => setCreatedAt(e.target.value)}
                  disabled
                />
              </Form.Group>
            )}
            <Form.Group controlId="updatedAt">
              <Form.Label>Updated At:</Form.Label>
              <Form.Control
                type="text"
                value={updated_at}
                onChange={(e) => setUpdatedAt(e.target.value)}
                disabled={modalAction === 'create'}
                readOnly
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
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
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Kontrolla;
