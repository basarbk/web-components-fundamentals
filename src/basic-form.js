import "./input.js";
import "./button.js";

class BasicForm extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    this.shadowRoot.innerHTML = /* html */ `
    <app-input label="Username"></app-input>
    <app-button>Register</app-button>
    `;
  }
}

customElements.define("app-form", BasicForm);
