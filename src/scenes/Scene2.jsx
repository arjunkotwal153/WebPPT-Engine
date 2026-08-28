import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { Building2, Database, AlertTriangle, ShieldAlert, User } from 'lucide-react';

const Scene2 = ({ coords, active }) => {
  const ref = useRef(null);

  useEffect(() => {
    if (!active || !ref.current) return;
    const tl = gsap.timeline();
    tl.fromTo(ref.current.querySelectorAll('.s2-title > *'),
      { opacity: 0, y: -30 }, { opacity: 1, y: 0, duration: 0.7, stagger: 0.15, ease: 'power3.out' }
    );
    tl.fromTo(ref.current.querySelectorAll('.s2-tenant'),
      { opacity: 0, x: -50 }, { opacity: 1, x: 0, duration: 0.6, stagger: 0.12, ease: 'power2.out' },
      '-=0.3'
    );
    tl.fromTo(ref.current.querySelectorAll('.s2-layer'),
      { opacity: 0, x: 50 }, { opacity: 1, x: 0, duration: 0.6, stagger: 0.1, ease: 'power2.out' },
      '-=0.5'
    );
    tl.fromTo(ref.current.querySelector('.s2-warning'),
      { opacity: 0, scale: 0.8 }, { opacity: 1, scale: 1, duration: 0.5, ease: 'back.out(2)' },
      '+=0.2'
    );
  }, [active]);

  const tenants = [
    { name: 'TENANT A', color: '#2563EB', bg: '#EFF6FF', border: '#BFDBFE' },
    { name: 'TENANT B', color: '#10B981', bg: '#ECFDF5', border: '#A7F3D0' },
    { name: 'TENANT C', color: '#7C3AED', bg: '#F5F3FF', border: '#DDD6FE' },
  ];

  const layers = ['COMPUTE LAYER', 'STORAGE LAYER', 'DATABASE LAYER', 'WAREHOUSE LAYER'];

  return (
    <div className="scene" style={{ left: coords.x, top: coords.y }}>
      <div ref={ref} style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '60px 80px', gap: 40 }}>

        <div className="s2-title" style={{ textAlign: 'center' }}>
          <h2 className="font-heading" style={{ fontSize: '3.8rem', color: '#172554', fontWeight: 800, marginBottom: 8 }}>
            SHARED INFRASTRUCTURE
          </h2>
          <p className="font-mono" style={{ fontSize: '1rem', color: '#6B7280', letterSpacing: '0.1em' }}>
            MULTIPLE TENANTS — ONE PLATFORM
          </p>
        </div>

        <div style={{ display: 'flex', alignItems: 'stretch', justifyContent: 'center', width: '100%', maxWidth: 1100 }}>
          {/* Tenants column */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16, flex: '0 0 auto' }}>
            {tenants.map(({ name, color, bg, border }) => (
              <div key={name} className="s2-tenant glass-panel" style={{ padding: '20px 28px', background: bg, border: `2px solid ${border}`, display: 'flex', alignItems: 'center', gap: 14, width: 240 }}>
                <Building2 size={28} color={color} />
                <span className="font-heading" style={{ fontWeight: 700, fontSize: '1.1rem', color }}>{name}</span>
              </div>
            ))}
          </div>

          {/* Arrows with data icons curving into the Warehouse */}
          <div style={{ width: 300, position: 'relative', height: 310 }}>
            <svg width="300" height="310" style={{ position: 'absolute', top: 0, left: 0, overflow: 'visible' }}>
              {[
                { y1: 34, y2: 35, color: '#2563EB' },
                { y1: 118, y2: 55, color: '#10B981' },
                { y1: 202, y2: 75, color: '#7C3AED' }
              ].map((path, i) => {
                const d = `M 0 ${path.y1} C 150 ${path.y1}, 150 ${path.y2}, 290 ${path.y2}`;
                return (
                  <g key={i}>
                    {/* Path line */}
                    <path d={d} fill="none" stroke={path.color} strokeWidth="2.5" strokeDasharray="6 6" opacity="0.4" />
                    
                    {/* Flowing data icon (a small document/file shape) */}
                    <g style={{ filter: `drop-shadow(0 0 8px ${path.color})` }}>
                      <rect x="-8" y="-10" width="16" height="20" rx="3" fill={path.color} opacity="0.9" />
                      <line x1="-4" y1="-4" x2="4" y2="-4" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" />
                      <line x1="-4" y1="2" x2="4" y2="2" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" />
                      <line x1="-4" y1="8" x2="0" y2="8" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" />
                      
                      <animateMotion dur="2s" repeatCount="indefinite" begin={`${i * 0.8}s`} path={d} />
                      <animate attributeName="opacity" values="0;1;1;0" keyTimes="0;0.1;0.9;1" dur="2s" repeatCount="indefinite" begin={`${i * 0.8}s`} />
                    </g>
                  </g>
                );
              })}
            </svg>
            <span className="font-mono" style={{ position: 'absolute', bottom: 40, left: '50%', transform: 'translateX(-50%)', fontSize: '0.7rem', color: '#9CA3AF', letterSpacing: '0.1em' }}>REQUESTS</span>
          </div>

          {/* Shared infrastructure layers */}
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 12 }}>
            <div className="s2-layer glass-panel" style={{ padding: '14px 22px', background: '#fff', border: '2px solid #E5E7EB', textAlign: 'center', borderRadius: 10 }}>
              <Database size={22} color="#172554" style={{ marginBottom: 6 }} />
              <div className="font-heading" style={{ fontSize: '1rem', fontWeight: 700, color: '#172554' }}>SHARED DATA WAREHOUSE</div>
              <div className="font-mono" style={{ fontSize: '0.7rem', color: '#9CA3AF', marginTop: 4 }}>SINGLE PHYSICAL INFRASTRUCTURE</div>
            </div>
            {layers.map(l => (
              <div key={l} className="s2-layer" style={{ padding: '12px 18px', background: '#F9FAFB', border: '1.5px solid #E5E7EB', borderRadius: 8, display: 'flex', alignItems: 'center', gap: 12 }}>
                <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#6B7280' }} />
                <span className="font-mono" style={{ fontSize: '0.85rem', color: '#4B5563', fontWeight: 600 }}>{l}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="s2-warning" style={{ background: '#FEF2F2', border: '2px solid #FCA5A5', borderRadius: 12, padding: '18px 40px', display: 'flex', alignItems: 'center', gap: 16 }}>
          <AlertTriangle size={28} color="#EF4444" />
          <h3 className="font-heading" style={{ fontSize: '1.5rem', color: '#B91C1C' }}>
            SHARED INFRASTRUCTURE ≠ SHARED ACCESS
          </h3>
        </div>
      </div>
    </div>
  );
};

export default Scene2;
