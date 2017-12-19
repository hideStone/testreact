/**
 * 渲染普通选择
 */
import React from 'react'
import tool from '../tool'
class Select extends React.Component{
	constructor(props) {
		super(props)
		this.state = {
			select_val: ''
		}
		this.handlerClick = this.handlerClick.bind(this)
		// if (props.data.type == 'select') {
		// 	window.getDataFromApp = (res) => this.setSelectValue(res)
		// }
		// if (props.data.type == 'date') {
		// 	window.getDateFromApp = (res) => this.setSelectValue(res)
		// }
	}
	setSelectValue(data) {
		this.setState({
			select_val: data
		})
	}
	handlerClick(event) {
		// 调用app方法
		const selectType = this.props.data.type
		switch(selectType){
			case 'select':
				//调用app
				tool.forAndroid('showSelected', JSON.stringify(this.props.data.options))
				tool.forIos('showSelected', {body: this.props.data.options})
				break;
			case 'date':
				this.educeAppSelectModule('showDate', 'showDateDialog', 1)
				break;
			case 'datetime':
				this.educeAppSelectModule('showDate', 'showCalendarDialog', 3)
				break;
			case 'time':
				this.educeAppSelectModule('showDate', 'showTimeDialog', 2)
				break;	
		}
	}
	/**
	 * 唤起APP选择组件
	 * @param {string} Ios_module_name ios组件名
	 * @param {string} An_module_name android组件名
	 * @param {int} type ios参数
	 */
	educeAppSelectModule(Ios_module_name, An_module_name, type) {
		tool.forIos(Ios_module_name,{type: type})
		tool.forAndroid(An_module_name)
	}	
	render() {
		const selectModuleInfo = this.props.data
		return(
			<div className="wf-line type-select" onClick={this.handlerClick}>
				<div className="form-title">{selectModuleInfo.title}</div>
				<div className="form-main">
					<input type="hidden" name={selectModuleInfo.name} value={this.state.select_val}/>
					{this.state.select_val == '' ?
					(<span className="un_selected">{'请选择' + selectModuleInfo.title}</span>)
					: (<span className="is_selected">{this.state.select_val}</span>)	
					}
					<i className="select-arrow"></i>
				</div>
			</div>
		)
	}
}

export default Select