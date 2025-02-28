"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  const [apiKey, setApiKey] = useState("");
  const [saved, setSaved] = useState(false);
  const [testing, setTesting] = useState(false);
  const [testResult, setTestResult] = useState(null);
  const [usingEnvVar, setUsingEnvVar] = useState(false);
  const [showConfig, setShowConfig] = useState(false);

  useEffect(() => {
    // Check if using environment variable
    if (process.env.NEXT_PUBLIC_GEMINI_API_KEY) {
      setUsingEnvVar(true);
      setApiKey("●●●●●●●●●●●●●●●●");
    } else {
      // Load API key from localStorage if not using env var
      const storedApiKey = localStorage.getItem("gemini-api-key");
      if (storedApiKey) {
        setApiKey(storedApiKey);
      }
    }
  }, []);

  const saveApiKey = () => {
    if (!usingEnvVar && apiKey) {
      localStorage.setItem("gemini-api-key", apiKey);
      
      // Also store in a cookie for server-side access
      document.cookie = `gemini-api-key=${apiKey}; path=/; max-age=31536000; SameSite=Strict`;
      
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    }
  };

  const testApiKey = async () => {
    setTesting(true);
    setTestResult(null);
    
    try {
      // Use the actual API key for testing
      const keyToTest = usingEnvVar 
        ? process.env.NEXT_PUBLIC_GEMINI_API_KEY
        : apiKey;
        
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${keyToTest}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            contents: [
              {
                parts: [
                  {
                    text: "Respond with 'API connection successful' if this request works.",
                  },
                ],
              },
            ],
          }),
        }
      );
      
      if (response.ok) {
        setTestResult({
          success: true,
          message: "API connection successful! Your key is working.",
        });
      } else {
        const errorData = await response.json();
        setTestResult({
          success: false,
          message: `API Error: ${errorData.error?.message || "Unknown error"}`,
        });
      }
    } catch (error) {
      setTestResult({
        success: false,
        message: `Connection error: ${error.message}`,
      });
    } finally {
      setTesting(false);
    }
  };

  return (
    <div className="min-h-screen">
      <header className="vercel-header h-[var(--header-height)] fixed top-0 inset-x-0 z-10 bg-opacity-80 dark:bg-opacity-70">
        <div className="max-w-vercel mx-auto h-full flex items-center justify-between px-6">
          <div className="flex items-center gap-6">
            <h1 className="font-bold text-lg pt-3">Risk Analyzer</h1>
          </div>
        </div>
      </header>
      
      <main className="pt-[calc(var(--header-height)+2rem)] pb-16 px-6">
        <div className="max-w-vercel mx-auto space-y-12">
          {/* Hero section with enhanced styling */}
          <div className="w-full flex flex-col items-center text-center space-y-6 py-16 glow-effect">
            <div className="relative mb-4">
              <div className="absolute -top-12 -left-12 w-40 h-40 bg-blue-500 dark:bg-blue-500/20 rounded-full filter blur-3xl opacity-20 dark:opacity-40 animate-pulse"></div>
              <div className="absolute -bottom-12 -right-12 w-40 h-40 bg-purple-500 dark:bg-purple-500/20 rounded-full filter blur-3xl opacity-20 dark:opacity-40 animate-pulse delay-700"></div>
              <h1 className="text-5xl md:text-6xl font-bold tracking-tighter vercel-gradient-text max-w-3xl relative z-10">
                AI-powered Risk Assessment
              </h1>
            </div>
            <p className="text-lg opacity-70 max-w-2xl">
              Identify, analyze, and mitigate project risks with AI
            </p>
            <Link
              href="/risk-analysis"
              className="mt-6 vercel-button-primary px-8 group"
            >
              <span>Start Analysis</span>
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-2 group-hover:translate-x-0.5 transition-transform">
                <path d="M5 12h14"></path>
                <path d="M12 5l7 7-7 7"></path>
              </svg>
            </Link>
          </div>

          {/* Feature cards with enhanced styling */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="vercel-card p-6 flex flex-col">
          <div className="mb-4 p-2 rounded-full bg-blue-100/10 dark:bg-blue-900/20 w-fit">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="text-blue-600 dark:text-blue-400" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10"></circle>
                  <path d="M12 16v-4"></path>
                  <path d="M12 8h.01"></path>
                </svg>
              </div>
              <h3 className="text-lg font-semibold mb-2">Risk Identification</h3>
              <p className="opacity-70 text-sm">AI-powered identification of project risks using Google's Gemini API</p>
            </div>
            
            <div className="vercel-card p-6 flex flex-col">
              <div className="mb-4 p-2 rounded-lg bg-green-50 dark:bg-green-900/20 w-fit">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="text-green-600 dark:text-green-400" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M2 20h.01"></path>
                  <path d="M7 20v-4"></path>
                  <path d="M12 20v-8"></path>
                  <path d="M17 20v-6"></path>
                  <path d="M22 20V8"></path>
                </svg>
              </div>
              <h3 className="text-lg font-semibold mb-2">Visual Assessment</h3>
              <p className="opacity-70 text-sm">Visual risk matrix and severity heat map</p>
            </div>
            
            <div className="vercel-card p-6 flex flex-col">
              <div className="mb-4 p-2 rounded-lg bg-purple-50 dark:bg-purple-900/20 w-fit">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="text-purple-600 dark:text-purple-400" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"></path>
                  <path d="m9 12 2 2 4-4"></path>
                </svg>
              </div>
              <h3 className="text-lg font-semibold mb-2">Mitigation Strategies</h3>
              <p className="opacity-70 text-sm">Intelligent suggestions for addressing identified risks</p>
            </div>
          </div>
          
          {/* API configuration with enhanced styling */}
          <div>
            <button 
              onClick={() => setShowConfig(!showConfig)}
              className="w-full flex items-center justify-between border border-[var(--border)] rounded-lg p-4 transition-all hover:bg-[var(--secondary)] hover:border-opacity-80"
            >
              <div className="flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="text-gray-700 dark:text-gray-300" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4"></path>
                </svg>
                <span className="font-medium">API Key Configuration</span>
              </div>
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" className={`transition-transform ${showConfig ? "rotate-180" : ""}`} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="6 9 12 15 18 9"></polyline>
              </svg>
            </button>
            
            {showConfig && (
              <div className="mt-2 vercel-card">
                {usingEnvVar && (
                  <div className="mb-4 p-3 bg-blue-50 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 rounded-md text-sm">
                    <strong>Environment variable detected!</strong> Your API key is configured via environment variable (NEXT_PUBLIC_GEMINI_API_KEY).
                  </div>
                )}
                
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-1">Gemini API Key</label>
                  <div className="flex gap-2">
                    <input
                      type="password"
                      value={apiKey}
                      onChange={(e) => setApiKey(e.target.value)}
                      className="vercel-input flex-grow"
                      placeholder="Enter your Gemini API key"
                      disabled={usingEnvVar}
                    />
                    <button
                      onClick={saveApiKey}
                      disabled={usingEnvVar || !apiKey}
                      className="vercel-button-primary whitespace-nowrap disabled:opacity-50"
                    >
                      Save
                    </button>
                  </div>
                </div>
                
                <div className="flex gap-2 items-center mb-3">
                  <button
                    onClick={testApiKey}
                    disabled={testing || (!apiKey && !usingEnvVar)}
                    className="vercel-button-secondary disabled:opacity-50"
                  >
                    {testing ? "Testing..." : "Test Connection"}
                  </button>
                  
                  {saved && (
                    <span className="text-green-600 dark:text-green-400 text-sm">
                      API key saved!
                    </span>
                  )}
                </div>
                
                {testResult && (
                  <div className={`mb-4 p-3 rounded-md text-sm ${testResult.success ? 'bg-green-50 dark:bg-green-900/30 text-green-800 dark:text-green-300' : 'bg-red-50 dark:bg-red-900/30 text-red-800 dark:text-red-300'}`}>
                    {testResult.message}
                  </div>
                )}
                
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  <p className="mb-2">Need a Gemini API key? <a href="https://aistudio.google.com/app/apikey" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Get one from Google AI Studio</a></p>
                  <p>Your API key is stored locally in your browser.</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
