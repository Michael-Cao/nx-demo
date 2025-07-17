import React from 'react';
import { App } from './app/app';
import { createRoot } from "react-dom/client";
import { BrowserRouter } from 'react-router-dom';
import { StrictMode } from 'react';

class ReactMFE extends HTMLElement {
    connectedCallback() {
        const mountPoint = document.createElement('span');
        this.attachShadow({ mode: 'open' }).appendChild(mountPoint);

        const name = this.getAttribute('name');
        const root = createRoot(mountPoint);
        root.render(
            <BrowserRouter>
                <App />
            </BrowserRouter>
        );
    }
}
customElements.define('react-karavan', ReactMFE);