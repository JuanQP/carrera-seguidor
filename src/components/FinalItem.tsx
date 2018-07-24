import { faFileAlt, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as React from "react";
import Button from "reactstrap/lib/Button";
import ListGroupItem from "reactstrap/lib/ListGroupItem";

interface IFinalItemProps extends React.ClassAttributes<FinalItem> {
    final: number;
    indice: number;
    onFinalBorrado: (key: number) => void;
}

class FinalItem extends React.Component<IFinalItemProps, any> {
    constructor(props: IFinalItemProps) {
        super(props);
        this.handleFinalBorrado = this.handleFinalBorrado.bind(this);
    }

    public handleFinalBorrado(): void {
        this.props.onFinalBorrado(this.props.indice);
    }

    public render() {
        return (
            <ListGroupItem className="d-flex align-items-center bd-highlight">
                <div className="mr-auto">
                    <FontAwesomeIcon icon={faFileAlt}/> <strong>{this.props.final}</strong>
                </div>
                <Button color="danger" onClick={this.handleFinalBorrado}><FontAwesomeIcon icon={faTrash}/></Button>
            </ListGroupItem>);
        }
    }

export default FinalItem;
