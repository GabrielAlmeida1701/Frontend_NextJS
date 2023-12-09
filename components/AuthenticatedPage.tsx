import { useRouter } from 'next/router';
import { get } from '../pages/api/serviceCaller'
import styles from './styles.module.css'

const AuthenticatedPage = () => {
    const router = useRouter();

    const withRefresh = async () => {
        try {
            const { message } = await get('example', false)
            alert(message)

        } catch (e) {
            alert('Invalid token please login again')
            router.push('/');
        }
    }
    const noRefresh = async () => {
        try {
            const { message } = await get('example', true)
            alert(message)

        } catch (e) {
            alert('Invalid token please login again')
            router.push('/');
        }
    }

    return (
        <div>
            <h1>Authenticated Page</h1>
            <div className={styles.contentArea}>
                <span>The AccessToken will expire in 1 minute, the refresh token in 3 minutes.</span>

                <br/>
                <span>
                    The button bellow will call the "/example" endpoint and <br/>
                    use the refreshToken to refresh the accessToken if needed.
                </span>
                <button type="button" onClick={withRefresh}>
                    Do action (this will validate the token)
                </button>

                <br/>
                <span>
                    The button bellow is just for testing the authentification, <br/>
                    it will call the "/example" endpoint but not try to refresh the token <br/>
                    so when its expires you will see an error.
                </span>
                <button type="button" onClick={noRefresh}>
                    Do action (this will ignore the token refresh)
                </button>
            </div>
        </div>
    );
};

export default AuthenticatedPage;