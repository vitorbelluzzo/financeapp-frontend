import { useState } from "react";
import axios from "axios";


const BASE_URL = "http://localhost:8080/transactions";

export const useDeleteTransaction = () => {
  const [isDeleting, setIsDeleting] = useState(false);

  const deleteTransaction = async (transactionId: number, month?: string, year?: string) => { // Adicione parâmetros de data
    const token = localStorage.getItem("authToken");

    if (!token) {
      throw new Error("Usuário não autenticado");
    }

    setIsDeleting(true);

    try {
      const response = await axios.delete(`${BASE_URL}/${transactionId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      return response.data;
    } catch (error) {
      console.error("Erro ao deletar transação:", error);
      throw error;
    } finally {
      setIsDeleting(false);
    }
  };

  return { isDeleting, deleteTransaction };
}
