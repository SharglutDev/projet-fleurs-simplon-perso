import { list_products } from "../data";
import SideBar from "../components/SideBar";
import { useState } from "react";
import Searchbar from "../components/Searchbar";

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
const listePlantes: Plante[] = list_products;
let checkedCateg: string[] = [];
let searchPlant = "";

const Home = () => {
  const [listPlantDisplayed, setListPlantDisplayed] = useState<Plante[]>([
    ...listePlantes,
  ]);

  // TODO : pour plusieurs filtres, faire une master fonction qui fera le seul setListPlantDisplayed

  const handleCheckCategories = (mesCategoriesChecked: string[]) => {
    checkedCateg = [...mesCategoriesChecked];
    allFilter();
  };

  const handleSearch = (input: string) => {
    searchPlant = input;
    allFilter();
  };

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

    setListPlantDisplayed(resultFilteredPlants); // mettre à jour l'affichage de notre composant en fonction de la valeur de result
  };

  return (
    <div className="d-flex align-items-stretch">
      <SideBar
        listElementPlant={listePlantes}
        onChangeCategoriesCheck={handleCheckCategories}
      />
      <div>
        <Searchbar onChangeSearch={handleSearch} />
        <div className="container-fluid custom-main">
          {listPlantDisplayed.map((plante, i) => (
            <li key={i}>
              {plante.name} - {plante.category} - 💵 {plante.unitprice_ati}€ -
              ⭐{plante.rating}
            </li>
          ))}{" "}
        </div>
      </div>
    </div>
  );
};
export default Home;
