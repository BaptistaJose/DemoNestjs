import { Injectable, NestMiddleware } from "@nestjs/common";
import { NextFunction, Request, Response } from "express";

/*export class LoggerMiddleware implements NestMiddleware{
    use(req: Request, res: Response, next: NextFunction) {
        
        console.log(`Se esta ejecutando un metodo ${req.method} en la ruta ${req.url}`);
        next()    
    }

}*/

export function LoggerMiddleware(req: Request, res: Response, next: NextFunction){
    console.log(`Se esta ejecutando un metodo ${req.method} en la ruta ${req.url}`);
    next() 
}