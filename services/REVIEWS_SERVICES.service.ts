import { AxiosGet } from "./AxiosServices.module";

export type ReviewType = {
    id: number;
    user_id: string;
    taller_id: string;
    review: string;
    created_at: string;
    starts: number;
    perfil_usuario: { nombre: string, apellido: string, correo: string };
    talleres: { nombre: string }

}
const REVIEW_SERVICES = {
    async GET_REVIEWS(): Promise<ReviewType[]> {
        const res: ReviewType[] = await AxiosGet({
            path: '/reviews?select=*,perfil_usuario(nombre, apellido, correo), talleres(nombre)'
        });
        return res;
    },

};

export default REVIEW_SERVICES