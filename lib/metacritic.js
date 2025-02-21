export async function getLatestGames() {
  const API_KEY = "43d750c7481748f99dabb07d5e8aa4eb";
  const BEST_RATING_GAMES = `https://api.rawg.io/api/games?key=${API_KEY}&page_size=50`;

  try {
    const response = await fetch(BEST_RATING_GAMES);
    const data = await response.json();

    const gamesDetails = await Promise.all(
      data.results.map(async (game) => {
        const detailUrl = `https://api.rawg.io/api/games/${game.id}?key=${API_KEY}`;
        const detailResponse = await fetch(detailUrl);
        const detailData = await detailResponse.json();

        return {
          id: game.id,
          title: game.name,
          released: game.released,
          score: game.metacritic,
          slug: game.slug,
          description: detailData.description_raw,
          image: game.background_image,
        };
      }),
    );
    return gamesDetails;
  } catch (error) {
    console.log(error);
  }
}
