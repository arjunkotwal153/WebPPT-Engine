import React, { useState, useEffect, useRef, useCallback } from 'react';
import { gsap } from 'gsap';
import Scene1 from './scenes/Scene1';
import Scene2 from './scenes/Scene2';
import Scene3 from './scenes/Scene3';
import Scene4 from './scenes/Scene4';
import Scene5 from './scenes/Scene5';
import Scene6 from './scenes/Scene6';
import Scene7 from './scenes/Scene7';
import Scene8 from './scenes/Scene8';
import Scene9 from './scenes/Scene9';
import Scene10 from './scenes/Scene10';

const TOTAL_SCENES = 10;

const SCENE_LABELS = [
  'TITLE', 'MULTI-TENANT', 'THE PROBLEM', 'ZERO TRUST', 'COMPARISON',
  'ARCHITECTURE', 'ISOLATION', 'DECISION ENGINE', 'ATTACK SCENARIO', 'CONCLUSION'
];

// Each scene is placed on a large virtual canvas.
// Camera is centered by translating world-container using GSAP.
// x, y = center position of each scene; scale = camera zoom level.
const sceneCoordinates = [
  { x: 0,    y: 0,    scale: 1   },  // 1: Title
  { x: 2400, y: 0,    scale: 1   },  // 2: Multi-Tenancy
  { x: 4800, y: 0,    scale: 1   },  // 3: Security Problem
  { x: 4800, y: 2200, scale: 1   },  // 4: Zero Trust Principles
  { x: 2400, y: 2200, scale: 1   },  // 5: Traditional vs ZT
  { x: 0,    y: 2200, scale: 1   },  // 6: Hero Architecture
  { x: 0,    y: 4400, scale: 1   },  // 7: Tenant Isolation
  { x: 2400, y: 4400, scale: 1   },  // 8: Decision Engine
  { x: 4800, y: 4400, scale: 1   },  // 9: Attack Simulation
  { x: 2400, y: 6600, scale: 1   },  // 10: Conclusion
];

