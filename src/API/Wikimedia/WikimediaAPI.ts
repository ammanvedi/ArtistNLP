import { makeRequest, parseStringToHTML, RequestMethod } from '../../Util/Util';
import { WikipediaEntity, EntityType, UNKNOWN_WIKIPEDIA_ENTITY } from './EntityType/EntityType';
import { entityFactory } from './EntityType/EntityFactory';


export class WikimediaAPI {

    static ENDPOINT = 'en.wikipedia.org';
    static PROTOCOL = 'https:';

    static getSearchPath( term: string ) : string {
        return `/w/index.php?search=${ encodeURIComponent( term ) }`;
    }

    constructor() {}

    resolveTerm( term: string ) : Promise<WikipediaEntity | void> {

        console.log( `Resolving ${ term }...` );

        return makeRequest( {
            protocol: WikimediaAPI.PROTOCOL,
            hostname: WikimediaAPI.ENDPOINT,
            path: WikimediaAPI.getSearchPath( term ),
            method: RequestMethod.GET
        } )
            .then( rawData => {
                const dom = parseStringToHTML( rawData || '' );
                try {
                    const entityInstance: EntityType | void = entityFactory( dom, term );
                    return entityInstance ? entityInstance.getEntityTypeModel() : UNKNOWN_WIKIPEDIA_ENTITY;
                } catch ( err ) {
                    return { ...UNKNOWN_WIKIPEDIA_ENTITY, generatingTerm: term };
                }

            } );

    }
    
}