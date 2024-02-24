import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Modal, Form } from 'react-bootstrap';
import "./components.css";

const Burgosuri = () => {
  const [burgosuriList, setBurgosuriList] = useState([]);
  const [burgosuriID, setBurgosuriID] = useState('');
  const [emri, setEmri] = useState('');
  const [mbiemri, setMbiemri] = useState('');
  const [adresa, setAdresa] = useState('');
  const [dataHyrjes, setDataHyrjes] = useState('');
  const [dataDaljes, setDataDaljes] = useState('');
  const [dateLindja, setDateLindja] = useState('');
  const [qeliaID, setQeliaID] = useState(0);
  const [gjinia, setGjinia] = useState('');
  const [created_at, setCreatedAt] = useState('');
  const [updated_at, setUpdatedAt] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [modalTitle, setModalTitle] = useState('');
  const [modalAction, setModalAction] = useState('');
  const [qeliaOptions, setQeliaOptions] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [error, setError]=useState('');


  useEffect(() => {
    fetchQeliaData();
    fetchBurgosuriData();
  }, []);

  const fetchQeliaData = () => {
    fetch('https://localhost:7160/api/Qelia')
      .then((response) => response.json())
      .then((data) => setQeliaOptions(data))
      .catch((error) => console.log(error));
  };

  const fetchBurgosuriData = () => {
    fetch('https://localhost:7160/api/Burgosuri')
      .then((response) => response.json())
      .then((data) => setBurgosuriList(data))
      .catch((error) => console.log(error));
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setModalTitle('');
    setModalAction('');
    setBurgosuriID(0);
    setEmri('');
    setMbiemri('');
    setAdresa('');
    setDataHyrjes('');
    setDataDaljes('');
    setDateLindja('');
    setQeliaID(0);
    setGjinia('');
    setCreatedAt('');
    setUpdatedAt('');
  };

  const handleShowCreateModal = () => {
    setShowModal(true);
    setModalTitle('Create Burgosuri');
    setModalAction('create');
    const currentLocalTime = new Date().toISOString();
    setCreatedAt(currentLocalTime);
    setUpdatedAt(currentLocalTime);
  };

  const handleShowEditModal = (burgosuri) => {
    setShowModal(true);
    setModalTitle('Edit Burgosuri');
    setModalAction('edit');
    setBurgosuriID(burgosuri.burgosuriID);
    setEmri(burgosuri.emri);
    setMbiemri(burgosuri.mbiemri);
    setAdresa(burgosuri.adresa);
    setDataHyrjes(burgosuri.dataHyrjes);
    setDataDaljes(burgosuri.dataDaljes);
    setDateLindja(burgosuri.dateLindja);
    setQeliaID(burgosuri.qeliaID);
    setGjinia(burgosuri.gjinia);
    setCreatedAt(burgosuri.created_at);
    setUpdatedAt(burgosuri.updated_at);
  };

  // TODO: Implement createBurgosuri and editBurgosuri functions
  
  const handleCreate = () => {
    if (!burgosuriID ) {
      setError('Please fill Prisoner ID.');
      return;
    }
    if (!emri ) {
      setError('Please fill the name of Prisoner.');
      return;
    }
    if(!mbiemri){
      setError('Please fill last name of Prisoner.');
      return;
    }
    if (!adresa ) {
      setError('Please fill Adresa.');
      return;
    }
    if(!dataHyrjes){
      setError('Please fill the date of entry.');
      return;
    }
    if(!dataDaljes){
      setError('Please fill the date of exit.');
      return;
    }
    if(!dateLindja){
      setError('Please fill the date of birth.');
      return;
    }
    if (!qeliaID ) {
      setError('Please fill the Qelia ID !.');
      return;
    }
    if (!gjinia ) {
      setError('Please fill the gender.');
      return;
    }
    
    const newBurgosuri = {
      burgosuriID: burgosuriID,
      emri: emri,
      mbiemri: mbiemri,
      adresa: adresa,
      dataHyrjes:dataHyrjes,
      dataDaljes:dataDaljes,
      dateLindja: dateLindja,
      qeliaID:qeliaID,
      gjinia: gjinia,
      created_at: created_at,
      updated_at: updated_at
    };

    const existingBurgosurit=burgosuriList.find((burgosuri)=> Number(burgosuri.burgosuriID) ===Number(burgosuriID) );

    if(existingBurgosurit){
      setError("This prisoner already exists");
      return;
    }

    fetch('https://localhost:7160/api/Burgosuri/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newBurgosuri)
    })
      .then((response) => response.json())
      .then(() => {
        fetchBurgosuriData();
        handleCloseModal();
      })
      .catch((error) => console.log(error));
  };

  const handleUpdate = () => {
    if (!emri ) {
      setError('Please fill the name of Prisoner.');
      return;
    }
    if(!mbiemri){
      setError('Please fill last name of Prisoner.');
      return;
    }
    if (!adresa ) {
      setError('Please fill Adresa.');
      return;
    }
    if(!dataHyrjes){
      setError('Please fill the date of entry.');
      return;
    }
    if(!dataDaljes){
      setError('Please fill the date of exit.');
      return;
    }
    if(!dateLindja){
      setError('Please fill the date of birth.');
      return;
    }
    if (!qeliaID ) {
      setError('Please fill the Qelia ID !.');
      return;
    }
    if (!gjinia ) {
      setError('Please fill the gender.');
      return;
    }
    const updateBurgosuri = {
        burgosuriID: burgosuriID,
        emri: emri,
        mbiemri: mbiemri,
        adresa: adresa,
        dataHyrjes:dataHyrjes,
        dataDaljes:dataDaljes,
        dateLindja: dateLindja,
        qeliaID:qeliaID,
        gjinia: gjinia,
        created_at: created_at,
        updated_at: updated_at
    };

    fetch(`https://localhost:7160/api/Burgosuri/${burgosuriID}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(updateBurgosuri)
    })
      .then((response) => response.json())
      .then(() => {
        fetchBurgosuriData();
        handleCloseModal();
      })
      .catch((error) => console.log(error));
  };

  const handleDelete = (burgosuriID) => {
    fetch(`https://localhost:7160/api/Burgosuri/${burgosuriID}`, {
      method: 'DELETE'
    })
      .then((response) => response.json())
      .then(() => {
        fetchBurgosuriData();
      })
      .catch((error) => console.log(error));
  };

  const handleSearch = (e) => {
    const searchValue = e.target.value;
    setSearchText(searchValue);
  };

  const filtredBurgosuriList = searchText
  ? burgosuriList.filter((burgosuri) => burgosuri.burgosuriID.toString().includes(searchText)) 
    : burgosuriList;

  return (
    <div className="container mt-5">
    <h1>Burgosuri CRUD</h1>
    <div className="mb-3">
        <input
          type="text"
          placeholder="Search by ID of Prisoner"
          value={searchText}
          onChange={handleSearch}
          className="form-control"
        />
      </div>
    <button className="btn btn-primary mb-3" onClick={handleShowCreateModal}>Create Burgosuri</button>

    <h2>Burgosuri List</h2>
    <div className="table-container">
    <table className="table">
      <thead>
        <tr>
          <th>ID</th>
          <th>Emri</th>
          <th>Mbiemri</th>
          <th>Adresa</th>
          <th>Data Hyrjes</th>
          <th>Data Daljes</th>
          <th>Date Lindja</th>
          <th>Qelia</th>
          <th>Gjinia</th>
          <th>Created At</th>
          <th>Updated At</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
      {filtredBurgosuriList.map((burgosuri) => {
  const qelia = qeliaOptions.find((qeli) => qeli.qeliaID === burgosuri.qeliaID);
  const emriQelis = qelia ? qelia.emriQelis : '';

    return (
        <tr key={burgosuri.burgosuriID}>
        <td>{burgosuri.burgosuriID}</td>
        <td>{burgosuri.emri}</td>
        <td>{burgosuri.mbiemri}</td>
        <td>{burgosuri.adresa}</td>
        <td>{burgosuri.dataHyrjes}</td>
        <td>{burgosuri.dataDaljes}</td>
        <td>{burgosuri.dateLindja}</td>
        <td>{burgosuri.qeliaID} - {emriQelis}</td>
        <td>{burgosuri.gjinia}</td>
    <td>{burgosuri.created_at}</td>
    <td>{burgosuri.updated_at}</td>
    <td>
      <button className="btn btn-primary btn-sm" onClick={() => handleShowEditModal(burgosuri)}>Edit</button>
      <button className="btn btn-danger btn-sm ml-2" onClick={() => handleDelete(burgosuri.burgosuriID)}>Delete</button>
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
          <Form.Group controlId="burgosuriID">
            <Form.Label>Burgosuri ID:</Form.Label>
            <Form.Control type="number" value={burgosuriID} onChange={(e) => setBurgosuriID(e.target.value)} disabled={modalAction === 'edit'} />
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
          <Form.Group controlId="dataHyrjes">
            <Form.Label>Data Hyrjes:</Form.Label>
            <Form.Control type="date" value={dataHyrjes} onChange={(e) => setDataHyrjes(e.target.value)} />
          </Form.Group>
          <Form.Group controlId="dataDaljes">
            <Form.Label>Data Daljes:</Form.Label>
            <Form.Control type="date" value={dataDaljes} onChange={(e) => setDataDaljes(e.target.value)} />
          </Form.Group>
          <Form.Group controlId="dateLindja">
            <Form.Label>Date Lindja:</Form.Label>
            <Form.Control type="date" value={dateLindja} onChange={(e) => setDateLindja(e.target.value)} />
          </Form.Group>

          <Form.Group controlId="qeliaID">
            <Form.Label>Qelia ID:</Form.Label>
            <Form.Control as="select" value={qeliaID} onChange={(e) => setQeliaID(parseInt(e.target.value))}>
            <option value="">Select Qelia</option>
  {qeliaOptions.map((qelia) => (
    <option key={qelia.QeliaID} value={qelia.qeliaID}>
      {`${qelia.qeliaID} - ${qelia.emriQelis}`}
    </option>
  ))}
</Form.Control>
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

export default Burgosuri;
