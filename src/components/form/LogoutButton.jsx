import { deleteCookie } from 'cookies-next';
import { useRouter } from 'next/router';

const LogoutButton = () => {
    const router = useRouter();
	const handleLogout = () => {
		// Delete the 'loggedIn' cookie using cookies-next
		deleteCookie('loggedIn', {
			path: '/', // Adjust the path as needed
		});

		// Redirect to the sign-in page
		router.reload();
	};

	return (
		<li
			className="btn btn-md light-blue my-0 px-3 py-2 d-none d-sm-block border border-1 border-secondary"
			onClick={handleLogout}
		>
			Logout
		</li>
	);
};

export default LogoutButton;
