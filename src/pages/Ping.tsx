import { useEffect } from "react";

const Ping = () => {
  useEffect(() => {
    // Redirect to edge function endpoint immediately
    const edgeFunctionUrl = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/ping`;
    window.location.replace(edgeFunctionUrl);
  }, []);

  return (
    <div style={{ 
      margin: 0, 
      padding: '20px', 
      fontFamily: 'monospace',
      textAlign: 'center'
    }}>
      Redirecting to ping endpoint...
    </div>
  );
};

export default Ping;
