import { AxiosGet, AxiosPost } from "./AxiosServices.module";

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
type ReviewInsertType = {
    user_id: string;
    taller_id: string;
    review: string;
    starts: number;
}
const REVIEW_SERVICES = {
    async GET_REVIEWS(limit?: number): Promise<ReviewType[]> {
        if (!limit) limit = 999
        const res: ReviewType[] = await AxiosGet({
            path: '/reviews?select=*,perfil_usuario(nombre, apellido, correo), talleres(nombre)&limit=' + limit
        });
        return res;
    },
    async INSERT_REVIEW(data: ReviewInsertType): Promise<ReviewType[]> {
        const res: ReviewType[] = await AxiosPost({
            path: '/reviews', payload: data
        });
        return res;
    },

};

export default REVIEW_SERVICES