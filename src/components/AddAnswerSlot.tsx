import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

type AddAnswerSlotProps = {
    label: string;
    onAddItem(name: string, value: number): Promise<void>;
}

type AddAnswerSlotState = {
    isAdding: boolean;
    name: string;
    value: number;
}

export default class AddAnswerSlot extends React.Component<AddAnswerSlotProps, AddAnswerSlotState> {
    constructor(props: AddAnswerSlotProps) {
        super(props);

        this.state = {
            isAdding: false,
            name: "",
            value: 1
        };

        this.onAddItemStart = this.onAddItemStart.bind(this);
        this.onAddItemStop = this.onAddItemStop.bind(this);
        this.onAddItem = this.onAddItem.bind(this);
    }

    onAddItemStart(event: React.MouseEvent<HTMLDivElement, MouseEvent>): void {
        event.stopPropagation();
        this.setState({isAdding: true});
    }

    onAddItemStop(event: React.MouseEvent<HTMLButtonElement, MouseEvent>): void {
        event.stopPropagation();
        this.setState({isAdding: false});
    }

    async onAddItem(event: React.MouseEvent<HTMLButtonElement, MouseEvent>): Promise<void> {
        event.stopPropagation();
        const { onAddItem: onAddItem } = this.props;
        const { name, value } = this.state;
        if (!name || !value)
            return;
        
        await onAddItem(name, value);
        this.setState({name: "", value: 1, isAdding: false});
    }

    render(): JSX.Element {
        const { label } = this.props;
        const { isAdding, name, value } = this.state;

        return(
            <div className="transition duration-150 ease-in-out flex flex-row items-center justify-between mr-2 xl:mx-2 border-2 border-dashed rounded-lg border-indigo-700 bg-opacity-0 bg-indigo-700 text-indigo-300 hover:bg-opacity-100 hover:text-indigo-200 cursor-pointer"
                tabIndex={0}
                onClick={this.onAddItemStart}>
                {(!isAdding && 
                    <div className="px-4 py-3">
                        <div className="pointer-events-none select-none">
                            <FontAwesomeIcon icon="plus" className="mr-3" />
                            {label}
                        </div>
                    </div>
                ) || 
                (isAdding && 
                    <div className="px-2 py-3 flex flex-row w-full">
                        <input type="text" className="px-2 mr-1 w-4/5 rounded bg-indigo-400 text-indigo-900" 
                            value={name} 
                            onClick={event => event.stopPropagation()}
                            onChange={event => this.setState({name: event.target.value})} />
                        <input type="number" className="px-2 mr-2 w-1/5 rounded bg-indigo-400 text-indigo-900 text-right" 
                            value={value} 
                            onClick={event => event.stopPropagation()}
                            onChange={event => this.setState({value: parseInt(event.target.value)})} />
                        <button className="transition duration-150 ease-in-out px-2 mr-1 flex items-center rounded hover:shadow-lg bg-indigo-800 text-indigo-300 hover:bg-indigo-900 hover:text-indigo-200" style={{paddingTop: "0.35rem", paddingBottom: "0.35rem"}}
                            onClick={this.onAddItem}>
                            <FontAwesomeIcon className="text-xs" icon="check" />
                        </button>
                        <button className="transition duration-150 ease-in-out px-2 flex items-center rounded hover:shadow-lg bg-indigo-800 text-indigo-300 hover:bg-indigo-900 hover:text-indigo-200"
                            onClick={this.onAddItemStop}>
                            <FontAwesomeIcon className="text-xs" icon="times" />
                        </button>
                    </div>
                )}
            </div>
        );
    }
}