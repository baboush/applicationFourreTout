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


export interface CreateUserDtoApplication { 
    /**
     * username
     */
    username: string;
    /**
     * password
     */
    password: string;
    /**
     * email
     */
    email: string;
    /**
     * role
     */
    role: CreateUserDtoApplication.RoleEnum;
}
export namespace CreateUserDtoApplication {
    export type RoleEnum = 'USER' | 'ADMIN' | 'CONTRIBUTEUR';
    export const RoleEnum = {
        User: 'USER' as RoleEnum,
        Admin: 'ADMIN' as RoleEnum,
        Contributeur: 'CONTRIBUTEUR' as RoleEnum
    };
}


