// 'use client'

// import { useState, useRef } from 'react'
// import { useRouter } from 'next/navigation'
// import { ArrowLeft, Send, FileText, Paperclip, X, Upload } from 'lucide-react'
// import ReactMarkdown from 'react-markdown'

// export default function DocumentAI() {
//   const [selectedFile, setSelectedFile] = useState<File | null>(null)
//   const [question, setQuestion] = useState('')
//   const [response, setResponse] = useState('')
//   const [isLoading, setIsLoading] = useState(false)
//   const [showUploadPopup, setShowUploadPopup] = useState(false)
//   const [hasAnswered, setHasAnswered] = useState(false)
//   const fileInputRef = useRef<HTMLInputElement>(null)
//   const router = useRouter()

//   const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     if (event.target.files && event.target.files[0]) {
//       const file = event.target.files[0]
//       const validTypes = [
//         'application/pdf',
//         'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
//         'text/plain',
//         'image/jpeg',
//         'image/png',
//         'image/gif',
//         'image/webp',
//       ]
//       if (validTypes.includes(file.type)) {
//         setSelectedFile(file)
//         setShowUploadPopup(false)
//       } else {
//         alert('Please upload a PDF, DOCX, TXT, or image file')
//         event.target.value = ''
//       }
//     }
//   }

//   const handleAskAI = async () => {
//     if (!question.trim()) {
//       alert('Enter question')
//       return
//     }
//     if (!selectedFile) {
//       alert('Upload file')
//       return
//     }

//     setIsLoading(true)
//     try {
//       const formData = new FormData()
//       formData.append('file', selectedFile)
//       formData.append('question', question)

//       const res = await fetch('/api/claude', {
//         method: 'POST',
//         body: formData,
//       })

//       const data = await res.json()
//       setResponse(data.answer)
//       setHasAnswered(true)
//       setQuestion('') // clear so user can ask another
//     } catch (err) {
//       console.log(err)
//       setResponse('Error')
//     }

//     setIsLoading(false)
//   }

//   return (
//     <main className="min-h-screen bg-slate-950 overflow-hidden">
//       {/* Animated Background */}
//       <div className="fixed inset-0 -z-10">
//         <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900"></div>
//         <div className="absolute inset-0 overflow-hidden">
//           <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
//           <div className="absolute bottom-1/4 left-1/3 w-96 h-96 bg-indigo-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" style={{ animationDelay: '1s' }}></div>
//         </div>
//         <svg className="absolute inset-0 w-full h-full opacity-[0.03]" xmlns="http://www.w3.org/2000/svg">
//           <defs>
//             <pattern id="grid" width="50" height="50" patternUnits="userSpaceOnUse">
//               <path d="M 50 0 L 0 0 0 50" fill="none" stroke="white" strokeWidth="1" />
//             </pattern>
//           </defs>
//           <rect width="100%" height="100%" fill="url(#grid)" />
//         </svg>
//       </div>

//       {/* Upload Popup Overlay */}
//       {showUploadPopup && (
//         <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
//           {/* Backdrop */}
//           <div
//             className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm"
//             onClick={() => setShowUploadPopup(false)}
//           />

//           {/* Popup Card */}
//           <div className="relative z-10 w-full max-w-md">
//             <div className="bg-gradient-to-b from-slate-800 to-slate-900 border border-slate-700/50 rounded-2xl p-8 shadow-2xl shadow-blue-500/10">
//               {/* Popup Header */}
//               <div className="flex items-center justify-between mb-6">
//                 <div className="flex items-center gap-3">
//                   <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center">
//                     <Upload className="w-5 h-5 text-white" />
//                   </div>
//                   <h2 className="text-xl font-semibold text-white">Upload Document</h2>
//                 </div>
//                 <button
//                   onClick={() => setShowUploadPopup(false)}
//                   className="w-8 h-8 flex items-center justify-center rounded-lg bg-slate-700/50 hover:bg-slate-600/50 text-slate-400 hover:text-white transition-all"
//                 >
//                   <X className="w-4 h-4" />
//                 </button>
//               </div>

