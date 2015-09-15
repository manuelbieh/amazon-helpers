/*! amazon-helpers by Manuel Bieh
* Tiny helper library to extract an ASIN/ISBN number from an Amazon URL or create a (optionally localized) Amazon URL out of an ASIN/ISBN.
* 
* @author Manuel Bieh
* @url http://www.manuelbieh.com/
* @license MIT
**/

let helpers = {

    getIdent: (urlOrAsin) => {

        if(typeof urlOrAsin === 'string'
            && (
                urlOrAsin.length === 10 // ASIN
                || urlOrAsin.length === 13 // ISBN
            )
            && !!urlOrAsin.match(/^([a-zA-Z0-9]*)$/) === true) {

            return urlOrAsin;

        }

        if(helpers.getIdentByUrl(urlOrAsin)) {

            return helpers.getIdentByUrl(urlOrAsin).asin

        }

    },

    getProductUrl: (urlOrAsin, tld) => {

        let ident = helpers.getIdentByUrl(urlOrAsin);

        if(ident) {

            tld = tld || ident.tld || 'com';
            return `http://www.amazon.${tld}/dp/${ident.asin}`;

        }

        if(typeof urlOrAsin === 'string'
            && (
                urlOrAsin.length === 10 // ASIN
                || urlOrAsin.length === 13 // ISBN
            )
            && !!urlOrAsin.match(/^([a-zA-Z0-9]*)$/) === true) {

            tld = tld || 'com';
            return `http://www.amazon.${tld}/dp/${urlOrAsin}`;

        }

    },

    getIdentByUrl: (url) => {

        const URLREGEX = /https?:\/\/(www\.)?(.*)amazon\.([a-z\.]{2,5})\/(.*)\/?(?:dp|o|gp|-)\/(aw\/d\/|product\/)?(B[0-9]{2}[0-9A-Z]{7}|[0-9]{9}(?:X|[0-9]))/;
        let ident = typeof url === 'string' && url.match(URLREGEX);

        if(ident) {

            return {
                asin: ident.splice(-1)[0],
                tld: ident[3]
            };

        }

    }

};

export default helpers;
