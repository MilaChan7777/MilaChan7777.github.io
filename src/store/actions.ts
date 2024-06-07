import { getPosts } from "../utils/firebase"
import { Screens } from "../types/navigation"

export const changeScreen = (screen: Screens) => {
    return {
        action: 'changeScreen',
        payload: screen,
    }
}

export const getPostsAction = async (posts: any) => {
    // const posts  = await getPosts();
    return {
        action: 'GETPOST',
        payload: posts
    }
}

export const setUserCredentials = (user: string) => {
    return {
        action: 'SETUSER',
        payload: user,
    }
}