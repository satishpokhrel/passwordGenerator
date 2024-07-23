import { useState, useCallback, useRef } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCopy } from '@fortawesome/free-solid-svg-icons'


function App() {
  const [length, setLength] = useState('8');
  const [includeNum, setincludeNum] = useState(false);
  const [includeChar, setincludeChar] = useState(false);
  const [incUpperChar, setUpperChar] = useState(false);
  const [password, setPassword] = useState("");
  const [passwordStrength, setPasswordStrength] = useState("");
  const [strengthColor, setStrengthColor] = useState("");

  //useRef hook
  const passwordRef = useRef(null)

  
  const passwordGenerator = useCallback(()=>{
    let pass="";
    let color;
    let strength = ""
    let str = "abcdefghijklmnopqrstuvwxyz";
    if(includeNum){
      str += "1234567890";
    }
    if(includeChar) str += "~!@#$%&"
    if(incUpperChar) {
      str+= "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
    }

    for(let i=1; i<=length; i++){
      let char = Math.floor(Math.random() * str.length +1);
      pass += str.charAt(char)
    }

    if(includeNum && includeChar && incUpperChar){
      strength = "strong"
      color = "green"
    }else if(includeChar&&includeNum){
      strength = "medium"
      color = "orange"
    }else{
      strength = "weak"
      color = "red"
    }

    setStrengthColor(color)
    setPasswordStrength(strength);
    setPassword(pass);
  }, [length, includeNum, includeChar, incUpperChar, setPassword])

  const copyPasswordtoClipboard = useCallback(()=>{
    passwordRef.current?.select();
    // passwordRef.current?.setSelectionRange(0, 3)
    window.navigator.clipboard.writeText(password)
  }, [password])

  const borderStyle = {
    border: "solid",
    borderColor: strengthColor
  }
  return (

    <>
      <div>
        <div className="flex flex-col justify-center h-screen items-center font-serif">
          <h1 className='text-3xl sm:text-4xl italic'>Password Generator</h1>
          <div className="bg-white text-xl sm:text-2xl p-5 rounded-xl w-80 sm:w-96">

            <div className='flex items-center'>
              <input 
              type="text" 
              id="pass" 
              name="pass" 
              value={password}
              style={borderStyle}
              className={`bg-backG text-teal-950 font-mono text-sm p-2 w-52 sm:w-80`} 
              readOnly 
              ref={passwordRef}
              />
              <button
                className='ml-4'
                onClick={copyPasswordtoClipboard}
              ><FontAwesomeIcon icon={faCopy} /></button>
              <span
                id="color"
                style={{color: strengthColor}}
                className={`text-base ml-3 font-normal max-w-10 break-words sm:break-normal`}
              >{passwordStrength}</span>
            </div>

            <div className='mt-10'>
              <label htmlFor="slider">Password Length</label><br />
              <div className='flex justify-between' >
                <input 
                type="range" 
                id="slider" 
                name='slider' 
                min={8} 
                max={100} 
                value={length}
                className='w-64 cursor-pointer'
                onChange={(e)=>{
                  setLength(e.target.value)
                }}/>
                <span>{length}</span>
              </div>
            </div>

            <div className='mt-4 flex flex-col gap-1' >
              <div>
                <input 
                type="checkbox" 
                id="incNum" 
                className='accent-green-600 bg-backG'
                name="incNum"
                defaultChecked = {includeNum}
                onChange={() => {
                  setincludeNum((prev) => !prev)
                }}
                />
                <label htmlFor="incNum" className='mx-3'>Include Numbers</label>
              </div>

              <div>
                <input 
                type="checkbox" 
                id="inChar" 
                name="incChar" 
                className='accent-green-600'
                defaultChecked = {includeChar}
                onChange={()=>{
                  setincludeChar((prev)=>!prev);
                }}
                />
                <label htmlFor="incChar" className='mx-3'>Include Characters</label>
              </div>
              <div>
                <input 
                type="checkbox" 
                id="UpperChar" 
                name="upperChar"
                className='accent-green-600'
                defaultChecked = {incUpperChar}
                onChange={()=>{
                  setUpperChar((prev)=>!prev);
                  console.log(incUpperChar);
                }}
                />
                <label htmlFor="UpperChar" className='mx-3'>Include Uppercase </label>
              </div>
            </div>

            <div className='flex justify-center mt-6'>
              <button
              id='btn' 
              className='bg-green-700 rounded-md text-xl p-1 w-96' 
              onClick={()=>{
                passwordGenerator();
                // document.getElementById('btn').classList.add("animate-spin")
              }}>Generate</button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
