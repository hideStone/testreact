/**
 * 审批意见
 */

import React from 'react'
import ButtonWrap from './btnWrap'
import Button from '../components/button'

function RadioItem(props) {
    return (
        <span>
            <input type="radio" id={props.id} name={props.name} value={props.val} onChange={props.handleChange}/>
            <label htmlFor={props.id}>{props.text}</label>
        </span>
    )
}


class Approved extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            approve_mark: '',
            is_back: false
        }
        this.handleChecked = this.handleChecked.bind(this)
        this.handleChangeText = this.handleChangeText.bind(this)
    }
    handleChecked(event) {
        const target = event.target
        if (target.id == 3) {
            this.setState({
                is_back: true
            })
        } else {
            this.setState({
                is_back: false
            })
        }
    }
    handleChangeText(event) {
        this.setState({approve_mark: event.target.value})
    }
    render() {
        return(
            <div>
                <div className="wf-line type-radio" id="approval_type">
                    <div className="form-title">审批意见</div>
				    <div className="form-main">
                        <RadioItem id="1" name="opinion" val="1" text="同意" handleChange={this.handleChecked}/>
                        <RadioItem id="2" name="opinion" val="2" text="不同意" handleChange={this.handleChecked}/>
                        <RadioItem id="3" name="opinion" val="3" text="退回" handleChange={this.handleChecked}/>
                    </div>
                </div>
                {
                    this.state.is_back && 
                    <div className="wf-line type-radio">
                        <div className="form-title">退回选择</div>
                        <div className="form-main">
                            <RadioItem id="4" name="level" val="1" text="退回申请人"/>
                            {
                                !this.props.is_first_task && (<RadioItem id="5" name="level" val="2" text="退回上一级"/>)
                            }
                        </div>
                    </div>
                }
                <div className="wf-line type-texearea" style={{marginTop:"0px"}}>
                    <div className="form-title">审批备注</div>
                    <div className="form-main">
                        <textarea placeholder="请填写" name="mark" value={this.state.approve_mark} onChange={this.handleChangeText}></textarea>
                    </div>
                </div>
                <input type="hidden" name="currentTaskName" value={this.props.current_task_name}/>
                <ButtonWrap>
                    <Button class_name="submit" button_text="提交" onClick={this.props.handleClick}/>
                </ButtonWrap>
            </div>
        )
    }
}

export default Approved