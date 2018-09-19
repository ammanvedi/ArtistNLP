export class ProblemFetchingDataSourceError extends Error {
    constructor( url: string ) {
        super( `There was an issue fetching ${ url }` );
    }
}