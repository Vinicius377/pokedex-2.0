import React, { useState } from "react";
import ListPoke from "./components/ListPoke";

// import { Container } from './styles';

const detailsPage = {
  totalPages: 0,
  countViewButtons: 5,
  viewButtons: (pageNumber) =>
    Array.from({ length: detailsPage.countViewButtons }).map((_, index) => {
      if (pageNumber + 1 < detailsPage.countViewButtons) {
        return index + 1;
      }
      const buttonContent = pageNumber + index - 2;

      if (pageNumber >= detailsPage.totalPages - 2) {
        return detailsPage.totalPages - (detailsPage.countViewButtons - index);
      }

      return buttonContent;
    }),
};

function App() {
  const [currentPage, setCurrentPage] = useState(1);
  const [buttons, setButtons] = useState([1, 2, 3, 4, 5]);

  const pagesNavegation = (number) => {
    if (number < 1 || number === detailsPage.totalPages) {
      return;
    }
    const viewButtons = detailsPage.viewButtons(number);
    setButtons(viewButtons);
    setCurrentPage(number);
  };
  const numberNavegation = (event) => {
    const page = parseInt(event.target.innerHTML);
    if (page >= detailsPage.totalPages) {
      return;
    }
    const viewButtons = detailsPage.viewButtons(page);

    setButtons(viewButtons);
    pagesNavegation(page);
  };

  return (
    <div className="App">
      <h1 className="title">{currentPage}</h1>
      <header className="controls">
        <button
          className="nextprev"
          onClick={() => pagesNavegation(currentPage - 1)}
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
          onClick={() => pagesNavegation(currentPage + 1)}
        >
          Next
        </button>
      </header>
      <ListPoke currentPage={currentPage} detailsPage={detailsPage} />
    </div>
  );
}

export default App;
