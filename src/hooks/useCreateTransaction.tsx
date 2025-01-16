import { useState } from 'react';


export const useCreateTransaction = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createTransaction = async (transaction: {
    amount: number;
    type: 'INCOME' | 'EXPENSE';
    description: string;
    date: string;
  }) => {
    const token = localStorage.getItem('authToken');
    setLoading(true);
    setError(null);

    try {
      var url = 'http://localhost:8080/transactions';
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(transaction)
      });

      if (!response.ok) {
        const contentType = response.headers.get("Content-Type")

        if(contentType && contentType.includes("application/json")) {
          const result = await response.json();
          return result;
        } else {
          console.warn("Resposta sem conteúdo JSON.");
        return null; 
        throw new Error(`Falha ao criar a transação: ${response.status} ${response.statusText}`);
        }
        
      }

      
    } catch (err) {
      setError((err as Error).message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { createTransaction, loading, error };
};
