"use client";

import { useState } from "react";
import RiskForm from "../../components/RiskForm";
import RiskMatrix from "../../components/RiskMatrix";
import RiskMitigations from "../../components/RiskMitigations";
import Link from "next/link";

export default function RiskAnalysisPage() {
  const [analysisResults, setAnalysisResults] = useState(null);
  const [activeTab, setActiveTab] = useState("matrix");

  const handleAnalysisComplete = (results) => {
    setAnalysisResults(results);
  };

  return (
    <div className="min-h-screen">
      <header className="vercel-header h-[var(--header-height)] fixed top-0 inset-x-0 z-10 bg-opacity-80 dark:bg-opacity-70">
        <div className="max-w-vercel mx-auto h-full flex items-center justify-between px-6">
          <div className="flex items-center gap-6">
            <h1 className="font-bold text-lg pt-3 pr-4">Risk Analyzer</h1>
            <Link href="/" className="text-sm font-medium flex items-center gap-2 opacity-60 hover:opacity-100 transition-opacity pt-1">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M19 12H5"></path>
                <path d="M12 19l-7-7 7-7"></path>
              </svg>
              Home
            </Link>
          </div>
        </div>
      </header>
      
      <main className="pt-[calc(var(--header-height)+2rem)] pb-16 px-6">
        <div className="max-w-vercel mx-auto space-y-8">
          <RiskForm onAnalysisComplete={handleAnalysisComplete} />
          
          {analysisResults && (
            <>
              <div className="flex border-b border-[var(--border)]">
                <button 
                  className={`tab-button ${activeTab === "matrix" ? "active" : ""}`}
                  onClick={() => setActiveTab("matrix")}
                >
                  Risk Matrix
                </button>
                <button 
                  className={`tab-button ${activeTab === "mitigations" ? "active" : ""}`}
                  onClick={() => setActiveTab("mitigations")}
                >
                  Mitigations
                </button>
                <button 
                  className={`tab-button ${activeTab === "summary" ? "active" : ""}`}
                  onClick={() => setActiveTab("summary")}
                >
                  Summary
                </button>
              </div>
              
              <div className="py-4">
                {activeTab === "matrix" && <RiskMatrix risks={analysisResults} />}
                {activeTab === "mitigations" && <RiskMitigations risks={analysisResults} />}
                {activeTab === "summary" && (
                  <div className="vercel-card relative overflow-hidden">
                    {/* Background decoration */}
                    <div className="absolute top-0 right-0 w-64 h-64 bg-green-500/5 dark:bg-green-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
                    <div className="absolute bottom-0 left-0 w-64 h-64 bg-yellow-500/5 dark:bg-yellow-500/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>
                    
                    <div className="relative">
                      <div className="flex items-center mb-6">
                        <div className="mr-3 p-2 bg-blue-100/20 dark:bg-blue-900/20 rounded-lg">
                          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="text-blue-600 dark:text-blue-400" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M12 20h9"></path>
                            <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path>
                          </svg>
                        </div>
                        <h2 className="text-2xl font-bold tracking-tight vercel-gradient-text">Risk Analysis Summary</h2>
                      </div>
                      
                      <p className="mb-6 opacity-70 text-sm">
                        Overview of risk assessment results and key metrics for this project.
                      </p>
                      
                      {/* Stats Grid with Enhanced Styling */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                        <div className="bg-red-50/50 dark:bg-red-900/20 p-4 rounded-lg border border-red-100 dark:border-red-900/30 hover:shadow-md transition-shadow">
                          <div className="flex justify-between items-start mb-2">
                            <h3 className="text-sm font-medium text-red-700 dark:text-red-400">Critical Risks</h3>
                            <div className="rounded-full bg-red-100 dark:bg-red-800 p-1">
                              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="text-red-600 dark:text-red-400" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
                                <line x1="12" y1="9" x2="12" y2="13"></line>
                                <line x1="12" y1="17" x2="12.01" y2="17"></line>
                              </svg>
                            </div>
                          </div>
                          <p className="text-3xl font-semibold">
                            {analysisResults.filter(r => r.probability * r.impact > 15).length}
                          </p>
                          <p className="text-xs mt-1 opacity-70">Requires immediate attention</p>
                        </div>
                        
                        <div className="bg-orange-50/50 dark:bg-orange-900/20 p-4 rounded-lg border border-orange-100 dark:border-orange-900/30 hover:shadow-md transition-shadow">
                          <div className="flex justify-between items-start mb-2">
                            <h3 className="text-sm font-medium text-orange-700 dark:text-orange-400">High Risks</h3>
                            <div className="rounded-full bg-orange-100 dark:bg-orange-800 p-1">
                              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="text-orange-600 dark:text-orange-400" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <circle cx="12" cy="12" r="10"></circle>
                                <path d="M12 8v4"></path>
                                <path d="M12 16h.01"></path>
                              </svg>
                            </div>
                          </div>
                          <p className="text-3xl font-semibold">
                            {analysisResults.filter(r => {
                              const score = r.probability * r.impact;
                              return score > 10 && score <= 15;
                            }).length}
                          </p>
                          <p className="text-xs mt-1 opacity-70">Needs close monitoring</p>
                        </div>
                        
                        <div className="bg-blue-50/50 dark:bg-blue-900/20 p-4 rounded-lg border border-blue-100 dark:border-blue-900/30 hover:shadow-md transition-shadow">
                          <div className="flex justify-between items-start mb-2">
                            <h3 className="text-sm font-medium text-blue-700 dark:text-blue-400">Average Score</h3>
                            <div className="rounded-full bg-blue-100 dark:bg-blue-800 p-1">
                              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="text-blue-600 dark:text-blue-400" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M8 3v3a2 2 0 0 1-2 2H3m18 0h-3a2 2 0 0 1-2-2V3m0 18v-3a2 2 0 0 1 2-2h3M3 16h3a2 2 0 0 1 2 2v3"></path>
                              </svg>
                            </div>
                          </div>
                          <p className="text-3xl font-semibold">
                            {(analysisResults.reduce((acc, risk) => acc + (risk.probability * risk.impact), 0) / analysisResults.length).toFixed(1)}
                          </p>
                          <p className="text-xs mt-1 opacity-70">Out of 25 maximum</p>
                        </div>
                        
                        <div className="bg-purple-50/50 dark:bg-purple-900/20 p-4 rounded-lg border border-purple-100 dark:border-purple-900/30 hover:shadow-md transition-shadow">
                          <div className="flex justify-between items-start mb-2">
                            <h3 className="text-sm font-medium text-purple-700 dark:text-purple-400">Total Risks</h3>
                            <div className="rounded-full bg-purple-100 dark:bg-purple-800 p-1">
                              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="text-purple-600 dark:text-purple-400" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                                <circle cx="9" cy="7" r="4"></circle>
                                <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                                <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                              </svg>
                            </div>
                          </div>
                          <p className="text-3xl font-semibold">
                            {analysisResults.length}
                          </p>
                          <p className="text-xs mt-1 opacity-70">Identified in analysis</p>
                        </div>
                      </div>
                      
                      {/* Risk Distribution Enhanced */}
                      <div className="bg-[var(--secondary)]/50 p-5 rounded-lg mb-8">
                        <h3 className="text-lg font-medium mb-4 flex items-center">
                          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="text-gray-600 dark:text-gray-400 mr-2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="18" y1="20" x2="18" y2="10"></line>
                            <line x1="12" y1="20" x2="12" y2="4"></line>
                            <line x1="6" y1="20" x2="6" y2="14"></line>
                          </svg>
                          Risk Distribution
                        </h3>
                        
                        <div className="flex justify-between text-xs mb-2 px-1">
                          <span className="text-gray-600 dark:text-gray-400">Distribution by severity level</span>
                          <span className="text-gray-600 dark:text-gray-400">Risk Level →</span>
                        </div>
                        
                        <div className="h-6 w-full flex rounded-md overflow-hidden">
                          {[
                            { color: "bg-green-500", label: "Low", filter: r => r.probability * r.impact <= 5 },
                            { color: "bg-yellow-500", label: "Medium", filter: r => { const s = r.probability * r.impact; return s > 5 && s <= 10; }},
                            { color: "bg-orange-500", label: "High", filter: r => { const s = r.probability * r.impact; return s > 10 && s <= 15; }},
                            { color: "bg-red-500", label: "Critical", filter: r => r.probability * r.impact > 15 }
                          ].map((level, i) => {
                            const count = analysisResults.filter(level.filter).length;
                            const percentage = (count / analysisResults.length) * 100;
                            return (
                              <div
                                key={i}
                                className={`${level.color} transition-all relative group`}
                                style={{ width: `${percentage}%` }}
                              >
                                {percentage > 15 && (
                                  <div className="absolute inset-0 flex items-center justify-center text-white text-xs font-medium">
                                    {Math.round(percentage)}%
                                  </div>
                                )}
                                <div className="absolute bottom-full mb-1 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-black/75 text-white text-xs rounded px-2 py-1 pointer-events-none whitespace-nowrap">
                                  {level.label}: {count} ({Math.round(percentage)}%)
                                </div>
                              </div>
                            );
                          })}
                        </div>
                        
                        <div className="flex justify-between text-[10px] mt-2 px-1">
                          <span className="text-green-600 dark:text-green-400 font-medium">Low</span>
                          <span className="text-yellow-600 dark:text-yellow-400 font-medium">Medium</span>
                          <span className="text-orange-600 dark:text-orange-400 font-medium">High</span>
                          <span className="text-red-600 dark:text-red-400 font-medium">Critical</span>
                        </div>
                      </div>
                      
                      {/* Quick Actions */}
                      <div className="flex gap-3 justify-end pt-4 border-t border-[var(--border)]">
                        <button className="vercel-button-secondary group">
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="mr-1.5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                            <polyline points="17 8 12 3 7 8"></polyline>
                            <line x1="12" y1="3" x2="12" y2="15"></line>
                          </svg>
                          Export PDF
                        </button>
                        <button className="vercel-button-primary group">
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="mr-1.5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"></path>
                            <polyline points="16 6 12 2 8 6"></polyline>
                            <line x1="12" y1="2" x2="12" y2="15"></line>
                          </svg>
                          Share
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </main>
    </div>
  );
}
