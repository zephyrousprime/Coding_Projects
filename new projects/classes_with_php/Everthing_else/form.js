import mermaid from 'https://cdn.jsdelivr.net/npm/mermaid@11/dist/mermaid.esm.min.mjs';
import anime from 'https://cdn.jsdelivr.net/npm/animejs@3.2.1/lib/anime.es.js';
export class Form {
    constructor() {
        this.size = document.getElementById('size');
        this.size_output = document.getElementById('size_output');
        this.form = document.getElementById('class-form');
        this.submitBtn = document.getElementById('submit-btn');
        this.hint = document.getElementById('form-validation-hint');

        if (!this.form || !this.submitBtn || !this.size || !this.size_output || !this.hint) {
            return; // bail gracefully if required form elements are missing
        }

        // ✅ Event listeners belong INSIDE the constructor, after this.x assignments
        this.size.addEventListener('input', () => {
            this.size_output.textContent = `Size: ${this.size.value}`;
            this.updateSubmitState();
        });

        this.form.addEventListener('input', this.updateSubmitState.bind(this));
        this.form.addEventListener('change', this.updateSubmitState.bind(this));
        this.form.addEventListener('submit', (event) => {
            if (!this.#isFormComplete()) {
                event.preventDefault();
                this.updateSubmitState();
            }
        });

        this.updateSubmitState();
    }

        #isFormComplete() {
        const className = document.getElementById('class_input').value.trim();
        const yearSelected = this.form.querySelector('input[name="year_level"]:checked');
        const sizeValue = this.size.value;
        const lowest = document.getElementById('lowest_grade').value;
        const average = document.getElementById('av_grade').value;
        const highest = document.getElementById('highest_grade').value;
        return Boolean(className && yearSelected && sizeValue && lowest && average && highest);
    }

        updateSubmitState() {
        const complete = this.#isFormComplete();
        this.submitBtn.disabled = !complete;
        this.hint.hidden = complete;
        this.hint.textContent = complete ? '' : 'Fill in all fields before submitting.';
    }
}