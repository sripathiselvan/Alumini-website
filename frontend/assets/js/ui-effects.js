/**
 * UI Effects for AlumniNexus
 * Ported from Jaishanth's Portfolio
 */

document.addEventListener('DOMContentLoaded', () => {
    initParticleBg();
    initCustomCursor();
    initScrollProgress();
});

// =========================================
// PARTICLE BACKGROUND (Canvas API)
// =========================================
function initParticleBg() {
    const canvas = document.createElement('canvas');
    canvas.id = 'particle-canvas';
    Object.assign(canvas.style, {
        position: 'fixed',
        top: '0',
        left: '0',
        width: '100%',
        height: '100%',
        zIndex: '-2',
        pointerEvents: 'none'
    });
    document.body.prepend(canvas);

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    let w, h, particles = [], t = 0;
    const COLORS = ['rgba(34, 211, 238,', 'rgba(168, 85, 247,', 'rgba(124, 58, 237,', 'rgba(14, 165, 233,'];
    let mouseX = -1000, mouseY = -1000;

    window.addEventListener('mousemove', e => { mouseX = e.clientX; mouseY = e.clientY; });
    document.addEventListener('mouseleave', () => { mouseX = -1000; mouseY = -1000; });

    function init() {
        w = canvas.width = window.innerWidth;
        h = canvas.height = window.innerHeight;
        const count = Math.min(150, Math.floor((w * h) / 10000));
        particles = Array.from({ length: count }, () => ({
            x: Math.random() * w,
            y: Math.random() * h,
            vx: (Math.random() - 0.5) * 0.4,
            vy: (Math.random() - 0.5) * 0.4,
            size: Math.random() < 0.7 ? 1.5 : 3,
            color: COLORS[Math.floor(Math.random() * COLORS.length)],
            alpha: 0.1 + Math.random() * 0.5,
            z: Math.random() * 2
        }));
    }

    function draw() {
        ctx.fillStyle = 'rgba(5, 5, 8, 0.2)';
        ctx.fillRect(0, 0, w, h);
        t += 0.01;

        particles.forEach(p => {
            const speed = 1 + p.z * 0.5;
            p.x += p.vx * speed;
            p.y += p.vy * speed;

            if (p.x < 0) p.x = w; if (p.x > w) p.x = 0;
            if (p.y < 0) p.y = h; if (p.y > h) p.y = 0;

            const dx = mouseX - p.x, dy = mouseY - p.y;
            const distSq = dx * dx + dy * dy;
            let glow = 0;
            if (distSq < 150 * 150) {
                const dist = Math.sqrt(distSq);
                const force = (150 - dist) / 150;
                p.x -= (dx / dist) * force * 2;
                p.y -= (dy / dist) * force * 2;
                glow = force * 0.6;
            }

            const alpha = Math.min(1, p.alpha * (0.5 + 0.5 * Math.sin(t + p.x)) + glow);
            ctx.fillStyle = `${p.color}${alpha})`;
            
            if (p.z > 1.5) {
                ctx.fillRect(p.x - 2, p.y - 0.5, 4, 1);
                ctx.fillRect(p.x - 0.5, p.y - 2, 1, 4);
            } else {
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.size/2 + glow * 2, 0, Math.PI * 2);
                ctx.fill();
            }
        });

        requestAnimationFrame(draw);
    }

    window.addEventListener('resize', init);
    init();
    draw();
}

// =========================================
// CUSTOM GLOW CURSOR
// =========================================
function initCustomCursor() {
    const cursor = document.createElement('div');
    const glow = document.createElement('div');
    cursor.id = 'custom-cursor';
    glow.id = 'cursor-glow';
    document.body.appendChild(cursor);
    document.body.appendChild(glow);

    // Initial styles applied via CSS (style.css), just set display here
    cursor.style.display = 'block';
    glow.style.display = 'block';

    let curX = 0, curY = 0, tgtX = 0, tgtY = 0;

    window.addEventListener('mousemove', e => {
        tgtX = e.clientX;
        tgtY = e.clientY;
        glow.style.left = `${tgtX}px`;
        glow.style.top = `${tgtY}px`;
    });

    function animate() {
        curX += (tgtX - curX) * 0.15;
        curY += (tgtY - curY) * 0.15;
        cursor.style.transform = `translate(${curX - 10}px, ${curY - 10}px)`;
        requestAnimationFrame(animate);
    }
    animate();

    // Hover effects
    const interactive = 'a, button, .nav-item, .stat-card, .role-tab';
    document.querySelectorAll(interactive).forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.style.transform += ' scale(2)';
            cursor.style.background = 'var(--neon-cyan)';
            glow.style.background = 'radial-gradient(circle, rgba(34, 211, 238, 0.25) 0%, transparent 70%)';
        });
        el.addEventListener('mouseleave', () => {
            cursor.style.background = 'var(--neon-purple)';
            glow.style.background = 'radial-gradient(circle, rgba(168, 85, 247, 0.15) 0%, transparent 70%)';
        });
    });
}

// =========================================
// SCROLL PROGRESS BAR
// =========================================
function initScrollProgress() {
    const bar = document.getElementById('scroll-progress');
    const mainContent = document.getElementById('main-content');
    if (!bar || !mainContent) return;

    mainContent.addEventListener('scroll', () => {
        const totalHeight = mainContent.scrollHeight - mainContent.clientHeight;
        const progress = (mainContent.scrollTop / totalHeight) * 100;
        bar.style.width = `${progress}%`;
    });
}

// =========================================
// SCROLL PROGRESS BAR
// =========================================
function initScrollProgress() {
    const bar = document.getElementById('scroll-progress');
    const mainContent = document.getElementById('main-content');
    if (!bar || !mainContent) return;

    mainContent.addEventListener('scroll', () => {
        const totalHeight = mainContent.scrollHeight - mainContent.clientHeight;
        const progress = (mainContent.scrollTop / totalHeight) * 100;
        bar.style.width = `${progress}%`;
    });
}

// Export to window for dynamic calls
window.initScrollProgress = initScrollProgress;

