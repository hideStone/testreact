import React from 'react'
import ReactDOM from 'react-dom'
import tool from './tool'
import Fixed from './module/fixed'
import Normal from './module/normal'
import Hidden from './module/hidden'
import SingleSelect from './module/singleSelect'
import TimeSelect from './module/timeSelect'
import Textarea from './module/textarea'
import SelectPic from './module/picSelect'
import SelectFile from './module/fileSelect'
import Approved from './module/approved'
import FlowApprover from './module/flowApporver'
import ButtonWrap from './module/btnWrap'
import Button from './components/button'
import CurrTask from './module/currentTask'
import Tool from './tool'
import NoItem from './components/noitem'

const API_ROOT = 'http://192.168.10.223:7575'
const REDIRECT = 'http://192.168.10.223.7272'

// 申请工作流
class ApplyWorkFlow extends React.Component {
	constructor(props){
		super(props)
		this.state = {
			RenderFormData: null, // 渲染表单的数据
			is_error: false,
            err_msg: ''
		}
		this.handleSave = this.handleSave.bind(this)
		this.handleSubmit = this.handleSubmit.bind(this)
		this.saveApprove = this.saveApprove.bind(this)
	}
	componentDidMount() {
		const submit_data = {
			userId: Tool.getUrlParam('userId') || 98,
			flowId: Tool.getUrlParam('flowId') || 2,
			flowEntityId: Tool.getUrlParam('flowEntityId')
		}
		const data = {
			method: 'POST',
			body:JSON.stringify(submit_data)
		}
		// 获取后台数据
		fetch(API_ROOT + '/api/processInstance/getFlowDetailH5', data).then((response) => {
			if (response.ok) {
				return response.json()
			}
		}).then((data) => {
			console.log(data)
			if (data.data) {
				const handle_status = data.data.handleStatus
				if (handle_status =='0' || handle_status == '2' || handle_status == '6') { // 工作流状态
					this.setState({
						RenderFormData: data,
					})
				} else {
					window.location.href = 'http://192.168.10.223:7272/saasoa/workflowshow.html?userId='+ submit_data.userId +'&flowId='+ submit_data.flowId +'&flowEntityId='+ submit_data.flowEntityId
				}
			} else { 
				this.setState({
                    is_error: true,
                    err_msg: data.message
                })
			}
		}).catch((error) => {
			console.log(error)
		})
	}
	handleSave() { // 保存工作流
		const data = {
			method: 'POST',
			body: JSON.stringify(Tool.makeUpData(this.refs.workflow))  // $(this.refs.workflow).serializeObect()
		}
		Tool.fetchData( API_ROOT + '/api/processInstance/saveUserProcessForm', data)
	}
	handleSubmit() { // 提交工作流
		const data = {
			method: 'POST',
			body: JSON.stringify(Tool.makeUpData(this.refs.workflow))
		}
		Tool.fetchData(`${API_ROOT}/api/processInstance/saveFormAndStartProcess`, data)
	}
	saveApprove() { // 保存审核
		const data = {
			method: 'POST',
			body: JSON.stringify(Tool.makeUpData(this.refs.workflow))
		}
		Tool.fetchData(`${API_ROOT}/api/processInstance/submitApproveAndForm`, data)		
	}
	render() {
		if (this.state.RenderFormData) {
			const data = this.state.RenderFormData.data
			const formItems = data.tableData.map((item, index) => {
				const type = item.type
				switch(type) {
					case 'hidden':
						return <Hidden data={item} key={index}/>
						break;
					case 'text':
						return <Normal data={item} key={index}/>
						break;
					case 'select':
					case 'radio':
						return <SingleSelect data={item} key={index}/>
						break;
					case 'datetime':
					case 'date':
					case 'time':
						return <TimeSelect data={item} key={index}/>
						break;
					case 'textarea':
						return <Textarea data={item} key={index}/>
						break;
					case 'input_img':
						return <SelectPic data={item} img_url={data.img_url} key={index}/>
					case 'input_accessory':
						return <SelectFile data={item} file_url={data.img_url} key={index}/>
				}
			})
			return(
				<form id="workflow" ref="workflow">
					<Fixed title="流程名称" text={data.flowName}/>
					{
						data.handleStatus !== '0' && (<Fixed title="流程编号" text={data.flowNo}/>)
					}
					<Fixed title="申请人" text={data.user.name}/>
					<Fixed title="所属部门" text={data.user.department}/>
					<p className="mb10"></p>
					{formItems}
					{
						data.handleStatus !== '0' && (<CurrTask currentTaskName={data.currentTaskName} isEnd={data.isEnd}/>)
					}
					{
						data.flowApprover && (<FlowApprover flowApprover={data.flowApprover}/>)
					}
					{
						data.handleStatus == '2' && (<Approved is_first_task={data.isFirstTask} current_task_name={data.currentTaskName} handleClick={this.saveApprove}/>)
					}
					{
						data.handleStatus == '0' &&
						(<ButtonWrap>
							<Button class_name="submit" button_text="提交" onClick={this.handleSubmit}/>
							<Button class_name="save" button_text="保存" onClick={this.handleSave}/>
						</ButtonWrap>)
					}
				</form>
			)
		} 
		if (this.state.is_error){
            return (
                <NoItem message={this.state.err_msg}/>
            )
        }
		return null
	}
}
ReactDOM.render(
	<ApplyWorkFlow/>,
	document.getElementById('view-main')
)