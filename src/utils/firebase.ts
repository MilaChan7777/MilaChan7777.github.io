
import { initializeApp } from "firebase/app";
import { getFirestore, onSnapshot, setDoc } from "firebase/firestore";
import { collection, doc, addDoc } from "firebase/firestore";
import { getDocs } from "firebase/firestore";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword } from "firebase/auth"
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { uploadBytesResumable } from "firebase/storage"
import { formData } from "../screens/Post/Post";
import { Product } from "../types/post";

const firebaseConfig = {
    apiKey: "AIzaSyCJ3zQIujLQ1qj-nF0ADd8xP8oV4O2s4bA",
    authDomain: "posts-d5116.firebaseapp.com",
    projectId: "posts-d5116",
    storageBucket: "posts-d5116.appspot.com",
    messagingSenderId: "381209847571",
    appId: "1:381209847571:web:a2e7c0e5ebf331afa65ce6",
    measurementId: "G-TYKJ3QSXKJ"
}

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export const auth = getAuth(app)
const storage = getStorage()


export const addPost = async (e: any) => {
    try {
      const where = collection(db, "post");
      await addDoc(where, e);
      console.log("se añadió con éxito");
    } catch (error) {
      console.error(error);
    }
  };

export const getPosts = async () => {
    const querySnapshot = await getDocs(collection(db, 'post'));
    const arrayPosts: Array<any>= [];

    querySnapshot.forEach((doc) => {
    const data = doc.data() as any;
    arrayPosts.push({id: doc.id, ...data})
    });
    return arrayPosts
}

export const createUser = async (formData: any) => {
    await createUserWithEmailAndPassword(auth, formData.email, formData.password)
    .then(async(userCredential) =>{
        const user = userCredential.user
        console.log(user);
        try {
            const where = doc(db, 'users', user.uid)
            const data = {
            birthday: formData.date
            };
            await setDoc(where, data);
            alert('Se creo el usuario')
        } catch (error) {
            console.error(error)
        }
        
    })
    .catch((error: any)=>{
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error(errorCode, errorMessage)
    })
}

export const logIn = (formData: any) => {
 signInWithEmailAndPassword(auth, formData.email, formData.password)
 .then(async(userCredential) => {
    const user = userCredential.user;
    console.log(user.uid)
 })
 .catch ((error: any)=>{
    const errorCode = error.code;
    const errorMessage = error.message
    console.log(formData)
    console.error (errorCode, errorMessage)
 })
}

export const uploadFile = (file: any, folder: any) => {
    const storageRef = ref(storage, `${folder}/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);
    uploadTask.on('state_changed',
        (snapshot: any) => {
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log('Progreso de carga:', progress);
        },
        (error: any) => {
            console.error('Error al cargar el archivo:', error);
        },
        () => {
            getDownloadURL(storageRef)
                .then((url) => {
                    console.log('URL del archivo:', url);
                    formData.image = url
                })
                .catch((error) => {
                    console.error('Error al obtener la URL del archivo:', error);
                });
        }
    );
};

export const getFile = async (fileName: any) => {
    const storageRef = ref(storage, fileName);
    try {
        const url = await getDownloadURL(storageRef);
        return url;
    } catch (error) {
        console.error('Error al obtener la URL:', error);
        throw error;
    }
};


export const getPostsListener = (cb: (docs: Product[]) => void) => {
	const ref = collection(db, 'post');

	onSnapshot(ref, (collection) => {
		const docs: Product[] = collection.docs.map((doc) => ({
			...doc.data(),
		})) as Product[];
		cb(docs);
	});
};