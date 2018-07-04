export class Persona {
    public nombre: string;
    public edad: number;

    constructor(nombre: string, edad: number) {
        this.nombre = nombre;
        this.edad = edad;
    }

    /**
     * Saluda.
     */
    public saludar(): string {
        return `Soy ${this.nombre} y tengo ${this.edad} años.`;
    }
}
