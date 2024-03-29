import React, { useContext, useEffect, useState } from 'react'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { useRouter } from 'next/router'
import DashboardHeader from '@/components/dashboard/dashboard-header'
import DashboardSidebar from '@/components/dashboard/dashboard-sidebar'
import { FiEye } from '@react-icons/all-files/fi/FiEye'
import { FiEyeOff } from '@react-icons/all-files/fi/FiEyeOff'
import { Button } from '@/components/ui/button'
import { FiCopy } from '@react-icons/all-files/fi/FiCopy'
import { toast } from '@/components/ui/use-toast'
import { FiStar } from '@react-icons/all-files/fi/FiStar'
import { FiEdit } from '@react-icons/all-files/fi/FiEdit'
import { FiMenu } from '@react-icons/all-files/fi/FiMenu'
import { FiDelete } from '@react-icons/all-files/fi/FiDelete'
import { FiShare } from '@react-icons/all-files/fi/FiShare'
import { DropdownMenuContent, DropdownMenu, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@/components/ui/resizable'
import { AppProvider } from '@/pages/layout'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { ScrollArea } from '@/components/ui/scroll-area'
import PasswordItem from '@/components/password-item'
import { useCardList } from '@/hooks/useCardList'
import CardItem from '@/components/card-item'

type Props = {
  data: any
}

export const currentCategoryStyle = (cat: string) => {
  switch (cat) {
    case 'credit':
      return {
        bg: 'bg-red-400',
        text: 'text-red-200',
        textBg: 'bg-red-700'
      }
    case 'debit':
      return {
        bg: 'bg-green-400',
        text: 'text-green-200',
        textBg: 'bg-green-700'
      }
    case 'cash':
      return {
        bg: 'bg-yellow-400',
        text: 'text-yellow-200',
        textBg: 'bg-yellow-700'
      }
    default:
      return {
        bg: 'bg-gray-400',
        text: 'text-gray-200',
        textBg: 'bg-gray-700'
      }
  }
}

export const formatCreditCardNumber = (cardNumber: string) => {
  // Remove any existing dashes and split the number into groups of four
  if (cardNumber.length === 16) {
    const digitsOnly = cardNumber.replace(/-/g, '');
    const groups = digitsOnly.match(/.{1,4}/g);

    // Add dashes between groups
    if (groups)
      return groups.join('-');
  }
  return cardNumber
}

const CardPage: React.FC<Props> = () => {
  const { data, isLoading, error, setCurrentCard, currentCard } = useCardList()
  const router = useRouter()
  const [isShowPassword, setShowPassword] = useState<boolean>(false)
  const [showJustIconSidebar, setShowJustIconSidebar] = useState<boolean>(false)
  const { isMobile } = useContext(AppProvider)

  useEffect(() => {
    if (error && error.message === 'Unauthorized') {
      router.push('/login')
    }
  }, [error])

  useEffect(() => {
    if (data && data.length) {
      if (isMobile) {
        setCurrentCard(null)
      } else {
        setCurrentCard(data[0])
      }
    }

    return () => {
      setCurrentCard(null)
    }
  }, [data, isMobile])

  const onClickShowPass = () => {
    setShowPassword(prev => !prev)
  }

  const onClickCopyPass = (pass: string) => {
    navigator.clipboard.writeText(pass)
    toast({
      description: 'Password copied to clipboard',
    })
  }

  const onDeletePass = async (id: string) => {
    const res = await fetch('/api/createpass/delete', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id }),
    })

    if (res.ok) {
      toast({
        description: 'Password deleted',
      })
      router.replace(router.asPath)
    }
  }

  const onLayoutResizeable = (layout: any) => {
    if (layout[0] < 10) {
      setShowJustIconSidebar(true)
    } else {
      setShowJustIconSidebar(false)
    }
  }

  return (
    <div className='container-fluid m-auto bg-background overflow-hidden h-dvh'>
      <div className='flex flex-row justify-between relative z-10'>
        {
          isMobile ?
            <div className="flex h-full w-full items-center justify-center">
              <div className='flex flex-col w-full p-4 '>
                <div>
                  <DashboardHeader />
                </div>
                <div className='flex flex-col ps-0 md:p-4 mt-8 gap-4 overflow-hidden h-dvh'>
                  <div className='flex flex-col mb-4'>
                    <h3 className='text-2xl font-bold uppercase'>Your <span className='text-primary'>Cards</span></h3>
                    <p className='text-foreground font-thin text-sm'>{`Here's what's happening with your account today.`}</p>
                  </div>
                  <div className='flex flex-col w-full text-foreground'>
                    <ScrollArea>
                      <div className='flex flex-col gap-2 overflow-auto h-full'>
                        {
                          isLoading ?
                            [1, 2, 3, 4, 5].map((i) => (
                              <PasswordItem.IsLoading key={i + 'loading'} />
                            )) :
                            data && data.map((pass: any, i: number) => (
                              <Sheet key={pass + i}>
                                <SheetTrigger>
                                  <CardItem.Main index={i} data={pass} isActive={currentCard?.id && currentCard?.id === pass.id} />
                                </SheetTrigger>
                                <SheetContent>
                                  {
                                    currentCard &&
                                    <>
                                      <div className='flex flex-row justify-between items-start mt-4'>
                                        <div className='flex flex-col items-start justify-start gap-4'>
                                          <div className={` p-2 rounded-lg ${currentCategoryStyle(currentCard.type).bg}`}>
                                            <div className='bg-muted flex font-bold justify-center items-center rounded-full p-4 aspect-square w-12 h-12'>
                                              {
                                                currentCard?.bank.charAt(0)
                                              }
                                            </div>
                                          </div>
                                        </div>
                                        <div className='flex flex-row items-center'>
                                          <Button size={'icon'} variant={'ghost'}>
                                            <FiStar />
                                          </Button>
                                          <Button size={'icon'} variant={'ghost'}>
                                            <FiEdit />
                                          </Button>
                                          <DropdownMenu>
                                            <DropdownMenuTrigger>
                                              <Button size={'icon'} variant={'ghost'}>
                                                <FiMenu />
                                              </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent>
                                              <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                              <DropdownMenuItem>
                                                <div className='flex flex-row items-center gap-2' onClick={() => onDeletePass(currentCard.id)}>
                                                  <FiDelete />
                                                  Delete
                                                </div>
                                              </DropdownMenuItem>
                                              <DropdownMenuItem>
                                                <div className='flex flex-row items-center gap-2'>
                                                  <FiShare />
                                                  Share
                                                </div>
                                              </DropdownMenuItem>
                                            </DropdownMenuContent>
                                          </DropdownMenu>
                                        </div>
                                      </div>
                                      <div className='flex flex-col gap-6 mt-4'>
                                        <div className='flex flex-col'>
                                          <div className='flex flex-col gap-1 w-full'>
                                            <h3 className='text-sm font-semibold text-foreground mb-2'>{currentCard.bank}</h3>
                                            <Badge variant={'default'} className={`rounded-sm w-fit ${currentCategoryStyle(currentCard.type).text} ${currentCategoryStyle(currentCard.type).textBg} text-xs font-medium bg-opacity-20`}>{currentCard.type || 'none'}</Badge>
                                          </div>
                                          <div className='flex flex-row justify-between items-start mt-8'>
                                            <div className='flex flex-col gap-2'>
                                              <span className='text-xs text-muted-foreground font-normal tracking-wide'>Website</span>
                                              <span className='text-xs text-foreground font-normal tracking-wide'>{currentCard.cardHolder}</span>
                                            </div>
                                          </div>
                                        </div>
                                        <div className='flex flex-col gap-2'>
                                          <span className='text-xs text-muted-foreground font-normal tracking-wide'>Username</span>
                                          <span className='text-xs text-foreground font-normal tracking-wide'>{currentCard.cardNumber}</span>
                                        </div>
                                        <div className='flex flex-col'>
                                          <div className='flex flex-row justify-between items-center'>
                                            <div className='flex flex-col gap-2'>
                                              <span className='text-xs text-muted-foreground font-normal tracking-wide'>CVV</span>
                                              <span className='text-xs text-foreground font-normal tracking-wide flex flex-row gap-2'>
                                                {
                                                  isShowPassword ?
                                                    currentCard.cvv
                                                    :
                                                    [1, 2, 3, 4, 5, 6, 7, 8].map((data: any, i: number) => (
                                                      <span key={data + i} className='flex w-2 h-2 rounded-full bg-foreground'></span>
                                                    ))
                                                }
                                              </span>
                                            </div>
                                            <div className='flex flex-row gap-1'>
                                              <Button onClick={() => onClickCopyPass(currentCard.cvv)} variant={'ghost'} size={'icon'} className='hover:bg-slate-700'>
                                                <FiCopy />
                                              </Button>
                                              <Button onClick={onClickShowPass} variant={'ghost'} size={'icon'} className='hover:bg-slate-700'>
                                                {
                                                  isShowPassword ?
                                                    <FiEye /> :
                                                    <FiEyeOff />
                                                }
                                              </Button>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </>
                                  }
                                </SheetContent>
                              </Sheet>
                            ))
                        }
                      </div>
                    </ScrollArea>
                  </div>
                </div>
              </div>
            </div>
            :
            <ResizablePanelGroup
              onLayout={onLayoutResizeable}
              direction="horizontal"
              className="min-h-[200px] rounded-lg border"
            >
              <ResizablePanel minSize={4} defaultSize={20} maxSize={25}>
                <DashboardSidebar active='cards' showJustIconSidebar={showJustIconSidebar} />
              </ResizablePanel>
              <ResizableHandle withHandle />
              <ResizablePanel defaultSize={75}>
                <div className="flex h-full items-center justify-center">
                  <div className='flex flex-col w-full p-4 '>
                    <div>
                      <DashboardHeader />
                      <div className='flex flex-col mb-4'>
                        <h3 className='text-2xl font-bold uppercase mt-8'>Your <span className='text-primary'>Cards</span></h3>
                        <p className='text-foreground font-thin text-sm'>{`Here's what's happening with your account today.`}</p>
                      </div>
                    </div>
                    <div className='flex flex-row ps-0 p-4 gap-4 overflow-hidden h-dvh'>
                      <div className='flex flex-col w-2/5 text-foreground bg-background-opacity'>
                        <ScrollArea>
                          <div className='flex flex-col gap-4 overflow-auto h-full'>
                            {
                              isLoading ?
                                [1, 2, 3, 4, 5].map((i) => (
                                  <CardItem.IsLoading key={i + 'loading'} />
                                )) :
                                data && data.map((pass: any, i: number) => (
                                  <CardItem.Main data={pass} index={i} key={pass + i} isActive={currentCard?.id && currentCard.id === pass.id} />
                                ))
                            }
                          </div>
                        </ScrollArea>
                      </div>
                      <div className='flex flex-col w-3/5'>
                        {
                          currentCard &&
                          <Card className='bg-secondary'>
                            <CardHeader>
                              <div className='flex flex-row justify-between items-start'>
                                <div className='flex flex-row items-center justify-start gap-4'>
                                  <div className={` p-2 rounded-lg ${currentCategoryStyle(currentCard.type).bg}`}>
                                    <div className='bg-muted flex font-bold justify-center items-center rounded-full p-4 aspect-square w-12 h-12'>
                                      {
                                        currentCard?.bank.charAt(0)
                                      }
                                    </div>
                                  </div>
                                  <div className='flex flex-col gap-1'>
                                    <h3 className='text-sm font-semibold text-foreground'>{currentCard.bank}</h3>
                                    <Badge variant={'default'} className={`rounded-sm w-fit ${currentCategoryStyle(currentCard.type).text} ${currentCategoryStyle(currentCard.type).textBg} text-xs font-medium bg-opacity-20`}>{currentCard.type || 'none'}</Badge>
                                  </div>
                                </div>
                                <div className='flex flex-row items-center'>
                                  <Button size={'icon'} variant={'ghost'}>
                                    <FiStar />
                                  </Button>
                                  <Button size={'icon'} variant={'ghost'}>
                                    <FiEdit />
                                  </Button>
                                  <DropdownMenu>
                                    <DropdownMenuTrigger>
                                      <Button size={'icon'} variant={'ghost'}>
                                        <FiMenu />
                                      </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent>
                                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                      <DropdownMenuItem>
                                        <div className='flex flex-row items-center gap-2' onClick={() => onDeletePass(currentCard.id)}>
                                          <FiDelete />
                                          Delete
                                        </div>
                                      </DropdownMenuItem>
                                      <DropdownMenuItem>
                                        <div className='flex flex-row items-center gap-2'>
                                          <FiShare />
                                          Share
                                        </div>
                                      </DropdownMenuItem>
                                    </DropdownMenuContent>
                                  </DropdownMenu>
                                </div>
                              </div>
                            </CardHeader>
                            <CardContent className='mt-8'>
                              <div className='flex flex-col gap-6'>
                                <div className='flex flex-col'>
                                  <div className='flex flex-row justify-between items-start'>
                                    <div className='flex flex-col gap-2'>
                                      <span className='text-sm text-muted-foreground font-normal tracking-wide'>Card Holder</span>
                                      <span className='text-sm font-bold text-foreground tracking-wide'>{currentCard.cardHolder}</span>
                                    </div>
                                  </div>
                                </div>
                                <div className='flex flex-col gap-2'>
                                  <span className='text-sm text-muted-foreground font-normal tracking-wide'>Card Number</span>
                                  <span className='text-sm font-bold text-foreground tracking-wide'>{formatCreditCardNumber(currentCard.cardNumber)}</span>
                                </div>
                                <div className='flex flex-col'>
                                  <div className='flex flex-row justify-between items-center'>
                                    <div className='flex flex-col gap-2'>
                                      <span className='text-sm text-muted-foreground font-normal tracking-wide'>CVV</span>
                                      <span className='text-sm font-bold text-foreground tracking-wide flex flex-row gap-2'>
                                        {
                                          isShowPassword ?
                                            currentCard.cvv
                                            :
                                            [1, 2, 3].map((data: any, i: number) => (
                                              <span key={data + i} className='flex w-2 h-2 rounded-full bg-foreground'></span>
                                            ))
                                        }
                                      </span>
                                    </div>
                                    <div className='flex flex-row gap-1'>
                                      <Button onClick={() => onClickCopyPass(currentCard.cvv)} variant={'ghost'} size={'icon'} className='hover:bg-slate-700'>
                                        <FiCopy />
                                      </Button>
                                      <Button onClick={onClickShowPass} variant={'ghost'} size={'icon'} className='hover:bg-slate-700'>
                                        {
                                          isShowPassword ?
                                            <FiEye /> :
                                            <FiEyeOff />
                                        }
                                      </Button>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        }
                      </div>
                    </div>
                  </div>
                </div>
              </ResizablePanel>
            </ResizablePanelGroup>
        }

      </div>
    </div>
  )
}


export default CardPage