/**
 * 申请工作流中的文件选择组件
 */
import React from 'react'
import tool from '../tool'
function FileItem(props) {
	function calcFileType() {
		const splitArr = props.item.file_name.split('.')
		const type = splitArr[splitArr.length - 1]
		switch(type) {
			case 'doc':
			case 'docx':
				return 'doc'
				break;
			case 'xls':
				return 'excel'
				break;
			case 'pdf':
				return 'pdf'
				break;
			case 'ppt':
			case 'pptx':
				return 'ppt'
				break;
			case 'txt':
				return 'txt'
				break;
			case 'jpg':
			case 'png':
				return 'pic'
				break;
			default:
				return 'file'
				break;
		}
	}
	return (
		<li>
			<div>
				<img src={'./style/icon-'+ calcFileType() +'.png'} height="44" width="44"/>
				<span className="file-name">{props.item.file_name}</span>
			</div>
			<i className="icon-close" onClick={props.handleDelFile} data-index={props.index}></i>
		</li>
	)
}
function FileStore(props) {
	const fileLists =props.fileLists.length > 0 && props.fileLists.map((item, index) =>{
		return <FileItem key={index} item={item} handleDelFile={props.handleDelFile} index={index}/>
	})
	return(
		<div className="file-warehouse">
			<ul>
				{fileLists}
			</ul>
		</div>
	)
}
class SelectFile extends React.Component{
	constructor(props) {
		super(props)
		this.state={
			fileList:[{
				file_name: '公司重要.doc指纲领.doc'
			},{
				file_name: '公司重.doc.docx要指纲领.docx'
			},{
				file_name: '公司重要.doc指纲领.xls'
			},{
				file_name: '公司重要.ppt指纲领.pdf'
			},{
				file_name: '公司重要指纲领.ppt'
			},{
				file_name: '公司重要指纲领.pptx'
			},{
				file_name: '公司重要指纲领.png'
			},{
				file_name: '公司重要指纲领.jpg'
			},{
				file_name: '公司重要指纲领.sddd'
			},
			{
				file_name: '公司重要指纲领.txt'
			}]
		}
		this.handleSelectFile = this.handleSelectFile.bind(this)
		this.handleDelFile = this.handleDelFile.bind(this)
	}
	handleSelectFile(e) {
		//app 选择附件
		tool.forAndroid('startSelectFileActivity')
	}
	handleDelFile(e) {
		// 删除附件
		let lists = this.state.fileList
		const index = Number(e.target.getAttribute('data-index'))
		lists.splice(index, 1)
		this.setState({
			fileList: lists	
		})
	}
	render() {
		return (
			<div style={{background:"#fff"}}>
				<div className="wf-line type-file-select">
					<div className="form-title">附件</div>
					<div className="form-main" onClick={this.handleSelectFile}>
						<i className="icon-select-file"></i>
					</div>
				</div>
				{
					this.state.fileList.length > 0  && <FileStore fileLists={this.state.fileList} handleDelFile={this.handleDelFile}/>
				}
			</div>
		)
	}
}

export default SelectFile