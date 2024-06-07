import styles from './profile.css';
import { dispatch, addObserver } from '../../../store/store';
import { changeScreen } from '../../../store/actions';
import { Screens } from '../../../types/navigation';

export enum AttributeProfile {
	'image' = 'image',
}

class Profilebtn extends HTMLElement {
	image?: string;
	public index: number= 0

	constructor() {
		super();
		this.attachShadow({ mode: 'open' });
		this.onButtonClicked = this.onButtonClicked.bind(this);
		addObserver(this)
	}

	static get observedAttributes() {
		const attrs: Record<AttributeProfile, null> = {
			image: null,
		};
		return Object.keys(attrs);
	}

	connectedCallback() {
		this.mount();
	}

	attributeChangedCallback(propName: AttributeProfile, oldValue: string | undefined, newValue: string | undefined) {
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
            <div class="navBar">
            <button id="profilebutton" type="submit"><img src=${this.image}></button>
            </div">
            `;
		}
		const cssMenu = this.ownerDocument.createElement('style');
		cssMenu.innerHTML = styles;
		this.shadowRoot?.appendChild(cssMenu);
	}

	addListeners() {
		this.shadowRoot?.querySelector('#profilebutton')?.addEventListener('click', this.onButtonClicked);
	}

	onButtonClicked() {
		dispatch(changeScreen(Screens.PROFILE))
	}
}

export default Profilebtn;
customElements.define('profile-button', Profilebtn);
