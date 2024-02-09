import React, { useContext, useEffect, useState } from 'react'
import { getSession, useSession } from 'next-auth/react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { useRouter } from 'next/router'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/pages/api/auth/[...nextauth]'
import DashboardHeader from '@/components/dashboard/dashboard-header'
import DashboardSidebar from '@/components/dashboard/dashboard-sidebar'
import prisma from '@/lib/prisma'
import { GetServerSideProps } from 'next'
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
import { FiExternalLink } from '@react-icons/all-files/fi/FiExternalLink'
import { DropdownMenuContent, DropdownMenu, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import Link from 'next/link'
import RootLayout from '@/pages/layout'
import { Encrypter } from '@/lib/crypto'
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@/components/ui/resizable'
import { AppProvider } from '@/pages/layout'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { ScrollArea } from '@/components/ui/scroll-area'
import Image from 'next/image'

type Props = {
  data: any
}

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const session = await getSession({ req });
  if (!session) {
    res.statusCode = 403;
    return { props: { drafts: [] } };
  }

  const data = await prisma.cards.findMany({
    where: {
      author: { email: session.user.email },
    },
    include: {
      author: {
        select: { name: true },
      },
    },
  });

  // console.log(drafts)
  const encrypter = new Encrypter(session?.user?.name || 'your_secret_key')
  const encryptedData = data.map((pass: any) => {
    return ({
      ...pass,
      cvv: encrypter.decrypt(pass.cvv),
      cardNumber: encrypter.decrypt(pass.cardNumber),
    })
  })

  console.log(encryptedData)
  return {
    props: {
      data: JSON.parse(JSON.stringify(encryptedData)),
      session: await getServerSession(
        req,
        res,
        authOptions
      ),
    },
  };
};

export const currentCategoryStyle = (cat: string) => {
  switch (cat) {
    case 'personal':
      return {
        bg: 'bg-red-400',
        text: 'text-red-200',
        textBg: 'bg-red-700'
      }
    case 'work':
      return {
        bg: 'bg-green-400',
        text: 'text-green-200',
        textBg: 'bg-green-700'
      }
    case 'finance':
      return {
        bg: 'bg-yellow-400',
        text: 'text-yellow-200',
        textBg: 'bg-yellow-700'
      }
    case 'health':
      return {
        bg: 'bg-blue-400',
        text: 'text-blue-200',
        textBg: 'bg-blue-700'
      }
    case 'other':
      return {
        bg: 'bg-blue-400',
        text: 'text-blue-200',
        textBg: 'bg-blue-700'
      }
    default:
      return {
        bg: 'bg-gray-400',
        text: 'text-gray-200',
        textBg: 'bg-gray-700'
      }
  }
}

