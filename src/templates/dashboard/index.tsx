import { Card, CardContent } from '@/components/ui/card'
import { ScrollArea } from '@/components/ui/scroll-area'
import React from 'react'
import { FiFile } from '@react-icons/all-files/fi/FiFile'
import { FiBox } from '@react-icons/all-files/fi/FiBox'
import { FiStar } from '@react-icons/all-files/fi/FiStar'
import { FiMonitor } from '@react-icons/all-files/fi/FiMonitor'
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@/components/ui/resizable'
import { Line, ResponsiveContainer, Tooltip, LineChart } from 'recharts'
import { Button } from '@/components/ui/button'
import { RecentRecords } from '@/components/RecentRecords'
import { useSession } from 'next-auth/react'
type Props = {}

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

export default function DashboardTemplate({ }: Props) {
  const { data:session } = useSession()

  return (
    <ScrollArea className='h-dvh pb-4'>
      <div className='flex flex-col ps-0 p-4 mb-10 mt-4 gap-4 h-full'>
        {
          session?.user &&
          <div className='mb-4'>
            <h2 className='text-2xl font-bold uppercase'>Welcome <span className='text-primary'>{session.user.name}</span></h2>
            <p className='text-foreground font-thin text-sm'>{`Here's what's happening with your account today.`}</p>
          </div>
        }
        {/* <h3 className='font-bold text-base uppercase'>Dashboard</h3> */}
        <div className='grid grid-cols-2 lg:grid-cols-4 gap-4'>
          <Card className='px-6 py-6 text-foreground bg-opacity-90 bg-muted'>
            <CardContent className='p-0'>
              <div className='flex flex-row items-center gap-4'>
                <div className=' bg-primary flex justify-center items-center p-4 rounded-full'>
                  <FiFile size={24} />
                </div>
                <div>
                  <h3 className='text-2xl font-bold mb-1'>16</h3>
                  <p className='text-sm text-foreground'>Categories</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className='px-6 py-6  text-foreground bg-opacity-90 bg-muted'>
            <CardContent className='p-0'>
              <div className='flex flex-row items-center gap-4'>
                <div className='bg-primary flex justify-center items-center p-4 rounded-full'>
                  <FiBox size={24} />
                </div>
                <div>
                  <h3 className='text-2xl font-bold mb-1'>16</h3>
                  <p className='text-sm text-foreground'>Types</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className='px-6 py-6  text-foreground bg-opacity-90 bg-muted'>
            <CardContent className='p-0'>
              <div className='flex flex-row items-center gap-4'>
                <div className='bg-primary flex justify-center items-center p-4 rounded-full'>
                  <FiMonitor size={24} />
                </div>
                <div>
                  <h3 className='text-2xl font-bold mb-1'>16</h3>
                  <p className='text-sm text-foreground'>Notes</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className='px-6 py-6  text-foreground bg-opacity-90 bg-muted'>
            <CardContent className='p-0'>
              <div className='flex flex-row items-center gap-4'>
                <div className='bg-primary flex justify-center items-center p-4 rounded-full'>
                  <FiStar size={24} />
                </div>
                <div>
                  <h3 className='text-2xl font-bold mb-1'>16</h3>
                  <p className='text-sm text-foreground'>Favorites</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        <Card className='bg-background'>
          <ResizablePanelGroup className="min-h-[350px] rounded-lg border" direction="horizontal">
            <ResizablePanel defaultSize={65}>
              <div className="flex flex-col h-full py-4">
                <h2 className='ms-4 mb-4 uppercase font-bold'>Record Stats</h2>
                {/* <span className="font-semibold">Two</span> */}
                <ResponsiveContainer style={{ padding: 0 }} width="100%" height="100%" className={'p-0'}>
                  <LineChart
                    width={500}
                    height={300}
                    data={dataChart}
                    margin={{
                      top: 5,
                      right: 30,
                      left: 10,
                      bottom: 5,
                    }}
                  >
                    <Tooltip itemStyle={{ color: 'white' }} wrapperStyle={{ backgroundColor: 'black', border: 1, borderRadius: 8 }} contentStyle={{ backgroundColor: 'black', border: 1, borderColor: '' }} />
                    <Line type="monotone" dataKey="pv" stroke={'#6d28d9'} activeDot={{ r: 8 }} />
                    <Line type="monotone" dataKey="uv" stroke="#6d28d9" strokeOpacity={0.5} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </ResizablePanel>
            <ResizableHandle withHandle />
            <ResizablePanel defaultSize={35}>
              <div className="flex h-full items-center justify-center p-6">
                <span className="font-semibold uppercase bold">Recent Activity</span>
              </div>
            </ResizablePanel>
          </ResizablePanelGroup>
        </Card>
        <Card className='p-4 bg-background shadow-sm'>
          <div className='flex flex-row justify-between items-center'>
            <h3 className='uppercase font-bold'>RECENT ENTRIES</h3>
            <Button size={'sm'} variant={'outline'}>Add New</Button>
          </div>
          <div>
            <RecentRecords />
          </div>
        </Card>
      </div>
    </ScrollArea>
  )
}