class Counter extends HTMLElement {
  constructor() {
    super();
    console.log("constructor");
    this.count = 0;
  }

  connectedCallback() {
    console.log("connected");
    this.innerHTML = this.count;
    const until = this.getAttribute("until");
    this.interval = setInterval(() => {
      console.log("interval is running", Date.now());
      if (this.count < until) {
        this.count += 1;
        this.innerHTML = this.count;
      } else {
        clearInterval(this.interval);
      }
    }, 1000);
  }

  disconnectedCallback() {
    console.log("disconnected");
    clearInterval(this.interval);
  }

  attributeChangedCallback(attribute, oldVal, newVal) {
    console.log("attribute changed");
  }

  adoptedCallback() {
    console.log("adopted");
  }
}
customElements.define("app-counter", Counter);
