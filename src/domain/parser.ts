import { Carrera } from "./carrera";
import { EstadoMateria, Materia, ModalidadCursada } from "./materia";
import { Nivel } from "./nivel";

interface IRegistroCarrera {
    nombre: string;
    universidad: string;
    titulo: string;
    niveles: IRegistroNivel[];
    tieneTituloIntermedio: boolean;
    tituloIntermedio: string;
}

interface IRegistroNivel {
    descripcion: string;
    materias: IRegistroMateria[];
}

interface IRegistroMateria {
    nombre: string;
    modalidadCursada: ModalidadCursada;
    estado: EstadoMateria;
    finales: number[];
    esElectiva: boolean;
    esDeTituloIntermedio: boolean;
}

/**
 * Deserealiza una carrera guardada en formato JSON.
 */
export class Parser {
    public static Carrera(json: IRegistroCarrera): Carrera {
        const niveles: Nivel[] = json.niveles.map((n) => Parser.Nivel(n));
        const carrera: Carrera = new Carrera(json.nombre, json.universidad, json.titulo);
        carrera.tieneTituloIntermedio = json.tieneTituloIntermedio;
        carrera.tituloIntermedio = json.tituloIntermedio;
        carrera.niveles = niveles;

        return carrera;
    }

    public static Nivel(json: IRegistroNivel): Nivel {
        const materias: Materia[] = json.materias.map((m) => Parser.Materia(m));

        return new Nivel(json.descripcion, materias);
    }

    public static Materia(json: IRegistroMateria): Materia {
        const materia = new Materia(json.nombre, json.modalidadCursada, json.estado);
        materia.finales = json.finales;
        materia.esElectiva = json.esElectiva ? json.esElectiva : false;
        materia.esDeTituloIntermedio = json.esDeTituloIntermedio ? json.esDeTituloIntermedio : false;

        return materia;
    }
}
