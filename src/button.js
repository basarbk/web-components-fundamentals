const buttonTemplate = document.createElement("template");
buttonTemplate.innerHTML = /* html */ `
<style>
  .btn {
    background-color: #0070f3;
    color: white;
    border: none;
    border-radius: 7px;
    padding: 0 2rem;
    font-family: "Lucida Sans", "Lucida Sans Regular", "Lucida Grande",
      "Lucida Sans Unicode", Geneva, Verdana, sans-serif;
    box-shadow: 0 4px 14px 0 rgba(0, 118, 255, 0.39);
  }
  .btn:hover {
    background-color: #1d80f0;
  }
  .btn:disabled {
    background-color: #6aa8f0;
  }
  .fading {
    animation: fading 0.5s infinite;
  }

  @keyframes fading {
    0% {
      color: #6aa8f0;
    }
    50% {
      color: white;
    }
    100% {
      color: #6aa8f0;
    }
  }
</style>
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
