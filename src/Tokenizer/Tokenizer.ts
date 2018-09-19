

export class Tokenizer {

    static TOKEN_REGEX = {
        NOUN: /[^\.]\s(([A-Z][a-z\-]*)((\s[A-Z][a-z\-]*)+)?)\s/g
    }

    static MIN_LENG_TOKEN = 3;

    constructor( protected inputString: string ) {

    }

    getNounEntities() : Set<string> {

        const nounSet: Set<string> = new Set([]);

        let regexResult: RegExpExecArray | null;

        while( regexResult = Tokenizer.TOKEN_REGEX.NOUN.exec( this.inputString ) ) {
            if ( regexResult[ 1 ].length >= Tokenizer.MIN_LENG_TOKEN ) {
                nounSet.add( regexResult[ 1 ] );
            }
        }

        return nounSet;
    }
}