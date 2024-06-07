import styles from "./inputPost.css"

export enum AttributeinputPost {
	'image' = 'image',
	'description' = 'description',
}

class Inputpost extends HTMLElement {
	image?: string;
	description?: string;

	constructor() {
		super();
		this.attachShadow({ mode: 'open' });
	}

	connectedCallback() {
		this.render();
	}

	render() {
		if (this.shadowRoot) {
			this.shadowRoot.innerHTML = `
	        <label for="file-input">
  			<input type="file" id="file-input" style="display: none;">
			</label>
			<input id="description" type="text" placeholder="Añade una descripción">
			<div id="mid">
			<p class="tag">Sin hashtags</p>
			</div>
            `;
		    }
			const cssInputpost = this.ownerDocument.createElement('style');
			cssInputpost.innerHTML = styles;
			this.shadowRoot?.appendChild(cssInputpost);
	}
}

export default Inputpost;
customElements.define('input-post', Inputpost);