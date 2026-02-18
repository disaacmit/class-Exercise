class ProductCard extends HTMLElement {

  static get observedAttributes() {
    return ["name", "price"];
  }

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    this.render();
  }

  attributeChangedCallback() {
    this.render();
  }

  render() {
    const name = this.getAttribute("name") || "Unnamed Product";
    const price = this.getAttribute("price") || "0";

    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: inline-block;
          font-family: Arial, sans-serif;
        }

        .card {
          border: 1px solid #ddd;
          border-radius: 8px;
          padding: 15px;
          width: 260px;
          box-shadow: 0 2px 8px rgba(0,0,0,0.1);
          text-align: center;
          background: white;
        }

        h3 {
          margin: 10px 0 5px;
        }

        .price {
          font-weight: bold;
          margin: 5px 0;
          color: #333;
        }

        button {
          margin-top: 10px;
          padding: 8px 12px;
          border: none;
          background: black;
          color: white;
          border-radius: 4px;
          cursor: pointer;
          transition: opacity 0.2s ease;
        }

        button:hover {
          opacity: 0.8;
        }

        ::slotted(img) {
          max-width: 100%;
          border-radius: 6px;
        }

        ::slotted(p) {
          font-size: 14px;
          color: #555;
        }
      </style>

      <div class="card">
        <slot name="image"></slot>
        <h3>${name}</h3>
        <div class="price">$${price}</div>
        <slot name="description"></slot>
        <button id="purchaseBtn">Purchase</button>
      </div>
    `;

    this.shadowRoot
      .getElementById("purchaseBtn")
      .addEventListener("click", () => {
        this.dispatchEvent(new CustomEvent("purchase", {
          detail: { name, price },
          bubbles: true,
          composed: true
        }));
      });
  }
}
customElements.define("Product-card", ProductCard);
