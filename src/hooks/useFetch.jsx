import { useState, useEffect, useCallback } from "react";

function useFetch(url) {
  const [data, setData] = useState("");
  const fetchData = useCallback(async () => {
    fetch(url)
      .then((res) => res.json())
      .then((value) => setData(value));
  }, [url]);

  useEffect(() => {
    fetchData()
  }, [fetchData])
  return {data, refetch: fetchData};
}

export default useFetch;
