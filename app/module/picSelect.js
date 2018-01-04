/**
 * 图片选择
 */

import React from 'react'
import Tool from '../tool'
function PicItem(props) {
    function photoViewer(event) { // 图片查看器
        const target = event.target
        const obj = {url: target.getAttribute('src'),fileName: target.getAttribute('data-filename')}
        Tool.forAndroid('openFile', JSON.stringify(obj))
		Tool.forIos('showAttachment', obj)
    }
    return (
        <li>
            <img src={props.url} height="44" width="44" data-filename={props.file_name} data-relativepath={props.relative_path} onClick={photoViewer}/>
            {
                !props.readOnly && <button type="button" className="icon-close" data-relativepath={props.relative_path} onClick={props.handleClose}></button>
            }
        </li>
    )
}

 class SelectPic extends React.Component{
     constructor(props){
         super(props)
         this.handleSelectPic = this.handleSelectPic.bind(this)
         this.handleClose = this.handleClose.bind(this)
        //  console.log(props.data)
         this.state={
             picLists: props.data.value ? JSON.parse(props.data.value) : undefined,
            //  picFileValue: props.data.value
         }
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
     callback(data) { // app 返回数据
        const callbackData = JSON.parse(data)
        this.setState((prevState) => ({
            picLists: prevState.picLists ? [...prevState.picLists,...this.transformData(callbackData)] : this.transformData(callbackData)
            // picFileValue: [...prevState.picFileValue, ...this.addData(callbackData)]
        }))
     }
     handleSelectPic() { // 选择图片
        window.getImgLists = this.callback.bind(this)
        Tool.forAndroid('startSelectPhotoActivity')
		Tool.forIos('addPhoto', {body:''})
     }
     handleClose(event) { // 删除选中的图片
        const relative_path = event.target.getAttribute('data-relativepath')
        this.setState((prevState) => ({
            picLists: prevState.picLists.filter((item) => {
                return item.relative_path!== relative_path
            }),
            // picFileValue: prevState.picFileValue.filter((item) => {
            //     return item.relative_path !== relative_path
            // })
        }))
     }
     render() {
         const picSelectModuleInfo = this.props.data
         return (
             <div style={{background:"#fff",marginBottom:'10px'}}>
                 <div className="wf-line type-pic-select">
                    <div className="form-title">{picSelectModuleInfo.title}</div>
                    <div className="form-main">
                        {
                            picSelectModuleInfo.readOnly
                            ? (!picSelectModuleInfo.value && <span className="un_selected">无</span>)
                            : (
                                <button type="button" className="icon-select-pic" onClick={this.handleSelectPic}>
                                    <input type="hidden" id="pic_file" name={picSelectModuleInfo.name} value={JSON.stringify(this.state.picLists)}/>
                                </button>
                            )
                        }
                    </div>
                 </div>
                 <div className="pic-warehouse">
                    <ul>
                        {
                            this.state.picLists
                            && (
                                this.state.picLists.map((item, index) => {
                                    return <PicItem 
                                    key={index}
                                    readOnly={ picSelectModuleInfo.readOnly }
                                    url={ this.props.img_url + item.relative_path }
                                    file_name={ item.file_name }
                                    relative_path={ item.relative_path }
                                    handleClose={this.handleClose}/>
                                })
                            )
                        }
                    </ul> 
                 </div>
             </div>
         )
     }
 }

 export default SelectPic