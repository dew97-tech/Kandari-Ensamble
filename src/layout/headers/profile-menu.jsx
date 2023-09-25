import React from 'react';
import Link from 'next/link';
import profile_data from './profile-data';

const ProfileMenu = ({ handleLogout }) => {
	return (
		<div>
			<ul>
				<li className="has-dropdown">
					<Link href="/" className="px-1">
						<i className="fa-regular fa-user-large fa-xl"></i>
					</Link>
					<ul className="submenu">
						{profile_data.map((item) => (
							<li
								key={item.id}
								className="buff-text-color card-color border border-1 border-secondary py-1 shadow-sm"
							>
								{item.title === 'Logout' ? (
									<Link href={item.link} onClick={handleLogout}>
										{item.title}
									</Link>
								) : (
									<Link href={item.link}>{item.title}</Link>
								)}
							</li>
						))}
					</ul>
				</li>
			</ul>
		</div>
	);
};

export default ProfileMenu;
