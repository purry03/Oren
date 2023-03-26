export interface User{
    id: number,
    name: string,
    password?: string,
}

export interface Question{
    id: number,
    data: any,
    inputType: string,
    title: string,
}
export interface Response{
    id: number,
    user_id: number,
    data: any,
}