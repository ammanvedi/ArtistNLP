import { MetaDataService, TokenMetaDataList } from './MetaDataService';
import { WikimediaAPI } from '../../API/Wikimedia/WikimediaAPI';
import { WikipediaEntity } from '../../API/Wikimedia/EntityType/EntityType';

export class WikipediaMetaDataService extends MetaDataService {

    api: WikimediaAPI;

    constructor( tokens: Set<string> ) {
        super( tokens );

        this.api = new WikimediaAPI();
    }

    async getModeledEntities() : Promise<Array<object|void>> {

        const resolvingTerms: Array<Promise<WikipediaEntity | void>> = [];

        this.tokens.forEach( token => {
            resolvingTerms.push( this.api.resolveTerm( token ) );
        } )

        return Promise.all( resolvingTerms );
    }

}