import { useEffect, useState } from "react";
import { isEmpty } from "../../utils/isEmpty";

function useSearch<T>(prefix: string, searchQuery: string) {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (isEmpty(searchQuery)) {
      setData(null);
      return;
    }

    const searchData = async () => {
      setLoading(true);
      try {
        const response = await fetch(`${prefix}${searchQuery}`);
        const data = await response.json();
        if (!response.ok) {
          throw new Error(data.message, { cause: response.status });
        }

        setError(null);
        setData(data as T);
      } catch (error) {
        if (error instanceof Error) {
          setError(error);
          return;
        }
        setError(new Error("An error has occurred"));
      } finally {
        setLoading(false);
      }
    };

    searchData();
  }, [searchQuery]);

  return { data, loading, error };
}

export default useSearch;
