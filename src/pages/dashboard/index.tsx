import React, { useContext, useEffect, useState } from 'react'
import { getSession, useSession } from 'next-auth/react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Card, CardContent, CardTitle } from '@/components/ui/card'
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
import { FiFile } from '@react-icons/all-files/fi/FiFile'
import { LineChart, Line, Tooltip, ResponsiveContainer } from 'recharts'
import { RecentRecords } from '@/components/RecentRecords'
import { ScrollArea } from '@/components/ui/scroll-area'
import DashboardTemplate from '@/templates/dashboard'
import Image from 'next/image'

type Props = {
  data: any
}

const dataChart = [
  {
    name: 'Page A',
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: 'Page B',
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: 'Page C',
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: 'Page D',
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: 'Page E',
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: 'Page F',
    uv: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: 'Page G',
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
];

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
  const encrypter = new Encrypter(session?.user?.name || 'your_secret_key')
  const encryptedData = data.map((pass: any) => {
    return ({
      ...pass,
      password: encrypter.decrypt(pass.password)
    })
  })

  return {
    props: {
      data: [...encryptedData],
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
              <div className="flex h-full w-full items-center justify-center">
                <div className='flex flex-col w-full p-4 '>
                  <div>
                    <DashboardHeader />
                  </div>
                  <DashboardTemplate />
                </div>
              </div>
              :
              <ResizablePanelGroup
                onLayout={onLayoutResizeable}

                direction="horizontal"
                className="min-h-[200px] border"
              >
                <ResizablePanel minSize={4} defaultSize={20} maxSize={25}>
                  <DashboardSidebar active='dashboard' showJustIconSidebar={showJustIconSidebar} />
                </ResizablePanel>
                <ResizableHandle withHandle />
                <ResizablePanel defaultSize={75}>
                  <div className="flex h-full items-center justify-center pb-8">
                    <div className='flex flex-col w-full'>
                      <div className='p-4 pb-0'>
                        <DashboardHeader />
                      </div>
                      <div className='p-4 pt-0'>
                        <DashboardTemplate />
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