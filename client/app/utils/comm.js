import $ from 'jquery';

const ELASTIC_SERVER = 'http://qa-backstage022.taboola.com:9200';

const ELASTIC_SEARCH_API = ELASTIC_SERVER + '/videos/_search';

export class CommUtils {
  static searchText (text, handler) {
    $.post (ELASTIC_SEARCH_API,
        JSON.stringify({
          'query': {
            'multi_match': {
              'query': 'turkey 2017',
              'fields': ['title', 'text']
            }
          }
        }),
        (data) => {
          console.log (`got ${data}!`);
          handler(data.hits.hits);
        },
        'json'
    ).fail(function() {
      alert ('FAILED...')
    });
  }

}
