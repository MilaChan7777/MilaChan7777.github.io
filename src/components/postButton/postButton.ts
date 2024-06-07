import styles from './postButton.css'

export enum AttributeinputPost {
	'image' = 'image',
	'description' = 'description',
}

class Postbutton extends HTMLElement {
	image?: string;
	description?: string;

	constructor() {
		super();
		this.attachShadow({ mode: 'open' });
	}

	static get observedAttributes() {
		const attrs: Record<AttributeinputPost, null> = {
			image: null,
			description: null,
		};
		return Object.keys(attrs);
	}

	attributeChangedCallback(propName: AttributeinputPost, oldValue: string | undefined, newValue: string | undefined) {
		this[propName] = newValue;
	}

	connectedCallback() {
		this.render();
		const addTags = this.shadowRoot?.querySelector('#Hashtags')
		const modal = this.shadowRoot?.querySelector('#popUpTag') as HTMLDialogElement;
		const close = this.shadowRoot?.querySelector('#closeButton')
		addTags?.addEventListener("click", () =>{
		modal.showModal()
		})
		close?.addEventListener("click", ()=>{
		modal.close()
		})
	}

	render() {
		if (this.shadowRoot) {
			this.shadowRoot.innerHTML = `
			<button id="Hashtags" type="submit">Añadir hashtags</button>
      		<hr>
      		<button id="Post" type="submit">Publicar</button>
            `;
		    }
			const popTag = document.createElement("div");
			popTag.id = ""
			const hola = document.createElement("p")
			hola.innerText = "Hola"
			popTag.appendChild(hola)
			popTag.style.display = 'none'
			this.shadowRoot?.appendChild(popTag)

			const dialogElement = document.createElement("dialog");
			dialogElement.id = "popUpTag";
			dialogElement.innerHTML = `
			<div id="Head">
			<p>Añade un hashtag</p>
			<button id="closeButton">X</button>
			</div>
			<div id="Body">
			<input id="Tag"type="text" placeholder="Ilustration, Postproduction...">
			<button id="addButton">Añadir</button>
			</div>
			`;
			this.shadowRoot?.appendChild(dialogElement)


			const cssButtonpost = this.ownerDocument.createElement('style');
			cssButtonpost.innerHTML = styles;
			this.shadowRoot?.appendChild(cssButtonpost);
	}
}

export default Postbutton;
customElements.define('button-post', Postbutton);