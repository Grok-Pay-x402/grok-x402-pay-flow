import { useEffect, useState } from "react";

const Ping = () => {
  const [data, setData] = useState<any>(null);
  const [statusCode, setStatusCode] = useState<number>(0);

  useEffect(() => {
    const fetchPing = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/ping`,
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            }
          }
        );
        
        setStatusCode(response.status);
        const jsonData = await response.json();
        setData(jsonData);
      } catch (error) {
        console.error('Error fetching ping:', error);
      }
    };

    fetchPing();
  }, []);

  if (!data) {
    return null;
  }

  // Render as plain JSON
  return (
    <pre style={{ 
      margin: 0, 
      padding: 0,
      fontFamily: 'monospace',
      whiteSpace: 'pre',
      background: 'transparent'
    }}>
      {JSON.stringify(data, null, 2)}
    </pre>
  );
};

export default Ping;
