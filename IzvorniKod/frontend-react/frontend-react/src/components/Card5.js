import React from "react";
import './Card.css';
import { Link } from "react-router-dom";
import './Header.css';

function Card5(props) {
  const { children, id, title } = props;

  if (id && title) {
    return (
      <div className="Card5">
          {<p className="headerdist"><Link to={{
            pathname: `/kvartovi/${id}/edit`,
            state: { id }
          }}><h2>{id}. {title}</h2></Link></p>}
          {children}
        </div>
    );
  }
  else if (title) {
    return (
      <div className="Card5">
        {title && <h2>{title}</h2>}
        {children}
      </div>
    );
  }
  else {
    return (
      <div className="Card5">
        {children}
      </div>
    );
  }

  
}

export default Card5;
