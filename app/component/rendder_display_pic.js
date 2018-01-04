/**
 * 渲染工作流展示图片
 */

import React from 'react'

function PicItem(props) {
    return (
        <li>
            <img src={props.url}/>
        </li>
    )
}

function PicWraper(props) {
    const piclists = props.piclist.map((item, index) => {
        return <PicItem url={item.url} key={index}/>
    })
    return (
        <ul>
            {piclists}
        </ul>
    )
}


class PicStore extends React.Component{
    constructor(props){
        super(props)
        this.state = {}
    }

    render() {
        return(
            <div className="wf-line show-pic">
                <div className="form-title">图片</div>
                <div className="form-main">
                    <PicWraper piclist={props.picLists}/> 
                </div>
            </div>
        )
    }
}

export default PicStore