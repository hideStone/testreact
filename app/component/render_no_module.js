/**
 * 渲染工作流异常的组件
 */

import React from 'react'

function NoModule(props) {
	return (
		<div className="no-item">
            <div></div>
            <p>{props.errorMsg}</p>
        </div>
	)
}


export default NoModule