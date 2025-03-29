
import { useState } from 'react'
import { Game } from './Components/GameEngine'
import './index.scss'
import { GameOverModal } from './Components/GameOverModal'
import MobileLandingPage from '../../../public/assets/MobileLandingPage.mp4'
import UnderConstruction from '../../../public/assets/UnderConstruction.mp4'
import ImBoredButton from '../../../public/assets/icons/ImBoredButton.svg'

export const LandingPage = ()=>{
    const [state,setState] = useState({counter:30, score:0,gamepopupOpen:false,gameOverModal:false})
    // console.log(state)

    return (
        <div className="landingPage">
            <video autoPlay>
                <source type="video/mp4" src={`${window.innerWidth<500?MobileLandingPage:UnderConstruction}`}/>
            </video>
            <div onClick={()=>setState((prev)=>({...prev,gamepopupOpen:false}))} className='buttonOverlay'>
                <img src={ImBoredButton}/>
                
            </div>
            <div onClick={()=>setState((prev)=>({...prev,gamepopupOpen:true,counter:30,score:0}))} className='buttonSpace'>I am bored</div>
            <div className='fixedOverlay'>
                {state?.gamepopupOpen && <Game state={state} setState={setState}/>}
                {state?.gameOverModal && <GameOverModal state={state} setState={setState}/>}
            </div>
        </div>
    )
}