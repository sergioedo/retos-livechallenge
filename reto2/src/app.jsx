import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom'

const App = () => {
    const [counter, setCounter] = useState(20)
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

    useEffect(() => {
        //activamos el timer para descontar 5ms, cada 5ms (máximo 4ms https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/setInterval#delay_restrictions)
        const timer = window.setInterval(countDown(0.005), 5)
        setIntervalID(timer)

        return () => {
            clearInterval(intervalID) //liberamos el timer al desmontar el componente
        }
    }, [])
    return (
        <>
            <h1>Malandriner CountDown: {counter}s</h1>
        </>
    )
}

ReactDOM.render(
    <App />,
    document.getElementById('app')
)