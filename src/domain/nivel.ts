import { Materia } from "./materia";

export class Nivel {
    public descripcion: string;
    public materias: Materia[];

    constructor(descripcion: string, materias: Materia[]) {
        this.descripcion = descripcion;
        this.materias = materias;
    }

    /**
     * Indica si todas las materias de este nivel están aprobadas.
     */
    public estaAprobado(): boolean {
        if (this.materias.length === 0) {
            return false;
        }

        return this.materias.every((materia) => materia.estaAprobada());
    }
}
