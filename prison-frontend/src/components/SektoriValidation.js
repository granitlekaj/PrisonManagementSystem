import React, { useState } from 'react';

const SektoriValidation = ({ sektoriList, handleCreate, handleUpdate }) => {
  const [sektoriID, setSektoriID] = useState('');
  const [emriSektorit, setEmriSektorit] = useState('');
  const [validationErrors, setValidationErrors] = useState({});

  const validateForm = () => {
    const errors = {};

    if (!sektoriID.trim()) {
      errors.sektoriID = 'Sektori ID is required.';
    } else if (sektoriList.some((sektori) => sektori.sektoriID === parseInt(sektoriID))) {
      errors.sektoriID = 'A Sektori with the same ID already exists.';
    }

    if (!emriSektorit.trim()) {
      errors.emriSektorit = 'Emri Sektorit is required.';
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const isValid = validateForm();

    if (isValid) {
      // Call the appropriate handler (handleCreate or handleUpdate)
      if (sektoriID) {
        handleUpdate();
      } else {
        handleCreate();
      }
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="sektoriID">Sektori ID:</label>
          <input
            type="text"
            id="sektoriID"
            value={sektoriID}
            onChange={(e) => setSektoriID(e.target.value)}
          />
          {validationErrors.sektoriID && <span className="error">{validationErrors.sektoriID}</span>}
        </div>
        <div>
          <label htmlFor="emriSektorit">Emri Sektorit:</label>
          <input
            type="text"
            id="emriSektorit"
            value={emriSektorit}
            onChange={(e) => setEmriSektorit(e.target.value)}
          />
          {validationErrors.emriSektorit && <span className="error">{validationErrors.emriSektorit}</span>}
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default SektoriValidation;
