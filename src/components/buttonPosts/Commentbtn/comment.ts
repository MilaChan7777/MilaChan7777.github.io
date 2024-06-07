import styles from './comment.css'
export enum AttributeComment {
	'image' = 'image',
}

class Comment extends HTMLElement {
	image?: string;


	constructor() {
		super();
		this.attachShadow({ mode: 'open' });
	}

	static get observedAttributes() {
		const attrs: Record<AttributeComment, null> = {
			image: null,
		};
		return Object.keys(attrs);
	}

	connectedCallback() {
		this.render();
	}

	attributeChangedCallback(propName: AttributeComment, oldValue: string | undefined, newValue: string | undefined) {
		this[propName] = newValue;
		this.render();
	}

	render() {
		if (this.shadowRoot) {
			this.shadowRoot.innerHTML = `
          <button id="commentbutton" type="submit"><img src=${this.image}></button>
          `;
		  const cssInteract = this.ownerDocument.createElement("style");
		  cssInteract.innerHTML = styles;
		this.shadowRoot?.appendChild(cssInteract);
		}
	}


}

export default Comment;
customElements.define('comment-button', Comment);
