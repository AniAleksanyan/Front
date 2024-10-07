export interface IUser{
    id: number
    name: string
    surname: string
    login: string
    password: string
    isPrivate: number
    picture: string
    cover: string
}
export type inputUser = Pick<IUser, 'name'|'surname'|'login'|'password'>    

export interface IResponse{
    status: string
    message?: string
    user?: IUser
    payload: unknown
}

export interface IUserLogin{
    login: string
    password: string
}