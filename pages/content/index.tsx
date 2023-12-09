import { GetServerSideProps } from 'next';
import AuthenticatedPage from '../../components/AuthenticatedPage';
import UnauthenticatedPage from '../../components/UnauthenticatedPage';

const ContentPage = ({ isAuthenticated }) => {
    return isAuthenticated ? <AuthenticatedPage /> : <UnauthenticatedPage />;
};

export const getServerSideProps: GetServerSideProps = async (context) => {
    const { accessToken, refreshToken, userId } = context.req.cookies
    const response = await fetch('http://localhost:3001/auth/validate', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + accessToken
        },
        body: JSON.stringify({ refreshToken }),
    });

    let isAuthenticated = response.ok;
    if (isAuthenticated) {
        const data = await response.json()
        isAuthenticated = !data.error
    }

    return {
        props: {
            isAuthenticated,
        },
    };
};

export default ContentPage;
