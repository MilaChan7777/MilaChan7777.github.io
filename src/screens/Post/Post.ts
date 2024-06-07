import profileHead, { Attributeposthead } from '../../components/profileHead/profileHead';
import styles from './Post.css';

import Home, { AttributeHome } from '../../components/menu/Home/Home';
import Post, { AttributePost } from '../../components/menu/Post/Post';
import Profile, { AttributeProfile } from '../../components/menu/Profile/Profile';

import { changeScreen } from '../../store/actions';
import { addObserver } from '../../store/store';
import { dispatch } from '../../store/store';
import '../../components/inputPost/inputPost';
import '../../components/postButton/postButton';
import { Screens } from '../../types/navigation';

import { addPost } from '../../utils/firebase';
import { uploadFile } from '../../utils/firebase';
import { getFile } from '../../utils/firebase';

export const formData = {
	image: '',
	description: '',
	tag: ''
}

const nombre = {
	nombre: ''
}

class Postinput extends HTMLElement {

	constructor() {
		super();
		this.attachShadow({ mode: 'open' });
		addObserver(this)
	}


	async connectedCallback() {
		console.log(formData.image)
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

		const added = this.shadowRoot?.querySelector('#addButton')
		added?.addEventListener("click", ()=>{
		modal.close()
		})

		const Homebutton = this.shadowRoot?.querySelector('#homebutton');
		Homebutton?.addEventListener('click', ()=>{
		dispatch(changeScreen(Screens.DASHBOARD))
		})
	}	

	async render() {

		const container = document.createElement('container')
		container.classList.add('container')

		const section = document.createElement('section')
		section.classList.add('post')

		const Menu = document.createElement('section');
		Menu.classList.add('menu-bar');
		const Home = document.createElement('home-button') as Home;
		const Post = document.createElement('post-button') as Post;
		const Profile = document.createElement('profile-button') as Profile;

		const Logo = document.createElement('img');
		Logo.src = '../icons/VanguardLogo.jpeg';
		Logo.alt = 'Logo';
		Logo.classList.add('logo');
		Menu.appendChild(Logo);

		Home.setAttribute(AttributeHome.image, '../icons/Home.png');
		Post.setAttribute(AttributePost.image, '../icons/Post.png');
		Profile.setAttribute(AttributeProfile.image, '../icons/Profile.png');

		Menu.appendChild(Home);
		Menu.appendChild(Post);
		Menu.appendChild(Profile);
		this.shadowRoot?.appendChild(Menu);

		const profileHead = document.createElement('app-profilehead');
		profileHead.setAttribute(Attributeposthead.profilepic, 'https://i.pinimg.com/236x/ab/32/31/ab32318e982048561a4b1f0508b265bb.jpg')
		profileHead.setAttribute(Attributeposthead.name, 'Santi.gumi')
		profileHead.setAttribute(Attributeposthead.followers, '41')
		section.appendChild(profileHead)

		const inputPost = document.createElement('div')
		inputPost.id = 'input-post'
		section.appendChild(inputPost)

		const fileLabel = document.createElement('label')
		fileLabel.setAttribute('for', 'file-input')
		inputPost.appendChild(fileLabel)
		const inputfile = document.createElement('input');
		inputfile.type = 'file'
		inputfile.id = 'file-input'
		inputfile.style.display = 'none'
		inputfile.addEventListener('change', async () => {
			const file = inputfile.files?.[0];
			if (file) {
				await uploadFile(file, 'img');
				const fileName = file.name;
				if (fileName !== undefined) {
					this.addNombre(fileName);
				}
			}
		});
		
		
		inputPost.appendChild(inputfile)
		
		const inputDesc = document.createElement('input');
		inputDesc.type = 'text'
		inputDesc.id = 'description'
		inputDesc.placeholder = 'Añade una descripción'
		inputDesc.addEventListener('change', this.addDescription)
		inputPost.appendChild(inputDesc)

		const divBottom = document.createElement('div')
		divBottom.id = 'button-post'
		section.appendChild(divBottom)

		const hashtags = document.createElement('button')
		hashtags.id = 'Hashtags'
		hashtags.type = 'submit'
		hashtags.innerText = 'Añadir Hashtags'
		divBottom.appendChild(hashtags)

		const hr = document.createElement('hr')
		divBottom.appendChild(hr)

		const post =document.createElement('button')
		post.id = 'Post'
		post.type = 'submit'
		post.addEventListener('click', this.submitForm)
		post.innerText = 'Publicar'

		divBottom.appendChild(post)

		const dialogElement = document.createElement("dialog");
		dialogElement.id = "popUpTag";
		
		const head = document.createElement('div')
		head.id = 'Head'
		dialogElement.appendChild(head)

		const p = document.createElement('p')
		p.innerText = 'Añade un Hashtag'
		head.appendChild(p)

		const cerrar = document.createElement('button')
		cerrar.id = 'closeButton'
		cerrar.innerText = 'X'
		head.appendChild(cerrar)

		const body = document.createElement('div')
		body.id = 'Body'
		dialogElement.appendChild(body)

		const input = document.createElement('input')
		input.id = 'Tag'
		input.type = 'text'
		input.placeholder = 'Ilustracion, Postproduction..'
		input.addEventListener('change', this.addTag)
		body.appendChild(input)

		const added = document.createElement('button')
		added.id = 'addButton'
		added.type = 'submit'
		added.innerText = 'Añadir'
		body.appendChild(added)

		section.appendChild(dialogElement)

		container.appendChild(section)
		this.shadowRoot?.appendChild(container)

		const cssUserpost = this.ownerDocument.createElement('style');
		cssUserpost.innerHTML = styles;
		this.shadowRoot?.appendChild(cssUserpost);
		}


		addImage(e: any){
			formData.image = e.target.value
			console.log(formData.image);
			} 
		
		addDescription(e: any){
			formData.description = e.target.value
			console.log(formData.description)
			console.log(formData.image);	
			}
	
		addTag(e: any){
			formData.tag = e.target.value
			console.log(formData.tag)
			}

		addNombre(fileName: string){
			nombre.nombre = fileName
			console.log(nombre.nombre);
			
		}
	
		submitForm(){
			addPost(formData)
			alert('Se publicó con éxito')
		}
	}

export default Postinput;
customElements.define('app-post', Postinput);