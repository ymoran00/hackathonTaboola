import $ from 'jquery';

const ELASTIC_SERVER = 'http://qa-backstage022.taboola.com:9200';
const ELASTIC_SEARCH_API = ELASTIC_SERVER + '/videos2/_search';

export default class CommUtils {
  static searchText (text, handler) {
    $.post(ELASTIC_SEARCH_API,
        JSON.stringify({
              'query':
              {
                  'multi_match':
                  {
                      'query':'' + text,
                      'type':  'phrase',
                      'fields':['title','text']
                      // 'minimum_should_match': '80%'
                  }
              },
              "sort": [
                  { "_score": { "order": "desc" }},
                  { "ctr": { "order": "desc" }},
                  { "date": { "order": "desc" }}
              ]
          }
        ),$.proxy(function(data) {
          console.log (`got ${data}!`);
          var items = data.hits.hits;
          CommUtils.buildPublishersLabels(items)
          handler(items);
        },this
    )).fail(() => {
      alert ('FAILED...')
    });
  }




  includeExcludePubs(that){
      var index,
          pubName = that.textContent;;
      console.log('pubName: ' + pubName);

      if (that.className.indexOf('excluded') > -1){
         that.className = that.className.replace('excluded','');
        includePubs.push(pubName);
        index = excludePubs.indexOf(pubName);
        if( index > -1) {
          excludePubs = excludePubs.filter(function(x){return x != pubName});
        };
      }
      else {
        that.className += ' excluded';
        excludePubs.push(pubName);
        index = includePubs.indexOf(pubName);
        console.log('pubName: ' + pubName);
        if( index > -1) {
           includePubs = includePubs.filter(function(x){return x != pubName});
        };
      }

      console.log('includePubs: ' + includePubs);
      console.log('excludePubs: ' + excludePubs);
      console.log('=============================');
  }

  addPubToFilterContainer(pubName) {
    var elemnt = document.createElement('div');

    elemnt.setAttribute('onClick','includeExcludePubs(this);');
    elemnt.className = "pubName";
    elemnt.textContent = pubName;
    filterContainer.appendChild(elemnt);
  }

  static buildPublishersLabels(itemsList){
      let pubName = "";
      let includePubs = [],
          excludePubs = [];

      for (var i = 0; i < itemsList.length; i++){
        var item = itemsList[i]['_source'];
         pubName = item.publisher;

         if (includePubs.indexOf(pubName) === -1){
            includePubs.push(pubName);
            //addPubToFilterContainer(pubName);
         }
      }
      document.dispatchEvent(new CustomEvent('filterListUpdate', {'detail': includePubs}));

  }

}
