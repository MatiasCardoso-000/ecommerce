import { useEffect, useState } from "react";

type Data<T> = T | [];

type ErrorType = Error | null;

interface Params<T> {
  data: Data<T>;
  error: ErrorType;
  loading: boolean;
}

export const useFetch = <T>(url: string): Params<T> => {
  const [data, setData] = useState<Data<T>>([]);
  const [error, setError] = useState<ErrorType>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(url);

        if (!response.ok) {
          throw new Error("Error on fetching data");
        }
        const data: T = await response.json();
        setData(data);
        setError(null);
      } catch (error) {
        setError(error as Error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url, loading]);

  return {
    data,
    error,
    loading,
  };
};
