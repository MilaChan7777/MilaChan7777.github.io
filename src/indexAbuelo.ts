
import { addObserver, appState } from './store/store';
import './screens/Dashboard/Home';
import './screens/Post/Post';
import './screens/SignIn/SignIn';
import './screens/Login/Login';
import './screens/Profile/Profile';

import stylesApp from './index.css';
import Post from './screens/Post/Post';
import Dashboard from './screens/Dashboard/Home';
import SignIn from './screens/SignIn/SignIn';
import Login from './screens/Login/Login';
import Profile from './screens/Profile/Profile';


class AppContainer extends HTMLElement {
	constructor() {
		super();
		this.attachShadow({ mode: 'open' });
		addObserver(this);
	}

	connectedCallback() {
		this.render();
	}

	render() {
		console.log(appState.screen);

		if (this.shadowRoot) {
			this.shadowRoot.innerHTML = ` `;
		}
		switch (appState.screen) {
			case 'POST':
				const login = this.ownerDocument.createElement('app-post') as Post;
				this.shadowRoot?.appendChild(login);
				break;

			case 'DASHBOARD':
				const dashboard = this.ownerDocument.createElement('app-dashboard') as Dashboard;
				this.shadowRoot?.appendChild(dashboard);
				break;

			case 'SIGNIN':
				const signin = this.ownerDocument.createElement('app-signin') as SignIn;
				this.shadowRoot?.appendChild(signin);
				break;

			case 'LOGIN':
				const login2 = this.ownerDocument.createElement('app-login') as Login;
				this.shadowRoot?.appendChild(login2);
				break;

			case 'PROFILE':
				const profile = this.ownerDocument.createElement('app-profile') as Profile;
				this.shadowRoot?.appendChild(profile);
				break;

			default:
				break;
		}
		const cssContainer = this.ownerDocument.createElement('style');
		cssContainer.innerHTML = stylesApp;
		this.shadowRoot?.appendChild(cssContainer);
	}
}

customElements.define('app-container', AppContainer);
