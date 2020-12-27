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
</style>
<label></label>
<input>
`;

class Input extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    this.shadowRoot.appendChild(template.content.cloneNode(true));
    const label = this.shadowRoot.querySelector("label");
    label.textContent = this.getAttribute("label");
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
