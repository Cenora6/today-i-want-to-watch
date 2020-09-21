export interface SingleData {
    id: number,
    name: string
}

export interface AllGenresResponse {
    genres : SingleData[]
}

export interface AllKeywordsResponse {
    results : SingleData[]
}

export interface SingleId {
    id: string,
    genre_ids: string[],
    poster_path: string
}

export interface RandomMovieIdResponse {
    results : SingleId[]
}


export interface MovieOrShowDetails {
    first_air_date?: string,
    homepage: string,
    imdb_id?: string,
    last_air_date?: string,
    name?: string,
    number_of_seasons?: number,
    original_language: string,
    original_name?: string,
    original_title?: string,
    overview: string,
    poster_path: string,
    production_countries?: string[],
    release_date?: string,
    status?: string,
    seasons?: string,
    title?: string,
    vote_average: string,
    vote_count: string
}

interface SingleCast {
    character: string,
    name: string,
    profile_path?: string
}

export interface MovieOrShowCast {
    cast: SingleCast[]
}