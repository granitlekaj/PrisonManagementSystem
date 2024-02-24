import React, { useState, useEffect } from "react";
import { Modal, Form, Button } from "react-bootstrap";
import "./components.css";

const Mjeku = () => {
  const [showModal, setShowModal] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [modalAction, setModalAction] = useState("");
  const [mjekuID, setMjekuID] = useState("");
  const [emri, setEmri] = useState("");
  const [mbiemri, setMbiemri] = useState("");
  const [adresa, setAdresa] = useState("");
  const [dateLindja, setDateLindja] = useState("");
  const [gjinia, setGjinia] = useState("");
  const [gradaAkademike, setGradaAkademike] = useState("");
  const [created_at, setCreatedAt] = useState("");
  const [updated_at, setUpdatedAt] = useState("");
  const [mjekuList, setMjekuList] = useState([]);
  const [searchText, setSearchText]=useState('');
  const [error, setError]=useState('');

  useEffect(() => {
    fetchMjekuData();
  }, []);

  const fetchMjekuData = () => {
    fetch('https://localhost:7160/api/Mjeku')
      .then((response) => response.json())
      .then((data) => setMjekuList(data))
      .catch((error) => console.log(error));
  };
  const handleCloseModal = () => {
    setShowModal(false);
    setModalTitle("");
    setModalAction("");
    setMjekuID("");
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
    setModalTitle("Create Mjeku");
    setModalAction("create");
    const currentLocalTime = new Date().toLocaleString();
    setCreatedAt(currentLocalTime);
    setUpdatedAt(currentLocalTime);
  };

  const handleShowEditModal = (mjeku) => {
    setShowModal(true);
    setModalTitle("Edit Oficeri");
    setModalAction("edit");
    setMjekuID(mjeku.mjekuID);
    setEmri(mjeku.emri);
    setMbiemri(mjeku.mbiemri);
    setAdresa(mjeku.adresa);
    setDateLindja(mjeku.dateLindja);
    setGjinia(mjeku.gjinia);
    setGradaAkademike(mjeku.gradaAkademike);
    setCreatedAt(mjeku.created_at);
    const currentLocalTime = new Date().toLocaleString();
    setUpdatedAt(currentLocalTime);
  };

  const handleCreate = () => {
    if (!mjekuID ) {
      setError('Please fill Doctor ID.');
      return;
    }
    if (!emri ) {
      setError('Please fill the name of Doctor.');
      return;
    }
    if(!mbiemri){
      setError('Please fill last name of Doctor.');
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
    if (!gradaAkademike ) {
      setError('Please fill the academic rank!.');
      return;
    }
    const newMjeku = {
      mjekuID: mjekuID,
      emri: emri,
      mbiemri: mbiemri,
      adresa: adresa,
      dateLindja: dateLindja,
      gjinia: gjinia,
      gradaAkademike: gradaAkademike,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    const existingDoctor=mjekuList.find((oficeri) => Number(oficeri.mjekuID)=== Number(mjekuID));

    if(existingDoctor){
      setError('There is already a director with the same ID');
      return;
    }

    fetch('https://localhost:7160/api/Mjeku/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newMjeku)
    })
      .then((response) => response.json())
      .then(() => {
        fetchMjekuData();
        handleCloseModal();
      })
      .catch((error) => console.log(error));
  
  };

  const handleUpdate = () => {
    if (!emri ) {
      setError('Please fill the name of Doctor.');
      return;
    }
    if(!mbiemri){
      setError('Please fill last name of Doctor.');
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
    if (!gradaAkademike ) {
      setError('Please fill the academic rank.');
      return;
    }
    const updateMjeku = {
      mjekuID: mjekuID,
      emri: emri,
      mbiemri: mbiemri,
      adresa: adresa,
      dateLindja: dateLindja,
      gjinia: gjinia,
      gradaAkademike: gradaAkademike,
      created_at: created_at,
      updated_at: new Date().toISOString(),
    };

    fetch(`https://localhost:7160/api/Mjeku/${mjekuID}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(updateMjeku)
      })
        .then((response) => response.json())
        .then(() => {
          fetchMjekuData();
          handleCloseModal();
        })
        .catch((error) => console.log(error));
  };

  const handleDelete = (mjekuID) => {
    fetch(`https://localhost:7160/api/Mjeku/${mjekuID}`, {
      method: 'DELETE'
    })
      .then((response) => response.json())
      .then(() => {
        fetchMjekuData();
      })
      .catch((error) => console.log(error));
  };

  
  const handleSearch = (e) => {
    const searchValue = e.target.value;
    setSearchText(searchValue);
  };

  const filtredMjekuList = searchText
  ? mjekuList.filter((mjeku) => mjeku.mjekuID.toString().includes(searchText)) 
    : mjekuList;

  return (
    <div className="container mt-5">
    <h1>Mjeku CRUD</h1>
    <div className="mb-3">
        <input
          type="text"
          placeholder="Search by ID of Doctor"
          value={searchText}
          onChange={handleSearch}
          className="form-control"
        />
      </div>
      <button
        className="btn btn-primary mb-3"
        onClick={handleShowCreateModal}
      >
        Create Mjeku
      </button>

      <h2>Mjeket List</h2>
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
            <th>GradaAkademike</th>
            <th>Created At</th>
            <th>Updated At</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filtredMjekuList.map((mjeku) => (
            <tr key={mjeku.mjekuID}>
              <td>{mjeku.mjekuID}</td>
              <td>{mjeku.emri}</td>
              <td>{mjeku.mbiemri}</td>
              <td>{mjeku.adresa}</td>
              <td>{mjeku.dateLindja}</td>
              <td>{mjeku.gjinia}</td>
              <td>{mjeku.gradaAkademike}</td>
              <td>{mjeku.created_at}</td>
              <td>{mjeku.updated_at}</td>
              <td>
                <button
                  className="btn btn-primary btn-sm"
                  onClick={() => handleShowEditModal(mjeku)}
                >
                  Edit
                </button>
                <button
                  className="btn btn-danger btn-sm ml-2"
                  onClick={() => handleDelete(mjeku.mjekuID)}
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
            <Form.Group controlId="mjekuID">
              <Form.Label>Mjeku ID:</Form.Label>
              <Form.Control
                type="number"
                value={mjekuID}
                onChange={(e) => setMjekuID(e.target.value)}
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
            <Form.Group controlId="gradaAkademike">
              <Form.Label>GradaAkademike:</Form.Label>
              <Form.Control
                type="text"
                value={gradaAkademike}
                onChange={(e) => setGradaAkademike(e.target.value)}
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

export default Mjeku;
