"use client";

export default function RiskMitigations({ risks }) {
  // Group risks by severity
  const criticalRisks = risks.filter(r => r.probability * r.impact > 15);
  const highRisks = risks.filter(r => {
    const score = r.probability * r.impact;
    return score > 10 && score <= 15;
  });
  const mediumRisks = risks.filter(r => {
    const score = r.probability * r.impact;
    return score > 5 && score <= 10;
  });
  const lowRisks = risks.filter(r => r.probability * r.impact <= 5);

  // Original simple render function (keeping as backup)
  const renderRiskSection = (sectionRisks, title, bgColor) => {
    if (sectionRisks.length === 0) return null;
    
    return (
      <div className={`${bgColor} rounded-lg p-4 mb-6`}>
        <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
          {title} 
          <span className="vercel-badge">{sectionRisks.length}</span>
        </h3>
        <div className="space-y-3">
          {sectionRisks.map((risk, index) => (
            <div key={index} className="bg-white/75 dark:bg-gray-800/75 p-3 rounded-md">
              <div className="flex justify-between mb-2">
                <h4 className="font-medium">{risk.title}</h4>
                <span className="text-sm bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded">
                  Score: {risk.probability * risk.impact}
                </span>
              </div>
              <p className="text-sm mb-2">
                <span className="font-medium">Probability:</span> {risk.probability}/5,{" "}
                <span className="font-medium">Impact:</span> {risk.impact}/5
              </p>
              <div className="text-sm">
                <span className="font-medium">Mitigation:</span> {risk.mitigation}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  // Enhanced render function with better styling
  function renderEnhancedRiskSection(sectionRisks, title, bgColor, accentColor) {
    if (sectionRisks.length === 0) return null;
    
    return (
      <div className={`${bgColor} rounded-lg mb-6 overflow-hidden`}>
        <div className={`border-l-4 border-${accentColor}-500 p-4`}>
          <h3 className="font-semibold text-lg mb-2 flex items-center justify-between">
            <div className="flex items-center">
              <span className="inline-block w-6 h-6 rounded-full bg-white/50 dark:bg-black/30 flex items-center justify-center text-xs font-bold mr-2">
                {sectionRisks.length}
              </span>
              {title}
            </div>
            <span className={`text-xs px-2 py-1 bg-${accentColor}-500/20 rounded-full`}>
              {sectionRisks.length} {sectionRisks.length === 1 ? 'item' : 'items'}
            </span>
          </h3>
          
          <div className="grid gap-3 mt-4">
            {sectionRisks.map((risk, index) => (
              <div 
                key={index} 
                className="bg-white/60 dark:bg-gray-800/60 p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex justify-between mb-2 items-start">
                  <h4 className="font-medium text-base flex items-center">
                    <span className={`inline-block w-5 h-5 rounded-full bg-${accentColor}-500/20 text-${accentColor}-600 dark:text-${accentColor}-400 flex items-center justify-center text-xs font-bold mr-2`}>
                      {index + 1}
                    </span>
                    {risk.title}
                  </h4>
                  <span className="text-sm bg-[var(--secondary)] px-2 py-1 rounded-md font-mono">
                    {risk.probability} × {risk.impact} = {risk.probability * risk.impact}
                  </span>
                </div>
                
                <div className="mt-3 pt-3 border-t border-[var(--border)] text-sm">
                  <h5 className="font-medium mb-1">Mitigation Strategy:</h5>
                  <p className="opacity-80">{risk.mitigation}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="vercel-card relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-red-500/5 dark:bg-red-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-500/5 dark:bg-blue-500/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>
      
      <div className="relative">
        <div className="flex items-center mb-6">
          <div className="mr-3 p-2 bg-red-100/20 dark:bg-red-900/20 rounded-lg">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="text-red-600 dark:text-red-400" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
              <line x1="12" y1="9" x2="12" y2="13"></line>
              <line x1="12" y1="17" x2="12.01" y2="17"></line>
            </svg>
          </div>
          <h2 className="text-2xl font-bold tracking-tight vercel-gradient-text">Risk Mitigation Plan</h2>
        </div>
        
        <p className="mb-6 opacity-70 text-sm">
          Detailed mitigation strategies for identified risks, grouped by severity level.
        </p>
        
        {renderEnhancedRiskSection(
          criticalRisks, 
          "Critical Risks", 
          "bg-red-100/20 dark:bg-red-900/20",
          "red"
        )}
        
        {renderEnhancedRiskSection(
          highRisks, 
          "High Risks", 
          "bg-orange-100/20 dark:bg-orange-900/20",
          "orange"
        )}
        
        {renderEnhancedRiskSection(
          mediumRisks, 
          "Medium Risks", 
          "bg-yellow-100/20 dark:bg-yellow-900/20",
          "yellow"
        )}
        
        {renderEnhancedRiskSection(
          lowRisks, 
          "Low Risks", 
          "bg-green-100/20 dark:bg-green-900/20",
          "green"
        )}
        
        <div className="mt-8 pt-6 border-t border-[var(--border)]">
          <h3 className="text-lg font-medium mb-4 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="text-blue-600 dark:text-blue-400 mr-2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"></path>
            </svg>
            Best Practices
          </h3>
          
          <div className="bg-[var(--secondary)]/40 p-4 rounded-lg">
            <ul className="space-y-2">
              <li className="flex items-start gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="text-green-500 shrink-0 mt-0.5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"></path>
                  <path d="m9 12 2 2 4-4"></path>
                </svg>
                <span className="opacity-80">Review and update risk assessments regularly throughout the project</span>
              </li>
              <li className="flex items-start gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="text-green-500 shrink-0 mt-0.5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"></path>
                  <path d="m9 12 2 2 4-4"></path>
                </svg>
                <span className="opacity-80">Assign risk owners for each identified risk</span>
              </li>
              <li className="flex items-start gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="text-green-500 shrink-0 mt-0.5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"></path>
                  <path d="m9 12 2 2 4-4"></path>
                </svg>
                <span className="opacity-80">Develop contingency plans for high-priority risks</span>
              </li>
              <li className="flex items-start gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="text-green-500 shrink-0 mt-0.5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"></path>
                  <path d="m9 12 2 2 4-4"></path>
                </svg>
                <span className="opacity-80">Include risk management as an agenda item in project meetings</span>
              </li>
              <li className="flex items-start gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="text-green-500 shrink-0 mt-0.5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"></path>
                  <path d="m9 12 2 2 4-4"></path>
                </svg>
                <span className="opacity-80">Document and share lessons learned from risk incidents</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
