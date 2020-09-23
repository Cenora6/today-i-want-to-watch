export interface SingleId {
    id: string,
    genre_ids: string[],
    poster_path: string
}

export interface RandomMovieIdResponse {
    results : SingleId[],
    total_pages: number,
    total_results: number
}

export interface MovieOrShowDetails {
    id: string,
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