import { useEffect, useRef } from 'react';
import './index.scss';
import { imagePaths } from './CustomHooksAndFunction';

interface GameProps {
    state: {
        counter: number;
        score: number;
        gamepopupOpen: boolean;
        gameOverModal: boolean;
    };
    setState: React.Dispatch<React.SetStateAction<{
        counter: number;
        score: number;
        gamepopupOpen: boolean;
        gameOverModal: boolean;
    }>>;
}

class RandomObjectMover {
    private isRunning = false;
    private lastTimestamp: number = performance.now();
    private animationFrameId?: number;
    private speedFactor: number;

    constructor(public $object: HTMLElement, public $container: HTMLElement) {
        this.speedFactor = 0.5 + Math.random() * 1.5; // Random speed factor between 0.5x to 2x
        this.respawn();
    }

    current_position = { x: 0, y: 0 };
    velocity = { x: 0, y: 0 };

    private respawn() {
        const containerSize = { width: this.$container.clientWidth, height: this.$container.clientHeight };
        const objSize = { width: this.$object.clientWidth, height: this.$object.clientHeight };

        this.current_position = {
            x: Math.random() * (containerSize.width - objSize.width),
            y: Math.random() * (containerSize.height - objSize.height),
        };
        this.velocity = {
            x: (Math.random() > 0.5 ? 1 : -1) * this.speedFactor * (3 + Math.random() * 3),
            y: (Math.random() > 0.5 ? 1 : -1) * this.speedFactor * (3 + Math.random() * 3),
        };

        this.$object.style.transform = `translate3d(${this.current_position.x}px, ${this.current_position.y}px, 0)`;
    }

    private _updatePosition = (timestamp: number) => {
        if (!this.isRunning || !document.body.contains(this.$object)) return;

        const deltaTime = (timestamp - this.lastTimestamp) / 16;
        this.lastTimestamp = timestamp;

        const containerSize = { width: this.$container.clientWidth, height: this.$container.clientHeight };
        const objSize = { width: this.$object.clientWidth, height: this.$object.clientHeight };

        let nextX = this.current_position.x + this.velocity.x * deltaTime;
        let nextY = this.current_position.y + this.velocity.y * deltaTime;

        if (nextX < 0 || nextX + objSize.width > containerSize.width) {
            this.velocity.x *= -1;
            nextX = this.current_position.x + this.velocity.x * deltaTime;
        }
        if (nextY < 0 || nextY + objSize.height > containerSize.height) {
            this.velocity.y *= -1;
            nextY = this.current_position.y + this.velocity.y * deltaTime;
        }

        this.current_position = { x: nextX, y: nextY };
        this.$object.style.transform = `translate3d(${nextX}px, ${nextY}px, 0)`;

        this.animationFrameId = requestAnimationFrame(this._updatePosition);
    };

    start() {
        if (this.isRunning) return;
        this.isRunning = true;
        this.animationFrameId = requestAnimationFrame(this._updatePosition);
    }

    stop() {
        this.isRunning = false;
        if (this.animationFrameId) cancelAnimationFrame(this.animationFrameId);
    }

    moveToRandomPosition() {
        this.respawn();
    }
}

// class RandomObjectMover {
//     private isRunning = false;
//     private lastTimestamp: number = performance.now();
//     private animationFrameId?: number;
//     private speedFactor: number;
//     private timeouts: NodeJS.Timeout[] = [];

//     constructor(public $object: HTMLElement, public $container: HTMLElement) {
//         this.respawn();
//     }

//     current_position = { x: 0, y: 0 };
//     velocity = { x: 0, y: 0 };

//     private respawn() {
//         this.clearTimers(); // Clear existing timers

//         // **Step 1: Each object starts with a random speed factor between 2.0 and 3.5**
//         this.speedFactor = 2.0 + Math.random() * 1.5;

//         const containerSize = { width: this.$container.clientWidth, height: this.$container.clientHeight };
//         const objSize = { width: this.$object.clientWidth, height: this.$object.clientHeight };

//         this.current_position = {
//             x: Math.random() * (containerSize.width - objSize.width),
//             y: Math.random() * (containerSize.height - objSize.height),
//         };
//         this.velocity = {
//             x: (Math.random() > 0.5 ? 1 : -1) * this.speedFactor * 3,
//             y: (Math.random() > 0.5 ? 1 : -1) * this.speedFactor * 3,
//         };

//         this.$object.style.transform = `translate3d(${this.current_position.x}px, ${this.current_position.y}px, 0)`;

//         // **Step 2: Reduce speed after 2 seconds**
//         this.timeouts.push(
//             setTimeout(() => {
//                 this.speedFactor *= 0.6; // Reduce speed
//                 this.velocity.x *= 0.6;
//                 this.velocity.y *= 0.6;
//             }, 2000)
//         );

