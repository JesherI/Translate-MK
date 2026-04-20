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
import { useTheme } from './hooks/useTheme';
import { useI18n } from './hooks/useI18n';

export default function Home() {
  const { theme, toggleTheme, isDark } = useTheme();
  const { language, toggleLanguage, t } = useI18n();

  return (
    <main className={`min-h-screen font-sans relative overflow-hidden transition-colors duration-300 ${
      isDark 
        ? 'text-white selection:bg-white selection:text-black' 
        : 'text-gray-900 selection:bg-gray-900 selection:text-white bg-[#f5f5f7]'
    }`}>
      <AnimatedBackground theme={theme} />
      
      {/* Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-50 border-b backdrop-blur-xl transition-colors duration-300 ${
        isDark 
          ? 'border-white/10 bg-black/30' 
          : 'border-gray-200/50 bg-white/70'
      }`}>
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-lg">
              <FileCode className="w-5 h-5 text-white" />
            </div>
            <span className={`text-lg font-semibold tracking-tight ${isDark ? 'text-white' : 'text-gray-900'}`}>
              Translate-MK
            </span>
          </div>
          <div className="flex items-center gap-3">
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border text-sm transition-all ${
                isDark 
                  ? 'border-white/10 text-white/60 hover:text-white hover:border-white/30 hover:bg-white/5' 
                  : 'border-gray-300 text-gray-600 hover:text-gray-900 hover:border-gray-400 hover:bg-gray-100'
              }`}
            >
              {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>
            
            {/* Language Toggle */}
            <button
              onClick={toggleLanguage}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border text-sm transition-all ${
                isDark 
                  ? 'border-white/10 text-white/60 hover:text-white hover:border-white/30 hover:bg-white/5' 
                  : 'border-gray-300 text-gray-600 hover:text-gray-900 hover:border-gray-400 hover:bg-gray-100'
              }`}
            >
              <Globe className="w-4 h-4" />
              <span className="uppercase">{language}</span>
            </button>
            
            <div className={`w-px h-4 ${isDark ? 'bg-white/20' : 'bg-gray-300'}`} />
            
            <a 
              href="https://github.com/JesherI/Translate-MK" 
              target="_blank" 
              rel="noopener noreferrer"
              className={`flex items-center gap-2 text-sm transition-colors ${
                isDark ? 'text-white/60 hover:text-white' : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <ExternalLink className="w-4 h-4" />
              GitHub
            </a>
            <span className={`text-sm ${isDark ? 'text-white/40' : 'text-gray-500'}`}>v0.2.0</span>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-6">
        <div className="max-w-5xl mx-auto text-center">
          {/* Badge */}
          <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full border text-sm mb-8 transition-colors ${
            isDark 
              ? 'border-white/10 bg-white/5 text-white/60' 
              : 'border-gray-300 bg-white/50 text-gray-600 shadow-sm'
          }`}>
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            {t('home.badge')}
          </div>

          {/* Title */}
          <h1 className={`text-5xl md:text-7xl font-bold tracking-tight mb-6 transition-colors ${
            isDark 
              ? 'bg-gradient-to-b from-white via-white/90 to-white/30 bg-clip-text text-transparent'
              : 'text-gray-900'
          }`}>
            {t('home.title')}
            <br />
            <span className={isDark ? 'text-white/30' : 'text-gray-400'}>{t('home.subtitle')}</span>
          </h1>

          {/* Subtitle */}
          <p className={`text-xl max-w-3xl mx-auto leading-relaxed mb-10 transition-colors ${
            isDark ? 'text-white/50' : 'text-gray-600'
          }`}>
            {t('home.description')}
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/editor"
              className="group flex items-center gap-2 px-8 py-4 rounded-xl bg-blue-600 text-white font-medium transition-all hover:bg-blue-700 hover:scale-105 shadow-lg shadow-blue-500/25"
            >
              <Play className="w-5 h-5" />
              {t('home.openEditor')}
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <a
              href="#features"
              className={`flex items-center gap-2 px-8 py-4 rounded-xl border font-medium transition-all ${
                isDark 
                  ? 'border-white/10 text-white/70 hover:text-white hover:border-white/30' 
                  : 'border-gray-300 text-gray-700 hover:text-gray-900 hover:border-gray-400 bg-white/50'
              }`}
            >
              {t('home.learnMore')}
            </a>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 px-6 relative">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className={`text-3xl font-bold mb-4 transition-colors ${isDark ? 'text-white' : 'text-gray-900'}`}>
              {t('home.howItWorks')}
            </h2>
            <p className={`transition-colors ${isDark ? 'text-white/50' : 'text-gray-500'}`}>
              {t('home.howItWorksDesc')}
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {/* Markdown Input */}
            <div className={`p-8 rounded-2xl border backdrop-blur-sm transition-colors ${
              isDark 
                ? 'border-white/10 bg-white/[0.02]' 
                : 'border-gray-200 bg-white/60 shadow-sm'
            }`}>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-blue-500/20 flex items-center justify-center">
                  <Code2 className="w-5 h-5 text-blue-500" />
                </div>
                <h3 className={`text-xl font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  {t('home.markdownInput')}
                </h3>
              </div>
              <div className={`p-4 rounded-lg border font-mono text-sm overflow-x-auto ${
                isDark 
                  ? 'bg-white/5 border-white/10 text-white/70' 
                  : 'bg-gray-50 border-gray-200 text-gray-700'
              }`}>
                <pre className="whitespace-pre-wrap">{language === 'es' ? `# Documentación del Proyecto

## Descripción General
Este es un **editor profesional de Markdown** con capacidades de vista previa en tiempo real.

## Características
| Característica | Descripción | Estado |
|----------------|-------------|--------|
| Vista Previa | Renderizado instantáneo | ✅ Activo |
| Auto-Guardado | Almacenamiento automático | ✅ Activo |
| Resaltado | Bloques de código con formato | ✅ Activo |` : `# Project Documentation

## Overview
This is a **professional Markdown editor** with real-time preview capabilities.

## Features
| Feature | Description | Status |
|---------|-------------|--------|
| Real-time Preview | Instant rendering | ✅ Active |
| Auto-Save | Automatic storage | ✅ Active |
| Syntax Highlight | Code formatting | ✅ Active |`}</pre>
              </div>
            </div>

            {/* Rendered Preview */}
            <div className={`p-8 rounded-2xl border backdrop-blur-sm transition-colors ${
              isDark 
                ? 'border-white/10 bg-white/[0.02]' 
                : 'border-gray-200 bg-white/60 shadow-sm'
            }`}>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-green-500/20 flex items-center justify-center">
                  <FileText className="w-5 h-5 text-green-500" />
                </div>
                <h3 className={`text-xl font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  {t('home.renderedPreview')}
                </h3>
              </div>
              <div className={`p-4 rounded-lg border prose prose-sm max-w-none ${
                isDark 
                  ? 'bg-white/5 border-white/10 prose-invert' 
                  : 'bg-white border-gray-200'
              }`}>
                <h1 className={`text-2xl font-bold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  {language === 'es' ? 'Documentación del Proyecto' : 'Project Documentation'}
                </h1>
                <h2 className={`text-xl font-semibold mt-4 mb-2 ${isDark ? 'text-white/90' : 'text-gray-800'}`}>
                  {language === 'es' ? 'Características' : 'Features'}
                </h2>
                <ul className={`list-disc list-inside space-y-1 ${isDark ? 'text-white/70' : 'text-gray-700'}`}>
                  <li><strong>{language === 'es' ? 'Vista Previa' : 'Real-time'}</strong> {language === 'es' ? 'en tiempo real' : 'preview'}</li>
                  <li><em>{language === 'es' ? 'Auto-Guardado' : 'Auto-save'}</em> {language === 'es' ? 'automático' : 'functionality'}</li>
                  <li>{language === 'es' ? 'Resaltado de sintaxis' : 'Syntax highlighting'}</li>
                </ul>
                <table className={`w-full border-collapse border mt-4 text-sm ${isDark ? 'border-white/10' : 'border-gray-200'}`}>
                  <thead>
                    <tr className={isDark ? 'bg-white/5' : 'bg-gray-50'}>
                      <th className={`border px-3 py-2 text-left ${isDark ? 'border-white/10 text-white' : 'border-gray-200 text-gray-900'}`}>
                        {language === 'es' ? 'Característica' : 'Feature'}
                      </th>
                      <th className={`border px-3 py-2 text-left ${isDark ? 'border-white/10 text-green-400' : 'border-gray-200 text-green-600'}`}>
                        {language === 'es' ? 'Estado' : 'Status'}
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className={`border px-3 py-2 ${isDark ? 'border-white/10 text-white/70' : 'border-gray-200 text-gray-700'}`}>
                        {language === 'es' ? 'Vista Previa' : 'Preview'}
                      </td>
                      <td className={`border px-3 py-2 ${isDark ? 'border-white/10 text-green-400' : 'border-gray-200 text-green-600'}`}>✓ Ready</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Syntax Support */}
          <div className={`p-8 rounded-2xl border backdrop-blur-sm transition-colors ${
            isDark 
              ? 'border-white/10 bg-white/[0.02]' 
              : 'border-gray-200 bg-white/60 shadow-sm'
          }`}>
            <h3 className={`text-xl font-semibold mb-6 text-center ${isDark ? 'text-white' : 'text-gray-900'}`}>
              {t('home.syntaxSupport')}
            </h3>
            <div className="grid md:grid-cols-4 gap-4 text-sm">
              {[
                { key: 'headers', code: '# H1, ## H2' },
                { key: 'emphasis', code: '**bold**, *italic*' },
                { key: 'lists', code: '- item, 1. item' },
                { key: 'tables', code: '| col1 | col2 |' },
                { key: 'code', code: '`inline` or ```blocks```' },
                { key: 'links', code: '[text](url)' },
                { key: 'images', code: '![alt](image.png)' },
                { key: 'quotes', code: '> blockquote' },
              ].map((item, i) => (
                <div key={i} className={`p-4 rounded-xl transition-colors ${
                  isDark ? 'bg-white/5' : 'bg-gray-50'
                }`}>
                  <h4 className={`font-medium mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    {t(`home.syntax.${item.key}`)}
                  </h4>
                  <code className={isDark ? 'text-white/50' : 'text-gray-500'}>{item.code}</code>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" className="py-20 px-6 relative">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className={`text-3xl font-bold mb-4 transition-colors ${isDark ? 'text-white' : 'text-gray-900'}`}>
              {t('home.features')}
            </h2>
            <p className={`transition-colors ${isDark ? 'text-white/50' : 'text-gray-500'}`}>
              {t('home.featuresDesc') || 'Everything you need for Markdown editing'}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: <Zap className="w-6 h-6" />,
                titleKey: 'home.featuresList.realtime.title',
                descKey: 'home.featuresList.realtime.desc'
              },
              {
                icon: <Shield className="w-6 h-6" />,
                titleKey: 'home.featuresList.autosave.title',
                descKey: 'home.featuresList.autosave.desc'
              },
              {
                icon: <Code2 className="w-6 h-6" />,
                titleKey: 'home.featuresList.gfm.title',
                descKey: 'home.featuresList.gfm.desc'
              },
            ].map((feature, i) => (
              <div 
                key={i}
                className={`group p-6 rounded-2xl border backdrop-blur-sm transition-all hover:scale-[1.02] ${
                  isDark 
                    ? 'border-white/10 bg-white/[0.02] hover:bg-white/[0.04]' 
                    : 'border-gray-200 bg-white/60 hover:bg-white/80 shadow-sm'
                }`}
              >
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-all ${
                  isDark 
                    ? 'bg-white/5 text-white/60 group-hover:text-white group-hover:bg-white/10' 
                    : 'bg-gray-100 text-gray-600 group-hover:text-gray-900 group-hover:bg-gray-200'
                }`}>
                  {feature.icon}
                </div>
                <h3 className={`text-lg font-semibold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  {t(feature.titleKey)}
                </h3>
                <p className={`text-sm leading-relaxed ${isDark ? 'text-white/40' : 'text-gray-600'}`}>
                  {t(feature.descKey)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 relative">
        <div className="max-w-4xl mx-auto text-center">
          <div className={`p-12 rounded-3xl border backdrop-blur-sm transition-colors ${
            isDark 
              ? 'border-white/10 bg-gradient-to-b from-white/[0.05] to-transparent' 
              : 'border-gray-200 bg-white/60 shadow-sm'
          }`}>
            <h2 className={`text-3xl md:text-4xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
              {t('home.cta.ready')}
            </h2>
            <p className={`mb-8 max-w-lg mx-auto ${isDark ? 'text-white/50' : 'text-gray-600'}`}>
              {t('home.cta.desc')}
            </p>
            <Link
              href="/editor"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-blue-600 text-white font-medium transition-all hover:bg-blue-700 hover:scale-105 shadow-lg shadow-blue-500/25"
            >
              <Play className="w-5 h-5" />
              {t('home.cta.launch')}
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className={`border-t py-8 px-6 transition-colors ${isDark ? 'border-white/10' : 'border-gray-200'}`}>
        <div className={`max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-sm ${
          isDark ? 'text-white/40' : 'text-gray-500'
        }`}>
          <span>Translate-MK © 2026</span>
          <span>{t('home.footer.built')}</span>
        </div>
      </footer>
    </main>
  );
}
