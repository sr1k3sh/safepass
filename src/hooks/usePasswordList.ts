import { defaultPassState } from "@/lib/utils"
import { useCallback, useEffect, useState } from "react"
import { useRecoilState } from "recoil"
import useSWR from "swr"

const fetcher = async (url: string) => {
  const res = await fetch(url)
  if (!res.ok) {
    throw await res.json()
  }

  return await res.json()
}


export const usePasswordList = () => {
  const [currentPass, setCurrentPass] = useRecoilState(defaultPassState)
  const{ data, isLoading, error } = useSWR('/api/get/login', fetcher)

  const onClickPassList = useCallback((index:number) => {
    if(data?.data) {
      setCurrentPass(data?.data[index])
    }
  },[data, setCurrentPass])

  return {
    data: data?.data,
    isLoading,
    error,
    onClickPassList,
    currentPass,
    setCurrentPass,
  }
}