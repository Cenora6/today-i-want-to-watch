import React, {SyntheticEvent} from 'react';
import tmdb from "../../assets/tmdb_icon.png";
import imdb from "../../assets/imdb_icon.png";
import sad from "../../assets/sad_icon.png";
import poster from "../../assets/no_poster.png";
import person from "../../assets/no_person.png";
import homepage from "../../assets/home_icon.png";
import {MovieOrShowDetails} from "../../model/details.model";
import {MovieOrShowCast, SingleCast} from "../../model/cast.model";

interface ResultProps {
    imageStatus: 'loading' | 'loaded',
    handleImageLoaded: (event: SyntheticEvent<HTMLImageElement, Event>) => void,
    random: MovieOrShowDetails | null,
    backToSearch: (event: React.MouseEvent<HTMLButtonElement>) => void,
    type: string,
    randomGenre?: string[],
    randomCast?: MovieOrShowCast,
    anotherSearch: (event: React.MouseEvent<HTMLButtonElement>) => void,
    loading: boolean,
    totalResults: number
}

export function Result(props: ResultProps) {

    const { random, imageStatus, backToSearch, handleImageLoaded, type, randomGenre, randomCast, anotherSearch,
        loading, totalResults} = props;

    return (
        <div className='home__result'>
            <div className={`home__result__details`}>
                {loading ?
                    <div className='home__result__details__loading'>
                        <div className="loader"></div>
                    </div>
                    :
                    random ?
                        <>
                            <span></span>
                            <div className={`home__result__details__photo ${imageStatus === "loaded" ? 'show' : 'hide'}`}>
                                <img alt='poster'
                                     src={random.poster_path ? `//image.tmdb.org/t/p/w300_and_h450_bestv2${random.poster_path}` : poster}
                                     onLoad={handleImageLoaded}/>
                                <div className='home__result__details__photo__icons'>
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
                            <div className={`home__result__details__info ${imageStatus === "loaded" ? 'show' : 'hide'}`}>
                                <h2>
                                    {random.original_language === 'eng' ?
                                        (random.original_title ? random.original_title : random.name)
                                        :
                                        (random.title ? random.title : random.name)
                                    }
                                </h2>
                                <div className='home__result__details__info__basic'>
                                    <p><span className='decorative'>Release date:</span>
                                        {type === 'movie' ?
                                            random.release_date
                                            :
                                            random.first_air_date && random.first_air_date.slice(0, 4) + ' - ' + random.last_air_date!.slice(0, 4)}
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

                                <div className='home__result__details__info__description'>
                                    {random.overview && random.overview.length > 500 ?
                                        <p>
                                            {random.overview.substring(0, 500) + '... '}
                                            <a href={`https://www.themoviedb.org/${type}/${random.id}`}> Read more here </a>
                                        </p>
                                        :
                                        <p>{random.overview}</p>
                                    }
                                </div>

                                <div className='home__result__details__info__cast'>
                                    {randomCast && randomCast.cast &&
                                    randomCast.cast.slice(0, 5).map( (cast: SingleCast, index: number) => {
                                        return (
                                            <div className={'home__result__details__info__cast__single'} key={index}>
                                                <img
                                                    src={cast.profile_path ? `https://image.tmdb.org/t/p/w138_and_h175_face${cast.profile_path}` : person}
                                                    alt={'actor'}/>
                                                <div className={'home__result__details__info__cast__single__text'}>
                                                    <p><span className='bold'>{cast.name}</span> <br/> {cast.character && "as " + cast.character}</p>
                                                </div>
                                            </div>
                                        )
                                    })
                                    }
                                </div>
                            </div>
                        </>
                        :
                        <div className="home__result__details__error show">
                            <h2>No results...</h2>
                            <img src={sad} alt='sad'/>
                        </div>
                }
            </div>

            <div className='home__result__submit'>
                <div className='home__result__submit__button'>
                    {totalResults > 1 && random  && <button type='button' onClick={anotherSearch}>Try again?</button>}
                    <button type='button' onClick={backToSearch}>Change search?</button>
                </div>
            </div>

        </div>
    )

}