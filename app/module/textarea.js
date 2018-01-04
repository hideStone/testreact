/**
 * textarea 框
 */

 import React from 'react'

 class Textarea extends React.Component{
     constructor(props) {
         super(props)
         this.state = {
             value: props.data.value || ''
         }
         this.handleChange = this.handleChange.bind(this)
     }
     handleChange(event) {
         this.setState({value: event.target.value})
     }
     render() {
         const textareaModuleInfo = this.props.data
         return (
            <div className="wf-line type-texearea">
                <div className="form-title">{textareaModuleInfo.title}</div>
                <div className="form-main">
                    {
                        textareaModuleInfo.readOnly ? 
                        (<span className="used_show" style={{lineHeight:'1.5'}}>{this.state.value}</span>)
                        : (<textarea placeholder={'请填写' + textareaModuleInfo.title} name={textareaModuleInfo.name} value={this.state.value} onChange={this.handleChange}></textarea>)
                    }
                </div>
            </div>
         )
     }
 }
 export default Textarea