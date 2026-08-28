import React, { useState, useEffect } from 'react';
import { CRYPTO_FEATURES } from '../data/companyData';
import { AmbientGlow } from './AmbientGlow';
import {
  BarChart2,
  TrendingUp,
  CircleDot,
  Zap,
  Activity,
  AlertTriangle,
  ArrowUpRight,
  ArrowDownRight,
  ShieldAlert,
  Clock,
  Layers,
  LucideIcon
} from 'lucide-react';

const iconMap: Record<string, LucideIcon> = {
  CircleDot,
  TrendingUp,
  Zap,
  Activity
};

export const CryptoSection: React.FC = () => {
  const [activeInterval, setActiveInterval] = useState<'1m' | '15m' | '1h' | '1D'>('15m');
  const [selectedAsset, setSelectedAsset] = useState<'BTC/USDT' | 'ETH/USDT' | 'SOL/USDT'>('BTC/USDT');

  // Simulated synthetic orderbook ticks for high-tech aesthetic
  const [orderBook, setOrderBook] = useState<{ price: number; amount: number; type: 'buy' | 'sell' }[]>([]);

  useEffect(() => {
    const basePrice = selectedAsset === 'BTC/USDT' ? 64250 : selectedAsset === 'ETH/USDT' ? 3480 : 158;
    const initialOrders = [
      { price: basePrice + 12.5, amount: 0.85, type: 'sell' as const },
      { price: basePrice + 8.0, amount: 1.42, type: 'sell' as const },
      { price: basePrice + 3.2, amount: 2.15, type: 'sell' as const },
      { price: basePrice - 2.8, amount: 1.95, type: 'buy' as const },
      { price: basePrice - 7.5, amount: 3.40, type: 'buy' as const },
      { price: basePrice - 11.2, amount: 4.12, type: 'buy' as const }
    ];
    setOrderBook(initialOrders);

    const interval = setInterval(() => {
      setOrderBook((prev) =>
        prev.map((order) => ({
          ...order,
          price: Number((order.price + (Math.random() - 0.5) * 1.5).toFixed(2)),
          amount: Number((Math.max(0.2, order.amount + (Math.random() - 0.5) * 0.3)).toFixed(2))
        }))
      );
    }, 2000);

    return () => clearInterval(interval);
  }, [selectedAsset]);

  // Synthetic Candlesticks
  const candles = [
    { open: 35, close: 65, high: 75, low: 25, bullish: true },
    { open: 65, close: 52, high: 70, low: 45, bullish: false },
    { open: 52, close: 80, high: 88, low: 48, bullish: true },
    { open: 80, close: 72, high: 85, low: 68, bullish: false },
    { open: 72, close: 95, high: 102, low: 68, bullish: true },
    { open: 95, close: 88, high: 98, low: 80, bullish: false },
    { open: 88, close: 110, high: 118, low: 84, bullish: true },
    { open: 110, close: 125, high: 132, low: 105, bullish: true },
    { open: 125, close: 115, high: 130, low: 110, bullish: false },
    { open: 115, close: 140, high: 148, low: 112, bullish: true },
    { open: 140, close: 155, high: 162, low: 135, bullish: true },
    { open: 155, close: 148, high: 160, low: 142, bullish: false }
  ];

  return (
    <section id="crypto-market" className="relative py-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <AmbientGlow variant="section" position="center" />

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-cyan-400 text-xs font-mono tracking-widest uppercase mb-4 shadow-[0_0_15px_rgba(0,242,254,0.15)]">
            <BarChart2 className="w-3.5 h-3.5" />
            <span>Digital Asset Systems</span>
          </div>

          <h2 className="font-heading text-2xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-wide mb-6">
            Digital Market & <span className="cyber-gradient-text">Crypto Trading</span>
          </h2>

          <p className="text-base sm:text-lg text-slate-300 font-light leading-relaxed">
            Analytical intelligence, algorithmic execution frameworks, and market structure surveillance
            across spot, futures, and high-frequency digital assets.
          </p>
        </div>

        {/* 4 Feature Pillars */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-12">
          {CRYPTO_FEATURES.map((feat) => {
            const IconComponent = iconMap[feat.icon] || BarChart2;
            return (
              <div
                key={feat.title}
                className="group p-6 rounded-2xl glass-card border border-cyan-500/20 hover:border-cyan-400/50 hover:bg-[#0b193d]/60 transition-all duration-300 shadow-[0_4px_20px_rgba(0,0,0,0.5)] flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-3 rounded-xl bg-gradient-to-br from-cyan-950 to-[#060e22] border border-cyan-500/30 text-cyan-400 group-hover:scale-110 transition-transform">
                      <IconComponent className="w-5 h-5 stroke-[2.2]" />
                    </div>
                    <span className="text-[10px] font-mono text-cyan-400 uppercase tracking-wider px-2 py-0.5 rounded bg-cyan-950/60 border border-cyan-500/20">
                      {feat.tag}
                    </span>
                  </div>

                  <h3 className="font-heading text-base font-bold text-white mb-2 group-hover:text-cyan-300 transition-colors">
                    {feat.title}
                  </h3>

                  <p className="text-xs text-slate-300 font-light leading-relaxed">
                    {feat.desc}
                  </p>
                </div>

                <div className="pt-4 border-t border-cyan-500/15 mt-4 flex items-center justify-between text-[10px] font-mono text-slate-400">
                  <span>DISCIPLINED EXECUTION</span>
                  <span className="text-cyan-400">SYSTEMIC</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Futuristic Technical Analysis Terminal Visualization */}
        <div className="p-6 sm:p-8 rounded-2xl glass-card-elevated border border-cyan-500/30 shadow-[0_0_40px_rgba(0,242,254,0.1)] mb-12">
          {/* Terminal Control Bar */}
          <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-cyan-500/20 mb-6">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-900/90 border border-cyan-500/30">
                <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                <span className="font-heading text-xs font-bold text-white tracking-wider">
                  MARKET VISUALIZER
                </span>
              </div>

              {/* Asset Selector */}
              <div className="flex items-center gap-1.5 p-1 rounded-lg bg-slate-900 border border-cyan-500/20">
                {(['BTC/USDT', 'ETH/USDT', 'SOL/USDT'] as const).map((pair) => (
                  <button
                    key={pair}
                    onClick={() => setSelectedAsset(pair)}
                    className={`px-2.5 py-1 rounded text-xs font-mono transition-all ${
                      selectedAsset === pair
                        ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-400/40 font-bold'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    {pair}
                  </button>
                ))}
              </div>
            </div>

            {/* Timeframe intervals */}
            <div className="flex items-center gap-1 p-1 rounded-lg bg-slate-900 border border-cyan-500/20">
              {(['1m', '15m', '1h', '1D'] as const).map((tf) => (
                <button
                  key={tf}
                  onClick={() => setActiveInterval(tf)}
                  className={`px-2.5 py-0.5 rounded text-xs font-mono transition-all ${
                    activeInterval === tf
                      ? 'bg-cyan-500 text-black font-bold'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {tf}
                </button>
              ))}
            </div>
          </div>

          {/* Chart & Orderbook Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            {/* Synthetic Candlestick Chart Area (8 cols) */}
            <div className="lg:col-span-8 h-64 sm:h-72 p-4 rounded-xl bg-[#020713]/80 border border-cyan-500/20 relative flex flex-col justify-between overflow-hidden">
              <div className="flex justify-between items-center text-xs font-mono text-slate-400 border-b border-cyan-500/10 pb-2">
                <span className="text-cyan-300 font-semibold">{selectedAsset} • Spot / Perp Index</span>
                <span className="text-emerald-400 flex items-center gap-1">
                  <ArrowUpRight className="w-3.5 h-3.5" />
                  <span>+4.82% 24h</span>
                </span>
              </div>

              {/* Candlesticks Visualization */}
              <div className="flex items-end justify-between gap-1.5 h-44 py-4 px-2">
                {candles.map((c, i) => {
                  const height = Math.abs(c.close - c.open) * 1.6 + 14;
                  const wickHeight = (c.high - c.low) * 1.6 + 20;

                  return (
                    <div key={i} className="flex-1 flex flex-col items-center justify-end h-full relative group">
                      {/* Wick */}
                      <div
                        className={`w-0.5 rounded-full ${c.bullish ? 'bg-cyan-400' : 'bg-rose-500'}`}
                        style={{ height: `${wickHeight}px` }}
                      />

                      {/* Body */}
                      <div
                        className={`absolute w-full max-w-[14px] rounded-sm transition-all ${
                          c.bullish
                            ? 'bg-cyan-400 shadow-[0_0_8px_#00f2fe]'
                            : 'bg-rose-500 shadow-[0_0_8px_#f43f5e]'
                        }`}
                        style={{
                          height: `${height}px`,
                          bottom: `${Math.min(c.open, c.close) * 0.8}px`
                        }}
                      />
                    </div>
                  );
                })}
              </div>

              {/* Bottom Time Axis */}
              <div className="flex justify-between text-[10px] font-mono text-slate-500 pt-2 border-t border-cyan-500/10">
                <span>00:00</span>
                <span>06:00</span>
                <span>12:00</span>
                <span>18:00</span>
                <span>24:00</span>
              </div>
            </div>

            {/* Depth & Orderbook Telemetry (4 cols) */}
            <div className="lg:col-span-4 p-4 rounded-xl bg-[#020713]/80 border border-cyan-500/20 space-y-3">
              <div className="flex justify-between text-[10px] font-mono text-cyan-400 font-semibold border-b border-cyan-500/20 pb-2">
                <span>PRICE (USDT)</span>
                <span>VOLUME</span>
                <span>SIDE</span>
              </div>

              <div className="space-y-1.5 font-mono text-xs">
                {orderBook.map((order, idx) => (
                  <div
                    key={idx}
                    className="flex justify-between items-center p-1 rounded hover:bg-slate-900/60"
                  >
                    <span className={order.type === 'buy' ? 'text-cyan-400' : 'text-rose-400'}>
                      {order.price.toLocaleString()}
                    </span>
                    <span className="text-slate-300">{order.amount}</span>
                    <span
                      className={`text-[9px] px-1.5 py-0.2 rounded uppercase ${
                        order.type === 'buy' ? 'bg-cyan-950 text-cyan-400' : 'bg-rose-950 text-rose-400'
                      }`}
                    >
                      {order.type}
                    </span>
                  </div>
                ))}
              </div>

              <div className="pt-2 border-t border-cyan-500/15 text-[10px] font-mono text-slate-400 flex items-center justify-between">
                <span>Algorithmic Signal:</span>
                <span className="text-cyan-300 font-bold">NEUTRAL / ACCUMULATION</span>
              </div>
            </div>
          </div>
        </div>

        {/* MANDATORY CRYPTO RISK DISCLAIMER */}
        <div className="p-6 rounded-2xl bg-amber-950/20 border border-amber-500/30 flex items-start gap-4 text-left shadow-[0_0_20px_rgba(245,158,11,0.08)]">
          <div className="p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-400 shrink-0">
            <ShieldAlert className="w-6 h-6 stroke-[2.2]" />
          </div>
          <div>
            <h4 className="font-heading text-sm font-bold text-amber-300 uppercase tracking-wider mb-1">
              Regulatory & Risk Disclaimer
            </h4>
            <p className="text-xs text-slate-300 leading-relaxed font-light">
              <strong className="text-amber-200">Risk Disclaimer:</strong> Cryptocurrency and derivatives trading involve substantial risk.
              Prices can change rapidly and losses may occur. ZeeS Group Global does not guarantee profits or returns, and website information
              should not be interpreted as personalized financial advice. Always perform thorough due diligence and practice strict risk management.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
