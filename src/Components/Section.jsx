export const Section = ({
  label,
  displayFavorited,
  displayNotFavorited,
  displayForm,
  favoriteDogCount,
  unfavoriteDogCount,
  handleFavoriteMenuOptionsClick,
  handleCreateDogMenuClick,
  children,
}) => {
  return (
    <section>
      <div className="container-header">
        <div className="container-label">{label}</div>
        <div className="selectors">
          {/* Add the class 'active' to any selector in order to make it's color change */}
          {/* This should display the favorited count */}
          <div
            className={`selector ${displayFavorited ? "active" : null}`}
            onClick={() => handleFavoriteMenuOptionsClick("favorited")}>
            favorited ( {favoriteDogCount} )
          </div>

          {/* This should display the unfavorited count */}
          <div
            className={`selector ${displayNotFavorited ? "active" : null}`}
            onClick={() => handleFavoriteMenuOptionsClick("unfavorited")}>
            unfavorited ( {unfavoriteDogCount} )
          </div>
          <div
            className={`selector ${displayForm ? "active" : null}`}
            onClick={() => handleCreateDogMenuClick()}>
            create dog
          </div>
        </div>
      </div>
      {children}
    </section>
  );
};
