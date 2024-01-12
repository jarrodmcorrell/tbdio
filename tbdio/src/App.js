import './App.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const App = () => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const fetchCount = async () => {
      try {
        const response = await axios.get('/api/count');
        setCount(response.data.count);
      } catch (error) {
        console.error(error);
      }
    };

    fetchCount();
  }, []);

  const handleIncrement = async () => {
    try {
      const response = await axios.post('/api/increment');
      setCount(response.data.count);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h1>Counter: {count}</h1>
      <button onClick={handleIncrement}>Increment</button>
    </div>
  );
};

export default App;
