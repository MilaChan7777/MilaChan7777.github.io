import styles from './save.css';
export enum AttributeSave {
	'image' = 'image',
}

class Save extends HTMLElement {
	image?: string;
	public index: number= 0

	constructor() {
		super();
		this.attachShadow({ mode: 'open' });
		this.onButtonClicked = this.onButtonClicked.bind(this);
	}

	static get observedAttributes() {
		const attrs: Record<AttributeSave, null> = {
			image: null,
		};
		return Object.keys(attrs);
	}

	connectedCallback() {
		this.mount();
	}

	attributeChangedCallback(propName: AttributeSave, oldValue: string | undefined, newValue: string | undefined) {
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
          <button class="savebutton" id="savebutton" type="submit"><img src=${this.image}></button>
          `;
			const cssInteract = this.ownerDocument.createElement('style');
			cssInteract.innerHTML = styles;
			this.shadowRoot?.appendChild(cssInteract);
		}
	}

	addListeners() {
		this.shadowRoot?.querySelector('#savebutton')?.addEventListener('click', this.onButtonClicked);
	}

	onButtonClicked() {
		// const currentValue = this.getAttribute('image');
		// this.setAttribute('image', '../icons/GuardarClicked.png');
		// this.render();

		const currentImage = this.shadowRoot?.querySelector('img')?.getAttribute('src');
			if (this.index === 0) {
			this.setAttribute('image', '../icons/GuardarClicked.png');
			this.index ++
			} else {
			this.setAttribute('image', '../icons/Guardar.png');
			this.index --	
			}

	}
}

export default Save;
customElements.define('save-button', Save);
