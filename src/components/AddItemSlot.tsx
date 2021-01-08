import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

type AddItemSlotProps = {
    onAddItem(name: string): Promise<void>;
}

type AddItemSlotState = {
    isAdding: boolean;
    name: string;
}

export default class AddItemSlot extends React.Component<AddItemSlotProps, AddItemSlotState> {
    constructor(props: AddItemSlotProps) {
        super(props);

        this.state = {
            isAdding: false,
            name: ""
        };

        this.onAddItemStart = this.onAddItemStart.bind(this);
        this.onAddItemStop = this.onAddItemStop.bind(this);
        this.onAddItem = this.onAddItem.bind(this);
    }

    onAddItemStart(event: React.MouseEvent<HTMLDivElement, MouseEvent>) {
        event.stopPropagation();
        this.setState({isAdding: true});
    }

    onAddItemStop(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
        event.stopPropagation();
        this.setState({isAdding: false});
    }

    async onAddItem(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
        event.stopPropagation();
        const { onAddItem: onAddItem } = this.props;
        const { name } = this.state;
        if (!name)
            return;
        
        await onAddItem(name);
        this.setState({name: "", isAdding: false});
    }

    render() {
        const { isAdding, name } = this.state;

        return(
            <div className="transition duration-150 ease-in-out flex flex-row items-center justify-between mr-2 xl:mx-2 border-2 border-dashed rounded-lg border-indigo-700 bg-opacity-0 bg-indigo-700 text-indigo-300 hover:bg-opacity-100 hover:text-indigo-200 cursor-pointer"
                tabIndex={0}
                onClick={this.onAddItemStart}>
                {(!isAdding && 
                    <div className="px-4 py-3">
                        <div className="pointer-events-none select-none">
                            <FontAwesomeIcon icon="plus" className="mr-3" />
                            Add New...
                        </div>
                    </div>
                ) || 
                (isAdding && 
                    <div className="px-2 py-3 flex flex-row w-full">
                        <input type="text" className="px-2 mr-1 w-full rounded bg-indigo-400 text-indigo-900" 
                            value={name} 
                            onClick={event => event.stopPropagation()}
                            onChange={event => this.setState({name: event.target.value})} />
                        <div className="flex flex-row">
                            <button className="transition duration-150 ease-in-out px-2 mr-1 flex items-center rounded hover:shadow-lg bg-indigo-800 text-indigo-300 hover:bg-indigo-900 hover:text-indigo-200" style={{paddingTop: "0.35rem", paddingBottom: "0.35rem"}}
                                onClick={this.onAddItem}>
                                <FontAwesomeIcon className="text-xs" icon="check" />
                            </button>
                            <button className="transition duration-150 ease-in-out px-2 flex items-center rounded hover:shadow-lg bg-indigo-800 text-indigo-300 hover:bg-indigo-900 hover:text-indigo-200"
                                onClick={this.onAddItemStop}>
                                <FontAwesomeIcon className="text-xs" icon="times" />
                            </button>
                        </div>
                    </div>
                )}
            </div>
        );
    }
}