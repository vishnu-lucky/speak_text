// src/TextToSpeech.js

import React, { useState, useEffect } from "react";

const TextToSpeech = ({ text }) => {
  const [voiceCategory, setVoiceCategory] = useState("male");
  const [tone, setTone] = useState("tone1");
  const [voice, setVoice] = useState(null);
  const [rate, setRate] = useState(1);
  const [volume, setVolume] = useState(1);
  const [voices, setVoices] = useState([]);
  const [filteredVoices, setFilteredVoices] = useState([]);

  useEffect(() => {
    const synth = window.speechSynthesis;

    const loadVoices = () => {
      const availableVoices = synth.getVoices();
      setVoices(availableVoices);
      setVoice(availableVoices[0]); // Default to the first voice
    };

    loadVoices();
    synth.onvoiceschanged = loadVoices;

    return () => {
      synth.cancel();
    };
  }, []);

  useEffect(() => {
    // Filter voices based on selected category
    const filterVoicesByCategory = () => {
      let filtered;
      if (voiceCategory === "male") {
        filtered = voices.filter((v) => v.name.toLowerCase().includes("male") || v.gender === "male");
      } else if (voiceCategory === "female") {
        filtered = voices.filter((v) => v.name.toLowerCase().includes("female") || v.gender === "female");
      } else {
        filtered = voices;
      }
      setFilteredVoices(filtered);
      setVoice(filtered[0] || voices[0]);
    };

    filterVoicesByCategory();
  }, [voiceCategory, voices]);

  const handleSpeak = () => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.voice = voice;

    // Set different pitch or rate based on tone selection
    switch (tone) {
      case "tone1":
        utterance.pitch = 1;
        utterance.rate = rate;
        break;
      case "tone2":
        utterance.pitch = 0.8;
        utterance.rate = rate * 1.1;
        break;
      case "tone3":
        utterance.pitch = 1.2;
        utterance.rate = rate * 0.9;
        break;
      default:
        utterance.pitch = 1;
        utterance.rate = rate;
    }

    utterance.volume = volume;
    window.speechSynthesis.speak(utterance);
  };

  const handleVoiceCategoryChange = (event) => {
    setVoiceCategory(event.target.value);
  };

  const handleToneChange = (event) => {
    setTone(event.target.value);
  };

  return (
    <div>
      <label>
        Voice Category:
        <select value={voiceCategory} onChange={handleVoiceCategoryChange}>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
      </label>

      <label>
        Tone:
        <select value={tone} onChange={handleToneChange}>
          <option value="tone1">Tone 1</option>
          <option value="tone2">Tone 2</option>
          <option value="tone3">Tone 3</option>
        </select>
      </label>

      <label>
        Speed:
        <input
          type="range"
          min="0.5"
          max="2"
          step="0.1"
          value={rate}
          onChange={(e) => setRate(parseFloat(e.target.value))}
        />
      </label>

      <label>
        Volume:
        <input
          type="range"
          min="0"
          max="1"
          step="0.1"
          value={volume}
          onChange={(e) => setVolume(parseFloat(e.target.value))}
        />
      </label>

      {voice && (
        <button onClick={handleSpeak}>Speak</button>
      )}
    </div>
  );
};

export default TextToSpeech;
