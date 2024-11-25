import React, { useState } from 'react';
import { Search, Brain, Coins, ArrowRight, CheckCircle2, Globe2 } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { getSchemeRecommendations } from '../services/aiService';

const SchemeCard = ({ scheme }) => (
  <div className="glass-card p-6 hover:shadow-lg transition-all min-h-[400px] max-h-[400px] flex flex-col">

    <div className="flex-1 flex flex-col min-h-0">

      <div className="flex items-center justify-between h-[40px]">
        <span className="px-4 py-1.5 text-sm rounded-full bg-[var(--primary-50)] text-[var(--primary-600)]">
          {scheme.type}
        </span>
        <span className="text-[var(--primary-500)] font-medium whitespace-nowrap">
          {scheme.amount}
        </span>
      </div>


      <div className="my-4">
        <h3 className="text-xl font-bold mb-3 h-[56px] line-clamp-2 overflow-hidden">
          {scheme.title}
        </h3>
        <p className="text-[var(--primary-600)] mb-4 h-[48px] line-clamp-2 overflow-hidden">
          {scheme.shortDescription}
        </p>
      </div>

      {scheme.keyEligibility && scheme.keyEligibility.length > 0 && (
        <div className="space-y-3 h-[100px] overflow-hidden">
          {scheme.keyEligibility.slice(0, 2).map((item, index) => (
            <div key={index} className="flex items-start gap-3">
              <CheckCircle2 
                className="text-[var(--primary-500)] mt-1 flex-shrink-0" 
                size={18} 
              />
              <span className="text-sm text-[var(--primary-600)] line-clamp-2">
                {item}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>


    <div className="mt-6 pt-4 border-t border-[var(--glass-border)]">
      <a
        href={scheme.applicationUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="block w-full py-3 rounded-lg gradient-bg text-white text-center font-medium hover:opacity-90 transition-opacity"
      >
        Apply Now
      </a>
    </div>
  </div>
);

const ResultsSection = ({ isLoading, schemes }) => {

  const displaySchemes = schemes.slice(0, 6);

  return (
    <div className="mb-12">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">Available Schemes</h2>
        <span className="text-[var(--primary-600)]">
          {schemes.length} schemes found
        </span>
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-[var(--primary-500)] border-t-transparent"></div>
        </div>
      ) : displaySchemes.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displaySchemes.map((scheme) => (
            <SchemeCard key={scheme.id} scheme={scheme} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12 glass-card">
          <p className="text-[var(--primary-600)]">
            No matching schemes found. Try adjusting your search criteria.
          </p>
        </div>
      )}
    </div>
  );
};

const IncentiveHub = () => {
  const [businessProfile, setBusinessProfile] = useState({
    industry: '',
    size: '',
    country: '',
    requirements: ''
  });

  const [showResults, setShowResults] = useState(false);

  const { data: schemes = [], isLoading } = useQuery({
    queryKey: ['schemes', businessProfile],
    queryFn: () => getSchemeRecommendations(businessProfile),
    enabled: showResults && !!businessProfile.country,
    staleTime: 5 * 60 * 1000, 
    select: (data) => {
     
      return data.map(scheme => ({
        ...scheme,
        id: scheme.id || Math.random().toString(36).substr(2, 9),
        type: scheme.type || 'Grant',
        amount: scheme.amount || 'Variable',
        shortDescription: scheme.shortDescription || scheme.description,
        keyEligibility: scheme.keyEligibility || []
      }));
    }
  });

  const handleSearch = () => {
    if (businessProfile.industry && businessProfile.size && businessProfile.country) {
      setShowResults(true);
    }
  };

  const regions = [
    {
      name: "Asia Pacific",
      countries: ["India", "Japan", "Singapore"],
      schemeCount: 150,
      countryPortals: {
        "India": "https://www.startupindia.gov.in",
        "Japan": "https://www.jetro.go.jp/en/invest",
        "Singapore": "https://www.enterprisesg.gov.sg"
      }
    },
    {
      name: "Europe",
      countries: ["UK", "Germany", "France"],
      schemeCount: 200,
      countryPortals: {
        "UK": "https://www.gov.uk/business-finance-support",
        "Germany": "https://www.make-it-in-germany.com",
        "France": "https://www.businessfrance.fr"
      }
    },
    {
      name: "Americas",
      countries: ["USA", "Canada", "Brazil"],
      schemeCount: 180,
      countryPortals: {
        "USA": "https://www.sba.gov/funding-programs",
        "Canada": "https://www.canada.ca/en/services/business/grants.html",
        "Brazil": "https://www.gov.br/empresas-e-negocios/en"
      }
    }
  ];

  const featuredSchemes = [
    {
      title: "Startup India Seed Fund",
      description: "Up to ₹5 Million for early-stage startups",
      url: "https://startupindia.gov.in/content/sih/en/government-schemes.html"
    },
    {
      title: "MSME Technology Upgrade",
      description: "Support for technology modernization",
      url: "https://msme.gov.in/technology-upgradation-and-quality-certification"
    },
    {
      title: "PLI Scheme",
      description: "Production Linked Incentives",
      url: "https://pli.gov.in/"
    }
  ];

  return (
    <div className="max-w-7xl mx-auto p-6">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold font-heading mb-4 gradient-text">
          Business Incentives Navigator
        </h1>
        <p className="text-lg text-[var(--primary-600)] max-w-2xl mx-auto">
          Find relevant government schemes and incentives for your business
        </p>
      </div>

      {/* Search Form */}
      <div className="glass-card p-8 mb-12 max-w-3xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium mb-2">Industry</label>
            <input
              type="text"
              className="w-full p-3 rounded-lg border border-[var(--glass-border)]"
              placeholder="e.g., Technology"
              value={businessProfile.industry}
              onChange={(e) => setBusinessProfile(prev => ({
                ...prev,
                industry: e.target.value
              }))}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Business Size</label>
            <select
              className="w-full p-3 rounded-lg border border-[var(--glass-border)]"
              value={businessProfile.size}
              onChange={(e) => setBusinessProfile(prev => ({
                ...prev,
                size: e.target.value
              }))}
            >
              <option value="">Select size</option>
              <option value="startup">Startup</option>
              <option value="small">Small Business</option>
              <option value="medium">Medium Enterprise</option>
              <option value="large">Large Enterprise</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Country</label>
            <select
              className="w-full p-3 rounded-lg border border-[var(--glass-border)]"
              value={businessProfile.country}
              onChange={(e) => setBusinessProfile(prev => ({
                ...prev,
                country: e.target.value
              }))}
            >
              <option value="">Select country</option>
              <option value="India">India</option>
              <option value="USA">United States</option>
              <option value="UK">United Kingdom</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Requirements</label>
            <input
              type="text"
              className="w-full p-3 rounded-lg border border-[var(--glass-border)]"
              placeholder="e.g., expansion funding"
              value={businessProfile.requirements}
              onChange={(e) => setBusinessProfile(prev => ({
                ...prev,
                requirements: e.target.value
              }))}
            />
          </div>
        </div>

        <button
          onClick={handleSearch}
          disabled={!businessProfile.industry || !businessProfile.size || !businessProfile.country}
          className={`mt-8 w-full py-3 rounded-lg flex items-center justify-center gap-2 
            ${(!businessProfile.industry || !businessProfile.size || !businessProfile.country)
              ? 'bg-gray-200 text-gray-500'
              : 'gradient-bg text-white hover:opacity-90'} 
            transition-all`}
        >
          <Search size={20} />
          Find Schemes
        </button>
      </div>

      {showResults && (
        <ResultsSection 
          isLoading={isLoading} 
          schemes={schemes} 
        />
      )}

      <div className="mb-12">
        <h2 className="text-2xl font-bold mb-6">Explore by Region</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {regions.map((region, index) => (
            <div key={index} className="glass-card p-6 h-full flex flex-col">
              <Globe2 className="text-[var(--primary-500)] mb-4" size={24} />
              <h3 className="text-xl font-bold mb-2">{region.name}</h3>
              <div className="flex-grow">
                {region.countries.map((country) => (
                  <a
                    key={country}
                    href={region.countryPortals[country]}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block text-[var(--primary-600)] hover:text-[var(--primary-500)] mb-2 transition-colors"
                  >
                    {country} <ArrowRight className="inline" size={16} />
                  </a>
                ))}
              </div>
              <div className="mt-4">
                <span className="text-sm text-[var(--primary-500)]">
                  {region.schemeCount} schemes available
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-bold mb-6">Featured Schemes</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featuredSchemes.map((scheme, index) => (
            <a
              key={index}
              href={scheme.url}
              target="_blank"
              rel="noopener noreferrer"
              className="glass-card p-6 hover:shadow-lg transition-all h-[200px] flex flex-col"
            >
              <h3 className="text-xl font-bold mb-2">{scheme.title}</h3>
              <p className="text-[var(--primary-600)] flex-grow">{scheme.description}</p>
              <div className="flex items-center justify-end text-[var(--primary-500)]">
                Learn More <ArrowRight className="ml-2" size={16} />
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default IncentiveHub; 