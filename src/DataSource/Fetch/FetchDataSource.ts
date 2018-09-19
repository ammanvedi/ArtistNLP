import { typeFactory } from '../Type/TypeFactory';
import { makeRequest } from '../../Util/Util';
import * as http from 'http';

/**
 * This function will fetch data from some source url and then process it using the
 * type factory based on the url. It will then return the text content of the given source
 * 
 * @param {string} url the url to fetch
 * @return {string} the string content of the source ready to be tokenised
 */
export const fetchDataSource = function( config: http.RequestOptions ) : Promise<string | void> {

    return makeRequest( config )
        .then( responseData => {
            //based on the url get a parser so we can pull out the text content of request we just made
            const parser = typeFactory( config.hostname || '', responseData || '' );
            return parser.getTextContent();

        } )
        .catch( error => {
            console.log( error );
        } );
}