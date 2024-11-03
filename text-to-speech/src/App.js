
import React, { useState } from 'react';
import TextToSpeech from './TextToSpeech';

function App() {
  const [text, setText] = useState("");

  const handleTextChange = (event) => {
    setText(event.target.value);
  };

  return (
    <div className="App">
      
      <textarea
        value={text}
        onChange={handleTextChange}
        placeholder="Enter text here..."
        rows="4"
        cols="50"
      />
      <TextToSpeech text={text} />
    </div>
  );
}

export default App;
