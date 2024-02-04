import React, { useEffect, useState } from 'react'
import { getSession, useSession } from 'next-auth/react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { useRouter } from 'next/router'
import { getServerSession } from 'next-auth'
import { authOptions } from '../api/auth/[...nextauth]'
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

type Props = {}

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const session = await getSession({ req });
  if (!session) {
    res.statusCode = 403;
    return { props: { drafts: [] } };
  }

  const data = await prisma.createPassWords.findMany({
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

  return {
    props: {
      data: [...data],
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

  const data = props?.data

  useEffect(() => {
    if (data && data.length) {
      setCurrentPass(data[0])
    }
  }, [data])

  const onClickShowPass = () => {
    setShowPassword(prev => !prev)
  }

  const onClickCopyPass = () => {
    navigator.clipboard.writeText(data[0].password)
    toast({
      description: 'Password copied to clipboard',
    })
  }

  const onDeletePass = (id: string) => {
    console.log('clicked')
    const res = fetch('/api/createpass/delete', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id }),
    })

    console.log(res)
  }

  const onClickPassList = (index: number) => {
    setCurrentPass(data[index])
  }

  useEffect(() => {
    if (!session) {
      router.push('/')
    }
  }, [session, router])

  if (status === 'loading') {
    return <div>Loading...</div>
  }

  if (session) {
    return (
      <RootLayout themeMode='dark'>
        <div className='dark container-fluid m-auto bg-background overflow-hidden h-dvh'>
          <div className='flex flex-row justify-between'>
            <DashboardSidebar />
            <div className='flex flex-col w-full p-4 '>
              <div>
                <DashboardHeader />
              </div>
              <div className='flex flex-row ps-0 p-4 mt-8 gap-4 overflow-hidden h-dvh'>
                <div className='flex flex-col w-2/5 text-foreground'>
                  <h3 className='font-bold text-lg p-4'>Logins</h3>
                  <div className='flex flex-col gap-4 mt-4 overflow-auto h-full'>
                    {
                      data && data.length && data.map((pass, i) => (
                        <div key={i} className={`flex flex-row items-center gap-4 p-4 rounded-lg hover:bg-secondary cursor-pointer ${currentPass && currentPass.id === pass.id && 'bg-primary'}`} onClick={() => onClickPassList(i)}>
                          <div className='flex flex-col'>
                            <Avatar>
                              <AvatarImage src={pass?.image} />
                              <AvatarFallback className=' font-bold uppercase'>{pass.title.charAt(0)}</AvatarFallback>
                            </Avatar>
                          </div>
                          <div className='flex flex-col'>
                            <h3 className='text-sm font-semibold text-foreground'>{pass.title}</h3>
                            <div>
                              <span className='text-xs text-muted-foreground'>{pass.username}</span>
                            </div>
                          </div>
                        </div>
                      ))
                    }
                  </div>
                </div>
                <div className='flex flex-col w-3/5'>
                  {
                    currentPass &&
                    <Card className='bg-secondary'>
                      <CardHeader>
                        <div className='flex flex-row justify-between items-start'>
                          <div className='flex flex-row items-center justify-start gap-4'>
                            <div className={` p-2 rounded-lg ${currentCategoryStyle(currentPass.category).bg}`}>
                              <Avatar>
                                <AvatarImage src={currentPass.image} />
                                <AvatarFallback>{currentPass.username.charAt(0)}</AvatarFallback>
                              </Avatar>
                            </div>
                            <div className='flex flex-col gap-1'>
                              <h3 className='text-sm font-semibold text-foreground'>{currentPass.title}</h3>
                              <Badge variant={'default'} className={`rounded-sm ${currentCategoryStyle(currentPass.category).text} ${currentCategoryStyle(currentPass.category).textBg} text-xs font-medium bg-opacity-20`}>{currentPass.category || 'none'}</Badge>
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
                            {/* <Button variant={'ghost'}>
                              <FiMenu />
                            </Button> */}
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent className='mt-8'>
                        <div className='flex flex-col gap-6'>
                          <div className='flex flex-col'>
                            <div className='flex flex-row justify-between items-start'>
                              <div className='flex flex-col gap-2'>
                                <span className='text-xs text-muted-foreground font-normal tracking-wide'>Website</span>
                                <span className='text-xs text-foreground font-normal tracking-wide'>{currentPass.url}</span>
                              </div>
                              <Link href={currentPass.url} passHref={true} target='_blank'>
                                <FiExternalLink />
                              </Link>
                            </div>
                          </div>
                          <div className='flex flex-col gap-2'>
                            <span className='text-xs text-muted-foreground font-normal tracking-wide'>Username</span>
                            <span className='text-xs text-foreground font-normal tracking-wide'>{currentPass.username}</span>
                          </div>
                          <div className='flex flex-col'>
                            <div className='flex flex-row justify-between items-center'>
                              <div className='flex flex-col gap-2'>
                                <span className='text-xs text-muted-foreground font-normal tracking-wide'>Password</span>
                                <span className='text-xs text-foreground font-normal tracking-wide flex flex-row gap-2'>
                                  {
                                    isShowPassword ?
                                      data[0].password
                                      :
                                      data[0].password.split('').map((_, i) => (
                                        <span key={i} className='flex w-2 h-2 rounded-full bg-foreground'></span>
                                      ))
                                  }
                                </span>
                              </div>
                              <div className='flex flex-row gap-1'>
                                <Button onClick={onClickCopyPass} variant={'ghost'} size={'icon'} className='hover:bg-slate-700'>
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
        </div>
      </RootLayout>
    )
  }

  return <></>
}


export default Dashboard