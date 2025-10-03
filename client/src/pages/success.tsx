import React, { useEffect } from 'react';

// TypeScript interfaces
interface StartFlowResponse {
  success: boolean;
  flow_execution_id: string;
  database_id: number;
  target_market: string;
  product_idea: string;
  email: string;
  status: string;
  date_inserted: string;
  message: string;
  timestamp: string;
}

interface StartFlowError {
  success: false;
  error: string;
  required_fields?: string[];
  received?: string[];
}

const start_flow: React.FC = () => {
  // const BASE_URL = "https://validator-site-mbunsk.replit.app";
  const FLOW_TEMPLATE_ID = "bae9d61f-176f-4b5b-9a66-6c700e9f8604";
  const API_KEY = "oKEkzm4m8x65RL3GgFp1ZEuRuqtNEFTZdwa3OsLp3j8Pp-nK355eQ2DMhgJ3-KWZfAfcJ4q-4wD9iPnYdPsmwQ";
  const email = localStorage.getItem('email');
  const target_market = localStorage.getItem('target_market');
  const idea = localStorage.getItem('idea');
   const BASE_URL = "https://offer.validatorai.com";
    //   ${BASE_URL }/api/v1/flow-executions/flow-templates/{$FLOW_TEMPLATE_ID};
  useEffect(() => {
    const startFlow = async () => {
      try {
        // Hardcoded payload
        const hardcodedPayload = {
          target_market: localStorage.getItem('target_market'),
          product_idea: localStorage.getItem('idea'),
          email: localStorage.getItem('email')
        };

        // const payload = {
        //   target_market: target_market,
        //   product_idea: idea,
        //   email: email
        // };
        
        const response = await fetch('https://plan.validatorai.com/feasibility/start_flow.php', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(hardcodedPayload)
        });

        if (!response.ok) {
          throw new Error(`HTTP Error! status: ${response.status}`);
        }

        const data: StartFlowResponse | StartFlowError = await response.json();

        if (!data.success) {
          const errorResponse = data as StartFlowError;
          throw new Error(errorResponse.error);
        }

        const flowResponse = data as StartFlowResponse;
        
        // Get execution ID and redirect
        const executionId = flowResponse.flow_execution_id;

        //const executionId = "1fcda3d7-f470-4e8f-9c9a-47a48543b5b0";
        // const redirectUrl = "http://localhost:5002/report";

        const redirectUrl = `${BASE_URL}/report`;
        
        console.log('Flow started successfully:' , flowResponse);
        console.log('Redirecting to:', redirectUrl);
        
        // Redirect to URL with execution ID
        window.location.href = `${redirectUrl}/${executionId}`;

      } catch (err) {
        console.error('Error starting flow:', err);
        // Handle error - maybe show error page or retry
        alert('Error starting flow: ' + (err instanceof Error ? err.message : 'Unknown error'));
      }
    };

    // Start flow on page load
    startFlow();
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
        <h2>Starting Flow...</h2>
        <p>Please wait while we initialize your flow execution.</p>
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

export default start_flow;