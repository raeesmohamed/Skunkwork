import {useRef, useState} from 'react'
import './index.scss'
import ArrowIcon from '../../../public/assets/Selectarrow.svg'
import CloseIcon from '../../../public/assets/Close.svg'
import Logo from '../../../public/assets/SkynkworkLogo.png'
import { sendEmail } from './Components/Email'

const ContactUs = ({closePanel}:any)=>{

    const [state,setState] = useState({open:false,value:'',name:'',link:''})
    const ref = useRef(null)
    const submit = (e:any)=>{
        e.preventDefault()
        console.log('chalya')
        sendEmail(ref.current)
    }

    const handleChange = (e:any,type:string)=>{
        if(type==='name'){
            setState((prev)=>({...prev,name:e.target.value}))
        }
        else if(type==='link'){
            setState((prev)=>({...prev,link:e.target.value}))
        }
    }

    return (
        <div className="contactUs">
            <form ref={ref} onSubmit={submit}>
                <input type='hidden' name='workType' value={state?.value}></input>
            <div className='contactUs__logo' onClick={closePanel}><img src={Logo}/></div>
            <div className='contactUs__goBack' onClick={closePanel}><img src={CloseIcon}/></div>
            <div className='contactUs__content'>
                <div className='contactUs__content__container'>
                    <div className='contactUs__content__container__iAm'>
                        <div className="contactUs__content__container__iAm__title">I am</div>
                        <div className='contactUs__content__container__iAm__input'><input onChange={(e)=>handleChange(e,'name')} name='name' placeholder="your name" value={state?.name}/></div>
                    </div>
                    <div className='contactUs__content__container__lookingFor'>
                        <div className='contactUs__content__container__lookingFor__title'>looking for &nbsp;</div>
                        <div className='contactUs__content__container__lookingFor__button' onClick={()=>setState(prev=>({...prev,open:!prev?.open}))}>{state?.value}</div>
                        {state?.open ?
                            <div className='contactUs__content__container__lookingFor__popup'>
                                <div onClick={()=>setState((prev)=>({...prev,value:'a job',open:!prev.open}))} className={`contactUs__content__container__lookingFor__popup__job ${state?.value==='a job' ?'selected':''}`}>a job</div>
                                <div onClick={()=>setState((prev)=>({...prev,value:'Freelance gig',open:!prev.open}))} className={`contactUs__content__container__lookingFor__popup__freelance ${state?.value!=='a job' ?'selected':''}`}>Freelance gig</div>
                            </div>
                            :
                            <div className='contactUs__content__container__lookingFor__content'>
                                <img src={ArrowIcon}/>
                                <div className='contactUs__content__container__lookingFor__content__title'>click here to change</div>
                            </div>
                        }

                    </div>
                    <div className='contactUs__content__container__myPortfolio'>
                        <div className='contactUs__content__container__myPortfolio__title'>my portfolio</div>
                        <div className='contactUs__content__container__myPortfolio__input'><input onChange={(e)=>handleChange(e,'link')} name='link' placeholder="your portfolio link" value={state?.link}/></div>
                    </div>
                    <div>
                        <div ><button className='submtButton' type='submit'>Submit</button></div>
                    </div>
                </div>

            </div>
            <div className='contactUs__email'>theskunk@skunkworks.studio</div>
            </form>
        </div>
    )
}
export default ContactUs