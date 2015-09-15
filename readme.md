# Amazon Helpers

Tiny helper library to extract an ASIN/ISBN number from an Amazon URL or create a (optionally localized) Amazon URL out of an ASIN/ISBN.

## Installation

`npm install amazon-helpers`

## Usage

Just require the library like any other npm module:

`var amazonHelpers = require('amazon-helpers');`

## Methods



### .getIdent(urlOrAsin)

`amazonHelpers.getIdent('http://www.amazon.com/gp/product/B000MTST70/')`

=> `B000MTST70`

- - -

### .getProductUrl(urlOrAsin[, tld])

`amazonHelpers.getProductUrl('B000MTST70')`

=> `http://www.amazon.com/dp/B000MTST70`

You can specify a TLD as second argument to convert your URL to another country
`amazonHelpers.getProductUrl('B000MTST70', 'co.uk')`

=> `http://www.amazon.co.uk/dp/B000MTST70`

**Attention:** The library does not check if the product exists in the given TLD!

- - -

### .getIdent(urlOrAsin)

`amazonHelpers.getIdentByUrl('http://amazon.com/gp/product/B00L3KNWBU')`

=> `{ asin: 'B00L3KNWBU', tld: 'com' }`

- - -

For more examples have a look at the tests.

## License

Licensed unter MIT.
