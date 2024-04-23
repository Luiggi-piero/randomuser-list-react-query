// extender el protroipo de array en los tipos
// es decir, un array va a tener un nuevo metodo
declare global {
    interface Array<T> {
        /**
         * 
         * Decimos que un array del tipo T(cualquier tipo) puede tener un metodo 'toSorted'
         * que tenga como parametro un funcion(compareFn) que tiene 2 parametros a y b ambos 
         * del tipo T(en nuestro caso User), compareFn devuelve un number y 
         * toSorted devuelve un array del tipo T
         */
        toSorted(compareFn?: (a: T, b: T) => number): T[]
    }
}

export interface APIResults {
    results: User[];
    info: Info;
}

export interface Info {
    seed: string;
    results: number;
    page: number;
    version: string;
}

export interface User {
    gender: Gender;
    name: Name;
    location: Location;
    email: string;
    login: Login;
    dob: Dob;
    registered: Dob;
    phone: string;
    cell: string;
    id: ID;
    picture: Picture;
    nat: string;
}

export interface Dob {
    date: Date;
    age: number;
}

export enum Gender {
    Female = "female",
    Male = "male",
}

export interface ID {
    name: string;
    value: null | string;
}

export interface Location {
    street: Street;
    city: string;
    state: string;
    country: string;
    postcode: number | string;
    coordinates: Coordinates;
    timezone: Timezone;
}

export interface Coordinates {
    latitude: string;
    longitude: string;
}

export interface Street {
    number: number;
    name: string;
}

export interface Timezone {
    offset: string;
    description: string;
}

export interface Login {
    uuid: string;
    username: string;
    password: string;
    salt: string;
    md5: string;
    sha1: string;
    sha256: string;
}

export interface Name {
    title: Title;
    first: string;
    last: string;
}

export enum Title {
    MS = "Ms",
    Mademoiselle = "Mademoiselle",
    Miss = "Miss",
    Mr = "Mr",
    Mrs = "Mrs",
}

export interface Picture {
    large: string;
    medium: string;
    thumbnail: string;
}

// Para ordenar haciendo click en el encabezado de la tabla
export enum SortBy {
    NONE = 'none',
    NAME = 'name',
    LAST = 'last',
    COUNTRY = 'country'
}