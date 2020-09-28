import React, {useState} from 'react';
import {getAllGenres, getAllKeywords, searchForRandom} from "../../api/Themoviedb";
import {Result} from "./Result";
import {Searchbox} from "./Searchbox";
import {SingleKeyword} from "../../model/keywords.model";
import {SingleGenre} from "../../model/genres.model";
import {MovieOrShowDetails} from "../../model/details.model";
import {MovieOrShowCast} from "../../model/cast.model";

function Home() {

    const [allGenres, setAllGenres] = useState<SingleGenre[]>([]);
    const [allKeywords, setAllKeywords] = useState<SingleKeyword[]>();
    const [type, setType] = useState<string>('');
    const [genre, setGenre] = useState<string>('');
    const [changeGenre, setChangeGenre] = useState<boolean>(false);
    const [keyword, setKeyword] = useState<string>('');
    const [keywordId, setKeywordId] = useState<string>('');
    const [searchingPage, setSearchingPage] = useState<number>(1);
    const [activePage, setActivePage] = useState<number>(1);
    const [random, setRandom] = useState<MovieOrShowDetails | null>(null);
    const [randomCast, setRandomCast] = useState<MovieOrShowCast>();
    const [randomGenre, setRandomGenre] = useState<string[]>();
    const [imageStatus, setImageStatus] = useState<"loading" | "loaded">("loading");
    const [loading, setLoading] = useState<boolean>(false);
    const [totalResultPages, setTotalResultPages] = useState<number>();
    const [totalResults, setTotalResult] = useState<number>(0);
    const [error, setError] = useState<boolean>(false);

    const searchElement = {
        "type": type,
        "genre": genre,
        "keyword": keywordId,
        "page": searchingPage
    };

    const changeType = (e: React.ChangeEvent<HTMLInputElement>) => {
        setType(e.target.value);
        getAllGenres(setAllGenres, e.target.value);
    }

    const changeKeywordInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        setKeyword(e.target.value);
        e.target.value && getAllKeywords(setAllKeywords, e.target.value);
    }

    const chooseKeyword = (e: React.MouseEvent<HTMLSpanElement>) => {
        const target = e.target as HTMLSpanElement;
        setKeyword(target.innerHTML);
        setKeywordId(target.id);
        setAllKeywords([]);
    }

    const chooseGenre = (e: React.ChangeEvent<HTMLInputElement>) => {
        setGenre(e.target.value);
    }

    const searchForMovie = (e: React.FormEvent) => {
        e.preventDefault();
        setError(false)
        if ((!type) || (!genre && !keyword)) {
            setError(true);
        } else if (genre || keyword) {
            setError(false);
            search();
        }

        setTimeout( () => {
            setError(false);
        }, 3000)

        function search() {
            setLoading(true);
            setImageStatus("loading");
            searchForRandom(setRandom, searchElement, setActivePage, allGenres, setRandomGenre, setRandomCast, setLoading,
                setTotalResultPages, setTotalResult);
        }
    }

    const backToSearch = () => {
        setActivePage(1);
        setGenre('');
        setType('');
        setAllGenres([]);
        setKeyword('');
        setKeywordId('');
        setRandom(null);
        setSearchingPage(1);
        setChangeGenre(false);
        setLoading(false);
        setTotalResult(0);
        setTotalResultPages(0);
    }

    const handleImageLoaded = () => {
        setImageStatus('loaded')
    }

    const anotherSearch = (e: React.MouseEvent) => {
        setImageStatus("loading");
        e.preventDefault();
        setTimeout( () => {
            setLoading(true);
        }, 300)
        let newSearchingPage: number;

        totalResultPages! > 1000 ?
            newSearchingPage = Math.floor(Math.random() * 1000) + 1
            :
            newSearchingPage = Math.floor(Math.random() * totalResultPages!) + 1;

        setSearchingPage(newSearchingPage);
        setTimeout( () => {
            searchForRandom(setRandom, searchElement, setActivePage, allGenres, setRandomGenre, setRandomCast, setLoading,
                setTotalResultPages, setTotalResult);
        }, 500)
    }

    const changeGenreAnimation = () => {
        if (!type) {
            setTimeout( () => {
                setChangeGenre(true);
            }, 400)
        } else {
            setChangeGenre(false)
            setTimeout( () => {
                setChangeGenre(true)
            }, 400)
        }
    }

    return (
        <>
            <h1>Today I Want To Watch...</h1>
            {activePage === 1 &&
            <>
                <div className={`home__error ${error ? 'show' : 'hide'}`}>
                    <p>You need to choose TYPE and GENRE or TYPE and KEYWORD</p>
                </div>
                <Searchbox searchForMovie={searchForMovie} changeType={changeType} type={type} changeGenreAnimation={changeGenreAnimation}
                           changeGenre={changeGenre} allGenres={allGenres} chooseGenre={chooseGenre} keyword={keyword}
                           changeKeywordInput={changeKeywordInput} allKeywords={allKeywords} chooseKeyword={chooseKeyword}/>
            </>
            }
            {activePage === 2 &&
            <div className='home__searchbox'>
                <Result random={random} backToSearch={backToSearch} imageStatus={imageStatus}
                        handleImageLoaded={handleImageLoaded} type={type} randomGenre={randomGenre}
                        randomCast={randomCast} anotherSearch={anotherSearch} loading={loading}
                        totalResults={totalResults}/>
            </div>
            }
        </>
    );
}

export default Home;
