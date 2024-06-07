import styles from "./Landing.css"
import { dispatch, addObserver } from '../../store/store';
import { changeScreen } from '../../store/actions';


class Landing extends HTMLElement {

	constructor() {
		super();
		this.attachShadow({ mode: 'open' });
		addObserver(this);
	}

	connectedCallback() {
		this.render();
	}

	render() {
        if(this.shadowRoot){
        const container = document.createElement('section')
        container.classList.add('container')
        }
		const cssContainer = this.ownerDocument.createElement('style');
		cssContainer.innerHTML = styles;
		this.shadowRoot?.appendChild(cssContainer);
		}
}
export default Landing;
customElements.define('app-landing', Landing);
