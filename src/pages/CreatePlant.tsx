import { Button, FloatingLabel, Form } from "react-bootstrap";
import _ from "lodash";
import axios, { AxiosResponse } from "axios";
import { Plante } from "./Home";
import { FormEvent, useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar as fasStar } from "@fortawesome/free-solid-svg-icons";
import { faStar as farStar } from "@fortawesome/free-regular-svg-icons";

const CreatePlant = () => {
  const [plants, setPlants] = useState<Plante[]>([]);
  const [price, setPrice] = useState<number>(30);
  const [hoverRating, setHoverRating] = useState<number>(0);
  const [rating, setRating] = useState<number | undefined>();
  const [createMessage, setCreateMessage] = useState<string>("");

  const nameRef = useRef<HTMLInputElement>(null);
  const quantityRef = useRef<HTMLInputElement>(null);
  const categoryRef = useRef<HTMLSelectElement>(null);
  const imageRef = useRef<HTMLSelectElement>(null);

  useEffect(() => {
    const getAllPlants = async () => {
      const plants: AxiosResponse<{ data: Plante[] }> = await axios.get(
        "http://localhost:8080/api/v1/plants"
      );
      setPlants(plants.data.data);
    };
    getAllPlants();
  }, []);

  const categories = _.uniq(plants.map((plant) => plant.category));
  const images = _.uniq(plants.map((plant) => plant.url_picture));

  const handleStarIcon = (index: number) => {
    if (rating) {
      return index <= rating ? fasStar : farStar;
    } else {
      return index <= hoverRating ? fasStar : farStar;
    }
  };

  const createPlant = async () => {
    if (
      nameRef.current &&
      quantityRef.current &&
      categoryRef.current &&
      imageRef.current &&
      rating
    ) {
      const newPlant: Plante = {
        name: nameRef.current?.value,
        unitprice_ati: price,
        quantity: Number(quantityRef.current.value),
        category: categoryRef.current.value,
        rating: rating,
        url_picture: imageRef.current.value,
      };
      console.log(newPlant);
      try {
        const response = await axios.post(
          `http://localhost:8080/api/v1/plants`,
          newPlant
        );
        console.log(response);
        setCreateMessage(response.data.message);
      } catch (err) {
        let message: string;
        if (axios.isAxiosError(err) && err.response) {
          message = err.response.data.error;
        } else {
          message = `Unknown error : ${err}`;
        }
        setCreateMessage(message);
      }
      nameRef.current.value = "";
      setPrice(30);
      quantityRef.current.value = "";
      categoryRef.current.value = "";
      setHoverRating(0);
      setRating(undefined);
      imageRef.current.value = "";
    }
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    createPlant();
  };

  return (
    <div className="mx-auto" style={{ width: "500px" }}>
      <h1 className="text-center my-5">Add a Plant</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <FloatingLabel label="Name">
            <Form.Control
              ref={nameRef}
              type="text"
              placeholder="Enter name"
              onFocus={() => setCreateMessage("")}
              required
            />
          </FloatingLabel>
        </Form.Group>

        <Form.Group
          className="mb-3"
          controlId="formBasicPassword"
          style={{
            border: "1px solid #ced4da",
            borderRadius: "0.375rem",
            padding: "1rem 0.75rem",
          }}
        >
          <Form.Label>Price</Form.Label>
          <Form.Range
            min={1}
            max={60}
            defaultValue={30}
            onChange={(e) => setPrice(parseInt(e.currentTarget.value))}
            required
          />
          <Form.Text>{price} €</Form.Text>
        </Form.Group>

        <Form.Group className="mb-3">
          <FloatingLabel label="Quantity">
            <Form.Control
              ref={quantityRef}
              type="number"
              min={1}
              max={30}
              placeholder="Quantity"
              required
            />
          </FloatingLabel>
        </Form.Group>

        <Form.Group className="mb-3">
          <FloatingLabel label="Category">
            <Form.Select
              ref={categoryRef}
              aria-label="category selector"
              required
            >
              <option>Choose Category</option>
              {categories.map((category, index) => (
                <option key={index} value={category}>
                  {category}
                </option>
              ))}
            </Form.Select>
          </FloatingLabel>
        </Form.Group>

        <Form.Group
          className="mb-3"
          style={{
            border: "1px solid #ced4da",
            borderRadius: "0.375rem",
            padding: "1rem 0.75rem",
          }}
        >
          <Form.Label>Rating</Form.Label>
          <Form.Text as="div">
            {[...new Array(5)].map((item, index) => {
              index++;
              return (
                <FontAwesomeIcon
                  key={index}
                  icon={handleStarIcon(index)}
                  onMouseEnter={() => setHoverRating(index)}
                  onMouseLeave={() => setHoverRating(index - 1)}
                  onClick={() => setRating(index)}
                  color="rgb(245, 200, 66)"
                  size="xl"
                  style={{ cursor: "pointer" }}
                />
              );
            })}
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3">
          <FloatingLabel label="Image">
            <Form.Select
              ref={imageRef}
              aria-label="plants images selector"
              required
            >
              <option>Choose Plant Image</option>
              {images.map((image, index) => (
                <option key={index} value={image}>
                  {image}
                </option>
              ))}
            </Form.Select>
          </FloatingLabel>
        </Form.Group>
        <Button variant="primary" type="submit" className="mt-1">
          Submit
        </Button>
      </Form>
      {createMessage && (
        <div className="text-center mt-3 text-success">{createMessage}</div>
      )}
    </div>
  );
};

export default CreatePlant;
