export interface Ilogin{
    email:string,
    password:string
}

export interface Iregister{
    email:string,
    fullname:string,
    password:string
}

export interface IauthUser {
    tokens: Tokens
    user: User
  }
  
  export interface Tokens {
    access: Access
    refresh: Refresh
  }
  
  export interface Access {
    token: string
    expires: string
  }
  
  export interface Refresh {
    token: string
    expires: string
  }
  
  export interface User {
    id: string
    fullname: string
    email: string
  }