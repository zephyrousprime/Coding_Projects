import mermaid from 'https://cdn.jsdelivr.net/npm/mermaid@11/dist/mermaid.esm.min.mjs';
import anime from 'https://cdn.jsdelivr.net/npm/animejs@3.2.1/lib/anime.es.js';
const DIAGRAM_URL = new URL('./mermaind.txt', import.meta.url).href;
const svgLinks = document.querySelectorAll('.mermaid svg a');

svgLinks.forEach(link => {
    link.style.cursor = 'pointer';
});
export class MermaidRenderer {
    constructor(diagramPath = DIAGRAM_URL) {
        this.diagramPath = diagramPath;
        mermaid.initialize({ startOnLoad: false });
    }

    async run() {
        const pre = document.getElementsByClassName('mermaid')[0];
        if (!pre) return; // bail if no mermaid element on this page

        // Render only when the element is visible to avoid blocking initial load
        let rendered = false;
        const refreshIfNeeded = () => {
            if (rendered || window._mermaidReloadAttempted) return;
            window._mermaidReloadAttempted = true;
            console.warn('Mermaid rendering did not complete, reloading once.');
            window.location.reload();
        };

        const render = async () => {
            try {
                let diagram = sessionStorage.getItem(`mermaid:${this.diagramPath}`);
                if (!diagram) {
                    diagram = await this.#fetchDiagram();
                    try { sessionStorage.setItem(`mermaid:${this.diagramPath}`, diagram); } catch {}
                }
                pre.textContent = diagram;

                const runMermaid = async () => {
                    try {
                        await mermaid.run({ nodes: [pre] });
                        rendered = true;
                        clearTimeout(refreshTimeout);
                    } catch (err) {
                        console.error('mermaid render failed', err);
                        refreshIfNeeded();
                    }
                };

                if ('requestIdleCallback' in window) {
                    requestIdleCallback(runMermaid, { timeout: 500 });
                } else {
                    setTimeout(runMermaid, 0);
                }
            } catch (err) {
                console.error('Failed to load mermaid diagram', err);
                refreshIfNeeded();
            }
        };

        const refreshTimeout = setTimeout(() => {
            if (!rendered) refreshIfNeeded();
        }, 4500);

        if ('IntersectionObserver' in window) {
            const obs = new IntersectionObserver((entries, o) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        render();
                        o.disconnect();
                    }
                });
            }, { threshold: 0.05 });
            obs.observe(pre);
        } else {
            await render();
        }
    }

    async #fetchDiagram() {
        const response = await fetch(this.diagramPath);
        return response.text();
    }
}

export const MERMAID_SIZES = {
    home: {
        panelMaxWidth: 420,
        panelPadding: 28,
        mermaidWidth: 420,
        mermaidHeight: 440,
    },
    corner: {
        panelMaxWidth: 200,
        panelPadding: 10,
        mermaidWidth: 200,
        mermaidHeight: 215,
    },
};

export class MermaidMover {
    #panel;
    #mermaid;
    #hasMoved = false;
    #isAnimating = false;

    constructor(panelSelector = '.bacground') {
        this.#panel = document.querySelector(panelSelector);
        this.#mermaid = this.#panel?.querySelector('.mermaid') ?? null;
    }

    setup() {
        if (!this.#panel) return;

        this.#setToCenter();

        window.addEventListener('resize', () => {
            if (!this.#hasMoved) this.#setToCenter();
        });

    document.addEventListener('click', (e) => {
        const link = e.target.closest('a');

        if (!link) return;

        this.#handleLinkClick(e, link);
       });
    }
    #setToCenter() {
        if (!this.#panel) return;
        const rect = this.#panel.getBoundingClientRect();
        const dx = window.innerWidth / 2 - rect.left - rect.width / 2;
        const dy = window.innerHeight / 2 - rect.top - rect.height / 2;
        anime.set(this.#panel, { translateX: dx, translateY: dy });
    }

    #handleLinkClick(e, a) {
        if (this.#hasMoved || this.#isAnimating) return;

        const href = a.getAttribute('href');
        if (!href || href.trim() === '' || href === '#') return;

        let nextUrl;
        try {
            nextUrl = new URL(href, window.location.href);
        } catch {
            return;
        }

        const currentUrl = new URL(window.location.href);
        const isExactSameUrl =
            nextUrl.origin === currentUrl.origin &&
            nextUrl.pathname === currentUrl.pathname &&
            nextUrl.search === currentUrl.search &&
            nextUrl.hash === currentUrl.hash;
        const isDifferentDocument =
            nextUrl.origin !== currentUrl.origin ||
            nextUrl.pathname !== currentUrl.pathname ||
            nextUrl.search !== currentUrl.search;

        e.preventDefault();
        this.#animateToOrigin({ nextUrl, isExactSameUrl, isDifferentDocument });
    }

    #animateToOrigin({ nextUrl, isExactSameUrl, isDifferentDocument }) {
        this.#isAnimating = true;

        const home = MERMAID_SIZES.home;
        const corner = MERMAID_SIZES.corner;

        anime.set(this.#panel, {
            maxWidth: home.panelMaxWidth,
            padding: home.panelPadding,
        });
        if (this.#mermaid) {
            anime.set(this.#mermaid, {
                width: home.mermaidWidth,
                height: home.mermaidHeight,
            });
        }

        const timeline = anime.timeline({
            easing: 'easeInOutQuad',
            duration: 6000,
            complete: () => {
                this.#hasMoved = true;
                this.#isAnimating = false;
                document.body.classList.remove('page-home');

                if (isDifferentDocument) {
                    window.location.href = nextUrl.toString();
                } else if (!isExactSameUrl) {
                    window.location.hash = nextUrl.hash;
                }
            },
        }).add(
            {
                targets: this.#panel,
                translateX: 0,
                translateY: 0,
                maxWidth: corner.panelMaxWidth,
                padding: corner.panelPadding,
            },
            0
        );

        if (this.#mermaid) {
            timeline.add(
                {
                    targets: this.#mermaid,
                    width: corner.mermaidWidth,
                    height: corner.mermaidHeight,
                },
                0
            );
        }
    }
}