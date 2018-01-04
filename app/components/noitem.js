/**
 * 出错
 */
import React from 'react'

function NoItem(props) {
    return (
        <div className="no-item">
            <div></div>
            <p>{props.message}</p>
        </div>
    )
}
export default NoItem