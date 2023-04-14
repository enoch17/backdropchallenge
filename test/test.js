
require('dotenv').config();
const chai = require('chai');
const expect = chai.expect;
const url = process.env.API_URL;
const request = require('supertest')(url);

describe('Query', function () {
    describe('#getUserAcctName', function () {
        //Returns null for not found or invalid
        it('Returns null for not found or invalid', (done) => {
            request.post('/graphql')
                .send({ query: '{ getUserAcctName(bank_code:"Gaven",account_number:"38232328"){user_account_name} }' })
                .expect(200)
                .end((err, res) => {
                    if (err) return done(err);
                    expect(res.body.data.getUserAcctName.user_account_name).to.equal(null);
                    done();
                })
        }).timeout(10000)
        //Returns Users Original Input
        //should return Omolere Enoch Olumid
        it('Returns Users Original Input', (done) => {
            request.post('/graphql')
                .send({ query: '{ getUserAcctName(bank_code:"050",account_number:"0053067002"){user_account_name} }' })
                .expect(200)
                .end((err, res) => {
                    if (err) return done(err);
                    expect(res.body.data.getUserAcctName.user_account_name).to.equal('Omolere Enoch Olumid');
                    done();
                })
        }).timeout(10000)
        //Returns Paystack Account Name
        //should return Adeyemo Adedamola Olumide
        it('Returns Paystack Original input', (done) => {
            request.post('/graphql')
                .send({ query: '{ getUserAcctName(bank_code:"044",account_number:"0034916579"){user_account_name} }' })
                .expect(200)
                .end((err, res) => {
                    if (err) return done(err);
                    expect(res.body.data.getUserAcctName.user_account_name).to.equal('Adeyemo Adedamola Olumide');
                    done();
                })
        }).timeout(10000)
    });
})
describe('Mutations', function () {
    describe('#verifyUser', function () {
        //Returns false for invalid users
        it('Returns false for invalid users', (done) => {
            request.post('/graphql')
                .send({ query: 'mutation{ verifyUser(user_account_name:"John Alabi ",user_account_number:"0053067002",user_bank_code:"050"){is_verified} }' })
                .expect(200)
                .end((err, res) => {
                    if (err) return done(err);
                    expect(res.body.data.verifyUser.is_verified).to.equal(false);
                    done();
                })
        }).timeout(10000)
        // Returns false for Users withe Account Name having LD value greater than 2
        it('Returns false for LD value greater than 2', (done) => {
            request.post('/graphql')
                .send({ query: 'mutation{ verifyUser(user_account_name:"Omolere Enoch ",user_account_number:"0053067002",user_bank_code:"050"){is_verified} }' })
                .expect(200)
                .end((err, res) => {
                    if (err) return done(err);
                    expect(res.body.data.verifyUser.is_verified).to.equal(false);
                    done();
                })
        }).timeout(10000)
        //LD value less than 2
        it('Returns true for LD value less than 2', (done) => {
            request.post('/graphql')
                .send({ query: 'mutation{ verifyUser(user_account_name:"Omolere Enoch Olumid ",user_account_number:"0053067002",user_bank_code:"050"){is_verified} }' })
                .expect(200)
                .end((err, res) => {
                    if (err) return done(err);
                    expect(res.body.data.verifyUser.is_verified).to.equal(true);
                    done();
                })
        }).timeout(10000)
        //Input is accurate
        it('Returns true ', (done) => {
            request.post('/graphql')
                .send({ query: 'mutation{ verifyUser(user_account_name:"Omolere Enoch Olumide ",user_account_number:"0053067002",user_bank_code:"050"){is_verified} }' })
                .expect(200)
                .end((err, res) => {
                    if (err) return done(err);
                    expect(res.body.data.verifyUser.is_verified).to.equal(true);
                    done();
                })
        }).timeout(10000)
    });
})