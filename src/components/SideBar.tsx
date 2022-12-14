import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar as fasStar } from "@fortawesome/free-solid-svg-icons";
import { faStar as farStar } from "@fortawesome/free-regular-svg-icons";
import _ from "lodash";
import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { Plante } from "../pages/Home";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";

interface filterSideBarProps {
  listElementPlant: Plante[];
  onChangeCategoriesCheck: { (checkCategories: string[]): void };
  onPriceClick: { (priceFilter: number[]): void };
  onRatingClick: { (ratingFilter: number): void };
}

const SideBar = ({
  listElementPlant,
  onChangeCategoriesCheck,
  onPriceClick,
  onRatingClick,
}: filterSideBarProps) => {
  const categories = _.uniq(listElementPlant.map((plante) => plante.category));
  const [checkCategories, setCheckCategories] = useState<string[]>([]);
  const [minMax, setMinMax] = useState([0, 0]);
  let [min, max] = minMax;
  const [hoverRating, setHoverRating] = useState<number>(0);
  const [rating, setRating] = useState<number | undefined>();

  function handleCheck(e: React.ChangeEvent<HTMLInputElement>) {
    let tab: string[] = [];
    if (e.currentTarget.checked) {
      tab = [...checkCategories, e.currentTarget.value];
    } else {
      tab = [...checkCategories.filter((x) => x !== e.currentTarget.value)];
    }
    setCheckCategories(tab);
    onChangeCategoriesCheck(tab);
  }

  const handlePriceClick = () => {
    let priceTab: number[] = [...minMax];
    onPriceClick(priceTab);
  };

  const handleRatingClick = (index: number) => {
    setRating(index);
    onRatingClick(index);
  };

  const handleStarIcon = (index: number): IconDefinition => {
    if (rating) {
      return index <= rating ? fasStar : farStar;
    } else {
      return index <= hoverRating ? fasStar : farStar;
    }
  };

  return (
    <div className="custom-side-bar flex-shrink-0 bg-white border-end">
      <div className="p-3 border-bottom">
        <span className="fs-5 fw-semibold">Filtres</span>
      </div>
      <ul className="list-unstyled ps-0 border-bottom">
        <div className="p-3">
          <p className="mb-1 fs-5 fw-semibold">Cat??gories</p>
          {categories.map((cat, i) => (
            <div className="form-check" key={i}>
              <input
                className="form-check-input"
                type="checkbox"
                value={cat}
                id={cat}
                onChange={handleCheck}
              />
              <label className="form-check-label" htmlFor={cat}>
                {cat}
              </label>
            </div>
          ))}
        </div>
      </ul>
      <div className="p-3 border-bottom">
        <h3 className="mb-1 fs-5 fw-semibold">Prix</h3>
        <div>
          <input
            type="number"
            min={0}
            placeholder="min"
            style={{ width: "30%", marginRight: "30px" }}
            value={min}
            onChange={(e) => setMinMax([parseInt(e.currentTarget.value), max])}
          />
          <input
            type="number"
            min={0}
            placeholder="max"
            style={{ width: "30%" }}
            value={max}
            onChange={(e) => setMinMax([min, parseInt(e.currentTarget.value)])}
          />
        </div>
        <Button variant="success" className="mt-3" onClick={handlePriceClick}>
          Valider
        </Button>
      </div>
      <div className="p-3 border-bottom">
        <h3 className="mb-1 fs-5 fw-semibold">Avis</h3>
        <div onMouseLeave={() => setHoverRating(0)}>
          {[...new Array(5)].map((item, index) => {
            index++;
            return (
              <FontAwesomeIcon
                key={index}
                icon={handleStarIcon(index)}
                onMouseEnter={() => setHoverRating(index)}
                onMouseLeave={() => setHoverRating(index - 1)}
                onClick={() => handleRatingClick(index)}
                color="rgb(245, 200, 66)"
                size="lg"
                style={{ cursor: "pointer" }}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default SideBar;
