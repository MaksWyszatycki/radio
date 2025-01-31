import React, {useState, useRef, useEffect} from "react";

const RadioPlayer = () => {
    const [isPlaying, setIsPlaying] = useState(false)
    const [currentDateTime, setCurrentDateTime] = useState(new Date())
    const audioRef = useRef(null)

    useEffect(() => {
        audioRef.current = new Audio('http://redir.atmcdn.pl/sc/o2/Eurozet/live/antyradio.livx')
        audioRef.current.preload ='none'

        const timer = setInterval(() => (
            setCurrentDateTime(new Date())
        ), 1000)
        return () => clearInterval(timer)
}, [])

const togglePlayPause = () => {
    if (isPlaying){
        audioRef.current.pause()
    } else {
        audioRef.current.play()
    }
    setIsPlaying(!isPlaying)
}
return(
    <div className="radio-player">
        <h2>Odtwarzacz AntyRadio</h2>
        <button onClick={togglePlayPause}>
            {isPlaying ? 'Pauza': 'Odtwórz' }
        </button>
        <div className="date-time">
            <p>Data: {currentDateTime.toLocaleDateString()}</p>
            <p>Godzina: {currentDateTime.toLocaleTimeString()}</p>
        </div>
    </div>
)
}

export default RadioPlayer