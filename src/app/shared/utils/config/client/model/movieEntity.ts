/**
 * Application Fourre Tout
 * Api Rest pour ajouter, supprimer, des rendez-vous, des films, des livres, des taches
 *
 * The version of the OpenAPI document: 1.0.0
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */
import { Categories } from './categories';
import { Favories } from './favories';
import { Profile } from './profile';


export interface MovieEntity { 
    id: number;
    title: string;
    poster: string;
    director: string;
    favories: Array<Favories>;
    categories: Array<Categories>;
    profiles: Array<Profile>;
    createAt: string;
    updateAt: string;
    deleteAt: string;
}

