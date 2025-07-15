import React from 'react';
import { App } from './app/app';
import { createRoot } from "react-dom/client";
import { BrowserRouter } from 'react-router-dom';

class ReactMFE extends HTMLElement {
    connectedCallback() {
        const mountPoint = document.createElement('span');
        this.attachShadow({ mode: 'open' }).appendChild(mountPoint);

        const name = this.getAttribute('name');
        const root = createRoot(mountPoint);
        root.render(
            <React.StrictMode>
                <BrowserRouter>
                    <App />
                </BrowserRouter>
            </React.StrictMode>
        );
    }
}
customElements.define('react-mfe', ReactMFE);