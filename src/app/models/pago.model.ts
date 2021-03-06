import { Cuentas } from "./cuentas.model";


interface _PagoUser {
    _id: string,
    nombre: string
}

export class Pagos {

    constructor(
        public montoBs: number,
        public montoSus: number,
        public fecha: string,
        public cambio: number, 
        public total: number,
        public _id?: string,
        public usuarioM?: _PagoUser,
        public cuenta?: Cuentas

    ) {}
}