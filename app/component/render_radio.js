import React from 'react'
class Radio extends React.Component{
    constructor(props){
        super(props)
        this.state={
            value: ""
        }
        this.handlRadio = this.handlRadio.bind(this)
    }

    handlRadio(e) {
        if (e.target.id < 4) {
            (e.target.id == 3) ? this.props.isShowBack(true) : this.props.isShowBack(false)
        }
    }



    render() {
        return (
            <span>
                <input type="radio" id={this.props.id} name={this.props.name} value={this.state.value} onChange={this.handlRadio}/>
                <label htmlFor={this.props.id}>{this.props.label}</label>
            </span>
        )
    }
}

export default Radio