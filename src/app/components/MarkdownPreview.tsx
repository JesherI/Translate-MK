'use client';

import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface MarkdownPreviewProps {
  content: string;
  isDark?: boolean;
}

export default function MarkdownPreview({ content, isDark = true }: MarkdownPreviewProps) {
  return (
    <div className={`prose prose-sm max-w-none h-full overflow-auto ${isDark ? 'prose-invert' : 'prose-gray'}`}>
      <ReactMarkdown 
        remarkPlugins={[remarkGfm]}
        components={{
          h1: ({ children }) => (
            <h1 className={`text-3xl font-bold mb-4 pb-2 border-b ${isDark ? 'text-white border-white/10' : 'text-gray-900 border-gray-200'}`}>
              {children}
            </h1>
          ),
          h2: ({ children }) => (
            <h2 className={`text-2xl font-semibold mb-3 mt-6 ${isDark ? 'text-white/90' : 'text-gray-800'}`}>
              {children}
            </h2>
          ),
          h3: ({ children }) => (
            <h3 className={`text-xl font-semibold mb-2 mt-4 ${isDark ? 'text-white/80' : 'text-gray-700'}`}>
              {children}
            </h3>
          ),
          p: ({ children }) => (
            <p className={`mb-4 leading-relaxed ${isDark ? 'text-white/70' : 'text-gray-600'}`}>
              {children}
            </p>
          ),
          strong: ({ children }) => (
            <strong className={`font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
              {children}
            </strong>
          ),
          em: ({ children }) => (
            <em className={`italic ${isDark ? 'text-white/80' : 'text-gray-700'}`}>
              {children}
            </em>
          ),
          code: ({ children }) => (
            <code className={`px-1.5 py-0.5 rounded text-sm font-mono ${isDark ? 'bg-white/10 text-white/90' : 'bg-gray-100 text-gray-800'}`}>
              {children}
            </code>
          ),
          pre: ({ children }) => (
            <pre className={`rounded-lg p-4 overflow-x-auto mb-4 ${isDark ? 'bg-white/5 border border-white/10' : 'bg-gray-100 border border-gray-200'}`}>
              {children}
            </pre>
          ),
          ul: ({ children }) => (
            <ul className={`list-disc list-inside mb-4 space-y-1 ${isDark ? 'text-white/70' : 'text-gray-600'}`}>
              {children}
            </ul>
          ),
          ol: ({ children }) => (
            <ol className={`list-decimal list-inside mb-4 space-y-1 ${isDark ? 'text-white/70' : 'text-gray-600'}`}>
              {children}
            </ol>
          ),
          li: ({ children }) => (
            <li className={isDark ? 'text-white/70' : 'text-gray-600'}>
              {children}
            </li>
          ),
          a: ({ children, href }) => (
            <a 
              href={href}
              className="text-blue-500 hover:text-blue-600 underline transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              {children}
            </a>
          ),
          blockquote: ({ children }) => (
            <blockquote className={`border-l-4 pl-4 italic mb-4 ${isDark ? 'border-white/20 text-white/60' : 'border-gray-300 text-gray-500'}`}>
              {children}
            </blockquote>
          ),
          hr: () => (
            <hr className={`my-6 ${isDark ? 'border-white/10' : 'border-gray-200'}`} />
          ),
          table: ({ children }) => (
            <div className="overflow-x-auto mb-4">
              <table className={`w-full border-collapse border ${isDark ? 'border-white/10' : 'border-gray-200'}`}>
                {children}
              </table>
            </div>
          ),
          thead: ({ children }) => (
            <thead className={isDark ? 'bg-white/5' : 'bg-gray-50'}>
              {children}
            </thead>
          ),
          th: ({ children }) => (
            <th className={`border px-4 py-2 text-left font-semibold ${isDark ? 'border-white/10 text-white' : 'border-gray-200 text-gray-900'}`}>
              {children}
            </th>
          ),
          td: ({ children }) => (
            <td className={`border px-4 py-2 ${isDark ? 'border-white/10 text-white/70' : 'border-gray-200 text-gray-600'}`}>
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
