import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import div from "./CustomLink";

type StrNumInputProps = {
    name: string;
    value: number;
    onEdit(name: string, value: number): Promise<void>;
    onDeleteItem(): Promise<void>;
}

type StrNumInputState = {
    isMouseHover: boolean;
    isEditing: boolean;
    newName: string;
    newValue: number;
}

export default class StrNumInput extends React.Component<StrNumInputProps, StrNumInputState> {
    constructor(props: StrNumInputProps) {
        super(props);

        this.state = {
            isMouseHover: false,
            isEditing: false,
            newName: props.name,
            newValue: props.value
        };

        this.onMouseEnter = this.onMouseEnter.bind(this);
        this.onMouseLeave = this.onMouseLeave.bind(this);

        this.onEditNameStart = this.onEditNameStart.bind(this);
        this.onEditNameStop = this.onEditNameStop.bind(this);
        this.onEditName = this.onEditName.bind(this);
        this.onDeleteItem = this.onDeleteItem.bind(this);
    }

    onMouseEnter(): void {
        this.setState({isMouseHover: true});
    }

    onMouseLeave(): void {
        this.setState({isMouseHover: false});
    }

    onEditNameStart(event: React.MouseEvent<HTMLButtonElement, MouseEvent>): void {
        event.stopPropagation();
        this.setState({isEditing: true, newName: this.props.name, newValue: this.props.value});
    }

    onEditNameStop(event: React.MouseEvent<HTMLButtonElement, MouseEvent>): void {
        event.stopPropagation();
        this.setState({isEditing: false});
    }

    async onEditName(event: React.MouseEvent<HTMLButtonElement, MouseEvent>): Promise<void> {
        event.stopPropagation();
        const { onEdit } = this.props;
        const { newName, newValue } = this.state;
        if (!newName || isNaN(newValue))
            return;

        await onEdit(newName, newValue);
        this.setState({isEditing: false});
    }

    async onDeleteItem(event: React.MouseEvent<HTMLButtonElement, MouseEvent>): Promise<void> {
        event.stopPropagation();
        const { onDeleteItem } = this.props;
        await onDeleteItem();
    }

    render(): JSX.Element {
        const { name, value } = this.props;
        const { isMouseHover, isEditing, newName, newValue } = this.state;

        return(
            <div className="transition duration-150 ease-in-out flex flex-row items-center px-4 py-3 min-w-40 max-w-40 rounded bg-indigo-600 text-indigo-300 hover:bg-indigo-700 hover:text-indigo-200 cursor-pointer"
                onMouseEnter={this.onMouseEnter}
                onMouseLeave={this.onMouseLeave}>
                {(!isEditing && 
                    <>
                        <div className="w-full flex flex-row">
                            <div className="w-4/5 truncate pointer-events-none select-none">{name}</div>
                            <div className="w-1/5 text-right text-lg font-bold truncate pointer-events-none select-none">{value}</div>
                        </div>
                        <div className={`${isMouseHover ? "" : "hidden"} ml-4 flex flex-row`}>
                            <button className="transition duration-150 ease-in-out px-2 mr-1 flex items-center rounded hover:shadow-lg bg-indigo-800 text-indigo-300 hover:bg-indigo-900 hover:text-indigo-200" style={{paddingTop: "0.35rem", paddingBottom: "0.35rem"}}
                                onClick={this.onEditNameStart}>
                                <FontAwesomeIcon className="text-xs" icon="pencil-alt" />
                            </button>
                            <button className="transition duration-150 ease-in-out px-2 flex items-center rounded hover:shadow-lg bg-indigo-800 text-indigo-300 hover:bg-indigo-900 hover:text-indigo-200"
                                onClick={this.onDeleteItem}>
                                <FontAwesomeIcon className="text-xs" icon="trash-alt" />
                            </button>
                        </div>
                    </>
                ) || 
                (isEditing && 
                    <div className="flex flex-row w-full">
                        <input type="text" className="px-2 mr-2 w-4/5 rounded bg-indigo-400 text-indigo-900" 
                            value={newName} 
                            onClick={event => event.stopPropagation()}
                            onChange={event => this.setState({newName: event.target.value})} />
                        <input type="number" className="px-2 mr-2 w-1/5 rounded bg-indigo-400 text-indigo-900 text-right" 
                            value={newValue} 
                            onClick={event => event.stopPropagation()}
                            onChange={event => this.setState({newValue: parseInt(event.target.value)})} />
                        <button className="transition duration-150 ease-in-out px-2 mr-1 flex items-center rounded hover:shadow-lg bg-indigo-800 text-indigo-300 hover:bg-indigo-900 hover:text-indigo-200" style={{paddingTop: "0.35rem", paddingBottom: "0.35rem"}}
                            onClick={this.onEditName}>
                            <FontAwesomeIcon className="text-xs" icon="check" />
                        </button>
                        <button className="transition duration-150 ease-in-out px-2 flex items-center rounded hover:shadow-lg bg-indigo-800 text-indigo-300 hover:bg-indigo-900 hover:text-indigo-200"
                            onClick={this.onEditNameStop}>
                            <FontAwesomeIcon className="text-xs" icon="times" />
                        </button>
                    </div>
                )}
            </div>
        );
    }
}