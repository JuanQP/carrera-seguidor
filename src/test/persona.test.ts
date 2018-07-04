import {Persona} from "../classes/persona";

describe("Persona", () => {
    describe("#saludar()", () => {
        it("saluda correctamente", () => {
            const persona = new Persona("Juan", 26);
            expect(persona.saludar()).toBe("Soy Juan y tengo 26 años.");
        });
    });
});
