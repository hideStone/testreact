/**
 * 底部按钮
 */

import React from 'react'

function ButtonWrap(props) {
    return(
        <div className="btn-area is_fixed_bottom">
            <div className="inner">
                {props.children}
            </div>
        </div>
    )
}
export default ButtonWrap