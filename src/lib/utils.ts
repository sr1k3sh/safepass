import { ICardState } from "@/hooks/useCardList"
import { type ClassValue, clsx } from "clsx"
import { atom } from "recoil"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const fetcher = (...args) => fetch(...args).then(res => res.json())

export const defaultPassState = atom({
  key: 'defaultPassState',
  default:null
})

export const defaultCardState = atom<ICardState|null>({
  key: 'defaultCardState',
  default:null
})