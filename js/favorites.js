function getFavorites(){

    return JSON.parse(
        localStorage.getItem(
            'favorites'
        )
    ) || [];

}

function saveFavorites(favorites){

    localStorage.setItem(
        'favorites',
        JSON.stringify(
            favorites
        )
    );

}

function updateFavoriteCount(){

    const count =
    getFavorites().length;

    document
    .getElementById(
        'favoriteCount'
    )
    .textContent = count;

}
