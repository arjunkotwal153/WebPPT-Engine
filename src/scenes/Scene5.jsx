import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { X, Check } from 'lucide-react';

const Scene5 = ({ coords, active }) => {
  const ref = useRef(null);

  useEffect(() => {
    if (!active || !ref.current) return;
    const tl = gsap.timeline();
    tl.fromTo(ref.current.querySelector('.s5-heading'),
      { opacity: 0, y: -30 }, { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' }
    );
    tl.fromTo(ref.current.querySelector('.s5-left'),
      { opacity: 0, x: -60 }, { opacity: 1, x: 0, duration: 0.8, ease: 'power3.out' },
      '-=0.3'
    );
    tl.fromTo(ref.current.querySelector('.s5-right'),
      { opacity: 0, x: 60 }, { opacity: 1, x: 0, duration: 0.8, ease: 'power3.out' },
      '-=0.7'
    );
  }, [active]);

  const tradSteps = [
    { label: 'USER', neutral: true },
    { label: 'FIREWALL', highlight: true, note: 'ONE CHECK' },
    { label: 'INTERNAL NETWORK', neutral: true },
    { label: 'FULL DATA ACCESS', danger: true },
  ];

  const ztSteps = [
    { label: 'USER', neutral: true },
    { label: 'IDENTITY + MFA', pass: true, note: 'VERIFY' },
    { label: 'POLICY ENGINE', pass: true, note: 'VERIFY' },
    { label: 'TENANT CHECK', pass: true, note: 'VERIFY' },
    { label: 'LEAST PRIVILEGE', pass: true, note: 'VERIFY' },
    { label: 'DATA ACCESS', success: true },
  ];

  return (
    <div className="scene" style={{ left: coords.x, top: coords.y }}>
      <div ref={ref} style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '60px 80px', gap: 36 }}>

        <h2 className="font-heading s5-heading" style={{ fontSize: '3.5rem', color: '#172554', fontWeight: 800 }}>
          TRADITIONAL <span style={{ color: '#9CA3AF', fontWeight: 400 }}>vs</span> <span style={{ color: '#2563EB' }}>ZERO TRUST</span>
        </h2>

        <div style={{ display: 'flex', gap: 50, width: '100%', maxWidth: 1100, alignItems: 'stretch' }}>

          {/* Traditional column */}
          <div className="s5-left glass-panel" style={{ flex: 1, padding: '32px', background: '#fff', border: '2px solid #FCA5A5' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 24 }}>
              <X size={22} color="#EF4444" />
              <h3 className="font-heading" style={{ color: '#EF4444', fontSize: '1.4rem', fontWeight: 700 }}>TRADITIONAL</h3>
            </div>
            <div style={{ position: 'relative', padding: '16px', border: '2px dashed #FCA5A5', borderRadius: 10, background: '#FEF2F2', marginBottom: 16 }}>
              <div style={{ position: 'absolute', top: -12, left: 16, background: '#FEF2F2', padding: '0 8px' }}>
                <span className="font-mono" style={{ fontSize: '0.65rem', color: '#EF4444', fontWeight: 700 }}>TRUSTED ZONE</span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
                {tradSteps.map((step, i) => (
                  <React.Fragment key={step.label}>
                    <div style={{ width: '100%', padding: '10px 16px', background: step.danger ? '#FEE2E2' : step.highlight ? '#FFFBEB' : '#fff', border: `1.5px solid ${step.danger ? '#EF4444' : step.highlight ? '#F59E0B' : '#E5E7EB'}`, borderRadius: 8, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span className="font-heading" style={{ fontWeight: 600, fontSize: '0.9rem', color: step.danger ? '#991B1B' : '#374151' }}>{step.label}</span>
                      {step.note && <span className="font-mono" style={{ fontSize: '0.65rem', color: '#B45309', background: '#FEF3C7', padding: '2px 8px', borderRadius: 10, fontWeight: 700 }}>{step.note}</span>}
                      {step.danger && <X size={16} color="#EF4444" />}
                    </div>
                    {i < tradSteps.length - 1 && <div style={{ width: 2, height: 16, background: step.highlight ? '#EF4444' : '#D1D5DB' }} />}
                  </React.Fragment>
                ))}
              </div>
            </div>
            <p className="font-mono" style={{ fontSize: '0.8rem', color: '#6B7280', textAlign: 'center' }}>TRUST ONCE — ACCESS EVERYTHING</p>
          </div>

          {/* Zero Trust column */}
          <div className="s5-right glass-panel" style={{ flex: 1, padding: '32px', background: '#F0F9FF', border: '2px solid #93C5FD' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 24 }}>
              <Check size={22} color="#2563EB" />
              <h3 className="font-heading" style={{ color: '#2563EB', fontSize: '1.4rem', fontWeight: 700 }}>ZERO TRUST</h3>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, marginBottom: 16 }}>
              {ztSteps.map((step, i) => (
                <React.Fragment key={step.label}>
                  <div style={{ width: '100%', padding: '10px 16px', background: step.success ? '#ECFDF5' : step.pass ? '#fff' : '#fff', border: `1.5px solid ${step.success ? '#10B981' : step.pass ? '#2563EB' : '#E5E7EB'}`, borderRadius: 8, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span className="font-heading" style={{ fontWeight: 600, fontSize: '0.9rem', color: step.success ? '#047857' : '#172554' }}>{step.label}</span>
                    {step.pass && <span className="font-mono" style={{ fontSize: '0.65rem', color: '#2563EB', background: '#DBEAFE', padding: '2px 8px', borderRadius: 10, fontWeight: 700 }}>✓ {step.note}</span>}
                    {step.success && <Check size={16} color="#10B981" />}
                  </div>
                  {i < ztSteps.length - 1 && <div style={{ width: 2, height: 12, background: '#93C5FD' }} />}
                </React.Fragment>
              ))}
            </div>
            <p className="font-mono" style={{ fontSize: '0.8rem', color: '#2563EB', textAlign: 'center', fontWeight: 600 }}>VERIFY EVERY REQUEST — EVERY TIME</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Scene5;