//               {/* Drop Zone */}
//               <input
//                 ref={fileInputRef}
//                 type="file"
//                 accept=".pdf,.docx,.txt,.jpg,.jpeg,.png,.gif,.webp"
//                 onChange={handleFileChange}
//                 className="hidden"
//               />
//               <button
//                 onClick={() => fileInputRef.current?.click()}
//                 className="w-full px-6 py-8 rounded-xl border-2 border-dashed border-slate-600 hover:border-blue-500/70 bg-slate-900/50 hover:bg-slate-800/50 transition-all duration-300 flex flex-col items-center justify-center gap-3 group"
//               >
//                 <div className="w-12 h-12 rounded-xl bg-slate-800 group-hover:bg-blue-500/20 border border-slate-700 group-hover:border-blue-500/50 flex items-center justify-center transition-all duration-300">
//                   <FileText className="w-6 h-6 text-slate-400 group-hover:text-blue-400 transition-colors" />
//                 </div>
//                 <div className="text-center">
//                   <p className="text-sm font-medium text-slate-300 group-hover:text-white transition-colors">
//                     {selectedFile ? 'Change file' : 'Click to browse files'}
//                   </p>
//                   <p className="text-xs text-slate-500 mt-1">PDF, DOCX, TXT, JPG, PNG</p>
//                 </div>
//               </button>

//               {/* Selected File Preview */}
//               {selectedFile && (
//                 <div className="mt-4 p-4 bg-blue-500/10 border border-blue-500/30 rounded-lg flex items-center gap-3">
//                   <FileText className="w-5 h-5 text-blue-400 flex-shrink-0" />
//                   <div className="flex-1 min-w-0">
//                     <p className="text-sm font-medium text-blue-300 truncate">{selectedFile.name}</p>
//                     <p className="text-xs text-blue-400/70">{(selectedFile.size / 1024).toFixed(2)} KB</p>
//                   </div>
//                   <button
//                     onClick={() => { setSelectedFile(null); setHasAnswered(false) }}
//                     className="text-slate-500 hover:text-red-400 transition-colors"
//                   >
//                     <X className="w-4 h-4" />
//                   </button>
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Content */}
//       <div className="relative">
//         {/* ✅ Header — all in one row */}
//         <header className="border-b border-slate-800/50 backdrop-blur-sm sticky top-0 z-40">
//           <div className="mx-auto max-w-4xl px-4 py-4">
//             <div className="flex items-center gap-4">
//               {/* Back Button */}
//               <button
//                 onClick={() => router.push('/')}
//                 className="flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-800/50 border border-slate-700/50 text-slate-300 hover:text-white hover:border-blue-500/50 transition-all duration-300 flex-shrink-0"
//               >
//                 <ArrowLeft className="w-4 h-4" />
//                 Back
//               </button>

//               {/* Title + Description */}
//               <div className="flex-1 min-w-0">
//                 <h1 className="text-xl md:text-2xl font-bold text-white leading-tight">
//                   Document Intelligence
//                 </h1>
//                 <p className="text-slate-400 text-sm hidden sm:block">
//                   Upload your document and ask AI-powered questions
//                 </p>
//               </div>
//             </div>
//           </div>
//         </header>

//         {/* Main Content */}
//         <div className="mx-auto max-w-4xl px-4 py-12">
//           <div className="space-y-8">

//             {/* ✅ Ask a Question Card — with attachment icon inside */}
//             <div className="group relative">
//               <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl"></div>
//               <div className="relative bg-gradient-to-b from-slate-800/50 to-slate-900/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-8 hover:border-blue-500/50 transition-all duration-300">
//                 <div className="flex items-center gap-3 mb-6">
//                   <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center">
//                     <Send className="w-5 h-5 text-white" />
//                   </div>
//                   <h2 className="text-xl font-semibold text-white">Ask a Question</h2>
//                 </div>

//                 <div className="space-y-4">
//                   {/* Textarea with attachment button inside */}
//                   <div className="relative">
//                     <textarea
//                       placeholder="Ask something about your document..."
//                       value={question}
//                       onChange={(e) => setQuestion(e.target.value)}
//                       className="w-full min-h-36 px-4 py-3 pr-12 bg-slate-900/50 border border-slate-700/50 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/30 transition-all resize-none"
//                     />

