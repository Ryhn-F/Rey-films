import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import HomePage from "./components/HomePage";
import Hero from "./components/Hero";
import VideoPage from "./components/VideoPage";

function App() {
  const [searchResults, setSearchResults] = useState([]);

  const handleSearchResults = (results) => {
    setSearchResults(results);
  };

  return (
    <div className="bg-slate-900 h-full">
      <Router>
        <Header onSearchResults={handleSearchResults}>
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <Hero />
                  <HomePage searchResults={searchResults} />
                </>
              }
            />
            <Route path="/watch/:id" element={<VideoPage />} />
          </Routes>
        </Header>
      </Router>
    </div>
  );
}

export default App;
