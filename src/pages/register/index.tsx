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
import { Cormorant_SC } from 'next/font/google'
import { toast } from '@/components/ui/use-toast'

const font = Cormorant_SC({ subsets: ['latin'], weight: ['300', '400', '500', '600', '700'] })

type Props = {}

export default function Login({ }: Props) {

  const { data: session } = useSession()
  const router = useRouter()

  const formSchema = z.object({
    name: z.string().min(2).max(40),
    email: z.string().email(),
    password: z.string().min(8),
  })

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const body = {
      email: values.email,
      password: values.password,
    }
    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      if(res.ok) {
        toast({
          title: 'Account created',
          description: 'Your account has been created successfully!',
        })
        router.push('/login')
      } else {
        const err = await res.json()
        toast({
          title: 'Error creating account',
          description: err.error,
        })
      }
    } catch (error) {
      toast({
        title: 'Error creating account',
        description: 'An error occurred while creating your account. Please try again later.',
      })
    }

  }

  useEffect(() => {
    console.log(session)
    if (session && session.user) {
      router.push('/')
    }
  }, [session, router])

  return (
    <RootLayout themeMode='light'>
      <Image className='z-0 h-full' src={'/login.png'} alt='login' objectFit='cover' fill />
      <section className='container m-auto flex flex-row justify-center items-center md:h-dvh p-8 relative z-10'>
        <Card className='flex flex-col-reverse md:flex-row justify-center overflow-hidden w-full bg-transparent'>
          <div className='flex flex-col w-full md:w-1/2 p-4 md:p-8 px-8 md:px-16 items-center justify-between bg-background'>
            <h2 className={`text-2xl tracking-wider uppercase`}>
              <svg width="129" height="69" viewBox="0 0 129 69" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M56.44 61H47.72V60.68C48.1733 60.68 48.52 60.5733 48.76 60.36C49.0266 60.1467 49.24 59.7333 49.4 59.12C49.56 58.48 49.6533 57.6667 49.68 56.68C49.7333 55.6933 49.76 54.3333 49.76 52.6V41.4C49.76 39.1067 49.7066 37.4133 49.6 36.32C49.4933 35.2267 49.2933 34.4533 49 34C48.7333 33.5467 48.3066 33.32 47.72 33.32V33H60.4C61.3333 33 62.2933 33.1333 63.28 33.4C64.2933 33.64 65.2666 34.0133 66.2 34.52C67.1333 35 67.9066 35.68 68.52 36.56C69.1333 37.4133 69.44 38.3733 69.44 39.44C69.44 40.48 69.1333 41.4267 68.52 42.28C67.9066 43.1333 67.1333 43.8133 66.2 44.32C65.2666 44.8267 64.2933 45.2267 63.28 45.52C62.2666 45.7867 61.3066 45.92 60.4 45.92H54.4V52.6C54.4 54.8933 54.4533 56.5867 54.56 57.68C54.6666 58.7733 54.8533 59.5467 55.12 60C55.4133 60.4533 55.8533 60.68 56.44 60.68V61ZM59.28 33.64H54.4V45.24H59.28C59.76 45.24 60.2933 45.12 60.88 44.88C61.4933 44.64 62.0933 44.3067 62.68 43.88C63.2933 43.4267 63.8 42.8133 64.2 42.04C64.6 41.2667 64.8 40.4 64.8 39.44C64.8 37.6 64.2266 36.1733 63.08 35.16C61.96 34.1467 60.6933 33.64 59.28 33.64ZM79.305 39.48C82.1583 39.48 84.305 40.1333 85.745 41.44C87.2116 42.7467 87.945 44.8 87.945 47.6V61L83.345 58.48C82.065 60.6667 79.9716 61.76 77.065 61.76C76.105 61.76 75.1316 61.6133 74.145 61.32C73.185 61.0533 72.2516 60.6533 71.345 60.12C70.465 59.5867 69.745 58.88 69.185 58C68.625 57.0933 68.345 56.08 68.345 54.96C68.345 53.76 68.625 52.6933 69.185 51.76C69.745 50.8267 70.465 50.0933 71.345 49.56C72.2516 49.0267 73.185 48.64 74.145 48.4C75.1316 48.1333 76.105 48 77.065 48C79.305 48 81.3983 48.4133 83.345 49.24V47.6C83.345 42.6667 82.065 40.2 79.505 40.2C78.9983 40.2 78.4916 40.4 77.985 40.8C77.505 41.1733 77.0783 41.6667 76.705 42.28C76.3583 42.8667 76.0916 43.3467 75.905 43.72C75.7183 44.0933 75.545 44.4667 75.385 44.84C75.225 45.2667 74.945 45.6133 74.545 45.88C74.145 46.1467 73.705 46.28 73.225 46.28C72.6116 46.28 72.0783 46.0533 71.625 45.6C71.1716 45.1467 70.945 44.6 70.945 43.96C70.945 43.24 71.265 42.5733 71.905 41.96C72.5716 41.3467 73.3716 40.88 74.305 40.56C75.265 40.2133 76.185 39.9467 77.065 39.76C77.945 39.5733 78.6916 39.48 79.305 39.48ZM83.345 57.64V49.92C81.4783 49.04 79.625 48.72 77.785 48.96C76.5316 49.0933 75.4516 49.6933 74.545 50.76C73.6383 51.8267 73.225 53.12 73.305 54.64C73.4116 56.6667 74.0783 58.2133 75.305 59.28C76.5583 60.3467 77.9716 60.7333 79.545 60.44C80.425 60.28 81.1983 59.9467 81.865 59.44C82.5583 58.9067 83.0516 58.3067 83.345 57.64ZM118.417 46.76C120.87 46.76 122.95 47.4933 124.657 48.96C126.39 50.4267 127.257 52.1867 127.257 54.24C127.257 56.4 126.577 58.2 125.217 59.64C123.884 61.0533 122.03 61.76 119.657 61.76C118.777 61.76 117.964 61.6667 117.217 61.48C116.47 61.2933 115.83 61.0667 115.297 60.8C114.764 60.5333 114.257 60.16 113.777 59.68C113.324 59.2 112.937 58.7467 112.617 58.32C112.324 57.8933 112.004 57.3467 111.657 56.68C111.337 55.9867 111.084 55.4 110.897 54.92C110.71 54.4133 110.457 53.76 110.137 52.96C109.844 52.16 109.604 51.52 109.417 51.04C108.804 49.5733 108.23 48.32 107.697 47.28C107.19 46.24 106.604 45.24 105.937 44.28C105.27 43.32 104.577 42.56 103.857 42C103.137 41.4133 102.324 40.96 101.417 40.64C100.51 40.32 99.4972 40.16 98.3772 40.16C96.9638 40.16 95.7505 40.48 94.7372 41.12C93.7238 41.76 93.2172 42.5333 93.2172 43.44C93.2172 44.4267 93.7505 45.2267 94.8172 45.84C95.9105 46.4533 97.6038 46.76 99.8972 46.76C101.497 46.76 102.977 47.0933 104.337 47.76C105.697 48.4267 106.777 49.3333 107.577 50.48C108.377 51.6267 108.777 52.88 108.777 54.24C108.777 56.32 107.91 58.0933 106.177 59.56C104.444 61.0267 102.35 61.76 99.8972 61.76V61.72V61.76C97.2572 61.76 94.3372 61.5067 91.1372 61V52.92H91.4572C91.4572 54.6 91.9238 56.08 92.8572 57.36C93.8172 58.6133 95.0172 59.5467 96.4572 60.16C97.8972 60.7733 99.4572 61.08 101.137 61.08C102.63 61.08 103.91 60.6267 104.977 59.72C106.07 58.8133 106.617 57.72 106.617 56.44C106.617 55.5867 106.364 54.8133 105.857 54.12C105.377 53.4267 104.604 52.88 103.537 52.48C102.47 52.0533 101.164 51.84 99.6172 51.84C97.2705 51.84 95.2572 51.24 93.5772 50.04C91.8972 48.84 91.0572 47.3867 91.0572 45.68C91.0572 43.8933 91.7238 42.4133 93.0572 41.24C94.4172 40.0667 96.2438 39.48 98.5372 39.48C99.3905 39.48 100.204 39.6 100.977 39.84C101.777 40.08 102.484 40.3867 103.097 40.76C103.71 41.1067 104.31 41.5867 104.897 42.2C105.484 42.8133 105.99 43.4133 106.417 44C106.844 44.56 107.27 45.2667 107.697 46.12C108.15 46.9733 108.524 47.7333 108.817 48.4C109.137 49.04 109.484 49.8267 109.857 50.76C110.044 51.1867 110.284 51.76 110.577 52.48C110.87 53.2 111.084 53.7467 111.217 54.12C111.377 54.4933 111.59 54.9867 111.857 55.6C112.15 56.1867 112.39 56.64 112.577 56.96C112.764 57.28 113.004 57.6667 113.297 58.12C113.617 58.5733 113.91 58.92 114.177 59.16C114.47 59.4 114.817 59.6667 115.217 59.96C115.617 60.2533 116.03 60.4667 116.457 60.6C116.884 60.7333 117.364 60.8533 117.897 60.96C118.43 61.04 119.017 61.08 119.657 61.08C121.15 61.08 122.43 60.6267 123.497 59.72C124.564 58.8133 125.097 57.72 125.097 56.44C125.097 55.5867 124.857 54.8133 124.377 54.12C123.897 53.4267 123.124 52.88 122.057 52.48C120.99 52.0533 119.684 51.84 118.137 51.84C116.99 51.84 115.884 51.68 114.817 51.36C113.75 51.0133 112.83 50.5733 112.057 50.04C111.31 49.48 110.71 48.8267 110.257 48.08C109.804 47.3067 109.577 46.5067 109.577 45.68C109.577 44.8267 109.804 44.0267 110.257 43.28C110.71 42.5067 111.31 41.84 112.057 41.28C112.83 40.72 113.75 40.28 114.817 39.96C115.884 39.64 116.99 39.48 118.137 39.48C118.644 39.48 119.097 39.4933 119.497 39.52C119.924 39.52 120.337 39.5333 120.737 39.56C121.137 39.5867 121.457 39.6133 121.697 39.64C121.964 39.64 122.31 39.68 122.737 39.76C123.19 39.8133 123.51 39.8533 123.697 39.88C123.884 39.9067 124.244 39.96 124.777 40.04C125.337 40.12 125.724 40.1733 125.937 40.2V48.28H125.617C125.617 45.7467 124.79 43.76 123.137 42.32C121.51 40.88 119.43 40.16 116.897 40.16C115.484 40.16 114.257 40.48 113.217 41.12C112.204 41.76 111.697 42.5333 111.697 43.44C111.697 44.4267 112.244 45.2267 113.337 45.84C114.43 46.4533 116.124 46.76 118.417 46.76Z" fill="black" />
                <path d="M10.68 17.36C7.45333 17.36 5.06667 16.7467 3.52 15.52C2 14.2667 1.24 12.5333 1.24 10.32C1.24 9.04 1.52 7.88 2.08 6.84C2.66667 5.8 3.46667 4.96 4.48 4.32C5.49333 3.65333 6.68 3.14667 8.04 2.8C9.4 2.45333 10.88 2.28 12.48 2.28C15.6267 2.28 18.8 2.52 22 3V11.08H21.64C21.64 9.82667 21.2933 8.69333 20.6 7.68C19.9067 6.64 18.9867 5.82666 17.84 5.24C16.72 4.62666 15.52 4.16 14.24 3.84C12.96 3.49333 11.6933 3.32 10.44 3.32C9.08 3.32 7.86667 3.52 6.8 3.92C5.76 4.29333 4.93333 4.85333 4.32 5.6C3.73333 6.32 3.44 7.18666 3.44 8.2C3.44 9.77333 4.12 10.8533 5.48 11.44C6.86667 12 9.09333 12.28 12.16 12.28C14.1867 12.28 15.9333 12.5333 17.4 13.04C18.8933 13.5467 20.0667 14.2533 20.92 15.16C21.8 16.0667 22.44 17.0933 22.84 18.24C23.2667 19.3867 23.48 20.68 23.48 22.12C23.48 23.3467 23.2533 24.5067 22.8 25.6C22.3467 26.6933 21.6533 27.72 20.72 28.68C19.7867 29.6133 18.48 30.36 16.8 30.92C15.1467 31.48 13.2133 31.76 11 31.76C7.61333 31.76 4.54667 31.5067 1.8 31V21.8H2.12C2.12 23.2933 2.46667 24.6267 3.16 25.8C3.88 26.9733 4.82667 27.8933 6 28.56C7.17333 29.2267 8.42667 29.7333 9.76 30.08C11.12 30.4 12.4933 30.56 13.88 30.56C16.12 30.56 17.8933 29.8933 19.2 28.56C20.5067 27.2 21.16 25.6 21.16 23.76C21.16 21.84 20.2933 20.2933 18.56 19.12C16.8533 17.9467 14.2267 17.36 10.68 17.36ZM36.2503 9.48C39.1036 9.48 41.2503 10.1333 42.6903 11.44C44.157 12.7467 44.8903 14.8 44.8903 17.6V31L40.2903 28.48C39.0103 30.6667 36.917 31.76 34.0103 31.76C33.0503 31.76 32.077 31.6133 31.0903 31.32C30.1303 31.0533 29.197 30.6533 28.2903 30.12C27.4103 29.5867 26.6903 28.88 26.1303 28C25.5703 27.0933 25.2903 26.08 25.2903 24.96C25.2903 23.76 25.5703 22.6933 26.1303 21.76C26.6903 20.8267 27.4103 20.0933 28.2903 19.56C29.197 19.0267 30.1303 18.64 31.0903 18.4C32.077 18.1333 33.0503 18 34.0103 18C36.2503 18 38.3436 18.4133 40.2903 19.24V17.6C40.2903 12.6667 39.0103 10.2 36.4503 10.2C35.9436 10.2 35.437 10.4 34.9303 10.8C34.4503 11.1733 34.0236 11.6667 33.6503 12.28C33.3036 12.8667 33.037 13.3467 32.8503 13.72C32.6636 14.0933 32.4903 14.4667 32.3303 14.84C32.1703 15.2667 31.8903 15.6133 31.4903 15.88C31.0903 16.1467 30.6503 16.28 30.1703 16.28C29.557 16.28 29.0236 16.0533 28.5703 15.6C28.117 15.1467 27.8903 14.6 27.8903 13.96C27.8903 13.24 28.2103 12.5733 28.8503 11.96C29.517 11.3467 30.317 10.88 31.2503 10.56C32.2103 10.2133 33.1303 9.94667 34.0103 9.76C34.8903 9.57333 35.637 9.48 36.2503 9.48ZM40.2903 27.64V19.92C38.4236 19.04 36.5703 18.72 34.7303 18.96C33.477 19.0933 32.397 19.6933 31.4903 20.76C30.5836 21.8267 30.1703 23.12 30.2503 24.64C30.357 26.6667 31.0236 28.2133 32.2503 29.28C33.5036 30.3467 34.917 30.7333 36.4903 30.44C37.3703 30.28 38.1436 29.9467 38.8103 29.44C39.5036 28.9067 39.997 28.3067 40.2903 27.64ZM56.0825 2.28C57.6025 2.28 59.8158 2.52 62.7225 3L59.9225 8.84L59.6425 8.72C60.3892 7.12 60.3625 5.76 59.5625 4.64C58.7892 3.49333 57.7492 2.92 56.4425 2.92C55.9358 2.92 55.5358 3.01333 55.2425 3.2C54.9758 3.36 54.7225 3.72 54.4825 4.28C54.2692 4.84 54.1225 5.66667 54.0425 6.76C53.9625 7.85333 53.9225 9.32 53.9225 11.16H56.9625V11.8H53.9225V22.6C53.9225 24.3333 53.9492 25.6933 54.0025 26.68C54.0558 27.6667 54.1625 28.48 54.3225 29.12C54.4825 29.7333 54.6825 30.1467 54.9225 30.36C55.1892 30.5733 55.5358 30.68 55.9625 30.68V31H47.2425V30.68C47.8292 30.68 48.2558 30.4533 48.5225 30C48.8158 29.5467 49.0158 28.7733 49.1225 27.68C49.2292 26.5867 49.2825 24.8933 49.2825 22.6V11.8H47.2425V11.16H49.2825C49.2825 10.3067 49.2958 9.61333 49.3225 9.08C49.3492 8.52 49.4158 7.90667 49.5225 7.24C49.6292 6.54667 49.7625 5.98667 49.9225 5.56C50.1092 5.10666 50.3625 4.65333 50.6825 4.2C51.0292 3.74667 51.4425 3.4 51.9225 3.16C52.4025 2.89333 52.9892 2.68 53.6825 2.52C54.3758 2.36 55.1758 2.28 56.0825 2.28ZM75.6259 26.16L75.9859 26.44C75.3459 27.5333 74.5993 28.4667 73.7459 29.24C72.8926 30.0133 71.9059 30.6267 70.7859 31.08C69.6926 31.5333 68.5059 31.76 67.2259 31.76C64.2659 31.76 61.7326 30.68 59.6259 28.52C57.5459 26.3333 56.5059 23.7067 56.5059 20.64C56.5059 17.5467 57.5459 14.92 59.6259 12.76C61.7326 10.5733 64.2659 9.48 67.2259 9.48C67.7326 9.48 68.3726 9.56 69.1459 9.72C69.9193 9.85333 70.7593 10.0667 71.6659 10.36C72.5726 10.6267 73.3326 11.0667 73.9459 11.68C74.5859 12.2667 74.9059 12.9467 74.9059 13.72C74.9059 14.92 73.7593 16.04 71.4659 17.08C69.1726 18.12 65.6926 19.24 61.0259 20.44C61.0793 20.8667 61.1459 21.2933 61.2259 21.72C61.7059 24.4133 62.7193 26.48 64.2659 27.92C65.8393 29.36 67.6126 30.08 69.5859 30.08C70.6259 30.08 71.7059 29.76 72.8259 29.12C73.9459 28.4533 74.8793 27.4667 75.6259 26.16ZM65.3859 10.32C63.8926 10.56 62.7326 11.6133 61.9059 13.48C61.0793 15.32 60.7726 17.5067 60.9859 20.04C67.4393 18.0933 70.6659 16.0533 70.6659 13.92C70.6659 12.88 70.1059 11.96 68.9859 11.16C67.8926 10.36 66.6926 10.08 65.3859 10.32Z" fill="black" />
                <path d="M90.0654 17.121C90.0345 10.4999 95.3963 5.09614 102.055 5.06521C108.714 5.03428 114.126 10.388 114.157 17.0091C114.188 23.6303 108.827 29.034 102.168 29.0649C95.5085 29.0959 90.0964 23.7422 90.0654 17.121Z" stroke="#01CD15" stroke-width="4" />
                <rect x="100.127" y="16.1342" width="4" height="8" fill="#D9D9D9" />
                <circle cx="102.127" cy="16.1342" r="6" fill="#D9D9D9" />
                <path d="M12.0654 48.121C12.0345 41.4999 17.3963 36.0961 24.0553 36.0652C30.7144 36.0343 36.1265 41.388 36.1574 48.0091C36.1884 54.6303 30.8266 60.034 24.1675 60.0649C17.5085 60.0959 12.0964 54.7422 12.0654 48.121Z" stroke="#01CD15" stroke-width="4" />
                <rect x="22.1273" y="47.1342" width="4" height="8" fill="#D9D9D9" />
                <circle cx="24.1273" cy="47.1342" r="6" fill="#D9D9D9" />
                <path d="M22 34C22 32.3431 23.3431 31 25 31H105V31C105 32.6569 103.657 34 102 34H22V34Z" fill="black" />
              </svg>
            </h2>
            <div className='flex flex-col items-center w-full max-w-96 mt-16'>
              <h3 className={`text-3xl md:text-4xl mb-1 ${font.className}`}>Create an account</h3>
              <p className='flex text-xs text-center mb-6'>Start saving your data from now</p>

              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className='flex flex-col w-full gap-4'>
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Your name</FormLabel>
                        <FormControl>
                          <Input placeholder="John Doe" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
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
                        <FormDescription>Must be at least 8 characters long</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button className='mt-4' type="submit">Register</Button>
                </form>
              </Form>
              <Button className='text-sm font-semibold' variant={'link'} onClick={() => signIn('google')}>Sign up With Google</Button>
            </div>
            <div className='mt-24 flex flex-row items-center text-center'>
              <p className='text-xs'>{`Been here before?`}</p>
              <Link className='text-xs font-bold ms-2' href="/login">Login</Link>
            </div>
          </div>
          <div className='flex w-full md:w-1/2 backdrop-blur-lg'>
            <div className='flex flex-col relative h-full w-full'>
              <div className='relative z-10 flex flex-col justify-between p-8 max-w-96 h-full'>
                <div>
                  <h1 className='hidden'>SafePass</h1>
                  <h2 className='text-base md:text-lg font-thin uppercase text-white'>REGISTRATIONS</h2>
                </div>
                <div className=''>
                  <h3 className={`text-4xl md:text-6xl font-normal tracking-wide leading-none mt-8 md:mt-32 mb-4 uppercase text-white ${font.className}`}>SAVE YOUR INFORMATIONS</h3>
                  <p className='font-thin text-sm text-white'>5000+ people have already trusted us, You can be one of them to enjoy the service in free</p>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </section>
    </RootLayout>
  )
}