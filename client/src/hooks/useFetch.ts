import { useEffect, useState } from "react";


type Data<T> = T | [];
type ErrorType = Error | null;

interface Params<T> {
  data: Data<T>;
  loading: boolean;
  error: ErrorType;
}

export const useFetch = <T>(url: string): Params<T> => {
  const [data, setData] = useState<Data<T>>([]);
  const [error, setError] = useState<ErrorType>(null);
  const [loading, setLoading] = useState<boolean>(true);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error("Fetching error");
        }
        const data = await response.json();
        
        setData(data);
        setError(null)
      } catch (error) {
        console.error(error);
        setError(error as Error);
      }finally{
        setLoading(false)
      }
    };
    fetchData();
 
  }, [url]);
  return { data, loading, error };
};
