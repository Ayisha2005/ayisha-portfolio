'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import { profileData } from '@/lib/profile';

export default function ResumePage() {
  
  useEffect(() => {
    // Dynamically load html2pdf.js CDN for PDF exports
    if (!document.getElementById('html2pdf-script')) {
      const script = document.createElement('script');
      script.id = 'html2pdf-script';
      script.src = 'https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js';
      script.async = true;
      document.body.appendChild(script);
    }
  }, []);

  const handleDownloadPDF = () => {
    const element = document.getElementById('resume-paper');
    if (!element) return;

    // Check if html2pdf is loaded
    if (typeof (window as any).html2pdf !== 'undefined') {
      const opt = {
        margin:       0,
        filename:     'Ayisha_Parveen_A_Resume.pdf',
        image:        { type: 'jpeg', quality: 0.98 },
        html2canvas:  { scale: 2, useCORS: true, logging: false },
        jsPDF:        { unit: 'mm', format: 'a4', orientation: 'portrait' }
      };

      (window as any).html2pdf().set(opt).from(element).save();
    } else {
      // Fallback direct PDF download
      const link = document.createElement('a');
      link.href = '/resume/Ayisha_Parveen_A_Resume.pdf';
      link.download = 'Ayisha_Parveen_A_Resume.pdf';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `${profileData.name} - Resume`,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Resume link copied to clipboard!');
    }
  };

  return (
    <div class="min-h-screen bg-[#080c14] text-slate-100 py-10 px-4 sm:px-6 lg:px-8 flex flex-col items-center print:bg-white print:p-0 print:m-0">
      
      <!-- Top Action Navigation Bar -->
      <div class="max-w-4xl w-full flex items-center justify-between mb-8 print:hidden">
        <Link 
          href="/" 
          class="inline-flex items-center gap-2 px-5 py-2.5 rounded-full glass-panel border border-white/10 bg-slate-900/80 text-xs font-semibold text-slate-200 hover:text-white hover:border-indigo-500/40 transition-all"
        >
          &larr; Back to Portfolio
        </Link>

        <div class="flex items-center gap-3">
          <button 
            onClick={handleShare}
            class="px-5 py-2.5 rounded-full bg-slate-800 hover:bg-slate-700 text-white font-semibold text-xs border border-white/10 transition-all"
          >
            Share Resume
          </button>
          <button 
            onClick={handlePrint}
            class="px-5 py-2.5 rounded-full bg-slate-800 hover:bg-slate-700 text-white font-semibold text-xs border border-white/10 transition-all"
          >
            Print Resume
          </button>
          <button 
            onClick={handleDownloadPDF}
            class="px-6 py-2.5 rounded-full bg-gradient-to-r from-indigo-500 via-indigo-600 to-cyan-500 hover:from-indigo-600 hover:to-cyan-600 text-white font-bold text-xs shadow-lg transition-all"
          >
            Download PDF
          </button>
        </div>
      </div>

      <!-- CANVA / SHINE.COM STYLE 2-COLUMN A4 RESUME (NO PHOTO) -->
      <div 
        id="resume-paper" 
        class="w-full max-w-[210mm] min-h-[297mm] bg-white text-slate-800 shadow-2xl rounded-2xl overflow-hidden font-sans flex flex-col md:flex-row border border-slate-200 print:shadow-none print:border-none print:w-full print:rounded-none"
      >
        
        <!-- LEFT SIDEBAR -->
        <div class="w-full md:w-[76mm] bg-slate-900 text-slate-100 p-8 space-y-8 flex-shrink-0 print:bg-slate-900 print:text-white">
          
          <!-- Contact Details -->
          <div class="space-y-3">
            <h3 class="text-xs font-mono uppercase tracking-widest text-cyan-400 font-bold pb-1.5 border-b border-slate-700">
              Contact Details
            </h3>
            <div class="space-y-3 text-xs">
              <div>
                <div class="text-[10px] text-slate-400 font-mono">Email</div>
                <a href={`mailto:${profileData.email}`} class="text-slate-200 font-medium hover:text-cyan-300 break-all">{profileData.email}</a>
              </div>
              <div>
                <div class="text-[10px] text-slate-400 font-mono">Phone</div>
                <div class="text-slate-200 font-medium">{profileData.phone}</div>
              </div>
              <div>
                <div class="text-[10px] text-slate-400 font-mono">GitHub</div>
                <a href={profileData.github} target="_blank" rel="noreferrer" class="text-cyan-400 hover:underline break-all">github.com/Ayisha2005</a>
              </div>
              <div>
                <div class="text-[10px] text-slate-400 font-mono">LinkedIn</div>
                <a href={profileData.linkedin} target="_blank" rel="noreferrer" class="text-cyan-400 hover:underline break-all">linkedin.com/in/ayisha-parveen-a</a>
              </div>
            </div>
          </div>

          <!-- Technical Skills -->
          <div class="space-y-3">
            <h3 class="text-xs font-mono uppercase tracking-widest text-cyan-400 font-bold pb-1.5 border-b border-slate-700">
              Technical Skills
            </h3>
            <div class="space-y-2 text-xs">
              <div class="flex items-center justify-between"><span class="font-medium text-slate-200">Python</span><span class="text-[10px] text-cyan-300 font-mono">Core</span></div>
              <div class="flex items-center justify-between"><span class="font-medium text-slate-200">Java</span><span class="text-[10px] text-amber-300 font-mono">OOP</span></div>
              <div class="flex items-center justify-between"><span class="font-medium text-slate-200">C</span><span class="text-[10px] text-slate-400 font-mono">Procedural</span></div>
              <div class="flex items-center justify-between"><span class="font-medium text-slate-200">C++</span><span class="text-[10px] text-purple-300 font-mono">DSA</span></div>
              <div class="flex items-center justify-between"><span class="font-medium text-slate-200">SQL</span><span class="text-[10px] text-cyan-300 font-mono">Database</span></div>
              <div class="flex items-center justify-between"><span class="font-medium text-slate-200">Git / GitHub</span><span class="text-[10px] text-orange-300 font-mono">Tools</span></div>
            </div>
          </div>

          <!-- Soft Skills -->
          <div class="space-y-3">
            <h3 class="text-xs font-mono uppercase tracking-widest text-cyan-400 font-bold pb-1.5 border-b border-slate-700">
              Soft Skills
            </h3>
            <div class="space-y-1.5 text-xs text-slate-300 font-medium">
              <div>• Typewriting</div>
              <div>• Problem Solving</div>
              <div>• Communication</div>
              <div>• Teamwork & Collaboration</div>
            </div>
          </div>

          <!-- Languages Known -->
          <div class="space-y-3">
            <h3 class="text-xs font-mono uppercase tracking-widest text-cyan-400 font-bold pb-1.5 border-b border-slate-700">
              Languages Known
            </h3>
            <div class="text-xs text-slate-200 font-medium">
              English, Tamil
            </div>
          </div>

        </div>

        <!-- RIGHT MAIN CONTENT AREA -->
        <div class="flex-grow p-8 sm:p-12 space-y-7 bg-white">
          
          <!-- Header (No Photo) -->
          <div class="pb-6 border-b-2 border-indigo-600 space-y-1.5">
            <h1 class="text-3xl sm:text-4xl font-extrabold font-display text-slate-900 tracking-tight uppercase">
              {profileData.name}
            </h1>
            <div class="text-sm font-bold text-indigo-600 uppercase font-mono tracking-wider">
              {profileData.title}
            </div>
            <div class="text-xs text-slate-600 font-semibold">
              B.Tech Computer Science & Business Systems (Final Year) • Apollo Engineering College
            </div>
          </div>

          <!-- Career Objective -->
          <div class="space-y-2">
            <h2 class="text-xs font-mono uppercase tracking-wider font-bold text-indigo-700 pb-1 border-b border-slate-200">
              Career Objective
            </h2>
            <p class="text-xs sm:text-sm text-slate-700 leading-relaxed font-sans">
              {profileData.careerObjective}
            </p>
          </div>

          <!-- Professional Summary -->
          <div class="space-y-2">
            <h2 class="text-xs font-mono uppercase tracking-wider font-bold text-indigo-700 pb-1 border-b border-slate-200">
              Professional Summary
            </h2>
            <p class="text-xs sm:text-sm text-slate-700 leading-relaxed font-sans whitespace-pre-line">
              {profileData.about}
            </p>
          </div>

          <!-- Education -->
          <div class="space-y-3">
            <h2 class="text-xs font-mono uppercase tracking-wider font-bold text-indigo-700 pb-1 border-b border-slate-200">
              Education
            </h2>
            <div class="space-y-3">
              <div>
                <div class="flex items-center justify-between text-xs sm:text-sm">
                  <strong class="text-slate-900 font-bold">B.Tech Computer Science and Business Systems</strong>
                  <span class="text-indigo-600 font-mono font-semibold">Final Year Student</span>
                </div>
                <div class="text-xs text-indigo-600 font-semibold">{profileData.college}</div>
              </div>

              <div>
                <div class="flex items-center justify-between text-xs sm:text-sm">
                  <strong class="text-slate-900 font-bold">Higher Secondary Education (8th to 12th)</strong>
                  <span class="text-slate-500 font-mono">Completed</span>
                </div>
                <div class="text-xs text-slate-600">Government Girls Higher Secondary School</div>
              </div>

              <div>
                <div class="flex items-center justify-between text-xs sm:text-sm">
                  <strong class="text-slate-900 font-bold">Primary & Middle School (LKG to 7th)</strong>
                  <span class="text-slate-500 font-mono">Completed</span>
                </div>
                <div class="text-xs text-slate-600">St. Mary's Matriculation Higher Secondary School</div>
              </div>
            </div>
          </div>

          <!-- Projects -->
          <div class="space-y-2">
            <h2 class="text-xs font-mono uppercase tracking-wider font-bold text-indigo-700 pb-1 border-b border-slate-200">
              Projects
            </h2>
            <p class="text-xs text-slate-600 italic">
              {profileData.currentlyBuildingMessage}
            </p>
          </div>

          <!-- Certifications -->
          <div class="space-y-2">
            <h2 class="text-xs font-mono uppercase tracking-wider font-bold text-indigo-700 pb-1 border-b border-slate-200">
              Certificates
            </h2>
            <p class="text-xs text-slate-600 italic">
              {profileData.certificationsMessage}
            </p>
          </div>

        </div>

      </div>

      <!-- Bottom Action Bar -->
      <div class="max-w-4xl w-full flex items-center justify-between mt-8 print:hidden">
        <Link 
          href="/" 
          class="px-6 py-3 rounded-full bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs border border-white/10 transition-all"
        >
          &larr; Back to Portfolio
        </Link>

        <div class="flex items-center gap-3">
          <button 
            onClick={handlePrint} 
            class="px-6 py-3 rounded-full bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs border border-white/10 transition-all"
          >
            Print Resume
          </button>

          <button 
            onClick={handleDownloadPDF} 
            class="px-7 py-3 rounded-full bg-gradient-to-r from-indigo-500 via-indigo-600 to-cyan-500 hover:from-indigo-600 hover:to-cyan-600 text-white font-bold text-xs shadow-lg transition-all"
          >
            Download PDF
          </button>
        </div>
      </div>

    </div>
  );
}
