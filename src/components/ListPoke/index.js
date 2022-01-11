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
        detailsPage.totalPages = Math.ceil(data.count / 42) + 1;
        setAllPokemons(data.results);
      });
  }, []);

  useEffect(() => {
    setListPoke(allPokemons.slice(42 * (currentPage - 1), 42 * currentPage));
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
