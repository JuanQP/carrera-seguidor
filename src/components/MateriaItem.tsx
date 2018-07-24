import * as React from "react";
import ListGroupItem from "reactstrap/lib/ListGroupItem";
import { EstadoMateria, Materia } from "../domain/materia";

interface IMateriaItemProps extends React.ClassAttributes<MateriaItem> {
    materia: Materia;
    indice: number;
    onMateriaClick: (indice: number) => void;
}

interface IMateriaItemState extends React.ClassAttributes<MateriaItem> {
    modal: boolean;
}

class MateriaItem extends React.Component<IMateriaItemProps, IMateriaItemState> {
    constructor(props: IMateriaItemProps) {
        super(props);
        this.color = this.color.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.state = {
            modal: false,
        };
    }

    public color(materia: Materia): string {
        if (materia.estado === EstadoMateria.Aprobada) {
            return "success";
        }
        else if (materia.estado === EstadoMateria.Firmada) {
            return "warning";
        }
        else if (materia.estado === EstadoMateria.Cursando) {
            return "primary";
        }
        return "";
    }

    public handleClick(): void {
        this.props.onMateriaClick(this.props.indice);
    }

    public render() {
        return (
            <ListGroupItem
                tag="a"
                href="#"
                action={true}
                color={this.color(this.props.materia)}
                onClick={this.handleClick}
                className={"text-truncate"}
            >
                {this.props.materia.nombre}
            </ListGroupItem>
        );
    }
}

export default MateriaItem;
