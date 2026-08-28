import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ShieldCheck, Check } from 'lucide-react';

const PIPELINE = ['IDENTITY', 'VERIFY', 'AUTHORIZE', 'ISOLATE', 'MONITOR', 'SECURE DATA'];
const PRINCIPLES = [
  { word: 'VERIFY', angle: -90, desc: 'Every request authenticated' },
  { word: 'ISOLATE', angle: -30, desc: 'Tenants are fully separated' },
  { word: 'LIMIT', angle: 30, desc: 'Least-privilege access only' },
  { word: 'MONITOR', angle: 90, desc: 'Continuous activity logging' },
  { word: 'PROTECT', angle: 150, desc: 'Data encrypted at all times' },
  { word: 'RESPOND', angle: 210, desc: 'Threats detected & blocked' },
];

const TAKEAWAYS = [
  'Every request is verified — no implicit trust',
  'Least privilege limits the blast radius of any breach',
  'Tenant isolation protects shared infrastructure',
  'Continuous monitoring detects abnormal behavior',
];

const Scene10 = ({ coords, active }) => {
  const ref = useRef(null);

  useEffect(() => {
    if (!active || !ref.current) return;

    const tl = gsap.timeline();
    tl.fromTo(ref.current.querySelector('.s10-shield'),
      { opacity: 0, scale: 0.3 }, { opacity: 1, scale: 1, duration: 1, ease: 'back.out(1.5)' }
    );
    tl.fromTo(ref.current.querySelectorAll('.s10-principle'),
      { opacity: 0, scale: 0 }, { opacity: 1, scale: 1, duration: 0.5, stagger: 0.08, ease: 'back.out(2)' },
      '-=0.4'
    );
    tl.fromTo(ref.current.querySelectorAll('.s10-right > *'),
      { opacity: 0, x: 50 }, { opacity: 1, x: 0, duration: 0.7, stagger: 0.12, ease: 'power3.out' },
      '-=0.5'
    );
  }, [active]);

  const R = 160;
  const cx = 220, cy = 220;

  return (
    <div className="scene" style={{ left: coords.x, top: coords.y }}>
      <div ref={ref} style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '60px 80px', gap: 60 }}>

        {/* Left: Shield orbit */}
        <div style={{ position: 'relative', width: 440, height: 440, flexShrink: 0 }}>
          <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}>
            <circle cx={cx} cy={cy} r={R} fill="none" stroke="#DBEAFE" strokeWidth="2" strokeDasharray="10 8">
              <animateTransform attributeName="transform" type="rotate" from="0 220 220" to="360 220 220" dur="30s" repeatCount="indefinite" />
            </circle>
            {PRINCIPLES.map(({ word, angle }) => {
              const rad = (angle * Math.PI) / 180;
              return (
                <line key={word} x1={cx} y1={cy} x2={cx + R * Math.cos(rad)} y2={cy + R * Math.sin(rad)} stroke="#BFDBFE" strokeWidth="1.5" />
              );
            })}
          </svg>

          {/* Central shield */}
          <div className="s10-shield" style={{
            position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%, -50%)',
            width: 150, height: 150, borderRadius: '50%',
            display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
            background: '#fff', border: '4px solid #2563EB',
            boxShadow: '0 0 50px rgba(37,99,235,0.25), 0 0 0 14px rgba(37,99,235,0.07)',
            zIndex: 10
          }}>
            <ShieldCheck size={50} color="#2563EB" style={{ marginBottom: 6 }} />
            <span className="font-mono" style={{ fontSize: '0.65rem', color: '#172554', fontWeight: 700, letterSpacing: '0.08em' }}>ZERO TRUST</span>
          </div>

          {/* Principle nodes */}
          {PRINCIPLES.map(({ word, angle }) => {
            const rad = (angle * Math.PI) / 180;
            const x = cx + R * Math.cos(rad);
            const y = cy + R * Math.sin(rad);
            return (
              <div key={word} className="s10-principle" style={{
                position: 'absolute', left: x, top: y, transform: 'translate(-50%, -50%)',
                width: 80, height: 80, borderRadius: '50%',
                display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                background: '#fff', border: '2px solid #93C5FD',
                boxShadow: '0 4px 12px rgba(37,99,235,0.1)', zIndex: 10
              }}>
                <span className="font-mono" style={{ fontSize: '0.55rem', fontWeight: 800, color: '#2563EB', textAlign: 'center', lineHeight: 1.3 }}>{word}</span>
              </div>
            );
          })}
        </div>

        {/* Right: Key takeaways + conclusion */}
        <div className="s10-right" style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 24 }}>
          <div>
            <h1 className="font-heading" style={{ fontSize: '3.5rem', color: '#172554', fontWeight: 800, lineHeight: 1, marginBottom: 8 }}>
              ZERO TRUST CHANGES<br/>
              <span style={{ color: '#2563EB' }}>THE SECURITY MODEL</span>
            </h1>
          </div>

          {/* Key takeaways */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {TAKEAWAYS.map((t, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 12, padding: '12px 16px', background: '#F0F9FF', border: '1.5px solid #BFDBFE', borderRadius: 10 }}>
                <Check size={18} color="#10B981" style={{ flexShrink: 0, marginTop: 1 }} />
                <span className="font-body" style={{ fontSize: '0.9rem', color: '#1E3A8A', lineHeight: 1.5 }}>{t}</span>
              </div>
            ))}
          </div>

          {/* Final pipeline */}
          <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: 6 }}>
            {PIPELINE.map((p, i) => (
              <React.Fragment key={p}>
                <span className="font-mono" style={{ fontSize: '0.75rem', fontWeight: 700, color: i === PIPELINE.length - 1 ? '#047857' : '#2563EB', padding: '5px 12px', background: i === PIPELINE.length - 1 ? '#ECFDF5' : '#EFF6FF', borderRadius: 20, border: `1.5px solid ${i === PIPELINE.length - 1 ? '#10B981' : '#BFDBFE'}` }}>
                  {p}
                </span>
                {i < PIPELINE.length - 1 && <span style={{ color: '#9CA3AF', fontSize: '0.9rem' }}>→</span>}
              </React.Fragment>
            ))}
          </div>

          {/* Tagline */}
          <div style={{ borderTop: '2px solid #E5E7EB', paddingTop: 20 }}>
            <h2 className="font-heading" style={{ fontSize: '2.5rem', color: '#172554', fontWeight: 800, lineHeight: 1.1, marginBottom: 12 }}>
              NEVER TRUST.<br/>
              <span style={{ color: '#2563EB' }}>ALWAYS VERIFY.</span>
            </h2>
            <p className="font-mono" style={{ fontSize: '1rem', color: '#6B7280', letterSpacing: '0.1em' }}>
              QUESTIONS?
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Scene10;
