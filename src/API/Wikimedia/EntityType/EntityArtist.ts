import { EntityType, WikipediaEntity, WikipediaEntityType } from "./EntityType";
import { stripHTMLTagsFromString, evalXPath, nodeListToArray } from "../../../Util/Util";
import { WikipediaEntityBuildError } from "../../../Error/WikipediaEntityBuildError";

export interface WikipediaPersonEntity extends WikipediaEntity {
    name: string,
    occupations: Array<string>
}

export class EntityArtist extends EntityType {

    static SELECTOR_NAME_MAIN = 'tbody > tr:nth-child(1) > th > span';
    static XPATH_SELECTOR_OCCUPATION = '//th[text()="Occupation"]';

    constructor( document: Document, term: string ) {
        super( document, term );
    }

    getOccupations() : Array<string> {

        if( !this.infoBox ) {
            return [];
        }

        const occEl: Node | null = evalXPath( this.document, this.infoBox, EntityArtist.XPATH_SELECTOR_OCCUPATION );

        if ( !occEl || !occEl.nextSibling ) {
            return [];
        }

        const sibling = occEl.nextSibling as HTMLTableCellElement;

        const occupations: Array<HTMLElement> = nodeListToArray( sibling.querySelectorAll( 'li' ) );

        return occupations.map( occ => {
            return stripHTMLTagsFromString( occ.innerHTML );
        } );

    }

    getName() : string {
        if ( !this.infoBox ) {
            return '';
        }
        const element = this.infoBox.querySelector( EntityArtist.SELECTOR_NAME_MAIN );

        if ( !element ) {
            return '';
        }

        return stripHTMLTagsFromString( element.innerHTML );
    }

    getEntityTypeModel() : WikipediaPersonEntity {
        return {
            type: WikipediaEntityType.ARTIST,
            name: this.getName(),
            occupations: this.getOccupations(),
            generatingTerm: this.term
        }
    }

}