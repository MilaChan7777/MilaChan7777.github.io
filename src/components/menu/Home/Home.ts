import styles from './Home.css';
import { dispatch } from '../../../store/store';
import { changeScreen } from '../../../store/actions';
import { addObserver } from '../../../store/store';
import { Screens } from '../../../types/navigation';

export enum AttributeHome {
	'image' = 'image',
}

class Home extends HTMLElement {
	image?: string;
	public index: number= 0

	constructor() {
		super();
		this.attachShadow({ mode: 'open' });
		this.onButtonClicked = this.onButtonClicked.bind(this);
		addObserver(this)
	}

	static get observedAttributes() {
		const attrs: Record<AttributeHome, null> = {
			image: null,
		};
		return Object.keys(attrs);
	}

	connectedCallback() {
		this.mount();
	}

	attributeChangedCallback(propName: AttributeHome, oldValue: string | undefined, newValue: string | undefined) {
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
            <button id="homebutton" type="submit"><img src=${this.image}></button>
            </div>
            `;
		}
		const cssMenu = this.ownerDocument.createElement('style');
		cssMenu.innerHTML = styles;
		this.shadowRoot?.appendChild(cssMenu);
	}

	addListeners() {
		this.shadowRoot?.querySelector('#homebutton')?.addEventListener('click', this.onButtonClicked);
	}

	onButtonClicked() {
		dispatch(changeScreen(Screens.DASHBOARD))
	}
}
export default Home;
customElements.define('home-button', Home);
