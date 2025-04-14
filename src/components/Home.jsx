import React from 'react';
import './home.css';
import { useNavigate } from 'react-router';

export default function Home() {
  const nav = useNavigate();

  function navigation(e) {
    e.preventDefault();
    nav('/upload-photo');
  }

  return (
    <main className="homepage">
      <div className="content">
        <h1 className="title">Adaah</h1>
        <p className="subtitle">Created By. The Mody-ians.</p>
        <button className="cta" onClick={navigation}>Get Started</button>
      </div>
    </main>
  );
}


