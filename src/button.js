const buttonTemplate = document.createElement("template");
buttonTemplate.innerHTML = /* html */ `
<link rel="stylesheet" href="./src/button.css">
<button class="btn"><slot>Button Text</slot></button>
`;

class Button extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({mode: "open"});
  }

  connectedCallback() {
    this.shadowRoot.appendChild(buttonTemplate.content.cloneNode(true));
    this.button = this.shadowRoot.querySelector("button");
    this.initialValue = this.innerHTML;
  }

  set inprogress(progress) {
    if (progress) {
      this.setAttribute("inprogress", "true");
    } else {
      this.removeAttribute("inprogress");
    }
  }

  get inprogress() {
    return this.getAttribute("inprogress");
  }

  static get observedAttributes() {
    return ["inprogress"];
  }

  attributeChangedCallback(attribute, oldValue, newValue) {
    if (newValue) {
      this.innerHTML = "Loading...";
      this.button.setAttribute("disabled", "true");
      this.button.classList.add("fading");
    } else {
      this.innerHTML = this.initialValue;
      this.button.removeAttribute("disabled");
      this.button.classList.remove("fading");
    }
  }
}

customElements.define("app-button", Button);
