/**
 * 工作流审批人员
 */

 import React from 'react'

 function FlowApprover(props) {
     return(
         <div className="current_spr">
            <span className="title">审批人员</span>
            <span className="used_show">{props.flowApprover}</span>
         </div>
     )
 } 

 export default FlowApprover