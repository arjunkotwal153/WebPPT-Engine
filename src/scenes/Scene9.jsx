import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { User, AlertCircle, ShieldX, Bell } from 'lucide-react';

const ATTACK_STEPS = [
  { id: 'spawn',    label: 'TENANT A USER',       sub: 'Initiates access request',           color: '#2563EB', pass: null },
  { id: 'target',  label: 'TARGET: TENANT B',     sub: 'Requests customer data from Tenant B', color: '#EF4444', pass: null },
  { id: 'identity',label: 'IDENTITY CHECK',       sub: 'User: analyst@tenant-a.com',         color: '#2563EB', pass: '✓ VERIFIED' },
  { id: 'mfa',     label: 'MFA CHECK',            sub: 'One-time code validated',             color: '#2563EB', pass: '✓ PASSED' },
  { id: 'tenant',  label: 'TENANT VERIFICATION',  sub: 'USER_TENANT = A  ·  REQ_TENANT = B', color: '#EF4444', pass: null, fail: 'A ≠ B' },
];

const Scene9 = ({ coords, active }) => {
  const ref = useRef(null);
  const [phase, setPhase] = useState(-1); // -1=idle, 0..N=step index, 'denied'=final

  useEffect(() => {
    if (!active || !ref.current) return;
    setPhase(-1);

    gsap.fromTo(ref.current.querySelector('.s9-title'),
      { opacity: 0, y: -30 }, { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' }
    );

    const run = async () => {
      await new Promise(r => setTimeout(r, 600));
      for (let i = 0; i < ATTACK_STEPS.length; i++) {
        setPhase(i);
        await new Promise(r => setTimeout(r, i === ATTACK_STEPS.length - 1 ? 900 : 800));
      }
      await new Promise(r => setTimeout(r, 400));
      setPhase('denied');
    };
    run();
  }, [active]);

  const shownSteps = phase === -1 ? [] : phase === 'denied' ? ATTACK_STEPS : ATTACK_STEPS.slice(0, phase + 1);
  const isDenied = phase === 'denied';

  return (
    <div className="scene" style={{ left: coords.x, top: coords.y }}>
      <div ref={ref} style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '50px 80px', gap: 32 }}>

        <div className="s9-title" style={{ textAlign: 'center' }}>
          <h2 className="font-heading" style={{ fontSize: '3.2rem', color: '#172554', fontWeight: 800, marginBottom: 6 }}>
            REAL-WORLD ATTACK SCENARIO
          </h2>
          <p className="font-mono" style={{ fontSize: '0.85rem', color: '#9CA3AF', letterSpacing: '0.1em' }}>
            TENANT A ATTEMPTS UNAUTHORIZED ACCESS TO TENANT B DATA
          </p>
        </div>

        <div style={{ display: 'flex', gap: 50, alignItems: 'flex-start', width: '100%', maxWidth: 1100 }}>

          {/* Attack flow */}
          <div style={{ flex: '0 0 440px', display: 'flex', flexDirection: 'column', gap: 0 }}>
            {shownSteps.map((step, i) => {
              const isLast = i === shownSteps.length - 1;
              const isFail = step.fail && isDenied;
              const isCurrentlyFailing = step.fail && !isDenied && phase === i;

              return (
                <React.Fragment key={step.id}>
                  <div style={{
                    padding: '14px 20px', borderRadius: 12,
                    background: isFail ? '#FEF2F2' : step.pass ? '#ECFDF5' : step.id === 'target' ? '#FFF7ED' : '#fff',
                    border: `2px solid ${isFail ? '#EF4444' : step.pass ? '#10B981' : step.id === 'target' ? '#FDE68A' : '#E5E7EB'}`,
                    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                    animation: 'fade-up 0.4s ease',
                    boxShadow: isFail ? '0 0 20px rgba(239,68,68,0.15)' : '0 2px 8px rgba(0,0,0,0.04)'
                  }}>
                    <div>
                      <div className="font-heading" style={{ fontWeight: 700, fontSize: '0.95rem', color: isFail ? '#B91C1C' : step.color === '#EF4444' ? '#92400E' : '#172554' }}>
                        {step.label}
                      </div>
                      <div className="font-mono" style={{ fontSize: '0.72rem', color: '#6B7280', marginTop: 3 }}>{step.sub}</div>
                    </div>
                    <div>
                      {step.pass && <span className="badge badge-pass">{step.pass}</span>}
                      {isFail && (
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 4 }}>
                          <span className="font-heading" style={{ fontSize: '1.2rem', fontWeight: 800, color: '#EF4444' }}>{step.fail}</span>
                          <span className="badge badge-fail">MISMATCH</span>
                        </div>
                      )}
                      {!step.pass && !isFail && isLast && <AlertCircle size={20} color="#F59E0B" />}
                    </div>
                  </div>
                  {i < shownSteps.length - 1 && (
                    <div style={{ width: 2, height: 16, background: '#D1D5DB', marginLeft: 28, flexShrink: 0 }} />
                  )}
                </React.Fragment>
              );
            })}
          </div>

          {/* Status panel */}
          <div style={{ flex: 1 }}>
            {!isDenied ? (
              <div className="glass-panel" style={{ padding: '24px', background: '#fff' }}>
                <p className="font-mono" style={{ fontSize: '0.8rem', color: '#9CA3AF', marginBottom: 12 }}>SECURITY AUDIT LOG</p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                  {shownSteps.map(s => (
                    <div key={s.id} className="font-mono" style={{ fontSize: '0.75rem', color: '#6B7280', padding: '6px 0', borderBottom: '1px solid #F3F4F6' }}>
                      <span style={{ color: '#9CA3AF' }}>[{new Date().toLocaleTimeString()}] </span>
                      {s.pass ? `✓ ${s.label}: PASSED` : s.id === 'target' ? `⚠ Cross-tenant request detected` : `→ Processing: ${s.label}`}
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                {/* ACCESS DENIED */}
                <div className="glass-panel" style={{ padding: '28px', background: '#FEF2F2', border: '3px solid #EF4444', borderRadius: 16, textAlign: 'center', animation: 'fade-up 0.5s ease', boxShadow: '0 0 40px rgba(239,68,68,0.2)' }}>
                  <ShieldX size={56} color="#EF4444" style={{ marginBottom: 12 }} />
                  <h3 className="font-heading" style={{ fontSize: '2rem', color: '#B91C1C', fontWeight: 800, marginBottom: 8 }}>ACCESS DENIED</h3>
                  <p className="font-mono" style={{ fontSize: '0.8rem', color: '#991B1B' }}>TENANT MISMATCH — A ≠ B</p>
                </div>

                {/* Log events */}
                <div className="glass-panel" style={{ padding: '20px', background: '#fff', border: '1.5px solid #E5E7EB', animation: 'fade-up 0.5s 0.2s ease both' }}>
                  <p className="font-mono" style={{ fontSize: '0.75rem', color: '#9CA3AF', marginBottom: 10 }}>SECURITY EVENTS</p>
                  {[
                    { icon: '✕', color: '#EF4444', msg: 'ACCESS ATTEMPT BLOCKED' },
                    { icon: '📋', color: '#F59E0B', msg: 'ATTEMPT LOGGED — EVENT ID #4921' },
                    { icon: '🔔', color: '#2563EB', msg: 'SECURITY ALERT ISSUED TO ADMIN' },
                  ].map(({ icon, color, msg }) => (
                    <div key={msg} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '8px 0', borderBottom: '1px solid #F3F4F6' }}>
                      <span style={{ color, fontSize: '1rem' }}>{icon}</span>
                      <span className="font-mono" style={{ fontSize: '0.8rem', color: '#374151', fontWeight: 600 }}>{msg}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Scene9;
