import axios from "axios";
import {AllKeywordsResponse} from "../model/keywords.model";
import {AllGenresResponse, SingleGenre} from "../model/genres.model";
import {MovieOrShowCast} from "../model/cast.model";
import {SearchModel} from "../model/search.model";
import {RandomMovieIdResponse, MovieOrShowDetails} from "../model/details.model";
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
                                setRandomGenre: Function, setRandomCast: Function, setLoading: Function,
                                setTotalResultPages: Function, setTotalResult: Function) {
    axios
        .get<RandomMovieIdResponse>
        (search.keyword ?
            `${url}3/discover/${search.type}?api_key=${API_KEY}&language=en-US&with_keywords=${search.keyword}&with_genres=${search.genre}&page=${search.page}`
            :
            `${url}3/discover/${search.type}?api_key=${API_KEY}&language=en-US&with_genres=${search.genre}&page=${search.page}`)
        .then(response => {
            const genresNames: Array<string>= [];
            setTotalResultPages(response.data.total_pages);
            setTotalResult(response.data.total_results);

            if(response.data.results.length !== 0) {
                let randomNumber = Math.floor(Math.random() * (response.data.results.length));

                getDetails(setRandom, search.type, response.data.results[randomNumber].id, setLoading);
                getCast(setRandomCast, search.type, response.data.results[randomNumber].id);
                setActivePage(2);

                const genresId = response.data.results[randomNumber].genre_ids;
                genresId.forEach( (genreId: string) => {
                    allGenres.forEach( (genre: SingleGenre) => {
                        if(genre.id === (genreId)) {
                            genresNames.push(genre.name);
                        }
                    })
                    setRandomGenre(genresNames);
                })

            } else {
                setRandom(null);
                setActivePage(2);
                setLoading(false);
            }

        })
        .catch(err => {
            console.log(err);
        });
}

export function getDetails(setRandom: Function, type: string, id: string, setLoading: Function) {

    axios
        .get<MovieOrShowDetails>
        (`${url}3/${type}/${id}?api_key=${API_KEY}&language=en-US`)
        .then(response => {
            setRandom(response.data);
            setTimeout( () => {
                setLoading(false)
            }, 500)
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