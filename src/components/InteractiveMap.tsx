import React, { useState } from 'react';
import { MapPin, Navigation, Clock, ExternalLink, ShieldCheck } from 'lucide-react';
import { LocationInfo, NearbyLandmark } from '../types';

interface Props {
  location: LocationInfo;
}

export const InteractiveMap: React.FC<Props> = ({ location }) => {
  const [selectedLandmark, setSelectedLandmark] = useState<NearbyLandmark | null>(location.landmarks[0] || null);

  // Geographic SVG map positions representing Mumbai's coastal strip (Worli, Bandra, BKC, South Mumbai)
  const mapHotspots = [
    { name: 'Quarter Tower (Site)', x: 48, y: 52, isHome: true },
    { name: 'Bandra-Worli Sea Link', x: 42, y: 35, isHome: false },
    { name: 'Coastal Road Interchange', x: 46, y: 44, isHome: false },
    { name: 'Bandra Kurla Complex (BKC)', x: 74, y: 28, isHome: false },
    { name: 'The St. Regis & Palladium Mall', x: 58, y: 58, isHome: false },
    { name: 'Nariman Point Financial Hub', x: 44, y: 88, isHome: false },
    { name: 'Chhatrapati Shivaji Maharaj Airport', x: 72, y: 15, isHome: false }
  ];

  return (
    <div className="relative w-full h-full min-h-[460px] bg-[#eef1f4] rounded-sm overflow-hidden border border-[#d6dbe0] shadow-inner flex flex-col justify-between">
      {/* Top Map Filter / Landmark Tabs */}
      <div className="p-3 bg-white/95 backdrop-blur-sm border-b border-[#dde3e9] z-10">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-1.5 text-xs font-semibold text-[#18222b]">
            <Navigation className="w-3.5 h-3.5 text-brand-cyan" />
            <span>WORLI SEA FACE TRANSIT RADIAL (MUMBAI)</span>
          </div>
          <span className="text-[11px] font-mono text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
            Zero Signal Link to Coastal Road
          </span>
        </div>

        {/* Quick Landmark Chips */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none text-xs">
          {location.landmarks.map((lm) => {
            const isSelected = selectedLandmark?.name === lm.name;
            return (
              <button
                key={lm.name}
                type="button"
                onClick={() => setSelectedLandmark(lm)}
                className={`whitespace-nowrap px-2.5 py-1 rounded text-[11px] font-medium transition-all ${
                  isSelected
                    ? 'bg-brand-cyan text-white shadow-sm font-semibold'
                    : 'bg-[#f4f7f9] text-[#4a5866] hover:bg-[#e6ebf0] border border-[#dce2e8]'
                }`}
              >
                {lm.name} ({lm.travelTime})
              </button>
            );
          })}
        </div>
      </div>

      {/* Stylized Architectural Vector Map of Mumbai Coast */}
      <div className="relative flex-1 w-full overflow-hidden bg-[#e9edf2] flex items-center justify-center select-none">
        <svg
          viewBox="0 0 500 420"
          className="w-full h-full object-cover"
          style={{ background: '#e3ebf2' }}
        >
          <defs>
            {/* Water Wave Texture */}
            <linearGradient id="seaGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#cde4f2" />
              <stop offset="100%" stopColor="#b4d4e7" />
            </linearGradient>
            {/* Land Texture */}
            <linearGradient id="landGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#f7f9fb" />
              <stop offset="100%" stopColor="#ebf0f5" />
            </linearGradient>
          </defs>

          {/* Arabian Sea Base */}
          <rect width="500" height="420" fill="url(#seaGradient)" />

          {/* Sea Wave Lines */}
          <path d="M 10 100 Q 50 80, 100 100 T 200 100" stroke="#a7cde4" strokeWidth="1" fill="none" opacity="0.6" />
          <path d="M 20 220 Q 60 200, 110 220 T 180 220" stroke="#a7cde4" strokeWidth="1" fill="none" opacity="0.6" />
          <path d="M 15 320 Q 55 300, 105 320 T 170 320" stroke="#a7cde4" strokeWidth="1" fill="none" opacity="0.6" />

          {/* Mumbai Peninsular Coastline Polygon (South Mumbai to Bandra & Suburbs) */}
          <path
            d="
              M 220,0 
              L 500,0 
              L 500,420 
              L 280,420 
              C 260,390 230,370 210,340 
              C 195,310 200,280 230,250 
              C 250,230 255,200 240,180 
              C 220,160 210,130 230,100 
              C 240,80 230,40 220,0 
              Z
            "
            fill="url(#landGradient)"
            stroke="#cfd8e1"
            strokeWidth="1.5"
          />

          {/* Bandra-Worli Sea Link Arc in Water */}
          <path
            d="M 230,110 C 190,140 190,180 238,215"
            fill="none"
            stroke="#00a2e8"
            strokeWidth="3.5"
            strokeDasharray="4,2"
          />
          <text x="145" y="165" fontSize="8" fontWeight="bold" fill="#0077aa" transform="rotate(-75 145 165)">
            BANDRA-WORLI SEA LINK
          </text>

          {/* Mumbai Coastal Road Promenade Arc */}
          <path
            d="M 238,215 C 235,260 210,310 210,340"
            fill="none"
            stroke="#27ae60"
            strokeWidth="3"
          />
          <text x="180" y="295" fontSize="7.5" fontWeight="bold" fill="#1b7e43" transform="rotate(-80 180 295)">
            MUMBAI COASTAL ROAD
          </text>

          {/* Major Road Arteries (Western Express Hwy, Senapati Bapat Marg, Annie Besant Rd) */}
          <path d="M 240,215 L 360,215 L 450,150" fill="none" stroke="#cfdbe6" strokeWidth="2.5" />
          <path d="M 360,215 L 390,380" fill="none" stroke="#cfdbe6" strokeWidth="2.5" />
          <path d="M 360,110 L 450,150 L 470,60" fill="none" stroke="#cfdbe6" strokeWidth="2.5" />

          {/* Arabian Sea Label */}
          <text x="60" y="270" fontSize="13" fontWeight="bold" fill="#7fa9c5" letterSpacing="3">
            ARABIAN SEA
          </text>

          {/* Landmark Hotspots */}
          {mapHotspots.map((spot, idx) => {
            const isSite = spot.isHome;
            const isHighlighted = selectedLandmark?.name.toLowerCase().includes(spot.name.toLowerCase().split(' ')[0]);

            return (
              <g
                key={idx}
                transform={`translate(${(spot.x * 500) / 100}, ${(spot.y * 420) / 100})`}
                className="cursor-pointer transition-all hover:scale-110"
                onClick={() => {
                  const match = location.landmarks.find(l => l.name.toLowerCase().includes(spot.name.toLowerCase().split(' ')[0]));
                  if (match) setSelectedLandmark(match);
                }}
              >
                {/* Glowing ring for Quarter Tower */}
                {isSite && (
                  <>
                    <circle cx="0" cy="0" r="16" fill="#00a2e8" fillOpacity="0.2" className="animate-ping" />
                    <circle cx="0" cy="0" r="10" fill="#00a2e8" fillOpacity="0.4" />
                  </>
                )}

                {/* Marker Pin */}
                <circle
                  cx="0"
                  cy="0"
                  r={isSite ? "7" : isHighlighted ? "6" : "4.5"}
                  fill={isSite ? "#00a2e8" : isHighlighted ? "#ff5a5f" : "#18222b"}
                  stroke="#ffffff"
                  strokeWidth="2"
                />

                {/* Pin Label */}
                <rect
                  x="-4"
                  y={isSite ? "-24" : "9"}
                  width={spot.name.length * 6 + 12}
                  height="16"
                  rx="3"
                  fill={isSite ? "#18222b" : "#ffffff"}
                  stroke={isSite ? "#00a2e8" : "#cfd7df"}
                  strokeWidth="1"
                  transform={`translate(-${(spot.name.length * 6 + 12) / 2}, 0)`}
                />
                <text
                  x="0"
                  y={isSite ? "-13" : "20"}
                  textAnchor="middle"
                  fontSize="7.5"
                  fontWeight={isSite ? "bold" : "600"}
                  fill={isSite ? "#ffffff" : "#2c3e50"}
                  fontFamily="'Plus Jakarta Sans', sans-serif"
                >
                  {isSite ? "★ QUARTER RESIDENTIAL" : spot.name}
                </text>
              </g>
            );
          })}
        </svg>

        {/* Floating Quick Route Card */}
        {selectedLandmark && (
          <div className="absolute bottom-3 left-3 right-3 sm:left-4 sm:right-auto sm:max-w-xs bg-white/95 backdrop-blur-md p-3 rounded shadow-lg border border-[#dde3e9] z-10 animate-fadeIn">
            <div className="flex items-start justify-between gap-2">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-wider text-brand-cyan font-bold block">
                  Transit Distance from Site
                </span>
                <h4 className="text-xs font-bold text-[#18222b]">
                  {selectedLandmark.name}
                </h4>
              </div>
              <span className="flex items-center gap-1 text-xs font-bold text-[#00a2e8] bg-brand-cyanLight px-2 py-0.5 rounded">
                <Clock className="w-3 h-3" />
                {selectedLandmark.travelTime}
              </span>
            </div>
            <div className="mt-2 text-[11px] text-[#606e7b] flex items-center justify-between border-t border-[#edf1f5] pt-1.5">
              <span>Distance: <strong>{selectedLandmark.distance}</strong></span>
              <a
                href={`https://www.google.com/maps/dir/Worli+Sea+Face,+Mumbai/${encodeURIComponent(selectedLandmark.name + ' Mumbai')}`}
                target="_blank"
                rel="noreferrer"
                className="text-brand-cyan hover:underline inline-flex items-center gap-1 font-semibold"
              >
                Live Route <ExternalLink className="w-2.5 h-2.5" />
              </a>
            </div>
          </div>
        )}
      </div>

      {/* Map Bottom Footer Bar */}
      <div className="p-3 bg-[#f8fafc] border-t border-[#d8e0e7] flex items-center justify-between text-xs text-[#52606d] z-10">
        <div className="flex items-center gap-1.5 text-[11px]">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
          <span>Prime Coastal Zone • 28 Worli Sea Face, Mumbai</span>
        </div>
        <a
          href={location.googleMapsUrl}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-1 text-[11px] font-semibold text-brand-cyan hover:text-brand-cyanHover hover:underline"
        >
          Open in Google Maps <ExternalLink className="w-3 h-3" />
        </a>
      </div>
    </div>
  );
};

