import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Bar from "../components/Bar";

const Home = () => {
  const [location, setLocation] = useState('');
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setLocation(e.target.value);
  };

  const handleSearch = async () => {
    try {
      const result = await axios.post('http://127.0.0.1:8000/search/location', {
        location: location,
      }, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      localStorage.setItem('locationResponse', JSON.stringify(result.data));

      navigate('/attraction');
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <div>
      <Bar />
      <h1>Home Page</h1>
      <input
        type="text"
        value={location}
        onChange={handleInputChange}
        placeholder="Enter location"
      />
      <button onClick={handleSearch}>Search</button>
    </div>
  );
};

export default Home;
