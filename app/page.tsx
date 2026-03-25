
'use client'

import { useRouter } from 'next/navigation'
import { ArrowRight, FileText, Zap, Shield, Check, ChevronRight } from 'lucide-react'

export default function App() {
  const router = useRouter()

  const handleClick=()=>{
router.push('/upload')
  }
    
  
  const steps = [
    {
      number: '01',
      title: 'Upload Document',
      description: 'Upload your PDF, DOCX, or TXT file securely'
    },
    {
      number: '02',
      title: 'Ask Questions',
      description: 'Ask any question about your document content'
    },
    {
      number: '03',
      title: 'Get Answers',
      description: 'Receive instant, accurate AI-powered responses'
    },
  ]

  const benefits = [
    'Save hours of manual document review',
    'Extract information instantly from any document',
    'Ask follow-up questions naturally',
    'Works with multiple file formats',
    'Enterprise-grade security',
    'No setup or training required',
  ]

  return (
    <main className="min-h-screen overflow-hidden bg-slate-950">
      {/* Animated Background */}
      <div className="fixed inset-0 -z-10">
        {/* Base gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900"></div>
        
        {/* Animated orbs */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-indigo-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" style={{ animationDelay: '1s' }}></div>
          <div className="absolute top-1/2 left-1/2 w-80 h-80 bg-cyan-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse" style={{ animationDelay: '2s' }}></div>
        </div>

        {/* Grid lines */}
        <svg className="absolute inset-0 w-full h-full opacity-[0.03]" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="50" height="50" patternUnits="userSpaceOnUse">
              <path d="M 50 0 L 0 0 0 50" fill="none" stroke="white" strokeWidth="1"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
      </div>

      {/* Content */}
      <div className="relative">
        {/* Hero Section */}
        <section className="flex flex-col items-center justify-center min-h-screen px-4 py-20">
          <div className="text-center max-w-4xl">
            {/* Top Badge */}
            <div className="animate-float-up mb-8">
              <div className="inline-block px-4 py-2 rounded-full bg-gradient-to-r from-blue-500/10 to-indigo-500/10 border border-blue-500/30 backdrop-blur-sm">
                <span className="text-sm text-blue-300 font-medium flex items-center gap-2">
                  <span className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></span>
                  Powered by Claude AI
                </span>
              </div>
            </div>

            {/* Main Heading */}
            <h1 className="animate-stagger-1 text-6xl md:text-7xl lg:text-8xl font-bold text-white mb-6 leading-[1.1] tracking-tighter">
              <span className="bg-gradient-to-r from-blue-200 via-blue-100 to-indigo-200 bg-clip-text text-transparent">
                Document
              </span>
              <br />
              <span className="bg-gradient-to-r from-indigo-300 to-blue-300 bg-clip-text text-transparent">
                Intelligence
              </span>
            </h1>

            {/* Subtitle */}
            <p className="animate-stagger-2 text-lg md:text-xl text-slate-300 mb-4 leading-relaxed">
              Transform how you interact with your documents
            </p>
            <p className="animate-stagger-3 text-base md:text-lg text-slate-400 mb-12 max-w-2xl mx-auto leading-relaxed">
              Upload PDFs, Word documents, and text files. Ask intelligent questions powered by advanced AI and get instant, accurate answers in seconds.
            </p>

            {/* CTA Button */}
            <div className="flex justify-center mb-20 animate-stagger-3">
                <button
             onClick={handleClick}
              className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white text-lg px-16 py-4 rounded-full transition-all duration-300 transform hover:scale-105 hover:shadow-2xl shadow-lg shadow-blue-500/50 flex items-center justify-center gap-3 font-semibold mx-auto"
            >
               Explore
              <ChevronRight className="w-5 h-5" />
            </button>
            </div>

            {/* Features Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-stagger-3">
              {/* Feature 1 */}
              <div className="group relative">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl"></div>
                <div className="relative bg-gradient-to-b from-slate-800/50 to-slate-900/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-8 hover:border-blue-500/50 transition-all duration-300">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <FileText className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-white font-semibold text-lg mb-2">Multiple Formats</h3>
                  <p className="text-slate-400 text-sm leading-relaxed">
                    PDF, DOCX, and TXT files supported for maximum flexibility
                  </p>
                </div>
              </div>

              {/* Feature 2 */}
              <div className="group relative">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl"></div>
                <div className="relative bg-gradient-to-b from-slate-800/50 to-slate-900/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-8 hover:border-blue-500/50 transition-all duration-300">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <Zap className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-white font-semibold text-lg mb-2">Instant Answers</h3>
                  <p className="text-slate-400 text-sm leading-relaxed">
                    Get accurate responses in seconds, not minutes
                  </p>
                </div>
              </div>

              {/* Feature 3 */}
              <div className="group relative">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl"></div>
                <div className="relative bg-gradient-to-b from-slate-800/50 to-slate-900/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-8 hover:border-blue-500/50 transition-all duration-300">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <Shield className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-white font-semibold text-lg mb-2">Secure & Private</h3>
                  <p className="text-slate-400 text-sm leading-relaxed">
                    Enterprise-grade encryption and privacy protection
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

      
        

        {/* How It Works Section */}
        <section className="py-20 px-4 border-t border-slate-800/50">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold text-white text-center mb-4">How It Works</h2>
            <p className="text-slate-400 text-center mb-16 max-w-2xl mx-auto">
              Three simple steps to unlock the power of AI-driven document analysis
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {steps.map((step, index) => (
                <div key={index} className="relative">
                  {/* Connector line */}
                  {index < steps.length - 1 && (
                    <div className="hidden md:block absolute top-16 left-[60%] w-[80%] h-1 bg-gradient-to-r from-blue-500 to-transparent"></div>
                  )}
                  
                  <div className="relative">
                    <div className="w-16 h-16 mx-auto mb-6 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-full flex items-center justify-center">
                      <span className="text-2xl font-bold text-white">{step.number}</span>
                    </div>
                    <h3 className="text-xl font-semibold text-white text-center mb-2">{step.title}</h3>
                    <p className="text-slate-400 text-center">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-20 px-4 border-t border-slate-800/50">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold text-white text-center mb-4">Why Choose Document AI?</h2>
            <p className="text-slate-400 text-center mb-16 max-w-2xl mx-auto">
              Unlock unprecedented efficiency and accuracy in your document workflows
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-center gap-4 p-4 rounded-xl bg-slate-800/30 border border-slate-700/50 hover:border-blue-500/50 transition-all duration-300 animate-float-up" style={{ animationDelay: `${index * 0.05}s` }}>
                  <div className="w-6 h-6 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center flex-shrink-0">
                    <Check className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-slate-300">{benefit}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Footer Section */}
        <section className="py-20 px-4 border-t border-slate-800/50">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Ready to Get Started?</h2>
            <p className="text-slate-400 text-lg mb-8 max-w-xl mx-auto">
              Join thousands of users who are already transforming their document workflows with AI-powered intelligence.
            </p>
            <button
             onClick={handleClick}
              className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white text-lg px-12 py-4 rounded-full transition-all duration-300 transform hover:scale-105 hover:shadow-2xl shadow-lg shadow-blue-500/50 flex items-center justify-center gap-3 font-semibold mx-auto"
            >
              Start Exploring
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </section>
      </div>
    </main>
  )}