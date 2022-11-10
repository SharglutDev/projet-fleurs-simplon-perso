// import { list_products } from "../data";
import SideBar from "../components/SideBar";
import { useEffect, useState } from "react";
import Searchbar from "../components/Searchbar";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar as fasStar } from "@fortawesome/free-solid-svg-icons";
import { faStar as farStar } from "@fortawesome/free-regular-svg-icons";
import {
  Button,
  Container,
  Row,
  Col,
  Card,
  DropdownButton,
  Dropdown,
} from "react-bootstrap";
import "./Home.css";
import LikeButton from "../components/LikeButton";

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
let priceSort: string = "";
let alphaSort: string = "";
let ratingSort: string = "";

const Home = () => {
  const [listPlantDisplayed, setListPlantDisplayed] = useState<Plante[]>([
    ...listePlantes,
  ]);

  useEffect(() => {
    const getPlants = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/v1/plants");
        listePlantes = response.data.data;
        setListPlantDisplayed(response.data.data);
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

  const handlePriceSort = (key: string | null) => {
    priceSort = key === "ascending" ? "priceAsc" : "priceDes";
    console.log(priceSort);
    allFilter();
  };

  const handleAlphaSort = (key: string | null) => {
    alphaSort = key === "ascending" ? "alphaAsc" : "alphaDes";
    console.log(alphaSort);
    allFilter();
  };

  const handleRatingSort = (key: string | null) => {
    ratingSort = key === "ascending" ? "ratingAsc" : "ratingDes";
    console.log(ratingSort);
    allFilter();
  };

  // TODO : gérer les filtres par un objet de recherche

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

    if (priceSort === "priceAsc") {
      resultFilteredPlants = resultFilteredPlants.sort(
        (a, b) => a.unitprice_ati - b.unitprice_ati
      );
    } else if (priceSort === "priceDes") {
      resultFilteredPlants = resultFilteredPlants.sort(
        (a, b) => b.unitprice_ati - a.unitprice_ati
      );
    }

    if (alphaSort === "alphaAsc") {
      resultFilteredPlants = resultFilteredPlants.sort((a, b) =>
        a.name.localeCompare(b.name)
      );
    } else if (alphaSort === "alphaDes") {
      resultFilteredPlants = resultFilteredPlants.sort((a, b) =>
        b.name.localeCompare(a.name)
      );
    }

    if (ratingSort === "ratingAsc") {
      resultFilteredPlants = resultFilteredPlants.sort(
        (a, b) => a.rating - b.rating
      );
    } else if (ratingSort === "ratingDes") {
      resultFilteredPlants = resultFilteredPlants.sort(
        (a, b) => b.rating - a.rating
      );
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
      <Container fluid className="d-flex flex-column mt-3 mx-3">
        <Searchbar onChangeSearch={handleSearch} />
        <div className="my-3">
          <span>Trier par : </span>
          <div className="d-flex mt-1">
            <DropdownButton
              variant="outline-success"
              className="me-2"
              title="Prix"
              id="sortByPrice"
              onSelect={handlePriceSort}
            >
              <Dropdown.Item eventKey="ascending">Tri croissant</Dropdown.Item>
              <Dropdown.Item eventKey="descending">
                Tri décroissant
              </Dropdown.Item>
            </DropdownButton>
            <DropdownButton
              variant="outline-success"
              className="me-2"
              title="Ordre Alpha"
              id="sortByChar"
              onSelect={handleAlphaSort}
            >
              <Dropdown.Item eventKey="ascending">Tri croissant</Dropdown.Item>
              <Dropdown.Item eventKey="descending">
                Tri décroissant
              </Dropdown.Item>
            </DropdownButton>
            <DropdownButton
              variant="outline-success"
              className="me-2"
              title="Avis"
              id="sortByRating"
              onSelect={handleRatingSort}
            >
              <Dropdown.Item eventKey="ascending">Tri croissant</Dropdown.Item>
              <Dropdown.Item eventKey="descending">
                Tri décroissant
              </Dropdown.Item>
            </DropdownButton>
          </div>
        </div>
        <div className="custom-main mt-3">
          <Row>
            {listPlantDisplayed.map((plante, i) => (
              <Col xs={6} xxl={4} key={plante.id} className="mb-5">
                <Card
                  className="position-relative pt-4"
                  style={{ width: "300px", height: "400px" }}
                >
                  <LikeButton />
                  <Card.Img
                    variant="top"
                    src={`http://localhost:8080/assets/${plante.url_picture}`}
                    alt="Plant"
                    style={{
                      width: "200px",
                      height: "200px",
                      marginInline: "auto",
                    }}
                  />
                  <Card.Body className="d-flex flex-column justify-content-between">
                    <Card.Title as="h5">{plante.name}</Card.Title>
                    <Card.Text>{plante.category}</Card.Text>
                    <span className="card-text">
                      {[...new Array(5)].map((item, index) => (
                        <FontAwesomeIcon
                          icon={plante.rating <= index ? farStar : fasStar}
                          color="rgb(245, 200, 66)"
                          size="lg"
                          key={index}
                        />
                      ))}
                    </span>
                    <div className="d-flex justify-content-between align-items-center">
                      <span>{plante.unitprice_ati} €</span>
                      <Button variant="success">Pour moi !</Button>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </div>
      </Container>
    </div>
  );
};
export default Home;
