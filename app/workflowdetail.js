import React from 'react'
import ReactDOM from 'react-dom'
import NoItem from './components/noitem'

import Tool from './tool.js'
const API_ROOT = 'http://192.168.10.223:7575'

function ListItem(props) {
    return(
        <li>
            <span className="title">{props.title}</span><span className="used_show">{props.value}</span>
        </li>
    )
}
function ImgList(props) {
    function phoneViewer(event) {
        const target = event.target
        const obj = {url: target.getAttribute('src'),fileName: target.getAttribute('data-filename')}
        Tool.forAndroid('openFile', JSON.stringify(obj))
		Tool.forIos('showAttachment', obj)
    }
    return (
        props.value !== '' &&
        <div className="wf-line show-pic">
            <div className="form-title">{props.title}</div>
            <div className="form-main">
                <ul>
                    {
                        JSON.parse(props.value).map((item, index) => {
                            return (<li key={index}>
                                    <img src={props.img_url + item.relative_path} data-filename={item.file_name} onClick={phoneViewer}/>
                                </li>)
                        })
                    }
                </ul>
            </div>
        </div>
    )
}

function FileList(props) {
    function fileViewer(event) { // 文件查看器调用app方法
        const target = event.target
        const obj = {url: target.getAttribute('data-url'),fileName: target.getAttribute('data-filename')}
        Tool.forAndroid('openFile', JSON.stringify(obj))
		Tool.forIos('showAttachment', obj)
    }
    return (
        props.value !== '' &&
        <div className="wf-line show-file">
            <div className="form-title">{props.title}</div>
            <div className="form-main">
                <ul>
                    {
                        JSON.parse(props.value).map((item, index) => {
                            return (
                                <li key={index}>
                                    <img src={'./style/icon-'+ Tool.calc_file_type(item.file_name) +'.png'} height="44" width="44"/>
                                    <button type="button" className="file-name" 
                                    data-filename={item.file_name} 
                                    data-url={props.file_url + item.relative_path} 
                                    onClick={fileViewer}>{item.file_name}</button>
                                </li>
                            )
                        })
                    }
                </ul>
            </div>
        </div>
    )
}


class WorkFlowDetail extends React.Component {
    constructor(props){
        super(props)
        this.state ={
            workFlowInfo: null, // 工作流信息
            is_error: false,
            err_msg: ''
        }
    }
    componentDidMount() {
        const submit_data = {
			method: 'POST',
			body:JSON.stringify({
				userId: Tool.getUrlParam('userId'),
				flowId: Tool.getUrlParam('flowId'),
				flowEntityId: Tool.getUrlParam('flowEntityId')
			})
        }
        // 获取后台数据
		fetch(API_ROOT + '/api/processInstance/getFlowDetailH5', submit_data).then((response) => {
			if (response.ok) {
				return response.json()
			}
		}).then((data) => {
            console.log(data)
			if (data.data) {
                this.setState({
                    workFlowInfo: data
                })
            } else {
                // 渲染错误信息
                this.setState({
                    is_error: true,
                    err_msg: data.message
                })
            }
		}).catch((error) => {
			console.log(error)
		})
    }
    render() {
        if(this.state.workFlowInfo) {
            const data = this.state.workFlowInfo.data
            return (
                <div>
                    <ul className="apply-list">
                        <ListItem title="流程名称" value={data.flowName}/>
                        <ListItem title="流程编号" value={data.flowNo}/>
                        <ListItem title="申请人" value={data.user.name}/>
                        <ListItem title="工号" value={data.user.sn}/>
                        <ListItem title="所属部门" value={data.user.department}/>
                        {
                            data.tableData.map((item, index) =>{
                                if (item.type != 'hidden' && item.type !='input_img' && item.type != 'input_accessory' && item.type != 'radio' && item.type != 'select') {
                                    return <ListItem title={item.title} value={item.value} key={index}/>
                                }
                                if (item.type == 'radio' || item.type == 'select') {
                                    return <ListItem title={item.title} value={
                                        item.options.filter(val => val.checked)[0].name
                                    } key={index}/>
                                }
                                if (item.type == 'input_img') {
                                    return <ImgList title={item.title} value={item.value} img_url={data.img_url} key={index}/>
                                }
                                if (item.type == 'input_accessory') {
                                    return <FileList title={item.title} value={item.value} file_url = {data.img_url} key={index}/>
                                }
                            })
                        }
                    </ul>
                    {
                        data.handleStatus !== '0' && 
                        (<div className="current_task">
                            <span className="title">{data.isEnd ? '审批结果' : '当前环节'}</span><span className="used_show">{data.currentTaskName}</span>
                        </div>)
                    }
                    {
                        data.flowApprover && 
                        (
                            <div className="current_spr"><span className="title">审批人员</span><span className="used_show">{data.flowApprover}</span></div>
                        )
                    }
                </div>
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
	<WorkFlowDetail/>,
	document.getElementById('view-main')
)














