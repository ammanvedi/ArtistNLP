import { fetchDataSource } from './DataSource/Fetch/FetchDataSource';
import { RequestMethod } from './Util/Util';
import { Tokenizer } from './Tokenizer/Tokenizer';
import { WikipediaMetaDataService } from './DataSource/MetaData/WikipediaMetaDataService';

fetchDataSource( {
  protocol: 'http:',
  hostname: 'www.xxlmag.com',
  path: '/rap-music/reviews/2017/02/big-sean-i-decided-album-review/',
  method: RequestMethod.GET
} )
  .then( textContent => {
    const tokenize: Tokenizer = new Tokenizer( textContent || '' );
    const nouns: Set<string> = tokenize.getNounEntities();
    const wikiMetaService: WikipediaMetaDataService = new WikipediaMetaDataService( nouns );
    wikiMetaService.getModeledEntities()
      .then( ents => {
        console.log( 'ents', JSON.stringify( ents, null, 2 ) );
      } )
  } );