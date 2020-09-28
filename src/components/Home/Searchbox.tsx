import React from 'react';
import {SingleKeyword} from "../../model/keywords.model";
import {SingleGenre} from "../../model/genres.model";

interface SearchboxProps {
    searchForMovie: (event: React.FormEvent<HTMLFormElement>) => void,
    changeType: (event: React.ChangeEvent<HTMLInputElement>) => void,
    type: string,
    changeGenreAnimation: (event: React.MouseEvent<HTMLInputElement>) => void,
    changeGenre: boolean,
    allGenres: SingleGenre[] | undefined
    chooseGenre: (event: React.ChangeEvent<HTMLInputElement>) => void,
    keyword: string,
    changeKeywordInput: (event: React.ChangeEvent<HTMLInputElement>) => void,
    allKeywords: SingleKeyword[] | undefined,
    chooseKeyword: (event: React.MouseEvent<HTMLInputElement>) => void
}

export function Searchbox (props: SearchboxProps) {

    const {searchForMovie, changeType, type, changeGenreAnimation, changeGenre, allGenres, chooseGenre, keyword,
        changeKeywordInput, allKeywords, chooseKeyword} = props;

    return (
        <form className='home__searchbox' onSubmit={searchForMovie} autoComplete='off'>
            <div className='home__searchbox__type'>
                <div className='home__searchbox__type__title title-box'>
                    <h2>Type</h2>
                </div>
                <div className='home__searchbox__type__radio'>
                    <div className='home__searchbox__type__radio__single single-box'>
                        <input type="radio" id='tv' name="type" value="tv" onChange={changeType}
                               onClick={changeGenreAnimation}/>
                        <label htmlFor='tv'>tv show</label>
                    </div>
                    <div className='home__searchbox__types__radio__single single-box'>
                        <input type="radio" id='movie' name="type" value="movie" onChange={changeType}
                               onClick={changeGenreAnimation}/>
                        <label htmlFor='movie'>movie</label>
                    </div>
                </div>
            </div>
            <div className='home__searchbox__genres'>
                <div className='home__searchbox__genres__title title-box'>
                    <h2>Genre</h2>
                </div>
                <div className={`home__searchbox__genres__radio ${type && changeGenre ? 'show' : 'hide'}`}>
                    {allGenres && allGenres.map( (single: SingleGenre, index: number) => {
                        return (
                            <div key={index} className='home__searchbox__genres__radio__single single-box'>
                                <input type="radio" id={single.name} name="genre" value={single.id}
                                       onChange={chooseGenre}/>
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
                    <div className={`home__searchbox__keywords__input__results ${allKeywords.length > 0 ? "show" : "hide"}` }>
                        {keyword && allKeywords.map((keyword: SingleKeyword) => {
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
    )

}