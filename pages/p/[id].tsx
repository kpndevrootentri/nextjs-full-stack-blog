import React from "react";
import type { GetServerSideProps } from "next";
import ReactMarkdown from "react-markdown";
import Layout from "../../components/Layout";
import Router from "next/router";
import { PostProps } from "../../components/Post";
import prisma from '../../lib/prisma'
import { useSession } from "next-auth/react";

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
  });
  return {
    props: post,
  };
};


async function publishPost(id: number): Promise<void> {
  await fetch(`/api/publish/${id}`, {
    method: "PUT",
  });
  await Router.push("/")
}

async function deletePost(id: number): Promise<void> {
  await fetch(`/api/post/${id}`, {
    method: "DELETE",
  });
  await Router.push("/")
}

const Post: React.FC<PostProps> = (props) => {
  const { data: session, status } = useSession();
  if (status === 'loading') {
    return (
      <Layout>
        <div className="loading">Loading...</div>
        <style jsx>{`
          .loading {
            padding: 3rem 0;
            text-align: center;
            color: var(--text-tertiary);
          }
        `}</style>
      </Layout>
    );
  }
  const userHasValidSession = Boolean(session);
  const postBelongsToUser = session?.user?.email === props.author?.email;
  let title = props.title;
  if (!props.published) {
    title = `${title} (Draft)`;
  }

  return (
    <Layout>
      <article>
        <div className="post-header">
          {!props.published && <span className="draft-badge">Draft</span>}
          <h1>{props.title}</h1>
          <p className="author">by {props?.author?.name || "Unknown author"}</p>
        </div>
        <div className="content">
          <ReactMarkdown children={props.content} />
        </div>
        {userHasValidSession && postBelongsToUser && (
          <div className="actions">
            {!props.published && (
              <button className="btn-publish" onClick={() => publishPost(props.id)}>
                Publish
              </button>
            )}
            <button className="btn-delete" onClick={() => deletePost(props.id)}>
              Delete
            </button>
          </div>
        )}
      </article>
      <style jsx>{`
        article {
          padding: 2.5rem 0;
        }

        .post-header {
          margin-bottom: 2rem;
          padding-bottom: 1.5rem;
          border-bottom: 1px solid var(--border);
        }

        .draft-badge {
          display: inline-block;
          font-size: 0.7rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          padding: 0.2rem 0.6rem;
          border-radius: 4px;
          background: var(--accent-subtle);
          color: var(--accent);
          margin-bottom: 0.75rem;
        }

        h1 {
          margin: 0;
          font-size: 2rem;
          font-weight: 700;
          letter-spacing: -0.03em;
          line-height: 1.2;
        }

        .author {
          margin: 0.5rem 0 0;
          color: var(--text-tertiary);
          font-size: 0.9rem;
        }

        .content {
          font-size: 1rem;
          line-height: 1.75;
          color: var(--text-secondary);
        }

        .content :global(h1),
        .content :global(h2),
        .content :global(h3) {
          color: var(--text);
          margin-top: 2rem;
        }

        .content :global(p) {
          margin: 1rem 0;
        }

        .content :global(code) {
          font-family: var(--font-mono);
          font-size: 0.85em;
          background: var(--bg-hover);
          padding: 0.15em 0.4em;
          border-radius: 4px;
        }

        .content :global(pre) {
          background: var(--bg-elevated);
          border: 1px solid var(--border);
          border-radius: var(--radius-sm);
          padding: 1rem;
          overflow-x: auto;
        }

        .content :global(pre code) {
          background: none;
          padding: 0;
        }

        .content :global(blockquote) {
          border-left: 3px solid var(--accent);
          margin: 1.5rem 0;
          padding: 0.5rem 1rem;
          color: var(--text-tertiary);
        }

        .content :global(a) {
          color: var(--accent);
        }

        .actions {
          margin-top: 2.5rem;
          padding-top: 1.5rem;
          border-top: 1px solid var(--border);
          display: flex;
          gap: 0.75rem;
        }

        .btn-publish {
          font-size: 0.875rem;
          font-weight: 500;
          padding: 0.5rem 1.25rem;
          border-radius: var(--radius-sm);
          border: none;
          background: var(--success);
          color: #0e0e10;
          transition: all 0.15s ease;
        }

        .btn-publish:hover {
          opacity: 0.9;
          transform: translateY(-1px);
        }

        .btn-delete {
          font-size: 0.875rem;
          font-weight: 500;
          padding: 0.5rem 1.25rem;
          border-radius: var(--radius-sm);
          border: 1px solid var(--border);
          background: none;
          color: var(--danger);
          transition: all 0.15s ease;
        }

        .btn-delete:hover {
          background: rgba(248, 113, 113, 0.1);
          border-color: var(--danger);
        }
      `}</style>
    </Layout>
  );
};

export default Post;
