import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom'

const App = () => {
    const [counter, setCounter] = useState(20)
    const [intervalID, setIntervalID] = useState()

    const countDown = () => {
        setCounter(counter => {
            if (counter > 0) {
                return counter - 1
            }
            return counter
        })
    }

    useEffect(() => {
        const timer = window.setInterval(countDown, 1000)  //activamos el timer para descontar 1, cada 1s
        setIntervalID(timer) //activamos el timer, cada 1s

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