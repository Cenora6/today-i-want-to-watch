import React from 'react';
import axios from "axios";
const API_KEY = "7da3d91798b7102da10fe38896bae4fe";
const url = "https://api.themoviedb.org/";

export function getAllGenres(setAllGenres: any, type: string) {

    axios
        .get<any>
        (`${url}3/genre/${type}/list?api_key=${API_KEY}&language=en-US`)
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

export function searchForRandom(setRandom: any, search: any, setActivePage: any) {
            axios
                .get<any>
                (search.keyword ?
                    `${url}3/discover/${search.type}?api_key=${API_KEY}&language=en-US&with_keywords=${search.keyword}&with_genres=${search.genre}`
                :
                    `${url}3/discover/movie?api_key=${API_KEY}&language=en-US&with_genres=${search.genre}`)
                .then(response => {
                    const results: Array<any> = [];
                    response.data.results.forEach((data: any) => data.poster_path && results.push(data))
                    let randomNumber = Math.floor(Math.random() * (results.length + 1));
                    setRandom(response.data.results[randomNumber])
                    setActivePage(2);

                    console.log(response.data.results)
                    console.log(`${url}3/discover/movie?api_key=${API_KEY}&language=en-US&with_keywords=${search.keyword}&with_genres=${search.genre}`)
                })
                .catch(err => {
                    console.log(err);
                });
}

    export function searchRandomPage(setRandom: any, search: any) {
        if (search.type === "movie") {
            console.log(search);

            if (search.keyword) {
                console.log("to jest film z keyword")
                axios
                    .get<any>
                    (`${url}3/discover/movie?api_key=${API_KEY}&language=en-US&with_keywords=${search.keyword}&with_genres=${search.genre}`)
                    .then(response => {
                        console.log(response.data)
                        console.log(response.data.total_pages)
                        console.log(`${url}3/discover/movie?api_key=${API_KEY}&language=en-US&with_keywords=${search.keyword}&with_genres=${search.genre}`)
                    })
                    .catch(err => {
                        console.log(err);
                    });

            }
        }
    }