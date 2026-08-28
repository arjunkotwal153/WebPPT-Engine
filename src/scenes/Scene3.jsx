import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { User, ShieldAlert, AlertTriangle, Database } from 'lucide-react';

const Scene3 = ({ coords, active }) => {
  const ref = useRef(null);

  useEffect(() => {
    if (!active || !ref.current) return;
    const tl = gsap.timeline();
    tl.fromTo(ref.current.querySelectorAll('.s3-title > *'),
      { opacity: 0, y: -30 }, { opacity: 1, y: 0, duration: 0.7, stagger: 0.15, ease: 'power3.out' }
    );
    tl.fromTo(ref.current.querySelectorAll('.s3-node'),
      { opacity: 0, scale: 0.7 }, { opacity: 1, scale: 1, duration: 0.6, stagger: 0.12, ease: 'back.out(2)' },
      '-=0.3'
    );
    tl.fromTo(ref.current.querySelectorAll('.s3-arrow'),
      { scaleX: 0, opacity: 0 }, { scaleX: 1, opacity: 1, duration: 0.5, stagger: 0.15, ease: 'power2.out', transformOrigin: 'left center' },
      '-=0.2'
    );
    tl.fromTo(ref.current.querySelectorAll('.s3-problem'),
      { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.6, stagger: 0.1, ease: 'power2.out' },
      '+=0.1'
    );
  }, [active]);

  return (
    <div className="scene" style={{ left: coords.x, top: coords.y }}>
      <div ref={ref} style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '60px 80px', gap: 50 }}>

        <div className="s3-title" style={{ textAlign: 'center' }}>
          <h2 className="font-heading" style={{ fontSize: '4rem', color: '#EF4444', fontWeight: 800, marginBottom: 8 }}>
            TRUST BREAKS
          </h2>
          <p className="font-mono" style={{ fontSize: '1rem', color: '#6B7280', letterSpacing: '0.1em' }}>
            WHAT HAPPENS WITHOUT PROPER VERIFICATION?
          </p>
        </div>

        {/* Attack flow diagram — self-contained, no escaping lines */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 0 }}>
          {/* Compromised account */}
          <div className="s3-node glass-panel" style={{ width: 200, padding: '28px 20px', display: 'flex', flexDirection: 'column', alignItems: 'center', background: '#FEF2F2', border: '2px solid #FCA5A5' }}>
            <User size={48} color="#EF4444" style={{ marginBottom: 12 }} />
            <span className="font-heading" style={{ fontWeight: 700, color: '#991B1B', textAlign: 'center', fontSize: '0.95rem' }}>COMPROMISED<br/>ACCOUNT</span>
            <span className="font-mono" style={{ fontSize: '0.7rem', color: '#EF4444', marginTop: 8 }}>TENANT A</span>
          </div>

          {/* Arrow 1 */}
          <div className="s3-arrow" style={{ width: 120, height: 4, background: '#EF4444', position: 'relative', flexShrink: 0 }}>
            <div style={{ position: 'absolute', right: -8, top: -8, color: '#EF4444', fontSize: 20 }}>▶</div>
            <div style={{ position: 'absolute', top: -22, left: '50%', transform: 'translateX(-50%)', whiteSpace: 'nowrap' }}>
              <span className="font-mono" style={{ fontSize: '0.65rem', color: '#EF4444', background: '#FFF', padding: '2px 6px', border: '1px solid #FCA5A5', borderRadius: 4 }}>UNAUTHORIZED</span>
            </div>
          </div>

          {/* Weak isolation */}
          <div className="s3-node glass-panel" style={{ width: 200, padding: '28px 20px', display: 'flex', flexDirection: 'column', alignItems: 'center', background: '#FFFBEB', border: '2px solid #FDE68A' }}>
            <AlertTriangle size={48} color="#F59E0B" style={{ marginBottom: 12 }} />
            <span className="font-heading" style={{ fontWeight: 700, color: '#92400E', textAlign: 'center', fontSize: '0.95rem' }}>NO<br/>VERIFICATION</span>
            <span className="font-mono" style={{ fontSize: '0.7rem', color: '#B45309', marginTop: 8 }}>IMPLICIT TRUST</span>
          </div>

          {/* Arrow 2 */}
          <div className="s3-arrow" style={{ width: 120, height: 4, background: '#EF4444', position: 'relative', flexShrink: 0 }}>
            <div style={{ position: 'absolute', right: -8, top: -8, color: '#EF4444', fontSize: 20 }}>▶</div>
            <div style={{ position: 'absolute', top: -22, left: '50%', transform: 'translateX(-50%)', whiteSpace: 'nowrap' }}>
              <span className="font-mono" style={{ fontSize: '0.65rem', color: '#EF4444', background: '#FFF', padding: '2px 6px', border: '1px solid #FCA5A5', borderRadius: 4 }}>CROSS-TENANT</span>
            </div>
          </div>

          {/* Data exposure */}
          <div className="s3-node glass-panel" style={{ width: 200, padding: '28px 20px', display: 'flex', flexDirection: 'column', alignItems: 'center', background: '#FEF2F2', border: '3px solid #EF4444', boxShadow: '0 0 30px rgba(239,68,68,0.15)' }}>
            <ShieldAlert size={48} color="#EF4444" style={{ marginBottom: 12 }} />
            <span className="font-heading" style={{ fontWeight: 700, color: '#991B1B', textAlign: 'center', fontSize: '1.1rem' }}>DATA<br/>EXPOSURE</span>
            <span className="font-mono" style={{ fontSize: '0.7rem', color: '#EF4444', marginTop: 8 }}>TENANT B DATA</span>
          </div>
        </div>

        {/* Problem breakdown */}
        <div style={{ display: 'flex', gap: 24 }}>
          {[
            { problem: 'NO IDENTITY CHECK', desc: 'Any authenticated user can query any table' },
            { problem: 'NO TENANT ISOLATION', desc: 'SQL queries can access cross-tenant rows' },
            { problem: 'NO MONITORING', desc: 'Breach goes undetected for days' },
          ].map(({ problem, desc }) => (
            <div key={problem} className="s3-problem glass-panel" style={{ padding: '18px 22px', width: 280, background: '#fff', border: '1.5px solid #E5E7EB' }}>
              <div style={{ display: 'flex', gap: 10, alignItems: 'flex-start', marginBottom: 8 }}>
                <span style={{ color: '#EF4444', fontSize: '1.1rem', fontWeight: 800, flexShrink: 0 }}>✕</span>
                <span className="font-heading" style={{ fontWeight: 700, fontSize: '0.9rem', color: '#172554' }}>{problem}</span>
              </div>
              <p className="font-body" style={{ fontSize: '0.8rem', color: '#6B7280', lineHeight: 1.5 }}>{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Scene3;
