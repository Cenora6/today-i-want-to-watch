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
            }, 500)
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

export function searchForRandom(setRandom: any, search: any, setActivePage: any) {
            axios
                .get<any>
                (search.keyword ?
                    `${url}3/discover/${search.type}?api_key=${API_KEY}&language=en-US&with_keywords=${search.keyword}&with_genres=${search.genre}&page=${search.page}`
                :
                    `${url}3/discover/movie?api_key=${API_KEY}&language=en-US&with_genres=${search.genre}&page=${search.page}`)
                .then(response => {
                    const results: Array<any> = [];
                    response.data.results.forEach((data: any) => data.poster_path && results.push(data))
                    let randomNumber = Math.floor(Math.random() * (results.length));
                    setRandom(response.data.results[randomNumber])
                    setActivePage(2);

                    console.log("strona", search.page);
                    console.log(search);
                    console.log(response.data.results);
                })
                .catch(err => {
                    console.log(err);
                });
}