/**
 * 日期选择组件
 */
import React from 'react'
import Tool from '../tool'


class TimeSelect extends React.Component{
    constructor(props){
        super(props)
        this.state={
            value: props.data.value,
            text: props.data.value
        }
        this.handleSelectTime = this.handleSelectTime.bind(this)
    }
    callback(data) {
        if (window.temp_name == this.props.data.name) {
			this.setState({
                value: data,
                text: data
			})
		}
    }
    handleSelectTime(event) {
        window.temp_name = this.props.data.name
        window.getSelectDataFromApp = this.callback.bind(this)
        const type = this.props.data.type
        if (type == 'date') {
            Tool.forIos('showDate', {type: 1})
            Tool.forAndroid('showDateDialog')
        }
        if (type == 'datetime') {
            Tool.forIos('showDate', {type: 3})
            Tool.forAndroid('showCalendarDialog')
        }
        if (type == 'time') {
            Tool.forIos('showDate', {type: 2})
            Tool.forAndroid('showTimeDialog')
        }
    }
    render() {
        const timeSelectModuleInfo = this.props.data
        return (
            <a href="javascript:void(0);" className="wf-line type-select" onClick={this.handleSelectTime}>
				<div className="form-title">{timeSelectModuleInfo.title}</div>
				<div className="form-main">
					{
                        timeSelectModuleInfo.readOnly
                        ? (
                            <span className="used_show">{this.state.value}</span>
                        )
                        : (
                            
                            <div className="inline-block">
                                <input type="hidden" name={timeSelectModuleInfo.name} value={this.state.value || ''}/>
                                {
                                    this.state.value == undefined
                                    ? (<span className="un_selected">请选择{timeSelectModuleInfo.title}</span>)
                                    : (<span className="is_selected">{this.state.text}</span>)
                                }
                                <i className="select-arrow"></i>
                            </div>
                        )
                    }
				</div>
			</a>
        )
    }
}

export default TimeSelect