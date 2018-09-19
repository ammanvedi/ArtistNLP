import { EntityType, UNKNOWN_WIKIPEDIA_ENTITY, WikipediaEntity } from "./EntityType";

export class EntityAlbum extends EntityType {

    constructor( document: Document, term: string ) {
        super( document, term );
    }

    getEntityTypeModel() : WikipediaEntity {
        return UNKNOWN_WIKIPEDIA_ENTITY
    }
}