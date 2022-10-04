import { PassportStrategy } from "@nestjs/passport";
import constants from "constants";
import { ExtractJwt } from "passport-jwt";
import { Strategy } from "passport-local";


export class JwtStrategy extends PassportStrategy(Strategy){
    constructor(){
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: 'yoursecret',
        });
    }

    async validate(payload){
        return {id: payload.sub, user:payload.user}
    }

}