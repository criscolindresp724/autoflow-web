import { AxiosDelete, AxiosGet, AxiosPatch, AxiosPost } from "./AxiosServices.module";

export type MiembroEquipoTrabajoType = {
    id: number;
    created_at: string;
    nombre: string;
    especialidad_id: number;
    cargo_id: number;
    telefono: string;
    email: string;
    estado_personal_id: number;
    taller_id: string;
    salario: number;
    apellido: string;
    ordenes_completadas: number;
    horas_trabajadas: number;
    especialidades_taller: {
        id: number;
        nombre: string;
    };
    cargos_taller: {
        id: number;
        nombre: string;
    };
    estado_personal: {
        id: number;
        nombre: string;
    };
};

export type InsertMiembroEquipo = Omit<MiembroEquipoTrabajoType, 'id' | 'especialidades_taller' | 'cargos_taller' | 'estado_personal' | 'created_at' | 'ordenes_completadas' | 'taller_id'>
type UpdateMiembroEquipo = Omit<MiembroEquipoTrabajoType, 'especialidades_taller' | 'cargos_taller' | 'estado_personal' | 'created_at' | 'ordenes_completadas' | 'taller_id'>

const EQUIPO_TRABAJO_SERVICES = {
    async GET_ALL_EQUIPO(): Promise<MiembroEquipoTrabajoType[]> {
        const taller_id = localStorage.getItem("taller_id") || "";
        const facturas: MiembroEquipoTrabajoType[] = await AxiosGet({ path: '/equipo_trabajo?select=*, especialidades_taller(id, nombre), cargos_taller(id, nombre), estado_personal(id, nombre)&taller_id=eq.' + taller_id })
        return facturas;
    },
    async INSERT_MIEMBRO(miembro: InsertMiembroEquipo): Promise<MiembroEquipoTrabajoType[]> {
        const taller_id = localStorage.getItem("taller_id") || "";
        const facturas: MiembroEquipoTrabajoType[] = await AxiosPost({ path: '/equipo_trabajo', payload: { taller_id, ...miembro } })
        return facturas;
    },
    async UPDATE_MIEMBRO(miembro: UpdateMiembroEquipo): Promise<MiembroEquipoTrabajoType[]> {
        const facturas: MiembroEquipoTrabajoType[] = await AxiosPatch({ path: '/equipo_trabajo?id=eq.' + miembro.id, payload: miembro })
        return facturas;
    },
    async DELETE_MIEMBRO(id: number): Promise<MiembroEquipoTrabajoType[]> {
        const facturas: MiembroEquipoTrabajoType[] = await AxiosDelete({ path: '/equipo_trabajo?id=eq.' + id })
        return facturas;
    }
};

export default EQUIPO_TRABAJO_SERVICES
