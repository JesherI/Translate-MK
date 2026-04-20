'use client';

import { useState, useEffect } from 'react';
import { 
  Code, 
  Download, 
  Upload, 
  Trash2,
  ArrowLeft,
  FileUp,
  Eye
} from 'lucide-react';
import Link from 'next/link';
import AnimatedBackground from '../components/AnimatedBackground';
import MarkdownPreview from '../components/MarkdownPreview';

export default function Editor() {
  const [markdownText, setMarkdownText] = useState<string>('');
  const [fileName, setFileName] = useState<string>('');
  const [showImportModal, setShowImportModal] = useState(false);
  const [activeTab, setActiveTab] = useState<'edit' | 'preview'>('edit');

  // Load from localStorage on mount
  useEffect(() => {
    const savedMarkdown = localStorage.getItem('translate-mk-markdown');
    const savedFileName = localStorage.getItem('translate-mk-filename');
    
    if (savedMarkdown) {
      setMarkdownText(savedMarkdown);
    } else {
      // Default example content
      const example = `# Welcome to Translate-MK

## What is this?
This is a **real-time Markdown preview** editor with instant rendering.

## Features:
- ⚡ Instant preview
- 💾 Auto-save to browser
- 📁 Import & Export files
- 🎨 Beautiful rendering

## How to use:
1. Type Markdown on the left
2. See formatted preview on the right
3. Export when ready

**Happy writing!** ✨`;
      setMarkdownText(example);
    }
    
    if (savedFileName) {
      setFileName(savedFileName);
    }
  }, []);

  // Save to localStorage whenever content changes
  useEffect(() => {
    localStorage.setItem('translate-mk-markdown', markdownText);
    localStorage.setItem('translate-mk-filename', fileName);
  }, [markdownText, fileName]);

  const handleMarkdownChange = (value: string) => {
    setMarkdownText(value);
  };

  const clearAll = () => {
    if (confirm('Are you sure you want to clear all content?')) {
      setMarkdownText('');
      setFileName('');
      localStorage.removeItem('translate-mk-markdown');
      localStorage.removeItem('translate-mk-filename');
    }
  };

  const exportFile = (format: 'md' | 'html') => {
    let content = '';
    let extension = '';
    
    if (format === 'md') {
      content = markdownText;
      extension = 'md';
    } else if (format === 'html') {
      content = `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>${fileName || 'Document'}</title>
  <style>
    body { font-family: system-ui, sans-serif; max-width: 800px; margin: 40px auto; padding: 0 20px; line-height: 1.6; color: #333; }
    h1, h2, h3 { color: #111; }
    code { background: #f4f4f4; padding: 2px 6px; border-radius: 3px; font-family: monospace; }
    pre { background: #f4f4f4; padding: 16px; border-radius: 8px; overflow-x: auto; }
    blockquote { border-left: 4px solid #ddd; margin: 0; padding-left: 16px; color: #666; }
    ul, ol { padding-left: 20px; }
    a { color: #0066cc; }
  </style>
</head>
<body>
<!-- Content would be rendered Markdown here -->
<pre style="white-space: pre-wrap;">${markdownText.replace(/</g, '&lt;').replace(/>/g, '&gt;')}</pre>
</body>
</html>`;
      extension = 'html';
    }
    
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${fileName || 'document'}.${extension}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleFileImport = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const content = e.target?.result as string;
      setFileName(file.name.replace(/\.[^/.]+$/, ''));
      setMarkdownText(content);
      setShowImportModal(false);
    };
    reader.readAsText(file);
  };

  const dropFile = (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file && (file.name.endsWith('.md') || file.name.endsWith('.txt') || file.name.endsWith('.html'))) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const content = event.target?.result as string;
        setFileName(file.name.replace(/\.[^/.]+$/, ''));
        setMarkdownText(content);
      };
      reader.readAsText(file);
    }
  };

  return (
    <main 
      className="min-h-screen text-white font-sans selection:bg-white selection:text-black relative"
      onDragOver={(e) => e.preventDefault()}
      onDrop={dropFile}
    >
      <AnimatedBackground />
      
      {/* Header */}
      <header className="border-b border-white/10 backdrop-blur-xl bg-black/30 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link 
              href="/" 
              className="flex items-center gap-2 text-white/60 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back
            </Link>
            <div className="w-px h-4 bg-white/20" />
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center">
                <Code className="w-5 h-5 text-black" />
              </div>
              <span className="text-lg font-semibold tracking-tight">Translate-MK Editor</span>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <input
              type="text"
              placeholder="Document name..."
              value={fileName}
              onChange={(e) => setFileName(e.target.value)}
              className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-white/30"
            />
            <button
              onClick={() => setShowImportModal(true)}
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-white/10 text-white/60 hover:text-white hover:border-white/30 transition-all text-sm"
            >
              <Upload className="w-4 h-4" />
              Import
            </button>
            <div className="flex items-center gap-1 rounded-lg border border-white/10 overflow-hidden">
              <button
                onClick={() => exportFile('md')}
                className="flex items-center gap-1 px-3 py-1.5 text-white/60 hover:text-white hover:bg-white/5 transition-all text-sm"
              >
                <Download className="w-4 h-4" />
                .md
              </button>
            </div>
            <button
              onClick={clearAll}
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-red-500/30 text-red-400 hover:bg-red-500/10 transition-all text-sm"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </div>
      </header>

      {/* Editor */}
      <section className="py-6 px-6 relative z-10">
        <div className="max-w-7xl mx-auto">
          {/* Mobile Tabs */}
          <div className="md:hidden flex items-center gap-2 mb-4 p-1 rounded-xl border border-white/10 bg-white/5">
            <button
              onClick={() => setActiveTab('edit')}
              className={`flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-lg text-sm transition-all ${
                activeTab === 'edit' 
                  ? 'bg-white text-black' 
                  : 'text-white/60 hover:text-white'
              }`}
            >
              <Code className="w-4 h-4" />
              Edit
            </button>
            <button
              onClick={() => setActiveTab('preview')}
              className={`flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-lg text-sm transition-all ${
                activeTab === 'preview' 
                  ? 'bg-white text-black' 
                  : 'text-white/60 hover:text-white'
              }`}
            >
              <Eye className="w-4 h-4" />
              Preview
            </button>
          </div>

          {/* Info Bar - Desktop only */}
          <div className="hidden md:flex items-center justify-between mb-4 text-sm text-white/40">
            <div className="flex items-center gap-4">
              <span>{markdownText.length} characters</span>
              <span>•</span>
              <span>{markdownText.split('\n').length} lines</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              <span>Auto-saving to browser</span>
            </div>
          </div>

          {/* Editor Grid */}
          <div className="grid md:grid-cols-2 gap-6">
            {/* Markdown Input */}
            <div className={`group relative ${activeTab === 'preview' ? 'hidden md:block' : ''}`}>
              <div className="absolute -inset-0.5 rounded-2xl bg-gradient-to-r from-blue-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity blur-sm" />
              <div className="relative rounded-2xl border border-white/10 bg-black/40 backdrop-blur-md overflow-hidden h-[calc(100vh-240px)] md:h-[calc(100vh-280px)]">
                <div className="flex items-center justify-between px-4 py-3 border-b border-white/10 bg-white/5">
                  <span className="text-sm font-medium text-white/60 flex items-center gap-2">
                    <Code className="w-4 h-4 text-blue-400" />
                    Markdown Input
                  </span>
                  <span className="text-xs text-white/40">Supports: # ** * ` [] -</span>
                </div>
                <textarea
                  value={markdownText}
                  onChange={(e) => handleMarkdownChange(e.target.value)}
                  placeholder="# Start typing your markdown here...\n\n## Features\n- **Bold** and *italic* text\n- `Code` blocks\n- [Links](url)\n- Tables, lists, and more!"
                  className="w-full h-[calc(100%-48px)] p-4 bg-transparent text-sm font-mono leading-relaxed resize-none focus:outline-none text-white/90 placeholder:text-white/20"
                  spellCheck={false}
                />
              </div>
            </div>

            {/* Preview Output */}
            <div className={`group relative ${activeTab === 'edit' ? 'hidden md:block' : ''}`}>
              <div className="absolute -inset-0.5 rounded-2xl bg-gradient-to-r from-green-500/20 to-emerald-500/20 opacity-0 group-hover:opacity-100 transition-opacity blur-sm" />
              <div className="relative rounded-2xl border border-white/10 bg-black/40 backdrop-blur-md overflow-hidden h-[calc(100vh-240px)] md:h-[calc(100vh-280px)]">
                <div className="flex items-center justify-between px-4 py-3 border-b border-white/10 bg-white/5">
                  <span className="text-sm font-medium text-white/60 flex items-center gap-2">
                    <Eye className="w-4 h-4 text-green-400" />
                    Preview
                  </span>
                  <span className="text-xs text-white/40">Rendered Markdown</span>
                </div>
                <div className="h-[calc(100%-48px)] p-4 overflow-auto">
                  <MarkdownPreview content={markdownText} />
                </div>
              </div>
            </div>
          </div>

          {/* Tips */}
          <div className="mt-6 grid md:grid-cols-3 gap-4 text-sm">
            <div className="p-4 rounded-xl border border-white/10 bg-white/[0.02]">
              <h4 className="font-medium text-white mb-1">📝 Markdown Syntax</h4>
              <p className="text-white/40">Use # for headers, **bold**, *italic*, `code`, - for lists</p>
            </div>
            <div className="p-4 rounded-xl border border-white/10 bg-white/[0.02]">
              <h4 className="font-medium text-white mb-1">💾 Auto-Save</h4>
              <p className="text-white/40">Content is saved to browser storage automatically</p>
            </div>
            <div className="p-4 rounded-xl border border-white/10 bg-white/[0.02]">
              <h4 className="font-medium text-white mb-1">📤 Import/Export</h4>
              <p className="text-white/40">Drag & drop files or use the import button</p>
            </div>
          </div>
        </div>
      </section>

      {/* Import Modal */}
      {showImportModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
          <div className="p-8 rounded-2xl border border-white/10 bg-black/90 max-w-md w-full mx-4">
            <h3 className="text-xl font-semibold text-white mb-4">Import File</h3>
            <p className="text-white/60 mb-6">Select a .md or .txt file to import</p>
            <label className="flex flex-col items-center justify-center p-8 rounded-xl border-2 border-dashed border-white/20 hover:border-white/40 transition-colors cursor-pointer">
              <FileUp className="w-8 h-8 text-white/40 mb-3" />
              <span className="text-white/60">Click to select file</span>
              <input
                type="file"
                accept=".md,.txt"
                onChange={handleFileImport}
                className="hidden"
              />
            </label>
            <button
              onClick={() => setShowImportModal(false)}
              className="mt-6 w-full py-2 rounded-lg border border-white/10 text-white/60 hover:text-white hover:border-white/30 transition-all"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </main>
  );
}
