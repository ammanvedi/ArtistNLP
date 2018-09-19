import { ProblemFetchingDataSourceError } from '../Error/ProblemFetchingDataSourceError';
import * as http from 'http';
import request from 'request';
import * as jsdom from 'jsdom';

enum XPATH_RESULT {
    ANY_TYPE
}

export enum RequestMethod {
    GET = 'GET',
    POST = 'POST'
}

export enum RequestEvent {
    END = 'end',
    ERROR = 'error',
    DATA = 'data'
}

const HTML_TAG_REGEX = /<\/?[a-z]+[^>]*>/gm;
const HTML_COMMENT_REGEX = /<!--.+?-->/gm;
const DEFAULT_REQUEST_HEADERS = {
    headers: {
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/68.0.3440.106 Safari/537.36',
        'Referer': 'http://www.xxlmag.com/gdpr/consent/?redirect=/news/hip-hop-today/2014/11/today-hip-hop-jay-zs-black-album-turns-14/',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
        'Cookie': 'gdpr_consent=YES; abgroup=A; _ga=GA1.2.590324050.1536999344; _gid=GA1.2.616084720.1536999344; connect.sid=s%3AoYzZnhd1fUZ02ScTzq1JZygrRmv4ZyBs.kRKRC7xLmf%2BkIjmOTEZv%2BItK14AvQtLfH1%2BJbLV1XSY; blingblocksession=1'

    }
}

export function nodeListToArray( nodeList: NodeList ) : Array<HTMLElement> {
    return [].slice.call( nodeList );
}

export function evalXPath( document: Document, container: HTMLElement, query: string ) : Node {

    const res = document.evaluate( query, container, null, XPATH_RESULT.ANY_TYPE, null );
    return res.iterateNext();
}

export function stripHTMLTagsFromString( HTMLString: string ) : string {
    return HTMLString.replace( HTML_TAG_REGEX, '' ).replace( HTML_COMMENT_REGEX, '' );
}

export function parseStringToHTML( HTMLString: string ) : Document {
    const dom = new jsdom.JSDOM( HTMLString );
    return dom.window.document;
}

export function requestWasSuccessful( code: number | undefined ) {
    return code ? code < 400 : false;
}

export function makeRequest( options: http.RequestOptions ): Promise<string | void> {




    let raw = '';

    return new Promise( ( resolve, reject ) => {

        request( {
            url: `${ options.protocol }//${ options.hostname }${ options.path }`,
            headers: DEFAULT_REQUEST_HEADERS.headers
        }, ( error, response, body ) => {

            if ( error ) {
                return reject( new ProblemFetchingDataSourceError( options.hostname || '' ) );
            }

            resolve( body );
    
        } );

    } )

}