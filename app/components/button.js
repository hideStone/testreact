/**
 * 单个按钮组件
 */
import React from 'react'

class Button extends React.Component{
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <a href="javascript:void(0);" 
            className={this.props.class_name}
            onClick={this.props.onClick}>{this.props.button_text}</a>
        )
    }
}
export default Button