import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

const Ping = () => {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

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
        
        if (!response.ok) throw new Error('Failed to fetch');
        
        const jsonData = await response.json();
        setData(jsonData);
      } catch (error) {
        console.error('Error fetching ping:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPing();
  }, []);

  // Return JSON response directly
  if (loading) {
    return null;
  }

  // Set content type to JSON
  if (data) {
    return (
      <pre style={{ 
        margin: 0, 
        padding: '20px', 
        fontFamily: 'monospace',
        whiteSpace: 'pre-wrap',
        wordWrap: 'break-word'
      }}>
        {JSON.stringify(data, null, 2)}
      </pre>
    );
  }

  return null;
};

export default Ping;
