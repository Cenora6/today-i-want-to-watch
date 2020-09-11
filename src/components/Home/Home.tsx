import React, {ChangeEvent, ChangeEventHandler, useEffect, useState} from 'react';
import {getAllGenres} from "../../api/Themoviedb";
import {getAllKeywords} from "../../api/Themoviedb";

function Home() {

    const [allGenres, setAllGenres] = useState<any>();
    const [allKeywords, setAllKeywords] = useState<any>();
    const [keywordInput, setKeywordInput] = useState<string>('');

    useEffect(() => {
        getAllGenres(setAllGenres);
    }, []);

    const changeKeywordInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        setKeywordInput(e.target.value);
        e.target.value && getAllKeywords(setAllKeywords, e.target.value);
    }

    const chooseKeyword = (e: any) => {
        setKeywordInput(e.target.innerHTML);
        setAllKeywords(null);
    }


    return (
        <div className="home">
            <h1>Today I Want To Watch...</h1>
            <div className='home__searchbox'>
                <div className='home__searchbox__type'>
                    <div className='home__searchbox__type__title title-box'>
                        <h2>Type</h2>
                    </div>
                    <form className='home__searchbox__type__radio'>
                        <div className='home__searchbox__genres__radio__single single-box'>
                            <input type="radio" id='tv-show' name="genre"/>
                            <label htmlFor='tv-show'>tv show</label>
                        </div>
                        <div className='home__searchbox__genres__radio__single single-box'>
                            <input type="radio" id='movie' name="genre"/>
                            <label htmlFor='movie'>movie</label>
                        </div>
                    </form>
                </div>
                <div className='home__searchbox__genres'>
                    <div className='home__searchbox__genres__title title-box'>
                        <h2>Genre</h2>
                    </div>
                    <form className='home__searchbox__genres__radio'>
                        {allGenres && allGenres.map( (genre:any) => {
                            return (
                                <div key={genre.id} className='home__searchbox__genres__radio__single single-box'>
                                    <input type="radio" id={genre.name} name="genre"/>
                                    <label htmlFor={genre.name}>{genre.name.toLowerCase()}</label>
                                </div>
                            )
                        })}
                    </form>
                </div>
                <div className='home__searchbox__keywords'>
                    <div className='home__searchbox__keywords__title title-box'>
                        <h2>Keyword *</h2>
                    </div>
                    <form className='home__searchbox__keywords__input' autoComplete='off'>
                        <input type="text" id='keyword' name="genre" value={keywordInput} onChange={changeKeywordInput}/>
                        <label htmlFor='keyword'></label>
                        {allKeywords && <div className='home__searchbox__keywords__input__results'>
                            {allKeywords.map((keyword: any) => {
                                return (
                                    <span key={keyword.id} onClick={chooseKeyword}>{keyword.name}</span>
                                )
                            })
                            }
                        </div>
                        }
                    </form>
                </div>
                <div className='home__searchbox__submit'>
                    <form className='home__searchbox__submit__button'>
                        <button type='submit'>Search</button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Home;
