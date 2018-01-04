/**
 * 渲染隐藏域的组件
 */

import React from 'react'


class Hidden extends React.Component {
	render() {
		const hidenInputInfo = this.props.data
		return(
			<input name={hidenInputInfo.name} value={hidenInputInfo.value} type="hidden"/>
		)
	}
}


export default Hidden