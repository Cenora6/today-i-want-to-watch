import axios from "axios";
const API_KEY = "7da3d91798b7102da10fe38896bae4fe";
const url = "https://api.themoviedb.org/";

export function getAllGenres(setAllGenres: any, type: string) {

    axios
        .get<any>
        (`${url}3/genre/${type}/list?api_key=${API_KEY}&language=en-US`)
        .then(response => {
            setTimeout( () => {
                setAllGenres(response.data.genres)
            }, 300)
        })
        .catch(err => {
            console.log(err);
        });
}

export function getAllKeywords(setAllKeywords: any, search: string) {

    axios
        .get<any>
        (`${url}3/search/keyword?api_key=${API_KEY}&language=en-US&query=${search}`)
        .then(response => {
            setAllKeywords(response.data.results)
        })
        .catch(err => {
            console.log(err);
        });
}

export function searchForRandom(setRandom: any, search: any, setActivePage: any, allGenres: any, setRandomGenre: any) {
            axios
                .get<any>
                (search.keyword ?
                    `${url}3/discover/${search.type}?api_key=${API_KEY}&language=en-US&with_keywords=${search.keyword}&with_genres=${search.genre}&page=${search.page}`
                :
                    `${url}3/discover/${search.type}?api_key=${API_KEY}&language=en-US&with_genres=${search.genre}&page=${search.page}`)
                .then(response => {
                    const results: Array<any> = [];
                    const genresNames: Array<string>= [];
                    response.data.results.forEach((data: any) => data.poster_path && results.push(data))
                    let randomNumber = Math.floor(Math.random() * (results.length));
                    setRandom(response.data.results[randomNumber])
                    setActivePage(2);
                    const genresId = response.data.results[randomNumber].genre_ids;

                    // change the numbers of genre id from result to names
                    genresId.forEach( (genreId: string) => {
                        for (let i = 0; i < allGenres.length; i++) {
                            const allGenreId = allGenres[i].id;
                            if(allGenreId === (genreId)) {
                                genresNames.push(allGenres[i].name);
                            }
                        }
                        setRandomGenre(genresNames);
                    })

                    console.log(response.data.results[randomNumber])
                })
                .catch(err => {
                    console.log(err);
                });
}