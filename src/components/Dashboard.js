import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { 
  Layout, Globe, Gift, MessageCircle, BarChart, ChevronRight, BookOpen, Award 
} from 'lucide-react';

const Dashboard = () => {
  const [selectedCountry, setSelectedCountry] = useState('USA');
  const [expanded, setExpanded] = useState(null);

  const countryData = {
    USA: {
      steps: [
        { title: 'FDA Registration', progress: 100, description: 'Complete FDA documentation & certification' },
        { title: 'US Market Standards', progress: 37, description: 'Product compliance with US regulations' },
        { title: 'Market Research', progress: 50, description: 'Consumer behavior & competitor analysis' },
        { title: 'Distribution Setup', progress: 25, description: 'Warehouse & logistics network' }
      ],
      rules: [
        {
          title: "FDA Registration Requirements",
          description: "Complete guide to FDA registration process",
          details: [
            "Submit Form FDA 3537 for facility registration",
            "Renew registration every even-numbered year",
            "Maintain up-to-date facility information",
            "Designate a U.S. agent if foreign facility",
            "Pay applicable registration fees"
          ]
        },
        {
          title: "Product Safety Standards",
          description: "CPSC safety guidelines and requirements",
          details: [
            "Meet product category-specific safety standards",
            "Conduct required product testing",
            "Issue certificate of compliance",
            "Maintain testing and certification records",
            "Follow reporting requirements for safety issues"
          ]
        },
        {
          title: "Labeling Requirements",
          description: "FDA labeling and packaging standards",
          details: [
            "Include required nutrition facts panel",
            "List ingredients in descending order",
            "Declare major food allergens",
            "Include country of origin labeling",
            "Provide net quantity statement"
          ]
        }
      ],
      keyInfo: [
        {
          icon: Award,
          title: "US Market Opportunity",
          details: "New tax benefits for importers from developing nations",
          date: "Updated 2 days ago",
          link: "https://ustr.gov/trade-agreements/free-trade-agreements"
        },
        {
          icon: BookOpen,
          title: "Regulation Update",
          details: "FDA simplified registration process for 2024",
          date: "Updated 5 days ago",
          link: "https://www.fda.gov/news-events/press-announcements"
        },
        {
          icon: BarChart,
          title: "Market Insights",
          details: "US consumer demand up 25% in Q1 2024",
          date: "Updated 1 week ago",
          link: "https://www.trade.gov/market-intelligence"
        }
      ]
    },
    UK: {
      steps: [
        { title: 'UKCA Registration', progress: 90, description: 'UK Conformity Assessment completion' },
        { title: 'Brexit Compliance', progress: 65, description: 'Updated trade documentation' },
        { title: 'Market Entry', progress: 40, description: 'UK retail partnership setup' },
        { title: 'Local Presence', progress: 30, description: 'UK business entity establishment' }
      ],
      rules: [
        {
          title: "UKCA Marking Requirements",
          description: "UK Conformity Assessment standards",
          details: [
            "Identify applicable UK regulations and standards",
            "Conduct conformity assessment procedures",
            "Prepare technical documentation",
            "Apply UKCA marking correctly",
            "Issue UK Declaration of Conformity"
          ]
        },
        {
          title: "VAT Registration Process",
          description: "UK tax registration requirements",
          details: [
            "Register for UK VAT if threshold exceeded",
            "Maintain VAT accounting records",
            "Submit quarterly VAT returns",
            "Appoint fiscal representative if required",
            "Understand distance selling rules"
          ]
        },
        {
          title: "Post-Brexit Documentation",
          description: "Updated trade documentation requirements",
          details: [
            "Complete customs declaration forms",
            "Provide proof of origin documentation",
            "Submit safety and security declarations",
            "Maintain import/export licenses",
            "Follow rules of origin requirements"
          ]
        }
      ],
      keyInfo: [
        {
          icon: Award,
          title: "UK-India Trade Corridor",
          details: "New trade benefits announced for Indian exporters",
          date: "Updated 1 day ago",
          link: "https://www.gov.uk/government/news/uk-and-india-trade-deal"
        },
        {
          icon: BookOpen,
          title: "Brexit Update 2024",
          details: "New customs procedures implementation",
          date: "Updated 3 days ago",
          link: "https://www.gov.uk/brexit-guidance"
        }
      ]
    },
    Japan: {
      steps: [
        { title: 'JIS Certification', progress: 85, description: 'Japanese Industrial Standards' },
        { title: 'Label Translation', progress: 70, description: 'Japanese packaging requirements' },
        { title: 'Market Strategy', progress: 45, description: 'Japanese consumer research' },
        { title: 'Import Process', progress: 20, description: 'Customs clearance setup' }
      ],
      rules: [
        {
          title: "JIS Certification Process",
          description: "Japanese Industrial Standards requirements",
          details: [
            "Apply for JIS Mark certification",
            "Complete factory audit process",
            "Submit product testing results",
            "Maintain quality control systems",
            "Regular compliance monitoring"
          ]
        },
        {
          title: "Import License Requirements",
          description: "Japanese import licensing procedures",
          details: [
            "Register with JETRO",
            "Obtain Import Business License",
            "Complete customs registration",
            "Secure product-specific permits",
            "Maintain import records"
          ]
        },
        {
          title: "Labeling Standards",
          description: "Japanese language and content requirements",
          details: [
            "Provide Japanese language labels",
            "Include mandatory warning statements",
            "List ingredients in Japanese",
            "Show country of origin",
            "Display expiration dates properly"
          ]
        }
      ],
      keyInfo: [
        {
          icon: Award,
          title: "JETRO Support Program",
          details: "New assistance package for foreign businesses",
          date: "Updated today",
          link: "https://www.jetro.go.jp/en/news/"
        },
        {
          icon: BarChart,
          title: "Market Analysis 2024",
          details: "Japanese consumer trends report",
          date: "Updated 4 days ago",
          link: "https://www.jetro.go.jp/en/reports/"
        }
      ]
    }
  };
  const current = countryData[selectedCountry] || countryData.USA;
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white p-6 md:p-10">
      {/* Header */}
      <header className="mb-10 flex flex-col md:flex-row justify-between items-start md:items-center">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold text-blue-700">
            Export Journey to <span className="text-blue-500">{selectedCountry}</span>
          </h1>
          <p className="text-blue-600 mt-1">Track and manage your export progress</p>
        </div>

        <select
          value={selectedCountry}
          onChange={(e) => setSelectedCountry(e.target.value)}
          className="mt-4 md:mt-0 px-4 py-2 border border-blue-300 rounded-full bg-white text-blue-700 shadow-sm"
        >
          <option value="USA">United States</option>
          <option value="UK">United Kingdom</option>
          <option value="Japan">Japan</option>
        </select>
      </header>

      {/* Progress cards */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        {current.steps.map((step, idx) => (
          <div key={idx} className="bg-white rounded-xl p-6 shadow-lg hover:shadow-blue-300/40 transition-all">
            <h4 className="text-lg font-semibold text-blue-700 mb-2">{step.title}</h4>
            <div className="w-full bg-blue-100 rounded-full h-2.5 mb-2">
              <div
                className="bg-gradient-to-r from-blue-400 to-blue-600 h-2.5 rounded-full"
                style={{ width: `${step.progress}%` }}
              />
            </div>
            <p className="text-sm text-gray-600">{step.description}</p>
            <p className="text-xs text-blue-600 font-bold mt-1">{step.progress}% Complete</p>
          </div>
        ))}
      </section>

      {/* Requirements & Updates */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Requirements */}
        <div className="bg-white rounded-xl p-6 shadow-lg">
          <h2 className="text-2xl font-bold text-blue-700 mb-4">Export Requirements</h2>
          <ul className="space-y-3">
            {current.rules.map((rule, idx) => (
              <li key={idx}>
                <button
                  onClick={() => setExpanded(expanded === idx ? null : idx)}
                  className="w-full flex items-start gap-3 text-left p-3 rounded-lg hover:bg-blue-50 transition"
                >
                  <ChevronRight
                    className={`w-5 h-5 text-blue-500 shrink-0 transition-transform ${
                      expanded === idx ? 'rotate-90' : ''
                    }`}
                  />
                  <div>
                    <p className="font-semibold text-blue-700">{rule.title}</p>
                    <p className="text-sm text-gray-600">{rule.description}</p>
                  </div>
                </button>
                {expanded === idx && (
                  <div className="ml-8 mt-2 p-3 bg-blue-50 rounded-lg">
                    <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
                      {rule.details.map((d, i) => <li key={i}>{d}</li>)}
                    </ul>
                  </div>
                )}
              </li>
            ))}
          </ul>
        </div>

        {/* Latest updates */}
        <div className="bg-white rounded-xl p-6 shadow-lg">
          <h2 className="text-2xl font-bold text-blue-700 mb-4">Latest Updates</h2>
          <div className="space-y-4">
            {current.keyInfo.map((info, idx) => (
              <a
                key={idx}
                href={info.link}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-3 p-3 rounded-lg hover:bg-blue-50 transition"
              >
                <div className="p-2 bg-gradient-to-br from-blue-400 to-blue-600 rounded-lg text-white">
                  <info.icon size={20} />
                </div>
                <div>
                  <p className="font-semibold text-blue-700">{info.title}</p>
                  <p className="text-sm text-gray-600">{info.details}</p>
                  <p className="text-xs text-blue-400 mt-1">{info.date}</p>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

//   const handleRequirementClick = (index) => {
//     setExpandedRequirement(expandedRequirement === index ? null : index);
//   };

//   const handleUpdateClick = (link) => {
//     window.open(link, '_blank');
//   };

//   const currentData = countryData[selectedCountry];

//   return (
//     <div className="p-8 space-y-8">
//       <header className="flex justify-between items-center mb-8">
//         <div>
//           <h3 className="text-4xl font-bold text-[var(--primary-600)] font-heading tracking-tight mb-2">
//             Export Journey to <span className="gradient-text">{selectedCountry}</span>
//           </h3>
//           <p className="text-[var(--primary-500)] font-body">
//             Track and manage your export progress
//           </p>
//         </div>
        
//         <select
//           value={selectedCountry}
//           onChange={(e) => setSelectedCountry(e.target.value)}
//           className="glass-card px-6 py-3 rounded-full text-[var(--primary-600)] 
//                    font-body font-medium border-2 border-transparent 
//                    hover:border-[var(--primary-300)] focus:outline-none 
//                    focus:border-[var(--primary-400)]"
//         >
//           <option value="USA">United States</option>
//           <option value="UK">United Kingdom</option>
//           <option value="Japan">Japan</option>
//         </select>
//       </header>

//       <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
//         {currentData.steps.map((step, index) => (
//           <div key={index} className="glass-card rounded-xl p-6 hover:scale-105 transition-all duration-300">
//             <h4 className="text-xl font-semibold text-[var(--primary-600)] font-heading mb-3">
//               {step.title}
//             </h4>
//             <div className="mt-4 h-3 bg-[var(--primary-100)] rounded-full overflow-hidden">
//               <div 
//                 className="h-full rounded-full transition-all duration-500 gradient-bg"
//                 style={{ width: `${step.progress}%` }}
//               />
//             </div>
//             <p className="mt-4 text-[var(--primary-500)] font-body">
//               {step.description}
//             </p>
//             <p className="mt-2 font-semibold gradient-text font-heading">
//               {step.progress}% Complete
//             </p>
//           </div>
//         ))}
//       </section>

//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
//         <section className="glass-card rounded-xl p-8">
//           <h3 className="text-2xl font-bold text-[var(--primary-600)] font-heading mb-6">
//             Export Requirements
//           </h3>
//           <ul className="space-y-4 font-body">
//             {currentData.rules.map((rule, index) => (
//               <li key={index}>
//                 <div 
//                   onClick={() => handleRequirementClick(index)}
//                   className="flex items-start p-4 rounded-lg hover:bg-[var(--primary-50)] 
//                            cursor-pointer transition-all duration-300 group"
//                 >
//                   <ChevronRight className={`w-6 h-6 text-[var(--primary-500)] mt-0.5 transition-transform duration-300
//                     ${expandedRequirement === index ? 'rotate-90' : ''}`} />
//                   <div className="ml-3">
//                     <p className="text-[var(--primary-600)] font-medium">
//                       {rule.title}
//                     </p>
//                     <p className="text-sm text-[var(--primary-400)] mt-1">
//                       {rule.description}
//                     </p>
//                   </div>
//                 </div>
//                 {expandedRequirement === index && (
//                   <div className="ml-12 mt-2 p-4 rounded-lg bg-[var(--primary-50)]">
//                     <ul className="list-disc space-y-2 text-[var(--primary-600)]">
//                       {rule.details.map((detail, idx) => (
//                         <li key={idx} className="ml-4 text-sm">
//                           {detail}
//                         </li>
//                       ))}
//                     </ul>
//                   </div>
//                 )}
//               </li>
//             ))}
//           </ul>
//         </section>

//         <section className="glass-card rounded-xl p-8">
//           <h3 className="text-2xl font-bold text-[var(--primary-600)] font-heading mb-6">
//             Latest Updates
//           </h3>
//           <div className="space-y-4">
//             {currentData.keyInfo.map((info, index) => (
//               <div 
//                 key={index} 
//                 onClick={() => handleUpdateClick(info.link)}
//                 className="flex items-start p-4 rounded-xl hover:bg-[var(--primary-50)] 
//                          cursor-pointer transition-all duration-300 group"
//               >
//                 <div className="p-3 rounded-full gradient-bg shrink-0 
//                               group-hover:scale-110 transition-all">
//                   <info.icon className="w-6 h-6 text-white" />
//                 </div>
//                 <div className="ml-4">
//                   <h4 className="font-heading font-semibold text-[var(--primary-600)]">
//                     {info.title}
//                   </h4>
//                   <p className="text-[var(--primary-500)] font-body text-sm mt-1">
//                     {info.details}
//                   </p>
//                   <p className="text-xs text-[var(--primary-400)] mt-2 font-body">
//                     {info.date}
//                   </p>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </section>
//       </div>
//     </div>
//   );
// };

// export default Dashboard;
