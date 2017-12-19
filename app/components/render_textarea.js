/**
 * 渲染textarea
 */ 
import React from 'react'
class Textarea extends React.Component{
	constructor(props) {
		super(props)
		this.state = {
			value: ''
		}
		this.handleChange = this.handleChange.bind(this)
	}
	handleChange(event) {
		this.setState({value: event.target.value})
	}
	render() {
		const textareaInputInfo = this.props.data
		return (
			<div className="wf-line type-texearea">
				<div className="form-title">{textareaInputInfo.title}</div>
				<div className="form-main">
					<textarea placeholder={'请输入' + textareaInputInfo.title} value={this.state.value} onChange={this.handleChange}></textarea>
				</div>
			</div>
		)
	}
}

export default Textarea