import { LitElement, html, css } from "lit-element";

class MyList extends LitElement {
  static get properties() {
    return {
      loading: { type: Boolean },
      title: { type: String },
      list: { type: Array },
    };
  }

  static get styles() {
    return css`
      :host {
        text-transform: uppercase;
        font-family: sans-serif;
        letter-spacing: 2px;
      }

      .list-item,
      .message,
      .loading {
        font-weight: bold;
        color: #00b0bf;
      }

      .list-item {
        padding-bottom: 1.5rem;
      }
    `;
  }

  constructor() {
    super();
    this.title = "";
    this.list = [];
  }

  render() {
    if (this.loading) {
      return html`
        <h1 class="title">${this.title}</h1>
        <div class="loading">Loading...</div>
      `;
    } else {
      return html`
        <h1 class="title">${this.title}</h1>
        ${this.list.length
          ? this._getListItems()
          : html`<div class="message">No hay datos</div>`}
      `;
    }
  }

  _getListItems() {
    return html`
      <ul class="list">
        ${this.list.map((item) => {
          const title = item.original_title;
          const releaseDate = item.release_date.split("-")[0];

          return html` <li class="list-item">${title} (${releaseDate})</li> `;
        })}
      </ul>
    `;
  }
}

customElements.define("my-list", MyList);
