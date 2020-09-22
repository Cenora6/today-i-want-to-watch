export interface SingleCast {
    character: string,
    name: string,
    profile_path?: string
}

export interface MovieOrShowCast {
    cast: SingleCast[]
}