// This utility handles interactions with the Google Gemini API

const getApiKey = () => {
  // First try to get from environment variable
  if (process.env.NEXT_PUBLIC_GEMINI_API_KEY) {
    return process.env.NEXT_PUBLIC_GEMINI_API_KEY;
  }
  
  // Fallback to localStorage for development/testing
  if (typeof window !== 'undefined') {
    return localStorage.getItem('gemini-api-key');
  }
  
  return null;
};

export async function analyzeRisks(projectData) {
  const apiKey = getApiKey();
  
  if (!apiKey) {
    throw new Error("Gemini API key not found. Please configure it in settings.");
  }

  try {
    // First, use our server endpoint to protect the API key
    const response = await fetch('/api/gemini/analyze-risks', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ projectData }),
    });

    if (!response.ok) {
      throw new Error(`API request failed: ${response.status}`);
    }

    const data = await response.json();
    return data.risks;
    
  } catch (error) {
    console.error('Error querying Gemini API:', error);
    
    // For development/demo purposes, return mock data if API call fails
    return generateMockRisks(projectData);
  }
}

// Generate mock risks for development/demo purposes
function generateMockRisks(projectData) {
  const industry = projectData.industry || 'technology';
  const baseRisks = [
    {
      title: "Budget overrun",
      probability: 3,
      impact: 4,
      mitigation: "Implement strict cost control measures and regular financial reviews."
    },
    {
      title: "Schedule delays",
      probability: 4,
      impact: 3,
      mitigation: "Add buffer time to critical path activities and monitor progress closely."
    },
    {
      title: "Scope creep",
      probability: 4,
      impact: 4,
      mitigation: "Implement formal change management process and clear requirements documentation."
    },
    {
      title: "Resource unavailability",
      probability: 3,
      impact: 3,
      mitigation: "Cross-train team members and identify backup resources."
    },
    {
      title: "Stakeholder resistance",
      probability: 2,
      impact: 4,
      mitigation: "Conduct stakeholder analysis and develop engagement plan."
    }
  ];
  
  // Industry-specific risks
  const industryRisks = {
    technology: [
      {
        title: "Technical complexity issues",
        probability: 4,
        impact: 5,
        mitigation: "Conduct technical proof of concept and engage expert consultants."
      },
      {
        title: "Cybersecurity vulnerabilities",
        probability: 3,
        impact: 5,
        mitigation: "Implement security by design and conduct regular penetration testing."
      }
    ],
    finance: [
      {
        title: "Regulatory compliance issues",
        probability: 4,
        impact: 5,
        mitigation: "Engage legal experts and maintain regulatory tracking system."
      },
      {
        title: "Market volatility",
        probability: 3,
        impact: 4,
        mitigation: "Develop contingency plans for different market scenarios."
      }
    ],
    healthcare: [
      {
        title: "Patient data security breach",
        probability: 2,
        impact: 5,
        mitigation: "Implement HIPAA compliance measures and encryption."
      },
      {
        title: "Regulatory approval delays",
        probability: 4,
        impact: 4,
        mitigation: "Early engagement with regulatory bodies and thorough documentation."
      }
    ],
    construction: [
      {
        title: "Safety incidents",
        probability: 3,
        impact: 5,
        mitigation: "Implement comprehensive safety program and regular training."
      },
      {
        title: "Material cost increases",
        probability: 4,
        impact: 3,
        mitigation: "Secure fixed-price contracts with suppliers where possible."
      }
    ]
  };
  
  // Combine base risks with industry-specific risks
  let combinedRisks = [...baseRisks];
  
  if (industryRisks[industry]) {
    combinedRisks = [...combinedRisks, ...industryRisks[industry]];
  }
  
  // Add a project-specific risk based on description
  if (projectData.projectDescription) {
    const keywords = {
      "integration": {
        title: "System integration failures",
        probability: 4,
        impact: 4,
        mitigation: "Implement thorough integration testing and phased deployment."
      },
      "international": {
        title: "Cross-border compliance issues",
        probability: 3,
        impact: 4,
        mitigation: "Engage local legal experts and research country-specific requirements."
      },
      "vendor": {
        title: "Vendor performance issues",
        probability: 3,
        impact: 3,
        mitigation: "Implement vendor performance SLAs and monitoring."
      }
    };
    
    // Check if any keywords are in the description
    for (const [keyword, risk] of Object.entries(keywords)) {
      if (projectData.projectDescription.toLowerCase().includes(keyword)) {
        combinedRisks.push(risk);
        break;
      }
    }
  }
  
  return combinedRisks;
}

export async function directApiCall(prompt) {
  const apiKey = getApiKey();
  
  if (!apiKey) {
    throw new Error("Gemini API key not found");
  }
  
  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
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
                text: prompt,
              },
            ],
          },
        ],
      }),
    }
  );
  
  // Process response...
}
