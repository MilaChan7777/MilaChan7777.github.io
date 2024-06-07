import styles from './userPosts.css';

export enum AttributeUser {
	'profilepic' = 'profilepic',
	'name' = 'name',
	'image' = 'image',
	'description' = 'description',
	'tag' = 'tag',
}

class usersData extends HTMLElement {
	profilepic?: string;
	name?: string;
	image?: string;
	description?: string;
	tag?: string;

	constructor() {
		super();
		this.attachShadow({ mode: 'open' });
	}

	static get observedAttributes() {
		const attrs: Record<AttributeUser, null> = {
			profilepic: null,
			name: null,
			image: null,
			description: null,
			tag: null,
		};
		return Object.keys(attrs);
	}

	attributeChangedCallback(propName: AttributeUser, oldValue: string | undefined, newValue: string | undefined) {
		this[propName] = newValue;
	}

	connectedCallback() {
		this.render();
	}

	render() {
		if (this.shadowRoot) {
			this.shadowRoot.innerHTML = `
			<section>
      <div class="userPosts">
	  <div class="user">
	  <img src=${this.profilepic}></img>
      <p class="username">${this.name}</p>
	  </div>
		<div class="imgDiv">
      <img class="imgPost" src=${this.image}></img>
		</div>
			<div class="onlyPosts">
	  <div class="description">
	  <p class="des">${this.description}</p>
      <p class="tag">${this.tag}</p>
			</div>
	  </div>
			</section>
      `;
		}
		const cssUserpost = this.ownerDocument.createElement('style');
		cssUserpost.innerHTML = styles;
		this.shadowRoot?.appendChild(cssUserpost);
	}
}

export default usersData;
customElements.define('my-usersdata', usersData);
