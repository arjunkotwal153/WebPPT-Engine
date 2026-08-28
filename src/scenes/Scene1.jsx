import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { Building, Cloud, Shield } from 'lucide-react';

const Scene1 = ({ coords, active }) => {
  const ref = useRef(null);

  useEffect(() => {
    if (!active || !ref.current) return;
    const tl = gsap.timeline();
    tl.fromTo(ref.current.querySelectorAll('.s1-title > *'),
      { opacity: 0, x: -60 },
      { opacity: 1, x: 0, duration: 0.9, stagger: 0.18, ease: 'power3.out' }
    );
    tl.fromTo(ref.current.querySelectorAll('.s1-node'),
      { opacity: 0, scale: 0.7 },
      { opacity: 1, scale: 1, duration: 0.6, stagger: 0.15, ease: 'back.out(1.7)' },
      '-=0.4'
    );
    tl.fromTo(ref.current.querySelectorAll('.s1-path'),
      { strokeDashoffset: 600 },
      { strokeDashoffset: 0, duration: 1.2, stagger: 0.1, ease: 'power2.inOut' },
      '-=0.3'
    );
  }, [active]);

  return (
    <div className="scene" style={{ left: coords.x, top: coords.y }}>
      <div ref={ref} style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 120, padding: '80px' }}>

        {/* ── LEFT: Title ── */}
        <div className="s1-title" style={{ flex: '0 0 auto', maxWidth: 520 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 24 }}>
            <Shield size={28} color="#2563EB" />
            <span className="font-mono" style={{ fontSize: '0.8rem', color: '#6B7280', letterSpacing: '0.15em' }}>SECURITY MODEL</span>
          </div>
          <h1 className="font-heading" style={{ fontSize: '5.5rem', color: '#172554', lineHeight: 0.95, fontWeight: 800, marginBottom: 20 }}>
            ZERO-TRUST<br/>
            <span style={{ color: '#2563EB' }}>SECURITY</span>
          </h1>
          <p className="font-mono" style={{ fontSize: '1rem', color: '#6B7280', letterSpacing: '0.12em', lineHeight: 1.6, marginBottom: 40 }}>
            APPLIED TO MULTI-TENANT<br/>DATA WAREHOUSES
          </p>
          <div style={{ display: 'flex', gap: 12, marginBottom: 40 }}>
            {['VERIFY', 'ISOLATE', 'MONITOR'].map(w => (
              <span key={w} className="font-mono" style={{ fontSize: '0.7rem', padding: '6px 14px', border: '1.5px solid #BFDBFE', borderRadius: 20, color: '#2563EB', fontWeight: 700, letterSpacing: '0.08em' }}>{w}</span>
            ))}
          </div>

          {/* Submission Details */}
          <div className="font-mono" style={{ display: 'flex', gap: 40, fontSize: '0.85rem', color: '#6B7280', letterSpacing: '0.05em', lineHeight: 1.6 }}>
            <div>
              <div style={{ fontWeight: 700, color: '#172554' }}>Submitted By:</div>
              <div>Kamlesh</div>
              <div>Roll No. : 2446586</div>
            </div>
            <div>
              <div style={{ fontWeight: 700, color: '#172554' }}>Submitted To:</div>
              <div>Ms. Hima Gandhi</div>
            </div>
          </div>
        </div>

        {/* ── RIGHT: Network diagram — fully clipped ── */}
        <div style={{ flex: '0 0 auto', position: 'relative', width: 580, height: 480 }}>
          {/* SVG lines — contained within this div, cannot escape to headings */}
          <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', overflow: 'visible', zIndex: 1 }}>
            <defs>
              <marker id="arrow1" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
                <path d="M0,0 L0,6 L8,3 z" fill="#2563EB" />
              </marker>
              <marker id="arrow2" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
                <path d="M0,0 L0,6 L8,3 z" fill="#10B981" />
              </marker>
              <marker id="arrow3" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
                <path d="M0,0 L0,6 L8,3 z" fill="#7C3AED" />
              </marker>
            </defs>
            {/* Path A → Cloud */}
            <path className="s1-path" d="M 155 90 C 280 90, 310 240, 430 240" fill="none" stroke="#2563EB" strokeWidth="3" strokeDasharray="600" strokeDashoffset="600" markerEnd="url(#arrow1)" />
            {/* Path B → Cloud */}
            <path className="s1-path" d="M 155 240 L 430 240" fill="none" stroke="#10B981" strokeWidth="3" strokeDasharray="600" strokeDashoffset="600" markerEnd="url(#arrow2)" />
            {/* Path C → Cloud */}
            <path className="s1-path" d="M 155 390 C 280 390, 310 240, 430 240" fill="none" stroke="#7C3AED" strokeWidth="3" strokeDasharray="600" strokeDashoffset="600" markerEnd="url(#arrow3)" />

            {/* Animated data packets */}
            <circle r="9" fill="#2563EB" style={{ filter: 'drop-shadow(0 0 6px #2563EB)' }}>
              <animateMotion dur="2.8s" repeatCount="indefinite" path="M 155 90 C 280 90, 310 240, 430 240" />
            </circle>
            <circle r="9" fill="#10B981" style={{ filter: 'drop-shadow(0 0 6px #10B981)' }}>
              <animateMotion dur="2.8s" repeatCount="indefinite" begin="0.9s" path="M 155 240 L 430 240" />
            </circle>
            <circle r="9" fill="#7C3AED" style={{ filter: 'drop-shadow(0 0 6px #7C3AED)' }}>
              <animateMotion dur="2.8s" repeatCount="indefinite" begin="1.8s" path="M 155 390 C 280 390, 310 240, 430 240" />
            </circle>
          </svg>

          {/* Tenant nodes */}
          {[
            { label: 'TENANT A', color: '#2563EB', top: 60 },
            { label: 'TENANT B', color: '#10B981', top: 210 },
            { label: 'TENANT C', color: '#7C3AED', top: 360 },
          ].map(({ label, color, top }) => (
            <div key={label} className="s1-node glass-panel" style={{ position: 'absolute', left: 10, top, width: 140, padding: '14px 18px', display: 'flex', alignItems: 'center', gap: 12, background: '#fff', border: `2px solid ${color}`, zIndex: 10 }}>
              <Building color={color} size={22} />
              <span className="font-heading" style={{ fontWeight: 700, fontSize: '0.9rem', color: '#172554' }}>{label}</span>
            </div>
          ))}

          {/* Cloud warehouse */}
          <div className="s1-node glass-panel" style={{ position: 'absolute', right: 0, top: 150, width: 160, height: 180, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: '#fff', border: '3px solid #172554', zIndex: 10 }}>
            <Cloud color="#00AEEF" size={44} style={{ marginBottom: 12 }} />
            <span className="font-heading" style={{ fontWeight: 800, fontSize: '1rem', color: '#172554' }}>CLOUD</span>
            <span className="font-mono" style={{ fontSize: '0.7rem', color: '#6B7280', marginTop: 4 }}>DATA WAREHOUSE</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Scene1;
