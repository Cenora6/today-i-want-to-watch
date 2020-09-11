import React, {useEffect, useState} from 'react';
import {getAllGenres, getAllKeywords, searchForRandom} from "../../api/Themoviedb";

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
    const [keyword, setKeyword] = useState<string>('');
    const [keywordId, setKeywordId] = useState<string>('');
    const [activePage, setActivePage] = useState<any>(1);
    const [random, setRandom] = useState<any>();

    const changeType = (e: React.ChangeEvent<HTMLInputElement>) => {
        setType(e.target.value);
        e.target.value && getAllGenres(setAllGenres, e.target.value);
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
        setGenre('');
        setType('');
        setKeyword('');
        setKeywordId('');
        e.preventDefault();
        const searchElement = {
            "type": type,
            "genre": genre,
            "keyword": keywordId
        };

        searchForRandom(setRandom, searchElement, setActivePage);

    }

    const backToSearch = (e: React.MouseEvent) => {
        console.log(type, genre, keywordId)
        setActivePage(1);
        setRandom('');
        setType('');
    }

    return (
        <div className="home">
            <h1>Today I Want To Watch...</h1>
            {activePage === 1 &&
            <form className='home__searchbox' onSubmit={searchForMovie} autoComplete='off'>
                <div className='home__searchbox__type'>
                    <div className='home__searchbox__type__title title-box'>
                        <h2>Type</h2>
                    </div>
                    <div className='home__searchbox__type__radio'>
                        <div className='home__searchbox__type__radio__single single-box'>
                            <input type="radio" id='tv' name="type" value="tv" onChange={changeType}
                                   checked={type === 'tv'}/>
                            <label htmlFor='tv'>tv show</label>
                        </div>
                        <div className='home__searchbox__types__radio__single single-box'>
                            <input type="radio" id='movie' name="type" value="movie" onChange={changeType}
                                   checked={type === 'movie'}/>
                            <label htmlFor='movie'>movie</label>
                        </div>
                    </div>
                </div>
                <div className='home__searchbox__genres'>
                    <div className='home__searchbox__genres__title title-box'>
                        <h2>Genre</h2>
                    </div>
                    <div className='home__searchbox__genres__radio'>
                        {allGenres && allGenres.map( (single:any, index: number) => {
                            return (
                                <div key={index} className='home__searchbox__genres__radio__single single-box'>
                                    <input type="radio" id={single.name} name="genre" value={single.id}
                                           checked={genre == single.id} onChange={chooseGenre}/>
                                    <label htmlFor={single.name}>{single.name.toLowerCase()}</label>
                                </div>
                            )
                        })}
                    </div>
                </div>
                <div className='home__searchbox__keywords'>
                    <div className='home__searchbox__keywords__title title-box'>
                        <h2>Keyword *</h2>
                    </div>
                    <div className='home__searchbox__keywords__input'>
                        <input type="text" id='keyword' name="keyword" value={keyword} onChange={changeKeywordInput}/>
                        <label htmlFor='keyword'></label>
                        {allKeywords && <div className='home__searchbox__keywords__input__results'>
                            {allKeywords.map((keyword: any) => {
                                return (
                                    <span key={keyword.id} id={keyword.id} onClick={chooseKeyword}>{keyword.name}</span>
                                )
                            })
                            }
                        </div>
                        }
                    </div>
                </div>
                <div className='home__searchbox__submit'>
                    <div className='home__searchbox__submit__button'>
                        <button type='submit'>Next >></button>
                    </div>
                </div>
            </form>
            }
            {activePage === 2 &&
            <div className='home__searchbox'>
                <div className='home__searchbox__result'>
                    {random ?
                        <>
                            <img alt={random} src={`//image.tmdb.org/t/p/w220_and_h330_face/${random.poster_path}`}/>
                            <h2>{random.original_title ? random.original_title : random.name}</h2>
                            <button type='button' onClick={backToSearch}>Try again?</button>
                        </>
                        :
                        <>
                            <h2>No results... :(</h2>
                            <button type='button' onClick={backToSearch}>Try again?</button>
                        </>
                    }
                </div>
            </div>
            }
        </div>
    );
}

export default Home;
