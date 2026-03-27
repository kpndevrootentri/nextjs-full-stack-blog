import React from "react";
import type { GetServerSideProps } from "next";
import Layout from "../components/Layout";
import Post, { PostProps } from "../components/Post";
import { prisma } from "../lib/prisma";


export const getServerSideProps: GetServerSideProps = async () => {
  const feed = await prisma.post.findMany({
    where: {
      published: true,
    },
    include: {
      author: {
        select: {
          name: true,
        },
      },
    },
  });
  return {
    props: { feed },
  };
};

type Props = {
  feed: PostProps[];
};

const Blog: React.FC<Props> = (props) => {
  return (
    <Layout>
      <div className="page">
        <div className="page-header">
          <h1>Feed</h1>
          <p className="subtitle">Latest published posts</p>
        </div>
        <main>
          {props.feed.length === 0 && (
            <div className="empty">No posts yet. Be the first to publish!</div>
          )}
          {props.feed.map((post) => (
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

export default Blog;
