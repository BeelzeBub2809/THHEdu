export class UltisService {
    static setUrlValueParams(url, params) {
        if (Object.keys(params).length === 0) {
          return url;
        }
        
        const arrayParams = url.split('/');
        const symbols = ['$', ':'];
        let index = 0;
        const finalParams = [];
    
        arrayParams.forEach(function(value, key) {
          if (symbols.includes(value.charAt(0))) {
            const paramKey = Object.keys(params)[index];
            if (paramKey) {
              finalParams[key] = params[paramKey];
            }
            ++index;
          } else {
            finalParams[key] = value;
          }
        });
        return finalParams.join('/');
    }
}