import { useEffect, useState } from "react/cjs/react.development";

const defaultValues = {
  countViewItens: 0,
  countViewButtons: 5,
  countItens: 0,
};
const detailsPage = {
  countItens: defaultValues.countItens,
  countViewButtons: defaultValues.countViewButtons,
  countViewItens: defaultValues.countViewItens,
  totalPages:
    Math.ceil(defaultValues.countItens / defaultValues.countViewItens) + 1,

  viewButtons: (pageNumber) => {
    const countPagesLeft = Math.floor(detailsPage.countViewButtons / 2);
    return Array.from({ length: detailsPage.countViewButtons }).map(
      (_, index) => {
        if (
          pageNumber + countPagesLeft < detailsPage.countViewButtons ||
          pageNumber < 1
        ) {
          return index + 1;
        }
        const buttonContent = pageNumber + index - countPagesLeft;

        if (pageNumber >= detailsPage.totalPages - countPagesLeft) {
          return (
            detailsPage.totalPages - (detailsPage.countViewButtons - index)
          );
        }
        return buttonContent;
      }
    );
  },
};

function useShowButtons(countViewButtons, countViewItens) {
  const buttonsDefault = Array.from({ length: countViewButtons }).map(
    (_, index) => index + 1
  );
  const [currentPage, setCurrentPage] = useState(1);
  const [buttonsArray, setButtonsArray] = useState(buttonsDefault);

  useEffect(() => {
    detailsPage.countViewItens = countViewItens;
    detailsPage.countViewButtons = countViewButtons;
  }, [countViewButtons, countViewItens]);

  useEffect(() => {
    const buttons = detailsPage.viewButtons(currentPage);

    setButtonsArray(buttons);
  }, [setCurrentPage, currentPage]);

  return [
    buttonsArray,
    setCurrentPage,
    { countItens: detailsPage.countItens, countViewItens },
  ];
}

export default useShowButtons;
