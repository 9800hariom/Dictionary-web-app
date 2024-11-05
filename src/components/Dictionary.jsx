// src/components/Dictionary.jsx
import React, { useState } from 'react';
import SearchBar from './SearchBar';
import './Dictionary.css';

const Dictionary = () => {
  const [word, setWord] = useState('');
  const [definition, setDefinition] = useState(null);
  const [error, setError] = useState(null);
  const [phonetics, setPhonetics] = useState(null);
  const [synonyms, setSynonyms] = useState([]);
  const [audio, setAudio] = useState(null);

  const fetchDefinition = async (searchWord) => {
    try {
      const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${searchWord}`);
      if (!response.ok) throw new Error("Word not found");
      const data = await response.json();

      setDefinition(data[0].meanings);
      setPhonetics(data[0].phonetics[0].text);
      setAudio(data[0].phonetics[0].audio);
      setSynonyms(data[0].meanings[0].definitions[0].synonyms || []);
      setError(null);
    } catch (err) {
      setError(err.message);
      setDefinition(null);
      setPhonetics(null);
      setAudio(null);
      setSynonyms([]);
    }
  };

  const handleSearch = (input) => {
    setWord(input);
    fetchDefinition(input);
  };

  return (
    <div className="dictionary-container">
      <h1>Dictionary App</h1>
      <SearchBar onSearch={handleSearch} />
      {error && <p className="error">{error}</p>}
      {definition && (
        <div className="definition-container">
          <h1>{word}</h1>
          {phonetics && <p className="phonetics">/{phonetics}/</p>}
          {audio && (
            <button onClick={() => new Audio(audio).play()} className="audio-button">
              🔊
            </button>
          )}
          {definition.map((meaning, index) => (
            <div key={index} className="meaning-section">
              <p className="part-of-speech">{meaning.partOfSpeech}      ----------------------------------------------------------------------</p> 
              
              <h3>Meaning</h3>
              <ul>
                {meaning.definitions.map((def, i) => (
                  <li key={i}>{def.definition}</li>
                ))}
              </ul>
              {synonyms.length > 0 && (
                <div className="synonyms">
                  <h4>Synonyms</h4>
                  {synonyms.map((synonym, i) => (
                    <span key={i} className="synonym">{synonym}</span>
                  ))}
                </div>
              )}
            </div>
          ))}
          <p className="source">
            Source: <a href={`https://en.wiktionary.org/wiki/${word}`} target="_blank" rel="noopener noreferrer">
              https://en.wiktionary.org/wiki/{word}
            </a>
          </p>
        </div>
      )}
    </div>
  );
};

export default Dictionary;
