import React, { useEffect } from "react";
import { useState } from "react/cjs/react.development";
import CardPoke from "../CardPoke";
import style from "./style.module.scss";

function ListPoke({ currentPage, detailsPage }) {
  const [listPoke, setListPoke] = useState();
  const [allPokemons, setAllPokemons] = useState([]);

  useEffect(() => {
    fetch("https://pokeapi.co/api/v2/pokemon?limit=1118")
      .then((result) => result.json())
      .then((data) => {
        detailsPage.countItens = data.count;
        setAllPokemons(data.results);
      });
  }, []);

  useEffect(() => {
    setListPoke(
      allPokemons.slice(
        detailsPage.countViewItens * (currentPage - 1),
        detailsPage.countViewItens * currentPage
      )
    );
  }, [currentPage, allPokemons, setListPoke]);

  return (
    <main className={style.list}>
      {listPoke &&
        listPoke.map((pokemon) => (
          <CardPoke name={pokemon.name} url={pokemon.url} key={pokemon.url} />
        ))}
    </main>
  );
}

export default ListPoke;
