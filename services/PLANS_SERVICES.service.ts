import { AxiosGet } from "./AxiosServices.module";

export type PlansServicesType = {
    id: number;
    created_at: string;
    name: string;
    price: string;
    description: string;
    features: string[];
    popular: boolean;

}
const PLANS_SERVICES = {
    async PLANS(): Promise<PlansServicesType[]> {
        const reparaciones: PlansServicesType[] = await AxiosGet({
            path: '/service_plans?select=*&order=id.asc'
        });
        return reparaciones;
    },
    async PLANS_BY_ID(Id: number): Promise<PlansServicesType[]> {
        const reparaciones: PlansServicesType[] = await AxiosGet({
            path: '/service_plans?select=*&id=eq.' + Id
        });
        return reparaciones;
    }
};

export default PLANS_SERVICES