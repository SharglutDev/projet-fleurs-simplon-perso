import { listePlantes } from "./Home";
import SideBar2 from "../components/SideBar2";
import { useState } from "react";

const Details = () => {
  const [affichageListParent, setAffichageListParent] = useState<string[]>([]);

  let listPlantesFiltree = [...listePlantes];

  if (affichageListParent.length > 0) {
    listPlantesFiltree = listPlantesFiltree.filter((planteObj) =>
      affichageListParent.includes(planteObj.category)
    ); // planteObj.category (string) - affichageListParent (tableau)
  }

  return (
    <div className="d-flex justify-content-around mt-5">
      <SideBar2
        onChangeCategoriesCheck={(mesFilters) =>
          setAffichageListParent(mesFilters)
        }
      />
      <ul>
        {listPlantesFiltree.map((planteObj) => (
          <li key={planteObj.id}>
            {planteObj.name} - {planteObj.category} - 💵{" "}
            {planteObj.unitprice_ati}€ - ⭐{planteObj.rating}
          </li>
        ))}
      </ul>
    </div>
  );
};
export default Details;
