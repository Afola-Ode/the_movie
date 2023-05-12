import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import arrow from "../images/arrow.jpg";

const FilmDetails = () => {
  const location = useLocation();
  const [film, setFilm] = useState(null);
  const [details, setDetails] = useState({
    characters: [],
    planets: [],
    species: [],
    starships: [],
    vehicles: [],
  });

  useEffect(() => {
    setFilm(location.state.film);
    fetchDetails(location.state.film.characters, "characters");
    fetchDetails(location.state.film.planets, "planets");
    fetchDetails(location.state.film.species, "species");
    fetchDetails(location.state.film.starships, "starships");
    fetchDetails(location.state.film.vehicles, "vehicles");
  }, [location.state.film]);

  async function fetchDetails(urls, type) {
    const promises = urls.map(async (url) => {
      const response = await fetch(url);
      const entity = await response.json();
      return entity;
    });

    const entityDetails = await Promise.all(promises);
    setDetails((prevState) => ({ ...prevState, [type]: entityDetails }));
  }

  if (!film) {
    return <div>Loading...</div>;
  }

  const entities = Object.entries(details);
  const columnsPerEntity = 3;

  return (
    <div className='inner-container'>
      <Link to='/' className='back'>
        <img src={arrow} alt='' /> <p>Back to list</p>
      </Link>
      <span className='heading'></span>
      <h1>{film.title}</h1>
      <p>Director: {film.director}</p>
      <p>Producer: {film.producer}</p>
      <section>
        <h2>Description</h2>
        <p>{film.opening_crawl}</p>
      </section>
      {entities.map(([entityType, entityData]) => (
        <section key={entityType}>
          <h2>{entityType.charAt(0).toUpperCase() + entityType.slice(1)}</h2>
          <ul>
            <div className='columns'>
              {Array.from({ length: columnsPerEntity }).map((_, index) => {
                const startEntityIndex = index * columnsPerEntity;
                const columnEntities = entityData.slice(
                  startEntityIndex,
                  startEntityIndex + columnsPerEntity
                );

                return (
                  <div className='column' key={index}>
                    <ul>
                      {columnEntities.map((entity) => (
                        <li key={entity.name}>{entity.name}</li>
                      ))}
                    </ul>
                  </div>
                );
              })}
            </div>
          </ul>
        </section>
      ))}
    </div>
  );
};

export default FilmDetails;
