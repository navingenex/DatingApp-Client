import { Photo } from './Photo';

export interface User {
  id: number;
  username: string;
  age: number;
  knownAs: string;
  gender: string;
  created: Date;
  lastActivated: Date;
  photoUrl: string;
  city: string;
  country: string;
  interests?: string;
  introduction: string;
  lookingFor: string;
  photos?: Photo[];
}
