process.env.NODE_ENV = 'test';

let mongoose = require('mongoose');
let Customer = require('../models/customerSchema');

let chai = require('chai');
let chaiHttp = require('chai-http');
let app = require('../app');
let should = chai.should();
chai.use(chaiHttp);

describe('Customers', () => {

    let sampleCustomer = {
        customerName : "Moon Moon",
        customerEmail : "moonmoon@gmail.com",
        customerIdToken : "AGdpqexrtCYpW3jOaSRbdBqhsWIuW3HMC4F3jBoSCVTB75s0wnlKhN8s8WYgH52UmEjFuspSQtIEcPTaC8P70Cel3Gg8U-31R1IJRC3xbwsPW_Huy6jU_37adnk8Gcko5pRRgYWC6a_jo0qwspogtLvWlQxtZsXH_DLgf6-qlWyxEXd3GVlnubsWaIy_PEYR7FDc6qFVLLbMZgcrdAeikIVBMPB7HGYg5Up7JUDfcHeseUjofRjz6ng",
        customerPhoneNumber : "8973457897",
        customerGender : "female",
        customerAge : 37,
        customerCity : "Ranthambore",
        customerCountry : "India"
    }
    let sampleCustomer2 = {
        customerName : "Some Two",
        customerEmail : "sometwooo@gmail.com",
        customerIdToken : "AGdpqeypGco1m7gFaOZAdnDrqxIkIKng58WH9Tz4Fx1PI3U8G14g1W6wryKdeicppiRMkZKxvHVGHnOuhkGHqZQhV4kBy91lwxMVEQCGucrTkQ8KDzlwcAXD5qH4KsyRPTdeh2ZHsZccXME-1Gr_b054VeuOJGFHrKTu-j5fI25ZjYCN-MA3HYw2pAw3wetc52haCzOJ66OLbt6AUOveHb8QvzLXz0tfomokEdMzM124aSLyvCOCb6A",
        customerPhoneNumber : "8927458980",
        customerGender : "female",
        customerAge : 33,
        customerCity : "Coonoorr",
        customerCountry : "India"
    }
    describe('/customer', () => {

        beforeEach((done) => {
            Customer.create([sampleCustomer, sampleCustomer2], (err) => {
                done();
            });
        });

        afterEach((done) => {
            Customer.remove(sampleCustomer, (err) => {})
                .then(
                    Customer.remove(sampleCustomer2, (err) => {
                        done();
                    })
                )
        });

        it('it should get all the customers if the request is valid', (done) => {
            chai.request('http://localhost:3000')
                .get(`/customer`)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.data.should.be.a('array');
                    res.body.should.be.a('object');
                    done();
                });
        });


        it('it should return 404 if request is invalid', (done) => {
            chai.request('http://localhost:3000')
                .get(`/customers`)
                .end((err, res) => {
                    res.should.have.status(404);
                    done();
                });
        });

        it('it should get customer by email', (done) => {
            chai.request('http://localhost:3000')
                .post(`/customer/get-customer`)
                .send({customerEmail: sampleCustomer.customerEmail})
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.data.should.be.a('object');
                    done();
                });
        });
        

        it('it should find customer by email', (done) => {
            chai.request('http://localhost:3000')
                .post(`/customer/userdetails`)
                .send({customerEmail: sampleCustomer.customerEmail})
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    done();
                });
        });

        it('it should return 404 if url not found', (done) => {
            chai.request('http://localhost:3000')
                .post(`/customer/userdetail`)
                .send({customerEmail: sampleCustomer.customerEmail})
                .end((err, res) => {
                    res.should.have.status(404);
                    done();
                });
        });
        
        it('it should return 400 if data is incorrect for create customer ', (done) => {
            chai.request('http://localhost:3000')
                .post(`/customer/signup-customer`)
                .send({customerName: sampleCustomer.customerName,
                    customerEmail: sampleCustomer.customerEmail,
                    customerIdToken: sampleCustomer.customerIdToken,
                    customerPhoneNumber: sampleCustomer.customerPhoneNumber,
                    customerGender: sampleCustomer.customerGender,
                    customerAge: sampleCustomer.customerAge,
                    customerCity: sampleCustomer.customerCity,
                    Country: sampleCustomer.customerCountry})
                   .end((err, res) => {
                    res.should.have.status(400)
                    done();
                });
        });

        it('it should update a customer', (done) => {
            chai.request('http://localhost:3000')
            .put(`/customer/editdetails/customerEmail=${sampleCustomer.customerEmail}`)
            .set({customerName: 'snehita',
                  customerPhoneNumber: '9652695855',
                  customerGender: 'female',
                  customerAge: 22,
                  customerCity: 'hyderabad',
                  customerCountry: 'India'})
                .end((err, res) => {
                    res.should.have.status(200)
                    res.body.should.equal('successfully updated')
                    done();
                });
        });
          
    });

});
