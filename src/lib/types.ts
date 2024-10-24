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
export type inputUser = Pick<IUser, 'name'|'surname'|'login'|'password'>//pick-y vercnum e hamapataskhany

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

export interface IUserChangePassword{
    old: string
    newpwd: string
}

export type IAccount = Omit <IUser, 'login'|'password'>

export interface EditLoginRef {
    handleSubmit: () => void;
}

export interface EditPasswordRef {
    handleSubmit: () => void;
}

export interface IContext {
    account: IUser
    setAccount: ( user:IUser ) => void
}