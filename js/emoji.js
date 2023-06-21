import { createPicker } from 'https://unpkg.com/picmo@latest/dist/index.js';

let container = document.querySelector('#emojisC');

function showEmoji() {
    const picker = createPicker({
        rootElement: container
    });
}

// Exporting the function

export { showEmoji };