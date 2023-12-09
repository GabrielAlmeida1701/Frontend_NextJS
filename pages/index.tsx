import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { setCookie, deleteCookie } from 'nextjs-cookie';
import { CookieSettings } from '../utils/cookie-settings';
import { login } from '../pages/api/serviceCaller';

const IndexPage: React.FC = () => {
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const router = useRouter();

	deleteCookie('userId');
	deleteCookie('accessToken')
	deleteCookie('refreshToken')

	const handleLogin = async () => {
		try {
			const { accessToken, refreshToken, id, error } = await login(username, password);
			if (error) {
				alert('Invalid Login, try again')
				return
			}

			setCookie('userId', id, CookieSettings);
			setCookie('accessToken', accessToken, CookieSettings);
			setCookie('refreshToken', refreshToken, CookieSettings);

			router.push('/content');
		} catch(e) {
			alert(e.message);
		}
	};

	return (
		<div>
			<h1>Login</h1>
			<form>
				<div>
					<label>Username:</label>
					<input
						type="text"
						value={username}
						onChange={(e) => setUsername(e.target.value)}
					/>
				</div>
				<div>
					<label>Password:</label>
					<input
						type="password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
					/>
				</div>
				<button type="button" onClick={handleLogin}>
					Login
				</button>
			</form>
		</div>
	);
}

export default IndexPage
