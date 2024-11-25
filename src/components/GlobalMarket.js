import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from './ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from './ui/tabs';
import { 
  Globe2, Truck, TrendingUp, ArrowUp, ArrowDown, Store, 
  Package, CreditCard, BarChart2, PieChart,
  DollarSign, Users, ShoppingCart, Activity, Smartphone
} from 'lucide-react';
import {
  ComposedChart, Area, XAxis, YAxis, CartesianGrid, 
  Tooltip, Line, ResponsiveContainer,
  RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis,
  Radar
} from 'recharts';
import { VectorMap } from "@react-jvectormap/core";
import { worldMill } from "@react-jvectormap/world";
import $ from 'jquery';

window.$ = $;
window.jQuery = $;

// Add these constants
const WORLD_GEO_URL = "https://raw.githubusercontent.com/deldersveld/topojson/master/world-continents.json";

const getCountryData = (countryName) => {

  const countryMapping = {
    "China": { value: 892, growth: 32 },
    "India": { value: 125, growth: 45 },
    "United States": { value: 785, growth: 28 },

  };
  return countryMapping[countryName];
};

const getMarketData = (countryName) => {
  const marketData = {
    "China": { intensity: 0.8, volume: "1.34T", growth: 32 },
    "United States": { intensity: 0.7, volume: "875B", growth: 28 },
    "United Kingdom": { intensity: 0.6, volume: "169B", growth: 15 },
    "Japan": { intensity: 0.65, volume: "217B", growth: 18 },
    "Germany": { intensity: 0.55, volume: "141B", growth: 12 },
    "India": { intensity: 0.5, volume: "98B", growth: 45 },
    "Brazil": { intensity: 0.45, volume: "85B", growth: 35 },
    "France": { intensity: 0.52, volume: "93B", growth: 14 },
    "South Korea": { intensity: 0.58, volume: "102B", growth: 22 },
    "Canada": { intensity: 0.48, volume: "78B", growth: 16 }
  };
  return marketData[countryName];
};



