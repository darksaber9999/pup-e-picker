// Fetches index data for dogs
export const getDogDataFetch = () => {
  const requestOptions = {
    method: "GET",
    redirect: "follow",
  };

  return fetch("http://localhost:3000/dogs", requestOptions);
};

// Updates isFavorite key of dog object
export const updateIsFavoriteFetch = (dogId, dogIsFavorite) => {
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  const raw = JSON.stringify({
    isFavorite: dogIsFavorite,
  });

  const requestOptions = {
    method: "PATCH",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  return fetch(`http://localhost:3000/dogs/${dogId}`, requestOptions);
};

// Adds dog from create dog form
export const addDogFetch = (dogName, dogDescription, dogImage) => {
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

  return fetch("http://localhost:3000/dogs", requestOptions);
};

// Deletes dog from database
export const deleteDogFetch = (dogId) => {
  const requestOptions = {
    method: "DELETE",
    redirect: "follow",
  };

  return fetch(`http://localhost:3000/dogs/${dogId}`, requestOptions);
};
