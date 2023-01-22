import { useState } from "react";
import { FavoriteButton } from "./FavoriteButton";
import { TrashButton } from "./TrashButton";
import { UnfavoriteButton } from "./UnfavoriteButton";

export const DogCard = ({
  dog: { name, image, description, id, isFavorite },
  updateIsFavorite,
  deleteDog,
}) => {
  const [dogWasFavorited, setDogWasFavorited] = useState(false);
  const [dogWasUnfavorited, setDogWasUnfavorited] = useState(false);

  const handleFavoriteButtonClick = (dogId, favoriteButton) => {
    updateIsFavorite(dogId, favoriteButton);
    if (favoriteButton) {
      setDogWasFavorited(true);
      setTimeout(() => setDogWasFavorited(false), 1000);
    }
    if (!favoriteButton) {
      setDogWasUnfavorited(true);
      setTimeout(() => setDogWasUnfavorited(false), 1000);
    }
  };
  return (
    <div className="dog-card">
      {/* Choose which button to show depending on if dog is a favorite */}
      {isFavorite ? (
        <UnfavoriteButton
          onClick={() => handleFavoriteButtonClick(id, false)}
        />
      ) : (
        <FavoriteButton onClick={() => handleFavoriteButtonClick(id, true)} />
      )}

      {/* Use this button to delete a puppy :( */}
      <TrashButton
        disabled={isFavorite ? true : false}
        onClick={() => deleteDog(id)}
      />

      {/* Ignore this  */}
      {/* You can temporarily set a favorite overlay after a user favorites a dog */}
      {/* Try making className "favorite-overlay active"*/}
      <div className={`favorite-overlay ${dogWasFavorited ? "active" : null}`}>
        {"<3"}
      </div>

      {/* Ignore this  */}
      {/* You can temporarily set a unfavorite overlay after a user favorites a dog */}
      {/* Try making className "unfavorite-overlay active"*/}
      <div
        className={`unfavorite-overlay ${dogWasUnfavorited ? "active" : null}`}>
        {"</3"}
      </div>

      {/* A Dogs Name */}
      <p className="dog-name">{name}</p>

      {/* A Dogs Image */}
      <img src={image} alt={name} />

      {/*  A Dogs description*/}
      <p className="dog-description">{description}</p>
    </div>
  );
};
