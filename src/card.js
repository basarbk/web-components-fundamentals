const cardTemplate = document.createElement("template");
cardTemplate.innerHTML = /* html */ `
<link
  rel="stylesheet"
  href="https://cdn.jsdelivr.net/npm/bootstrap@4.5.3/dist/css/bootstrap.min.css"
  integrity="sha384-TX8t27EcRE3e/ihU7zmQxVncDAy5uIKz4rEkgIXeMed4M0jlfIDPvg6uqKI2xXr2"
  crossorigin="anonymous"
/>

<div class="card">
  <div class="card-header">
    Card header will be here
    <slot name="card-header">Card Header</slot>
  </div>
  <div class="card-body">
    <slot name="card-body">Card Body</slot>
  </div>
</div>
`;

class Card extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }
  connectedCallback() {
    this.shadowRoot.appendChild(cardTemplate.content.cloneNode(true));
  }
}

customElements.define("app-card", Card);
