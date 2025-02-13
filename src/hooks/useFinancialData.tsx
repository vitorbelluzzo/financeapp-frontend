import { FinancialOverview } from "@/types";
import { useState, useEffect, useCallback } from "react";
import axios from "axios";

const BASE_URL = "http://localhost:8080/transactions/overview";

export const useFinancialData = () => {
  const [data, setData] = useState<FinancialOverview | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [filterDate, setFilterDate] = useState<string>(
    new Date().toISOString().split("T")[0] // Formato "YYYY-MM-DD"
  );

  const getFinancialData = useCallback(async (month?: string, year?: string) => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      throw new Error("Usuário não autenticado");
    }

    setLoading(true);
    setError(null);

    try {

      let url = BASE_URL;
      if (month && year) {
        url += `?month=${month}&year=${year}`;
      }

      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      // Verificar se a resposta é bem-sucedida
      if (response.status !== 200) {
        throw new Error(`Erro: ${response.status} - ${response.statusText}`);
      }

      // Atualizar o estado com os dados recebidos
      setData(response.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro desconhecido");
    } finally {
      setLoading(false);
    }
  }, []);


  useEffect(() => {
    if (filterDate) {
      const [year, month] = filterDate.split("-");
      getFinancialData(month, year);
    } else {
      getFinancialData();
    }
  }, [filterDate, getFinancialData]);

  return {
    data,
    error,
    loading,
    setFilterDate,
    filterDate,
    refetch: () => {
      if (filterDate) {
        const [year, month] = filterDate.split("-");
        return getFinancialData(month, year);
      }
      return getFinancialData();
    },
  };
};