//         // **Step 3: Reduce speed after 3 more seconds (5s total)**
//         this.timeouts.push(
//             setTimeout(() => {
//                 this.speedFactor *= 0.5; // Slowest speed
//                 this.velocity.x *= 0.5;
//                 this.velocity.y *= 0.5;
//             }, 5000)
//         );
//     }

//     private _updatePosition = (timestamp: number) => {
//         if (!this.isRunning || !document.body.contains(this.$object)) return;

//         const deltaTime = (timestamp - this.lastTimestamp) / 16;
//         this.lastTimestamp = timestamp;

//         const containerSize = { width: this.$container.clientWidth, height: this.$container.clientHeight };
//         const objSize = { width: this.$object.clientWidth, height: this.$object.clientHeight };

//         let nextX = this.current_position.x + this.velocity.x * deltaTime;
//         let nextY = this.current_position.y + this.velocity.y * deltaTime;

//         if (nextX < 0 || nextX + objSize.width > containerSize.width) {
//             this.velocity.x *= -1;
//             nextX = this.current_position.x + this.velocity.x * deltaTime;
//         }
//         if (nextY < 0 || nextY + objSize.height > containerSize.height) {
//             this.velocity.y *= -1;
//             nextY = this.current_position.y + this.velocity.y * deltaTime;
//         }

//         this.current_position = { x: nextX, y: nextY };
//         this.$object.style.transform = `translate3d(${nextX}px, ${nextY}px, 0)`;

//         this.animationFrameId = requestAnimationFrame(this._updatePosition);
//     };

//     start() {
//         if (this.isRunning) return;
//         this.isRunning = true;
//         this.animationFrameId = requestAnimationFrame(this._updatePosition);
//     }

//     stop() {
//         this.isRunning = false;
//         if (this.animationFrameId) cancelAnimationFrame(this.animationFrameId);
//         this.clearTimers();
//     }

//     moveToRandomPosition() {
//         this.respawn(); 
//     }

//     private clearTimers() {
//         this.timeouts.forEach(clearTimeout);
//         this.timeouts = [];
//     }
// }
export const Game = ({ state, setState }: GameProps) => {
    const activeImages = imagePaths
    const containerRef = useRef<HTMLDivElement | null>(null);
    const moversRef = useRef<Map<number, RandomObjectMover>>(new Map());
    const audio = new Audio('/public/assets/Shoot.wav')
    const backgroundAudio = new Audio('/public/assets/backgroundSong.mp3')
    useEffect(() => {

        if (!state?.gamepopupOpen) return;
        backgroundAudio.play()
        const container = containerRef.current;
        if (!container) return;

        moversRef.current.forEach((mover) => mover.stop());
        moversRef.current.clear();

        activeImages.forEach((_, index) => {
            const imgElement = document.getElementById(`img-${index}`);
            if (imgElement) {
                const mover = new RandomObjectMover(imgElement, container);
                moversRef.current.set(index, mover);
                mover.start();
            }
        });

        return () => {
            moversRef.current.forEach((mover) => mover.stop());
            backgroundAudio.pause()
        };
    }, [state?.gamepopupOpen]);

    const moveImageToRandomPosition = (index: number) => {
        setState((prev) => ({ ...prev, score: prev.score + 1 })); // Increase score
        audio.play()
        const mover = moversRef.current.get(index);
        if (mover) {
            mover.moveToRandomPosition(); // Move image instantly to a new position
        }
    };

          useEffect(()=>{
        let map = setInterval(()=>{
            setState((prev)=>({...prev,counter:prev.counter-1}))
        },1000)
        return ()=>clearInterval(map)
      },[state?.gamepopupOpen])

      useEffect(()=>{
        if(state.counter===0){
            setState((prev)=>({...prev,counter:30,gameOverModal:true,gamepopupOpen:false}))
        }
      },[state.counter])
    return (
        <div className="gameContainer">
            <div className="box">
                <div className="randomImageContainer" ref={containerRef}>
                    {activeImages.map((src, index) => (
                        <img
                            key={index}
                            id={`img-${index}`}
                            src={src}
                            alt={`Image ${index + 1}`}
                            className="movingImg"
                            onClick={() => moveImageToRandomPosition(index)}
                        />
                    ))}
                </div>
                <div className="bottomContainer">
                    <div className="timer">
                        <div className="timer__title">Time</div>
                        <div className="timer__value">{state.counter}</div>
                    </div>
                    <div className="score">
                        <div className="score__title">Score</div>
                        <div className="score__value">{state.score}</div>
                    </div>
                    <div className="button">
                        <button onClick={() => setState((prev) => ({ ...prev, gamepopupOpen: false }))}>
                            Quit
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};