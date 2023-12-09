import { setCookie } from 'nextjs-cookie';
import { LoginData } from "../../interfaces";
import { getCookie } from 'nextjs-cookie';
import { CookieSettings } from '../../utils/cookie-settings';

export const login = async (username: string, password: string):Promise<LoginData> => {
    const response = await fetch('http://localhost:3001/auth/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
    });

    if (!response.ok)
        throw new Error('Error while tying to login')

    return await response.json()
}

export const refresh = async (refreshToken: string) => {
    const response = await fetch('http://localhost:3001/auth/refresh', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ refreshToken }),
    });

    if (!response.ok)
        throw new Error('Error while tying to refresh access token')

    return await response.json()
}

export const get = async (endpoint: string, ignoreRefresh: boolean) => {
    const cookieRefreshToken = getCookie('refreshToken');
    let cookieAccessToken = getCookie('accessToken');

    if (!cookieRefreshToken || !cookieAccessToken) {
        throw new Error('No user sign in')
    }

    let token = cookieAccessToken
    if(!ignoreRefresh) {
        const { accessToken, refreshToken, id, error } = await refresh(cookieRefreshToken.toString())
        if (error) {
            throw new Error('Please login again')
        }

        token = accessToken
        setCookie('accessToken', accessToken, CookieSettings);
        setCookie('refreshToken', refreshToken, CookieSettings);
    }

    const response = await fetch(`http://localhost:3001/${endpoint}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        }
    });

    if (!response.ok) {
        throw new Error(`Error while calling ${endpoint}`)
    }

    return await response.json()
}