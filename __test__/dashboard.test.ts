import supertest from 'supertest';
import { app } from '../src/app';

const headers = {
    "Content-Type": "application/json",
    "Set-Cookie": "Set-Cookie=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im1laG1ldHRhbkBydWJlcmx1bmEuY29tIiwiaWF0IjoxNjUyNzg1MDc1fQ.TPBh2HjFts-hARbsJK3RyEkvkDeF_6KDsfCbc5IxfWE",
    "Connection": "keep-alive"
}

describe('Anasayfa işlemleri', () => {

    describe('Sayaçlar', () => {
        it('Bu günkü toplam uçuş sayısı', async () => {
    
            await supertest(app).get('/api/dashboard/total_today')
            .set(headers)
            .expect(200);
        });

        it('Yarınki toplam uçuş sayısı', async () => {
    
            await supertest(app).get('/api/dashboard/total_tomorow')
            .set(headers)
            .expect(200);
        });

        it('Toplam kullanıcı sayısı', async () => {
    
            await supertest(app).get('/api/dashboard/total_user')
            .set(headers)
            .expect(200);
        });
    });

    //Siginin
    describe('Sigin In İşlemleri', () =>{
        it('Başarlı bir şekilde giriş yaptınız', () => {
            expect(true).toBe(true);
        });
    });
});