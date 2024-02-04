import React from 'react'
import { Card } from '@/components/ui/card'
import { FiCreditCard } from '@react-icons/all-files/fi/FiCreditCard'
import { FiClipboard } from '@react-icons/all-files/fi/FiClipboard'
import { FiHeart } from '@react-icons/all-files/fi/FiHeart'
import { FiKey } from '@react-icons/all-files/fi/FiKey'
import Link from 'next/link'

type Props = {}

export default function DashboardSidebar({}: Props) {
  return (
    <div className='flex flex-col w-auto md:min-w-80 h-full min-h-dvh p-4 bg-secondary'>
              <h2 className='font-bold text-lg text-foreground p-2'>
                <Link className='uppercase tracking-wider' href='/dashboard'>SafePass</Link>
              </h2>
              <div className='mt-8'>
                <Card className='p-0 bg-transparent'>
                  <ul className='flex flex-col justify-start'>
                    <li className='flex flex-row items-center gap-2 px-3 py-3 rounded-md hover:bg-primary hover:text-foreground'>
                      <FiKey/>
                      <span className=' font-light text-sm'>Logins</span>
                    </li>
                    <li className='flex flex-row items-center gap-2 px-3 py-3 rounded-md hover:bg-primary hover:text-foreground'>
                      <FiCreditCard/>
                      <span className=' font-light text-sm'>Credit/Debit Cards</span>
                    </li>
                    <li className='flex flex-row items-center gap-2 px-3 py-3 rounded-md hover:bg-primary hover:text-foreground'>
                      <FiClipboard/>
                      <span className=' font-light text-sm'>Notes</span>
                    </li>
                    <li className='flex flex-row items-center gap-2 px-3 py-3 rounded-md hover:bg-primary hover:text-foreground'>
                      <FiHeart/>
                      <span className=' font-light text-sm'>Favorites</span>
                    </li>
                  </ul>
                </Card>
                <Card className='p-0 mt-4 bg-transparent'>
                  <h3 className=' font-semibold text-base p-2'>Categories</h3>
                  <ul className='flex flex-col justify-start'>
                    <li className='p-3 flex flex-row justify-start items-center gap-2 hover:bg-primary hover:text-foreground rounded-md'>
                      <span className='flex w-2 h-2 rounded-full bg-red-400'></span>
                      <span className=' font-light text-sm text-foreground'>Personal</span>
                    </li>
                    <li className='p-3 flex flex-row justify-start items-center gap-2 hover:bg-primary hover:text-foreground rounded-md'>
                      <span className='flex w-2 h-2 rounded-full bg-green-400'></span>
                      <span className=' font-light text-sm text-foreground'>Work</span>
                    </li>
                    <li className='p-3 flex flex-row justify-start items-center gap-2 hover:bg-primary hover:text-foreground rounded-md'>
                      <span className='flex w-2 h-2 rounded-full bg-yellow-400'></span>
                      <span className=' font-light text-sm text-foreground'>Finance</span>
                    </li>
                    <li className='p-3 flex flex-row justify-start items-center gap-2 hover:bg-primary hover:text-foreground rounded-md'>
                      <span className='flex w-2 h-2 rounded-full bg-blue-400'></span>
                      <span className=' font-light text-sm text-foreground'>Health</span>
                    </li>
                  </ul>
                </Card>
              </div>
            </div>
  )
}