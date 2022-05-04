import {createHmac } from "crypto";
import config from "../app/config"

export function createPwdHash(data:string):string {
    return createHmac('md5',config.hash.salt as string).update(data).digest('hex');
}