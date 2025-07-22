import { useState } from "react";
import "./App.css";
import Header from "./components/Header";
import HomePage from "./components/HomePage";
import Hero from "./components/Hero";

function App() {
  const [searchResults, setSearchResults] = useState([]);

  const handleSearchResults = (results) => {
    setSearchResults(results);
  };

  return (
    <div className=" bg-slate-900 h-full">
      <Header onSearchResults={handleSearchResults}>
        <Hero />
        <HomePage searchResults={searchResults} />
      </Header>
    </div>
  );
}

export default App;
