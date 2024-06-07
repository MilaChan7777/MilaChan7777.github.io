import { changeScreen } from '../../store/actions';
import { addObserver } from '../../store/store';
import { dispatch } from '../../store/store';
import styles from './SignIn.css';
import { createUser  } from '../../utils/firebase';
import { Screens } from '../../types/navigation';

const formData = {
	email: '',
	password: '',
	date: ''
}

class SignIn extends HTMLElement {
	constructor() {
		super();
		this.attachShadow({ mode: 'open' });
		addObserver(this);
	}

	connectedCallback() {
		this.render();
		const logInButton = this.shadowRoot?.querySelector('#logInButton');
		logInButton?.addEventListener('click', () => {
			dispatch(changeScreen(Screens.LOGIN));
		});
	}
		addEmail(e: any){
		formData.email = e.target.value
		} 
	
		addPassword(e: any){
		formData.password = e.target.value	
		}

		addBirthday(e: any){
		formData.date = e.target.value
		console.log(formData.date)
		}
	
		submitForm(){
		createUser(formData)
		}

	async render() {
		if (this.shadowRoot) {
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

			const emailTitle = document.createElement('h4')
			emailTitle.innerText = 'Email'
			form.appendChild(emailTitle)
			const email = document.createElement ('input')
			email.placeholder = 'Email'
			email.addEventListener('input', (e) => this.addEmail(e))
			form.appendChild(email)

			const birthdayTitle = document.createElement('h4')
			birthdayTitle.innerText = 'Birthday'
			form.appendChild(birthdayTitle)
			const birthday = document.createElement ('input')
			birthday.type = 'date'
			birthday.addEventListener('change', (e) => this.addBirthday(e))
			form.appendChild(birthday)

			const passwordTitle = document.createElement('h4')
			passwordTitle.innerText = 'Password'
			form.appendChild(passwordTitle)
			const password = document.createElement ('input')
			password.type = 'password'
			password.placeholder = 'Password'
			password?.addEventListener('input', (e) => this.addPassword(e))
			form.appendChild(password)

			const signInButton = document.createElement('button');
			signInButton.id = 'signUpButton'
			signInButton.innerText = 'Sign in'
			signInButton.addEventListener('click', this.submitForm)
			form.appendChild(signInButton)
			
			const loginButton = document.createElement('button');
			loginButton.id = 'logInButton'
			loginButton.innerText = 'Already have an account?'
			form.appendChild(loginButton)
		}
	}

}

customElements.define('app-signin', SignIn);
export default SignIn;
