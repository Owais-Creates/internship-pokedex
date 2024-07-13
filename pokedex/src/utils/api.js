
export const FetchApiUrl = async () => {
    const data = await fetch("https://pokeapi.co/api/v2/pokemon");
    const res = await data.json();
    return res;
}
