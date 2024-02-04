import React from 'react'
import { Input } from '@/components/ui/input'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { FaQuestion } from '@react-icons/all-files/fa/FaQuestion'
import { FaBell } from '@react-icons/all-files/fa/FaBell'
import { FaPen } from '@react-icons/all-files/fa/FaPen'
import { signOut, useSession } from 'next-auth/react'
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuItem } from '@/components/ui/dropdown-menu'
import { useRouter } from 'next/router'
import Link from 'next/link'

type Props = {}

export default function DashboardHeader({ }: Props) {
  const { data:session } = useSession()
  const router = useRouter()

  const onLogout = () => {
    signOut()
    router.push('/')
    try{
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <nav className='flex flex-row justify-between items-center px-4'>
      <div className='w-1/2'>
        <Input type='text' placeholder='Search' />
      </div>
      <ul className='flex flex-row items-center gap-2'>
        <li className='p-2 border-foreground rounded-full'>
          <Link href='/dashboard/create'>
            <FaPen className='text-foreground' />
          </Link>
        </li>
        <li className='p-2 border-foreground rounded-full'>
          <FaBell className='text-foreground' />
        </li>
        <li className='p-2 border-foreground rounded-full'>
          <FaQuestion className='text-foreground' />
        </li>
        <li className='flex'>
          {
            session?.user?.image &&
            <DropdownMenu>
              <DropdownMenuTrigger>
                <Avatar>
                  <AvatarImage src={session?.user?.image} />
                  <AvatarFallback>{session?.user.name?.charAt(0)}</AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Profile</DropdownMenuItem>
                <DropdownMenuItem>Billing</DropdownMenuItem>
                <DropdownMenuItem>Team</DropdownMenuItem>
                <DropdownMenuItem>Subscription</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={onLogout}>

                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          }
        </li>
      </ul>
    </nav>
  )
}