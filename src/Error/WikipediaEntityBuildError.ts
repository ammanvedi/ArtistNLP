export class WikipediaEntityBuildError extends Error {
    constructor( message: string ) {
        super( `There was an issue building an entity ${ message }` );
    }
}