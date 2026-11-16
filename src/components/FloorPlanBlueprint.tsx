import React, { useState } from 'react';

interface Props {
  type: 'typeA' | 'typeB' | 'typeC';
  title: string;
  carpetArea: number;
}

interface RoomArea {
  id: string;
  name: string;
  dimensions: string;
  details: string;
  path: string;
  labelX: number;
  labelY: number;
}

export const FloorPlanBlueprint: React.FC<Props> = ({ type, title, carpetArea }) => {
  const [activeRoom, setActiveRoom] = useState<RoomArea | null>(null);

  // Architectural rooms for Type A (3 BHK)
  const typeARooms: RoomArea[] = [
    {
      id: 'living',
      name: 'Grand Ocean Living & Dining',
      dimensions: '28\'4" × 18\'6"',
      details: 'Double-glazed floor-to-ceiling glass wall opening to sundeck. Italian Botticino marble.',
      path: 'M 140 180 L 370 180 L 370 340 L 140 340 Z',
      labelX: 255,
      labelY: 260
    },
    {
      id: 'sundeck',
      name: 'Private Sea-Facing Sundeck',
      dimensions: '22\'0" × 9\'6"',
      details: 'Cantilevered open deck with tempered glass balustrades & teak deck planks.',
      path: 'M 140 340 L 370 340 L 370 420 L 140 420 Z',
      labelX: 255,
      labelY: 380
    },
    {
      id: 'master',
      name: 'Master Sanctuary Suite',
      dimensions: '19\'0" × 15\'4"',
      details: 'Corner sea view, herringbone timber floor, walk-in Poggenpohl wardrobe.',
      path: 'M 370 180 L 520 180 L 520 330 L 370 330 Z',
      labelX: 445,
      labelY: 255
    },
    {
      id: 'masterBath',
      name: 'Master En-suite Spa Bath',
      dimensions: '11\'8" × 8\'6"',
      details: 'Freestanding soaking tub, rain shower enclosure, Hansgrohe Axor fittings.',
      path: 'M 370 330 L 520 330 L 520 420 L 370 420 Z',
      labelX: 445,
      labelY: 375
    },
    {
      id: 'bed2',
      name: 'Junior Sea Suite (Bed 2)',
      dimensions: '15\'6" × 13\'2"',
      details: 'En-suite bath, floor-to-ceiling wardrobe, acoustic sound-dampened walls.',
      path: 'M 140 70 L 290 70 L 290 180 L 140 180 Z',
      labelX: 215,
      labelY: 125
    },
    {
      id: 'bed3',
      name: 'Guest Bedroom (Bed 3)',
      dimensions: '14\'2" × 12\'8"',
      details: 'Flexible guest or home study, integrated automation & data connectivity.',
      path: 'M 290 70 L 410 70 L 410 180 L 290 180 Z',
      labelX: 350,
      labelY: 125
    },
    {
      id: 'kitchen',
      name: 'Poliform Gourmet Kitchen',
      dimensions: '14\'6" × 11\'4"',
      details: 'Wet & dry kitchen areas, quartz countertops, piped gas & Miele induction.',
      path: 'M 40 180 L 140 180 L 140 310 L 40 310 Z',
      labelX: 90,
      labelY: 245
    },
    {
      id: 'foyer',
      name: 'Private Biometric Elevator Foyer',
      dimensions: '12\'0" × 9\'0"',
      details: 'Exclusive keycard/biometric high-speed elevator access direct to your floor.',
      path: 'M 40 70 L 140 70 L 140 180 L 40 180 Z',
      labelX: 90,
      labelY: 125
    }
  ];

  // Architectural rooms for Type B (4 BHK)
  const typeBRooms: RoomArea[] = [
    {
      id: 'b-living',
      name: 'Palatial Sea Hall & Formal Dining',
      dimensions: '34\'6" × 22\'0"',
      details: 'Expansive entertaining salon overlooking the sea and Bandra-Worli Sea Link.',
      path: 'M 130 160 L 410 160 L 410 340 L 130 340 Z',
      labelX: 270,
      labelY: 250
    },
    {
      id: 'b-deck',
      name: 'Wraparound Sea Promenade Deck',
      dimensions: '34\'6" × 10\'0"',
      details: '270-degree panoramic ocean views with ambient deck illumination.',
      path: 'M 130 340 L 410 340 L 410 430 L 130 430 Z',
      labelX: 270,
      labelY: 385
    },
    {
      id: 'b-master1',
      name: 'Presidential Master Suite',
      dimensions: '22\'4" × 16\'8"',
      details: 'Private balcony, double walk-in dressing room, and morning coffee bar.',
      path: 'M 410 160 L 560 160 L 560 320 L 410 320 Z',
      labelX: 485,
      labelY: 240
    },
    {
      id: 'b-masterBath',
      name: 'Opulent Onyx Master Bath',
      dimensions: '14\'0" × 10\'6"',
      details: 'Dual vanities, steam shower cabin, jacuzzi facing the Arabian Sea.',
      path: 'M 410 320 L 560 320 L 560 430 L 410 430 Z',
      labelX: 485,
      labelY: 375
    },
    {
      id: 'b-bed2',
      name: 'VIP Sea Suite (Bed 2)',
      dimensions: '17\'2" × 14\'4"',
      details: 'West facing bay window, timber flooring, en-suite Italian bath.',
      path: 'M 130 50 L 270 50 L 270 160 L 130 160 Z',
      labelX: 200,
      labelY: 105
    },
    {
      id: 'b-bed3',
      name: 'Executive Suite (Bed 3)',
      dimensions: '16\'0" × 13\'6"',
      details: 'Full height acoustic windows, private ensuite bath.',
      path: 'M 270 50 L 410 50 L 410 160 L 270 160 Z',
      labelX: 340,
      labelY: 105
    },
    {
      id: 'b-bed4',
      name: 'Family Lounge / Suite 4',
      dimensions: '15\'0" × 13\'0"',
      details: 'Configurable as AV cinema lounge or fourth private en-suite bedroom.',
      path: 'M 410 50 L 560 50 L 560 160 L 410 160 Z',
      labelX: 485,
      labelY: 105
    },
    {
      id: 'b-kitchen',
      name: 'Chef\'s Exhibition & Prep Kitchen',
      dimensions: '18\'0" × 12\'6"',
      details: 'Sub-Zero refrigeration, gas & induction wok burner, service entrance.',
      path: 'M 20 160 L 130 160 L 130 330 L 20 330 Z',
      labelX: 75,
      labelY: 245
    }
  ];

  // Architectural rooms for Type C (5 BHK Duplex)
  const typeCRooms: RoomArea[] = [
    {
      id: 'c-atrium',
      name: 'Double-Height Grand Atrium Living',
      dimensions: '40\'0" × 24\'0"',
      details: '22 ft ceiling cathedral volume, floor-to-ceiling glass curtains, custom marble fireplace.',
      path: 'M 120 150 L 430 150 L 430 340 L 120 340 Z',
      labelX: 275,
      labelY: 245
    },
    {
      id: 'c-pool',
      name: 'Private Infinity Plunge Pool & Deck',
      dimensions: '38\'0" × 12\'0"',
      details: 'Open-to-sky 40 ft heated infinity pool with submerged seating and ocean horizon edge.',
      path: 'M 120 340 L 430 340 L 430 440 L 120 440 Z',
      labelX: 275,
      labelY: 390
    },
    {
      id: 'c-master',
      name: 'Grand Royal Master Sanctuary',
      dimensions: '26\'0" × 18\'0"',
      details: 'Upper-tier duplex wing with uninterrupted 360-degree views, private study & salon.',
      path: 'M 430 150 L 580 150 L 580 340 L 430 340 Z',
      labelX: 505,
      labelY: 245
    },
    {
      id: 'c-stairs',
      name: 'Glass Capsule Lift & Spiral Staircase',
      dimensions: '14\'0" × 12\'0"',
      details: 'Sculptural architectural spiral stair and internal glass elevator connecting duplex levels.',
      path: 'M 430 50 L 580 50 L 580 150 L 430 150 Z',
      labelX: 505,
      labelY: 100
    },
    {
      id: 'c-bed2',
      name: 'Sky Suite East',
      dimensions: '18\'0" × 14\'0"',
      details: 'En-suite bath, private sunrise balcony.',
      path: 'M 120 50 L 270 50 L 270 150 L 120 150 Z',
      labelX: 195,
      labelY: 100
    },
    {
      id: 'c-bed3',
      name: 'Sky Suite West',
      dimensions: '18\'0" × 14\'0"',
      details: 'Sunset ocean views with walk-in closet.',
      path: 'M 270 50 L 430 50 L 430 150 L 270 150 Z',
      labelX: 350,
      labelY: 100
    },
    {
      id: 'c-service',
      name: 'Private Staff Quarters & Scullery',
      dimensions: '16\'0" × 12\'0"',
      details: 'Dual maid suites with private washrooms and service elevator entrance.',
      path: 'M 10 150 L 120 150 L 120 340 L 10 340 Z',
      labelX: 65,
      labelY: 245
    }
  ];

  const currentRooms = type === 'typeA' ? typeARooms : type === 'typeB' ? typeBRooms : typeCRooms;

  return (
    <div className="relative w-full bg-[#fdfdfb] border border-[#e5e1d8] rounded-sm p-4 sm:p-6 shadow-sm">
      {/* Blueprint Top Header Bar */}
      <div className="flex flex-wrap items-center justify-between border-b border-[#ece8de] pb-3 mb-4 gap-2">
        <div className="flex items-center space-x-2">
          <span className="inline-block w-2.5 h-2.5 rounded-full bg-brand-cyan animate-pulse"></span>
          <span className="text-xs font-semibold tracking-wider text-[#18222b] uppercase font-sans">
            Architectural CAD Blueprint • RERA Carpet Area: {carpetArea.toLocaleString('en-IN')} Sq.Ft
          </span>
        </div>
        <div className="text-[11px] font-mono text-[#7c8692] uppercase bg-[#f4f2ec] px-2 py-0.5 rounded border border-[#e2ddd3]">
          Scale 1:100 • Worli Sea Face
        </div>
      </div>

      {/* Blueprint SVG Diagram */}
      <div className="relative w-full aspect-[4/3] max-h-[460px] bg-[#faf9f6] border border-[#e8e4db] rounded overflow-hidden flex items-center justify-center">
        <svg
          viewBox="0 0 600 480"
          className="w-full h-full select-none cursor-pointer"
          style={{ filter: 'drop-shadow(0px 1px 3px rgba(0,0,0,0.04))' }}
        >
          {/* Architectural Grid Lines */}
          <defs>
            <pattern id="cadGrid" width="30" height="30" patternUnits="userSpaceOnUse">
              <path d="M 30 0 L 0 0 0 30" fill="none" stroke="#ebe7de" strokeWidth="0.5" />
            </pattern>
            <pattern id="hatchDeck" width="8" height="8" patternTransform="rotate(45 0 0)" patternUnits="userSpaceOnUse">
              <line x1="0" y1="0" x2="0" y2="8" stroke="#00a2e8" strokeWidth="0.7" strokeOpacity="0.3" />
            </pattern>
          </defs>

          {/* Background Grid */}
          <rect width="600" height="480" fill="url(#cadGrid)" />

          {/* Exterior Building Wall Perimeter */}
          <rect
            x="30"
            y="40"
            width="540"
            height="400"
            fill="none"
            stroke="#18222b"
            strokeWidth="5"
            strokeLinejoin="round"
          />

          {/* North Direction Compass */}
          <g transform="translate(540, 75)">
            <circle cx="0" cy="0" r="16" fill="white" stroke="#c0b9aa" strokeWidth="1" />
            <polygon points="0,-12 4,0 0,-3 -4,0" fill="#00a2e8" />
            <polygon points="0,12 4,0 0,3 -4,0" fill="#7c8692" />
            <text x="0" y="-14" textAnchor="middle" fontSize="8" fontWeight="bold" fill="#18222b" fontFamily="sans-serif">N</text>
          </g>

          {/* Sea Horizon Indicator on South/West Edge */}
          <g transform="translate(255, 435)">
            <rect x="-100" y="0" width="200" height="18" fill="#e0f4fc" rx="2" />
            <text x="0" y="12" textAnchor="middle" fontSize="9" fontWeight="600" fill="#0077aa" letterSpacing="1">
              🌊 ARABIAN SEA HORIZON (UNOBSTRUCTED)
            </text>
          </g>

          {/* Interactive Room Polygons */}
          {currentRooms.map(room => {
            const isHovered = activeRoom?.id === room.id;
            const isDeck = room.id.includes('deck') || room.id.includes('pool') || room.id.includes('sundeck');
            return (
              <g
                key={room.id}
                onMouseEnter={() => setActiveRoom(room)}
                onMouseLeave={() => setActiveRoom(null)}
                className="transition-all duration-200"
              >
                {/* Room Floor Fill */}
                <path
                  d={room.path}
                  fill={isDeck ? 'url(#hatchDeck)' : isHovered ? '#e1f5fe' : '#ffffff'}
                  stroke={isHovered ? '#00a2e8' : '#2c3e50'}
                  strokeWidth={isHovered ? '2.5' : '1.5'}
                  className="transition-colors duration-150"
                />

                {/* Door Swing Arcs */}
                <path
                  d={`M ${room.labelX - 20} ${room.labelY - 30} A 15 15 0 0 1 ${room.labelX - 5} ${room.labelY - 15}`}
                  fill="none"
                  stroke="#8fa0b0"
                  strokeWidth="0.8"
                  strokeDasharray="2,2"
                />

                {/* Room Name & Dimensions Text */}
                <text
                  x={room.labelX}
                  y={room.labelY - 4}
                  textAnchor="middle"
                  fontSize="9.5"
                  fontWeight="600"
                  fill={isHovered ? '#008ecb' : '#18222b'}
                  fontFamily="'Plus Jakarta Sans', sans-serif"
                >
                  {room.name.split(' (')[0]}
                </text>
                <text
                  x={room.labelX}
                  y={room.labelY + 10}
                  textAnchor="middle"
                  fontSize="8"
                  fontWeight="500"
                  fill="#788896"
                  fontFamily="monospace"
                >
                  {room.dimensions}
                </text>
              </g>
            );
          })}

          {/* Architectural Wall Dimension Lines */}
          <g stroke="#9faab5" strokeWidth="0.75">
            <line x1="30" y1="28" x2="570" y2="28" />
            <line x1="30" y1="24" x2="30" y2="32" />
            <line x1="570" y1="24" x2="570" y2="32" />
            <text x="300" y="24" textAnchor="middle" fontSize="8.5" fill="#586776" fontFamily="monospace">
              TOTAL SPAN: 64&apos; 0&quot; WATERFRONT FACING
            </text>
          </g>
        </svg>

        {/* Live Hover Inspection Callout */}
        {activeRoom ? (
          <div className="absolute bottom-3 left-3 right-3 sm:left-4 sm:right-auto sm:max-w-sm bg-[#18222b] text-white p-3 rounded shadow-xl border border-brand-cyan/40 backdrop-blur-md z-10 transition-all animate-fadeIn">
            <div className="flex items-center justify-between gap-2 mb-1">
              <span className="text-xs font-semibold tracking-wide text-brand-cyan uppercase">
                {activeRoom.name}
              </span>
              <span className="text-[11px] font-mono text-white/90 bg-white/10 px-1.5 py-0.5 rounded">
                {activeRoom.dimensions}
              </span>
            </div>
            <p className="text-[11px] text-gray-300 leading-relaxed">
              {activeRoom.details}
            </p>
          </div>
        ) : (
          <div className="absolute bottom-3 left-4 text-[11px] text-[#7c8692] bg-white/90 px-2.5 py-1 rounded shadow-sm border border-[#e5e1d8] pointer-events-none hidden sm:block">
            💡 Hover over any room or sundeck to inspect CAD dimensions & specifications
          </div>
        )}
      </div>

      {/* Blueprint Legend Footer */}
      <div className="mt-3 flex flex-wrap items-center justify-between text-[11px] text-[#6d7986] gap-2 pt-2 border-t border-[#ece8de]">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 bg-white border border-[#2c3e50] inline-block"></span>
            <span>Habitable Suite</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 bg-[#e0f4fc] border border-brand-cyan inline-block"></span>
            <span>Sea Deck / Wet Zone</span>
          </div>
        </div>
        <span className="font-mono text-brand-cyan font-semibold">
          Approved under MahaRERA Floor Plan sanction
        </span>
      </div>
    </div>
  );
};

