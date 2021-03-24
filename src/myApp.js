import { LitElement, html, css } from "lit-element";
import "./myList";

class MyApp extends LitElement {
  static get properties() {
    return {
      list: { type: Array },
      loading: { type: Boolean },
    };
  }

  static get styles() {
    return css`
      .btn {
        text-transform: uppercase;
        border: 2px solid black;
        background: white;
        font-weight: bold;
        padding: 0.5rem;
      }

      .btn:active {
        background: #ddd;
      }
    `;
  }

  constructor() {
    super();
    this.loading = false;
    this.list = [];
  }

  render() {
    return html`
      <button class="btn" @click=${this._onGetList}>Get list</button>
      <button class="btn" @click=${this._onEmptyList}>Empty list</button>
      <my-list
        title="My Favorite Movies"
        .list=${this.list}
        .loading=${this.loading}
      ></my-list>
    `;
  }

  _onGetList() {
    this.loading = true;
    this._getList();
  }

  _getList() {
    const API_KEY = "4ff32b3a95fabacb861ecfa8aa1dfcba";
    const url = `https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}&language=en-US&page=1`;

    fetch(url)
      .then((result) => result.json())
      .then((data) => {
        this.loading = false;
        this.list = data.results;
      })
      .catch((error) => {
        this.loading = false;
        this.list = [];
      });
  }

  _onEmptyList() {
    this.list = [];
  }
}

customElements.define("my-app", MyApp);
