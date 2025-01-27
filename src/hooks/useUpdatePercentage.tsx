import { useState } from "react";

interface Percentage {
  savingsPercentage: number;
}

export const useAlterPercentage = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const alterPercentage = async (percentage: Percentage) => {
    const token = localStorage.getItem("authToken");
    
    if (!token) {
      throw new Error("Usuário não autenticado"); 
    }

    setLoading(true);
    setError(null);

    try {
      var url = "http://localhost:8080/transactions/alterpercentage";
      const response = await fetch(url, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(percentage),
      });

    
      if (!response.ok) {
        const contentType = response.headers.get("Content-Type");

        if (contentType?.includes("application/json")) {
          const errorData = await response.json();
          throw new Error(errorData.message || "Falha ao criar ao alterar a porcentagem");
        }
        throw new Error(
          `'Falha ao alterar a porcentagem: ${response.status} ${response.statusText}`
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

  return { alterPercentage, loading, error };
};
