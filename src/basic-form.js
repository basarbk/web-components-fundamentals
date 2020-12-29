import "./input.js";
import "./button.js";
import "./card.js";

class BasicForm extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.state = {
      username: null,
      email: null,
      password: null,
      passwordRepeat: null,
    };
  }

  connectedCallback() {
    this.shadowRoot.innerHTML = /* html */ `
    <app-card>
      <h3 slot="card-header">Register</h3>
      <app-input slot="card-body" label="Username"></app-input>
      <app-input slot="card-body" label="Email"></app-input>
      <app-input slot="card-body" label="Password" type="password"></app-input>
      <app-input slot="card-body" label="Password Repeat" type="password"></app-input>
      <app-button slot="card-body">Register</app-button>
    </app-card>
    `;
    const appInputs = this.shadowRoot.querySelectorAll("app-input");
    const button = this.shadowRoot.querySelector("app-button");
    const [
      usernameInput,
      emailInput,
      passwordInput,
      passwordRepeatInput,
    ] = appInputs;
    usernameInput.addEventListener("app-input", (event) => {
      this.state.username = event.detail;
      usernameInput.validation = "none";
    });
    emailInput.addEventListener("app-input", (event) => {
      this.state.email = event.detail;
    });
    passwordInput.addEventListener("app-input", (event) => {
      this.state.password = event.detail;
      if (this.state.password !== this.state.passwordRepeat) {
        passwordRepeatInput.help = "Password Mismatch";
        passwordRepeatInput.validation = "invalid";
      } else {
        passwordRepeatInput.help = "Passwords are matching";
        passwordRepeatInput.validation = "valid";
      }
    });
    passwordRepeatInput.addEventListener("app-input", (event) => {
      this.state.passwordRepeat = event.detail;
      if (this.state.password !== this.state.passwordRepeat) {
        passwordRepeatInput.help = "Password Mismatch";
        passwordRepeatInput.validation = "invalid";
      } else {
        passwordRepeatInput.help = "Passwords are matching";
        passwordRepeatInput.validation = "valid";
      }
    });
    this.addEventListener("click-app-button", (event) => {
      button.inprogress = true;
      setTimeout(() => {
        usernameInput.validation = "invalid";
        usernameInput.help = "Name must be unique";
        emailInput.validation = "invalid";
        emailInput.help = "Cannot be null";
        button.inprogress = false;
      }, 2000);
    });
  }
}

customElements.define("app-form", BasicForm);
