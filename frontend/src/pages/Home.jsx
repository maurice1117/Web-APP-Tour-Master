import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Bar from "../components/Bar";

const Home = () => {
  const [location, setLocation] = useState('');
  const [response, setResponse] = useState(null);

  const checkResponseFile = async () => {
    try {
      const result = await axios.get('/src/assets/response.json', {
        headers: {
          'Cache-Control': 'no-cache',
        },
      });
      setResponse(result.data);
    } catch (error) {
      if (error.response && error.response.status === 404) {
        console.log('response.json not found');
        setResponse(null);
      } else {
        console.error('Error loading response.json:', error);
      }
    }
  };

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
      setResponse(result.data);
    } catch (error) {
      console.error('Error fetching data:', error);
      setResponse({
        status: 'error',
        message: error.response ? error.response.data.message : 'Unexpected error',
      });
    }
  };

  useEffect(() => {
    checkResponseFile();
  }, []);

  return (
    <div>
      <Bar />
      <input
        type="text"
        value={location}
        onChange={handleInputChange}
        placeholder="Enter location"
      />
      <button onClick={handleSearch}>Search</button>

      {response && response.status === 'success' && (
        <div className="attraction-grid">
          {response.attractions.map((attraction, index) => (
            <div key={index} className="attraction-block">
              <h4>{attraction}</h4>
              <img src={response.images[index]} alt={attraction} width="200" />
              <Link to={`/attraction/${attraction}`}>
                <button>View More</button>
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;