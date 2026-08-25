if (typeof puter !== 'undefined') puter.quiet = true;

export function initAI(getPrompts) {
    document.querySelectorAll('.ai-card').forEach(card => {
        const questionId = card.dataset.question;
        const btn = card.querySelector('.ai-btn');
        const response = card.querySelector('.ai-response');
        const content = card.querySelector('.ai-response-content');
        if (!btn || !response || !content) return;

        btn.addEventListener('click', async () => {
            const prompt = getPrompts()[questionId];
            if (!prompt) return;

            btn.disabled = true;
            response.classList.remove('is-hidden');
            content.innerHTML = '<div class="ai-shimmer"></div>';
            document.dispatchEvent(new CustomEvent('ai-stream-start'));

            try {
                const stream = await puter.ai.chat(prompt, {
                    model: 'gpt-4o-mini',
                    stream: true
                });

                content.innerHTML = '';
                let fullText = '';

                for await (const part of stream) {
                    if (part?.text) {
                        fullText += part.text;
                        content.textContent = fullText;
                    }
                }

                const span = btn.querySelector('span');
                span.textContent = 'Regenerate';
            } catch (err) {
                content.textContent = 'Error: ' + err.message;
            } finally {
                btn.disabled = false;
                document.dispatchEvent(new CustomEvent('ai-stream-end'));
            }
        });
    });
}
