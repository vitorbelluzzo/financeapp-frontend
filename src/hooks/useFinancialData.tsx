import { FinancialOverview } from '@/types';
import { useState, useEffect } from 'react';


export const useFinancialData = () => {

  const [data, setData] = useState<FinancialOverview | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);


  const getFinancialData = async () => {
    const token = localStorage.getItem('authToken');
    setLoading(true);
    try {
      const response = await fetch('http://localhost:8080/transactions/overview', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
      });

      if (!response.ok) {
        throw new Error(`Erro: ${response.status} - ${response.statusText}`);
      }

      const result = await response.json();
      setData(result);
    }

    catch (err) {
      setError((err as Error).message);
    }
    finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getFinancialData();
  }, []);

  return { data, error, loading }
}
