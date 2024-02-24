import React, { useState, useEffect } from "react";
import { Modal, Form, Button } from "react-bootstrap";
import "./components.css";


const Vizitori = () => {
  const [showModal, setShowModal] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [modalAction, setModalAction] = useState("");
  const [vizitoriID, setVizitoriID] = useState("");
  const [emri, setEmri] = useState("");
  const [mbiemri, setMbiemri] = useState("");
  const [adresa, setAdresa] = useState("");
  const [created_at, setCreatedAt] = useState("");
  const [updated_at, setUpdatedAt] = useState("");
  const [vizitoriList, setVizitoriList] = useState([]);
  const [searchText,setSearchText]=useState('');
  const [error, setError]=useState('');

  useEffect(() => {
    fetchVizitoriData();
  }, []);

  const fetchVizitoriData = () => {
    fetch('https://localhost:7160/api/Vizitori')
      .then((response) => response.json())
      .then((data) => setVizitoriList(data))
      .catch((error) => console.log(error));
  };
  const handleCloseModal = () => {
    setShowModal(false);
    setModalTitle("");
    setModalAction("");
    setVizitoriID("");
    setEmri("");
    setMbiemri("");
    setAdresa("");
    setCreatedAt("");
    setUpdatedAt("");
  };

  const handleShowCreateModal = () => {
    setShowModal(true);
    setModalTitle("Create Vizitori");
    setModalAction("create");
    const currentLocalTime = new Date().toLocaleString();
    setCreatedAt(currentLocalTime);
    setUpdatedAt(currentLocalTime);
  };

  const handleShowEditModal = (vizitori) => {
    setShowModal(true);
    setModalTitle("Edit Vizitori");
    setModalAction("edit");
    setVizitoriID(vizitori.vizitoriID);
    setEmri(vizitori.emri);
    setMbiemri(vizitori.mbiemri);
    setAdresa(vizitori.adresa);
    setCreatedAt(vizitori.created_at);
    const currentLocalTime = new Date().toLocaleString();
    setUpdatedAt(currentLocalTime);
  };

  const handleCreate = () => {
    if (!vizitoriID ) {
      setError('Please fill Visitor ID.');
      return;
    }
    if (!emri ) {
      setError('Please fill the name of Visitor.');
      return;
    }
    if(!mbiemri){
      setError('Please fill last name of Visitor.');
      return;
    }
    if (!adresa ) {
      setError('Please fill Adresa.');
      return;
    }
    const newVizitori = {
      vizitoriID: vizitoriID,
      emri: emri,
      mbiemri: mbiemri,
      adresa: adresa,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    const existingVisitor=vizitoriList.find((vizitori) => 
    Number(vizitori.vizitoriID) === Number(vizitoriID)
    );

    if(existingVisitor){
      setError('Visitor already exists!');
      return;
    }


    fetch('https://localhost:7160/api/Vizitori/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newVizitori)
    })
      .then((response) => response.json())
      .then(() => {
        fetchVizitoriData();
        handleCloseModal();
      })
      .catch((error) => console.log(error));
  
  };

  const handleUpdate = () => {
    if (!emri ) {
      setError('Please fill the name of Visitor.');
      return;
    }
    if(!mbiemri){
      setError('Please fill last name of Visitor.');
      return;
    }
    if (!adresa ) {
      setError('Please fill Adresa.');
      return;
    }
    const updatedVizitori = {
      vizitoriID: vizitoriID,
      emri: emri,
      mbiemri: mbiemri,
      adresa: adresa,
      created_at: created_at,
      updated_at: new Date().toISOString(),
    };

    fetch(`https://localhost:7160/api/Vizitori/${vizitoriID}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatedVizitori)
      })
        .then((response) => response.json())
        .then(() => {
          fetchVizitoriData();
          handleCloseModal();
        })
        .catch((error) => console.log(error));
  };

  const handleDelete = (vizitoriID) => {
    fetch(`https://localhost:7160/api/Vizitori/${vizitoriID}`, {
      method: 'DELETE'
    })
      .then((response) => response.json())
      .then(() => {
        fetchVizitoriData();
      })
      .catch((error) => console.log(error));
  };

  

  const handleSearch = (e) => {
    const searchValue = e.target.value;
    setSearchText(searchValue);
  };

  const filtredVizitoriList = searchText
  ? vizitoriList.filter((drejtori) => drejtori.vizitoriID.toString().includes(searchText)) 
    : vizitoriList;

  return (
    <div className="container mt-5">
    <h1>Vizitori CRUD</h1>
    <div className="mb-3">
        <input
          type="text"
          placeholder="Search by ID of Visitor"
          value={searchText}
          onChange={handleSearch}
          className="form-control"
        />
      </div>
      <button
        className="btn btn-primary mb-3"
        onClick={handleShowCreateModal}
      >
        Create Vizitori
      </button>

      <h2>Vizitori List</h2>
      <div className="table-container">
      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Emri</th>
            <th>Mbiemri</th>
            <th>Adresa</th>
            <th>Created At</th>
            <th>Updated At</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filtredVizitoriList.map((vizitori) => (
            <tr key={vizitori.vizitoriID}>
              <td>{vizitori.vizitoriID}</td>
              <td>{vizitori.emri}</td>
              <td>{vizitori.mbiemri}</td>
              <td>{vizitori.adresa}</td>
              <td>{vizitori.created_at}</td>
              <td>{vizitori.updated_at}</td>
              <td>
                <button
                  className="btn btn-primary btn-sm"
                  onClick={() => handleShowEditModal(vizitori)}
                >
                  Edit
                </button>
                <button
                  className="btn btn-danger btn-sm ml-2"
                  onClick={() => handleDelete(vizitori.vizitoriID)}
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
            <Form.Group controlId="vizitoriID">
              <Form.Label>Vizitori ID:</Form.Label>
              <Form.Control
                type="number"
                value={vizitoriID}
                onChange={(e) => setVizitoriID(e.target.value)}
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
            {modalAction === "create" && (
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

export default Vizitori;
