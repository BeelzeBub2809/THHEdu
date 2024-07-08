export class UltisService {
    static setUrlValueParams(url, obj) {
      const params = Object.keys(obj)
          .map(function(key) {
              return encodeURIComponent(key) + '=' + encodeURIComponent(obj[key]);
          })
          .join('&');
      return url+'/'+params;
    }
}