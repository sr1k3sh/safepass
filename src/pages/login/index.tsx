import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect } from 'react'
import RootLayout from '../layout'
import { Card } from '@/components/ui/card'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Button } from '@/components/ui/button'

import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Input } from '@/components/ui/input'
import { signIn, useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { Cormorant, Cormorant_Garamond, Cormorant_SC } from 'next/font/google'

const font = Cormorant_SC({ subsets: ['latin'], weight: ['300','400','500','600','700']})

type Props = {}

export default function Login({ }: Props) {

  const { data: session } = useSession()
  const router = useRouter()

  const formSchema = z.object({
    email: z.string().email(),
    password: z.string().min(8),
  })

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    // const body = { title, content };
    console.log(values)
    const body = {
      email: values.email,
      password: values.password,
    }
    await fetch('/api/createpass', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
  }

  useEffect(() => {
    if(session && session.user) {
      router.push('/')
    }
  },[session, router])

  return (
    <RootLayout className='dark' themeMode='light'>
      <Image className='z-0' src={'/login.png'} alt='login' objectFit='cover' fill />
      <section className='container m-auto flex flex-row justify-center items-center h-dvh p-8 relative z-10'>
        <Card className='flex flex-row justify-center overflow-hidden w-full bg-transparent'>
          <div className='flex w-1/2 backdrop-blur-lg'>
            <div className='flex flex-col relative h-full w-full'>
              <div className='relative z-10 flex flex-col justify-between p-8 max-w-96 h-full'>
                <div>
                  <h1 className='hidden'>SafePass</h1>
                  <h2 className='text-lg font-thin uppercase text-white'>A wise quote</h2>
                </div>
                <div className=''>
                  <h3 className={`text-6xl font-normal tracking-wide leading-none mt-32 mb-4 uppercase text-white ${font.className}`}>Remember your informations</h3>
                  <p className='font-thin text-sm text-white'>SafePass is a password manager that allows you to store your passwords in a safe place. It is a free and open-source software.</p>
                </div>
              </div>
            </div>
          </div>
          <div className='flex flex-col w-1/2 p-8 px-16 items-center justify-between bg-background'>
            <h2 className={`text-2xl tracking-wider uppercase`}>SafePass</h2>
            <div className='flex flex-col items-center w-full max-w-96 mt-16'>
              <h3 className={`text-4xl mb-1 ${font.className}`}>Welcome Back</h3>
              <p className='flex text-xs text-center mb-8'>Enter your email and password to access your account</p>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className='flex flex-col w-full gap-4'>
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email address</FormLabel>
                        <FormControl>
                          <Input placeholder="username@example.com" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Password</FormLabel>
                        <FormControl>
                          <Input placeholder="*******" type='password' {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button className='mt-4' type="submit">Submit</Button>
                </form>
              </Form>
              <Button className='mt-2 text-sm font-semibold' variant={'link'} onClick={() => signIn('google')}>Sign in With Google</Button>

            </div>
            <div className='mt-32 flex flex-row items-center text-center'>
              <p className='text-xs'>{`Don't have an account?`}</p>
              <Link className='text-xs font-bold ms-2' href="/register">Register</Link>
            </div>
          </div>
        </Card>
      </section>
    </RootLayout>
  )
}