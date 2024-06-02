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
import { MovieEntity } from './movieEntity';
import { Books } from './books';


export interface Categories { 
    id: number;
    name: string;
    books: Array<Books>;
    movies: Array<MovieEntity>;
}

