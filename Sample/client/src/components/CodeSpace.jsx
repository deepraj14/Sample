import { React, useState ,useRef, useMemo } from 'react';
import 'assets/css/CodeSpace.css';
import InputSpace from './InputSpace';
import OutputSpace from './OutputSpace'
import Editor from "@monaco-editor/react";
import {AiFillPlayCircle} from 'react-icons/ai';
import {useEditorStore,languages} from 'store/EditorStore'
import axios from 'axios';

function CodeSpace(){
  const [isLoading, setIsLoading] = useState(false);
  const curLang = useEditorStore(store => store.curLang);
  //If an invalid language is mentioned, then a blank screen will appear !
  const setState = useEditorStore(store => store.setState);

  const selectedLang = useMemo(()=>{
    return languages[curLang]
  }, [curLang])

  const editorRef = useRef(null);
  
  function handleEditorDidMount(editor, monaco) {
    editorRef.current = editor; 
  }

  function getValue(){
    return editorRef.current.getValue();
  }

  const handleRun = async () => {
    let lang = selectedLang
    const apiReqData = {
      language: lang.ext,
      code:getValue(),
      input:useEditorStore.getState().input
    }
    // function abortProtocol(intervalId,time){
    //   console.log("inside protocol")
    //   console.log("isLoading: " , isLoading)

    //   setTimeout(()=>{
    //     if(isLoading===true){
    //       console.log("Request timeout")
    //       clearInterval(intervalId)
    //       setState('output',"Request timeout")
    //       setIsLoading(false)
    //     }else
    //       console.log("isLoading: " , isLoading)
    //   },time)
    // }
    console.log("Submitted this code in " + lang.name + " : ");
    console.log(getValue());
    console.log("input", useEditorStore.getState().input)
    setState('code', getValue())
    try {
      setIsLoading(true);
      const {data : resultId} = await axios.post("http://localhost:6500/run", apiReqData)
      
      console.log(resultId);

      let intervalId = setInterval(async () => {
        let {data: dataRes} = await axios.get("http://localhost:6500/results/" + resultId)
        let {status , jobOutput} = dataRes
        // console.log(intervalId)
        console.log(dataRes)
        // abortProtocol(intervalId,5000);
        if(status === "Done"){
          clearInterval(intervalId)
          // console.log(jobOutput.stdout)
          setIsLoading(false)
          if(jobOutput.stderr!=="")
            setState('output',jobOutput.stderr)
          else
            setState('output',jobOutput.stdout)
        }else{
          console.log("Current status: " + status)
        }
      }, 1000)
    } catch (error) {
      setIsLoading(false)
      setState('output',"Beta koi dikkat hai server mein ...")
    }
  }

  return(
    <div className="code-space">
      <div className="code-editor">
        <Editor
          height="100%"
          width="100%"
          theme='vs-dark'
          loading="<Loading/>"
          language={selectedLang.name}
          value={selectedLang.BoilerPlate}
          onMount={handleEditorDidMount}
        />
        <div className="play-button-icon" title='Run' onClick={()=>handleRun()}>
        <AiFillPlayCircle 
          size={90}
        />
        </div>
      </div>
      <div className="print-area">
        <InputSpace/>
        <OutputSpace isLoading={isLoading}/>
      </div>
    </div>
  )
}

export default CodeSpace;