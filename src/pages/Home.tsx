// import { list_products } from "../data";
import SideBar from "../components/SideBar";
import { useEffect, useState } from "react";
import Searchbar from "../components/Searchbar";
import axios from "axios";

export interface Plante {
  id: string;
  name: string;
  unitprice_ati: number;
  quantity: number;
  category: string;
  rating: number;
  url_picture: string;
}

/**
 * Ici les constantes ou variables dont la modification de valeur ne provoquera pas directement de re-render
 */
let listePlantes: Plante[] = [];
let checkedCateg: string[] = [];
let searchPlant = "";
let priceRange: number[] = [];
let sortFilter: string = "";

const Home = () => {
  const [listPlantDisplayed, setListPlantDisplayed] = useState<Plante[]>([
    ...listePlantes,
  ]);

  useEffect(() => {
    const getPlants = async () => {
      try {
        const response = await axios.get("http://localhost:3004/plants");
        listePlantes = response.data;
        setListPlantDisplayed(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    getPlants();
  }, []);

  /**
   * Fonctions qui récupèrent les states des filtres
   */

  const handleCheckCategories = (mesCategoriesChecked: string[]) => {
    checkedCateg = [...mesCategoriesChecked];
    allFilter();
  };

  const handleSearch = (input: string) => {
    searchPlant = input;
    allFilter();
  };

  const handlePriceFilter = (priceInputRange: number[]) => {
    priceRange = priceInputRange;
    allFilter();
  };

  const handlePriceSort = () => {
    sortFilter = "price";
    allFilter();
  };

  const handleAlphaSort = () => {
    sortFilter = "alpha";
    allFilter();
  };

  const handleRatingSort = () => {
    sortFilter = "rating";
    allFilter();
  };

  /**
   * Fonction principale
   */

  const allFilter = () => {
    let resultFilteredPlants: Plante[] = [...listePlantes];

    if (checkedCateg.length > 0) {
      resultFilteredPlants = resultFilteredPlants.filter((plant) =>
        checkedCateg.includes(plant.category)
      );
    }

    if (searchPlant.length > 0) {
      resultFilteredPlants = resultFilteredPlants.filter((plant) =>
        plant.name.toLocaleLowerCase().includes(searchPlant.toLocaleLowerCase())
      );
    }

    if (priceRange[1] > 0) {
      resultFilteredPlants = resultFilteredPlants.filter((plant) => {
        if (priceRange[0] > priceRange[1])
          priceRange = [priceRange[1], priceRange[0]];
        return (
          plant.unitprice_ati >= priceRange[0] &&
          plant.unitprice_ati <= priceRange[1]
        );
      });
    }

    switch (sortFilter) {
      case "price":
        resultFilteredPlants = resultFilteredPlants.sort(
          (a, b) => a.unitprice_ati - b.unitprice_ati
        );
        break;
      case "alpha":
        resultFilteredPlants = resultFilteredPlants.sort((a, b) =>
          a.name.localeCompare(b.name)
        );
        break;
      case "rating":
        resultFilteredPlants = resultFilteredPlants.sort(
          (a, b) => a.rating - b.rating
        );
        break;
    }

    setListPlantDisplayed(resultFilteredPlants);
  };

  return (
    <div className="d-flex align-items-stretch">
      <SideBar
        listElementPlant={listePlantes}
        onChangeCategoriesCheck={handleCheckCategories}
        onPriceClick={handlePriceFilter}
      />
      <div className="d-flex flex-column">
        <Searchbar onChangeSearch={handleSearch} />
        <div className="container">
          <span>Trier par : </span>
          <button
            className="btn btn-outline-success mx-1"
            onClick={handlePriceSort}
          >
            Prix
          </button>
          <button
            className="btn btn-outline-success mx-1"
            onClick={handleAlphaSort}
          >
            Ordre alpha
          </button>
          <button
            className="btn btn-outline-success mx-1"
            onClick={handleRatingSort}
          >
            Avis
          </button>
        </div>
        <div className="container-fluid custom-main">
          <div className="container">
            <div className="row">
              {listPlantDisplayed.map((plante, i) => (
                <div key={i} className="col-4 my-3">
                  <div
                    className="card"
                    style={{ width: "250px", height: "450px" }}
                  >
                    <img
                      className="card-img-top"
                      src={plante.url_picture}
                      alt="Plant"
                    />
                    <div className="card-body d-flex flex-column justify-content-between">
                      <h5 className="card-title">{plante.name}</h5>
                      <p className="card-text">{plante.rating} ⭐</p>
                      <div className="d-flex justify-content-around align-items-center">
                        <span>{plante.unitprice_ati} €</span>
                        <button className="btn btn-success">Pour moi !</button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Home;
