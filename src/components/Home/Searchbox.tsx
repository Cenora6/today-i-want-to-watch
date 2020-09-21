import React from 'react';

interface SearchboxProps {
    searchForMovie: any,
    changeType: any,
    type: string,
    changeGenreAnimation: any,
    changeGenre: any,
    allGenres: any,
    genre: string,
    chooseGenre: any,
    keyword: string,
    changeKeywordInput: any,
    allKeywords: any,
    chooseKeyword: any
}

export function Searchbox (props: SearchboxProps) {

    const {searchForMovie, changeType, type, changeGenreAnimation, changeGenre, allGenres, genre, chooseGenre, keyword,
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
)

}