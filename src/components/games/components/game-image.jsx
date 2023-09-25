import Link from 'next/link';
import React from 'react';

const GameImage = ({ img, englishTranslation }) => {
    return (
        <div className="tpcourse__thumb p-relative w-img fix">
            <Link href="/memory-game">
                <img src={img} alt={englishTranslation} />
            </Link>
        </div>
    );
};

export default GameImage;