const Dashboard: React.FC<Props> = (props) => {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [isShowPassword, setShowPassword] = useState<boolean>(false)
  const [currentPass, setCurrentPass] = useState<any | null>(null)
  const [showJustIconSidebar, setShowJustIconSidebar] = useState<boolean>(false)
  const { isMobile } = useContext(AppProvider)

  const data = props?.data

  useEffect(() => {
    if (data && data.length) {
      if (isMobile) {
        setCurrentPass(null)
      } else {
        setCurrentPass(data[0])
      }
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

  const onClickPassList = (index: number) => {
    setCurrentPass(data[index])
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

  useEffect(() => {
    if (!session) {
      router.push('/login')
    }
  }, [session, router])

  const onLayoutResizeable = (layout: any) => {
    // console.log(layout)
    if (layout[0] < 10) {
      setShowJustIconSidebar(true)
    } else {
      setShowJustIconSidebar(false)
    }
  }

  if (status === 'loading') {
    return <div>Loading...</div>
  }

  if (session) {
    return (
      <div className='container-fluid m-auto bg-background overflow-hidden h-dvh'>
        {/* <Image src='/login.png' alt='background' fill /> */}
        <div className='flex flex-row justify-between relative z-10'>
          {
            isMobile ?
            null
              // <div className="flex h-full w-full items-center justify-center">
              //   <div className='flex flex-col w-full p-4 '>
              //     <div>
              //       <DashboardHeader />
              //     </div>
              //     <div className='flex flex-col ps-0 md:p-4 mt-8 gap-4 overflow-hidden h-dvh'>
              //       <h3 className='font-bold text-lg '>Cards</h3>
              //       <div className='flex flex-col w-full text-foreground'>
              //         <ScrollArea className='grid grid-cols-1 gap-2 p-2 overflow-auto h-full'>
              //           {
              //             data && data.length && data.map((pass: any, i: number) => (
              //               <div key={pass + i} className='w-full mb-2 last:mb-0'>
              //                 <Sheet>
              //                   <SheetTrigger className='w-full'>
              //                     <div key={i} className={`flex flex-row w-full items-center gap-4 p-4 rounded-lg bg-secondary cursor-pointer ${currentPass && currentPass.id === pass.id && 'bg-primary'}`} onClick={() => onClickPassList(i)}>
              //                       <div className='flex flex-col'>
              //                         <Avatar>
              //                           <AvatarImage src={pass?.image} />
              //                           <AvatarFallback className=' font-bold uppercase'>{pass.title.charAt(0)}</AvatarFallback>
              //                         </Avatar>
              //                       </div>
              //                       <div className='flex flex-col'>
              //                         <h3 className='text-sm font-semibold text-foreground'>{pass.title}</h3>
              //                         <span className='text-xs text-muted-foreground text-left'>{pass.username}</span>
              //                       </div>
              //                     </div>
              //                   </SheetTrigger>
              //                   <SheetContent>
              //                     {
              //                       currentPass &&
              //                       <>
              //                         <div className='flex flex-row justify-between items-start mt-4'>
              //                           <div className='flex flex-col items-start justify-start gap-4'>
              //                             <div className={`p-2 rounded-lg ${currentCategoryStyle(currentPass.category).bg}`}>
              //                               <Avatar>
              //                                 <AvatarImage src={currentPass.image} />
              //                                 <AvatarFallback>{currentPass.username.charAt(0)}</AvatarFallback>
              //                               </Avatar>
              //                             </div>
              //                           </div>
              //                           <div className='flex flex-row items-center'>
              //                             <Button size={'icon'} variant={'ghost'}>
              //                               <FiStar />
              //                             </Button>
              //                             <Button size={'icon'} variant={'ghost'}>
              //                               <FiEdit />
              //                             </Button>
              //                             <DropdownMenu>
              //                               <DropdownMenuTrigger>
              //                                 <Button size={'icon'} variant={'ghost'}>
              //                                   <FiMenu />
              //                                 </Button>
              //                               </DropdownMenuTrigger>
              //                               <DropdownMenuContent>
              //                                 <DropdownMenuLabel>Actions</DropdownMenuLabel>
              //                                 <DropdownMenuItem>
              //                                   <div className='flex flex-row items-center gap-2' onClick={() => onDeletePass(currentPass.id)}>
              //                                     <FiDelete />
              //                                     Delete
              //                                   </div>
              //                                 </DropdownMenuItem>
              //                                 <DropdownMenuItem>
              //                                   <div className='flex flex-row items-center gap-2'>
              //                                     <FiShare />
              //                                     Share
              //                                   </div>
              //                                 </DropdownMenuItem>
              //                               </DropdownMenuContent>
              //                             </DropdownMenu>
              //                           </div>
              //                         </div>
              //                         <div className='flex flex-col gap-6 mt-4'>
              //                           <div className='flex flex-col'>
              //                             <div className='flex flex-col gap-1 w-full'>
              //                               <h3 className='text-sm font-semibold text-foreground mb-2'>{currentPass.title}</h3>
              //                               <Badge variant={'default'} className={`rounded-sm w-fit ${currentCategoryStyle(currentPass.category).text} ${currentCategoryStyle(currentPass.category).textBg} text-xs font-medium bg-opacity-20`}>{currentPass.category || 'none'}</Badge>
              //                             </div>
              //                             <div className='flex flex-row justify-between items-start mt-8'>
              //                               <div className='flex flex-col gap-2'>
              //                                 <span className='text-xs text-muted-foreground font-normal tracking-wide'>Website</span>
              //                                 <span className='text-xs text-foreground font-normal tracking-wide'>{currentPass.url}</span>
              //                               </div>
              //                               <Link href={currentPass.url} passHref={true} target='_blank'>
              //                                 <FiExternalLink />
              //                               </Link>
              //                             </div>
              //                           </div>
              //                           <div className='flex flex-col gap-2'>
              //                             <span className='text-xs text-muted-foreground font-normal tracking-wide'>Username</span>
              //                             <span className='text-xs text-foreground font-normal tracking-wide'>{currentPass.username}</span>
              //                           </div>
              //                           <div className='flex flex-col'>
              //                             <div className='flex flex-row justify-between items-center'>
              //                               <div className='flex flex-col gap-2'>
              //                                 <span className='text-xs text-muted-foreground font-normal tracking-wide'>Password</span>
              //                                 <span className='text-xs text-foreground font-normal tracking-wide flex flex-row gap-2'>
              //                                   {
              //                                     isShowPassword ?
              //                                       currentPass.password
              //                                       :
              //                                       [1, 2, 3, 4, 5, 6, 7, 8].map((data: any, i: number) => (
              //                                         <span key={data + i} className='flex w-2 h-2 rounded-full bg-foreground'></span>
              //                                       ))
              //                                   }
              //                                 </span>
              //                               </div>
              //                               <div className='flex flex-row gap-1'>
              //                                 <Button onClick={() => onClickCopyPass(currentPass.password)} variant={'ghost'} size={'icon'} className='hover:bg-slate-700'>
              //                                   <FiCopy />
              //                                 </Button>
              //                                 <Button onClick={onClickShowPass} variant={'ghost'} size={'icon'} className='hover:bg-slate-700'>
              //                                   {
              //                                     isShowPassword ?
              //                                       <FiEye /> :
              //                                       <FiEyeOff />
              //                                   }
              //                                 </Button>
              //                               </div>
              //                             </div>
              //                           </div>
              //                         </div>
              //                       </>
              //                     }
              //                   </SheetContent>
              //                 </Sheet>
              //               </div>
              //             ))
              //           }
              //         </ScrollArea>
              //       </div>
              //     </div>
              //   </div>
              // </div>
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
                        <h3 className='font-bold text-lg mt-8'>Cards</h3>
                      </div>
                      <div className='flex flex-row ps-0 p-4 gap-4 overflow-hidden h-dvh'>
                        <div className='flex flex-col w-2/5 text-foreground bg-background-opacity'>
                          <ScrollArea className='flex flex-col gap-4 overflow-auto h-full'>
                            {
                              data && data.length && data.map((pass: any, i: number) => (
                                <div key={i} className={`flex flex-row items-center gap-4 p-4 rounded-lg hover:bg-secondary cursor-pointer ${currentPass && currentPass.id === pass.id && 'bg-primary'}`} onClick={() => onClickPassList(i)}>
                                  <div className='flex flex-col'>
                                    <span className='font-bold uppercase'>
                                    {pass.type.charAt(0)}
                                    </span>

                                  </div>
                                  <div className='flex flex-col'>
                                    <h3 className='text-sm font-semibold text-foreground'>{pass.bank}</h3>
                                    <div>
                                      <span className='text-xs text-muted-foreground'>{pass.expiration}</span>
                                    </div>
                                  </div>
                                </div>
                              ))
                            }
                          </ScrollArea>
                        </div>
                        <div className='flex flex-col w-3/5'>
                          {
                            currentPass &&
                            <Card className='bg-secondary'>
                              <CardHeader>
                                <div className='flex flex-row justify-between items-start'>
                                  <div className='flex flex-row items-center justify-start gap-4'>
                                    <div className={` p-2 rounded-lg ${currentCategoryStyle(currentPass.type).bg}`}>
                                      {
                                        currentPass.type.charAt(0
                                      )}
                                    </div>
                                    <div className='flex flex-col gap-1'>
                                      <h3 className='text-sm font-semibold text-foreground'>{currentPass.cardHolder}</h3>
                                      {/* <Badge variant={'default'} className={`rounded-sm w-fit ${currentCategoryStyle(currentPass.category).text} ${currentCategoryStyle(currentPass.category).textBg} text-xs font-medium bg-opacity-20`}>{currentPass.category || 'none'}</Badge> */}
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
                                          <div className='flex flex-row items-center gap-2' onClick={() => onDeletePass(currentPass.id)}>
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
                                        <span className='text-xs text-muted-foreground font-normal tracking-wide'>Website</span>
                                        {/* <span className='text-xs text-foreground font-normal tracking-wide'>{currentPass.url}</span> */}
                                      </div>
                                      {/*  */}
                                    </div>
                                  </div>
                                  <div className='flex flex-col gap-2'>
                                    <span className='text-xs text-muted-foreground font-normal tracking-wide'>Username</span>
                                    {/* <span className='text-xs text-foreground font-normal tracking-wide'>{currentPass.username}</span> */}
                                  </div>
                                  <div className='flex flex-col'>
                                    <div className='flex flex-row justify-between items-center'>
                                      <div className='flex flex-col gap-2'>
                                        <span className='text-xs text-muted-foreground font-normal tracking-wide'>Password</span>
                                        <span className='text-xs text-foreground font-normal tracking-wide flex flex-row gap-2'>
                                          {
                                            isShowPassword ?
                                              currentPass.cardNumber
                                              :
                                              [1, 2, 3, 4, 5, 6, 7, 8].map((data: any, i: number) => (
                                                <span key={data + i} className='flex w-2 h-2 rounded-full bg-foreground'></span>
                                              ))
                                          }
                                        </span>
                                      </div>
                                      <div className='flex flex-row gap-1'>
                                        <Button onClick={() => onClickCopyPass(currentPass.cvv)} variant={'ghost'} size={'icon'} className='hover:bg-slate-700'>
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

  return <></>
}


export default Dashboard