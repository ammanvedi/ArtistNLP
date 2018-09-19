export class NoParserForUrlError extends Error {
    constructor( url: string ) {
        super( `There is no parser in mapping for ${ url }` );
    }
}