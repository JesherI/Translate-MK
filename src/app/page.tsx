'use client';

import { 
  ArrowRight, 
  Code2, 
  FileText, 
  FileCode,
  Zap, 
  Shield, 
  ExternalLink,
  Play,
  Sun,
  Moon,
  Globe
} from 'lucide-react';
import Link from 'next/link';
import AnimatedBackground from './components/AnimatedBackground';

export default function Home() {
  return (
    <main className="min-h-screen text-white font-sans selection:bg-white selection:text-black relative overflow-hidden">
      <AnimatedBackground />
      
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-white/10 backdrop-blur-xl bg-black/30">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center">
              <FileCode className="w-5 h-5 text-black" />
            </div>
            <span className="text-lg font-semibold tracking-tight">Translate-MK</span>
          </div>
          <div className="flex items-center gap-4">
            {/* Language Selector */}
            <button className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-white/10 text-white/60 hover:text-white hover:border-white/30 transition-all text-sm">
              <Globe className="w-4 h-4" />
              <span>EN</span>
            </button>
            {/* Theme Toggle */}
            <button className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-white/10 text-white/60 hover:text-white hover:border-white/30 transition-all text-sm">
              <Sun className="w-4 h-4" />
            </button>
            <div className="w-px h-4 bg-white/20" />
            <a 
              href="https://github.com/JesherI/Translate-MK" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm text-white/60 hover:text-white transition-colors"
            >
              <ExternalLink className="w-4 h-4" />
              GitHub
            </a>
            <span className="text-sm text-white/40">v0.2.0</span>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-6">
        <div className="max-w-5xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 text-sm text-white/60 mb-8">
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            Professional Markdown Editor & Preview
          </div>

          {/* Title */}
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6">
            <span className="bg-gradient-to-b from-white via-white/90 to-white/30 bg-clip-text text-transparent">
              Markdown Editor
            </span>
            <br />
            <span className="text-white/30">with Live Preview</span>
          </h1>

          {/* Subtitle */}
          <p className="text-xl text-white/50 max-w-3xl mx-auto leading-relaxed mb-10">
            A professional tool for writing and previewing Markdown in real-time. 
            Write documentation, notes, and content with instant rendered preview, 
            auto-save, and export capabilities. Supports GitHub Flavored Markdown.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/editor"
              className="group flex items-center gap-2 px-8 py-4 rounded-xl bg-white text-black font-medium transition-all hover:bg-white/90 hover:scale-105"
            >
              <Play className="w-5 h-5" />
              Open Editor
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <a
              href="#features"
              className="flex items-center gap-2 px-8 py-4 rounded-xl border border-white/10 text-white/70 hover:text-white hover:border-white/30 transition-all"
            >
              Learn More
            </a>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 px-6 relative">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-white mb-4">How It Works</h2>
            <p className="text-white/50">Write Markdown on the left, see rendered preview on the right</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {/* Markdown Input */}
            <div className="p-8 rounded-2xl border border-white/10 bg-white/[0.02] backdrop-blur-sm">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-blue-500/20 flex items-center justify-center">
                  <Code2 className="w-5 h-5 text-blue-400" />
                </div>
                <h3 className="text-xl font-semibold">Markdown Input</h3>
              </div>
              <div className="p-4 rounded-lg bg-white/5 border border-white/10 font-mono text-sm overflow-x-auto">
                <pre className="text-white/70 whitespace-pre-wrap">{`# Project Documentation

## Features
- **Real-time** preview
- *Auto-save* functionality
- Code syntax highlighting

| Feature | Status |
|---------|--------|
| Preview | ✓ Ready |
| Export | ✓ Ready |
| Save | ✓ Ready |

\`\`\`javascript
console.log("Hello World");
\`\`\``}</pre>
              </div>
            </div>

            {/* Rendered Preview */}
            <div className="p-8 rounded-2xl border border-white/10 bg-white/[0.02] backdrop-blur-sm">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-green-500/20 flex items-center justify-center">
                  <FileText className="w-5 h-5 text-green-400" />
                </div>
                <h3 className="text-xl font-semibold">Rendered Preview</h3>
              </div>
              <div className="p-4 rounded-lg bg-white/5 border border-white/10 prose prose-invert prose-sm max-w-none">
                <h1 className="text-2xl font-bold text-white mb-2">Project Documentation</h1>
                <h2 className="text-xl font-semibold text-white/90 mt-4 mb-2">Features</h2>
                <ul className="list-disc list-inside text-white/70 space-y-1">
                  <li><strong>Real-time</strong> preview</li>
                  <li><em>Auto-save</em> functionality</li>
                  <li>Code syntax highlighting</li>
                </ul>
                <table className="w-full border-collapse border border-white/10 mt-4 text-sm">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="border border-white/10 px-3 py-2 text-left">Feature</th>
                      <th className="border border-white/10 px-3 py-2 text-left">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 text-white/70">Preview</td>
                      <td className="border border-white/10 px-3 py-2 text-green-400">✓ Ready</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 text-white/70">Export</td>
                      <td className="border border-white/10 px-3 py-2 text-green-400">✓ Ready</td>
                    </tr>
                    <tr>
                      <td className="border border-white/10 px-3 py-2 text-white/70">Save</td>
                      <td className="border border-white/10 px-3 py-2 text-green-400">✓ Ready</td>
                    </tr>
                  </tbody>
                </table>
                <pre className="bg-white/5 p-3 rounded mt-4 text-white/70 text-sm overflow-x-auto"><code>console.log(&quot;Hello World&quot;);</code></pre>
              </div>
            </div>
          </div>

          {/* Syntax Support */}
          <div className="p-8 rounded-2xl border border-white/10 bg-white/[0.02]">
            <h3 className="text-xl font-semibold text-white mb-6 text-center">Supported Markdown Syntax</h3>
            <div className="grid md:grid-cols-4 gap-4 text-sm">
              <div className="p-4 rounded-xl bg-white/5">
                <h4 className="font-medium text-white mb-2">Headers</h4>
                <code className="text-white/50"># H1, ## H2, ### H3</code>
              </div>
              <div className="p-4 rounded-xl bg-white/5">
                <h4 className="font-medium text-white mb-2">Emphasis</h4>
                <code className="text-white/50">**bold**, *italic*</code>
              </div>
              <div className="p-4 rounded-xl bg-white/5">
                <h4 className="font-medium text-white mb-2">Lists</h4>
                <code className="text-white/50">- item, 1. item</code>
              </div>
              <div className="p-4 rounded-xl bg-white/5">
                <h4 className="font-medium text-white mb-2">Tables</h4>
                <code className="text-white/50">| col1 | col2 |</code>
              </div>
              <div className="p-4 rounded-xl bg-white/5">
                <h4 className="font-medium text-white mb-2">Code</h4>
                <code className="text-white/50">`inline` or ```blocks```</code>
              </div>
              <div className="p-4 rounded-xl bg-white/5">
                <h4 className="font-medium text-white mb-2">Links</h4>
                <code className="text-white/50">[text](url)</code>
              </div>
              <div className="p-4 rounded-xl bg-white/5">
                <h4 className="font-medium text-white mb-2">Images</h4>
                <code className="text-white/50">![alt](image.png)</code>
              </div>
              <div className="p-4 rounded-xl bg-white/5">
                <h4 className="font-medium text-white mb-2">Quotes</h4>
                <code className="text-white/50">&gt; blockquote</code>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" className="py-20 px-6 relative">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-white mb-4">Features</h2>
            <p className="text-white/50">Everything you need for Markdown editing</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: <Zap className="w-6 h-6" />,
                title: 'Real-time Preview',
                description: 'See your rendered Markdown instantly as you type. No button clicks needed.'
              },
              {
                icon: <Shield className="w-6 h-6" />,
                title: 'Auto-Save',
                description: 'Your content is automatically saved to browser LocalStorage.'
              },
              {
                icon: <Code2 className="w-6 h-6" />,
                title: 'GitHub Flavored',
                description: 'Full support for tables, code blocks, strikethrough, and more.'
              },
              {
                icon: <FileText className="w-6 h-6" />,
                title: 'Import & Export',
                description: 'Drag & drop files or export as .md or .html formats.'
              },
              {
                icon: <Globe className="w-6 h-6" />,
                title: 'Multi-language',
                description: 'Interface available in multiple languages (coming soon).'
              },
              {
                icon: <Sun className="w-6 h-6" />,
                title: 'Theme Support',
                description: 'Dark mode by default, light mode coming soon.'
              }
            ].map((feature, i) => (
              <div 
                key={i}
                className="group p-6 rounded-2xl border border-white/10 bg-white/[0.02] hover:bg-white/[0.04] hover:border-white/20 transition-all"
              >
                <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center mb-4 text-white/60 group-hover:text-white group-hover:bg-white/10 transition-all">
                  {feature.icon}
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">{feature.title}</h3>
                <p className="text-sm text-white/40 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 relative">
        <div className="max-w-4xl mx-auto text-center">
          <div className="p-12 rounded-3xl border border-white/10 bg-gradient-to-b from-white/[0.05] to-transparent">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Ready to write?
            </h2>
            <p className="text-white/50 mb-8 max-w-lg mx-auto">
              Start using Translate-MK now. No signup required, works entirely in your browser.
            </p>
            <Link
              href="/editor"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-white text-black font-medium transition-all hover:bg-white/90 hover:scale-105"
            >
              <Play className="w-5 h-5" />
              Launch Editor
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 py-8 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-white/40">
          <span>Translate-MK © 2026</span>
          <span>Built with Next.js + Tailwind CSS</span>
        </div>
      </footer>
    </main>
  );
}
