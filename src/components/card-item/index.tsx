import React from 'react'
import { Skeleton } from '@/components/ui/skeleton'
import { format } from 'date-fns';
import { useCardList } from '@/hooks/useCardList';

type Props = {
  children: React.ReactNode
}

type PropsMain = {
  index: number,
  data?: {
    id: string,
    type: string,
    bank: string,
    cardHolder: string,
    cardNumber: string,
    cvv: string,
    expiration: Date,
  },
  currentPass?: any
  isActive?: boolean
}

const CardItem = ({ children }: Props) => {
  return (
    {
      children
    }
  );
};

const Main = ({index, data, isActive }:PropsMain) => {
  const { onClickPassList } = useCardList()

  return (
    <div className={`flex flex-row items-center gap-4 p-4 rounded-lg hover:bg-secondary ${!isActive && 'bg-secondary md:bg-transparent'} cursor-pointer ${isActive && 'bg-primary'}`} onClick={() => onClickPassList && onClickPassList(index)}>
      <div className='flex flex-col'>
        <div className='bg-muted flex font-bold justify-center items-center rounded-full p-4 aspect-square w-12 h-12'>
          {
            data?.bank.charAt(0)
          }
        </div>
      </div>
      <div className='flex flex-col'>
        <h3 className='text-sm font-semibold text-foreground'>{data?.cardHolder}</h3>
        <div>
          <span className='text-xs text-muted-foreground'>{data?.expiration && format(data?.expiration, "yyyy-mm-dd")}</span>
        </div>
      </div>
    </div>
  )
};

const IsLoading = () => {
  return (
    <div className="flex items-center space-x-4">
      <Skeleton className="h-12 w-12 bg-muted rounded-full" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-[250px] bg-muted" />
        <Skeleton className="h-4 w-[200px] bg-muted" />
      </div>
    </div>
  );
}


CardItem.Main = Main;
CardItem.IsLoading = IsLoading;

export default CardItem;
