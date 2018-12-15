process.env.NODE_ENV = 'test';

let mongoose = require('mongoose');
let Manager = require('../models/managerSchema');

let chai = require('chai');
let chaiHttp = require('chai-http');
let app = require('../app');
let should = chai.should();

chai.use(chaiHttp);
describe('Manager', () => {

    let sampleManager = {
        "managerName" : "Manager",
        "managerEmail" : "polaggarisnehithareddy111@gmail.com",
        "approvalStatus" : false,
        "managerPhoneNumber" : "9652695855",
        "managerGender" : "female",
        "managerAge" : 21,
        "managerCity" : "Agartala",
        "managerCountry" : "India",
    }
    describe('/manager', () => {

        beforeEach((done) => {
            Manager.create(sampleManager, (err) => {
                done();
            });
        });

        afterEach((done) => {
            Manager.remove(sampleManager, (err) => {
                done();
            });
        });

        it('it should get manager hotels by email', (done) => {
            chai.request('http://localhost:3000')
                .post('/manager/getManagerHotels')
                .send({ managerEmail: sampleManager.managerEmail })
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    done();
                });
        });

        
        it('it should get manager details by email', (done) => {
            chai.request('http://localhost:3000')
                .post('/manager/getManagerDetails')
                .send({ managerEmail: sampleManager.managerEmail })
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.data.should.be.a('object');
                    done();
                });
        });

        it('it should get the manager by approval status', (done) => {
            chai.request('http://localhost:3000')
                .get(`/manager`)
                .send({approvalStatus: false})
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object')  
                    done();
                });
        });

        it('it should delete a manager', (done) => {
            chai.request('http://localhost:3000')
            .delete(`/manager/reject/managerEmail=${sampleManager.managerEmail}`)
                .end((err, res) => {
                    res.should.have.status(200)
                    res.body.should.be.a('object')
                    done();
                });
        });

        it('it should update a manager', (done) => {
            chai.request('http://localhost:3000')
            .put(`/manager/approved/managerEmail=${sampleManager.managerEmail}`)
            .set('approvalStatus', true)
                .end((err, res) => {
                    res.should.have.status(200)
                    res.body.should.equal('successfully updated')
                    done();
                });
        });


    });

});