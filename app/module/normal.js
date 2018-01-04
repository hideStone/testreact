/**
 * 渲染普通填写的表单
 */
import React from 'react'

class Normal extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            value: props.data.value || ''
        }
        this.handleChange = this.handleChange.bind(this)
    }

    handleChange(event){
        this.setState({value: event.target.value})
    }

    render() {
        const normalInputInfo = this.props.data
        return (
            <div className="wf-line type-normal">
				<div className="form-title">{normalInputInfo.title}</div>
				<div className="form-main">
					{
                        normalInputInfo.readOnly
                        ? (<span className="user_show">{normalInputInfo.value}</span>)
                        : (<input type="text" name={normalInputInfo.name} value={this.state.value} placeholder={'请输入' + normalInputInfo.title} onChange={this.handleChange}/>)
                    }
				</div>
			</div>
        )
    }
}

export default Normal