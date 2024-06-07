import { changeScreen } from '../../store/actions';
import { addObserver } from '../../store/store';
import { dispatch } from '../../store/store';
import Inputpost from '../../components/inputPost/inputPost';
import { logIn } from '../../utils/firebase';
import styles from './Login.css';
import { Screens } from '../../types/navigation';

const formData = {
	email: '',
	password: ''
}
class Login extends HTMLElement {
	constructor() {
		super();
		this.attachShadow({ mode: 'open' });
	}

	connectedCallback() {
		this.render();
		addObserver(this);
		const signin = this.shadowRoot?.querySelector('#signUpButton')
		signin?.addEventListener('click', () => {
		dispatch(changeScreen(Screens.SIGNIN))
		})
	}

	logEmail(e: any) {
		formData.email = e.target.value
	}

	logPassword(e: any) {
		formData.password = e.target.value
	}

	submitForm(){
		logIn(formData)
		console.log(formData);
		
	}
	render() {
		if (this.shadowRoot) {
			this.shadowRoot.innerHTML = '';

			const css = this.ownerDocument.createElement('style');
			css.innerHTML = styles;
			this.shadowRoot?.appendChild(css);

			const main = document.createElement('main')
			this.shadowRoot.appendChild(main)

			const section = document.createElement('section')
			section.className = "form-container"
			main.appendChild(section)

			const vanguardTitle = document.createElement('h1')
			vanguardTitle.className = 'vanguardTitle'
			vanguardTitle.innerText = 'Vanguard'
			section.appendChild(vanguardTitle)

			const slogan = document.createElement('p')
			slogan.className = 'slogan'
			slogan.innerText = 'Create and connect'
			section.appendChild(slogan)

			const form = document.createElement('form')
			form.addEventListener('submit', (event) =>{
			event.preventDefault();
			})
			section.appendChild(form)

			const username = document.createElement ('input')
			username.placeholder = 'Email'
			username.addEventListener('input', (e) => this.logEmail(e))
			form.appendChild(username)

			const password = document.createElement ('input')
			password.placeholder = 'Password'
			password.addEventListener('input', (e) => this.logPassword(e))
			form.appendChild(password)

			const loginButton = document.createElement('button');
			loginButton.id = 'logInButton'
			loginButton.innerText = 'Login'
			loginButton.addEventListener('click', this.submitForm)
			form.appendChild(loginButton)

			const signInButton = document.createElement('button');
			signInButton.id = 'signUpButton'
			signInButton.innerText = 'Create new account'
			form.appendChild(signInButton)
		}
	}
}

customElements.define('app-login', Login);
export default Login;
