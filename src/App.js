import React, { useState, useEffect } from 'react';
import './App.css';
import trumpImg from "./assets/trump.jpg";
import kanyeImg from "./assets/kanye.jpeg";

function App() {

  const [quote, setQuote] = useState('');
  const [answer, setAnswer] = useState('');
  const [guess, setGuess] = useState('');
  const [hex, setHex] = useState('');
  const [text, setText] = useState('');
  const [loaded, setLoaded] = useState(false);

  const trump = "https://api.whatdoestrumpthink.com/api/v1/quotes/random";
  const kanye = "https://api.kanye.rest/";

  function randInt() {
    return Math.floor(Math.random() * Math.floor(2));
  }

  const fetchData = async () => {
    setLoaded(false);
    const rand = randInt();
    const response = await fetch(rand === 0 ? trump : kanye);
    const data = await response.json();
    setQuote(rand === 0 ? data.message : data.quote);
    setAnswer(rand === 0 ? "Trump" : "Kanye");
    setLoaded(true);
  }

  useEffect(() => {
    fetchData();
  }, []);

  function handleClick(res) {
    setGuess(res);
    setHex(res === answer ? "#63B7AF" : "#C9485B");
    setText(res === answer ? "Correct" : "Wrong");
  }

  function reset() {
    setGuess("reset");
    fetchData();
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1 className="App-title">TrumpYe</h1>
        <p className="App-subtitle">Guess who the quote belongs to</p>
      </header>
      <section className="quote-container">
        {loaded ? (
          <p className="quote">"{quote}"</p>
        ) : (
          <p className="quote">LOADING...</p>
        )}
      </section>
      <section className="card-container">
        <div className="card">
          <div className={`card-inner ${guess}`}>
            <div className="card-front">
              <div className="card-front--top">
                <div className="card-front--circle">
                  <p className="card-front--unknown">?</p>
                </div>
              </div>
              <div className="card-front--bottom">
                <button className="btn" onClick={() => handleClick("Trump")}>Trump</button>
                <button className="btn" onClick={() => handleClick("Kanye")}>Kanye</button>
              </div>
            </div>
            <div className="card-back">
              <div className="card-back--top">
                <img src={answer === "Trump" ? trumpImg : kanyeImg} alt={answer === "Trump" ? "Trump" : "Kanye"} />
              </div>
              <div className="card-back--bottom" style={{ backgroundColor: hex }}>
                <p className="card-back--message">{ `${text}!  It was ${answer}.` }</p>
                <button className="btn" onClick={() => reset()}>Next</button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default App;
