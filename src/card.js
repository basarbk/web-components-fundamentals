const cardTemplate = document.createElement("template");
cardTemplate.innerHTML = /* html */ `
<style>
   div {
     border: 1px solid black;
   }
</style>
<div>
<slot name="card-header">Card Header</slot>
</div>
<div>
<slot name="card-body">Card Body</slot>
</div>
<div>
  others will be added here
  <slot></slot>
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
