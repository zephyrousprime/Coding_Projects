import mermaid from 'https://cdn.jsdelivr.net/npm/mermaid@11/dist/mermaid.esm.min.mjs';
import anime from 'https://cdn.jsdelivr.net/npm/animejs@3.2.1/lib/anime.es.js';
import { Form } from './form.js';
import { MermaidRenderer, MERMAID_SIZES, MermaidMover } from './mermaind.js';

const DIAGRAM_URL = new URL('mermaind.txt', import.meta.url).href;
class App {
    #renderer;
    #mover;
    #isHomePage;

    constructor() {
        this.#isHomePage = document.body.classList.contains('page-home');
        this.#renderer = new MermaidRenderer();
        this.#mover = new MermaidMover();
    }

    async init() {
        if (this.#isHomePage){
        this.#mover.setup();
        }
        await this.#renderer.run();
        
    }
}
if (window.location.href.includes('Stats.html')) {
    // Initialize stats page
    new Stats().load();
}if (window.location.href.includes('Form.html')) {
    // Initialize form page
    new Form();
}
new App().init();

