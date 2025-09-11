import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import HomePage from "./components/HomePage";
import Hero from "./components/Hero";
import WatchPage from "./components/WatchPage";

function App() {
  const [searchResults, setSearchResults] = useState([]);

  const handleSearchResults = (results) => {
    setSearchResults(results);
  };

  return (
    <Router>
      <div className="bg-slate-900 h-full">
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
            <Route path="/watch/:id" element={<WatchPage />} />
          </Routes>
        </Header>
      </div>
    </Router>
  );
}

export default App;
