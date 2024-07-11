export class UltisService {

    static setUrlValueParams(url, pars) {
        if(pars === undefined || pars.length == 0){
            return url;
        }
        let params = Object.keys(pars)
            .filter(key => pars[key] !== "")
            .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(pars[key])}`)
            .join('&');
        return url+'?'+params;
    }
}