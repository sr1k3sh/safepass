import React from 'react'
import { Skeleton } from '@/components/ui/skeleton'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui//avatar';
import { usePasswordList } from '@/hooks/usePasswordList';

type Props = {
  children: React.ReactNode
}

type PropsMain = {
  index: number,
  data?: {
    id: string,
    image?: string,
    title: string,
    username: string,
  },
  currentPass?: any
  isActive?: boolean
}

const PasswordItem = ({ children }: Props) => {
  return (
    {
      children
    }
  );
};

const Main = ({index, data, isActive }:PropsMain) => {
  const { onClickPassList } = usePasswordList()

  return (
    <div className={`flex flex-row items-center gap-4 p-4 rounded-lg hover:bg-secondary ${!isActive && 'bg-secondary md:bg-transparent'} cursor-pointer ${isActive && 'bg-primary'}`} onClick={() => onClickPassList && onClickPassList(index)}>
      <div className='flex flex-col'>
        <Avatar className='w-12 h-12'>
          <AvatarImage src={data?.image} />
          <AvatarFallback className='font-bold uppercase'>{data.title.charAt(0)}</AvatarFallback>
        </Avatar>
      </div>
      <div className='flex flex-col'>
        <h3 className='text-sm font-semibold text-foreground'>{data.title}</h3>
        <div>
          <span className='text-xs text-muted-foreground'>{data.username}</span>
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


PasswordItem.Main = Main;
PasswordItem.IsLoading = IsLoading;

export default PasswordItem;
