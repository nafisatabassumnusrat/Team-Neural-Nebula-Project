import React, { useState } from 'react';
import Sidebar from './Sidebar';
import MetricCard from './MetricCard';
import ForestMap from './ForestMap';
import AlertPanel from './AlertPanel';
import TimelineControl from './TimelineControl';
import { ForestCoverChart, CarbonStockChart, BiodiversityChart } from './DataChart';
import { 
  TreePine, 
  Activity, 
  AlertTriangle, 
  TrendingUp, 
  Leaf,
  Satellite,
  Globe,
  Zap
} from 'lucide-react';
import earthSatelliteBg from '@/assets/earth-satellite-bg.jpg';

export default function DashboardLayout() {
  const [activeSection, setActiveSection] = useState('overview');

  const renderMainContent = () => {
    switch (activeSection) {
      case 'overview':
        return (
          <div className="space-y-6">
            {/* Hero Section with Background */}
            <div 
              className="relative h-64 rounded-xl overflow-hidden bg-cover bg-center"
              style={{ backgroundImage: `url(${earthSatelliteBg})` }}
            >
              <div className="absolute inset-0 bg-background/60 backdrop-blur-sm"></div>
              <div className="relative z-10 h-full flex flex-col justify-center items-center text-center p-8">
                <div className="flex items-center space-x-3 mb-4">
                  <Satellite className="w-8 h-8 text-primary" />
                  <h1 className="text-3xl font-bold text-foreground">NASA SAR Forest Monitor</h1>
                </div>
                <p className="text-lg text-muted-foreground max-w-2xl">
                  Real-time global forest monitoring using synthetic aperture radar for change detection, 
                  carbon tracking, and ecosystem health assessment
                </p>
              </div>
            </div>

            {/* Key Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <MetricCard
                title="Global Forest Cover"
                value="82.9%"
                change="-0.3%"
                changeType="negative"
                icon={TreePine}
                variant="health"
                description="Total forest coverage worldwide"
              />
              <MetricCard
                title="Carbon Stock"
                value="435 Mt"
                change="-7 Mt"
                changeType="negative"
                icon={Leaf}
                variant="carbon"
                description="Total stored carbon in forests"
              />
              <MetricCard
                title="Active Alerts"
                value="47"
                change="+12"
                changeType="negative"
                icon={AlertTriangle}
                variant="deforestation"
                description="Real-time deforestation events"
              />
              <MetricCard
                title="SAR Processing"
                value="99.2%"
                change="+0.1%"
                changeType="positive"
                icon={Zap}
                description="System uptime and processing rate"
              />
            </div>

            {/* Charts Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <ForestCoverChart />
              <CarbonStockChart />
            </div>
          </div>
        );

      case 'map':
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-foreground">Global Forest Map</h2>
                <p className="text-muted-foreground">Interactive SAR-based forest monitoring</p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
              <div className="lg:col-span-3">
                <div className="h-[600px]">
                  <ForestMap />
                </div>
              </div>
              <div className="space-y-6">
                <TimelineControl />
                <div className="grid grid-cols-1 gap-4">
                  <MetricCard
                    title="Active Monitoring Points"
                    value="1,247"
                    icon={Globe}
                    variant="health"
                  />
                  <MetricCard
                    title="Data Processing Rate"
                    value="15.2 GB/h"
                    icon={Activity}
                    variant="default"
                  />
                </div>
              </div>
            </div>
          </div>
        );

      case 'change-detection':
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-foreground">Change Detection</h2>
              <p className="text-muted-foreground">Real-time forest change monitoring via SAR analysis</p>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 space-y-6">
                <ForestCoverChart />
                <BiodiversityChart />
              </div>
              <AlertPanel />
            </div>
          </div>
        );

      case 'carbon-stock':
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-foreground">Carbon Monitoring</h2>
              <p className="text-muted-foreground">Forest carbon stock analysis and climate impact assessment</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <MetricCard
                title="Total Carbon Stored"
                value="435 Mt CO₂"
                change="-7 Mt"
                changeType="negative"
                icon={TreePine}
                variant="carbon"
              />
              <MetricCard
                title="Monthly Absorption"
                value="10 Mt CO₂"
                change="-5 Mt"
                changeType="negative"
                icon={Leaf}
                variant="health"
              />
              <MetricCard
                title="Carbon Released"
                value="20 Mt CO₂"
                change="+8 Mt"
                changeType="negative"
                icon={TrendingUp}
                variant="deforestation"
              />
            </div>
            
            <CarbonStockChart />
          </div>
        );

      default:
        return (
          <div className="flex items-center justify-center h-64">
            <div className="text-center">
              <Satellite className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium text-foreground">Section Under Development</h3>
              <p className="text-muted-foreground">This module is being enhanced with advanced SAR processing capabilities.</p>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-background flex">
      <Sidebar 
        activeSection={activeSection} 
        onSectionChange={setActiveSection} 
      />
      
      <main className="flex-1 overflow-hidden">
        <div className="h-full overflow-y-auto p-8">
          {renderMainContent()}
        </div>
      </main>
    </div>
  );
}