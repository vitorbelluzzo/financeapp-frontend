import { FinancialOverview } from "@/types";
import { useState, useEffect, useCallback } from "react";

export const useFinancialData = () => {
  const [data, setData] = useState<FinancialOverview | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [filterDate, setFilterDate] = useState<string>(Date.now().toString());

  const getFinancialData = useCallback(
    async (month?: string, year?: string) => {
      const token = localStorage.getItem("authToken");
      setLoading(true);
      setError(null);

      try {
        var url = `http://localhost:8080/transactions/overview`;
        if (month && year) {
          url += `?month=${month}&year=${year}`;
        }
        const response = await fetch(url, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error(`Erro: ${response.status} - ${response.statusText}`);
        }

        const result = await response.json();
        setData(result);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    },
    []
  );

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
    }
  };
};
