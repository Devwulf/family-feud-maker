import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import CustomLink from "./CustomLink";

type EditableLinkProps = {
    name: string;
    to: string;
    onEditName(name: string): Promise<void>;
    onDeleteItem(): Promise<void>;
}

type EditableLinkState = {
    isMouseHover: boolean;
    isEditing: boolean;
    newName: string;
}

export default class EditableLink extends React.Component<EditableLinkProps, EditableLinkState> {
    constructor(props: EditableLinkProps) {
        super(props);

        this.state = {
            isMouseHover: false,
            isEditing: false,
            newName: props.name
        };

        this.onMouseEnter = this.onMouseEnter.bind(this);
        this.onMouseLeave = this.onMouseLeave.bind(this);

        this.onEditNameStart = this.onEditNameStart.bind(this);
        this.onEditNameStop = this.onEditNameStop.bind(this);
        this.onEditName = this.onEditName.bind(this);
        this.onDeleteItem = this.onDeleteItem.bind(this);
    }

    onMouseEnter() {
        this.setState({isMouseHover: true});
    }

    onMouseLeave() {
        this.setState({isMouseHover: false});
    }

    onEditNameStart(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
        event.stopPropagation();
        this.setState({isEditing: true, newName: this.props.name});
    }

    onEditNameStop(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
        event.stopPropagation();
        this.setState({isEditing: false});
    }

    async onEditName(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
        event.stopPropagation();
        const { onEditName } = this.props;
        const { newName } = this.state;
        if (!newName)
            return;

        await onEditName(newName);
        this.setState({isEditing: false});
    }

    async onDeleteItem(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
        event.stopPropagation();
        const { onDeleteItem } = this.props;
        await onDeleteItem();
    }

    render() {
        const { name, to } = this.props;
        const { isMouseHover, isEditing, newName } = this.state;

        return(
            <CustomLink className="transition duration-150 ease-in-out flex flex-row items-center justify-between px-4 py-3 mr-2 min-w-40 max-w-40 rounded bg-indigo-600 text-indigo-300 hover:bg-indigo-700 hover:text-indigo-200 cursor-pointer"
                to={to}
                onMouseEnter={this.onMouseEnter}
                onMouseLeave={this.onMouseLeave}>
                {(!isEditing && 
                    <>
                        <span className="truncate pointer-events-none select-none">{name}</span>
                        <div className={`${isMouseHover ? "" : "hidden"} flex flex-row`}>
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
                        <input type="text" className="px-2 mr-2 w-full rounded bg-indigo-400 text-indigo-900" 
                            value={newName} 
                            onClick={event => event.stopPropagation()}
                            onChange={event => this.setState({newName: event.target.value})} />
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
            </CustomLink>
        );
    }
}