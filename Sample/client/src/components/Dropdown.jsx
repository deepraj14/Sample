import React from 'react'
import { useState } from 'react';
import 'assets/css/Dropdown.css'
import {AiFillCaretDown} from 'react-icons/ai'
import {useEditorStore, languages} from 'store/EditorStore'



// const icons = [
//     {
//         name:"logo",
//         importedIconModule:"--fucntion--",
//     },
//     {
//         name:"download",
//         importedIconModule:"--fucntion--",
//     }
// ]

export default function Dropdown() {
    const curLang = useEditorStore(store=> store.curLang)
    const setState = useEditorStore(store => store.setState)

    const [isActive, setisActive] = useState(false);
    const handleDropdownClick = () => {
        if(isActive)
            setisActive(false);
        else
            setisActive(true);
    }
  return (
    <div className="dropdown">
        <div className="dropdown-btn" onClick={handleDropdownClick}>
            <span>{languages[curLang].name}</span>
            <AiFillCaretDown
                size={13}
            />
        </div>
        <div className="dropdown-list">
        {isActive && languages.map((lang, idx) => {
        return (
            <div className="dropdown-item" key={lang.name} onClick={()=>{handleDropdownClick(); setState('curLang', idx)}}>
                {lang.name}
            </div>
            )
        })}
        </div>
    </div>
  )
}
