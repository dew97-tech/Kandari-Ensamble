import React from 'react';
import SEO from '../common/seo';
import MemoryGame from '../components/games/memory-games';
import NavLinkWrapper from '../layout/navlink-wrapper';
const index = () => {
	return (
		<NavLinkWrapper>
			<SEO pageTitle={'Memory Game'} />
			<MemoryGame exerciseTitle="Memory Game"/>
		</NavLinkWrapper>
	);
};

export default index;
