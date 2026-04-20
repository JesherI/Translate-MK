'use client';

import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface MarkdownPreviewProps {
  content: string;
  isDark?: boolean;
}

export default function MarkdownPreview({ content, isDark = true }: MarkdownPreviewProps) {
  return (
    <div className={`prose prose-sm max-w-none h-full overflow-auto ${isDark ? 'prose-invert' : ''}`}>
      <ReactMarkdown 
        remarkPlugins={[remarkGfm]}
        components={{
          h1: ({ children }) => (
            <h1 className="text-3xl font-bold text-white mb-4 pb-2 border-b border-white/10">
              {children}
            </h1>
          ),
          h2: ({ children }) => (
            <h2 className="text-2xl font-semibold text-white/90 mb-3 mt-6">
              {children}
            </h2>
          ),
          h3: ({ children }) => (
            <h3 className="text-xl font-semibold text-white/80 mb-2 mt-4">
              {children}
            </h3>
          ),
          p: ({ children }) => (
            <p className="text-white/70 mb-4 leading-relaxed">
              {children}
            </p>
          ),
          strong: ({ children }) => (
            <strong className="text-white font-semibold">
              {children}
            </strong>
          ),
          em: ({ children }) => (
            <em className="text-white/80 italic">
              {children}
            </em>
          ),
          code: ({ children }) => (
            <code className="bg-white/10 px-1.5 py-0.5 rounded text-sm font-mono text-white/90">
              {children}
            </code>
          ),
          pre: ({ children }) => (
            <pre className="bg-white/5 border border-white/10 rounded-lg p-4 overflow-x-auto mb-4">
              {children}
            </pre>
          ),
          ul: ({ children }) => (
            <ul className="list-disc list-inside mb-4 space-y-1 text-white/70">
              {children}
            </ul>
          ),
          ol: ({ children }) => (
            <ol className="list-decimal list-inside mb-4 space-y-1 text-white/70">
              {children}
            </ol>
          ),
          li: ({ children }) => (
            <li className="text-white/70">
              {children}
            </li>
          ),
          a: ({ children, href }) => (
            <a 
              href={href}
              className="text-blue-400 hover:text-blue-300 underline transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              {children}
            </a>
          ),
          blockquote: ({ children }) => (
            <blockquote className="border-l-4 border-white/20 pl-4 italic text-white/60 mb-4">
              {children}
            </blockquote>
          ),
          hr: () => (
            <hr className="border-white/10 my-6" />
          ),
          table: ({ children }) => (
            <div className="overflow-x-auto mb-4">
              <table className="w-full border-collapse border border-white/10">
                {children}
              </table>
            </div>
          ),
          thead: ({ children }) => (
            <thead className="bg-white/5">
              {children}
            </thead>
          ),
          th: ({ children }) => (
            <th className="border border-white/10 px-4 py-2 text-left text-white font-semibold">
              {children}
            </th>
          ),
          td: ({ children }) => (
            <td className="border border-white/10 px-4 py-2 text-white/70">
              {children}
            </td>
          ),
        }}
      >
        {content || 'Your rendered preview will appear here...'}
      </ReactMarkdown>
    </div>
  );
}
