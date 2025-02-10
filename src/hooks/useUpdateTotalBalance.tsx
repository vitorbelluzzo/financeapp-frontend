import { useState } from "react";

interface TotalBalance {
    amount: number;
    description: string;
    date: Date;
}

const API_URL = "http://localhost:8080/transactions/updatebalance";

function getAuthToken():string {
  const token = localStorage.getItem("authToken");
  if (!token) {
    throw new Error("Usuário não autenticado");
  }
  return token;
}

 async function updateTotalBalance(totalBalance: TotalBalance, token: string): Promise<void> {  
  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(totalBalance),
      });

      if (!response.ok) {
        throw new Error(`Erro: ${response.status} - ${response.statusText}`);
      }
}

export function useAlterTotalBalance() {
  const [loading, setLoading] = useState(false);
  const [error,  setError] = useState<string | null>(null);

  async  function  alterTotalBalance(totalBalance:TotalBalance) {
    setLoading(true);
    setError(null);
    
    try {
      const token = getAuthToken()
      await updateTotalBalance(totalBalance, token);      
    } catch (error) {
      setError(error instanceof Error ? error.message : "Ocorreu um erro");
    } finally {
      setLoading(false);
    }
  };

  return { alterTotalBalance, loading, error }
}
