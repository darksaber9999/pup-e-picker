import { DogCard } from "./DogCard";

export const Dogs = ({
  dogs,
  displayFavorited,
  displayNotFavorited,
  displayForm,
  updateIsFavorite,
  deleteDog,
}) => {
  return (
    //  the "<> </>"" are called react fragments, it's like adding all the html inside
    // without adding an actual html element
    <>
      {displayFavorited
        ? dogs
            .filter((dog) => dog.isFavorite)
            .map((filteredDog) => (
              <DogCard
                dog={filteredDog}
                updateIsFavorite={updateIsFavorite}
                deleteDog={deleteDog}
                key={filteredDog.id}
              />
            ))
        : null}
      {displayNotFavorited
        ? dogs
            .filter((dog) => !dog.isFavorite)
            .map((filteredDog) => (
              <DogCard
                dog={filteredDog}
                updateIsFavorite={updateIsFavorite}
                deleteDog={deleteDog}
                key={filteredDog.id}
              />
            ))
        : null}
      {!displayFavorited && !displayNotFavorited && !displayForm
        ? dogs.map((dog) => (
            <DogCard
              dog={dog}
              updateIsFavorite={updateIsFavorite}
              deleteDog={deleteDog}
              key={dog.id}
            />
          ))
        : null}
    </>
  );
};
