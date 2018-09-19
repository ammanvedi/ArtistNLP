import { ArticleType } from './ArticleType';
import { XXLParser } from './XXLParser';
import { NoParserForUrlError } from '../../Error/NoParserForUrlError';

interface ParserMapping {
    regex: RegExp,
    className: { new( HTMLContent: string ): ArticleType }
}

type ClassMappings = Array<ParserMapping>;

const CLASS_MAPPINGS : ClassMappings = [

    {
        regex: /www\.xxlmag\.com/,
        className: XXLParser
    }

];

export function typeFactory( url: string, HTMLContent: string ): ArticleType {

    for( let count = 0; count < CLASS_MAPPINGS.length; count++ ) {
        const classInfo: ParserMapping = CLASS_MAPPINGS[ count ];
        if( classInfo.regex.exec( url ) ) {
            return new classInfo.className( HTMLContent );
        }
    }

    throw new NoParserForUrlError( url );
}