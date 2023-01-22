import { DogCard } from "./DogCard";

export const Dogs = ({
  dogs,
  displayFavorited,
  displayNotFavorited,
  updateIsFavorite,
  deleteDog,
}) => {
  return (
    //  the "<> </>"" are called react fragments, it's like adding all the html inside
    // without adding an actual html element
    <>
      {displayNotFavorited
        ? dogs.map((dog) => (
            <DogCard
              dog={dog}
              updateIsFavorite={updateIsFavorite}
              deleteDog={deleteDog}
              key={dog.id}
            />
          ))
        : null}
      {displayFavorited
        ? dogs
            .filter((dog) => dog.isFavorite)
            .map((dog) => (
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
