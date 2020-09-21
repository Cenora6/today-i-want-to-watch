import React, {useState} from 'react';
import {getAllGenres, getAllKeywords, searchForRandom} from "../../api/Themoviedb";
import tmdb from './../../assets/tmdb_icon.png';
import imdb from './../../assets/imdb_icon.png';
import homepage from './../../assets/home_icon.png';

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
            <form className='home__searchbox' onSubmit={searchForMovie} autoComplete='off'>
                <div className='home__searchbox__type'>
                    <div className='home__searchbox__type__title title-box'>
                        <h2>Type</h2>
                    </div>
                    <div className='home__searchbox__type__radio'>
                        <div className='home__searchbox__type__radio__single single-box'>
                            <input type="radio" id='tv' name="type" value="tv" onChange={changeType}
                                   checked={type === 'tv'} onClick={changeGenreAnimation}/>
                            <label htmlFor='tv'>tv show</label>
                        </div>
                        <div className='home__searchbox__types__radio__single single-box'>
                            <input type="radio" id='movie' name="type" value="movie" onChange={changeType}
                                   checked={type === 'movie'} onClick={changeGenreAnimation}/>
                            <label htmlFor='movie'>movie</label>
                        </div>
                    </div>
                </div>
                <div className='home__searchbox__genres'>
                    <div className='home__searchbox__genres__title title-box'>
                        <h2>Genre</h2>
                    </div>
                    <div className={`home__searchbox__genres__radio ${changeGenre ? 'show' : 'hide'} ${type === '' && 'hide'}`}>
                        {allGenres && allGenres.map( (single:any, index: number) => {
                            return (
                                <div key={index} className='home__searchbox__genres__radio__single single-box'>
                                    <input type="radio" id={single.name} name="genre" value={single.id}
                                           checked={genre === single.id.toString()} onChange={chooseGenre}/>
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
                        <label htmlFor='keyword'>
                            <input type="text" id='keyword' name="keyword" value={keyword} onChange={changeKeywordInput}/>
                        </label>
                        {allKeywords &&
                        <div className={`home__searchbox__keywords__input__results ${keyword ? "show" : "hide"}` }>
                            {keyword !== '' && allKeywords.map((keyword: any) => {
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
                        <button type='submit'>
                            Next
                            <i className="fas fa-arrow-right"></i>
                        </button>
                    </div>
                </div>
            </form>
            }
            {activePage === 2 &&
            <div className='home__searchbox'>
                <div className='home__searchbox__result'>
                    {random ?
                        <>
                            <div className={`home__searchbox__result__details ${imageStatus === "loading" ? 'hide' : 'show'}`}>
                                <div className='home__searchbox__result__details__photo'>
                                    <img alt={random} src={`//image.tmdb.org/t/p/w600_and_h900_face${random.poster_path}`}
                                         onLoad={handleImageLoaded}/>
                                    <div className='home__searchbox__result__details__photo__icons'>
                                        <a target='_blank' rel="noreferrer noopener" href={`https://www.themoviedb.org/${type}/${random.id}`}>
                                            <img src={tmdb} alt='tmdb'/>
                                        </a>
                                        {random.imdb_id &&
                                        <a target='_blank' rel="noreferrer noopener" href={`https://www.imdb.com/title/${random.imdb_id}`}>
                                            <img src={imdb} alt='imdb'/>
                                        </a>}
                                        {random.homepage &&
                                        <a target='_blank' rel="noreferrer noopener" href={random.homepage}>
                                            <img src={homepage} alt='homepage'/>
                                        </a>}
                                    </div>
                                </div>
                                <div className={`home__searchbox__result__details__info ${imageStatus === "loading" ? 'hide' : 'show'}`}>
                                    <h2>
                                        {random.original_language === 'eng' ?
                                            (random.original_title ? random.original_title : random.name)
                                            :
                                            (random.title ? random.title : random.name)
                                        }
                                    </h2>
                                    <div className='home__searchbox__result__details__info__basic'>
                                        <p><span className='decorative'>Release date:</span>
                                            {type === 'movie' ?
                                                random.release_date
                                                :
                                                random.first_air_date.slice(0, 4) + ' - ' + random.last_air_date.slice(0, 4)}
                                        </p>
                                        <p><span className='decorative'>Score:</span> {random.vote_average} ({random.vote_count} votes)</p>
                                        <p><span className='decorative'>Genres:</span> {randomGenre && randomGenre.join(', ')}</p>
                                        {type === 'movie' ?
                                            <p><span className='decorative'>Country:</span>
                                                {random.production_countries && random.production_countries.length > 0 ?
                                                    random.production_countries.map((country: any) => country.name + ', ')
                                                    : '-'}
                                            </p>
                                            :

                                            <p><span className='decorative'>Number of seasons:</span>
                                                {random.number_of_seasons} ({random.status})
                                            </p>
                                        }
                                    </div>

                                    <div className='home__searchbox__result__details__info__description'>
                                        <p>{random.overview}</p>
                                    </div>

                                    <div className='home__searchbox__result__details__info__cast'>
                                        {randomCast &&
                                        randomCast.cast.slice(0, 5).map( (cast: any, index: number) => {
                                            return (
                                                <div className={'home__searchbox__result__details__info__cast__single'} key={index}>
                                                    {cast.profile_path ?
                                                        <img
                                                            src={`https://image.tmdb.org/t/p/w138_and_h175_face${cast.profile_path}`}
                                                            alt={'actor'}/>
                                                        :
                                                        <div className='no-image'></div>
                                                    }
                                                    <div className={'home__searchbox__result__details__info__cast__single__text'}>
                                                        <p><span className='bold'>{cast.name}</span> <br/> as {cast.character}</p>
                                                    </div>
                                                </div>
                                            )
                                        })
                                        }
                                    </div>
                                </div>
                            </div>

                            <div className='home__searchbox__submit__button'>
                                <button type='button' onClick={anotherSearch}>Try again?</button>
                                <button type='button' onClick={backToSearch}>Change search?</button>
                            </div>
                        </>
                        :

                        <>
                            <h2>No results... :(</h2>
                            <div className='home__searchbox__submit__button'>
                                <button type='button' onClick={backToSearch}>Try again?</button>
                            </div>
                        </>
                    }
                </div>
            </div>
            }
        </div>
    );
}

export default Home;
