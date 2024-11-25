import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Globe2, Smartphone, ShoppingCart, ArrowUp } from 'lucide-react';

const Analytics = () => {
  const insightsData = [
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
  ];

  const statisticsData = [
    {
      label: 'Avg Growth Rate',
      value: '+28.4%',
      trend: 'up'
    },
    {
      label: 'Market Share',
      value: '42.5%',
      trend: 'up'
    },
    {
      label: 'User Adoption',
      value: '68.2%',
      trend: 'up'
    },
    {
      label: 'Revenue Impact',
      value: '+$1.2B',
      trend: 'up'
    }
  ];

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Analytics Overview</h1>
      <p>This page contains analytics data based on global market insights.</p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {insightsData.map((metric) => (
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

      <h2 className="text-xl font-bold mt-8">Statistics</h2>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {statisticsData.map((stat) => (
          <div key={stat.label} className="bg-white/50 rounded-lg p-3">
            <p className="text-sm text-[var(--primary-400)]">{stat.label}</p>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-lg font-semibold text-[var(--primary-600)]">
                {stat.value}
              </span>
              <ArrowUp className="w-4 h-4 text-emerald-500" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Analytics; 