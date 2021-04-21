// Hér eru þær týpur sem við skilgreinum á móti GraphQL endapunkti

export interface ICharacter {
  id: string;
  name?: string;
  birthYear?: string;
  hairColor?: string;
  eyeColor?: string;
  height?: number;
  mass?: number;
}

export interface ICharacterData {
  person: ICharacter;
}

export interface ICharacters {
  characters: ICharacter[];
}

export interface IPeopleEdge {
  cursor: string;
  node: ICharacter;
}

export interface IInfo {
  endCursor: string;
  hasNextPage: boolean;
}

export interface IPeopleEdges {
  edges: IPeopleEdge[];
  pageInfo: IInfo;
}

export interface IPeopleResponse {
  allPeople: IPeopleEdges;
}

export interface IFilm {
  id: string;
  title: string;
  episodeID: number;
  openingCrawl: string;
  characterConnection: ICharacters;
}

export interface IAllFilms {
  films: IFilm[];
}

export interface IFilmData {
  allFilms: IAllFilms;
}
