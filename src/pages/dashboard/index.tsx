import React, { useContext, useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import DashboardHeader from '@/components/dashboard/dashboard-header'
import DashboardSidebar from '@/components/dashboard/dashboard-sidebar'
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@/components/ui/resizable'
import { AppProvider } from '@/pages/layout'
import DashboardTemplate from '@/templates/dashboard'

type Props = {
  data: any
}

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
  const [showJustIconSidebar, setShowJustIconSidebar] = useState<boolean>(false)
  const router = useRouter()
  const { isMobile } = useContext(AppProvider)

  useEffect(() => {
    if(!session) {
      router.push('/login')
    }
  },[session])

  const onLayoutResizeable = (layout: any) => {
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