//                     {/* ✅ Attachment icon inside textarea (bottom-right) */}
//                     <button
//                       onClick={() => setShowUploadPopup(true)}
//                       title="Attach document"
//                       className={`absolute bottom-3 right-3 w-8 h-8 flex items-center justify-center rounded-lg transition-all duration-200 ${
//                         selectedFile
//                           ? 'bg-blue-500/20 border border-blue-500/50 text-blue-400 hover:bg-blue-500/30'
//                           : 'bg-slate-800 border border-slate-600 text-slate-400 hover:border-blue-500/50 hover:text-blue-400'
//                       }`}
//                     >
//                       <Paperclip className="w-4 h-4" />
//                     </button>
//                   </div>

//                   {/* Attached file chip */}
//                   {selectedFile && (
//                     <div className="flex items-center gap-2 px-3 py-2 bg-blue-500/10 border border-blue-500/30 rounded-lg w-fit max-w-full">
//                       <FileText className="w-4 h-4 text-blue-400 flex-shrink-0" />
//                       <span className="text-xs text-blue-300 truncate max-w-xs">{selectedFile.name}</span>
//                       <button
//                         onClick={() => { setSelectedFile(null); setHasAnswered(false) }}
//                         className="text-slate-500 hover:text-red-400 transition-colors flex-shrink-0"
//                       >
//                         <X className="w-3 h-3" />
//                       </button>
//                     </div>
//                   )}

//                   <button
//                     onClick={handleAskAI}
//                     disabled={isLoading || !selectedFile || !question.trim()}
//                     className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 disabled:from-slate-600 disabled:to-slate-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105 disabled:hover:scale-100 shadow-lg shadow-blue-500/50 disabled:shadow-slate-600/50 flex items-center justify-center gap-2"
//                   >
//                     {isLoading ? (
//                       <>
//                         <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
//                         Processing...
//                       </>
//                     ) : (
//                       <>
//                         <Send className="w-4 h-4" />
//                         {hasAnswered ? 'Ask Another Question' : 'Ask Question'}
//                       </>
//                     )}
//                   </button>

//                   {/* ✅ Hint after first answer */}
//                   {hasAnswered && selectedFile && (
//                     <p className="text-xs text-slate-400 text-center">
//                       💡 You can ask another question about{' '}
//                       <span className="text-blue-400 font-medium">{selectedFile.name}</span>
//                     </p>
//                   )}
//                 </div>
//               </div>
//             </div>

//             {/* AI Response */}
//             {(response || isLoading) && (
//               <div className="animate-float-up">
//                 <div className="group relative h-full">
//                   <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl"></div>
//                   <div className="relative bg-gradient-to-b from-slate-800/50 to-slate-900/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-8 hover:border-blue-500/50 transition-all duration-300 h-full flex flex-col">
//                     <h2 className="text-xl font-semibold text-slate-500 mb-6">AI Response</h2>
//                     <div className="flex-1 overflow-y-auto">
//                       {isLoading ? (
//                         <div className="flex flex-col items-center justify-center h-full gap-4">
//                           <div className="w-8 h-8 border-2 border-blue-500/30 border-t-blue-500 rounded-full animate-spin"></div>
//                           <p className="text-sm text-slate-100">Analyzing your document...</p>
//                         </div>
//                       ) : (
//                         <div className="space-y-4 prose prose-invert  leading-relaxed max-w-non text-white">
//                           <ReactMarkdown>{response}</ReactMarkdown>
//                           <div className="pt-4 border-t border-slate-700/50 mt-4">
//                             <p className="text-xs text-slate-500">Powered by Claude AI</p>
//                           </div>
//                         </div>
//                       )}
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             )}

//           </div>
//         </div>
//       </div>
//     </main>
//   )
// }


'use client'

