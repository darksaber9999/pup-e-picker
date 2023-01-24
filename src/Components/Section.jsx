export const Section = ({
  label,
  displayFavorited,
  displayNotFavorited,
  displayForm,
  favoriteDogCount,
  unfavoriteDogCount,
  handleMenuOptionsClick,
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
            onClick={() => handleMenuOptionsClick("favorited")}>
            favorited ( {favoriteDogCount} )
          </div>

          {/* This should display the unfavorited count */}
          <div
            className={`selector ${displayNotFavorited ? "active" : null}`}
            onClick={() => handleMenuOptionsClick("unfavorited")}>
            unfavorited ( {unfavoriteDogCount} )
          </div>
          <div
            className={`selector ${displayForm ? "active" : null}`}
            onClick={() => handleMenuOptionsClick("form")}>
            create dog
          </div>
        </div>
      </div>
      {children}
    </section>
  );
};
