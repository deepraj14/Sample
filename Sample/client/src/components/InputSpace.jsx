import 'assets/css/IOspace.css';
import { useEffect,useRef } from 'react';
import { useEditorStore } from 'store/EditorStore';

export default function InputSpace(){
  const iField = useRef()
  const input = useEditorStore(store => store.input);
  const setState = useEditorStore(store => store.setState);
  useEffect(()=>{
    iField.current.value = "";
  },[])
  return(
    <div className="space">
      <span className="heading">Input</span>
      <textarea ref={iField} className="input-textarea" placeholder="Enter input" value={input} onChange={(e)=>setState('input', e.target.value)}></textarea>
    </div>
  )
}