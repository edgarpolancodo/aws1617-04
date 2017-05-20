'use strict';

var chai = require('chai');
chai.use(require('chai-things'));
var expect = chai.expect;
var universities = require('../universities.js');

describe('universities', function() {

    beforeEach(function(done) {


        universities.connectDb((err) => {
            if (err) {
                return done(err);
            }

            universities.removeAll(function(err) {
                if (err) {
                    return done(err);
                }

                universities.add([{
                    "acronym": "intec",
                    "name": "Instituto Tecnológico de Santo Domingo",
                    "url": "http://www.intec.edu.do/",
                    "country": "Dominican Republic",
                }, {
                    "acronym": "APEC",
                    "name": "Universidad Acción Pro Educación y Cultura",
                    "url": "https://www.unapec.edu.do/",
                    "country": "Dominican Republic"
                }, {
                    "acronym": "PUCMM",
                    "name": "Pontificia Universidad Católica Madre y Maestra",
                    "url": "https://www.pucmm.edu.do/",
                    "country": "Dominican Republic"
                }], done);
            });
        });

        //
        describe('#alluniversities()', function() {
            it('should return all universities', function(done) {
                universities.allUniversities((err, res) => {
                    if (err) {
                        return done(err);
                    }
                    expect(res).to.have.lengthOf(3);
                    expect(res).to.contain.an.item.with.property('acronym', 'intec');
                    expect(res).to.contain.an.item.with.property('acronym', 'APEC');
                    expect(res).to.contain.an.item.with.property('acronym', 'PUCMM');
                    done();
                });
            });
        });

        //
        describe('#remove()', function() {
            it('should remove the university', function(done) {
                universities.remove('PUCMM', (err) => {
                    if (err) {
                        return done(err);
                    }

                    universities.allUniversities((err, res) => {
                        if (err) {
                            return done(err);
                        }

                        expect(res).to.have.lengthOf(2);
                        expect(res).not.to.contain.an.item.with.property('acronym', 'PUCMM');
                        done();
                    });
                });
            });
        });

    });

});
