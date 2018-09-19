import { EntityType, WikipediaEntityType } from './EntityType';
import { WikipediaParseError } from '../../../Error/WikipediaParseError';
import { EntityAlbum } from './EntityAlbum';
import { EntityArtist } from './EntityArtist';

const INFOBOX_CLASS_MAPPING = [

    {
        classes: 'vevent haudio',
        type: WikipediaEntityType.ALBUM
    },
    {
        classes: 'vcard',
        type: WikipediaEntityType.ARTIST
    }
]

function getInfoBoxType( infoBox: Element ) : WikipediaEntityType | void {

    for( let count = 0; count < INFOBOX_CLASS_MAPPING.length; count++ ) {
        const mapping = INFOBOX_CLASS_MAPPING[ count ];

        if ( infoBox.className.indexOf( mapping.classes ) > -1 ) {
            return mapping.type;
        }
    }

    return;
}

export function entityFactory( document: Document, term: string ) : EntityType | void {

    const infoBox = document.querySelector( EntityType.INFO_BOX_SELECTOR );

    if ( !infoBox ) {
        throw new WikipediaParseError( 'Could not find infoBox!' );
        return;
    }

    const type = getInfoBoxType( infoBox );

    if ( !type ) {
        throw new WikipediaParseError( 'Could not assign a type based on the infobox' );
        return;
    }

    switch( type ) {
        case WikipediaEntityType.ALBUM:
            return new EntityAlbum( document, term );
        case WikipediaEntityType.ARTIST:
           return new EntityArtist( document, term );
    }
}