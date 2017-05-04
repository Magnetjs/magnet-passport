// import { Strategy, ExtractJwt } from 'passport-jwt'
// import * as fs from 'fs'

// import { asynify } from '../promise'

export default function (app) {
  return {
    strategies: [
      // new Strategy(
      //   {
      //     jwtFromRequest: ExtractJwt.fromAuthHeader(),
      //     passReqToCallback: true,
      //     ignoreExpiration: true,
      //     secretOrKey: fs.readFileSync(__dirname + '/keys/example.pem'),
      //     issuer: 'accounts.example.com',
      //     audience: 'example.com',
      //     algorithms: 'RS256',
      //   },
      //   asynify(log, async function (jwt_payload) {
      //     return await user.get(jwt_payload.id)
      //   })
      // )
    ]
  }
}
