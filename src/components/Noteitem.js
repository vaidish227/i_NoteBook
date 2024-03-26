import React from 'react';

const Noteitem = (props) => {
  const { note } = props;
  return (
    <div className='col-md-3'>

      <div className="card my-3" style={{ 
        width: '100%',
        height: 'auto',
        borderRadius: '20px',
        padding: '5px',
        boxShadow: 'rgba(151, 65, 252, 0.2) 0 15px 30px -5px',
        backgroundImage: 'linear-gradient(144deg,#AF40FF, #5B42F3 50%,#00DDEB)'
      }}>
        <div className="card__content" style={{ 
          background: 'rgb(180, 181, 219, 1)',
          borderRadius: '17px',
          width: '100%',
          height: 'auto'
        }}>
            
          <h1 className='card-title my-3 mx-3 '>{note.title}</h1>
          <p className='card-text mx-3 my-3'>{note.description}</p>
          
        </div>
      </div>
    </div>
  );
}

export default Noteitem;