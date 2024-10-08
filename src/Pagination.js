import React from 'react';
import './APIComponent.css';

const Pagination = ({ next, previous, onNext, onPrevious }) => {
  return (
    <div className="pagination">
      <div>
        <button onClick={onPrevious} disabled={!previous}>
          Précédent
        </button>
      </div>
      <div>
        <button onClick={onNext} disabled={!next}>
          Suivant
        </button>
      </div>
    </div>
  );
};

export default Pagination;
