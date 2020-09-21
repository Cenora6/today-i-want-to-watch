import React, {useState} from 'react';
import {getAllGenres, getAllKeywords, searchForRandom} from "../../api/Themoviedb";
import tmdb from './../../assets/tmdb_icon.png';
import imdb from './../../assets/imdb_icon.png';
import homepage from './../../assets/home_icon.png';
import {Result} from "./Result";
import {Searchbox} from "./Searchbox";

interface searchData {
    type: string,
    genre: string,
    keyword?: string
}

function Home() {

    const [allGenres, setAllGenres] = useState<any>();
    const [allKeywords, setAllKeywords] = useState<any>();
    const [type, setType] = useState<any>('');
    const [genre, setGenre] = useState<any>('');
    const [changeGenre, setChangeGenre] = useState<boolean>(false);
    const [keyword, setKeyword] = useState<string>('');
    const [keywordId, setKeywordId] = useState<string>('');
    const [searchingPage, setSearchingPage] = useState<number>(1);
    const [activePage, setActivePage] = useState<any>(1);
    const [random, setRandom] = useState<any>();
    const [randomCast, setRandomCast] = useState<any>();
    const [randomGenre, setRandomGenre] = useState<any>();
    const [imageStatus, setImageStatus] = useState<string>('loading');

    const changeType = (e: React.ChangeEvent<HTMLInputElement>) => {
        setType(e.target.value);
        getAllGenres(setAllGenres, e.target.value);
    }

    const changeKeywordInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        setKeyword(e.target.value);
        e.target.value && getAllKeywords(setAllKeywords, e.target.value);
    }

    const chooseKeyword = (e: any) => {
        setKeyword(e.target.innerHTML);
        setKeywordId(e.target.id);
        setAllKeywords(null);
    }

    const chooseGenre = (e: React.ChangeEvent<HTMLInputElement>) => {
        setGenre(e.target.value);
    }

    const searchForMovie = (e: React.FormEvent) => {
        e.preventDefault();
        const searchElement = {
            "type": type,
            "genre": genre,
            "keyword": keywordId,
            "page": searchingPage,
        };
        searchForRandom(setRandom, searchElement, setActivePage, allGenres, setRandomGenre, setRandomCast);
    }

    const backToSearch = () => {
        setActivePage(1);
        setGenre('');
        setType('');
        setKeyword('');
        setKeywordId('');
        setRandom('');
        setSearchingPage(1);
    }

    const handleImageLoaded = () => {
        setImageStatus('loaded');
    }

    const anotherSearch = (e: React.MouseEvent) => {
        setImageStatus("loading");
        e.preventDefault();
        setSearchingPage(searchingPage + 1)

        const searchElement = {
            "type": type,
            "genre": genre,
            "keyword": keywordId,
            "page": searchingPage
        };

        searchForRandom(setRandom, searchElement, setActivePage, allGenres, setRandomGenre, setRandomCast);
    }

    const changeGenreAnimation = () => {
        if (type === '') {
            setTimeout( () => {
                setChangeGenre(true);
            }, 500)
        } else {
            setChangeGenre(false)
            setTimeout( () => {
                setChangeGenre(true)
            }, 500)
        }
    }

    return (
        <div className="home">
            <h1>Today I Want To Watch...</h1>
            {activePage === 1 &&
            <Searchbox searchForMovie={searchForMovie} changeType={changeType} type={type} changeGenreAnimation={changeGenreAnimation}
                       changeGenre={changeGenre} allGenres={allGenres} genre={genre} chooseGenre={chooseGenre} keyword={keyword}
                       changeKeywordInput={changeKeywordInput} allKeywords={allKeywords} chooseKeyword={chooseKeyword}/>
            }
            {activePage === 2 &&
            <div className='home__searchbox'>
                <Result random={random} backToSearch={backToSearch} imageStatus={imageStatus}
                        handleImageLoaded={handleImageLoaded} type={type} randomGenre={randomGenre}
                        randomCast={randomCast} anotherSearch={anotherSearch}/>
            </div>
            }
        </div>
    );
}

export default Home;
