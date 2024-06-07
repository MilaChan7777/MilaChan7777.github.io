import styles from './star.css'
export enum AttributeStar {
	'image' = 'image',
}

class Star extends HTMLElement {
	image?: string;
	public index: number= 0

	constructor() {
		super();
		this.attachShadow({ mode: 'open' });
		this.onButtonClicked = this.onButtonClicked.bind(this);
	}

	static get observedAttributes() {
		const attrs: Record<AttributeStar, null> = {
			image: null,
		};
		return Object.keys(attrs);
	}

	connectedCallback() {
		this.mount();
	}

	attributeChangedCallback(propName: AttributeStar, oldValue: string | undefined, newValue: string | undefined) {
		this[propName] = newValue;
		this.mount();
	}

	mount() {
		this.render();
		this.addListeners();
	}

	render() {
		if (this.shadowRoot) {
			this.shadowRoot.innerHTML = `
          <button id="startbutton" type="submit"><img src=${this.image}></button>
          `;
		  const cssInteract = this.ownerDocument.createElement("style");
		  cssInteract.innerHTML = styles;
		this.shadowRoot?.appendChild(cssInteract);
		}
	}

	addListeners() {
		this.shadowRoot?.querySelector('#startbutton')?.addEventListener('click', this.onButtonClicked);
	}

	onButtonClicked() {
		// const currentValue = this.getAttribute('image');
		// this.setAttribute('image', '../icons/StarClicked.png');
		// this.render();
			const currentImage = this.shadowRoot?.querySelector('img')?.getAttribute('src');
			if (this.index === 0) {
			this.setAttribute('image', '../icons/StarClicked.png');
			this.index ++
			} else {
			this.setAttribute('image', '../icons/Star.png');
			this.index --	
			}
	
	}
}

export default Star;
customElements.define('start-button', Star);
