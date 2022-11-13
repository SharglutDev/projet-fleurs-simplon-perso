import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faStar as fasStar,
  faPenToSquare,
  faTrashCan,
} from "@fortawesome/free-solid-svg-icons";
import { faStar as farStar } from "@fortawesome/free-regular-svg-icons";
import axios, { AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import { Button, Card, Container } from "react-bootstrap";
import { useParams } from "react-router-dom";
import LikeButton from "../components/LikeButton";
import { Plante } from "./Home";

const Details = () => {
  const [plant, setPlant] = useState<Plante | undefined>();
  const { id } = useParams();

  useEffect(() => {
    const getPlantById = async () => {
      const plant: AxiosResponse<{ data: Plante[] }> = await axios.get(
        `http://localhost:8080/api/v1/plants/${id}`
      );
      setPlant(plant.data.data[0]);
    };
    getPlantById();
  }, [id]);

  return (
    <Container className="mt-5">
      <Card
        className="position-relative pt-4 mx-auto"
        style={{ width: "300px", height: "400px" }}
      >
        <LikeButton />
        <Card.Img
          variant="top"
          src={`http://localhost:8080/assets/${plant?.url_picture}`}
          alt="Plant"
          style={{
            width: "200px",
            height: "200px",
            marginInline: "auto",
          }}
        />
        <Card.Body className="d-flex flex-column justify-content-between">
          <Card.Title as="h5">{plant?.name}</Card.Title>
          <Card.Text>{plant?.category}</Card.Text>
          <span className="card-text">
            {[...new Array(5)].map((item, index) => (
              <FontAwesomeIcon
                icon={plant && plant?.rating <= index ? farStar : fasStar}
                color="rgb(245, 200, 66)"
                size="lg"
                key={index}
              />
            ))}
          </span>
          <div className="d-flex justify-content-between align-items-center">
            <span>{plant?.unitprice_ati} €</span>
            <Button variant="success">Pour moi !</Button>
          </div>
        </Card.Body>
      </Card>
      <div
        className="mt-4 m-auto px-4 d-flex justify-content-between"
        style={{ width: "300px", height: "400px" }}
      >
        <FontAwesomeIcon icon={faPenToSquare} color="green" size="2x" />
        <FontAwesomeIcon icon={faTrashCan} color="red" size="2x" />
      </div>
    </Container>
  );
};
export default Details;
