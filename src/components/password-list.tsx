import React, { Suspense, use, useEffect } from 'react'
import { ScrollArea } from '@/components/ui/scroll-area'
import PasswordItem from './password-item'
import { usePasswordList } from '@/hooks/usePasswordList'

type Props = {
  data: any[],
  isLoading: boolean,
  error: any,
  // onClickPassList: (index:number)=> void
}

export default function PasswordList({ }: Props) {

  const { data, isLoading, setCurrentPass, currentPass } = usePasswordList()

  useEffect(() => {
    if(data) {
      setCurrentPass(data[0])
    }
  },[data, setCurrentPass])

  return (
    <ScrollArea>
      <div className='flex flex-col gap-4 overflow-auto h-full'>
        {
          isLoading ?
            <div className='flex flex-col gap-4'>
              {
                [1, 2, 3, 4, 5].map((i) => (
                  <PasswordItem.IsLoading key={i + 'loading'} />
                ))
              }
            </div>
            :
            data && data?.map((pass: any, i: number) => (
              <PasswordItem.Main key={pass + i} index={i} data={pass} isActive={ currentPass?.id && currentPass?.id === pass.id}/>
            ))
        }
      </div>
    </ScrollArea>
  )
}