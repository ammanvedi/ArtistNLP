import { ArticleType } from './ArticleType';
import { parseStringToHTML, stripHTMLTagsFromString } from '../../Util/Util';
import { ContentParseError } from '../../Error/ContentParseError';

export class XXLParser extends ArticleType {

    static CONTENT_SELECTOR = '.content-wrap';
    static PARSER_NAME = 'XXL';

    constructor( HTMLContent: string ) {
        super( HTMLContent );
    }

    getTextContent() : string {

        const parsed = parseStringToHTML( this.HTMLContent );
        const contentEl = parsed.querySelector( XXLParser.CONTENT_SELECTOR );

        if ( !contentEl ) {
            throw new ContentParseError( XXLParser.PARSER_NAME, 'Content element not found in page' );
        }

        return stripHTMLTagsFromString( contentEl.innerHTML );
    }
}