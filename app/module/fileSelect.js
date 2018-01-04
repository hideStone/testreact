/**
 * 文件选择
 */

import React from 'react'
import Tool from '../tool'

function FileItem(props) {
    function fileViewer(event) { // 文件查看器调用app方法
        const target = event.target
        const obj = {url: target.getAttribute('data-url'),fileName: target.getAttribute('data-filename')}
        Tool.forAndroid('openFile', JSON.stringify(obj))
		Tool.forIos('showAttachment', obj)
    }
    return (
        <li>
            <div>
                <img src={'./style/icon-' + Tool.calc_file_type(props.relativePath) + '.png'} height="44" width="44"/>
                <a href="javascript:void(0);" className="file-name" data-filename={props.fileName}
                data-relativepath={props.relativePath} data-url={props.url} onClick={fileViewer}>{props.fileName}</a>
            </div>
            {
                !props.readOnly && <button type="buton" className="icon-close" data-relativepath={props.relativePath} onClick={props.handleCloseFile}></button>
            }
        </li>
    )
}


class SelectFile extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            fileLists: props.data.value ? JSON.parse(props.data.value) : undefined
            // FileValue: [],
        }
        this.handleSelectFile = this.handleSelectFile.bind(this)
        this.handleCloseFile = this.handleCloseFile.bind(this)
    }
    addData(arr) {
        const tempArr = []
        arr.forEach((item)=>{
            tempArr.push({
                file_name: item.fileName,
                relative_path: item.relativePath
            })
        })
        return tempArr
     }
     transformData(arr) {
        var temparr = []
        arr.forEach((item) => {
            temparr.push({
                file_name: item.fileName,
                relative_path: item.relativePath
            })
        })
        return temparr
     }
    callback(data) {
        const callbackData = JSON.parse(data)
        this.setState((prevState) => ({
            fileLists: prevState.fileLists ? [...prevState.fileLists,...this.transformData(callbackData)] : this.transformData(callbackData)
            // FileValue: [...prevState.FileValue, ...this.addData(callbackData)]
        }))
    }
    handleSelectFile() {
        window.getFileLists =  this.callback.bind(this)
        Tool.forIos('addFile', {body:''})
        Tool.forAndroid('startSelectFileActivity')
    }
    handleCloseFile(event) {
        const relative_path = event.target.getAttribute('data-relativepath')
        this.setState((prevState) => ({
            fileLists: prevState.fileLists.filter((item) => {
                return item.relative_path!== relative_path
            })
            // FileValue: prevState.FileValue.filter((item) => {
            //     return item.relative_path !== relative_path
            // })
        }))
    }
    render() {
        const FileSelectModuleInfo = this.props.data
        return (
            <div style={{background:'#fff',marginBottom:'10px'}}>
                <div className="wf-line type-file-select">
                    <div className="form-title">附件</div>
                    <div className="form-main">
                        {
                            FileSelectModuleInfo.readOnly
                            ? (!FileSelectModuleInfo.value && <span className="un_selected">无</span>)
                            : (
                                <button type="button" className="icon-select-file" onClick={this.handleSelectFile}>
                                    <input type="hidden" id="doc_file" name={FileSelectModuleInfo.name} value={JSON.stringify(this.state.fileLists)}/>
                                </button>
                            )
                        }
                    </div>
                </div>
                <div className="file-warehouse">
                    <ul>
                        {
                            this.state.fileLists
                            && (
                                this.state.fileLists.map((item, index) => {
                                    return <FileItem readOnly={FileSelectModuleInfo.readOnly}
                                    key={index}
                                    fileName={item.file_name}
                                    relativePath={ item.relative_path }
                                    url={this.props.file_url + item.relative_path }
                                    handleCloseFile={this.handleCloseFile}
                                    />
                                })
                            )
                        }
                    </ul>
                </div>
            </div>
        )
    }
}
export default SelectFile