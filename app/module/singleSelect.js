/**
 * 单选组件
 */
import React from 'react'
import Tool from '../tool'

class SingleSelect extends React.Component{
    constructor(props){
        super(props)
        this.state={
            value: props.data.value,
            text: props.data.text
        }
        this.handleSelectSingle = this.handleSelectSingle.bind(this)
    }

    callback(data) {
        if (window.temp_name == this.props.data.name) {
			this.setState({
                value: JSON.parse(data).value,
                text: JSON.parse(data).name
			})
		}
    }
    handleSelectSingle(event) {
        window.temp_name = this.props.data.name
        window.getSelectDataFromApp = this.callback.bind(this)
        const forAppData = this.props.data.options
        Tool.forAndroid('showSelected', JSON.stringify(forAppData))
        Tool.forIos('showSelected', {body: forAppData})
    }
    render() {
        const singleSelectModuleInfo = this.props.data
        return(
            <a href="javascript:void(0);" className="wf-line type-select" onClick={this.handleSelectSingle}>
				<div className="form-title">{singleSelectModuleInfo.title}</div>
				<div className="form-main">
					{
                        singleSelectModuleInfo.readOnly
                        ? (
                            <span className="used_show">
                                {
                                    singleSelectModuleInfo.options.filter(item=>item.checked)[0].name
                                }
                            </span>
                        )
                        : (
                            <div className="inline-block">
                                <input type="hidden" name={singleSelectModuleInfo.name} value={this.state.value || ''}/>
                                {
                                    this.state.value == undefined
                                    ? (<span className="un_selected">请选择{singleSelectModuleInfo.title}</span>)
                                    : (<span className="used_show">{
                                        // singleSelectModuleInfo.options.filter(item=>item.checked)[0].name
                                        this.state.text
                                    }</span>)
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

export default SingleSelect