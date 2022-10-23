import { listePlantes } from "../pages/Home";
import _ from "lodash";
import { useState } from "react";

interface filterProps {
  onChangeCategoriesCheck: { (affichageList: string[]): void };
}

const SideBar2 = ({ onChangeCategoriesCheck }: filterProps) => {
  const [affichageList, setAffichageList] = useState<string[]>([]);

  const handleClick = (e: React.ChangeEvent<HTMLInputElement>) => {
    let copieTamponAffichageList: string[] = [];
    if (e.target.checked === true) {
      copieTamponAffichageList = [...affichageList, e.target.value];
    } else {
      copieTamponAffichageList = [
        ...affichageList.filter((category) => category !== e.target.value),
      ];
    }

    setAffichageList(copieTamponAffichageList);
    console.log(copieTamponAffichageList);
    onChangeCategoriesCheck(copieTamponAffichageList);
  };

  const elementCategory: string[] = _.uniq(
    listePlantes.map((planteObj) => planteObj.category)
  );

  return (
    <div className="border-end">
      <h1 className="border-bottom">Filtres</h1>
      <span>Catégories</span>
      {elementCategory.map((category, index) => (
        <div key={`${category}-${index}`} className="d-flex align-items-center">
          <input type="checkbox" value={category} onChange={handleClick} />
          <label className="mx-3">{category}</label>
        </div>
      ))}
    </div>
  );
};

export default SideBar2;
