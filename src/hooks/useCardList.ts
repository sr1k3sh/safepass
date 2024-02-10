import { defaultCardState } from "@/lib/utils"
import { useCallback } from "react"
import { useRecoilState } from "recoil"
import useSWR from "swr"
export type ICardState = {
  id: string,
  type: string,
  bank: string,
  cardNumber: string,
  cardHolder: string,
  expiration: Date,
  cvv: string,
}
const fetcher = async (url: string) => {
  const res = await fetch(url)
  if (!res.ok) {
    throw await res.json()
  }

  return await res.json()
}

export const useCardList = () => {
  const [currentCard, setCurrentCard] = useRecoilState<ICardState|null>(defaultCardState)
  const{ data, isLoading, error } = useSWR('/api/get/cards', fetcher)

  const onClickPassList = useCallback((index:number) => {
    if(data?.data) {
      setCurrentCard(data?.data[index])
    }
  },[data, setCurrentCard])

  return {
    data: data?.data,
    isLoading,
    error,
    onClickPassList,
    currentCard,
    setCurrentCard,
  }
}