"use client";
import React, { useState } from 'react';
import { Zap, Eye, Layers, Activity } from 'lucide-react';

interface Layer {
  id: number;
  name: string;
  description: string;
  color: string;
  thickness: string;
}

const LayerSection: React.FC = () => {
  const [activeLayer, setActiveLayer] = useState<number>(7);
  const [hoveredLayer, setHoveredLayer] = useState<number | null>(null);
  const [isAnimating, setIsAnimating] = useState<boolean>(false);

  const layers: Layer[] = [
    { id: 1, name: 'SiNx AR Coating', description: 'Anti-reflective coating that reduces light reflection and increases absorption', color: 'from-blue-400 to-blue-600', thickness: '8px' },
    { id: 2, name: 'Passivation', description: 'Protective layer that reduces surface recombination and improves efficiency', color: 'from-green-400 to-green-600', thickness: '6px' },
    { id: 3, name: 'P+ Emitter', description: 'Heavily doped p-type layer that creates the p-n junction', color: 'from-red-400 to-red-600', thickness: '12px' },
    { id: 4, name: 'n-Silicon Substrate', description: 'Main silicon wafer that absorbs photons and generates electron-hole pairs', color: 'from-gray-600 to-gray-800', thickness: '40px' },
    { id: 5, name: 'Tunneling Layer', description: 'Ultra-thin oxide layer that allows selective carrier transport', color: 'from-purple-400 to-purple-600', thickness: '4px' },
    { id: 6, name: 'n+ Poly', description: 'Heavily doped polysilicon layer for enhanced conductivity', color: 'from-orange-400 to-orange-600', thickness: '10px' },
    { id: 7, name: 'SiNx AR Coating', description: 'Bottom anti-reflective coating for optimal light management', color: 'from-cyan-400 to-cyan-600', thickness: '8px' },
  ];

  const handleLayerClick = (layerId: number) => {
    setActiveLayer(layerId);
    setIsAnimating(true);
    setTimeout(() => setIsAnimating(false), 800);
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white">
      {/* Section-scoped background glow (absolute, not fixed) */}
      <div className="pointer-events-none absolute top-20 right-20 w-32 h-32 bg-gradient-to-br from-green-500/10 to-transparent rounded-full blur-xl"></div>
      <div className="pointer-events-none absolute bottom-20 left-20 w-24 h-24 bg-gradient-to-br from-green-500/20 to-transparent rounded-full blur-lg"></div>

      <div className="container mx-auto px-6 py-12">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Solar Cell <span className="text-green-500">Layer Structure</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Explore the intricate layers that make up modern solar photovoltaic cells.
            Click on each layer to reveal its structure and function.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Left Column - Layer Visualization and Info */}
          <div className="space-y-6">
            {/* Layer Visualization */}
            <div className="bg-gray-800/50 rounded-2xl p-8 backdrop-blur-sm border border-gray-700">
              <div className="flex items-center justify-center gap-3 mb-6">
                <Layers className="w-6 h-6 text-green-500" />
                <h3 className="text-2xl font-semibold text-center">Layer Cross-Section</h3>
                <div className={`w-2 h-2 rounded-full bg-green-500 ${isAnimating ? 'animate-pulse' : ''}`}></div>
              </div>

              {/* Layer Stack */}
              <div className="relative mx-auto w-80 h-44 bg-gradient-to-b from-gray-900 to-black rounded-lg overflow-hidden border-2 border-gray-600 shadow-2xl">
                {/* Animated Background Grid */}
                <div className="absolute inset-0 opacity-10">
                  <div
                    className="absolute inset-0"
                    style={{
                      backgroundImage:
                        'linear-gradient(rgba(34, 197, 94, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(34, 197, 94, 0.1) 1px, transparent 1px)',
                      backgroundSize: '20px 20px',
                      animation: 'gridMove 18s linear infinite',
                    }}
                  />
                </div>

                {/* Energy Flow Animation */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1 h-full">
                  <div
                    className={`w-full h-2 bg-gradient-to-r from-transparent via-yellow-400 to-transparent rounded-full`}
                    style={{
                      animation: activeLayer > 0 ? 'energyFlow 2s ease-in-out infinite' : 'none',
                    }}
                  />
                </div>

                {layers.map((layer, index) => (
                  <div
                    key={layer.id}
                    className={`
                      absolute left-0 right-0 cursor-pointer transition-all duration-700 ease-in-out
                      ${activeLayer >= layer.id ? 'opacity-100' : 'opacity-30'}
                      ${hoveredLayer === layer.id ? 'scale-105 z-20 shadow-lg' : 'z-10'}
                      ${isAnimating && activeLayer >= layer.id ? 'animate-pulse' : ''}
                    `}
                    style={{
                      bottom: `${layers.slice(0, index).reduce((acc, l) => acc + parseInt(l.thickness), 0)}px`,
                      height: layer.thickness,
                      animationDelay: `${index * 100}ms`,
                    }}
                    onClick={() => handleLayerClick(layer.id)}
                    onMouseEnter={() => setHoveredLayer(layer.id)}
                    onMouseLeave={() => setHoveredLayer(null)}
                  >
                    <div
                      className={`
                        w-full h-full bg-gradient-to-r ${layer.color}
                        border-t border-white/20 relative group overflow-hidden
                        ${hoveredLayer === layer.id ? 'shadow-lg shadow-white/20 brightness-110' : ''}
                        ${activeLayer >= layer.id ? 'shadow-inner' : ''}
                      `}
                    >
                      {/* Shimmer Effect */}
                      <div
                        className={`
                          absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent
                          -skew-x-12 transition-transform duration-1000
                        `}
                        style={{
                          transform: activeLayer >= layer.id ? 'translateX(100%)' : 'translateX(-100%)',
                          animation: activeLayer >= layer.id ? 'shimmer 2s ease-in-out infinite' : 'none',
                          animationDelay: `${index * 200}ms`,
                        }}
                      />

                      {/* Particle Effects */}
                      {activeLayer >= layer.id && (
                        <>
                          <div className="absolute top-1 left-2 w-1 h-1 bg-white/60 rounded-full animate-ping" style={{ animationDelay: '0s' }} />
                          <div className="absolute top-2 right-4 w-1 h-1 bg-white/40 rounded-full animate-ping" style={{ animationDelay: '0.5s' }} />
                          <div className="absolute bottom-1 left-6 w-1 h-1 bg-white/50 rounded-full animate-ping" style={{ animationDelay: '1s' }} />
                        </>
                      )}

                      {/* Layer Label */}
                      <div
                        className={`
                          absolute left-full ml-4 top-1/2 -translate-y-1/2
                          bg-gradient-to-r from-black/90 to-gray-800/90 px-3 py-2 rounded-lg text-sm font-medium
                          transition-all duration-500 whitespace-nowrap backdrop-blur-sm border border-gray-600/50
                          ${activeLayer >= layer.id ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4'}
                          ${hoveredLayer === layer.id ? 'scale-105 shadow-lg' : ''}
                        `}
                      >
                        <div className="flex items-center gap-2">
                          <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${layer.color} ${activeLayer >= layer.id ? 'animate-pulse' : ''}`}></div>
                          {layer.name}
                        </div>
                        <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-3 w-3 h-px bg-gradient-to-r from-white/60 to-transparent"></div>
                      </div>

                      {/* Hover overlay */}
                      <div className="absolute inset-0 bg-white/0 group-hover:bg-white/10 transition-all duration-500"></div>

                      {/* Active Layer Glow */}
                      {activeLayer >= layer.id && (
                        <div className="absolute inset-0 bg-gradient-to-r from-green-400/10 via-transparent to-green-400/10 animate-pulse"></div>
                      )}
                    </div>
                  </div>
                ))}

                {/* Measurement Lines */}
                <div className="absolute -left-8 top-0 bottom-0 w-px bg-gradient-to-b from-green-500/50 via-gray-500 to-green-500/50"></div>
                <div className="absolute -left-12 top-0 w-4 h-px bg-gradient-to-r from-green-500/50 to-gray-500"></div>
                <div className="absolute -left-12 bottom-0 w-4 h-px bg-gradient-to-r from-green-500/50 to-gray-500"></div>

                {/* Measurement Labels */}
                <div className="absolute -left-20 top-0 text-xs text-gray-400 -rotate-90 origin-center">Top</div>
                <div className="absolute -left-20 bottom-0 text-xs text-gray-400 -rotate-90 origin-center">Bottom</div>

                {/* Interactive Scan Line */}
                {hoveredLayer && (
                  <div
                    className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-green-400 to-transparent animate-pulse z-30"
                    style={{
                      bottom: `${
                        layers
                          .slice(0, layers.findIndex((l) => l.id === hoveredLayer))
                          .reduce((acc, l) => acc + parseInt(l.thickness), 0) +
                        parseInt(layers[hoveredLayer - 1]?.thickness || '0') / 2
                      }px`,
                    }}
                  ></div>
                )}
              </div>

              {/* Scale Indicator */}
              <div className="flex items-center justify-center gap-2 mt-6 text-sm text-gray-400">
                <Eye className="w-4 h-4" />
                <span>Cross-sectional view (not to scale)</span>
                {activeLayer > 0 && (
                  <>
                    <span className="mx-2">•</span>
                    <Activity className="w-4 h-4 text-green-500" />
                    <span className="text-green-400">Active Layers: {activeLayer}</span>
                  </>
                )}
              </div>
            </div>

            {/* Active Layer Information */}
            {activeLayer > 0 && (
              <div className="bg-gray-800/50 rounded-2xl p-8 backdrop-blur-sm border border-gray-700">
                <h3 className="text-2xl font-semibold mb-4">
                  Layer Details: {layers[activeLayer - 1]?.name}
                </h3>
                <p className="text-gray-300 leading-relaxed">
                  {layers[activeLayer - 1]?.description}
                </p>

                <div className="mt-6 space-y-3">
                  <div className="bg-black/30 rounded-lg p-4">
                    <div className="text-sm text-gray-400 mb-1">Function</div>
                    <div className="font-semibold text-sm">
                      {layers[activeLayer - 1]?.description}
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-black/30 rounded-lg p-3">
                      <div className="text-xs text-gray-400 mb-1">Layer ID</div>
                      <div className="font-semibold">#{activeLayer}</div>
                    </div>
                    <div className="bg-black/30 rounded-lg p-3">
                      <div className="text-xs text-gray-400 mb-1">Status</div>
                      <div className="font-semibold text-green-400">Active</div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Right Column - Controls */}
          <div className="space-y-6">
            <div className="bg-gray-800/50 rounded-2xl p-8 backdrop-blur-sm border border-gray-700">
              <h3 className="text-2xl font-semibold mb-6">Layer Controls</h3>

              <div className="grid grid-cols-1 gap-3 mb-8">
                {layers.map((layer) => (
                  <button
                    key={layer.id}
                    onClick={() => handleLayerClick(layer.id)}
                    className={`
                      p-4 rounded-lg text-left transition-all duration-300 border-2
                      ${activeLayer >= layer.id
                        ? 'bg-green-500/20 border-green-500 text-white'
                        : 'bg-gray-700/50 border-gray-600 text-gray-300 hover:bg-gray-600/50'}
                    `}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-medium">{layer.id}. {layer.name}</span>
                      <div className={`w-4 h-4 rounded-full bg-gradient-to-r ${layer.color} ${activeLayer >= layer.id ? 'opacity-100' : 'opacity-50'}`}></div>
                    </div>
                  </button>
                ))}
              </div>

              <div className="flex gap-4">
                <button
                  onClick={() => setActiveLayer(7)}
                  className="flex-1 bg-green-500 hover:bg-green-600 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300"
                >
                  Show All Layers
                </button>
                <button
                  onClick={() => setActiveLayer(0)}
                  className="flex-1 bg-gray-600 hover:bg-gray-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300"
                >
                  Reset
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Technical Specifications */}
        <div className="mt-16 bg-gray-800/30 rounded-2xl p-8 backdrop-blur-sm border border-gray-700">
          <h3 className="text-2xl font-semibold mb-6 text-center">Technical Overview</h3>
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-green-500 mb-2">7</div>
              <div className="text-gray-300">Functional Layers</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-green-500 mb-2">~180μm</div>
              <div className="text-gray-300">Total Thickness</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-green-500 mb-2">22%+</div>
              <div className="text-gray-300">Efficiency Rating</div>
            </div>
          </div>
        </div>
      </div>

      {/* Local CSS for custom animations */}
      <style jsx>{`
        @keyframes energyFlow {
          0% { transform: translateY(0); opacity: 0.2; }
          30% { opacity: 1; }
          50% { transform: translateY(50%); }
          70% { opacity: 1; }
          100% { transform: translateY(100%); opacity: 0.2; }
        }
        @keyframes shimmer {
          0% { transform: translateX(-120%) skewX(-12deg); }
          55% { transform: translateX(10%) skewX(-12deg); }
          100% { transform: translateX(120%) skewX(-12deg); }
        }
        @keyframes gridMove {
          0% { background-position: 0 0, 0 0; }
          100% { background-position: 200px 200px, 200px 200px; }
        }
      `}</style>
    </div>
  );
};

export default LayerSection;
