/**
 * 渲染隐藏域表单
 */
import React from 'react'

function Hidden(props) {
    return (
        <input type="hidden" name={props.data.name} value={props.data.value || ''}/>
    )
}

export default Hidden