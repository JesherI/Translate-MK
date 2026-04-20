'use client';

import { useState, useEffect } from 'react';
import { 
  Code, 
  Download, 
  Upload, 
  Trash2,
  ArrowLeft,
  FileUp,
  Eye,
  Sun,
  Moon,
  Globe
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import AnimatedBackground from '../components/AnimatedBackground';
import MarkdownPreview from '../components/MarkdownPreview';
import { useI18n } from '../hooks/useI18n';
import { useTheme } from '../hooks/useTheme';

export default function Editor() {
  const { t, language, toggleLanguage } = useI18n();
  const { theme, toggleTheme, isDark } = useTheme();
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
      const example = language === 'es' 
        ? `# Documentación del Proyecto

## Descripción General
Este es un **editor profesional de Markdown** con capacidades de vista previa en tiempo real.

## Características
| Característica | Descripción | Estado |
|----------------|-------------|--------|
| Vista Previa | Renderizado instantáneo | ✅ Activo |
| Auto-Guardado | Almacenamiento automático | ✅ Activo |
| Resaltado | Bloques de código con formato | ✅ Activo |
| Exportación | Múltiples formatos | ✅ Activo |

## Ejemplo de Código
\`\`\`javascript
// Función de ejemplo
function saludar(nombre) {
  return \`¡Hola, \${nombre}!\`;
}

console.log(saludar("Mundo"));
\`\`\`

## Empezar
1. Escribe tu contenido Markdown
2. Ve la vista previa renderizada
3. Exporta cuando estés satisfecho

> **Nota:** Todo el contenido se guarda automáticamente en el almacenamiento local.

---
*Hecho con Next.js y React* ✨`
        : `# Project Documentation

## Overview
This is a **professional Markdown editor** with real-time preview capabilities.

## Features
| Feature | Description | Status |
|---------|-------------|--------|
| Real-time Preview | Instant rendering | ✅ Active |
| Auto-Save | Automatic storage | ✅ Active |
| Syntax Highlight | Code formatting | ✅ Active |
| Export | Multiple formats | ✅ Active |

## Code Example
\`\`\`javascript
// Example function
function greet(name) {
  return \`Hello, \${name}!\`;
}

console.log(greet("World"));
\`\`\`

## Getting Started
1. Type your Markdown content
2. View the rendered preview
3. Export when satisfied

> **Note:** All content is automatically saved to local storage.

---
*Built with Next.js and React* ✨`;
      setMarkdownText(example);
    }
    
    if (savedFileName) {
      setFileName(savedFileName);
    }
  }, [language]);

  // Save to localStorage whenever content changes
  useEffect(() => {
    localStorage.setItem('translate-mk-markdown', markdownText);
    localStorage.setItem('translate-mk-filename', fileName);
  }, [markdownText, fileName]);

  const handleMarkdownChange = (value: string) => {
    setMarkdownText(value);
  };

  const clearAll = () => {
    const message = language === 'es' 
      ? '¿Estás seguro de que quieres borrar todo el contenido?'
      : 'Are you sure you want to clear all content?';
    if (confirm(message)) {
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
      className={`min-h-screen font-sans selection:bg-white selection:text-black relative ${isDark ? 'text-white' : 'text-gray-900'}`}
      onDragOver={(e) => e.preventDefault()}
      onDrop={dropFile}
    >
      <AnimatedBackground theme={theme} />
      
      {/* Header */}
      <header className={`border-b backdrop-blur-xl sticky top-0 z-50 ${isDark ? 'border-white/10 bg-black/30' : 'border-gray-200/50 bg-white/70'}`}>
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link 
              href="/" 
              className={`flex items-center gap-2 transition-colors ${isDark ? 'text-white/60 hover:text-white' : 'text-gray-600 hover:text-gray-900'}`}
            >
              <ArrowLeft className="w-4 h-4" />
              {t('nav.back')}
            </Link>
            <div className={`w-px h-4 ${isDark ? 'bg-white/20' : 'bg-gray-300'}`} />
            <div className="flex items-center gap-3">
              <Image 
                src="/logo.svg" 
                alt="Translate-MK Logo" 
                width={32} 
                height={32} 
                className="rounded-lg shadow-lg"
              />
              <span className="text-lg font-semibold tracking-tight">{t('nav.editor')}</span>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <input
              type="text"
              placeholder={t('editor.documentName')}
              value={fileName}
              onChange={(e) => setFileName(e.target.value)}
              className={`px-3 py-1.5 rounded-lg border text-sm focus:outline-none focus:border-opacity-50 ${
                isDark 
                  ? 'bg-white/5 border-white/10 text-white placeholder:text-white/30 focus:border-white/30' 
                  : 'bg-gray-100 border-gray-300 text-gray-900 placeholder:text-gray-400 focus:border-gray-400'
              }`}
            />
            <button
              onClick={() => setShowImportModal(true)}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border text-sm transition-all ${
                isDark 
                  ? 'border-white/10 text-white/60 hover:text-white hover:border-white/30' 
                  : 'border-gray-300 text-gray-600 hover:text-gray-900 hover:border-gray-400'
              }`}
            >
              <Upload className="w-4 h-4" />
              {t('editor.import')}
            </button>
            <div className={`flex items-center gap-1 rounded-lg border overflow-hidden ${isDark ? 'border-white/10' : 'border-gray-300'}`}>
              <button
                onClick={() => exportFile('md')}
                className={`flex items-center gap-1 px-3 py-1.5 text-sm transition-all ${
                  isDark 
                    ? 'text-white/60 hover:text-white hover:bg-white/5' 
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                }`}
              >
                <Download className="w-4 h-4" />
                .md
              </button>
            </div>
            <button
              onClick={toggleTheme}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border text-sm transition-all ${
                isDark 
                  ? 'border-white/10 text-white/60 hover:text-white hover:border-white/30' 
                  : 'border-gray-300 text-gray-600 hover:text-gray-900 hover:border-gray-400'
              }`}
            >
              {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>
            <button
              onClick={toggleLanguage}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border text-sm transition-all ${
                isDark 
                  ? 'border-white/10 text-white/60 hover:text-white hover:border-white/30' 
                  : 'border-gray-300 text-gray-600 hover:text-gray-900 hover:border-gray-400'
              }`}
            >
              <Globe className="w-4 h-4" />
              <span className="uppercase">{language}</span>
            </button>
            <button
              onClick={clearAll}
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-red-500/30 text-red-400 hover:bg-red-500/10 transition-all text-sm"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </div>
      </header>

      {/* Editor - Static height container, internal scroll */}
      <section className="py-6 px-6 relative z-10">
        <div className="max-w-7xl mx-auto">
          {/* Mobile Tabs */}
          <div className={`md:hidden flex items-center gap-2 mb-4 p-1 rounded-xl border ${isDark ? 'border-white/10 bg-white/5' : 'border-gray-300 bg-gray-100'}`}>
            <button
              onClick={() => setActiveTab('edit')}
              className={`flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-lg text-sm transition-all ${
                activeTab === 'edit' 
                  ? 'bg-white text-black shadow-sm' 
                  : isDark ? 'text-white/60 hover:text-white' : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <Code className="w-4 h-4" />
              Edit
            </button>
            <button
              onClick={() => setActiveTab('preview')}
              className={`flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-lg text-sm transition-all ${
                activeTab === 'preview' 
                  ? 'bg-white text-black shadow-sm' 
                  : isDark ? 'text-white/60 hover:text-white' : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <Eye className="w-4 h-4" />
              {t('editor.preview')}
            </button>
          </div>

          {/* Info Bar - Desktop only */}
          <div className={`hidden md:flex items-center justify-between mb-4 text-sm ${isDark ? 'text-white/40' : 'text-gray-500'}`}>
            <div className="flex items-center gap-4">
              <span>{markdownText.length} {t('editor.characters')}</span>
              <span>•</span>
              <span>{markdownText.split('\n').length} {t('editor.lines')}</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              <span>{t('editor.autoSave')}</span>
            </div>
          </div>

          {/* Editor Grid - Static height with internal scroll only */}
          <div className="grid md:grid-cols-2 gap-6 h-[400px] md:h-[500px] lg:h-[550px]">
            {/* Markdown Input */}
            <div className={`group relative h-full ${activeTab === 'preview' ? 'hidden md:block' : ''}`}>
              <div className="absolute -inset-0.5 rounded-2xl bg-gradient-to-r from-blue-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity blur-sm" />
              <div className={`relative h-full rounded-2xl border backdrop-blur-md overflow-hidden flex flex-col ${isDark ? 'border-white/10 bg-black/40' : 'border-gray-200 bg-white/70'}`}>
                <div className={`flex items-center justify-between px-4 py-3 border-b flex-shrink-0 ${isDark ? 'border-white/10 bg-white/5' : 'border-gray-200 bg-gray-50'}`}>
                  <span className={`text-sm font-medium flex items-center gap-2 ${isDark ? 'text-white/60' : 'text-gray-700'}`}>
                    <Code className="w-4 h-4 text-blue-400" />
                    {t('editor.markdownInput')}
                  </span>
                  <span className={`text-xs ${isDark ? 'text-white/40' : 'text-gray-500'}`}>{t('editor.supports')}</span>
                </div>
                <textarea
                  value={markdownText}
                  onChange={(e) => handleMarkdownChange(e.target.value)}
                  placeholder={t('editor.placeholder')}
                  className={`flex-1 w-full p-4 text-sm font-mono leading-relaxed resize-none focus:outline-none overflow-auto ${
                    isDark 
                      ? 'bg-transparent text-white/90 placeholder:text-white/20' 
                      : 'bg-transparent text-gray-900 placeholder:text-gray-400'
                  }`}
                  spellCheck={false}
                />
              </div>
            </div>

            {/* Preview Output */}
            <div className={`group relative h-full ${activeTab === 'edit' ? 'hidden md:block' : ''}`}>
              <div className="absolute -inset-0.5 rounded-2xl bg-gradient-to-r from-green-500/20 to-emerald-500/20 opacity-0 group-hover:opacity-100 transition-opacity blur-sm" />
              <div className={`relative h-full rounded-2xl border backdrop-blur-md overflow-hidden flex flex-col ${isDark ? 'border-white/10 bg-black/40' : 'border-gray-200 bg-white/70'}`}>
                <div className={`flex items-center justify-between px-4 py-3 border-b flex-shrink-0 ${isDark ? 'border-white/10 bg-white/5' : 'border-gray-200 bg-gray-50'}`}>
                  <span className={`text-sm font-medium flex items-center gap-2 ${isDark ? 'text-white/60' : 'text-gray-700'}`}>
                    <Eye className="w-4 h-4 text-green-400" />
                    {t('editor.preview')}
                  </span>
                  <span className={`text-xs ${isDark ? 'text-white/40' : 'text-gray-500'}`}>{t('editor.rendered')}</span>
                </div>
                <div className="flex-1 p-4 overflow-auto">
                  <MarkdownPreview content={markdownText} isDark={isDark} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Import Modal */}
      {showImportModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
          <div className={`p-8 rounded-2xl border max-w-md w-full mx-4 ${isDark ? 'border-white/10 bg-black/90' : 'border-gray-300 bg-white'}`}>
            <h3 className="text-xl font-semibold mb-4">{t('editor.importTitle')}</h3>
            <p className={`mb-6 ${isDark ? 'text-white/60' : 'text-gray-600'}`}>{t('editor.importDesc')}</p>
            <label className={`flex flex-col items-center justify-center p-8 rounded-xl border-2 border-dashed transition-colors cursor-pointer ${isDark ? 'border-white/20 hover:border-white/40' : 'border-gray-300 hover:border-gray-400'}`}>
              <FileUp className={`w-8 h-8 mb-3 ${isDark ? 'text-white/40' : 'text-gray-400'}`} />
              <span className={isDark ? 'text-white/60' : 'text-gray-600'}>{t('editor.selectFile')}</span>
              <input
                type="file"
                accept=".md,.txt"
                onChange={handleFileImport}
                className="hidden"
              />
            </label>
            <button
              onClick={() => setShowImportModal(false)}
              className={`mt-6 w-full py-2 rounded-lg border transition-all ${isDark ? 'border-white/10 text-white/60 hover:text-white hover:border-white/30' : 'border-gray-300 text-gray-600 hover:text-gray-900 hover:border-gray-400'}`}
            >
              {t('editor.cancel')}
            </button>
          </div>
        </div>
      )}
    </main>
  );
}