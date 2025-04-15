import React from 'react';
import { useNavigate } from 'react-router';
import './uploadPhoto.css';

const UploadPhoto = () => {
  const navigate = useNavigate();

  return (
    <div className="upload-container">
      <h1 className="upload-heading">Please upload a photo!</h1>
      
      <input type="file" className="upload-input" />

      <div className="select-group">
        <label htmlFor="occasion" className="select-label">Choose Occasion:</label>
        <select id="occasion" name="occasion" className="select-box">
          <option value="">-- Select Occasion --</option>
          <option value="casual">Casual</option>
          <option value="formal">Formal</option>
          <option value="party">Party</option>
          <option value="wedding">Wedding</option>
        </select>
      </div>

      <div className="select-group">
        <label htmlFor="weather" className="select-label">Choose Weather:</label>
        <select id="weather" name="weather" className="select-box">
          <option value="">-- Select Weather --</option>
          <option value="sunny">Sunny</option>
          <option value="rainy">Rainy</option>
          <option value="cold">Cold</option>
          <option value="hot">Hot</option>
        </select>
      </div>

      <button className="return-button" onClick={() => navigate('/display-fit')}>
        Click here to generate fit matching your selections. 
      </button>
    </div>
  );
};

export default UploadPhoto;
