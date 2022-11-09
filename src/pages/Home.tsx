// import { list_products } from "../data";
import SideBar from "../components/SideBar";
import { useEffect, useState } from "react";
import Searchbar from "../components/Searchbar";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faStar as fasStar,
  faHeart as fasHeart,
} from "@fortawesome/free-solid-svg-icons";
import {
  faStar as farStar,
  faHeart as farHeart,
} from "@fortawesome/free-regular-svg-icons";
import { Button, Container, Row, Col, Card } from "react-bootstrap";

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
      <Container fluid className="d-flex flex-column mt-3">
        <Searchbar onChangeSearch={handleSearch} />
        <div className="my-3">
          <span>Trier par : </span>
          <Button
            variant="outline-success"
            className="mx-1"
            onClick={handlePriceSort}
          >
            Prix
          </Button>
          <Button
            variant="outline-success"
            className="mx-1"
            onClick={handleAlphaSort}
          >
            Ordre alpha
          </Button>
          <Button
            variant="outline-success"
            className="mx-1"
            onClick={handleRatingSort}
          >
            Avis
          </Button>
        </div>
        <div className="custom-main">
          <Row>
            {listPlantDisplayed.map((plante, i) => (
              <Col xs={4} key={plante.id} className="gx-5 mb-5">
                <Card
                  className="position-relative"
                  style={{ width: "300px", height: "500px" }}
                >
                  <FontAwesomeIcon
                    icon={farHeart}
                    color="red"
                    size="lg"
                    style={{
                      position: "absolute",
                      top: "20px",
                      right: "20px",
                    }}
                  />
                  <Card.Img
                    variant="top"
                    src={plante.url_picture}
                    alt="Plant"
                  />
                  <Card.Body className="d-flex flex-column justify-content-between">
                    <Card.Title as="h5" className="card-title">
                      {plante.name}
                    </Card.Title>
                    <span className="card-text my-4">
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
                      <span className="fw-bold">{plante.unitprice_ati} €</span>
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
