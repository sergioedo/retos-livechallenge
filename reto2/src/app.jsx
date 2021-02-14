import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom'

const initialTime = 3

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
        <>
            <h1>Malandriner CountDown: {counter}s</h1>
            <button onClick={() => startCountDown(intervalID)}>START</button>&nbsp;&nbsp;
            <button onClick={() => stopCountDown(intervalID)}>STOP</button>&nbsp;&nbsp;
            <button onClick={() => resetCountDown(intervalID)}>RESET</button>
        </>
    )
}

ReactDOM.render(
    <App />,
    document.getElementById('app')
)