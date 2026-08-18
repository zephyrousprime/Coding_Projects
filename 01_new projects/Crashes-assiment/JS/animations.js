document.addEventListener('DOMContentLoaded', () => {
    const { animate, stagger, createTimeline } = anime;

    // ── 1. Homepage entrance ──────────────────────────────────
    const title = document.getElementById('changing-title');
    const homeCards = document.querySelectorAll('.home-grid .multiple-choice');
    const overCard = document.querySelector('.home-overarching .multiple-choice');

    if (title && homeCards.length) {
        title.style.opacity = '0';
        animate(title, {
            opacity: [0, 1],
            translateY: [20, 0],
            duration: 600,
            delay: 200,
            ease: 'easeOutExpo',
            onComplete: () => { title.style.opacity = ''; }
        });

        animate(homeCards, {
            opacity: [0, 1],
            translateY: [40, 0],
            scale: [0.95, 1],
            duration: 600,
            delay: stagger(120, { start: 400 }),
            ease: 'easeOutExpo'
        });

        if (overCard) {
            animate(overCard, {
                opacity: [0, 1],
                translateY: [30, 0],
                duration: 600,
                delay: 400 + (homeCards.length * 120) + 100,
                ease: 'easeOutExpo'
            });
        }
    }

    // ── 2. Title scramble text ────────────────────────────────
    document.addEventListener('titlechange', (e) => {
        const el = document.getElementById('changing-title');
        if (!el) return;
        const newText = e.detail;
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        const steps = 12;
        const stepDuration = 50;
        let step = 0;

        const interval = setInterval(() => {
            step++;
            let displayed = '';
            for (let i = 0; i < newText.length; i++) {
                if (newText[i] === ' ') {
                    displayed += ' ';
                } else if (i < Math.floor((step / steps) * newText.length)) {
                    displayed += newText[i];
                } else {
                    displayed += chars[Math.floor(Math.random() * chars.length)];
                }
            }
            el.textContent = displayed;
            if (step >= steps) {
                clearInterval(interval);
                el.textContent = newText;
            }
        }, stepDuration);
    });

    // ── 3. Theme toggle spin ──────────────────────────────────
    document.addEventListener('themeclick', () => {
        const btn = document.querySelector('.theme-toggle');
        if (!btn) return;
        animate(btn, {
            rotate: '1turn',
            duration: 600,
            ease: 'easeInOut'
        });
    });

    // ── 4. Chart entrance animation ───────────────────────────
    const chartEls = document.querySelectorAll('.ques > .apex-chart, .ques > .chart-box, .ques > [class*="-answer"], .ques > .ai-card, .over-qu-answer');
    if (chartEls.length) {
        const chartObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animate(entry.target, {
                        opacity: [0, 1],
                        translateY: [30, 0],
                        scale: [0.98, 1],
                        duration: 700,
                        ease: 'easeOutExpo'
                    });
                    chartObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.12 });

        chartEls.forEach(el => {
            el.style.opacity = '0';
            chartObserver.observe(el);
        });
    }

    // ── 5. AI button streaming pulse ──────────────────────────
    let aiPulseAnim = null;

    document.addEventListener('ai-stream-start', () => {
        const btn = document.querySelector('.ai-btn:disabled');
        if (!btn) return;
        aiPulseAnim = animate(btn, {
            scale: [1, 1.06, 1],
            boxShadow: [
                '0 0 0px rgba(206,253,84,0)',
                '0 0 24px rgba(206,253,84,0.4)',
                '0 0 0px rgba(206,253,84,0)'
            ],
            duration: 800,
            ease: 'easeInOut',
            loop: true
        });
    });

    document.addEventListener('ai-stream-end', () => {
        if (aiPulseAnim) {
            aiPulseAnim.cancel();
            aiPulseAnim = null;
        }
        const btn = document.querySelector('.ai-btn');
        if (btn) {
            animate(btn, {
                scale: 1,
                boxShadow: '0 0 0px rgba(206,253,84,0)',
                duration: 300,
                ease: 'easeOut'
            });
        }
    });
});
