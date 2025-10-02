import { AxiosGet } from "./AxiosServices.module";


type ResCabeceraDashboardType = {
    taller_id: string;
    ordenes_pendientes: number;
    citas_pendientes: number;
    ingresos_mes_actual: number;
    tecnicos_disponibles: number;
};
export type CabeceraDashboardType = {
    ordenes_pendientes: number;
    citas_pendientes: number;
    ingresos_mes_actual: number;
    tecnicos_disponibles: number;
};

export type RendimientoOrdenesSemanalesType = {
    dia: string;
    completadas: number;
    pendientes: number;
};

export type EstadoOrdenType = {
    estado: string;
    porcentaje: number;
    cantidad: number;
};
export type TipoOrdenPorcentajeType = {
    tipo_orden: string;
    porcentaje: string;
};
export type DistribucionEspecialidadType = {
    especialidad: string;
    cantidad_total: number;
}
export type RendimientoTecnicoType = {
    tecnico_name: string;
    tiempo_promedio_hora: number;
    ordenes_completadas: number;
};
export type IngresosMensualesType = {
    taller_id: string;
    mes: string;
    total: number;
}
const DASHBOARD_TALLER_SERVICES = {
    async GET_CABECERA(): Promise<CabeceraDashboardType> {
        const taller_id = localStorage.getItem("taller_id") || "";
        const data: ResCabeceraDashboardType[] = await AxiosGet({ path: '/vista_cabecera_dashboard?select=*&taller_id=eq.' + taller_id })
        const res = data[0]
        delete res.taller_id
        return data[0];
    },
    async GET_RENDIMIENTO_ORDENES_SEMANALES(): Promise<RendimientoOrdenesSemanalesType[]> {
        const taller_id = localStorage.getItem("taller_id") || "";
        const data: RendimientoOrdenesSemanalesType[] = await AxiosGet({ path: '/vista_rendimientono_ordenes_semanales' })
        return data;
    },
    async GET_ESTADO_ORDENES(): Promise<EstadoOrdenType[]> {
        const taller_id = localStorage.getItem("taller_id") || "";
        const data: EstadoOrdenType[] = await AxiosGet({ path: '/vista_estado_ordenes' })
        return data;
    },

    async GET_PORCENTAJE_ORDENES_POR_TIPO(): Promise<TipoOrdenPorcentajeType[]> {
        const taller_id = localStorage.getItem("taller_id") || "";
        const data: TipoOrdenPorcentajeType[] = await AxiosGet({ path: '/vista_ordenes_por_tipo' })
        return data;
    },
    async GET_DISTRIBUCION_DE_ESPECIALIDADES(): Promise<DistribucionEspecialidadType[]> {
        const taller_id = localStorage.getItem("taller_id") || "";
        const data: DistribucionEspecialidadType[] = await AxiosGet({ path: '/vista_distribucion_de_especialidades' })
        return data;
    },
    async GET_RENDIMIENTO_DE_TECNICOS(): Promise<RendimientoTecnicoType[]> {
        const taller_id = localStorage.getItem("taller_id") || "";
        const data: RendimientoTecnicoType[] = await AxiosGet({ path: '/vista_rendimiento_tecnicos' })
        return data;
    },
    async GET_INGRESOS_MENSUALES(): Promise<IngresosMensualesType[]> {
        const taller_id = localStorage.getItem("taller_id") || "";
        const data: IngresosMensualesType[] = await AxiosGet({ path: '/vista_ingresos_facturas_por_mes?select=*&taller_id=eq.' + taller_id })
        return data;
    },

};

export default DASHBOARD_TALLER_SERVICES
