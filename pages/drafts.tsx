import React from "react";
import type { GetServerSideProps } from "next";
import Layout from "../components/Layout";
import Post, { PostProps } from "../components/Post";
import { useSession } from "next-auth/react";
import { getServerSession } from "next-auth/next";
import prisma from '../lib/prisma'
import { authOptions } from './api/auth/[...nextauth]'

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const session = await getServerSession(req, res, authOptions);
  if (!session?.user?.email) {
    return { props: { drafts: [] } };
  }

  const drafts = await prisma.post.findMany({
    where: {
      author: { email: session.user.email },
      published: false,
    },
    include: {
      author: {
        select: { name: true },
      },
    },
  });
  return {
    props: { drafts },
  };
};

type Props = {
  drafts: PostProps[];
};

const Drafts: React.FC<Props> = (props) => {
  const { data: session } = useSession();

  if (!session) {
    return (
      <Layout>
        <div className="page">
          <div className="page-header">
            <h1>My Drafts</h1>
          </div>
          <div className="empty">You need to be authenticated to view this page.</div>
        </div>
        <style jsx>{`
          .page-header {
            padding: 2.5rem 0 1.5rem;
          }

          h1 {
            margin: 0;
            font-size: 1.75rem;
            font-weight: 700;
            letter-spacing: -0.03em;
          }

          .empty {
            text-align: center;
            padding: 3rem 1rem;
            color: var(--text-tertiary);
            font-size: 0.9rem;
            border: 1px dashed var(--border);
            border-radius: var(--radius);
          }
        `}</style>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="page">
        <div className="page-header">
          <h1>My Drafts</h1>
          <p className="subtitle">Unpublished posts</p>
        </div>
        <main>
          {props.drafts.length === 0 && (
            <div className="empty">No drafts yet. Create your first post!</div>
          )}
          {props.drafts.map((post) => (
            <div key={post.id} className="post">
              <Post post={post} />
            </div>
          ))}
        </main>
      </div>
      <style jsx>{`
        .page-header {
          padding: 2.5rem 0 1.5rem;
        }

        h1 {
          margin: 0;
          font-size: 1.75rem;
          font-weight: 700;
          letter-spacing: -0.03em;
        }

        .subtitle {
          margin: 0.25rem 0 0;
          color: var(--text-tertiary);
          font-size: 0.9rem;
        }

        .post + .post {
          margin-top: 0.75rem;
        }

        .empty {
          text-align: center;
          padding: 3rem 1rem;
          color: var(--text-tertiary);
          font-size: 0.9rem;
          border: 1px dashed var(--border);
          border-radius: var(--radius);
        }
      `}</style>
    </Layout>
  );
};

export default Drafts;
