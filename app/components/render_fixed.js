/**
 * 申请工作流固定的组件
 */

import React from 'react'

/**
 * 函数定义组件
 * 工作流固定的头部表单 姓名部门
 */
function Fixed(props) {
	return(
		<div className="wf-line type-fixed">
			<div className="form-title">{props.title}</div>
			<div className="form-main">
				<span className="used_show">{props.name}</span>
			</div>
		</div>
	)
}

export default Fixed