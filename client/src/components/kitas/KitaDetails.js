import React from 'react';
import { Link } from 'react-router-dom';

export default function KitaList(props) {
  return (
    <div>
      {props.kitas.map(kita => {
        return (
          <div key={kita._id}>
            <h3>
              {kita.name}
            </h3>
          </div>
        )
      })}
    </div>
  )
}