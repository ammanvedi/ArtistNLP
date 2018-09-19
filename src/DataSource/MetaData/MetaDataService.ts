export interface TokenMetaDataModel {
    model: object
}

export type TokenMetaDataList = Array<TokenMetaDataModel | void>;

export class MetaDataService {
    /**
     * This class should be sub classed in order to build a class that takes a set of tokens from a tokeniser
     * and resolve some type of information about them into a TokenMetaDataModel. For example taking the token
     * Jay-Z and resolving this to a TokenMetaDataModel with a Musical Artist Type
     * 
     * @param {Set<string>} tokens the set of tokens to be analysed
     */
    constructor( protected tokens: Set<string> ) {

    }

    getModeledEntities() : Promise< Array< object | void > > {
        console.warn( 'The getModeledEntities method should be overridden by a superclass' );
        return Promise.reject();
    }


}