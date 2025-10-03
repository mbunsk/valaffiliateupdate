import React from 'react'
import { useEffect, useState} from 'react';

const Log = () => {
    const [user, setUser] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const code: any = params.get("code");
    localStorage.setItem('code', code);

    if (code) {
      console.log("Sending code to PHP callback:", code);
      fetch("https://plan.validatorai.com/auth/callback.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code }),
        credentials: "include"
      })
        .then(res => res.json())
        .then(data => {
          if (data.error) {
            setError(data.error);
            console.log("Error:", data.error);
          } else {
            setUser(data);
            console.log("User info received:", data);
            localStorage.setItem('email', data.email);
            if (data.name) localStorage.setItem('name', data.name);

            // Redirect to Stripe
            window.location.href = "https://plan.validatorai.com/auth/services/stripe/create-checkout-session.php";
          }
        })
        .catch(err => {
          setError(err.message);
          console.log("Fetch error:", err.message);
        });
    }
  }, []);

  return (
    <div style={{ 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center', 
      height: '100vh',
      fontFamily: 'Arial, sans-serif'
    }}>
      <div style={{ textAlign: 'center' }}>
        <h2>Proceeding to checkout</h2>
        <p>Please wait</p>
        <div style={{
          width: '40px',
          height: '40px',
          border: '4px solid #f3f3f3',
          borderTop: '4px solid #007bff',
          borderRadius: '50%',
          animation: 'spin 1s linear infinite',
          margin: '20px auto'
        }}></div>
      </div>
      
      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};


export default Log;
