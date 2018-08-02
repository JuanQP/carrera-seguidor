import { Materia } from "./materia";
import { Nivel } from "./nivel";

export class Carrera {
    public nombre: string;
    public universidad: string;
    public titulo: string;
    public niveles: Nivel[];
    public tieneTituloIntermedio: boolean;
    public tituloIntermedio: string;

    constructor(nombre: string, universidad: string, titulo: string) {
        this.nombre = nombre;
        this.universidad = universidad;
        this.titulo = titulo;
        this.tieneTituloIntermedio = false;
        this.tituloIntermedio = "";
        this.niveles = [];
    }

    /**
     * Indica si todos los niveles de esta carrera están aprobados.
     */
    public estaRecibido(): boolean {
        return this.niveles.every((nivel) => nivel.estaAprobado());
    }

    /**
     * Devuelve todas las materias de esta carrera.
     */
    public materias(): Materia[] {
        return this.niveles
            .map((n) => n.materias)
            .reduce((acc, materiasActuales) => acc.concat(materiasActuales), []);
    }

    /**
     * Devuelve todas las materias que son necesarias para el título intermedio.
     */
    public materiasTituloIntermedio(): number {
        return this.materias()
            .filter((materia) => materia.esDeTituloIntermedio)
            .length;
    }

    /**
     * Devuelve las materias aprobadas.
     */
    public materiasAprobadas(): Materia[] {
        return this.materias()
            .filter((m) => m.estaAprobada());
    }

    /**
     * Devuelve las materias aprobadas del título intermedio.
     */
    public materiasAprobadasTituloIntermedio(): number {
        return this.materiasAprobadas()
            .filter((materia) => materia.esDeTituloIntermedio)
            .length;
    }

    /**
     * Devuelve el porcentaje de materias aprobadas.
     */
    public porcentajeAprobadas(): number {
        return (this.materiasAprobadas().length / this.materias().length * 100);
    }

    /**
     * Devuelve el porcentaje de materias aprobadas para el título intermedio.
     */
    public porcentajeTituloIntermedio(): number {
        return this.materiasAprobadasTituloIntermedio() / this.materiasTituloIntermedio() * 100;
    }

    /**
     * Devuelve el promedio de la carrera teniendo en cuenta las notas de materias aprobadas.
     */
    public promedio(): number {
        const notasDeFinalesAprobados = this.materiasAprobadas()
            .map((m) => m.finales);

        if (notasDeFinalesAprobados.length === 0) {
            return 0;
        }

        return notasDeFinalesAprobados
            .reduce((acc, notas) => acc.concat(notas), [])
            .reduce((acc, nota) => acc + nota, 0) / notasDeFinalesAprobados.length;
    }

    public isNull(): boolean {
        return false;
    }
}
