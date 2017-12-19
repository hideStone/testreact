/**
 * 申请工作流中的图片选择组件
 */

import React from 'react'
import tool from '../tool'

function PicItem(props) {
	return(
		<li>
			<img src={props.url}/>
			<i className="icon-close" data-index={props.index} onClick={props.handleDelPic}></i>
		</li>
	)
}

function PicStore(props) {
	const imgLists =props.imgLists.length > 0 && props.imgLists.map((item, index) =>{
		return <PicItem key={index} url={item} handleDelPic={props.handleDelPic} index ={index}/>
	})
	return (
		<div className="pic-warehouse">
			<ul>
				{imgLists}
			</ul>
		</div>
	)
}

class SelectPic extends React.Component{
	constructor(props) {
		super(props)
		this.state = {
			imgLists:['https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=547138142,3998729701&fm=27&gp=0.jpg','https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=547138142,3998729701&fm=27&gp=0.jpg']
		}
		this.handleSelectPic = this.handleSelectPic.bind(this)
		this.handleDelPic = this.handleDelPic.bind(this)
	}

	handleSelectPic() {
		// 调用app选取图片方法
		tool.forAndroid('startSelectPhotoActivity')
	}
	handleDelPic(e) {
		let lists = this.state.imgLists
		const index = Number(e.target.getAttribute('data-index'))
		lists.splice(index, 1)
		this.setState({
			imgLists: lists
		})
	}
	render() {
		return (
			<div style={{background:"#fff"}}>
				<div className="wf-line type-pic-select">
					<div className="form-title">图片</div>
					<div className="form-main" onClick={this.handleSelectPic}>
						<i className="icon-select-pic"></i>
					</div>
				</div>
				{
					this.state.imgLists.length > 0 && <PicStore imgLists={this.state.imgLists} handleDelPic={this.handleDelPic}/>
				}
			</div>
		)
	}
}

export default SelectPic