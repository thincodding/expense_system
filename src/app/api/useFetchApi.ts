import { useEffect, useState } from 'react'

interface ApiResponse {
  pro: any[];
}

export function useApi(url: string){
    const [data, setData] = useState<ApiResponse | null>(null)

    const useFetchData = async() => {
        const reponse = await fetch(url)
        if(reponse.ok){
            const datas = await reponse.json()
            setData(datas)
        }
    }


    useEffect(() => {
        useFetchData()
    },[])

    return {data}
}

