import { Error } from "mongoose";
import {Response} from 'express'
export default function errorHandler(error:Error) {
    const _error = error as Error;
    throw new Error(_error.message);
}

export function idErrorHanlder(error:Error,id:string,res:Response){
    const _error = error as Error;
    if (_error.message.includes("ObjectId failed")) {
        res.status(404).send({ error: `Note with id ${id} not found` });
    } else {
        res.status(500).send({ error: _error.message });
    }
}