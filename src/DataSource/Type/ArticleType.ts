export class ArticleType {

    constructor( protected HTMLContent: string ) {

    }

    getTextContent() : string {
        console.warn( 'getTextContent should be overridden by subclass' );
        return this.HTMLContent;
    } 
}