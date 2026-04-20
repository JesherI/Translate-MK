'use client';

import { 
  ArrowRight, 
  Code2, 
  FileText, 
  Sparkles, 
  Zap, 
  Shield, 
  ExternalLink,
  Play
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
              <Sparkles className="w-5 h-5 text-black" />
            </div>
            <span className="text-lg font-semibold tracking-tight">Translate-MK</span>
          </div>
          <div className="flex items-center gap-6">
            <a 
              href="https://github.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm text-white/60 hover:text-white transition-colors"
            >
              <ExternalLink className="w-4 h-4" />
              GitHub
            </a>
            <span className="text-sm text-white/40">v0.1.0</span>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-6">
        <div className="max-w-5xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 text-sm text-white/60 mb-8">
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            Now with LocalStorage & File Import
          </div>

          {/* Title */}
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6">
            <span className="bg-gradient-to-b from-white via-white/90 to-white/30 bg-clip-text text-transparent">
              Markdown &harr; Plain Text
            </span>
            <br />
            <span className="text-white/30">Real-time Converter</span>
          </h1>

          {/* Subtitle */}
          <p className="text-xl text-white/50 max-w-2xl mx-auto leading-relaxed mb-10">
            A beautiful, bidirectional converter that transforms Markdown syntax into clean plain text 
            and vice versa. Perfect for documentation, notes, and content workflows.
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
            <p className="text-white/50">Simple, fast, and intuitive bidirectional conversion</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Markdown to Text */}
            <div className="p-8 rounded-2xl border border-white/10 bg-white/[0.02] backdrop-blur-sm">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-blue-500/20 flex items-center justify-center">
                  <Code2 className="w-5 h-5 text-blue-400" />
                </div>
                <h3 className="text-xl font-semibold">Markdown → Text</h3>
              </div>
              <div className="space-y-3 font-mono text-sm">
                <div className="p-3 rounded-lg bg-white/5 border border-white/10">
                  <span className="text-white/40">Input:</span>
                  <pre className="mt-2 text-white/70"># Hello World{'\n'}**Bold** and *italic*</pre>
                </div>
                <div className="flex justify-center">
                  <ArrowRight className="w-5 h-5 text-white/30 rotate-90" />
                </div>
                <div className="p-3 rounded-lg bg-white/5 border border-white/10">
                  <span className="text-white/40">Output:</span>
                  <pre className="mt-2 text-white/70">Hello World{'\n'}Bold and italic</pre>
                </div>
              </div>
            </div>

            {/* Text to Markdown */}
            <div className="p-8 rounded-2xl border border-white/10 bg-white/[0.02] backdrop-blur-sm">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-green-500/20 flex items-center justify-center">
                  <FileText className="w-5 h-5 text-green-400" />
                </div>
                <h3 className="text-xl font-semibold">Text → Markdown</h3>
              </div>
              <div className="space-y-3 font-mono text-sm">
                <div className="p-3 rounded-lg bg-white/5 border border-white/10">
                  <span className="text-white/40">Input:</span>
                  <pre className="mt-2 text-white/70">Just plain text{'\n'}No formatting here</pre>
                </div>
                <div className="flex justify-center">
                  <ArrowRight className="w-5 h-5 text-white/30 rotate-90" />
                </div>
                <div className="p-3 rounded-lg bg-white/5 border border-white/10">
                  <span className="text-white/40">Output:</span>
                  <pre className="mt-2 text-white/70">Just plain text{'\n'}No formatting here</pre>
                </div>
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
            <p className="text-white/50">Everything you need for Markdown conversion</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: <Zap className="w-6 h-6" />,
                title: 'Real-time Conversion',
                description: 'See results instantly as you type. No button clicks needed.'
              },
              {
                icon: <Shield className="w-6 h-6" />,
                title: 'LocalStorage',
                description: 'Your content is automatically saved to browser storage.'
              },
              {
                icon: <Code2 className="w-6 h-6" />,
                title: 'Syntax Support',
                description: 'Headers, bold, italic, links, code blocks, and more.'
              },
              {
                icon: <FileText className="w-6 h-6" />,
                title: 'Import & Export',
                description: 'Drag & drop files or export as .md or .txt formats.'
              },
              {
                icon: <ArrowRight className="w-6 h-6" />,
                title: 'Bidirectional',
                description: 'Edit in either panel and see changes reflected instantly.'
              },
              {
                icon: <Sparkles className="w-6 h-6" />,
                title: 'Beautiful UI',
                description: 'Clean, modern interface with smooth animations.'
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
              Ready to convert?
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
