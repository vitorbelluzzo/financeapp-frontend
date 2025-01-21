import { useState } from "react";

interface Transaction {
  amount: number;
  type: "INCOME" | "EXPENSE";
  description: string;
  date: string;
}

export const useCreateTransaction = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createTransaction = async (transaction: Transaction) => {
    const token = localStorage.getItem("authToken");

    if (!token) {
      throw new Error("Usuário não autenticado");
    }

    setLoading(true);
    setError(null);

    try {
      var url = "http://localhost:8080/transactions";
      const response = await fetch(url, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(transaction),
      });

    
      if (!response.ok) {
        const contentType = response.headers.get("Content-Type");

        if (contentType?.includes("application/json")) {
          const errorData = await response.json();
          throw new Error(errorData.message || "Falha ao criar a transação");
        }
        throw new Error(
          `'Falha ao criar a transação: ${response.status} ${response.statusText}`
        );
      }
      
      return;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Erro desconhecido";
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { createTransaction, loading, error };
};
