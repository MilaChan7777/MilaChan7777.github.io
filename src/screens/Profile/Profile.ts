import Home, { AttributeHome } from '../../components/menu/Home/Home';
import Post, { AttributePost } from '../../components/menu/Post/Post';
import Profilebtn, { AttributeProfile } from '../../components/menu/Profile/Profile';

import { Attributeposthead2 } from '../../components/profileHead2/profileHead2';

import Profileinter, { AttributeprofileInter } from '../../components/profileInter/profileInter';
import styles from './Profile.css';

class Profile extends HTMLElement {

	constructor() {
		super();
		this.attachShadow({ mode: 'open' });
	}


	connectedCallback() {
		this.render();
	}

	render() {

		if(this.shadowRoot){
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
		this.shadowRoot.appendChild(Menu);

		const container = document.createElement('container')
		container.classList.add('container')

		const section = document.createElement('section')
		section.classList.add('post')

		const profileHead = document.createElement('app-profilehead2');
		profileHead.setAttribute(Attributeposthead2.profilepic, 'https://i.pinimg.com/236x/ab/32/31/ab32318e982048561a4b1f0508b265bb.jpg')
		
		profileHead.setAttribute(Attributeposthead2.name, 'Santi.gumi')
        profileHead.setAttribute(Attributeposthead2.followers, '41')
		section.appendChild(profileHead)

        const profileInput = document.createElement('profile-inter');
        profileInput.setAttribute(AttributeprofileInter.description, 'Ilustrador colombiano de 19 años, apasionado por el arte fantástico y estudiante de diseño de medios interactivos.')
		section.appendChild(profileInput)

		container.appendChild(section)
		this.shadowRoot.appendChild(container)
		}
		const cssUserpost = this.ownerDocument.createElement('style');
		cssUserpost.innerHTML = styles;
		this.shadowRoot?.appendChild(cssUserpost);
	}
}

export default Profile;
customElements.define('app-profile', Profile);