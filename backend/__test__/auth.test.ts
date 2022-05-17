import supertest from 'supertest';
import { app } from '../src/app';

describe('Auth işlemleri', () => {

    //Sign up
    describe('Sign Up işlemleri', () => {
        it('Başarılı bir şekilde kayıt oluşturuldu', async () => {
    
            const res = await supertest(app).post('/auth/signup')
            .send({
                name: "Hakan",
                surname: "TEST",
                email: "hakan@test.com",
                phone: "5300000000",
                password: "123456a.",
            })
            .expect(200)
        });
    });

    //Siginin
    describe('Sign In İşlemleri', () =>{
        it('Başarlı bir şekilde giriş yaptınız', () => {
            expect(true).toBe(true);
        });
    });
});

describe('Genel Errorlar', ()=>{
    it('Yanlış dizin hatası', async ()=> {
        await supertest(app).get('/random')
        .expect(404);
    });

    it('Giriş yapılmadı', async ()=> {
        await supertest(app).get('/api/booking/see_booked_flights/1')
        .expect(401);
    });
});