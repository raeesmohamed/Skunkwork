
import { useState } from 'react'
import { Game } from './Components/GameEngine'
import './index.scss'
import { GameOverModal } from './Components/GameOverModal'

export const LandingPage = ()=>{
    const [state,setState] = useState({counter:30, score:0,gamepopupOpen:false,gameOverModal:false})
    // console.log(state)

    return (
        <div className="landingPage">
            <video autoPlay>
                <source type="video/mp4" src={`${window.innerWidth<500?'/src/assets/MobileLandingPage.mp4':'/src/assets/UnderConstruction.mp4'}`}/>
            </video>
            <div onClick={()=>setState((prev)=>({...prev,gamepopupOpen:false}))} className='buttonOverlay'>
                <img src='/src/assets/icons/ImBoredButton.svg'/>
                
            </div>
            <div onClick={()=>setState((prev)=>({...prev,gamepopupOpen:true,counter:30,score:0}))} className='buttonSpace'>I am bored</div>
            <div className='fixedOverlay'>
                {state?.gamepopupOpen && <Game state={state} setState={setState}/>}
                {state?.gameOverModal && <GameOverModal state={state} setState={setState}/>}
            </div>
        </div>
    )
}