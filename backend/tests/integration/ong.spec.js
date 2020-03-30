const request = require('supertest');
const app = require('../../src/app')
const connection = require('../../src/database/connection')
describe('ONG', () => {
      beforeEach(async()=> {
      await connection.migrate.latest();
      });

      afterAll(async()=> {
           await connection.rollback();
           await connection.destroy();
      }) // destroy the connection to quiet all
      
      
      it('should be able to create a new ONG', async()=>{
            const response = await request(app)
            .post('/ongs')
            .send({
                  name: "APAD",
                  email: "contato@teste.com",
                  whatsapp: "14997007331",
                  city: "Lins",
                  uf: "SP"
            })
            expect(response.body).toHaveProperty('id');
            expect(response.body.id).toHaveLength(8);


      });
});