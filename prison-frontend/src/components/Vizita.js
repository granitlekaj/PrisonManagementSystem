import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Modal, Form } from 'react-bootstrap';
import "./components.css";

const Vizita = () => {
  const [vizitaList, setVizitaList] = useState([]);
  const [vizitaID, setVizitaID] = useState(0);
  const [vizitoriID, setVizitoriID] = useState('');
  const [burgosuriID, setBurgosuriID] = useState(0);
  const [afersia, setAfersia] = useState('');
  const [data, setData] = useState('');
  const [kohaFillimit, setKohaFillimit] = useState('');
  const [kohaMbarimit, setKohaMbarimit] = useState('');
  const [oficeriID, setOficeriID]=useState(0);
  const [created_at, setCreatedAt] = useState('');
  const [updated_at, setUpdatedAt] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [modalTitle, setModalTitle] = useState('');
  const [modalAction, setModalAction] = useState('');
  const [vizitoriOptions, setVizitoriOptions]=useState([]);
  const [burgosuriOptions, setBurgosuriOptions]=useState([]);
  const [oficeriOptions, setOficeriOptions]=useState([]);
  const [searchText, setSearchText]=useState('');
  const [error, setError]=useState('');

  useEffect(() => {
    fetchOficeriData();
    fetchVizitoriData();
    fetchBurgosuriData();
    fetchVizitaData();
  }, []);

  const fetchVizitaData = () => {
    fetch('https://localhost:7160/api/Vizita')
      .then((response) => response.json())
      .then((data) => setVizitaList(data))
      .catch((error) => console.log(error));
  };

  const fetchOficeriData = () => {
    fetch('https://localhost:7160/api/Oficeri')
      .then((response) => response.json())
      .then((data) => setOficeriOptions(data))
      .catch((error) => console.log(error));
  };
  const fetchBurgosuriData = () => {
    fetch('https://localhost:7160/api/Burgosuri')
      .then((response) => response.json())
      .then((data) => setBurgosuriOptions(data))
      .catch((error) => console.log(error));
  };
  const fetchVizitoriData = () => {
    fetch('https://localhost:7160/api/Vizitori')
      .then((response) => response.json())
      .then((data) => setVizitoriOptions(data))
      .catch((error) => console.log(error));
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setModalTitle('');
    setModalAction('');
    setVizitaID(0);
    setVizitoriID(0);
    setBurgosuriID(0);
    setAfersia('');
    setData('');
    setKohaFillimit('');
    setKohaMbarimit('');
    setOficeriID(0);
    setCreatedAt('');
    setUpdatedAt('');
  };

  const handleShowCreateModal = () => {
    setShowModal(true);
    setModalTitle('Create Vizita');
    setModalAction('create');
    const currentLocalTime = new Date().toISOString();
    setCreatedAt(currentLocalTime);
    setUpdatedAt(currentLocalTime);
  };

  const handleShowEditModal = (vizita) => {
    setShowModal(true);
    setModalTitle('Edit Vizita');
    setModalAction('edit');
    setVizitaID(vizita.vizitaID);
    setVizitoriID(vizita.vizitoriID);
    setBurgosuriID(vizita.burgosuriID);
    setAfersia(vizita.afersia);
    setData(vizita.data);
    setKohaFillimit(vizita.kohaFillimit);
    setKohaMbarimit(vizita.kohaMbarimit);
    setOficeriID(vizita.oficeriID);
    setCreatedAt(vizita.created_at);
    setUpdatedAt(new Date().toISOString());
  };

  const handleCreate = () => {
    if (!vizitoriID ) {
      setError('Please fill Visitor ID!');
      return;
    }
    if (!burgosuriID ) {
      setError('Please fill Prisoner ID!');
      return;
    }
    if(!afersia){
      setError('Please fill the relation of Vistor with Prisoner.');
      return;
    }
    if (!data ) {
      setError('Please fill the date.');
      return;
    }
    if(!kohaFillimit){
      setError('Please fill the start time.');
      return;
    }
    if (!kohaMbarimit ) {
      setError('Please fill the end time.');
      return;
    }
    if (!oficeriID ) {
      setError('Please fill the Officer ID!.');
      return;
    }
    const newVizita = {
      vizitaID: vizitaID,
      vizitoriID: vizitoriID,
      burgosuriID: burgosuriID,
      afersia: afersia,
      data: data, // Update this line
      kohaFillimit: kohaFillimit,
      kohaMbarimit: kohaMbarimit,
      oficeriID: oficeriID,
      created_at: created_at,
      updated_at: updated_at
    };
  
    fetch('https://localhost:7160/api/Vizita/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newVizita)
    })
      .then((response) => response.json())
      .then(() => {
        fetchVizitaData();
        handleCloseModal();
      })
      .catch((error) => console.log(error));
  };
  

  const handleUpdate = () => {
    if (!vizitoriID ) {
      setError('Please fill Visitor ID!');
      return;
    }
    if (!burgosuriID ) {
      setError('Please fill Prisoner ID!');
      return;
    }
    if(!afersia){
      setError('Please fill the relation of Vistor with Prisoner.');
      return;
    }
    if (!data ) {
      setError('Please fill the date.');
      return;
    }
    if(!kohaFillimit){
      setError('Please fill the start time.');
      return;
    }
    if (!kohaMbarimit ) {
      setError('Please fill the end time.');
      return;
    }
    if (!oficeriID ) {
      setError('Please fill the Officer ID!.');
      return;
    }
    const updateVizita = {
        vizitaID: vizitaID,
        vizitoriID: vizitoriID,
        burgosuriID: burgosuriID,
        afersia:afersia,
        data: data,
        kohaFillimit:kohaFillimit,
        kohaMbarimit:kohaMbarimit,
        oficeriID:oficeriID,
        created_at: created_at,
        updated_at: updated_at
    };

    fetch(`https://localhost:7160/api/Vizita/${vizitaID}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(updateVizita)
    })
      .then((response) => response.json())
      .then(() => {
        fetchVizitaData();
        handleCloseModal();
      })
      .catch((error) => console.log(error));
  };

  const handleDelete = (vizitaID) => {
    fetch(`https://localhost:7160/api/Vizita/${vizitaID}`, {
      method: 'DELETE'
    })
      .then((response) => response.json())
      .then(() => {
        fetchVizitaData();
      })
      .catch((error) => console.log(error));
  };
  const handleSearch = (e) => {
    const searchValue = e.target.value;
    setSearchText(searchValue);
  };

  const filterVizitaList = searchText
  ? vizitaList.filter((drejtori) => drejtori.burgosuriID.toString().includes(searchText)) 
    : vizitaList;

  return (
    <div className="container mt-5">
    <h1>Vizita CRUD</h1>
    <div className="mb-3">
        <input
          type="text"
          placeholder="Search by ID of PrisonerID"
          value={searchText}
          onChange={handleSearch}
          className="form-control"
        />
      </div>
    <button className="btn btn-primary mb-3" onClick={handleShowCreateModal}>Create Vizita</button>

    <h2>Vizita List</h2>
    <div className="table-container">
    <table className="table">
      <thead>
        <tr>
          <th>VizitoriID</th>
          <th>BurgosuriID</th>
          <th>Afersia</th>
          <th>Data</th>
          <th>Koha Fillimit</th>
          <th>Koha Mbarimit</th>
          <th>OficeriID</th>
          <th>Created At</th>
          <th>Updated At</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {filterVizitaList.map((vizita) => {
          const vizitori = vizitoriOptions.find((vizitor) => vizitor.vizitoriID === vizita.vizitoriID);
          const emri = vizitori ? vizitori.emri : '';
          const mbiemri = vizitori ? vizitori.mbiemri : '';

          const burgosuri = burgosuriOptions.find((burgosur) => burgosur.burgosuriID === vizita.burgosuriID);
          const emriB = burgosuri ? burgosuri.emri : '';
          const mbiemriB = burgosuri ? burgosuri.mbiemri : '';
        
          const oficeri = oficeriOptions.find((oficer) => oficer.oficeriID === vizita.oficeriID);
          const emriC = oficeri ? oficeri.emri : '';
          const mbiemriC = oficeri ? oficeri.mbiemri : '';
          return (
            <tr key={vizita.vizitaID}>
              <td>{vizita.vizitoriID}- {emri} {mbiemri}</td>
              <td>{vizita.burgosuriID}- {emriB} {mbiemriB}</td>
              <td>{vizita.afersia}</td>
              <td>{vizita.data}</td>
              <td>{vizita.kohaFillimit}</td>
              <td>{vizita.kohaMbarimit}</td>
              <td>{vizita.oficeriID}-{emriC} {mbiemriC}</td>
              <td>{vizita.created_at}</td>
              <td>{vizita.updated_at}</td>
              <td>
                <button className="btn btn-primary btn-sm" onClick={() => handleShowEditModal(vizita)}>Edit</button>
                <button className="btn btn-danger btn-sm ml-2" onClick={() => handleDelete(vizita.vizitaID)}>Delete</button>
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
            <Form.Group controlId="vizitoriID">
              <Form.Label>Vizitori ID:</Form.Label>
              <Form.Control
                as="select"
                value={vizitoriID}
                onChange={(e) => setVizitoriID(parseInt(e.target.value))}
              >
                <option value="">Select Vizitorin</option>
                {vizitoriOptions.map((vizitori) => (
                  <option key={vizitori.vizitoriID} value={vizitori.vizitoriID}>
                    {`${vizitori.vizitoriID} - ${vizitori.emri} - ${vizitori.mbiemri}`}
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
        {`${burgosuri.burgosuriID} - ${burgosuri.emri} - ${burgosuri.mbiemri}`}
      </option>
    ))}
  </Form.Control>
</Form.Group>

<Form.Group controlId="afersia">
              <Form.Label>Afersia:</Form.Label>
              <Form.Control
                type="text"
                value={afersia}
                onChange={(e) => setAfersia(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="data">
              <Form.Label>Data:</Form.Label>
              <Form.Control
              
                type="date"
                value={data}
                onChange={(e) => setData(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="kohaFillimit">
              <Form.Label>Koha Fillimit:</Form.Label>
              <Form.Control
                type="time"
                value={kohaFillimit}
                onChange={(e) => setKohaFillimit(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="kohaMbarimit">
              <Form.Label>Koha Mbarimit:</Form.Label>
              <Form.Control
                type="time"
                value={kohaMbarimit}
                onChange={(e) => setKohaMbarimit(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="infiermeriaID">
  <Form.Label>Oficeri ID:</Form.Label>
  <Form.Control
    as="select"
    value={oficeriID}
    onChange={(e) => setOficeriID(e.target.value)}
  >
    <option value="">Select Oficeri</option>
    {oficeriOptions.map((oficeri) => (
      <option key={oficeri.oficeriID} value={oficeri.oficeriID}>
        {`${oficeri.oficeriID} - ${oficeri.emri} - ${oficeri.mbiemri}`}
      </option>
    ))}
  </Form.Control>
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

export default Vizita;