import { useState, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { ArrowLeft, Send, FileText, Paperclip, X, Upload, Sun, Moon } from 'lucide-react'
import ReactMarkdown from 'react-markdown'

export default function DocumentAI() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [question, setQuestion] = useState('')
  const [response, setResponse] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [showUploadPopup, setShowUploadPopup] = useState(false)
  const [hasAnswered, setHasAnswered] = useState(false)
  const [isDark, setIsDark] = useState(true)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const router = useRouter()

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0]
      const validTypes = [
        'application/pdf',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        'text/plain',
        'image/jpeg',
        'image/png',
        'image/gif',
        'image/webp',
        'image/jpg',
      ]
      if (validTypes.includes(file.type)) {
        setSelectedFile(file)
        setShowUploadPopup(false)
      } else {
        alert('Please upload a PDF, DOCX, TXT, or image file')
        event.target.value = ''
      }
    }
  }

  const handleAskAI = async () => {
    if (!question.trim()) { alert('Enter question'); return }
    if (!selectedFile) { alert('Upload file'); return }

    setIsLoading(true)
    try {
      const formData = new FormData()
      formData.append('file', selectedFile)
      formData.append('question', question)

      const res = await fetch('/api/claude', { method: 'POST', body: formData })
      const data = await res.json()
      setResponse(data.answer)
      setHasAnswered(true)
      setQuestion('')
    } catch (err) {
      console.log(err)
      setResponse('Error')
    }
    setIsLoading(false)
  }

  // ─── Theme tokens ────────────────────────────────────────────────
  const t = {
    pageBg:         isDark ? 'bg-slate-950'       : 'bg-slate-50',
    headerBorder:   isDark ? 'border-slate-800/50' : 'border-slate-200',
    headerBg:       isDark ? ''                    : 'bg-white/80',
    backBtn:        isDark
      ? 'bg-slate-800/50 border-slate-700/50 text-slate-300 hover:text-white hover:border-blue-500/50'
      : 'bg-white border-slate-300 text-slate-600 hover:text-slate-900 hover:border-blue-400',
    title:          isDark ? 'text-white'          : 'text-slate-900',
    subtitle:       isDark ? 'text-slate-400'      : 'text-slate-500',
    toggleBtn:      isDark
      ? 'bg-slate-800 border-slate-700 text-yellow-400 hover:bg-slate-700'
      : 'bg-white border-slate-300 text-slate-600 hover:bg-slate-100',
    cardBg:         isDark
      ? 'bg-gradient-to-b from-slate-800/50 to-slate-900/50 border-slate-700/50 hover:border-blue-500/50'
      : 'bg-white border-slate-200 hover:border-blue-400/60 shadow-sm',
    cardTitle:      isDark ? 'text-white'          : 'text-slate-800',
    textarea:       isDark
      ? 'bg-slate-900/50 border-slate-700/50 text-white placeholder-slate-500 focus:border-blue-500/50 focus:ring-blue-500/30'
      : 'bg-slate-50 border-slate-300 text-slate-900 placeholder-slate-400 focus:border-blue-400 focus:ring-blue-300/30',
    clipBtn:        isDark
      ? 'bg-slate-800 border-slate-600 text-slate-400 hover:border-blue-500/50 hover:text-blue-400'
      : 'bg-slate-100 border-slate-300 text-slate-500 hover:border-blue-400 hover:text-blue-500',
    hint:           isDark ? 'text-slate-400'      : 'text-slate-500',
    responseProse:  isDark ? 'text-white'          : 'text-black',
    responseBorder: isDark ? 'border-slate-700/50' : 'border-slate-200',
    poweredBy:      isDark ? 'text-slate-500'      : 'text-slate-400',
    popupBg:        isDark
      ? 'bg-gradient-to-b from-slate-800 to-slate-900 border-slate-700/50'
      : 'bg-white border-slate-200',
    popupTitle:     isDark ? 'text-white'          : 'text-slate-800',
    popupClose:     isDark
      ? 'bg-slate-700/50 hover:bg-slate-600/50 text-slate-400 hover:text-white'
      : 'bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-800',
    popupDropzone:  isDark
      ? 'border-slate-600 hover:border-blue-500/70 bg-slate-900/50 hover:bg-slate-800/50'
      : 'border-slate-300 hover:border-blue-400 bg-slate-50 hover:bg-blue-50/40',
    popupIconBox:   isDark
      ? 'bg-slate-800 border-slate-700 group-hover:bg-blue-500/20 group-hover:border-blue-500/50'
      : 'bg-slate-100 border-slate-200 group-hover:bg-blue-500/10 group-hover:border-blue-400/50',
    popupBrowse:    isDark ? 'text-slate-300 group-hover:text-white' : 'text-slate-600 group-hover:text-slate-900',
    popupFormats:   isDark ? 'text-slate-500'      : 'text-slate-400',
    backdrop:       isDark ? 'bg-slate-950/80'     : 'bg-slate-800/40',
  }
  return (
    <main className={`min-h-screen ${t.pageBg} overflow-hidden transition-colors duration-300`}>

      {/* Dark mode animated background */}
      {isDark && (
        <div className="fixed inset-0 -z-10">
          <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900" />
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" />
            <div className="absolute bottom-1/4 left-1/3 w-96 h-96 bg-indigo-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" style={{ animationDelay: '1s' }} />
          </div>
          <svg className="absolute inset-0 w-full h-full opacity-[0.03]" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="grid" width="50" height="50" patternUnits="userSpaceOnUse">
                <path d="M 50 0 L 0 0 0 50" fill="none" stroke="white" strokeWidth="1" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>
      )}

      {/* Light mode soft background */}
      {!isDark && (
        <div className="fixed inset-0 -z-10">
          <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-blue-50/30 to-white" />
          <div className="absolute top-0 right-0 w-96 h-96 bg-blue-200 rounded-full filter blur-3xl opacity-25" />
          <div className="absolute bottom-1/4 left-1/3 w-96 h-96 bg-indigo-200 rounded-full filter blur-3xl opacity-20" />
        </div>
      )}

      {/* Upload Popup */}
      {showUploadPopup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className={`absolute inset-0 ${t.backdrop} backdrop-blur-sm`} onClick={() => setShowUploadPopup(false)} />
          <div className="relative z-10 w-full max-w-md">
            <div className={`${t.popupBg} border rounded-2xl p-8 shadow-2xl shadow-blue-500/10`}>
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center">
                    <Upload className="w-5 h-5 text-white" />
                  </div>
                  <h2 className={`text-xl font-semibold ${t.popupTitle}`}>Upload Document</h2>
                </div>
                <button onClick={() => setShowUploadPopup(false)} className={`w-8 h-8 flex items-center justify-center rounded-lg ${t.popupClose} transition-all`}>
                  <X className="w-4 h-4" />
                </button>
              </div>

              <input ref={fileInputRef} type="file" accept=".pdf,.docx,.txt,.jpg,.jpeg,.png,.gif,.webp" onChange={handleFileChange} className="hidden" />
              <button
                onClick={() => fileInputRef.current?.click()}
                className={`w-full px-6 py-8 rounded-xl border-2 border-dashed ${t.popupDropzone} transition-all duration-300 flex flex-col items-center justify-center gap-3 group`}
              >
                <div className={`w-12 h-12 rounded-xl ${t.popupIconBox} border flex items-center justify-center transition-all duration-300`}>
                  <FileText className="w-6 h-6 text-slate-400 group-hover:text-blue-400 transition-colors" />
                </div>
                <div className="text-center">
                  <p className={`text-sm font-medium ${t.popupBrowse} transition-colors`}>
                    {selectedFile ? 'Change file' : 'Click to browse files'}
                  </p>
                  <p className={`text-xs ${t.popupFormats} mt-1`}>PDF, DOCX, TXT, JPG, PNG</p>
                </div>
              </button>

              {selectedFile && (
                <div className="mt-4 p-4 bg-blue-500/10 border border-blue-500/30 rounded-lg flex items-center gap-3">
                  <FileText className="w-5 h-5 text-blue-400 flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-blue-300 truncate">{selectedFile.name}</p>
                    <p className="text-xs text-blue-400/70">{(selectedFile.size / 1024).toFixed(2)} KB</p>
                  </div>
                  <button onClick={() => { setSelectedFile(null); setHasAnswered(false) }} className="text-slate-500 hover:text-red-400 transition-colors">
                    <X className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Page Content */}
      <div className="relative">

        {/* Header */}
        <header className={`border-b ${t.headerBorder} ${t.headerBg} backdrop-blur-sm sticky top-0 z-40 transition-colors duration-300`}>
          <div className="mx-auto max-w-4xl px-4 py-4">
            <div className="flex items-center gap-4">
              <button onClick={() => router.push('/')} className={`flex items-center gap-2 px-4 py-2 rounded-lg border ${t.backBtn} transition-all duration-300 flex-shrink-0`}>
                <ArrowLeft className="w-4 h-4" />
                Back
              </button>

              <div className="flex-1 min-w-0">
                <h1 className={`text-xl md:text-2xl font-bold ${t.title} leading-tight transition-colors duration-300`}>
                  Document Intelligence
                </h1>
                <p className={`${t.subtitle} text-sm hidden sm:block transition-colors duration-300`}>
                  Upload your document and ask AI-powered questions
                </p>
              </div>

              {/* ✅ Theme toggle button */}
              <button
                onClick={() => setIsDark(!isDark)}
                title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
                className={`flex-shrink-0 w-9 h-9 flex items-center justify-center rounded-lg border ${t.toggleBtn} transition-all duration-300`}
              >
                {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              </button>
            </div>
          </div>
        </header>

        {/* Main */}
        <div className="mx-auto max-w-4xl px-4 py-12">
          <div className="space-y-8">

            {/* Ask a Question Card */}
            <div className="group relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl" />
              <div className={`relative ${t.cardBg} border backdrop-blur-sm rounded-2xl p-8 transition-all duration-300`}>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center">
                    <Send className="w-5 h-5 text-white" />
                  </div>
                  <h2 className={`text-xl font-semibold ${t.cardTitle}`}>Ask a Question</h2>
                </div>

                <div className="space-y-4">
                  <div className="relative">
                    <textarea
                      placeholder="Ask something about your document..."
                      value={question}
                      onChange={(e) => setQuestion(e.target.value)}
                      className={`w-full min-h-36 px-4 py-3 pr-12 border rounded-lg focus:outline-none focus:ring-1 transition-all resize-none ${t.textarea}`}
                    />
                    <button
                      onClick={() => setShowUploadPopup(true)}
                      title="Attach document"
                      className={`absolute bottom-3 right-3 w-8 h-8 flex items-center justify-center rounded-lg border transition-all duration-200 ${
                        selectedFile
                          ? 'bg-blue-500/20 border-blue-500/50 text-blue-400 hover:bg-blue-500/30'
                          : t.clipBtn
                      }`}
                    >
                      <Paperclip className="w-4 h-4" />
                    </button>
                  </div>

                  {selectedFile && (
                    <div className="flex items-center gap-2 px-3 py-2 bg-blue-500/10 border border-blue-500/30 rounded-lg w-fit max-w-full">
                      <FileText className="w-4 h-4 text-blue-400 flex-shrink-0" />
                      <span className="text-xs text-blue-300 truncate max-w-xs">{selectedFile.name}</span>
                      <button onClick={() => { setSelectedFile(null); setHasAnswered(false) }} className="text-slate-500 hover:text-red-400 transition-colors flex-shrink-0">
                        <X className="w-3 h-3" />
                      </button>
                    </div>
                  )}

                  <button
                    onClick={handleAskAI}
                    disabled={isLoading || !selectedFile || !question.trim()}
                    className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 disabled:from-slate-600 disabled:to-slate-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105 disabled:hover:scale-100 shadow-lg shadow-blue-500/50 disabled:shadow-slate-600/50 flex items-center justify-center gap-2"
                  >
                    {isLoading ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Processing...
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        {hasAnswered ? 'Ask Another Question' : 'Ask Question'}
                      </>
                    )}
                  </button>

                  {hasAnswered && selectedFile && (
                    <p className={`text-xs ${t.hint} text-center`}>
                      💡 You can ask another question about{' '}
                      <span className="text-blue-400 font-medium">{selectedFile.name}</span>
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* AI Response */}
            {(response || isLoading) && (
              <div className="group relative">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl" />
                <div className={`relative ${t.cardBg} border backdrop-blur-sm rounded-2xl p-8 transition-all duration-300`}>
                  <h2 className={`text-xl text-slate-500 font-semibold ${t.cardTitle} mb-6`}>AI Response</h2>
                  <div className="overflow-y-auto">
                    {isLoading ? (
                      <div className="flex flex-col items-center justify-center py-8 gap-4">
                        <div className="w-8 h-8 border-2 border-blue-500/30 border-t-blue-500 rounded-full animate-spin" />
                        <p className={`text-sm ${t.hint}`}>Analyzing your document...</p>
                      </div>
                    ) : (
                      <div className={`space-y-4 prose ${t.responseProse}  leading-relaxed max-w-none`}>
                        <ReactMarkdown>{response}</ReactMarkdown>
                        <div className={`pt-4 border-t ${t.responseBorder} mt-4`}>
                          <p className={`text-xs ${t.poweredBy}`}>Powered by Claude AI</p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

          </div>
        </div>
      </div>
    </main>
  )
}