import './App.css'
import { LandingPage } from './pages/LandingPage'
import ReactSlidingPane from 'react-sliding-pane'
import ContactUs from './pages/ContactUs/index.tsx'
import { useState } from 'react'
import Menu from '../public/assets/Menu.svg'
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
            <img src={Menu} alt="Menu"/>
        </div>
        <button className={`contactUsButton ${showContactUs ? "visible" : ""}`} onClick={clicker}>
            Contact us
        </button>
    
    
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
