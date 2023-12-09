import { useRouter } from 'next/router';

const UnauthenticatedPage = () => {
    const router = useRouter();
    const goBack = () => {
        router.push('/');
    }

    return (
        <div>
            <h1>Unauthenticated Page</h1>
            <button type="button" onClick={goBack}>
                Go to Login
            </button>
        </div>
    );
};

export default UnauthenticatedPage;