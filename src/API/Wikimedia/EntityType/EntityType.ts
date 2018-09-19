export enum WikipediaEntityType {
    ALBUM = 'ALBUM',
    ARTIST = 'ARTIST',
    UNKNOWN = 'UNKNOWN'
};

export interface WikipediaEntity {
    type: WikipediaEntityType,
    generatingTerm: string
};

export const UNKNOWN_WIKIPEDIA_ENTITY: WikipediaEntity = {
    type: WikipediaEntityType.UNKNOWN,
    generatingTerm: ''
};

export class EntityType {

    static INFO_BOX_SELECTOR = '.infobox';

    infoBox: HTMLElement | null;

    constructor( protected document: Document, protected term: string ) {

        this.infoBox = document.querySelector( EntityType.INFO_BOX_SELECTOR );
    }

    getEntityTypeModel() : WikipediaEntity {
        console.log( 'The getEntityTypeModel shoudl be overriden by a subclass' );
        return { ...UNKNOWN_WIKIPEDIA_ENTITY, generatingTerm: this.term };
    }
}