const App = () => {
  const [currentScene, setCurrentScene] = useState(1);
  const worldRef = useRef(null);
  const isAnimating = useRef(false);

  const navigate = useCallback((direction) => {
    if (isAnimating.current) return;

    let nextScene = currentScene;
    if (direction === 'next' && currentScene < TOTAL_SCENES) nextScene++;
    else if (direction === 'prev' && currentScene > 1) nextScene--;
    else if (typeof direction === 'number' && direction >= 1 && direction <= TOTAL_SCENES) nextScene = direction;

    if (nextScene === currentScene) return;

    isAnimating.current = true;
    setCurrentScene(nextScene);

    const target = sceneCoordinates[nextScene - 1];
    const vw = window.innerWidth;
    const vh = window.innerHeight;

    // The world-container is positioned at (50%, 50%) of the viewport via CSS.
    // Scenes are centered around their own coordinate via translate(-50%,-50%).
    // So GSAP transform offsets FROM the CSS origin (center of viewport).
    // To place scene at (target.x, target.y) in the center, we negate its coords.
    gsap.to(worldRef.current, {
      x: -target.x * target.scale,
      y: -target.y * target.scale,
      scale: target.scale,
      duration: 1.8,
      ease: 'power3.inOut',
      onComplete: () => { isAnimating.current = false; }
    });
  }, [currentScene]);

  // Initial camera setup — center Scene 1
  useEffect(() => {
    const target = sceneCoordinates[0];
    gsap.set(worldRef.current, {
      x: -target.x * target.scale,
      y: -target.y * target.scale,
      scale: target.scale
    });
  }, []);

  // Keyboard + scroll navigation
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'ArrowRight' || e.key === ' ') { e.preventDefault(); navigate('next'); }
      else if (e.key === 'ArrowLeft') { e.preventDefault(); navigate('prev'); }
    };
    let wheelCooldown = false;
    const handleWheel = (e) => {
      if (wheelCooldown) return;
      wheelCooldown = true;
      setTimeout(() => { wheelCooldown = false; }, 1200);
      navigate(e.deltaY > 0 ? 'next' : 'prev');
    };
    window.addEventListener('keydown', handleKey);
    window.addEventListener('wheel', handleWheel, { passive: true });
    return () => {
      window.removeEventListener('keydown', handleKey);
      window.removeEventListener('wheel', handleWheel);
    };
  }, [navigate]);

  return (
    <div className="presentation-canvas">
      <div className="world-container" ref={worldRef}>
        <Scene1  coords={sceneCoordinates[0]}  active={currentScene === 1}  />
        <Scene2  coords={sceneCoordinates[1]}  active={currentScene === 2}  />
        <Scene3  coords={sceneCoordinates[2]}  active={currentScene === 3}  />
        <Scene4  coords={sceneCoordinates[3]}  active={currentScene === 4}  />
        <Scene5  coords={sceneCoordinates[4]}  active={currentScene === 5}  />
        <Scene6  coords={sceneCoordinates[5]}  active={currentScene === 6}  />
        <Scene7  coords={sceneCoordinates[6]}  active={currentScene === 7}  />
        <Scene8  coords={sceneCoordinates[7]}  active={currentScene === 8}  />
        <Scene9  coords={sceneCoordinates[8]}  active={currentScene === 9}  />
        <Scene10 coords={sceneCoordinates[9]}  active={currentScene === 10} />
      </div>

      {/* ── Bottom HUD: progress dots + scene counter ── */}
      <div className="hud" style={{ bottom: '1.8rem', left: '2rem', right: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        {/* Progress bar */}
        <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
          {Array.from({ length: TOTAL_SCENES }).map((_, i) => (
            <div key={i} style={{
              width: i + 1 === currentScene ? 28 : 8,
              height: 4,
              borderRadius: 2,
              background: i + 1 === currentScene ? '#2563EB' : 'rgba(23, 37, 84, 0.2)',
              transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)'
            }} />
          ))}
        </div>

        {/* Scene label + counter */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.7rem', color: 'rgba(23,37,84,0.5)', letterSpacing: '0.1em' }}>
            {SCENE_LABELS[currentScene - 1]}
          </span>
          <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.8rem', color: '#172554', fontWeight: 700 }}>
            {String(currentScene).padStart(2, '0')} / {String(TOTAL_SCENES).padStart(2, '0')}
          </span>
        </div>
      </div>

      {/* ── Top-left HUD: logo ── */}
      <div className="hud" style={{ top: '1.8rem', left: '2rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
        <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#2563EB' }} />
        <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: '0.95rem', color: '#172554', letterSpacing: '-0.02em' }}>
          ZERO TRUST
        </span>
      </div>

      {/* ── Navigation arrows ── */}
      <div className="hud" style={{ bottom: '1.8rem', right: '2rem', display: 'flex', gap: '8px', pointerEvents: 'all' }}>
        <button onClick={() => navigate('prev')} disabled={currentScene === 1}
          style={{ width: 36, height: 36, borderRadius: '50%', border: '1.5px solid rgba(23,37,84,0.2)', background: 'rgba(255,255,255,0.8)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#172554', fontSize: '1rem', opacity: currentScene === 1 ? 0.3 : 1 }}>
          ←
        </button>
        <button onClick={() => navigate('next')} disabled={currentScene === TOTAL_SCENES}
          style={{ width: 36, height: 36, borderRadius: '50%', border: '1.5px solid rgba(23,37,84,0.2)', background: currentScene === TOTAL_SCENES ? 'rgba(255,255,255,0.4)' : '#2563EB', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: currentScene === TOTAL_SCENES ? '#172554' : 'white', fontSize: '1rem', opacity: currentScene === TOTAL_SCENES ? 0.3 : 1 }}>
          →
        </button>
      </div>

      {/* ── Side Navigation (Right edge) ── */}
      <div className="hud" style={{ position: 'fixed', right: '1.5rem', top: '50%', transform: 'translateY(-50%)', display: 'flex', flexDirection: 'column', gap: '8px', pointerEvents: 'all' }}>
        {Array.from({ length: TOTAL_SCENES }).map((_, i) => {
          const sceneNum = i + 1;
          const isActive = currentScene === sceneNum;
          return (
            <button key={sceneNum} onClick={() => navigate(sceneNum)}
              style={{
                width: 32, height: 32, borderRadius: '50%',
                background: isActive ? '#2563EB' : 'rgba(255,255,255,0.6)',
                border: isActive ? 'none' : '1px solid rgba(23,37,84,0.15)',
                color: isActive ? 'white' : '#6B7280',
                fontFamily: "'JetBrains Mono', monospace", fontSize: '0.75rem', fontWeight: 600,
                cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
                transition: 'all 0.3s',
                boxShadow: isActive ? '0 0 12px rgba(37,99,235,0.4)' : 'none'
              }}>
              {sceneNum}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default App;
