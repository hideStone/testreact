/**
 * 工作流已经申请后的列表item
 */

import React from 'react'

function ShowLists(props) {
    return (
        <li>
            <span className="title">{props.title}</span><span className="used_show">{props.content}</span>
        </li>
    )
}

export default ShowLists