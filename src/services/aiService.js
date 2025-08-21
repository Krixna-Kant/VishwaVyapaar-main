import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export const getSchemeRecommendations = async (businessProfile) => {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
    
    const prompt = `As a government schemes expert, find ACTIVE schemes for:

Country: ${businessProfile.country} (STRICTLY ONLY FOR THIS COUNTRY)
Industry: ${businessProfile.industry}
Business Size: ${businessProfile.size}
Requirements: ${businessProfile.requirements}

If Country is India, include:
- Startup India schemes for startups
- MSME schemes for small businesses
- PLI schemes for manufacturing
- Digital India for tech companies
- Export promotion schemes
- State-specific policies

If Country is USA, include:
- SBA loans and grants
- Federal grants
- State-specific incentives
- R&D tax credits
- Export assistance

If Country is UK, include:
- Innovation grants
- R&D tax relief
- Regional growth funds
- Export support
- Local enterprise partnerships

Return ONLY VERIFIED schemes in this format:
{
  "schemes": [
    {
      "id": "unique_id",
      "title": "scheme name",
      "country": "${businessProfile.country}",
      "type": "grant/loan/subsidy",
      "amount": "funding amount",
      "shortDescription": "one-line key benefit",
      "keyEligibility": [
        "main criterion 1",
        "main criterion 2"
      ],
      "applicationUrl": "direct application url",
      "deadline": "if applicable"
    }
  ]
}

IMPORTANT:
1. Return ONLY schemes for ${businessProfile.country}
2. Match industry: ${businessProfile.industry}
3. Match business size: ${businessProfile.size}
4. Include ACTIVE schemes only
5. Verify all information`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const textResponse = response.text();
    
    try {
      const parsedResponse = JSON.parse(textResponse);
      const filteredSchemes = parsedResponse.schemes.filter(scheme => 
        scheme.country.toLowerCase() === businessProfile.country.toLowerCase()
      );
      return filteredSchemes;
    } catch (error) {
      console.error('Parsing error:', error);
      return [];
    }
  } catch (error) {
    console.error('API error:', error);
    return [];
  }
};

export const getRegionSchemes = async (region) => {
  const regionData = {
    'Asia Pacific': {
      schemes: [
        {
          title: "Make in India",
          description: "Manufacturing sector incentives",
          url: "https://www.makeinindia.gov.in/"
        },
      ]
    },
    'Europe': {
      schemes: [
        {
          title: "Horizon Europe",
          description: "Research and innovation funding",
          url: "https://ec.europa.eu/info/horizon-europe"
        },
      ]
    },
  };

  return regionData[region]?.schemes || [];
}; 