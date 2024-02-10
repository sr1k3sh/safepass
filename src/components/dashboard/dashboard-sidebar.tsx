import React from 'react'
import { FiCreditCard } from '@react-icons/all-files/fi/FiCreditCard'
import { FiClipboard } from '@react-icons/all-files/fi/FiClipboard'
import { FiHeart } from '@react-icons/all-files/fi/FiHeart'
import { FiKey } from '@react-icons/all-files/fi/FiKey'
import { FiCommand } from '@react-icons/all-files/fi/FiCommand'
import Link from 'next/link'

type Props = {
  showJustIconSidebar?: boolean
  active?: 'dashboard' | 'logins' | 'cards' | 'notes' | 'favorites'
}

const activeStyle = 'bg-primary text-foreground'

const sidebarItems = [
  {
    name: 'Dashboard',
    icon: <FiCommand size={16}/>,
    href: '/dashboard',
  },
  {
    name: 'Logins',
    icon: <FiKey size={16} />,
    href: '/dashboard/logins',
  },
  {
    name: 'Cards',
    icon: <FiCreditCard size={16} />,
    href: '/dashboard/cards',
  },
  {
    name: 'Notes',
    icon: <FiClipboard size={16} />,
    href: '/notes',
  },
  {
    name: 'Favorites',
    icon: <FiHeart size={16} />,
    href: '/favorites',
  },
]

export default function DashboardSidebar({ showJustIconSidebar = false, active }: Props) {
  return (
    <div className={`flex flex-col w-auto h-full bg-accent min-h-dvh p-4 ${showJustIconSidebar ? 'items-center' : 'items-start'}`}>
      <h2 className='font-bold text-lg text-foreground p-2'>
        <Link className='uppercase tracking-wider' href='/'>
          {
            showJustIconSidebar ? 'SP' : 'SafePass'
          }
        </Link>
      </h2>
      <div className={`mt-8 ${!showJustIconSidebar && 'w-full'} `}>
        <div className='flex flex-col justify-start gap-2'>
          {
            sidebarItems.map((item, index) => (
              <Link href={item.href} key={index} className={`flex flex-row items-center w-full gap-2 px-3 py-3 rounded-md hover:bg-primary hover:text-foreground ${active === item.name.toLowerCase() ? activeStyle : ''}`}>
                <span className='w-4'>
                  {item.icon}
                </span>
                {
                  showJustIconSidebar ? null : <span className='tracking-wide font-semibold text-base'>{item.name}</span>
                }
              </Link>
            ))
          }
        </div>
        <h3 className='mt-4 font-semibold text-base p-2'>{
          showJustIconSidebar ? 'Cat' : 'Categories'
        }</h3>
        <ul className={`flex flex-col justify-start ${showJustIconSidebar ? 'gap-4 mt-4' : 'gap-0'}`}>
          <li className={`flex flex-row ${showJustIconSidebar ? 'justify-center gap-0 p-0' : 'p-3 justify-start'} items-center gap-2 hover:bg-primary hover:text-foreground rounded-md`}>
            <span className={`flex ${showJustIconSidebar ? 'w-8 h-8 rounded-sm flex justify-center items-center font-bold font-xs text-muted' : 'w-2 h-2 rounded-full'} bg-red-400`}>{showJustIconSidebar && 'S'}</span>
            {
              showJustIconSidebar ? null : <span className=' font-semibold text-base text-foreground'>Social</span>
            }
          </li>
          <li className={`flex flex-row ${showJustIconSidebar ? 'justify-center gap-0 p-0' : 'p-3 justify-start'} items-center gap-2 hover:bg-primary hover:text-foreground rounded-md`}>
            <span className={`flex ${showJustIconSidebar ? 'w-8 h-8 rounded-sm flex justify-center items-center font-bold font-xs text-muted' : 'w-2 h-2 rounded-full'} bg-green-400`}>{showJustIconSidebar && 'W'}</span>
            {
              showJustIconSidebar ? null : <span className=' font-semibold text-base text-foreground'>Work</span>
            }
          </li>
          <li className={`flex flex-row ${showJustIconSidebar ? 'justify-center gap-0 p-0' : 'p-3 justify-start'} items-center gap-2 hover:bg-primary hover:text-foreground rounded-md`}>
            <span className={`flex ${showJustIconSidebar ? 'w-8 h-8 rounded-sm flex justify-center items-center font-bold font-xs text-muted' : 'w-2 h-2 rounded-full'} bg-yellow-400`}>{showJustIconSidebar && 'F'}</span>
            {
              showJustIconSidebar ? null : <span className=' font-semibold text-base text-foreground'>Finance</span>
            }
          </li>
          <li className={`flex flex-row ${showJustIconSidebar ? 'justify-center gap-0 p-0' : 'p-3 justify-start'} items-center gap-2 hover:bg-primary hover:text-foreground rounded-md`}>
            <span className={`flex ${showJustIconSidebar ? 'w-8 h-8 rounded-sm flex justify-center items-center font-bold font-xs text-muted' : 'w-2 h-2 rounded-full'} bg-blue-400`}>{showJustIconSidebar && 'H'}</span>
            {
              showJustIconSidebar ? null : <span className=' font-semibold text-base text-foreground'>Health</span>
            }
          </li>
        </ul>
      </div>
    </div>
  )
}