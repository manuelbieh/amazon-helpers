var amazonHelpers = require('../dist/amazon-helpers');
var assert = require("assert");

describe('amazonHelpers', function() {

    describe('#getIdent()', function() {
        it('should return a valid ASIN no matter if ASIN or URL is given', function () {

            assert.equal(
                amazonHelpers.getIdent('http://www.amazon.de/Highland-Park-Single-Scotch-Whisky/dp/B002E2LO5M/'),
                'B002E2LO5M'
            );

            assert.equal(
                amazonHelpers.getIdent('http://www.amazon.de/dp/3898530213'),
                '3898530213' // ISBN-10
            );

            assert.equal(
                amazonHelpers.getIdent('http://amazon.com/dp/0596519796'),
                '0596519796' // ISBN
            );

            assert.equal(
                amazonHelpers.getIdent('http://www.amazon.com/gp/product/B000MTST70/'),
                'B000MTST70'
            );

            assert.equal(
                amazonHelpers.getIdent('http://www.amazon.fr/Saveur-degustation-Plaque-perfore-baguettes/dp/B004U95E80/'),
                'B004U95E80'
            );

            assert.equal(
                amazonHelpers.getIdent('http://www.amazon.co.jp/Wrong-Pick-Girls-Dungeon-manga-ebook/dp/B00XMG4CYE/'),
                'B00XMG4CYE'
            );

            assert.equal(
                amazonHelpers.getIdent('B002E2LO5M'),
                'B002E2LO5M'
            );

        });
    });

    describe('#getProductUrl()', function() {

        it('should return a product URL', function () {

            assert.equal(
                amazonHelpers.getProductUrl('http://www.amazon.de/Highland-Park-Single-Scotch-Whisky/dp/B002E2LO5M/'),
                'http://www.amazon.de/dp/B002E2LO5M'
            );

            assert.equal(
                amazonHelpers.getProductUrl('http://www.amazon.com/gp/product/B000MTST70/'),
                'http://www.amazon.com/dp/B000MTST70'
            );

            assert.equal(
                amazonHelpers.getProductUrl('http://www.amazon.fr/Saveur-degustation-Plaque-perfore-baguettes/dp/B004U95E80/'),
                'http://www.amazon.fr/dp/B004U95E80'
            );

            assert.equal(
                amazonHelpers.getProductUrl('http://www.amazon.co.jp/Wrong-Pick-Girls-Dungeon-manga-ebook/dp/B00XMG4CYE/ref=sr_1_1?ie=UTF8&qid=1442276590&sr=8-1&keywords=manga'),
                'http://www.amazon.co.jp/dp/B00XMG4CYE'
            );

            assert.equal(
                amazonHelpers.getProductUrl('https://www.amazon.com.br/Amazon-53-000471-Adaptador-de-tomada/dp/B012ELKC28?pd_rd_wg=H80Sz&pd_rd_r=cd3ae90a-b15b-47f1-8ecb-bf6e411043a7&pd_rd_w=d87wN&ref_=pd_gw_ri&pf_rd_r=CHZDTR4ESF6GJD4MQKKA&pf_rd_p=bd217df5-79b4-5bf6-a295-379173023db6'),
                'http://www.amazon.com.br/dp/B012ELKC28'
            );

            assert.equal(
                amazonHelpers.getProductUrl('B002E2LO5M'),
                'http://www.amazon.com/dp/B002E2LO5M'
            );

            assert.equal(
                amazonHelpers.getProductUrl('B002E2LO5M', 'de'),
                'http://www.amazon.de/dp/B002E2LO5M'
            );


        });

        it('should return a product URL for a specific TLD', function () {

            assert.equal(
                amazonHelpers.getProductUrl('http://www.amazon.com/AmazonBasics-High-Speed-HDMI-Cable-2-Pack/dp/B00L3KNWBU/ref=sr_1_3?ie=UTF8', 'co.uk'),
                'http://www.amazon.co.uk/dp/B00L3KNWBU'
            );

            assert.equal(
                amazonHelpers.getProductUrl('http://amazon.com/dp/0596519796', 'de'),
                'http://www.amazon.de/dp/0596519796'
            );

        });

    });

    describe('#getSecureProductUrl()', function() {

        it('should return a https product URL', function () {

            assert.equal(
                amazonHelpers.getSecureProductUrl('http://www.amazon.de/Highland-Park-Single-Scotch-Whisky/dp/B002E2LO5M/'),
                'https://www.amazon.de/dp/B002E2LO5M'
            );

            assert.equal(
                amazonHelpers.getSecureProductUrl('http://www.amazon.com/gp/product/B000MTST70/'),
                'https://www.amazon.com/dp/B000MTST70'
            );

            assert.equal(
                amazonHelpers.getSecureProductUrl('http://www.amazon.fr/Saveur-degustation-Plaque-perfore-baguettes/dp/B004U95E80/'),
                'https://www.amazon.fr/dp/B004U95E80'
            );

            assert.equal(
                amazonHelpers.getSecureProductUrl('http://www.amazon.co.jp/Wrong-Pick-Girls-Dungeon-manga-ebook/dp/B00XMG4CYE/ref=sr_1_1?ie=UTF8&qid=1442276590&sr=8-1&keywords=manga'),
                'https://www.amazon.co.jp/dp/B00XMG4CYE'
            );

            assert.equal(
                amazonHelpers.getSecureProductUrl('B002E2LO5M'),
                'https://www.amazon.com/dp/B002E2LO5M'
            );

            assert.equal(
                amazonHelpers.getSecureProductUrl('B002E2LO5M', 'de'),
                'https://www.amazon.de/dp/B002E2LO5M'
            );


        });

        it('should return a https product URL for a specific TLD', function () {

            assert.equal(
                amazonHelpers.getSecureProductUrl('http://www.amazon.com/AmazonBasics-High-Speed-HDMI-Cable-2-Pack/dp/B00L3KNWBU/ref=sr_1_3?ie=UTF8', 'co.uk'),
                'https://www.amazon.co.uk/dp/B00L3KNWBU'
            );

            assert.equal(
                amazonHelpers.getSecureProductUrl('http://amazon.com/dp/0596519796', 'de'),
                'https://www.amazon.de/dp/0596519796'
            );

        });

    });

    describe('#getIdentByUrl()', function() {

        it('should return a identifier object containing country TLD and ASIN/ISBN for a specific URL', function () {

            assert.deepEqual(
                amazonHelpers.getIdentByUrl('http://www.amazon.com/AmazonBasics-High-Speed-HDMI-Cable-2-Pack/dp/B00L3KNWBU/ref=sr_1_3?ie=UTF8'),
                { asin: 'B00L3KNWBU', tld: 'com' }
            );

            assert.deepEqual(
                amazonHelpers.getIdentByUrl('http://amazon.com/dp/B00L3KNWBU'),
                { asin: 'B00L3KNWBU', tld: 'com' }
            );

            assert.deepEqual(
                amazonHelpers.getIdentByUrl('http://amazon.com/gp/product/B00L3KNWBU'),
                { asin: 'B00L3KNWBU', tld: 'com' }
            );

            assert.deepEqual(
                amazonHelpers.getIdentByUrl('https://www.amazon.co.jp/dp/B00L3KNWBU'),
                { asin: 'B00L3KNWBU', tld: 'co.jp' }
            );

        });

    });

});