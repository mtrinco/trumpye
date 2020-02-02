import React, { useState, useEffect } from 'react';
import './App.css';
import './components/Button.css';
import Button from './components/Button';
import trumpImg from "./assets/trump.jpg";
import kanyeImg from "./assets/kanye.jpeg";

function App() {

  const [quote, setQuote] = useState('');
  const [answer, setAnswer] = useState('');
  const [guess, setGuess] = useState('');
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

  function reset() {
    setGuess("");
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
                <button className="btn" onClick={() => setGuess("Trump")}>Trump</button>
                <button className="btn" onClick={() => setGuess("Kanye")}>Kanye</button>
              </div>
            </div>
            <div className="card-back">
              <div className="card-back--top">
                <div className={`card-back--circle ${guess}`}>
                  <div className="card-back--border" style={{ borderColor: guess === answer ? "#63B7AF" : "#C9485B" }}>
                    <img src={answer === "Trump" ? trumpImg : kanyeImg} />
                  </div>
                </div>
              </div>
              <div className="card-back--bottom">
                <p className="card-back--message">{ guess === answer ? `Correct!  It was ${answer}.` : `Wrong!  It was ${answer}.` }</p>
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
