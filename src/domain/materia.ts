export enum ModalidadCursada {
    Anual,
    Cuatrimestral,
}

export enum EstadoMateria {
    Pendiente,
    Cursando,
    Firmada,
    Aprobada,
}

export class Materia {
    private static RindioAlMenosUnaVez(examenes: number[]) {
        return examenes.length > 0;
    }

    private static UltimaNotaAprobada(examenes: number[]) {
        return examenes[examenes.length - 1] >= 4;
    }

    public nombre: string;
    public modalidadCursada: ModalidadCursada;
    public estado: EstadoMateria;
    public finales: number[];
    public esElectiva: boolean;
    public esDeTituloIntermedio: boolean;

    constructor(nombre: string, modalidadCursada: ModalidadCursada, estado: EstadoMateria) {
        this.nombre = nombre;
        this.modalidadCursada = modalidadCursada;
        this.estado = estado;
        this.finales = [];
        this.esElectiva = false;
        this.esDeTituloIntermedio = false;
    }

    public finalAprobado(): boolean {
        return Materia.RindioAlMenosUnaVez(this.finales) && Materia.UltimaNotaAprobada(this.finales);
    }

    public estaFirmada() {
        return this.estado >= EstadoMateria.Firmada;
    }

    public estaAprobada() {
        return this.estado === EstadoMateria.Aprobada;
    }
}
