import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { signOut, useSession } from "next-auth/react";

const Header: React.FC = () => {
  const router = useRouter();
  const isActive: (pathname: string) => boolean = (pathname) =>
    router.pathname === pathname;

  const { data: session, status } = useSession();

  return (
    <nav>
      <div className="inner">
        <div className="left">
          <Link href="/" className="logo">
            hobbie
          </Link>
          <div className="nav-links">
            <Link href="/" data-active={isActive("/")}>
              Feed
            </Link>
            {session && (
              <Link href="/drafts" data-active={isActive("/drafts")}>
                Drafts
              </Link>
            )}
          </div>
        </div>

        <div className="right">
          {status === "loading" && (
            <span className="loading">Loading...</span>
          )}
          {status !== "loading" && !session && (
            <Link href="/api/auth/signin" className="btn-login">
              Sign in
            </Link>
          )}
          {session && (
            <>
              <span className="user-info">{session.user.name}</span>
              <Link href="/create" className="btn-primary">
                New post
              </Link>
              <button className="btn-ghost" onClick={() => signOut()}>
                Sign out
              </button>
            </>
          )}
        </div>
      </div>

      <style jsx>{`
        nav {
          border-bottom: 1px solid var(--border);
          background: var(--bg-elevated);
          backdrop-filter: blur(12px);
          position: sticky;
          top: 0;
          z-index: 100;
        }

        .inner {
          max-width: var(--max-width);
          margin: 0 auto;
          padding: 0 1.5rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
          height: 60px;
        }

        .left {
          display: flex;
          align-items: center;
          gap: 2rem;
        }

        .logo {
          font-weight: 700;
          font-size: 1.1rem;
          letter-spacing: -0.02em;
          color: var(--text);
        }

        .nav-links {
          display: flex;
          gap: 0.25rem;
        }

        .nav-links :global(a) {
          padding: 0.4rem 0.75rem;
          border-radius: var(--radius-sm);
          font-size: 0.875rem;
          font-weight: 500;
          color: var(--text-secondary);
          text-decoration: none;
          transition: all 0.15s ease;
        }

        .nav-links :global(a:hover) {
          color: var(--text);
          background: var(--bg-hover);
        }

        .nav-links :global(a[data-active="true"]) {
          color: var(--text);
          background: var(--accent-subtle);
        }

        .right {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }

        .user-info {
          font-size: 0.8rem;
          color: var(--text-tertiary);
        }

        .loading {
          font-size: 0.8rem;
          color: var(--text-tertiary);
        }

        .btn-login {
          font-size: 0.875rem;
          font-weight: 500;
          padding: 0.4rem 1rem;
          border: 1px solid var(--border);
          border-radius: var(--radius-sm);
          color: var(--text);
          transition: all 0.15s ease;
        }

        .btn-login:hover {
          border-color: var(--border-hover);
          background: var(--bg-hover);
        }

        .btn-primary {
          font-size: 0.8rem;
          font-weight: 500;
          padding: 0.4rem 0.85rem;
          border-radius: var(--radius-sm);
          background: var(--accent);
          color: white;
          text-decoration: none;
          transition: all 0.15s ease;
        }

        .btn-primary:hover {
          background: var(--accent-hover);
        }

        .btn-ghost {
          font-size: 0.8rem;
          font-weight: 500;
          padding: 0.4rem 0.75rem;
          border-radius: var(--radius-sm);
          background: none;
          border: 1px solid var(--border);
          color: var(--text-secondary);
          transition: all 0.15s ease;
        }

        .btn-ghost:hover {
          border-color: var(--border-hover);
          color: var(--text);
          background: var(--bg-hover);
        }
      `}</style>
    </nav>
  );
};

export default Header;
