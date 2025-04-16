import React, { useState } from 'react';
import { motion } from "framer-motion";
import { useNavigate } from 'react-router';
import axios from 'axios';
import './uploadPhoto.css';

const UploadPhoto = () => {
  const navigate = useNavigate();
  const [file, setFile] = useState(null);
  const [occasion, setOccasion] = useState('');
  const [weather, setWeather] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (!file || !occasion || !weather) {
      setError('Please fill all fields');
      setLoading(false);
      return;
    }

    const formData = new FormData();
    formData.append('image', file);
    formData.append('occasion', occasion);
    formData.append('weather', weather);

    try {
      const response = await axios.post('http://localhost:5000/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      if (response.data.success) {
        navigate('/display-fit', { state: { data: response.data.data } });
      } else {
        setError(response.data.error || 'Upload failed');
      }
    } catch (err) {
      setError(err.response?.data?.error || 'Server error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="upload-container">
      <h1 className="upload-heading">Please upload a photo!</h1>
      
      <form onSubmit={handleSubmit}>
        <input 
          type="file" 
          className="upload-input" 
          onChange={(e) => setFile(e.target.files[0])}
          accept="image/*"
          required
        />

        {/* Occasion Dropdown */}
        <div className="select-group">
          <label htmlFor="occasion" className="select-label">Choose Occasion:</label>
          <select 
            id="occasion" 
            value={occasion}
            onChange={(e) => setOccasion(e.target.value)}
            className="select-box"
            required
          >
            <option value="">-- Occasion Please --</option>
            <option value="casual">Casual</option>
            <option value="formal">Formal</option>
            <option value="party">Party</option>
            <option value="festive">Festive</option>
            <option value="work">Work</option>
          </select>
        </div>

        {/* Weather Dropdown */}
        <div className="select-group">
          <label htmlFor="weather" className="select-label">Choose Weather:</label>
          <select 
            id="weather" 
            value={weather}
            onChange={(e) => setWeather(e.target.value)}
            className="select-box"
            required
          >
            <option value="">-- Weather Please --</option>
            <option value="summer">Summer</option>
            <option value="rainy">Rainy</option>
            <option value="winter">Winter</option>
            <option value="fall">Fall</option>
            <option value="spring">Spring</option>
          </select>
        </div>

        {error && <div className="error-message">{error}</div>}

        <motion.button
          type="submit"
          className="return-button"
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ type: "spring", stiffness: 120, damping: 10, delay: 0.3 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          disabled={loading}
        >
          {loading ? 'Processing...' : 'Dress me up! :)'}
        </motion.button>
      </form>
    </div>
  );
};

export default UploadPhoto;