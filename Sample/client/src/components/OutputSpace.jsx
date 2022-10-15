import React from 'react'
import {useEditorStore} from 'store/EditorStore'

export default function OutputSpace({isLoading}) {
    const outputStr = useEditorStore(store => store.output);
    
    return(
        <div className="space">
        <span className="heading">Output</span>
        <textarea className="output-textarea" readOnly value={isLoading ? "Compiling..." : outputStr}></textarea>
        </div>
      )
}