import React, { useState } from "react";
import ListPoke from "./components/ListPoke";
import useShowButtons from "./hooks/useShowButtons";

function App() {
  const [currentPage, setCurrentPage] = useState(1);
  const [buttons, setButtons, detailsPage] = useShowButtons(5, 42);

  const buttonsNavegation = (number) => {
    if (number < 1) return;
    setButtons(number);
    setCurrentPage(number);
  };

  const numberNavegation = (event) => {
    const page = parseInt(event.target.innerHTML);

    setButtons(page);
    buttonsNavegation(page);
  };

  return (
    <div className="App">
      <h1 className="title">{currentPage}</h1>
      <header className="controls">
        <button
          className="nextprev"
          onClick={() => buttonsNavegation(currentPage - 1)}
        >
          Prev
        </button>
        <div className="pages">
          {buttons.map((button) => (
            <button onClick={numberNavegation} key={button}>
              {button}
            </button>
          ))}
        </div>
        <button
          className="nextprev"
          onClick={() => buttonsNavegation(currentPage + 1)}
        >
          Next
        </button>
      </header>
      <ListPoke currentPage={currentPage} detailsPage={detailsPage} />
    </div>
  );
}

export default App;
