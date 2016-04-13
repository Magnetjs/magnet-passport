### Usage
Basic
```
import magnet from 'magnet-core';
import Config from 'magnet-config';
import Logger from 'magnet-bunyan';
import Server from 'magnet-spdy';
import Session from 'magnet-session';
import Passport from 'magnet-passport';

let app = await magnet([Config, Logger, Server, Session, Passport]);
```

config/passport.js
```
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import jwt from 'jsonwebtoken';

export default {
  async serializeUser(user) {
    return user.id;
  },
  async deserializeUser(id) {
    return {};
  },

  strategies: [
    {
      adapter: JwtStrategy,
      options: {
        jwtFromRequest: ExtractJwt.fromAuthHeader(),
        secretOrKey: 'shhhhh',
        issuer: 'magnetjs.com',
        audience: 'example.net',
      },
      async check(app, jwt_payload) {
        try {
          let user = await app.models.user.findOne({ id: jwt_payload.sub });

          return user;
        } catch (err) {
          throw err;
        }
      }
    }
  ]
};

```
