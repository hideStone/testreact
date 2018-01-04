import React from 'react'


class ButtonControl extends React.Component{
    constructor(props){
        super(props)
    }

    render() {
        return(
            <div className="btn-area">
                <div className="inner">
                    {this.props.children}
                </div>
            </div>
        ) 
    }
}

export default ButtonControl