import React, { useEffect, useState } from 'react'
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
import { Popover, PopoverContent } from '@/components/ui/popover'
import { PopoverTrigger } from '@radix-ui/react-popover'
import { cn } from '@/lib/utils'
import { CalendarIcon } from '@radix-ui/react-icons'
import { Calendar } from '@/components/ui/calendar'
import { format } from 'date-fns'
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@/components/ui/resizable'
type Props = {}

interface ServerSideProps {
  session: any; // Replace any with the actual type of your data
}

export default function Create({ }: Props) {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [showJustIconSidebar, setShowJustIconSidebar] = useState<boolean>(false)

  const formSchema = z.object({
    type: z.enum(["credit", "debit", "cash"]),
    bank: z.string().min(2).max(50),
    ["card-number"]: z.string().min(16).max(16),
    expiration: z.date(),
    cvv: z.string().min(3).max(3),
    cardHolder: z.string().min(2).max(50),
  })

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      type: "credit",
      bank: "",
      ["card-number"]: "",
      expiration: new Date(),
      cvv: "",
      cardHolder: "",
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values)
    const body = {
      type: values.type,
      bank: values.bank,
      cardNumber: values["card-number"],
      expiration: values.expiration,
      cvv: values.cvv,
      cardHolder: values.cardHolder,
    }
    const res = await fetch('/api/create/card', {
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

  const onLayoutResizeable = (layout: any) => {
    // console.log(layout)
    if (layout[0] < 10) {
      setShowJustIconSidebar(true)
    } else {
      setShowJustIconSidebar(false)
    }
  }

  useEffect(() => {
    if (!session) {
      router.push('/login')
    }
  }, [session, router])

  if (status === 'loading') {
    return <div>Loading...</div>
  }

  if (session) {
    return (
      <RootLayout>
        <div className='container-fluid m-auto bg-background'>
          <div className='flex flex-row justify-between'>
            <ResizablePanelGroup onLayout={onLayoutResizeable} direction='horizontal' className="min-h-[200px] rounded-lg border">
              <ResizablePanel minSize={4} defaultSize={20} maxSize={25}>
                <DashboardSidebar showJustIconSidebar={showJustIconSidebar}/>
              </ResizablePanel>
              <ResizableHandle withHandle></ResizableHandle>
              <ResizablePanel>
                <div className='flex flex-col w-full p-4'>
                  <div>
                    <DashboardHeader />
                  </div>
                  <div className='flex flex-row mt-8 gap-4'>
                    <Card className='max-w-96'>
                      <CardHeader>Create Passwords</CardHeader>
                      <CardContent>
                        <Form {...form}>
                          <form onSubmit={form.handleSubmit(onSubmit)} className='flex flex-col gap-4'>
                            <FormField
                              control={form.control}
                              name="type"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Card type</FormLabel>
                                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl>
                                      <SelectTrigger>
                                        <SelectValue placeholder="Select a verified email to display" />
                                      </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                      <SelectItem value="credit">credit</SelectItem>
                                      <SelectItem value="debit">debit</SelectItem>
                                      <SelectItem value="cash">cash</SelectItem>
                                    </SelectContent>
                                  </Select>
                                  <FormDescription>
                                    Please select card type
                                  </FormDescription>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            <FormField
                              control={form.control}
                              name='bank'
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Bank</FormLabel>
                                  <FormControl>
                                    <Input placeholder="bank" {...field} />
                                  </FormControl>
                                  <FormDescription>
                                    Please add bank name
                                  </FormDescription>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            <FormField
                              control={form.control}
                              name='cardHolder'
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Card Holder</FormLabel>
                                  <FormControl>
                                    <Input placeholder="card holder" {...field} />
                                  </FormControl>
                                  <FormDescription>
                                    Please add card holder name
                                  </FormDescription>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            <FormField
                              control={form.control}
                              name='card-number'
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Card Number</FormLabel>
                                  <FormControl>
                                    <Input type='number' placeholder="card number" {...field} />
                                  </FormControl>
                                  <FormDescription>
                                    Please add card number
                                  </FormDescription>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />

                            <FormField
                              control={form.control}
                              name="expiration"
                              render={({ field }) => (
                                <FormItem className="flex flex-col">
                                  <FormLabel>Date of birth</FormLabel>
                                  <Popover>
                                    <PopoverTrigger asChild>
                                      <FormControl>
                                        <Button
                                          variant={"outline"}
                                          className={cn(
                                            "w-[240px] pl-3 text-left font-normal",
                                            !field.value && "text-muted-foreground"
                                          )}
                                        >
                                          {field.value ? (
                                            format(field.value, "PPP")
                                          ) : (
                                            <span>Pick a date</span>
                                          )}
                                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                        </Button>
                                      </FormControl>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-auto p-0" align="start">
                                      <Calendar
                                        mode="single"
                                        selected={field.value}
                                        onSelect={field.onChange}
                                        disabled={(date) =>
                                          date > new Date() || date < new Date("1900-01-01")
                                        }
                                        initialFocus
                                      />
                                    </PopoverContent>
                                  </Popover>
                                  <FormDescription>
                                    Your date of birth is used to calculate your age.
                                  </FormDescription>
                                  <FormMessage />
                                </FormItem>

                              )}
                            />
                            <FormField
                              control={form.control}
                              name='cvv'
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>CVV</FormLabel>
                                  <FormControl>
                                    <Input type={'number'} placeholder="cvv" {...field} />
                                  </FormControl>
                                  <FormDescription>
                                    Please add cvv
                                  </FormDescription>
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
              </ResizablePanel>
            </ResizablePanelGroup>
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