import React, { useState } from "react";
import Layout from "../components/Layout";
import Router from "next/router";

const Draft: React.FC = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const submitData = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    try {
      const body = { title, content };
      await fetch(`/api/post`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      await Router.push("/drafts");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Layout>
      <div className="page">
        <form onSubmit={submitData}>
          <h1>New Draft</h1>
          <input
            autoFocus
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Post title"
            type="text"
            value={title}
          />
          <textarea
            cols={50}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Write your content here... (Markdown supported)"
            rows={12}
            value={content}
          />
          <div className="form-actions">
            <input disabled={!content || !title} type="submit" value="Create" />
            <a className="back" href="#" onClick={() => Router.push("/")}>
              Cancel
            </a>
          </div>
        </form>
      </div>
      <style jsx>{`
        .page {
          padding: 2.5rem 0;
        }

        h1 {
          margin: 0 0 1.5rem;
          font-size: 1.75rem;
          font-weight: 700;
          letter-spacing: -0.03em;
        }

        input[type="text"] {
          width: 100%;
          padding: 0.75rem 1rem;
          margin-bottom: 0.75rem;
          border-radius: var(--radius-sm);
          border: 1px solid var(--border);
          background: var(--bg-elevated);
          color: var(--text);
          font-size: 1rem;
          transition: border-color 0.15s ease;
          outline: none;
        }

        input[type="text"]:focus {
          border-color: var(--accent);
        }

        input[type="text"]::placeholder {
          color: var(--text-tertiary);
        }

        textarea {
          width: 100%;
          padding: 0.75rem 1rem;
          border-radius: var(--radius-sm);
          border: 1px solid var(--border);
          background: var(--bg-elevated);
          color: var(--text);
          resize: vertical;
          line-height: 1.6;
          transition: border-color 0.15s ease;
          outline: none;
        }

        textarea:focus {
          border-color: var(--accent);
        }

        textarea::placeholder {
          color: var(--text-tertiary);
        }

        .form-actions {
          display: flex;
          align-items: center;
          gap: 1rem;
          margin-top: 1rem;
        }

        input[type="submit"] {
          padding: 0.5rem 1.5rem;
          border-radius: var(--radius-sm);
          border: none;
          background: var(--accent);
          color: white;
          font-weight: 500;
          font-size: 0.875rem;
          cursor: pointer;
          transition: all 0.15s ease;
        }

        input[type="submit"]:hover:not(:disabled) {
          background: var(--accent-hover);
        }

        input[type="submit"]:disabled {
          opacity: 0.4;
          cursor: not-allowed;
        }

        .back {
          font-size: 0.875rem;
          color: var(--text-tertiary);
        }

        .back:hover {
          color: var(--text-secondary);
        }
      `}</style>
    </Layout>
  );
};

export default Draft;
