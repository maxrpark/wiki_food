import React from 'react';

import '../styles/index.css';

function Card({ id, img, name }) {
  return (
    <section className='card'>
      <div className='top'>
        <img src={img} alt='' />
        <h3 className='title'>{name}</h3>
      </div>
    </section>
  );
}

export default Card;
