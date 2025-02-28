"use client";

import { useState } from "react";

export default function RiskMatrix({ risks }) {
  const [selectedRisk, setSelectedRisk] = useState(null);

  const getPositionStyle = (probability, impact) => {
    // Convert 1-5 scale to percentages for positioning
    const left = `${(impact - 1) * 25}%`;
    const bottom = `${(probability - 1) * 25}%`;
    return { left, bottom };
  };

  const getRiskColor = (riskScore) => {
    if (riskScore <= 5) return "bg-green-500";
    if (riskScore <= 10) return "bg-yellow-500";
    if (riskScore <= 15) return "bg-orange-500";
    return "bg-red-500";
  };

  return (
    <div className="vercel-card">
      <h2 className="text-xl font-bold mb-6 tracking-tight vercel-gradient-text">Risk Matrix</h2>
      
      <div className="flex gap-8 flex-col lg:flex-row">
        <div className="relative w-full lg:w-2/3 aspect-square border border-[var(--border)] bg-[var(--secondary)] rounded-xl p-4 mt-12 ml-12">
          {/* X-axis labels (consistent with Y-axis style) */}
          <div className="absolute w-full flex justify-between top-full text-xs px-4">
            {["Low", "Medium", "High", "Critical"].map((label, i) => (
              <span 
                key={i} 
                className="transform -translate-x-1/2 bg-[var(--background)] px-1.5 py-0.5 rounded text-xs opacity-80 mt-1"
              >
                {label}
              </span>
            ))}
          </div>
          
          {/* Y-axis labels (left side) */}
          <div className="absolute h-full flex flex-col justify-between -left-3 text-xs top-0">
            {["Almost Certain", "Likely", "Possible", "Unlikely", "Rare"].map((label, i) => (
              <div key={i} className="transform translate-y-1/2 flex items-center">
                <span className="opacity-80 bg-[var(--background)] px-1.5 py-0.5 rounded text-xs whitespace-nowrap">
                  {label}
                </span>
              </div>
            ))}
          </div>
          
          {/* X-axis title */}
          <div className="absolute top-full mt-5 w-full text-center">
            <span className="text-sm font-medium px-2 py-1 bg-[var(--background)] rounded-md opacity-80">Impact</span>
          </div>
          
          {/* Y-axis title - improved positioning */}
          <div className="absolute -left-20 top-1/2 transform -translate-y-1/2 -rotate-90">
            <span className="text-sm font-medium px-2 py-1 bg-[var(--background)] rounded-md opacity-80 whitespace-nowrap">Probability</span>
          </div>
          
          {/* Grid lines for better visual cues */}
          <div className="absolute inset-0 grid grid-cols-4 grid-rows-4 gap-0">
            {[...Array(16)].map((_, index) => (
              <div 
                key={index} 
                className="border-[0.5px] border-[var(--border)] opacity-30"
              ></div>
            ))}
          </div>
          
          {/* Risk points with improved styling */}
          {risks.map((risk, index) => (
            <div 
              key={index}
              className={`absolute w-7 h-7 rounded-full cursor-pointer transform -translate-x-1/2 translate-y-1/2 hover:ring-2 hover:ring-[var(--ring)] flex items-center justify-center text-xs font-bold transition-all shadow-md ${getRiskColor(risk.probability * risk.impact)}`}
              style={getPositionStyle(risk.probability, risk.impact)}
              onClick={() => setSelectedRisk(risk)}
              title={risk.title}
            >
              {index + 1}
            </div>
          ))}
        </div>
        
        <div className="md:w-1/3 flex flex-col">
          <div className="mb-4">
            <h3 className="text-lg font-medium mb-2">Risk Level</h3>
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-red-500"></div>
                <span>Critical (16-25)</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-orange-500"></div>
                <span>High (11-15)</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-yellow-500"></div>
                <span>Medium (6-10)</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-green-500"></div>
                <span>Low (1-5)</span>
              </div>
            </div>
          </div>
          
          {selectedRisk && (
            <div className="bg-[var(--secondary)] p-3 rounded-md">
              <h4 className="font-medium">{selectedRisk.title}</h4>
              <p className="text-sm mt-1 text-gray-600 dark:text-gray-300">
                Score: {selectedRisk.probability * selectedRisk.impact} 
                ({selectedRisk.probability} × {selectedRisk.impact})
              </p>
              {selectedRisk.mitigation && (
                <>
                  <h5 className="text-sm font-medium mt-2">Mitigation:</h5>
                  <p className="text-xs">{selectedRisk.mitigation}</p>
                </>
              )}
            </div>
          )}
        </div>
      </div>
      
      <div className="mt-8 pt-6 border-t border-[var(--border)]">
        <h3 className="text-lg font-semibold mb-4">All Identified Risks</h3>
        <div className="overflow-auto max-h-64 -mx-4">
          <table className="vercel-table w-full">
            <thead>
              <tr>
                <th>#</th>
                <th>Risk</th>
                <th>Probability</th>
                <th>Impact</th>
                <th>Score</th>
              </tr>
            </thead>
            <tbody>
              {risks.map((risk, index) => (
                <tr 
                  key={index} 
                  className="border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer"
                  onClick={() => setSelectedRisk(risk)}
                >
                  <td>{index + 1}</td>
                  <td>{risk.title}</td>
                  <td>{risk.probability}</td>
                  <td>{risk.impact}</td>
                  <td className="font-medium">{risk.probability * risk.impact}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
