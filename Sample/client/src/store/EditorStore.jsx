import create from 'zustand'
import languages from 'assets/data/Languages'
import { devtools } from 'zustand/middleware'

export const useEditorStore = create(devtools(set => ({
  input: "",
  output: "",
  code: "",
  curLang: 0,
  
  /**
   * 
   * @param {string} stateName name of the state to be changed.
   * @param {string | number} payload object with value to be set.
   */
  setState: (stateName, payload) => {
    set(state => {
      return state[stateName] = payload
    })

    // const [langs, set] = useState({name: "", boilerplate: ""});
    // set(old => {...old, boilerplate: ""})
    // set({..., input: xyz, output: xyz});
  },
})))

export {languages};