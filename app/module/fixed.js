/**
 * 固定模块顶部
 */

 import React from 'react'

 function Fixed(props) {
    return(
		<div className="wf-line type-fixed">
			<div className="form-title">{props.title}</div>
			<div className="form-main">
				<span className="used_show">{props.text}</span>
			</div>
		</div>
	)
 }
 export default Fixed