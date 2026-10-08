/**
 * DevotedZen Labs - Simulation Engines
 * Theme: Stealth Black & Cyber Crimson Red
 * 1. Hero Ambient Neural Vector Field Canvas
 * 2. SadakDrishti Road Perception Canvas
 * 3. AI Cyber Threat Intelligence SOC Console Feed
 * 4. AI Fitness Tracker 33-Point Pose Estimator
 */

(function() {
  'use strict';

  // =========================================================================
  // 1. Hero Ambient Neural Vector Field Canvas (Black & Red)
  // =========================================================================
  window.initHeroNeuralCanvas = function(canvasId) {
    const canvas = document.getElementById(canvasId);
    if (!canvas) return null;
    const ctx = canvas.getContext('2d');
    let width = 0;
    let height = 0;
    let animId = null;

    const mouse = { x: null, y: null, radius: 140 };

    function onResize() {
      width = canvas.width = canvas.parentElement.offsetWidth;
      height = canvas.height = canvas.parentElement.offsetHeight;
    }
    onResize();
    window.addEventListener('resize', onResize);

    window.addEventListener('mousemove', (e) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    });

    window.addEventListener('mouseleave', () => {
      mouse.x = null;
      mouse.y = null;
    });

    const particleCount = Math.min(65, Math.floor((window.innerWidth * window.innerHeight) / 18000));
    const particles = [];

    class Particle {
      constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.vx = (Math.random() - 0.5) * 0.7;
        this.vy = (Math.random() - 0.5) * 0.7;
        this.size = Math.random() * 2 + 1.2;
        this.baseColor = Math.random() > 0.6 ? '#ef4444' : (Math.random() > 0.4 ? '#f87171' : '#dc2626');
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;

        if (this.x < 0 || this.x > width) this.vx *= -1;
        if (this.y < 0 || this.y > height) this.vy *= -1;

        if (mouse.x !== null && mouse.y !== null) {
          const dx = mouse.x - this.x;
          const dy = mouse.y - this.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < mouse.radius) {
            const force = (mouse.radius - dist) / mouse.radius;
            this.x -= (dx / dist) * force * 1.5;
            this.y -= (dy / dist) * force * 1.5;
          }
        }
      }

      draw() {
        ctx.fillStyle = this.baseColor;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }

    function animate() {
      ctx.clearRect(0, 0, width, height);

      // Connect near particles with crimson lines
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 130) {
            const alpha = (1 - dist / 130) * 0.22;
            ctx.strokeStyle = `rgba(239, 68, 68, ${alpha})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }

      // Connect to mouse cursor
      if (mouse.x !== null && mouse.y !== null) {
        for (let i = 0; i < particles.length; i++) {
          const dx = mouse.x - particles[i].x;
          const dy = mouse.y - particles[i].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < mouse.radius) {
            const alpha = (1 - dist / mouse.radius) * 0.38;
            ctx.strokeStyle = `rgba(255, 42, 75, ${alpha})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(mouse.x, mouse.y);
            ctx.stroke();
          }
        }
      }

      particles.forEach(p => {
        p.update();
        p.draw();
      });

      animId = requestAnimationFrame(animate);
    }

    animate();

    return {
      destroy: () => cancelAnimationFrame(animId)
    };
  };

  // =========================================================================
  // 2. SadakDrishti Road Perception Simulator (Black & Red/Amber)
  // =========================================================================
  window.initSadakSimulator = function(canvasId) {
    const canvas = document.getElementById(canvasId);
    if (!canvas) return null;
    const ctx = canvas.getContext('2d');
    let isRunning = true;
    let weatherMode = 'day';
    let anomalyCount = 42;

    function resizeCanvas() {
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * (window.devicePixelRatio || 1);
      canvas.height = rect.height * (window.devicePixelRatio || 1);
      ctx.scale(window.devicePixelRatio || 1, window.devicePixelRatio || 1);
    }
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    let roadOffset = 0;
    const anomalies = [
      { z: 0.85, x: 0.18, type: 'Pothole [P-01]', severity: 'HIGH', conf: 99.2, w: 90, h: 45 },
      { z: 0.52, x: -0.25, type: 'Longitudinal Crack', severity: 'MED', conf: 96.8, w: 120, h: 25 },
      { z: 0.18, x: 0.05, type: 'Alligator Cracking', severity: 'HIGH', conf: 98.4, w: 140, h: 55 }
    ];

    function draw() {
      const w = canvas.getBoundingClientRect().width;
      const h = canvas.getBoundingClientRect().height;

      // Horizon & Sky
      const horizonY = h * 0.42;
      const vanishingX = w * 0.5;

      ctx.fillStyle = weatherMode === 'night' ? '#020205' : (weatherMode === 'rain' ? '#090a12' : '#04050a');
      ctx.fillRect(0, 0, w, horizonY);

      // Road Surface
      const roadGrad = ctx.createLinearGradient(0, horizonY, 0, h);
      roadGrad.addColorStop(0, '#0c0e18');
      roadGrad.addColorStop(1, '#030408');
      ctx.fillStyle = roadGrad;

      ctx.beginPath();
      ctx.moveTo(vanishingX - 45, horizonY);
      ctx.lineTo(vanishingX + 45, horizonY);
      ctx.lineTo(w * 0.95, h);
      ctx.lineTo(w * 0.05, h);
      ctx.closePath();
      ctx.fill();

      // Road Shoulder Borders (Crimson/Amber)
      ctx.strokeStyle = 'rgba(239, 68, 68, 0.45)';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(vanishingX - 45, horizonY);
      ctx.lineTo(w * 0.05, h);
      ctx.moveTo(vanishingX + 45, horizonY);
      ctx.lineTo(w * 0.95, h);
      ctx.stroke();

      // Centerline
      if (isRunning) roadOffset = (roadOffset + 0.016) % 1;

      ctx.strokeStyle = '#ef4444';
      for (let i = 0; i < 9; i++) {
        let pos = (i / 9 + roadOffset) % 1;
        let y = horizonY + Math.pow(pos, 2.5) * (h - horizonY);
        let nextY = horizonY + Math.pow(Math.min(pos + 0.06, 1), 2.5) * (h - horizonY);
        ctx.lineWidth = 1 + pos * 5;
        ctx.beginPath();
        ctx.moveTo(vanishingX, y);
        ctx.lineTo(vanishingX, nextY);
        ctx.stroke();
      }

      // Render Detected Anomalies
      anomalies.forEach(a => {
        if (isRunning) {
          a.z += 0.007;
          if (a.z > 1) {
            a.z = 0.05;
            a.x = (Math.random() - 0.5) * 0.6;
            anomalyCount++;
            const counterEl = document.getElementById('sadak-anomaly-stat');
            if (counterEl) counterEl.textContent = anomalyCount;
          }
        }

        const scale = Math.pow(a.z, 2.2);
        const y = horizonY + scale * (h - horizonY);
        const roadWAtY = 90 + scale * (w * 0.9 - 90);
        const x = vanishingX + a.x * roadWAtY;
        const boxW = Math.max(26, a.w * scale);
        const boxH = Math.max(14, a.h * scale);

        if (a.z > 0.12) {
          ctx.fillStyle = 'rgba(3, 4, 8, 0.9)';
          ctx.beginPath();
          ctx.ellipse(x, y, boxW * 0.45, boxH * 0.45, 0, 0, Math.PI * 2);
          ctx.fill();

          // Bounding Box (Crimson Red)
          const color = a.severity === 'HIGH' ? '#ef4444' : '#f97316';
          ctx.strokeStyle = color;
          ctx.lineWidth = 2;
          ctx.strokeRect(x - boxW / 2, y - boxH / 2, boxW, boxH);

          // Corner brackets
          const cl = Math.min(8, boxW * 0.25);
          ctx.strokeStyle = '#ffffff';
          ctx.lineWidth = 2;
          ctx.beginPath();
          ctx.moveTo(x - boxW/2, y - boxH/2 + cl); ctx.lineTo(x - boxW/2, y - boxH/2); ctx.lineTo(x - boxW/2 + cl, y - boxH/2);
          ctx.moveTo(x + boxW/2 - cl, y - boxH/2); ctx.lineTo(x + boxW/2, y - boxH/2); ctx.lineTo(x + boxW/2, y - boxH/2 + cl);
          ctx.moveTo(x - boxW/2, y + boxH/2 - cl); ctx.lineTo(x - boxW/2, y + boxH/2); ctx.lineTo(x - boxW/2 + cl, y + boxH/2);
          ctx.moveTo(x + boxW/2 - cl, y + boxH/2); ctx.lineTo(x + boxW/2, y + boxH/2); ctx.lineTo(x + boxW/2, y + boxH/2 - cl);
          ctx.stroke();

          // Classification Tag
          if (scale > 0.25) {
            ctx.fillStyle = 'rgba(6, 8, 14, 0.92)';
            const tag = `${a.type} • ${a.conf}%`;
            ctx.font = '10px "JetBrains Mono", monospace';
            const tm = ctx.measureText(tag);
            ctx.fillRect(x - boxW/2, y - boxH/2 - 20, tm.width + 10, 18);
            ctx.strokeStyle = color;
            ctx.lineWidth = 1;
            ctx.strokeRect(x - boxW/2, y - boxH/2 - 20, tm.width + 10, 18);
            ctx.fillStyle = color;
            ctx.fillText(tag, x - boxW/2 + 5, y - boxH/2 - 7);
          }
        }
      });

      // HUD crosshair
      ctx.strokeStyle = 'rgba(239, 68, 68, 0.35)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(w/2 - 15, h * 0.65); ctx.lineTo(w/2 + 15, h * 0.65);
      ctx.moveTo(w/2, h * 0.65 - 15); ctx.lineTo(w/2, h * 0.65 + 15);
      ctx.stroke();

      if (isRunning) requestAnimationFrame(draw);
    }

    draw();

    return {
      togglePlay: () => {
        isRunning = !isRunning;
        if (isRunning) draw();
        return isRunning;
      },
      injectAnomaly: () => {
        anomalies.push({
          z: 0.15,
          x: (Math.random() - 0.5) * 0.5,
          type: 'Pothole [P-MAX]',
          severity: 'HIGH',
          conf: 99.8,
          w: 110,
          h: 50
        });
      },
      setWeather: (m) => { weatherMode = m; }
    };
  };

  // =========================================================================
  // 3. AI Cyber Threat Intelligence SOC Console Feed
  // =========================================================================
  window.initCyberSimulator = function(feedContainerId) {
    const container = document.getElementById(feedContainerId);
    if (!container) return null;

    const baseEvents = [
      { time: 'JUST NOW', ip: '185.220.101.5', vector: 'OAuth Hijacking Attempt', tech: 'T1566.002', sev: 'CRITICAL', action: 'Token Revoked' },
      { time: '4s ago', ip: '45.154.255.89', vector: 'Dark Web Leaked Key Pattern', tech: 'T1552.001', sev: 'HIGH', action: 'SOAR Key Rotated' },
      { time: '11s ago', ip: '194.26.29.112', vector: 'L7 Distributed Flooding', tech: 'T1498.001', sev: 'HIGH', action: 'BGP Scrubbing Active' },
      { time: '18s ago', ip: '103.145.13.204', vector: 'Zero-Day Spring Boot Scanner', tech: 'T1190', sev: 'MEDIUM', action: 'WAF Rate Limited' }
    ];

    function createRow(e, prepend = true) {
      const row = document.createElement('div');
      row.style.cssText = `
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0.65rem 0.85rem;
        background: rgba(10, 12, 20, 0.75);
        border: 1px solid rgba(255, 255, 255, 0.06);
        border-left: 3px solid ${e.sev === 'CRITICAL' ? '#ef4444' : e.sev === 'HIGH' ? '#f97316' : '#f43f5e'};
        border-radius: 6px;
        margin-bottom: 0.5rem;
        font-family: var(--font-mono);
        font-size: 0.775rem;
      `;
      row.innerHTML = `
        <div style="display: flex; align-items: center; gap: 0.75rem;">
          <span style="color: #64748b; font-size: 0.7rem;">${e.time}</span>
          <span style="color: #cbd5e1; font-weight: 600;">${e.ip}</span>
          <span style="color: #94a3b8;">${e.vector}</span>
        </div>
        <div style="display: flex; align-items: center; gap: 0.65rem;">
          <span style="background: rgba(239,68,68,0.12); color: #fca5a5; padding: 2px 6px; border-radius: 4px; font-size: 0.7rem;">${e.tech}</span>
          <span style="color: ${e.sev === 'CRITICAL' ? '#ef4444' : e.sev === 'HIGH' ? '#f97316' : '#f43f5e'}; font-weight: 700;">${e.sev}</span>
          <span style="color: #fca5a5; font-size: 0.7rem; background: rgba(239, 68, 68, 0.15); padding: 2px 6px; border-radius: 4px; border: 1px solid rgba(239, 68, 68, 0.25);">${e.action}</span>
        </div>
      `;

      if (prepend) {
        container.insertBefore(row, container.firstChild);
        if (container.children.length > 7) container.removeChild(container.lastChild);
      } else {
        container.appendChild(row);
      }
    }

    container.innerHTML = '';
    baseEvents.forEach(e => createRow(e, false));

    const interval = setInterval(() => {
      createRow({
        time: 'JUST NOW',
        ip: `${Math.floor(Math.random()*150+50)}.${Math.floor(Math.random()*220)}.${Math.floor(Math.random()*220)}.${Math.floor(Math.random()*220)}`,
        vector: ['Kerberoasting Ticket Theft', 'SQLi Perimeter Probe', 'Session Token Hijack', 'Supply Chain Package Tamper'][Math.floor(Math.random()*4)],
        tech: ['T1558', 'T1190', 'T1539', 'T1195'][Math.floor(Math.random()*4)],
        sev: Math.random() > 0.6 ? 'CRITICAL' : (Math.random() > 0.5 ? 'HIGH' : 'MEDIUM'),
        action: 'Autonomous Defense Active'
      }, true);
    }, 4500);

    return {
      injectAlert: () => {
        createRow({
          time: 'MANUAL INJECT',
          ip: '203.0.113.199',
          vector: 'Polymorphic Ransomware Pre-Execution',
          tech: 'T1486',
          sev: 'CRITICAL',
          action: 'Eradicated & Quarantined'
        }, true);
      },
      destroy: () => clearInterval(interval)
    };
  };

  // =========================================================================
  // 4. AI Fitness Tracker 33-Point Pose Estimator (Black & Crimson)
  // =========================================================================
  window.initFitnessSimulator = function(canvasId) {
    const canvas = document.getElementById(canvasId);
    if (!canvas) return null;
    const ctx = canvas.getContext('2d');
    let isRunning = true;
    let repCount = 14;
    let phase = 0;
    let lastPhase = 0;
    let isBadForm = false;

    function resizeCanvas() {
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * (window.devicePixelRatio || 1);
      canvas.height = rect.height * (window.devicePixelRatio || 1);
      ctx.scale(window.devicePixelRatio || 1, window.devicePixelRatio || 1);
    }
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    function draw() {
      const w = canvas.getBoundingClientRect().width;
      const h = canvas.getBoundingClientRect().height;
      ctx.clearRect(0, 0, w, h);

      // Background grid lines
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.035)';
      ctx.lineWidth = 1;
      for (let x = 0; x < w; x += 32) {
        ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, h); ctx.stroke();
      }
      for (let y = 0; y < h; y += 32) {
        ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(w, y); ctx.stroke();
      }

      // Update Squat Phase
      if (isRunning) {
        phase = (phase + 0.035) % (Math.PI * 2);
        if (lastPhase < Math.PI && phase >= Math.PI) {
          repCount++;
          const repEl = document.getElementById('fitness-rep-stat') || document.getElementById('fitness-page-reps');
          if (repEl) repEl.textContent = repCount;
        }
        lastPhase = phase;
      }

      const squatFactor = (Math.sin(phase - Math.PI / 2) + 1) / 2;
      const cx = w * 0.5;
      const groundY = h * 0.88;

      const hipY = groundY - 140 - (1 - squatFactor) * 80;
      const hipX = isBadForm ? cx + squatFactor * 35 : cx;
      const kneeY = groundY - 70 - (1 - squatFactor) * 30;
      const kneeX = isBadForm ? cx - 30 : cx + 40;
      const ankleY = groundY - 10;
      const ankleX = cx + 10;

      const torsoAngle = isBadForm ? 0.35 * squatFactor : 0.15 * squatFactor;
      const shoulderY = hipY - 100;
      const shoulderX = hipX - Math.sin(torsoAngle) * 90;
      const headY = shoulderY - 35;
      const headX = shoulderX - 10;

      const elbowX = shoulderX + 45;
      const elbowY = shoulderY + 25;
      const wristX = elbowX + 35;
      const wristY = elbowY - 15;

      const keypoints = [
        { id: 0, x: headX, y: headY },
        { id: 11, x: shoulderX, y: shoulderY },
        { id: 13, x: elbowX, y: elbowY },
        { id: 15, x: wristX, y: wristY },
        { id: 23, x: hipX, y: hipY },
        { id: 25, x: kneeX, y: kneeY },
        { id: 27, x: ankleX, y: ankleY },
        { id: 31, x: ankleX + 25, y: groundY - 5 }
      ];

      const bones = [
        [0, 11], [11, 13], [13, 15], [11, 23], [23, 25], [25, 27], [27, 31]
      ];

      // Draw Bones (Crimson Red / Hazard Amber)
      ctx.strokeStyle = isBadForm && squatFactor > 0.6 ? '#f97316' : '#ef4444';
      ctx.lineWidth = 4;
      ctx.lineCap = 'round';
      bones.forEach(([i, j]) => {
        const p1 = keypoints.find(k => k.id === i);
        const p2 = keypoints.find(k => k.id === j);
        if (p1 && p2) {
          ctx.beginPath();
          ctx.moveTo(p1.x, p1.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.stroke();
        }
      });

      // Angle calculation
      const a1 = Math.atan2(hipY - kneeY, hipX - kneeX);
      const a2 = Math.atan2(ankleY - kneeY, ankleX - kneeX);
      let deg = Math.abs(Math.round((a1 - a2) * 180 / Math.PI));
      if (deg > 180) deg = 360 - deg;

      // Arc (Coral Red)
      ctx.beginPath();
      ctx.arc(kneeX, kneeY, 26, Math.min(a1, a2), Math.max(a1, a2));
      ctx.strokeStyle = '#f87171';
      ctx.lineWidth = 2;
      ctx.stroke();

      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 11px "JetBrains Mono", monospace';
      ctx.fillText(`${deg}°`, kneeX + 18, kneeY - 8);

      // Draw Keypoints
      keypoints.forEach(k => {
        ctx.fillStyle = '#ffffff';
        ctx.beginPath();
        ctx.arc(k.x, k.y, 5, 0, Math.PI * 2);
        ctx.fill();

        ctx.strokeStyle = '#ef4444';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(k.x, k.y, 8, 0, Math.PI * 2);
        ctx.stroke();
      });

      // Banner Label
      let banner = "PERFECT FORM • 90° DEPTH";
      let bannerColor = "#ef4444";
      if (isBadForm && squatFactor > 0.5) {
        banner = "WARNING: EXCESSIVE FORWARD TORSO LEAN";
        bannerColor = "#f97316";
      } else if (squatFactor < 0.2) {
        banner = "TOP OF REP • FULL EXTENSION";
        bannerColor = "#64748b";
      }

      ctx.fillStyle = 'rgba(6, 8, 14, 0.92)';
      ctx.fillRect(w * 0.15, 20, w * 0.7, 32);
      ctx.strokeStyle = bannerColor;
      ctx.lineWidth = 1.5;
      ctx.strokeRect(w * 0.15, 20, w * 0.7, 32);

      ctx.fillStyle = bannerColor;
      ctx.font = 'bold 12px "JetBrains Mono", monospace';
      ctx.textAlign = 'center';
      ctx.fillText(banner, w * 0.5, 41);
      ctx.textAlign = 'left';

      if (isRunning) requestAnimationFrame(draw);
    }

    draw();

    return {
      togglePlay: () => {
        isRunning = !isRunning;
        if (isRunning) draw();
        return isRunning;
      },
      toggleBadForm: () => {
        isBadForm = !isBadForm;
        return isBadForm;
      },
      resetReps: () => {
        repCount = 0;
        const repEl = document.getElementById('fitness-rep-stat') || document.getElementById('fitness-page-reps');
        if (repEl) repEl.textContent = '0';
      }
    };
  };

})();
