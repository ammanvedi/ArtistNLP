export class WikipediaParseError extends Error {
    constructor( message: string ) {
        super( `There was an issue parsing Wikipedia ${ message }` );
    }
}