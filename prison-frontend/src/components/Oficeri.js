import React, { useState, useEffect } from "react";
import { Modal, Form, Button } from "react-bootstrap";
import "./components.css";

const Oficeri = () => {
  const [showModal, setShowModal] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [modalAction, setModalAction] = useState("");
  const [oficeriID, setOficeriID] = useState("");
  const [emri, setEmri] = useState("");
  const [mbiemri, setMbiemri] = useState("");
  const [adresa, setAdresa] = useState("");
  const [dateLindja, setDateLindja] = useState("");
  const [gjinia, setGjinia] = useState("");
  const [created_at, setCreatedAt] = useState("");
  const [updated_at, setUpdatedAt] = useState("");
  const [oficeriList, setOficeriList] = useState([]);
  const [searchText, setSearchText]=useState('');
  const [error, setError]=useState('');

  useEffect(() => {
    fetchOficeriData();
  }, []);

  const fetchOficeriData = () => {
    fetch('https://localhost:7160/api/Oficeri')
      .then((response) => response.json())
      .then((data) => setOficeriList(data))
      .catch((error) => console.log(error));
  };
  const handleCloseModal = () => {
    setShowModal(false);
    setModalTitle("");
    setModalAction("");
    setOficeriID("");
    setEmri("");
    setMbiemri("");
    setAdresa("");
    setDateLindja("");
    setGjinia("");
    setCreatedAt("");
    setUpdatedAt("");
  };

  const handleShowCreateModal = () => {
    setShowModal(true);
    setModalTitle("Create Oficeri");
    setModalAction("create");
    const currentLocalTime = new Date().toLocaleString();
    setCreatedAt(currentLocalTime);
    setUpdatedAt(currentLocalTime);
  };

  const handleShowEditModal = (oficeri) => {
    setShowModal(true);
    setModalTitle("Edit Oficeri");
    setModalAction("edit");
    setOficeriID(oficeri.oficeriID);
    setEmri(oficeri.emri);
    setMbiemri(oficeri.mbiemri);
    setAdresa(oficeri.adresa);
    setDateLindja(oficeri.dateLindja);
    setGjinia(oficeri.gjinia);
    setCreatedAt(oficeri.created_at);
    const currentLocalTime = new Date().toLocaleString();
    setUpdatedAt(currentLocalTime);
  };

  const handleCreate = () => {
    if (!oficeriID ) {
      setError('Please fill Officer ID.');
      return;
    }
    if (!emri ) {
      setError('Please fill the name of Officer.');
      return;
    }
    if(!mbiemri){
      setError('Please fill last name of Officer.');
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
    const newOficeri = {
      oficeriID: oficeriID,
      emri: emri,
      mbiemri: mbiemri,
      adresa: adresa,
      dateLindja: dateLindja,
      gjinia: gjinia,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    const existingOficeri=oficeriList.find((oficeri) => Number(oficeri.oficeriID)=== Number(oficeriID));

    if(existingOficeri){
      setError('There is already a director with the same ID');
      return;
    }

    fetch('https://localhost:7160/api/Oficeri/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newOficeri)
    })
      .then((response) => response.json())
      .then(() => {
        fetchOficeriData();
        handleCloseModal();
      })
      .catch((error) => console.log(error));
  
  };

  const handleUpdate = () => {
    if (!emri ) {
      setError('Please fill the name of Officer.');
      return;
    }
    if(!mbiemri){
      setError('Please fill last name of Officer.');
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
    const updatedOficeri = {
      oficeriID: oficeriID,
      emri: emri,
      mbiemri: mbiemri,
      adresa: adresa,
      dateLindja: dateLindja,
      gjinia: gjinia,
      created_at: created_at,
      updated_at: new Date().toISOString(),
    };

    fetch(`https://localhost:7160/api/Oficeri/${oficeriID}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatedOficeri)
      })
        .then((response) => response.json())
        .then(() => {
          fetchOficeriData();
          handleCloseModal();
        })
        .catch((error) => console.log(error));
  };

  const handleDelete = (oficeriID) => {
    fetch(`https://localhost:7160/api/Oficeri/${oficeriID}`, {
      method: 'DELETE'
    })
      .then((response) => response.json())
      .then(() => {
        fetchOficeriData();
      })
      .catch((error) => console.log(error));
  };

  

  
  const handleSearch = (e) => {
    const searchValue = e.target.value;
    setSearchText(searchValue);
  };

  const filtredOficeriList = searchText
  ? oficeriList.filter((oficeri) => oficeri.oficeriID.toString().includes(searchText)) 
    : oficeriList;

  return (
    <div className="container mt-5">
    <h1>Oficeri CRUD</h1>
    <div className="mb-3">
        <input
          type="text"
          placeholder="Search by ID of Oficeri"
          value={searchText}
          onChange={handleSearch}
          className="form-control"
        />
      </div>
      <button
        className="btn btn-primary mb-3"
        onClick={handleShowCreateModal}
      >
        Create Oficeri
      </button>

      <h2>Oficeri List</h2>
      <div className="table-container">
      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
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
          {filtredOficeriList.map((oficeri) => (
            <tr key={oficeri.oficeriID}>
              <td>{oficeri.oficeriID}</td>
              <td>{oficeri.emri}</td>
              <td>{oficeri.mbiemri}</td>
              <td>{oficeri.adresa}</td>
              <td>{oficeri.dateLindja}</td>
              <td>{oficeri.gjinia}</td>
              <td>{oficeri.created_at}</td>
              <td>{oficeri.updated_at}</td>
              <td>
                <button
                  className="btn btn-primary btn-sm"
                  onClick={() => handleShowEditModal(oficeri)}
                >
                  Edit
                </button>
                <button
                  className="btn btn-danger btn-sm ml-2"
                  onClick={() => handleDelete(oficeri.OficeriID)}
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
            <Form.Group controlId="oficeriID">
              <Form.Label>Oficeri ID:</Form.Label>
              <Form.Control
                type="number"
                value={oficeriID}
                onChange={(e) => setOficeriID(e.target.value)}
                disabled={modalAction === "edit"}
              />
            </Form.Group>
            <Form.Group controlId="emri">
              <Form.Label>Emri:</Form.Label>
              <Form.Control
                type="text"
                value={emri}
                onChange={(e) => setEmri(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="mbiemri">
              <Form.Label>Mbiemri:</Form.Label>
              <Form.Control
                type="text"
                value={mbiemri}
                onChange={(e) => setMbiemri(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="adresa">
              <Form.Label>Adresa:</Form.Label>
              <Form.Control
                type="text"
                value={adresa}
                onChange={(e) => setAdresa(e.target.value)}
              />
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
            {modalAction === "create" && (
              <Form.Group controlId="createdAt">
                <Form.Label>Created At:</Form.Label>
                <Form.Control type="text" value={created_at} onChange={(e) => setCreatedAt(e.target.value)} disabled/>
              </Form.Group>
            )}
            {modalAction === "edit" && (
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
                disabled={modalAction === "create"}
                readOnly
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
          {modalAction === "create" && (
            <Button variant="primary" onClick={handleCreate}>
              Create
            </Button>
          )}
          {modalAction === "edit" && (
            <Button variant="primary" onClick={handleUpdate}>
              Update
            </Button>
          )}
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Oficeri;
