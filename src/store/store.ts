import { reducer } from './reducers';
import Storage from '../utils/storage';
import { PersistenceKey } from '../utils/storage';
import { onAuthStateChanged } from 'firebase/auth';
import { Screens } from '../types/navigation';
import { auth } from '../utils/firebase';
import { changeScreen, setUserCredentials } from './actions';


onAuthStateChanged(auth, (user) => {
	if (user) {
		user.uid !== null ? dispatch(setUserCredentials(user.uid)) : '';
		dispatch(changeScreen(Screens.DASHBOARD));
	} else {
		dispatch(changeScreen(Screens.SIGNIN));
	}
});

const emptyState = {
	screen: Screens.LOGIN,
	post: [],
	user: {},
};
export let appState = emptyState
	// export let appState = Storage.get({key:  PersistenceKey.STATE, defaultValue: emptyState})

let observers: any = [];


const notifyObservers = () => observers.forEach((o: any) => o.render());

export const dispatch = (action: any) => {
	const clone = JSON.parse(JSON.stringify(appState));
	const newState = reducer(action, clone);
	appState = newState;
	notifyObservers();
};

export const addObserver = (ref: any) => {
	observers = [...observers, ref];
};
