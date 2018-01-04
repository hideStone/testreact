import React from 'react'


class Button extends React.Component{
    constructor(props) {
        super(props)
    }

    render() {
        return(
            <button type="button" className={this.props.class_name} onClick={this.props.handleClick}>
                {this.props.buttonText}
            </button>
        )
    }
}

export default Button