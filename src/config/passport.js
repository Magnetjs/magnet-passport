export default {
  async serializeUser(user) {
    return user.id;
  },
  async deserializeUser(id) {
    return {};
  },

  // Example
  // import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
  // import jwt from 'jsonwebtoken';
  // strategies: [
  //   {
  //     adapter: JwtStrategy,
  //     options: {
  //       jwtFromRequest: ExtractJwt.fromAuthHeader(),
  //       secretOrKey: 'shhhhh',
  //       issuer: 'magnetjs.com',
  //       audience: 'example.net',
  //     },
  //     async check(app, jwt_payload) {
  //       try {
  //         let user = await app.models.user.findOne({ id: jwt_payload.sub });
  //
  //         return user;
  //       } catch (err) {
  //         throw err;
  //       }
  //     }
  //   }
  // ]
};
