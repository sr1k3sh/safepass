import React from 'react'
import { GetServerSideProps } from 'next'
import ReactMarkdown from 'react-markdown'
import prisma from '@/lib/prisma'
import { PostProps } from '@/components/Post'
import { useSession } from 'next-auth/react'
import Router from 'next/router'

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const post = await prisma.post.findUnique({
    where: {
      id: String(params?.id),
    },
    include: {
      author: {
        select: { name: true, email: true },
      },
    },
  })
  return {
    props: post,
  }
}

async function publishPost(id: string): Promise<void> {

  const body = { id }
  const res =  await fetch('/api/publish', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    })

  if (!res.ok) {
    return
  }
  await Router.push('/')
}

const Post: React.FC<PostProps> = (props) => {
  const { data: session, status } = useSession()
  if (status === 'loading') {
    return <div>Authenticating ...</div>
  }
  const userHasValidSession = Boolean(session)
  const postBelongsToUser = session?.user?.email === props.author?.email
  let title = props.title
  if (!props.published) {
    title = `${title} (Draft)`
  }

  return (
    <>
      <div>
        <h2>{title}</h2>
        <p>By {props?.author?.name || 'Unknown author'}</p>
        <ReactMarkdown>
          {props.content}
        </ReactMarkdown>
        {!props.published && userHasValidSession && postBelongsToUser && (
          <button onClick={() => publishPost(props.id)}>Publish</button>
        )}
      </div>
      <style jsx>{`
        .page {
          background: var(--geist-background)
          padding: 2rem
        }

        .actions {
          margin-top: 2rem
        }

        button {
          background: #ececec
          border: 0
          border-radius: 0.125rem
          padding: 1rem 2rem
        }

        button + button {
          margin-left: 1rem
        }
      `}</style>
    </>
  )
}

export default Post