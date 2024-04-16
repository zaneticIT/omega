import React, { useState, useEffect } from 'react';

function App() {
  const [ugovori, setUgovori] = useState(null);
  const [artikli, setArtikli] = useState(null);

  useEffect(() => {
    fetchUgovori();
    fetchArtikli();
  }, []);

  const fetchUgovori = async () => {
    try {
      const response = await fetch('http://localhost:3002/api/ugovori');
      const jsonData = await response.json();
      setUgovori(jsonData);
      console.log(jsonData)
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const fetchArtikli = async () => {
    try {
      const response = await fetch('http://localhost:3002/api/artikli');
      const jsonData = await response.json();
      setArtikli(jsonData);
      console.log(jsonData)
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <div>
      <h1>API Data</h1>
      {ugovori ? (
        <div>
          <p>Ugovori:</p>
          <pre>{JSON.stringify(ugovori, null, 2)}</pre>
        </div>
      ) : (
        <p>Loading...</p>
      )}
      {artikli ? (
        <div>
          <p>Artikli:</p>
          <pre>{JSON.stringify(artikli, null, 2)}</pre>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default App;