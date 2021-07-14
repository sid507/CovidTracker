import React from 'react'
import './Table.css';

function Table({ states }) {
    // console.log(states);
    return (
        <div className="table">
            {
                states.map(({ name, active }) => (
                    <tr>
                        <td>{name}</td>
                        <td>
                            <strong>{active}</strong>
                        </td>
                    </tr>
                ))
            }
        </div>
    )
}

export default Table
