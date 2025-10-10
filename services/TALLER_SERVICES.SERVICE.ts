import { AxiosGet, AxiosPatch, AxiosPost } from "./AxiosServices.module";

// export type SolicitudesTalleresType = {
//     id: number
//     user_auth_id: string | null
//     nombre_taller: string
//     direccion: string
//     ciudad: string
//     estado: string
//     codigo_postal: string
//     nombre_contacto: string
//     telefono: string
//     email: string
//     descripcion: string | null
//     modulos_seleccionados: string[]
//     estado_solicitud: "pendiente" | "aprobada" | "rechazada"
//     fecha_solicitud: string
//     fecha_actualizacion: string | null
// }

export type TallerSolicitudType = {
    id: number;
    user_auth_id: string;
    nombre_taller: string;
    direccion: string;
    ciudad: string;
    estado: string;
    codigo_postal: string;
    nombre_contacto: string;
    telefono: string;
    email: string;
    descripcion: string;
    modulos_seleccionados: string[];
    estado_solicitud: "pendiente" | "aprobada" | "rechazada";
    fecha_solicitud: string;
    fecha_actualizacion: string;
}
export type TallerType = {
    id?: string;
    nombre?: string;
    direccion?: string;
    telefono?: string;
    logo?: string;
    email?: string;
    pais?: string;
    hora_apertura?: string;
    hora_cierre?: string;
}

export type EspecialidadType = {
    id: number;
    nombre: string;
}
export type CargoTallerType = {
    id: number;
    nombre: string;
}
export type EstadoPersonalType = {
    id: number;
    nombre: string;
}
export type TipoCuentaBancariaType = {
    id: number;
    nombre: string;
}
export type PoliticasMantenimientoType = {
    id: number;
    nombre: string;
}

const TALLER_SERVICES = {
    async GET_ALL_SOLICITUDES_TALLERES(): Promise<TallerSolicitudType[]> {
        const TalleresData: TallerSolicitudType[] = await AxiosGet({ path: '/solicitudes_talleres' })
        return TalleresData;
    },
    async GET_ALL_TALLERES(): Promise<TallerType[]> {
        const TalleresData: TallerType[] = await AxiosGet({ path: '/talleres' })
        return TalleresData;
    },
    async APROBAR_SOLICITUD(Id: number): Promise<TallerSolicitudType> {
        const TalleresData: TallerSolicitudType = await AxiosPatch({
            path: `/solicitudes_talleres?id=eq.${Id}`,
            payload: { estado: "aprobada" }
        })
        console.log(TalleresData)
        return TalleresData;
    },
    async INSERT_TALLER(taller: Omit<TallerType, 'id'>): Promise<TallerType> {
        const TalleresData: TallerType[] = await AxiosPost({
            path: `/talleres`,
            payload: taller
        })
        return TalleresData[0];
    },
    async UPDATE_TALLER(taller: TallerType): Promise<TallerType> {
        const TalleresData: TallerType[] = await AxiosPatch({
            path: `/tallers?id=eq.${taller.id}`,
            payload: taller
        })
        return TalleresData[0];
    },
    async RECHAZAR_SOLICITUD(Id: number): Promise<TallerSolicitudType> {
        const TalleresData: TallerSolicitudType = await AxiosPatch({
            path: `/solicitudes_talleres?id=eq.${Id}`,
            payload: { estado: "rechazada" }
        })
        return TalleresData;
    },
    async GET_ESPECIALIDADES(): Promise<EspecialidadType[]> {
        const TalleresData: EspecialidadType[] = await AxiosGet({ path: `/especialidades_taller` })
        return TalleresData;
    },
    async GET_CARGO_MIEMBRO_EQUIPO(): Promise<CargoTallerType[]> {
        const TalleresData: CargoTallerType[] = await AxiosGet({ path: `/cargos_taller` })
        return TalleresData;
    },
    async GET_ESTADO_PERSONAL(): Promise<EstadoPersonalType[]> {
        const TalleresData: EstadoPersonalType[] = await AxiosGet({ path: `/estado_personal` })
        return TalleresData;
    },
    async GET_TIPO_CUENTA_BANCARIA(): Promise<TipoCuentaBancariaType[]> {
        const TalleresData: TipoCuentaBancariaType[] = await AxiosGet({ path: `/tipo_cuenta_bancaria` })
        return TalleresData;
    },
    async GET_POLITICAS_MANTENIMIENTO(): Promise<PoliticasMantenimientoType[]> {
        const TalleresData: PoliticasMantenimientoType[] = await AxiosGet({ path: `/politicas_mantenimiento` })
        return TalleresData;
    },
};

export default TALLER_SERVICES
