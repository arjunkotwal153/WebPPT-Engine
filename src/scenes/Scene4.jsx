import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ShieldCheck, Fingerprint, Smartphone, MapPin, FileKey, DoorOpen, Activity } from 'lucide-react';

const Scene4 = ({ coords, active }) => {
  const ref = useRef(null);

  useEffect(() => {
    if (!active || !ref.current) return;
    const tl = gsap.timeline();
    tl.fromTo(ref.current.querySelector('.shield-center'),
      { opacity: 0, scale: 0.3 }, { opacity: 1, scale: 1, duration: 0.9, ease: 'back.out(1.5)' }
    );
    tl.fromTo(ref.current.querySelectorAll('.orbit-node'),
      { opacity: 0, scale: 0 }, { opacity: 1, scale: 1, duration: 0.5, stagger: 0.08, ease: 'back.out(2)' },
      '-=0.4'
    );
    tl.fromTo(ref.current.querySelectorAll('.s4-text > *'),
      { opacity: 0, x: 40 }, { opacity: 1, x: 0, duration: 0.7, stagger: 0.15, ease: 'power3.out' },
      '-=0.4'
    );
  }, [active]);

  const nodes = [
    { label: 'IDENTITY', icon: Fingerprint, angle: -90 },
    { label: 'DEVICE', icon: Smartphone, angle: -30 },
    { label: 'CONTEXT', icon: MapPin, angle: 30 },
    { label: 'POLICY', icon: FileKey, angle: 90 },
    { label: 'ACCESS', icon: DoorOpen, angle: 150 },
    { label: 'MONITOR', icon: Activity, angle: 210 },
  ];

  const R = 230;
  const cx = 300, cy = 300;

  return (
    <div className="scene" style={{ left: coords.x, top: coords.y }}>
      <div ref={ref} style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 80, padding: '60px 80px' }}>

        {/* Orbit System — contained in its box */}
        <div style={{ position: 'relative', width: 600, height: 600, flexShrink: 0 }}>
          <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}>
            {/* Outer decorative ring */}
            <circle cx={cx} cy={cy} r={280} fill="none" stroke="#DBEAFE" strokeWidth="1.5" strokeDasharray="8 8">
              <animateTransform attributeName="transform" type="rotate" from="360 300 300" to="0 300 300" dur="60s" repeatCount="indefinite" />
            </circle>
            {/* Main orbit ring */}
            <circle cx={cx} cy={cy} r={R} fill="none" stroke="#E5E7EB" strokeWidth="2" strokeDasharray="12 8">
              <animateTransform attributeName="transform" type="rotate" from="0 300 300" to="360 300 300" dur="40s" repeatCount="indefinite" />
            </circle>
            {/* Lines from center to each node */}
            {nodes.map(({ angle, label }) => {
              const rad = (angle * Math.PI) / 180;
              return (
                <line key={label}
                  x1={cx} y1={cy}
                  x2={cx + R * Math.cos(rad)} y2={cy + R * Math.sin(rad)}
                  stroke="#BFDBFE" strokeWidth="1.5"
                />
              );
            })}
          </svg>

          {/* Central shield */}
          <div className="shield-center" style={{
            position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%, -50%)',
            width: 180, height: 180, borderRadius: '50%',
            display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
            background: '#fff', border: '4px solid #2563EB', boxShadow: '0 0 50px rgba(37,99,235,0.25), 0 0 0 12px rgba(37,99,235,0.06)',
            zIndex: 10
          }}>
            <ShieldCheck size={60} color="#2563EB" style={{ marginBottom: 8 }} />
            <span className="font-heading" style={{ fontSize: '1.1rem', fontWeight: 800, color: '#172554', textAlign: 'center', lineHeight: 1.2 }}>ZERO<br/>TRUST</span>
          </div>

          {/* Orbit nodes */}
          {nodes.map(({ label, icon: Icon, angle }) => {
            const rad = (angle * Math.PI) / 180;
            const x = cx + R * Math.cos(rad);
            const y = cy + R * Math.sin(rad);
            return (
              <div key={label} className="orbit-node" style={{
                position: 'absolute', left: x, top: y, transform: 'translate(-50%, -50%)',
                width: 100, height: 100, borderRadius: '50%',
                display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                background: '#fff', border: '2.5px solid #BFDBFE',
                boxShadow: '0 4px 16px rgba(37,99,235,0.1)', zIndex: 10
              }}>
                <Icon size={28} color="#00AEEF" style={{ marginBottom: 4 }} />
                <span className="font-mono" style={{ fontSize: '0.6rem', fontWeight: 700, color: '#172554', letterSpacing: '0.05em' }}>{label}</span>
              </div>
            );
          })}
        </div>

        {/* Text panel */}
        <div className="s4-text" style={{ maxWidth: 420 }}>
          <h2 className="font-heading" style={{ fontSize: '4rem', color: '#172554', lineHeight: 1, fontWeight: 800, marginBottom: 24 }}>
            NEVER TRUST.<br/>
            <span style={{ color: '#2563EB' }}>ALWAYS<br/>VERIFY.</span>
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 14, background: '#FEF2F2', padding: '14px 18px', borderRadius: 10, border: '1.5px solid #FCA5A5' }}>
              <span style={{ color: '#EF4444', fontWeight: 800, fontSize: '1.1rem' }}>✕</span>
              <span className="font-mono" style={{ fontSize: '0.85rem', color: '#991B1B', fontWeight: 600 }}>IMPLICIT TRUST</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 14, background: '#ECFDF5', padding: '14px 18px', borderRadius: 10, border: '1.5px solid #10B981' }}>
              <span style={{ color: '#10B981', fontWeight: 800, fontSize: '1.1rem' }}>✓</span>
              <span className="font-mono" style={{ fontSize: '0.85rem', color: '#047857', fontWeight: 600 }}>CONTINUOUS VERIFICATION</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 14, background: '#ECFDF5', padding: '14px 18px', borderRadius: 10, border: '1.5px solid #10B981' }}>
              <span style={{ color: '#10B981', fontWeight: 800, fontSize: '1.1rem' }}>✓</span>
              <span className="font-mono" style={{ fontSize: '0.85rem', color: '#047857', fontWeight: 600 }}>LEAST PRIVILEGE ACCESS</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 14, background: '#ECFDF5', padding: '14px 18px', borderRadius: 10, border: '1.5px solid #10B981' }}>
              <span style={{ color: '#10B981', fontWeight: 800, fontSize: '1.1rem' }}>✓</span>
              <span className="font-mono" style={{ fontSize: '0.85rem', color: '#047857', fontWeight: 600 }}>CONTINUOUS MONITORING</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Scene4;
