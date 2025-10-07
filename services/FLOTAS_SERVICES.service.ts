import { AxiosDelete, AxiosGet, AxiosPatch, AxiosPost } from "./AxiosServices.module";

export type FlotaType = {
    id?: number;
    created_at?: string;
    nombre?: string;
    identificacion_fiscal?: string;
    estado_operativo?: string;
    telefono?: string;
    correo?: string;
    propietario?: string;
    contacto_departamento_id?: number | null;
    metodo_pago_id?: number | null;
    info_banco_id?: number | null;
    nombre_banco?: string | null;
    empresa?: string;
    cantidad_vehiculos?: number;
    descripcion?: string;
};


const FLOTAS_SERVICES = {
    async GET_ALL_FLOTAS(): Promise<FlotaType[]> {
        const taller_id = localStorage.getItem("taller_id") || "";
        const FlotasData: FlotaType[] = await AxiosGet({ path: '/flotas?select=*&taller_id=eq.' + taller_id })
        return FlotasData;
    },
    async INSERT_FLOTA(flota: Omit<FlotaType, 'id' | 'created_at' | 'contacto_departamento_id'>): Promise<FlotaType[]> {
        const taller_id = localStorage.getItem("taller_id") || "";
        const FlotasData: FlotaType[] = await AxiosPost({ path: '/flotas', payload: { ...flota, taller_id } })
        return FlotasData;
    },
    async UPDATE_FLOTA(flota: Omit<FlotaType, 'created_at' | 'contacto_departamento_id'>): Promise<FlotaType[]> {
        const taller_id = localStorage.getItem("taller_id") || "";
        const FlotasData: FlotaType[] = await AxiosPatch({ path: '/flotas?id=eq.' + flota.id, payload: { ...flota, taller_id } })
        return FlotasData;
    },
    async DELTE_FLOTA(id: number): Promise<FlotaType[]> {
        const FlotasData: FlotaType[] = await AxiosDelete({ path: '/flotas?id=eq.' + id })
        return FlotasData;
    },


};

export default FLOTAS_SERVICES
