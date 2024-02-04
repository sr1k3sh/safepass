import React from 'react';
import Link from 'next/link';
import { signOut, useSession } from 'next-auth/react';
import Image from 'next/image';

const Header: React.FC = () => {

  const { data: session, status } = useSession();

  if(status === 'loading') {
    return <div>Loading...</div>
  }

  if(!session) {
    return <></>
  }

  return (
    <nav className='container m-auto px-4 py-8'>
      <div className='flex flex-row justify-between items-center'>
        <ul className='flex flex-row gap-4'>
          <li>
            <Link href={'/'}>Home</Link>
          </li>
          <li>
            <Link href={'/feeds'}>Feeds</Link>
          </li>
          <li>
            <Link href={'/create'}>Create Post</Link>
          </li>
          {
            session?.user &&
            <>
              <li>
                <Link href={'/draft'}>Drafts</Link>
              </li>
              <li>
                <Link href={'/dashboard'}>Dashboard</Link>
              </li>
            </>
          }
        </ul>
        <ul className='flex flex-row justify-end items-center gap-4'>
          {
            session?.user ?
              <>
                <li className='flex flex-row items-center gap-2'>
                  <span className='text-sm'>
                    Welcome {session?.user?.name}
                  </span>
                  {
                    session?.user?.image ?
                      <Image className='aspect-square w-12 h-12 rounded-full' src={session?.user?.image} alt={session?.user?.name} width={50} height={50} />
                      :
                      <span className='flex justify-center items-center aspect-square w-12 h-12 rounded-full bg-slate-400'>{session?.user.name?.charAt(0)}</span>
                  }
                </li>
                <li>
                  <button onClick={() => signOut()}>Logout</button>
                </li>
              </>
              :
              <li>
                <Link href={'/api/auth/signin'}>Login</Link>
              </li>
          }
        </ul>
      </div>
    </nav>
  );
};

export default Header;