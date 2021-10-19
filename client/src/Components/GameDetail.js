import { React, useEffect } from "react";
import { getGameById } from "../Redux/actions/videogame";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import "./Styles/GameDetailStyle.css";

import Slider from "react-animated-slider";
import "react-animated-slider/build/horizontal.css";

export default function GameDetail({ id }) {
  const dispatch = useDispatch();
  const searchById = useSelector(({ searchById }) => searchById);
  const videogames = useSelector(({ videogames }) => videogames);
  const images = videogames.filter((el) => {
    return el.id === searchById.id;
  });

  useEffect(() => {
    dispatch(getGameById(id));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  return (
    <div className="detail_container">
      <div className="back">
        <Link to="/Home">
          <button>Go Home</button>
        </Link>
      </div>
      {searchById?.id ? (
        <div className="detail_card">
          {images[0]?.short_screenshots ? (
            <Slider autoplay={1500}>
              {images[0]?.short_screenshots.map((el) => (
                <img key={el.id} src={el.image} alt={el.description} />
              ))}
            </Slider>
          ): searchById.background_image ? (
            <img src={searchById.background_image} alt={searchById.id} />
          ): <p>Opsss! This game don´t have a</p>}
          <div className="detail_game">
            <h2>{searchById.name}</h2>
            <div>
              <strong>Platforms: </strong>
              {searchById?.platforms.map((p) => {
                return <li key={p.id}>{p.name}</li>;
              })}
            </div>
            <div>
              <strong>Genres: </strong>
              {searchById?.genres.map((g) => {
                return <li key={g.id}>{g.name}</li>;
              })}
            </div>
            <p>
              <strong>Released Date: </strong>
              {searchById.released}
            </p>
            <p>
              <strong>Rating: </strong> {searchById.rating}
            </p>
            <br />
            <div dangerouslySetInnerHTML={{ __html: searchById.description }} />
          </div>
        </div>
      ) : (
        <div className="loading">Loading...</div>
      )}
      <div className="back">
        <Link to="/Home">
          <button>Go Home</button>
        </Link>
      </div>
    </div>
  );
}