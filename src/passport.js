import dotenv from 'dotenv';
import path from 'path';
dotenv.config({path: path.resolve(__dirname, ".env")});
import passport from 'passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { prisma } from '../generated/prisma-client';

const jwtOption = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET
};

const verifyUser = async (payload, done) => {
    try{
        const user = await prisma.user({ id: payload.id });
        if(user !== null) {
            return done(null, user);
        } else {
            return done(null, false);
        }
    } catch (error) {
        return done(error, false);
    }
};

export const authenticateJwt = (req, res, next) => passport.authenticate("jwt", { sessions: false }, (error, user) => {
    if(user) {
        req.user = user;
    }
    next();
})(req, res, next);

passport.use(new Strategy(jwtOption, verifyUser));
passport.initialize();