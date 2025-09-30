import React, { useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix for default markers in React-Leaflet
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.divIcon({
  html: `<div class="w-6 h-6 bg-primary rounded-full border-2 border-white shadow-lg animate-radar-pulse"></div>`,
  className: '',
  iconSize: [24, 24],
  iconAnchor: [12, 12]
});

L.Marker.prototype.options.icon = DefaultIcon;

// Sample monitoring points
const monitoringPoints = [
  { id: 1, position: [-3.4653, -62.2159], name: 'Amazon Basin', status: 'critical', deforestation: 15.2 },
  { id: 2, position: [1.2921, 36.8219], name: 'Congo Basin', status: 'warning', deforestation: 8.7 },
  { id: 3, position: [-16.2902, -63.5887], name: 'Pantanal', status: 'stable', deforestation: 2.3 },
  { id: 4, position: [3.8480, 11.5021], name: 'Cameroon Forests', status: 'warning', deforestation: 12.1 },
  { id: 5, position: [-6.2088, 106.8456], name: 'Indonesian Forests', status: 'critical', deforestation: 18.9 },
];

const getStatusColor = (status: string) => {
  switch (status) {
    case 'critical': return 'text-destructive';
    case 'warning': return 'text-warning';
    case 'stable': return 'text-success';
    default: return 'text-muted-foreground';
  }
};

export default function ForestMap() {
  return (
    <div className="h-full w-full relative rounded-xl overflow-hidden border border-border">
      <MapContainer
        center={[0, 0]}
        zoom={2}
        className="h-full w-full"
        style={{ background: 'hsl(var(--background))' }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          className="opacity-80"
        />
        
        {monitoringPoints.map((point) => (
          <Marker key={point.id} position={point.position as [number, number]}>
            <Popup className="custom-popup">
              <div className="p-2 min-w-[200px]">
                <h3 className="font-semibold text-foreground">{point.name}</h3>
                <div className="mt-2 space-y-1">
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Status:</span>
                    <span className={`text-sm font-medium ${getStatusColor(point.status)}`}>
                      {point.status.charAt(0).toUpperCase() + point.status.slice(1)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Deforestation:</span>
                    <span className="text-sm font-medium text-foreground">{point.deforestation}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Last Update:</span>
                    <span className="text-sm text-muted-foreground">2 hours ago</span>
                  </div>
                </div>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
      
      {/* Map Legend */}
      <div className="absolute bottom-4 left-4 bg-card/90 backdrop-blur-sm border border-border rounded-lg p-3 z-[1000]">
        <h4 className="text-sm font-medium text-foreground mb-2">Forest Status</h4>
        <div className="space-y-1">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-success rounded-full"></div>
            <span className="text-xs text-muted-foreground">Stable (&lt;5%)</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-warning rounded-full"></div>
            <span className="text-xs text-muted-foreground">Warning (5-15%)</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-destructive rounded-full"></div>
            <span className="text-xs text-muted-foreground">Critical (&gt;15%)</span>
          </div>
        </div>
      </div>
    </div>
  );
}