import React, { useRef, useState, useEffect } from "react";
import RadioPlayer from "./RadioPlayer";
import './App.css';

const stations = [
  { name: "RRADIO PARADISE", url: "https://stream.radioparadise.com/mp3-128" },
  { name: "JAZZ RADIO", url: "https://live.wostreaming.net/direct/ppm-jazz24mp3-ibc1" },
  { name: "BBC", url: "http://bbcmedia.ic.llnwd.net/stream/bbcmedia_radio4fm_mf_p" },
]

function App() {
  const [currentStation, setCurrentStation] = useState(stations[0])
  const [isPlaying,setIsPlaying]=useState(false)
  const [currentTime, setCurrentTime] = useState(new Date());
  const audioRef = useRef(null)
  const [location, setLocation] = useState(null);
const [volume, setVolume] = useState(0.5);




  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    audioRef.current=new Audio(currentStation.url)
    return () => clearInterval(timer);
  }, []);

  const togglePlay = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.src = currentStation.url;
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const changeStation = (station) => {
    setCurrentStation(station);
    audioRef.current.src = station.url;
    if (isPlaying) {
      audioRef.current.play();
    }
  };



  const handleVolumeChange = (event) => {
    const newVolume = parseFloat(event.target.value) / 100;
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
  };

  

  return (
    <div className="app">
      <header className="header">
        <h1>Internetowe Radio</h1>
        <p className="time-display">
          {currentTime.toLocaleDateString()} {currentTime.toLocaleTimeString()}
        </p>
      </header>

      <main className="main-content">
        <div className="radio-player">
          <h2>{currentStation.name}</h2>
          <button onClick={togglePlay}>
            {isPlaying ? "Pauza" : "Odtwórz"}
          </button>
          <input type="range" min="0" max="100"  onChange={handleVolumeChange} />
          <div className="station-list">
            {stations.map((station, index) => (
              <button
                key={index}
                className={`station-btn ${
                  station.name === currentStation.name ? "active" : ""
                }`}
                onClick={() => changeStation(station)}
              >
                {station.name}
              </button>
            ))}
          </div>
        </div>
      </main>

      <footer className="footer">
        <p>Internetowe Radio © 2025</p>
      </footer>
    </div>
  );
}

export default App;