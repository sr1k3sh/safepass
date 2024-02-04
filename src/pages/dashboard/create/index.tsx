import React, { useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { useRouter } from 'next/router'
import { AuthOptions, getServerSession } from 'next-auth'
import { authOptions } from '@/pages/api/auth/[...nextauth]'
import DashboardHeader from '@/components/dashboard/dashboard-header'
import DashboardSidebar from '@/components/dashboard/dashboard-sidebar'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import RootLayout from '@/pages/layout'
import { toast } from '@/components/ui/use-toast'
import { GetServerSidePropsContext, GetServerSidePropsResult } from 'next'
type Props = {}

interface ServerSideProps {
  session: any; // Replace any with the actual type of your data
}

export default function Create({ }: Props) {
  const { data: session, status } = useSession()
  const router = useRouter()

  const formSchema = z.object({
    username: z.string().min(2).max(50),
    url: z.string().url(),
    email: z.string().email(),
    password: z.string().min(8),
    title: z.string().min(2).max(50),
    notes: z.string().min(2),
    category: z.enum(["personal", "work", "finance", "health"]),
  })

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      url: "",
      email: "",
      password: "",
      title: "",
      notes: "",
      category: "personal",
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values)
    const body = {
      category: values.category,
      notes: values.notes,
      username: values.username,
      email: values.email,
      password: values.password,
      url: values.url,
      title: values.title,
    }
    const res = await fetch('/api/createpass', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });

    if (res.ok) {
      form.reset()
      toast({
        title: "Password Created",
        description: new Date().toLocaleTimeString(),
      })
    }
    // console.log(res)
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
        <div className='container-fluid m-auto bg-background'>
          <div className='flex flex-row justify-between'>
            <DashboardSidebar />
            <div className='flex flex-col w-full p-4'>
              <div>
                <DashboardHeader />
              </div>
              <div className='flex flex-row mt-8 gap-4'>
                <Card className='w-full'>
                  <CardHeader>Create Passwords</CardHeader>
                  <CardContent>
                    <Form {...form}>
                      <form onSubmit={form.handleSubmit(onSubmit)} className='flex flex-col gap-4'>
                        <FormField
                          control={form.control}
                          name="category"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Category</FormLabel>
                              <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select a verified email to display" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  <SelectItem value="personal">personal</SelectItem>
                                  <SelectItem value="work">work</SelectItem>
                                  <SelectItem value="finance">finance</SelectItem>
                                  <SelectItem value="health">health</SelectItem>
                                </SelectContent>
                              </Select>
                              <FormDescription>
                                You can manage email addresses in your{" "}
                                {/* <Link href="/examples/forms">email settings</Link>. */}
                              </FormDescription>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="title"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Title</FormLabel>
                              <FormControl>
                                <Input placeholder="title" {...field} />
                              </FormControl>
                              <FormDescription>
                                Please add Title
                              </FormDescription>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="url"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Url/Website</FormLabel>
                              <FormControl>
                                <Input placeholder="http://..." {...field} />
                              </FormControl>
                              <FormDescription>
                                Please add valid url
                              </FormDescription>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="username"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Username</FormLabel>
                              <FormControl>
                                <Input placeholder="username" {...field} />
                              </FormControl>
                              <FormDescription>
                                This is your public display name.
                              </FormDescription>
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
                              <FormDescription>
                                Add valid email address
                              </FormDescription>
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
                              <FormDescription>
                                Add strong password
                              </FormDescription>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="notes"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Notes</FormLabel>
                              <FormControl>
                                <Textarea placeholder="write any notes" {...field} />
                                {/* <Input placeholder="write any notes" {...field} /> */}
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <Button className='mt-4' type="submit">Submit</Button>
                      </form>
                    </Form>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </RootLayout>
    )
  }

  return <></>
}

export async function getServerSideProps(
  context: GetServerSidePropsContext
): Promise<GetServerSidePropsResult<ServerSideProps>> {
  const { req, res } = context;

  return {
    props: {
      session: await getServerSession(req, res, authOptions),
    },
  };
}