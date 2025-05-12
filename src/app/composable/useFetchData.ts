// import { useEffect, useState } from 'react'

// interface ApiResponse {
//   pro: any[];
//   results: any[]
// }

// export function useApi(url: string){
//     const [data, setData] = useState<ApiResponse | null>(null)

//     const useFetchData = async() => {
//         const reponse = await fetch(url)
//         if(reponse.ok){
//             const datas = await reponse.json()
//             setData(datas)
//         }
//     }


//     useEffect(() => {
//         useFetchData()
//     },[url])

//     return {data, useFetchData}
// }


//with pagination
import { useEffect, useState } from 'react';

export function useApi<T>(endpoint: string, options?: RequestInit) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<any>(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      const res = await fetch(endpoint, options);
      const json = await res.json();
      setData(json);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [endpoint]);

  return { data, loading, error, refetch: fetchData };
}
