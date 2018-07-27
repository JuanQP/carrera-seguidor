import * as React from "react";
import { InputGroupAddon } from "reactstrap";
import Button from "reactstrap/lib/Button";
import InputGroup from "reactstrap/lib/InputGroup";
import ListGroup from "reactstrap/lib/ListGroup";
import ListGroupItem from "reactstrap/lib/ListGroupItem";
import FinalItem from "./FinalItem";

interface IFinalesInputProps extends React.ClassAttributes<InputFinales> {
  finales: number[];
  onFinalesChange: (finales: number[]) => void;
}

class InputFinales extends React.Component<IFinalesInputProps, any> {
  private notaInput: React.RefObject<HTMLInputElement>;
  constructor(props: IFinalesInputProps) {
    super(props);
    this.handleNuevoFinal = this.handleNuevoFinal.bind(this);
    this.handleFinalBorrado = this.handleFinalBorrado.bind(this);
    this.notaInput = React.createRef();
  }

  public handleNuevoFinal(): void {
    const finales = this.props.finales.slice();
    const nuevoFinal = Number(this.notaInput.current!.value);
    if (Number.isNaN(nuevoFinal)) {
      return;
    }
    finales.push(nuevoFinal);
    this.props.onFinalesChange(finales);
  }

  public handleFinalBorrado(indice: number): void {
    const finales = this.props.finales.slice();
    finales.splice(indice, 1);
    this.props.onFinalesChange(finales);
  }

  public renderFinales() {
    if (this.props.finales.length === 0) {
      return (
        <ListGroupItem>
          Todavía no hay finales dados en esta materia.
        </ListGroupItem>
      );
    }

    return this.props.finales.map(
      (nota, indice) => {
        return (
          <FinalItem
            onFinalBorrado={this.handleFinalBorrado}
            key={indice}
            indice={indice}
            final={nota}
          />
        );
      },
    );
  }

  public render() {
    return (
      <div>
        <InputGroup>
          <input className="form-control" ref={this.notaInput} placeholder="Nota de final: 10, 10.00, 7, 7.5" type="number"/>
          <InputGroupAddon addonType="append">
            <Button onClick={this.handleNuevoFinal}>Agregar final</Button>
          </InputGroupAddon>
        </InputGroup>
        <ListGroup>
          {this.renderFinales()}
        </ListGroup>
      </div>
    );
  }
}

export default InputFinales;
