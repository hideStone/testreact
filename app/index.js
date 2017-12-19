import React from 'react'
import ReactDOM from 'react-dom'
import Fixed from './components/render_fixed'
import Normal from './components/render_normal'
import Select from './components/render_select'
import Textarea from './components/render_textarea'
import SelectPic from './components/render_select_pic'
import SelectFile from './components/render_slect_file'
import Hidden from './components/render_hidden'
import tool from './tool.js'

const API_ROOT = 'http://192.168.10.223:7073'
var formData = new FormData(document.getElementById('workflow'))
class ApplyWorkFlow extends React.Component {
	constructor(props){
		super(props)
		this.state = {
			formInfo: {}
		}
		
		this.handleSubmit = this.handleSubmit.bind(this)
		this.handleSave = this.handleSave.bind(this)
	}
	// 提交工作流
	handleSubmit() {
		getDataFromApp()
		alert('提交')
	}
	// 保存工作流
	handleSave() {
		alert('保存')
	}
	componentDidMount() {
		const data = {
			method: 'POST',
			body:JSON.stringify({
				userId: tool.getUrlParam('userId') || 108,
				flowId: tool.getUrlParam('flowId') || 2,
				flowEntityId: tool.getUrlParam('flowEntityId')
			})
		}
		// 获取后台数据
		fetch(API_ROOT + '/api/processInstance/getFlowDetailH5', data).then((response) => {
			if (response.ok) {
				return response.json()
			}
		}).then((data) => {
			this.setState({
				formInfo: data
			})
		}).catch((error) => {
			console.log(error)
		})
	}
  	render() {
		const renderData = this.state.formInfo.data
		const renderFormData = renderData && renderData.tableData;
		const formItems = renderFormData && renderFormData.map((form, index) => {
			let type = form.type
			switch(type) {
				case 'hidden':
					return <Hidden data={form} key={index}/>
					break;
				case 'text':
					return <Normal data={form} key={index}/>	
					break;
				case 'select':
				case 'datetime':
				case 'date':
				case 'time':
					return <Select data={form} key={index}/>
					break;
				case 'textarea':
					return <Textarea data={form} key={index}/>
					break;
			}
		})
    	return (
    		<form id="workflow">
    			<Fixed title="申请人" name={renderData && renderData.user.name} />
    			<Fixed title="所属部门" name={renderData && renderData.user.department} />
				{formItems}
				<SelectPic/>
				<SelectFile/>
    			<div className="btn-area">
					<div className="inner">
					<button type="button" className="submit" onClick={this.handleSubmit}>
						提交
					</button>
					<button type="button" className="save" onClick={this.handleSave}>
						保存
					</button>
					</div>
				</div>
    		</form>
    	)
  	}
}
ReactDOM.render(
	<ApplyWorkFlow/>,
	document.getElementById('view-main')
)