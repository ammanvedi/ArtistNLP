export class ContentParseError extends Error {
    constructor( parser: string, reason: string = '' ) {
        super( `There was a problem in the ${ parser } parser ${ reason || '' }` );
    }
}