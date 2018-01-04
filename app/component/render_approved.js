/**
 * 审批模块
 */
import React from 'react'
import Textarea from './render_textarea'
import RadioItem from './render_radio'
class Approved extends React.Component{
    constructor(props){
        super(props)
        this.state={
            is_show_back: false
        }
        this.isShowBack = this.isShowBack.bind(this)
    }

    isShowBack(bool) {
        this.setState({
            is_show_back: bool
        })
    }
    render(){
        return (
            <form>
                <div className="wf-line type-radio">
                    <div className="form-title">审批意见</div>
                    <div className="form-main">
                        <RadioItem id="1" name="approve_suggestion" isShowBack={this.isShowBack} label="同意"/>
                        <RadioItem id="2" name="approve_suggestion" isShowBack={this.isShowBack} label="不同意"/>
                        <RadioItem id="3" name="approve_suggestion" isShowBack={this.isShowBack} label="退回"/>
                    </div>
                </div>
                {
                    this.state.is_show_back && (
                        <div className="wf-line type-radio">
                            <div className="form-title">退回选择</div>
                            <div className="form-main">
                                <RadioItem id="4" name="back_chose" label="退回审批人"/>
                                <RadioItem id="5" name="back_chose" label="退回上一级"/>
                            </div>
                        </div>
                    )
                }
                {/* <BackChose/> */}
                <Textarea data={{title:'审批备注'}}/>
            </form>
        )
    } 
}

export default Approved