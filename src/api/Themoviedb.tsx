import axios from "axios";
import {AllKeywordsResponse} from "../model/keywords.model";
import {AllGenresResponse, SingleGenre} from "../model/genres.model";
import {MovieOrShowCast} from "../model/cast.model";
import {SearchModel} from "../model/search.model";
import {RandomMovieIdResponse, MovieOrShowDetails, SingleId} from "../model/details.model";
const API_KEY = "7da3d91798b7102da10fe38896bae4fe";
const url = "https://api.themoviedb.org/";

export function getAllGenres(setAllGenres: Function, type: string) {

    axios
        .get<AllGenresResponse>
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

export function getAllKeywords(setAllKeywords: Function, search: string) {

    axios
        .get<AllKeywordsResponse>
        (`${url}3/search/keyword?api_key=${API_KEY}&language=en-US&query=${search}`)
        .then(response => {
            setAllKeywords(response.data.results)
        })
        .catch(err => {
            console.log(err);
        });
}

export function searchForRandom(setRandom: Function, search: SearchModel, setActivePage: Function, allGenres: SingleGenre[],
                                setRandomGenre: Function, setRandomCast: Function, setResultExists: Function) {
    axios
        .get<RandomMovieIdResponse>
        (search.keyword ?
            `${url}3/discover/${search.type}?api_key=${API_KEY}&language=en-US&with_keywords=${search.keyword}&with_genres=${search.genre}&page=${search.page}`
            :
            `${url}3/discover/${search.type}?api_key=${API_KEY}&language=en-US&with_genres=${search.genre}&page=${search.page}`)
        .then(response => {
            const genresNames: Array<string>= [];
            const results: Array<SingleId> = [];
            console.log(response.data.results)
            response.data && setResultExists(true);

            if(response.data.results.length !== 0) {
                response.data.results.forEach((data: SingleId) => data.poster_path && results.push(data));
                let randomNumber = Math.floor(Math.random() * (results.length));

                getDetails(setRandom, search.type, response.data.results[randomNumber].id);
                getCast(setRandomCast, search.type, response.data.results[randomNumber].id);
                setActivePage(2);

                // change the numbers of genre id from result to names
                const genresId = response.data.results[randomNumber].genre_ids;
                genresId.forEach( (genreId: string) => {
                    for (let i = 0; i < allGenres!.length; i++) {
                        const allGenreId = allGenres[i].id;
                        if(allGenreId === (genreId)) {
                            genresNames.push(allGenres[i].name);
                        }
                    }
                    setRandomGenre(genresNames);
                })

            } else {
                setRandom(null);
                setActivePage(2);
            }

        })
        .catch(err => {
            console.log(err);
        });
}

export function getDetails(setRandom: Function, type: string, id: string) {

    axios
        .get<MovieOrShowDetails>
        (`${url}3/${type}/${id}?api_key=${API_KEY}&language=en-US`)
        .then(response => {
            setRandom(response.data);
        })
        .catch(err => {
            console.log(err);
        });
}

export function getCast(setRandomCast: Function, type: string, id: string) {

    axios
        .get<MovieOrShowCast>
        (`${url}3/${type}/${id}/credits?api_key=${API_KEY}&language=en-US`)
        .then(response => {
            setRandomCast(response.data);
        })
        .catch(err => {
            console.log(err);
        });
}