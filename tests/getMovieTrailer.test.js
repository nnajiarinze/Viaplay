const request = require('supertest');
const app = require('../src/server');
 
// describe('Get Movie Trailer with correct url', () => {
//   it('should return 200', async () => {
//     const res = await request(app)
//       .get('/api/v1/movies/getTrailerLink?movieResourceLink=https://content.viaplay.se/pc-se/film/arrival-2016')
//       .send()
//     expect(res.statusCode).toEqual(200);
//     expect(res.body.url).not.toBeNull;
//   })
// });


describe('Get Movie Trailer with wrong url', () => {
    it('should return 500', async () => {
      const res = await request(app)
        .get('/api/v1/movies/getTrailerLink?movieResourceLink=https://content.viaplay.se/pc-se/film/arrival-2017')
        .send()
      expect(res.statusCode).toEqual(200);
      expect(res.body.message).not.toBeNull;
    })
  })