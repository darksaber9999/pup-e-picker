import { useState, useEffect } from "react";
import "./App.css";
import { CreateDogForm } from "./Components/CreateDogForm";
import { Dogs } from "./Components/Dogs";
import { Section } from "./Components/Section";
import "./fonts/RubikBubbles-Regular.ttf";

function App() {
  const [displayFavorited, setDisplayFavorited] = useState(false);
  const [displayNotFavorited, setDisplayNotFavorited] = useState(true);
  const [displayForm, setDisplayForm] = useState(false);
  const [dogData, setDogData] = useState([]);
  const [favoriteDogCount, setFavoriteDogCount] = useState(0);
  const [unfavoriteDogCount, setUnfavoriteDogCount] = useState(0);

  // Fetches index data for dogs
  const getDogData = () => {
    const requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    fetch("http://localhost:3000/dogs", requestOptions)
      .then((response) => response.json())
      .then((result) => setDogData(result))
      .catch((error) => console.log("error", error));
  };

  // Updates isFavorite key of dog object
  const updateIsFavorite = (id, isFavorite) => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
      isFavorite: isFavorite,
    });

    const requestOptions = {
      method: "PATCH",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(`http://localhost:3000/dogs/${id}`, requestOptions)
      .then((response) => response.json())
      .then(() => getDogData())
      .catch((error) => console.log("error", error));
  };

  // Adds dog from create dog form
  const addDog = (dogName, dogImage, dogDescription) => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
      name: dogName,
      image: dogImage,
      description: dogDescription,
      isFavorite: false,
    });

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch("http://localhost:3000/dogs", requestOptions)
      .then((response) => response.text())
      .then(() => getDogData())
      .catch((error) => console.log("error", error));
  };

  // Deletes dog from database
  const deleteDog = (dogId) => {
    const requestOptions = {
      method: "DELETE",
      redirect: "follow",
    };

    fetch(`http://localhost:3000/dogs/${dogId}`, requestOptions)
      .then((response) => response.text())
      .then(() => getDogData())
      .catch((error) => console.log("error", error));
  };

  // useEffect updates
  useEffect(() => {
    getDogData();
  }, []);

  useEffect(() => {
    setFavoriteDogCount(dogData.filter((dog) => dog.isFavorite).length);
    setUnfavoriteDogCount(dogData.length);
  }, [dogData]);

  // Display change functions for Section component
  const handleFavoriteMenuOptionsClick = (buttonClicked) => {
    if (buttonClicked === "favorited") {
      setDisplayFavorited((prevState) =>
        displayForm ? displayForm : !prevState
      );
      setDisplayNotFavorited((prevState) =>
        displayForm ? !displayForm : !prevState
      );
    }

    if (buttonClicked === "unfavorited") {
      setDisplayFavorited((prevState) =>
        displayForm ? !displayForm : !prevState
      );
      setDisplayNotFavorited((prevState) =>
        displayForm ? displayForm : !prevState
      );
    }
    setDisplayForm(false);
  };

  const handleCreateDogMenuClick = () => {
    setDisplayFavorited(false);
    setDisplayNotFavorited(displayForm ? true : false);
    setDisplayForm((prevState) => !prevState);
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
        handleFavoriteMenuOptionsClick={handleFavoriteMenuOptionsClick}
        handleCreateDogMenuClick={handleCreateDogMenuClick}>
        <Dogs
          dogs={dogData}
          displayFavorited={displayFavorited}
          displayNotFavorited={displayNotFavorited}
          updateIsFavorite={updateIsFavorite}
          deleteDog={deleteDog}
        />
        {displayForm ? <CreateDogForm addDog={addDog} /> : null}
      </Section>
    </div>
  );
}

export default App;