const GlobalMarketplace = () => {
  const [activeTab, setActiveTab] = useState('analytics');
  const [selectedTimeframe, setSelectedTimeframe] = useState('1Y');
  const [selectedView, setSelectedView] = useState('ecommerce');
  const [tooltipContent, setTooltipContent] = useState(null);

  const marketplaceData = {
    platforms: [
      {
        name: 'Amazon',
        countries: 17,
        marketShare: 45,
        stats: {
          gmv: '683B',
          activeUsers: '310M',
          growth: 28,
          merchants: '9.7M'
        },
        performance: {
          conversion: 3.8,
          mobileTraffic: 71,
          crossBorder: 42,
          satisfaction: 95
        },
        categories: [
          { name: 'Electronics', share: 35 },
          { name: 'Fashion', share: 28 },
          { name: 'Home', share: 22 },
          { name: 'Beauty', share: 15 }
        ],
        regions: [
          { name: 'North America', share: 45 },
          { name: 'Europe', share: 30 },
          { name: 'Asia Pacific', share: 15 },
          { name: 'Rest of World', share: 10 }
        ]
      },

    ],
    
    insights: [
      {
        title: 'Market Dynamics',
        metrics: [
          {
            label: 'Cross-Border Growth',
            current: 42,
            previous: 35,
            trend: 'up'
          },
          {
            label: 'Mobile Commerce',
            current: 71,
            previous: 65,
            trend: 'up'
          },
          {
            label: 'Social Commerce',
            current: 28,
            previous: 22,
            trend: 'up'
          }
        ]
      }
    ]
  };

  const analyticsData = {
    globalTrends: [
      { period: 'Jan 2024', crossBorder: 385, domestic: 642, mobileCommerce: 518, socialCommerce: 245 },
      { period: 'Feb 2024', crossBorder: 420, domestic: 658, mobileCommerce: 535, socialCommerce: 278 },
      { period: 'Mar 2024', crossBorder: 455, domestic: 675, mobileCommerce: 562, socialCommerce: 312 },
      { period: 'Apr 2024', crossBorder: 512, domestic: 701, mobileCommerce: 589, socialCommerce: 345 },
      { period: 'May 2024', crossBorder: 578, domestic: 734, mobileCommerce: 615, socialCommerce: 389 },
      { period: 'Jun 2024', crossBorder: 645, domestic: 768, mobileCommerce: 652, socialCommerce: 425 }
    ],
    marketComparison: [
      {
        metric: 'User Engagement',
        amazon: 95,
        alibaba: 88,
        rakuten: 75,
        otto: 68
      },
      {
        metric: 'Market Share',
        amazon: 45,
        alibaba: 35,
        rakuten: 15,
        otto: 5
      },
      {
        metric: 'Growth Rate',
        amazon: 28,
        alibaba: 32,
        rakuten: 18,
        otto: 12
      }
    ],
    keyMetrics: [
      {
        title: 'Global GMV',
        value: '$1.2T',
        change: '+18.3%',
        icon: DollarSign,
        stats: [
          { label: 'Cross-Border', value: '42%' },
          { label: 'Mobile', value: '65%' },
          { label: 'Social', value: '28%' }
        ]
      },
      {
        title: 'Active Markets',
        value: '127',
        change: '+12.4%',
        icon: Globe2,
        stats: [
          { label: 'APAC', value: '45' },
          { label: 'EMEA', value: '52' },
          { label: 'Americas', value: '30' }
        ]
      },
      {
        title: 'User Base',
        value: '2.8B',
        change: '+21.7%',
        icon: Users,
        stats: [
          { label: 'Mobile', value: '78%' },
          { label: 'Desktop', value: '22%' }
        ]
      },
      {
        title: 'Conversion Rate',
        value: '3.8%',
        change: '+0.5%',
        icon: Activity,
        stats: [
          { label: 'Mobile', value: '3.2%' },
          { label: 'Desktop', value: '4.5%' }
        ]
      }
    ],
    geographicDistribution: [
      {
        region: 'North America',
        value: 42,
        growth: 15,
        potential: 85
      },
      {
        region: 'Europe',
        value: 35,
        growth: 18,
        potential: 78
      },
      {
        region: 'Asia Pacific',
        value: 38,
        growth: 25,
        potential: 92
      },
      {
        region: 'Latin America',
        value: 15,
        growth: 28,
        potential: 65
      }
    ]
  };

  const chartConfig = {
    areaGradient: (
      <defs>
        <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
          <stop offset="5%" stopColor="var(--primary-500)" stopOpacity={0.8} />
          <stop offset="95%" stopColor="var(--primary-500)" stopOpacity={0} />
        </linearGradient>
      </defs>
    ),
    tooltipStyle: {
      backgroundColor: 'rgba(0, 0, 0, 0.8)',
      border: '1px solid var(--primary-400)',
      borderRadius: '4px',
      padding: '8px'
    }
  };

  // Enhanced marketplace analytics data
  const marketplaceAnalytics = {
    quarterlyGrowth: [
      {
        quarter: 'Q1 2024',
        amazon: 28.5,
        alibaba: 24.3,
        shopify: 32.1,
        walmart: 18.7
      },
      {
        quarter: 'Q4 2023',
        amazon: 25.8,
        alibaba: 22.1,
        shopify: 29.4,
        walmart: 16.9
      },

    ],
    categoryTrends: [
      {
        category: 'Electronics',
        growth: 35,
        volume: '892B',
        topSellers: ['Smartphones', 'Laptops', 'Wearables'],
        marketShare: {
          amazon: 45,
          alibaba: 30,
          others: 25
        }
      },
      {
        category: 'Fashion',
        growth: 28,
        volume: '672B',
        topSellers: ['Athletic Wear', 'Casual Wear', 'Accessories'],
        marketShare: {
          amazon: 38,
          alibaba: 35,
          others: 27
        }
      },
 
    ],
    regionalPerformance: [
      {
        region: 'North America',
        marketplaces: [
          { name: 'Amazon', share: 45, growth: 22 },
          { name: 'Walmart', share: 15, growth: 18 },
          { name: 'eBay', share: 12, growth: 8 }
        ],
        totalVolume: '892B',
        yearOverYearGrowth: 24
      },

    ]
  };

  const countryData = {
    regions: [
      {
        name: 'Asia Pacific',
        countries: [
          { 
            name: 'China', 
            marketSize: '892B',
            growth: 32,
            platforms: ['Alibaba', 'JD', 'Pinduoduo'],
            categories: ['Electronics', 'Fashion', 'FMCG'],
            penetration: 78
          },
          { 
            name: 'India', 
            marketSize: '125B',
            growth: 45,
            platforms: ['Flipkart', 'Amazon', 'Meesho'],
            categories: ['Mobile', 'Fashion', 'Groceries'],
            penetration: 62
          },
        ],
        stats: {
          totalGMV: '1.2T',
          growth: 35,
          users: '850M'
        }
      },

    ]
  };

  return (
    <div className="w-full p-6 space-y-8">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-[var(--primary-600)]">
          Global Market Intelligence
        </h2>
        <div className="flex gap-2">
          {['1M', '3M', '6M', '1Y', 'ALL'].map((period) => (
            <button
              key={period}
              onClick={() => setSelectedTimeframe(period)}
              className={`px-3 py-1 rounded-full text-sm ${
                selectedTimeframe === period
                  ? 'bg-[var(--primary-500)] text-white'
                  : 'bg-[var(--primary-50)] text-[var(--primary-500)]'
              }`}
            >
              {period}
            </button>
          ))}
        </div>
      </div>

      <Tabs defaultValue="analytics" className="w-full">
        <TabsList className="mb-8">
          <TabsTrigger 
            value="analytics"
            className="flex items-center gap-2"
          >
            <BarChart2 className="w-4 h-4" />
            Market Analytics
          </TabsTrigger>
          <TabsTrigger 
            value="marketplaces"
            className="flex items-center gap-2"
          >
            <Store className="w-4 h-4" />
            Marketplaces
          </TabsTrigger>
          <TabsTrigger 
            value="insights"
            className="flex items-center gap-2"
          >
            <TrendingUp className="w-4 h-4" />
            Insights
          </TabsTrigger>
        </TabsList>

        <TabsContent value="analytics">

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {analyticsData.keyMetrics.map((metric, index) => (
              <Card key={index} className="glass-card border-l-4 border-[var(--primary-500)]">
                <CardContent className="p-6">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-sm text-[var(--primary-400)]">{metric.title}</p>
                      <h3 className="text-2xl font-bold text-[var(--primary-600)] mt-1">
                        {metric.value}
                      </h3>
                      <div className="flex items-center gap-2 mt-2">
                        <ArrowUp className="w-4 h-4 text-green-500" />
                        <span className="text-green-500 text-sm">{metric.change}</span>
                      </div>
                    </div>
                    <div className="p-3 rounded-full bg-[var(--primary-50)]">
                      <metric.icon className="w-5 h-5 text-[var(--primary-500)]" />
                    </div>
                  </div>

                  <div className="mt-4 space-y-2">
                    {metric.stats.map((stat, idx) => (
                      <div key={idx} className="flex justify-between items-center">
                        <span className="text-sm text-[var(--primary-400)]">
                          {stat.label}
                        </span>
                        <span className="text-sm font-medium text-[var(--primary-600)]">
                          {stat.value}
                        </span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

            <Card className="glass-card">
              <CardHeader className="border-b border-[var(--primary-100)]">
                <CardTitle className="text-[var(--primary-600)]">
                  Cross-Border Trade Growth
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <ComposedChart data={analyticsData.globalTrends}>
                      <defs>
                        <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="var(--primary-500)" stopOpacity={0.8} />
                          <stop offset="95%" stopColor="var(--primary-500)" stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="var(--primary-200)" />
                      <XAxis 
                        dataKey="period" 
                        stroke="var(--primary-400)"
                        tick={{ fill: 'var(--primary-600)' }}
                      />
                      <YAxis 
                        stroke="var(--primary-400)"
                        tick={{ fill: 'var(--primary-600)' }}
                      />
                      <Tooltip 
                        contentStyle={{
                          backgroundColor: 'rgba(0, 0, 0, 0.8)',
                          border: '1px solid var(--primary-400)',
                          borderRadius: '4px'
                        }}
                      />
                      <Area
                        type="monotone"
                        dataKey="crossBorder"
                        stroke="var(--primary-500)"
                        fill="url(#colorGradient)"
                      />
                      <Line
                        type="monotone"
                        dataKey="domestic"
                        stroke="var(--accent-coral)"
                        strokeWidth={2}
                      />
                    </ComposedChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card className="glass-card">
              <CardHeader className="border-b border-[var(--primary-100)]">
                <CardTitle className="text-[var(--primary-600)]">
                  Market Performance Matrix
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <RadarChart data={analyticsData.marketComparison}>
                      <PolarGrid stroke="var(--primary-200)" />
                      <PolarAngleAxis 
                        dataKey="metric"
                        tick={{ fill: 'var(--primary-600)' }}
                      />
                      <PolarRadiusAxis stroke="var(--primary-400)" />
                      <Radar
                        name="Performance"
                        dataKey="value"
                        stroke="var(--primary-500)"
                        fill="var(--primary-500)"
                        fillOpacity={0.5}
                      />
                      <Tooltip />
                    </RadarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>


        <TabsContent value="marketplaces">
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {[
                { label: 'Total GMV', value: '$2.1T', change: '+18.3%', icon: DollarSign },
                { label: 'Active Users', value: '4.2B', change: '+21.7%', icon: Users },
                { label: 'Merchants', value: '32M', change: '+15.2%', icon: Store },
                { label: 'Markets', value: '127', change: '+12.4%', icon: Globe2 }
              ].map((stat, idx) => (
                <Card key={idx} className="stat-card">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-muted-foreground">{stat.label}</p>
                        <h3 className="text-2xl font-bold mt-1">{stat.value}</h3>
                        <span className="text-sm text-emerald-500">{stat.change}</span>
                      </div>
                      <div className="h-10 w-10 rounded-full bg-primary-50 flex items-center justify-center">
                        <stat.icon className="h-5 w-5 text-primary-600" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Card className="overflow-hidden">
              <CardHeader className="border-b flex justify-between items-center">
                <CardTitle>Global Market Presence</CardTitle>
                <select 
                  className="text-sm border rounded-md p-1"
                  defaultValue="volume"
                >
                  <option value="volume">Market Volume</option>
                  <option value="growth">Growth Rate</option>
                  <option value="penetration">E-commerce Penetration</option>
                </select>
              </CardHeader>
              <CardContent className="p-0">
                <div className="map-container" style={{ height: "500px", width: "100%" }}>
                  <VectorMap
                    map={worldMill}
                    backgroundColor="transparent"
                    containerClassName="map-container"
                    containerStyle={{
                      width: "100%",
                      height: "100%"
                    }}
                    series={{
                      regions: [{
                        values: {
                          CN: 0.8,
                          US: 0.7,
                          GB: 0.6,
                          JP: 0.65,
                          DE: 0.55,
                          IN: 0.5,
                          BR: 0.45,
                          FR: 0.52,
                          KR: 0.58,
                          CA: 0.48
                        },
                        scale: ['#C8EEFF', '#0071A4'],
                        normalizeFunction: 'polynomial'
                      }]
                    }}
                    onRegionTipShow={(e, el, code) => {
                      const marketData = getMarketData(code);
                      if (marketData) {
                        el.html(
                          `<div class="jvectormap-tip">
                            <strong>${el.html()}</strong><br/>
                            Volume: ${marketData.volume}<br/>
                            Growth: +${marketData.growth}%
                          </div>`
                        );
                      }
                    }}
                  />
                  <div className="map-legend">
                    <span className="text-sm font-medium">Market Intensity</span>
                    <div className="map-legend-gradient"></div>
                    <div className="flex justify-between text-xs text-gray-600">
                      <span>Low</span>
                      <span>High</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="insights">
          <div className="space-y-6">

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                {
                  title: 'Cross-Border Growth',
                  current: 42,
                  previous: 35,
                  trend: 'up',
                  icon: Globe2,
                  color: 'emerald',
                  subtitle: 'International Trade Volume'
                },
                {
                  title: 'Mobile Commerce',
                  current: 71,
                  previous: 65,
                  trend: 'up',
                  icon: Smartphone,
                  color: 'blue',
                  subtitle: 'Transaction Share'
                },
                {
                  title: 'Social Commerce',
                  current: 28,
                  previous: 22,
                  trend: 'up',
                  icon: ShoppingCart,
                  color: 'violet',
                  subtitle: 'Platform Integration'
                }
              ].map((metric) => (
                <Card key={metric.title} className="glass-card">
                  <CardContent className="pt-6">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-lg font-semibold text-[var(--primary-600)]">{metric.title}</h3>
                        <p className="text-sm text-[var(--primary-400)]">{metric.subtitle}</p>
                      </div>
                      <div className={`p-2 rounded-full bg-${metric.color}-100`}>
                        <metric.icon className={`w-5 h-5 text-${metric.color}-500`} />
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div className="flex items-end gap-2">
                        <span className="text-3xl font-bold text-[var(--primary-600)]">{metric.current}%</span>
                        <span className={`text-sm text-${metric.color}-500`}>
                          +{(metric.current - metric.previous).toFixed(1)}%
                        </span>
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-[var(--primary-400)]">Previous</span>
                          <span className="font-medium">{metric.previous}%</span>
                        </div>
                        <div className="h-2 bg-[var(--primary-100)] rounded-full overflow-hidden">
                          <div 
                            className={`h-full bg-${metric.color}-500 rounded-full transition-all duration-500`}
                            style={{ width: `${metric.current}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Card className="glass-card">
              <CardHeader className="border-b border-[var(--primary-100)]">
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle>Market Growth Trends</CardTitle>
                    <p className="text-sm text-[var(--primary-400)] mt-1">
                      Performance metrics across key indicators
                    </p>
                  </div>
                  <div className="flex gap-3">
                    <select className="text-sm border rounded-md p-1.5 bg-white">
                      <option value="6M">Last 6 Months</option>
                      <option value="1Y">Last Year</option>
                      <option value="2Y">Last 2 Years</option>
                    </select>
                    <select className="text-sm border rounded-md p-1.5 bg-white">
                      <option value="all">All Metrics</option>
                      <option value="growth">Growth Only</option>
                      <option value="volume">Volume Only</option>
                    </select>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-6">
                <div className="h-[400px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <ComposedChart data={[
                      { month: 'Jan', crossBorder: 385, mobile: 642, social: 245, growth: 18 },
                      { month: 'Feb', crossBorder: 420, mobile: 658, social: 278, growth: 22 },
                      { month: 'Mar', crossBorder: 455, mobile: 675, social: 312, growth: 25 },
                      { month: 'Apr', crossBorder: 512, mobile: 701, social: 345, growth: 28 },
                      { month: 'May', crossBorder: 578, mobile: 734, social: 389, growth: 32 },
                      { month: 'Jun', crossBorder: 645, mobile: 768, social: 425, growth: 35 }
                    ]}>
                      <CartesianGrid strokeDasharray="3 3" stroke="var(--primary-100)" />
                      <XAxis 
                        dataKey="month" 
                        stroke="var(--primary-400)"
                        fontSize={12}
                      />
                      <YAxis 
                        yAxisId="left"
                        stroke="var(--primary-400)"
                        fontSize={12}
                      />
                      <YAxis 
                        yAxisId="right"
                        orientation="right"
                        stroke="var(--primary-400)"
                        fontSize={12}
                      />
                      <Tooltip 
                        contentStyle={{
                          background: 'var(--glass-bg)',
                          border: '1px solid var(--glass-border)',
                          borderRadius: '8px',
                          padding: '12px'
                        }}
                      />
                      <Area
                        yAxisId="left"
                        type="monotone"
                        dataKey="crossBorder"
                        fill="url(#colorCrossBorder)"
                        stroke="var(--primary-500)"
                        name="Cross-Border Trade"
                      />
                      <Line
                        yAxisId="right"
                        type="monotone"
                        dataKey="growth"
                        stroke="#10B981"
                        strokeWidth={2}
                        name="Growth Rate"
                        dot={{ fill: '#10B981' }}
                      />
                      <Line
                        yAxisId="left"
                        type="monotone"
                        dataKey="social"
                        stroke="#8B5CF6"
                        strokeWidth={2}
                        name="Social Commerce"
                        dot={{ fill: '#8B5CF6' }}
                      />
                    </ComposedChart>
                  </ResponsiveContainer>
                </div>

                <div className="grid grid-cols-4 gap-4 mt-6">
                  {[
                    { label: 'Avg Growth Rate', value: '+28.4%', trend: 'up' },
                    { label: 'Market Share', value: '42.5%', trend: 'up' },
                    { label: 'User Adoption', value: '68.2%', trend: 'up' },
                    { label: 'Revenue Impact', value: '+$1.2B', trend: 'up' }
                  ].map((kpi) => (
                    <div key={kpi.label} className="bg-white/50 rounded-lg p-3">
                      <p className="text-sm text-[var(--primary-400)]">{kpi.label}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-lg font-semibold text-[var(--primary-600)]">
                          {kpi.value}
                        </span>
                        <ArrowUp className="w-4 h-4 text-emerald-500" />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default GlobalMarketplace;
