import './App.css'
import { LandingPage } from './pages/LandingPage'
import ReactSlidingPane from 'react-sliding-pane'
import ContactUs from './pages/ContactUs/index.tsx'
import { useState } from 'react'
function App() {

  const [state,setState] = useState({
    isPanelOpen:false,
  })
  const [showContactUs, setShowContactUs] = useState(false);
console.log(state?.isPanelOpen)
  const clicker = ()=>{
    setState((prev)=>({...prev,isPanelOpen:!prev.isPanelOpen}))
  }
  return (
    <>
        <div onClick={() => setShowContactUs(true)} className={`menu ${showContactUs?'hidden':''}`}>
            <img src='/src/assets/Menu.svg' alt="Menu"/>
        </div>
        <button className={`contactUsButton ${showContactUs ? "visible" : ""}`} onClick={clicker}>
            Contact us
        </button>
    {/* {showButton ? <button className={`contactUsButton ${showButton ? "visible" : ""}`} onClick={clicker}>Contact us</button>:<div onClick={()=>setShowButton(true)} className='menu'><img src ='/src/assets/Menu.svg'/></div>} */}
    
    
      <LandingPage/>
      <ReactSlidingPane
              className="some-custom-class"
        overlayClassName="some-custom-overlay-class"
        isOpen={state?.isPanelOpen}
        hideHeader
        onRequestClose={()=>{
          setState((prev)=>({...prev,isPanelOpen:false}));
        }}
      >
        <ContactUs closePanel={()=>{setState((prev)=>({...prev,isPanelOpen:!prev.isPanelOpen}));setShowContactUs(false)}}/>
      </ReactSlidingPane>
    </>
    )
}

export default App
