
import { randomNameObject } from './CustomHooksAndFunction'
import './index.scss'

interface GameOverModalProps{
    state?: {
        counter:number,
        score:number,
        gamepopupOpen:boolean,
        gameOverModal:boolean
    },
    setState: React.Dispatch<React.SetStateAction<{
        counter:number,
        score:number,
        gamepopupOpen:boolean,
        gameOverModal:boolean
    }>>,
}
export const GameOverModal = ({state,setState}:GameOverModalProps)=>{
    return(
        <div className='gameOverContainer'>
                <div className='gameOverModal'>
                    <div className="gameOverModal__header">
                        <div className="gameOverModal__header__title">SCOREBOARD</div>
                        <div className="gameOverModal__header__closeIcon"></div>
                    </div>
                    <div className="gameOverModal__content">
                        <div className="gameOverModal__content__table">
                            {randomNameObject?.map((obj)=>(
                                <div className='gameOverModal__content__table__randomNameContainer'>
                                    <div>{obj.number}</div>
                                    <div className='gameOverModal__content__table__randomNameContainer__name'>{obj.name}</div>
                                    <div className='gameOverModal__content__table__randomNameContainer__score'>
                                        {obj?.first && <div className='gameOverModal__content__table__randomNameContainer__score__first'>HIGH SCORE :</div>}
                                        <div>{obj.score}</div>
                                    </div>


                                </div>
                            ))}
                        </div>
                        <div className="gameOverModal__content__result">
                            <div className="gameOverModal__content__result__skull">
                                <img src='/src/assets/skull-svgrepo-com.svg'/>
                            </div>
                            <div className="gameOverModal__content__result__text">
                                <div className="gameOverModal__content__result__text__top">TRY AGAIN</div>
                                <div className="gameOverModal__content__result__text__bottom">YOU SCORED : </div>
                            </div>
                            <div className="gameOverModal__content__result__totalScore">{state?.score}</div>
                        </div>
                        <div className="gameOverModal__content__backButton">
                            <button onClick={()=>setState(prev=>({...prev,gameOverModal:false}))}>BACK TO HOME</button>
                        </div>
                    </div>
                </div>
        </div>
    )
}