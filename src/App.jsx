import { useState, useEffect } from "react";
import "./App.css";
import { CreateDogForm } from "./Components/CreateDogForm";
import { Dogs } from "./Components/Dogs";
import { Section } from "./Components/Section";
import {
  addDogFetch,
  deleteDogFetch,
  getDogDataFetch,
  updateIsFavoriteFetch,
} from "./dogDataFetch";
import "./fonts/RubikBubbles-Regular.ttf";

function App() {
  // State variables
  const [displayFavorited, setDisplayFavorited] = useState(false);
  const [displayNotFavorited, setDisplayNotFavorited] = useState(false);
  const [displayForm, setDisplayForm] = useState(false);
  const [dogData, setDogData] = useState([]);

  // Derived variables
  const favoriteDogCount = dogData.filter((dog) => dog.isFavorite).length;
  const unfavoriteDogCount = dogData.filter((dog) => !dog.isFavorite).length;

  // Fetches index data for dogs
  const getDogData = () => {
    getDogDataFetch()
      .then((response) => response.json())
      .then((result) => setDogData(result))
      .catch((error) => console.log("error", error));
  };

  // Updates isFavorite key of dog object
  const updateIsFavorite = (dogId, dogIsFavorite) => {
    updateIsFavoriteFetch(dogId, dogIsFavorite)
      .then((response) => response.json())
      .then(() => getDogData())
      .catch((error) => console.log("error", error));
  };

  // Adds dog from create dog form
  const addDog = (dogName, dogDescription, dogImage) => {
    addDogFetch(dogName, dogDescription, dogImage)
      .then((response) => response.text())
      .then(() => getDogData())
      .catch((error) => console.log("error", error));
  };

  // Deletes dog from database
  const deleteDog = (dogId) => {
    deleteDogFetch(dogId)
      .then((response) => response.text())
      .then(() => getDogData())
      .catch((error) => console.log("error", error));
  };

  // useEffect updates
  useEffect(() => {
    getDogData();
  }, []);

  // Display change functions for Section component
  const handleMenuOptionsClick = (buttonClicked) => {
    if (buttonClicked === "favorited") {
      setDisplayFavorited((prevState) => !prevState);
      setDisplayNotFavorited(false);
      setDisplayForm(false);
    }

    if (buttonClicked === "unfavorited") {
      setDisplayFavorited(false);
      setDisplayNotFavorited((prevState) => !prevState);
      setDisplayForm(false);
    }

    if (buttonClicked === "form") {
      setDisplayFavorited(false);
      setDisplayNotFavorited(false);
      setDisplayForm((prevState) => !prevState);
    }
  };

  return (
    <div className="App">
      <header>
        <h1>pup-e-picker</h1>
      </header>
      <Section
        label={"Dogs: "}
        displayFavorited={displayFavorited}
        displayNotFavorited={displayNotFavorited}
        displayForm={displayForm}
        favoriteDogCount={favoriteDogCount}
        unfavoriteDogCount={unfavoriteDogCount}
        handleMenuOptionsClick={handleMenuOptionsClick}>
        <Dogs
          dogs={dogData}
          displayFavorited={displayFavorited}
          displayNotFavorited={displayNotFavorited}
          displayForm={displayForm}
          updateIsFavorite={updateIsFavorite}
          deleteDog={deleteDog}
        />
        {displayForm ? <CreateDogForm addDog={addDog} /> : null}
      </Section>
    </div>
  );
}

export default App;
