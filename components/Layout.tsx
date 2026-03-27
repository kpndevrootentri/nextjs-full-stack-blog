import React, { ReactNode } from "react";
import Header from "./Header";

type Props = {
  children: ReactNode;
};

const Layout: React.FC<Props> = (props) => (
  <div>
    <Header />
    <div className="layout">{props.children}</div>
    <style jsx global>{`
      @import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,wght@0,400;0,500;0,700;1,400&family=JetBrains+Mono:wght@400;500&display=swap');

      :root {
        --bg: #0e0e10;
        --bg-elevated: #18181b;
        --bg-hover: #1e1e22;
        --border: #27272a;
        --border-hover: #3f3f46;
        --text: #fafafa;
        --text-secondary: #a1a1aa;
        --text-tertiary: #71717a;
        --accent: #818cf8;
        --accent-hover: #6366f1;
        --accent-subtle: rgba(129, 140, 248, 0.1);
        --danger: #f87171;
        --danger-hover: #ef4444;
        --success: #34d399;
        --radius: 12px;
        --radius-sm: 8px;
        --shadow: 0 1px 3px rgba(0,0,0,0.4), 0 1px 2px rgba(0,0,0,0.3);
        --shadow-lg: 0 10px 30px rgba(0,0,0,0.5);
        --max-width: 720px;
        --font-sans: 'DM Sans', -apple-system, BlinkMacSystemFont, sans-serif;
        --font-mono: 'JetBrains Mono', monospace;
      }

      html {
        box-sizing: border-box;
      }

      *,
      *:before,
      *:after {
        box-sizing: inherit;
      }

      body {
        margin: 0;
        padding: 0;
        font-size: 15px;
        font-family: var(--font-sans);
        background: var(--bg);
        color: var(--text);
        line-height: 1.6;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
      }

      input,
      textarea {
        font-size: 15px;
        font-family: var(--font-sans);
      }

      button {
        cursor: pointer;
        font-family: var(--font-sans);
      }

      a {
        color: var(--accent);
        text-decoration: none;
        transition: color 0.15s ease;
      }

      a:hover {
        color: var(--accent-hover);
      }

      ::selection {
        background: var(--accent);
        color: white;
      }
    `}</style>
    <style jsx>{`
      .layout {
        max-width: var(--max-width);
        margin: 0 auto;
        padding: 0 1.5rem 4rem;
      }
    `}</style>
  </div>
);

export default Layout;
