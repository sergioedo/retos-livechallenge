import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlay, faStop, faRedo, faAlignCenter } from '@fortawesome/free-solid-svg-icons'
import FlipNumbers from 'react-flip-numbers'

const initialTime = 20

const containerStyle = {
    width: '100%',
    height: '100vh',
    background: '#f6f5f5',
    // border: '1px solid #2d2d2d',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontFamily: 'monospace'
}

const contentStyle = {
    color: '#fff',
    background: '#d3e0ea',
    borderRadius: '20px',
    padding: '24px',
    display: 'inline - block'
}

const titleStyle = {
    color: '#276678',
    marginTop: 0
}

const buttonStyle = {
    backgroundColor: '#1687a7',
    borderColor: '#276678',
    color: '#f6f5f5',
    borderRadius: '20px',
    padding: '8px',
    fontFamily: 'monospace',
    border: 'hidden'
}

const ButtonControl = ({ onClick, text, faIcon }) => {
    return (
        <button style={buttonStyle} onClick={onClick}>
            <FontAwesomeIcon icon={faIcon} />&nbsp;{text}
        </button>
    )
}

const App = () => {
    const [counter, setCounter] = useState(initialTime)
    const [intervalID, setIntervalID] = useState()

    if (counter <= 0) {
        clearInterval(intervalID) // paramos cuando llegue a 0
        // Party time!
        confetti.start()
    }

    const countDown = (decrement) => () => {
        setCounter(counter => {
            if (counter > 0) {
                return Number.parseFloat(counter - decrement).toFixed(3)
            }
            return counter
        })
    }

    const stopCountDown = (intervalID) => {
        clearInterval(intervalID)
        if (confetti.isRunning()) confetti.stop() // stop party :(
    }

    const startCountDown = (intervalID) => {
        if (intervalID) stopCountDown(intervalID)
        //activamos el timer para descontar 5ms, cada 5ms (máximo 4ms https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/setInterval#delay_restrictions)
        const timer = window.setInterval(countDown(0.005), 5)
        setIntervalID(timer)
        if (confetti.isPaused()) confetti.resume() // continue party :(
    }

    const resetCountDown = (intervalID) => {
        stopCountDown(intervalID)
        setCounter(initialTime)
        if (confetti.isRunning()) confetti.remove() // remove party :(
    }

    useEffect(() => {
        startCountDown()
        return () => {
            stopCountDown(intervalID) //liberamos el timer al desmontar el componente
        }
    }, [])

    return (
        <section style={containerStyle}>
            <div style={contentStyle}>
                <h1 style={titleStyle}>Malandriner CountDown</h1>
                <FlipNumbers height={24} width={24} color="#ffffff" background="#276678" play perspective={100} numbers={counter.toString()} />
                <br />
                <div style={{ textAlign: 'center' }}>
                    <ButtonControl onClick={() => startCountDown(intervalID)} text="PLAY" faIcon={faPlay} />&nbsp;&nbsp;
                    <ButtonControl onClick={() => stopCountDown(intervalID)} text="STOP" faIcon={faStop} />&nbsp;&nbsp;
                    <ButtonControl onClick={() => resetCountDown(intervalID)} text="RESET" faIcon={faRedo} />
                </div>
            </div>
        </section>
    )
}

ReactDOM.render(
    <App />,
    document.getElementById('app')
)