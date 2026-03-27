import React from "react";
import Router from "next/router";
import ReactMarkdown from "react-markdown";

export type PostProps = {
  id: number;
  title: string;
  author: {
    name: string;
    email: string;
  } | null;
  content: string;
  published: boolean;
};

const Post: React.FC<{ post: PostProps }> = ({ post }) => {
  const authorName = post.author ? post.author.name : "Unknown author";
  return (
    <div className="card" onClick={() => Router.push("/p/[id]", `/p/${post.id}`)}>
      <h2>{post.title}</h2>
      <span className="author">by {authorName}</span>
      <div className="content">
        <ReactMarkdown children={post.content} />
      </div>
      <style jsx>{`
        .card {
          padding: 1.5rem;
          border-radius: var(--radius);
          background: var(--bg-elevated);
          border: 1px solid var(--border);
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .card:hover {
          border-color: var(--border-hover);
          background: var(--bg-hover);
          transform: translateY(-1px);
          box-shadow: var(--shadow);
        }

        h2 {
          margin: 0 0 0.4rem;
          font-size: 1.15rem;
          font-weight: 600;
          letter-spacing: -0.01em;
          color: var(--text);
        }

        .author {
          font-size: 0.8rem;
          color: var(--text-tertiary);
        }

        .content {
          margin-top: 0.75rem;
          font-size: 0.9rem;
          color: var(--text-secondary);
          line-height: 1.6;
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .content :global(p) {
          margin: 0;
        }
      `}</style>
    </div>
  );
};

export default Post;
