const template = document.createElement("template");
template.innerHTML = /* html */ `
<style>
  label {
    display: block;
  }
  input {
    min-width: 200px;
    border-radius: 3px;
    border: 1px solid lightgray;
    padding: 10px;
  }
  span {
    font-size: 0.8rem;
    display: none;
  }
  :host([validation="invalid"]) span {
    display: block;
    color: red;
  }

  :host([validation="invalid"]) input {
    border-color: red;
  }
  :host([validation="valid"]) span {
    display: block;
    color: green;
  }

  :host([validation="valid"]) input {
    border-color: green;
  }
</style>
<label></label>
<input>
<span>Message</span>
`;

class Input extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  get help() {
    return this.getAttribute("help");
  }

  set help(help) {
    this.setAttribute("help", help);
  }

  get validation() {
    return this.getAttribute("validation");
  }

  set validation(validation) {
    this.setAttribute("validation", validation);
  }

  connectedCallback() {
    this.shadowRoot.appendChild(template.content.cloneNode(true));
    const label = this.shadowRoot.querySelector("label");
    label.textContent = this.getAttribute("label");

    this.span = this.shadowRoot.querySelector("span");
    this.span.textContent = this.getAttribute("help");

    const input = this.shadowRoot.querySelector("input");
    input.addEventListener("input", (event) => {
      event.stopPropagation();
      input.dispatchEvent(
        new CustomEvent("app-input", {
          bubbles: true,
          composed: true,
          detail: event.target.value,
        })
      );
    });
  }
}

customElements.define("app-input", Input);
