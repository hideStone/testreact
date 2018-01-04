/**
 * 当前任务
 */

 import React from 'react'
 
 function CurrentTask(props) {
     return (
         <div className="current_task">
            <span className="title">
                {
                    props.isEnd ? '审批结果' : '当前环节'
                }
            </span>
            <span className="used_show">{props.currentTaskName}</span>
         </div>
     )
 }

 export default CurrentTask