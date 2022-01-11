import React from "react";
import { useEffect, useState } from "react/cjs/react.development";
import ImgNotFound from "./ImgNotFound";
import style from "./style.module.scss";
import { colors } from "./typesColors";

function CardPoke({ name, url }) {
  const [pokeDetails, setPokeDetails] = useState({
    id: 0,
    types: [],
    sprite: [],
  });
  useEffect(() => {
    fetch(url)
      .then((result) => result.json())
      .then((data) => {
        setPokeDetails({
          id: data.id,
          types: data.types.map((typeItem) => typeItem.type),
          sprite: data.sprites["front_default"] || data.sprites["front_shiny"],
        });
      });
  }, []);

  return (
    <div className={style.card}>
      <h1>{name}</h1>
      {pokeDetails.sprite ? (
        <img src={pokeDetails.sprite} width="100" />
      ) : (
        <ImgNotFound />
      )}
      <div className={style.container}>
        {pokeDetails &&
          pokeDetails.types.map((type) => (
            <div
              key={pokeDetails.id + type.name}
              style={{ backgroundColor: colors[type.name] }}
              className={style.type}
            >
              <span>{type.name}</span>
            </div>
          ))}
      </div>
    </div>
  );
}

export default CardPoke;
