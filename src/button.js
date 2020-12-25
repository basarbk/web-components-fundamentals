class Button extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    const text = this.getAttribute("text");
    this.innerHTML = `
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
    <button class="btn">${text}</button>`;
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
    const button = this.querySelector("button");
    if (newValue) {
      button.textContent = "Loading...";
      button.setAttribute("disabled", "true");
      button.classList.add("fading");
    } else {
      button.textContent = this.getAttribute("text");
      button.removeAttribute("disabled");
      button.classList.remove("fading");
    }
  }
}

customElements.define("app-button", Button);
