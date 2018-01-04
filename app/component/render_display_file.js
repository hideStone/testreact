/**
 * 渲染工作流展示文件
 */
import React from 'react'

function FileItem(props) {
    return (
        <li>
            <img src="./style/icon-word.png" height="44" width="44" /><span className="file-name">公司重要指导纲领.doc</span>
        </li> 
    )
}
function FileWraper(props) {
    const filelists = props.filelist.map((item,index) =>{
        return <FileItem/>
    })
    return (
        <ul>
            {filelists}
        </ul>
    )
}

class FileStore extends React.Component{
    constructor(props){
        super(props)
    }

    render() {
        return (
            <div class="wf-line show-file">
                <div class="form-title">附件</div>
                <div class="form-main">
                    <FileWraper/>
                </div>
            </div>
        )
    }
}

export default FileStore