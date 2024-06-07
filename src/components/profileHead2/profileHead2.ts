import styles from './profileHead2.css';

export enum Attributeposthead2 {
	'profilepic' = 'profilepic',
	'name' = 'name',
	'followers' = 'followers'
}

class Profilehead2 extends HTMLElement {
	profilepic?: string;
	name?: string;
	followers?: string

	constructor() {
		super();
		this.attachShadow({ mode: 'open' });
	}

	static get observedAttributes() {
		const attrs: Record<Attributeposthead2, null> = {
			profilepic: null,
			name: null,
			followers: null
		};
		return Object.keys(attrs);
	}

	attributeChangedCallback(propName: Attributeposthead2, oldValue: string | undefined, newValue: string | undefined) {
		this[propName] = newValue;
	}

	connectedCallback() {
		this.render();
	}

	render() {
		if (this.shadowRoot) {
			this.shadowRoot.innerHTML = `
	        <img class="userimg" src=${this.profilepic}></img>
			<div class="info">
			<p class="username">${this.name}</p>
			<p class="followers">${this.followers} seguidores</p>
			</div>
            `;
		    }
		const cssUserpost = this.ownerDocument.createElement('style');
		cssUserpost.innerHTML = styles;
		this.shadowRoot?.appendChild(cssUserpost);
	}
}

export default Profilehead2;
customElements.define('app-profilehead2', Profilehead2);