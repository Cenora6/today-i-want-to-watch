import React from 'react';
import axios from "axios";
const API_KEY = "7da3d91798b7102da10fe38896bae4fe";
const url = "https://api.themoviedb.org/";

export function getAllGenres(setAllGenres: any) {

    axios
        .get<any>
        (`${url}3/genre/movie/list?api_key=${API_KEY}&language=en-US`)
        .then(response => {
            setAllGenres(response.data.genres)
            // console.log(response.data)
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
