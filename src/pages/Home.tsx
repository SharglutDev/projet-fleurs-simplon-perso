import { list_products } from "../data";
import SideBar from "../components/SideBar";
import { useState } from "react";

export interface Plante {
  id: string;
  name: string;
  unitprice_ati: number;
  quantity: number;
  category: string;
  rating: number;
  url_picture: string;
}

export const listePlantes: Plante[] = list_products;

const Home = () => {
  const [selectCategories, setSelectCategories] = useState<string[]>([]);
  let results = [...listePlantes];

  if (selectCategories.length > 0) {
    results = results.filter((x) => selectCategories.includes(x.category));
  }

  return (
    <div className="d-flex align-items-stretch">
      <SideBar
        listElementPlant={listePlantes}
        onChangeCategoriesCheck={(mesDataCheck) =>
          setSelectCategories(mesDataCheck)
        }
      />
      <div className="container-fluid custom-main">
        {results.map((plante) => (
          <li>
            {plante.name} - {plante.category} - 💵 {plante.unitprice_ati}€ - ⭐
            {plante.rating}
          </li>
        ))}{" "}
      </div>
    </div>
  );
};
export default Home;
