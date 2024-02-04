import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth2';

passport.serializeUser((user: any, done: any) => {
  done(null, user);
});

passport.deserializeUser((user: any, done: any) => {
  done(null, user);
});

passport.use(
  new GoogleStrategy(
    {
      clientID: '201831658510-n0cr16kupf6bv0cua9s08ht8ldv9j2rv.apps.googleusercontent.com',
      clientSecret: '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',
      callbackURL: 'https://grow3server.onrender.com/auth/callback',
      passReqToCallback: true,
    },
    (request: any, accessToken: any, refreshToken: any, profile: any, done: any) => {
      return done(null, profile);
    }
  )
);

export default passport;
