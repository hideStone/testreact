import React from 'react'
import ReactDOM from 'react-dom'
import ShowLists from './components/render_show_list'
import Approved from './components/render_approved'
import PicStore from './components/rendder_display_pic'
import FileStore from './components/render_display_file'
import tool from './tool.js'
const API_ROOT = 'http://192.168.10.223:7073'

function ApplyLists(props) {
    const renderData = props.data
    const renderFormData = renderData && renderData.tableData;
    const apply_list = renderFormData && renderFormData.map((item, index) =>{
        if (item.type != 'hidden') {
            return <ShowLists title={item.title} content={item.value} key={index}/>
        }
    })
    return (
        <ul className="apply-list">
            <ShowLists title="流程编号" content={renderData && renderData.flowNo} />
            <ShowLists title="流程名称" content={renderData && renderData.flowName} />
            <ShowLists title="申请人" content={renderData && renderData.user.name} />
            <ShowLists title="工号" content={renderData && renderData.user.sn} />
            <ShowLists title="所属部门" content={renderData && renderData.user.department} />
            {apply_list}
        </ul>
    )
}

class WorkFlowDetail extends React.Component {
    constructor(props){
        super(props)
        this.state = {
			formInfo: {}
        }
        this.handleSubmit = this.handleSubmit.bind(this)
    }
    componentDidMount() {
		const data = {
			method: 'POST',
			body:JSON.stringify({
				userId: tool.getUrlParam('userId') || 96,
				flowId: tool.getUrlParam('flowId') || 2,
				flowEntityId: tool.getUrlParam('flowEntityId') || 1320
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
    handleSubmit() {

    }
    render() {
        return (
            <div>
                <ApplyLists data={this.state.formInfo.data}/>
                <Approved/>
                {/* <PicStore /> */}
                {/* <FileStore/> */}
                <div className="btn-area">
                    <div className="inner">	
                        <a href="javascript:void(0);" className="submit" onClick={this.handleSubmit}>提交</a>
                    </div>
                </div>
            </div>
        )
    }
}

ReactDOM.render(
	<WorkFlowDetail/>,
	document.getElementById('view-main')
)














