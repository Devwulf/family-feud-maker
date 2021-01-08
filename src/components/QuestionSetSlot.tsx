import React from "react";
import LocalDB from "../services/LocalDB";
import CustomLink from "./CustomLink";
import EditableLink from "./EditableLink";

type QuestionSetSlotProps = {
    id: string;
    name: string;
    onEditName(id: string, name: string): Promise<void>;
    onDeleteItem(id: string): Promise<void>;
}

type QuestionSetSlotState = {

}

export function QuestionSetPlaySlot(props: QuestionSetSlotProps): JSX.Element {
    return (
        <CustomLink to={`/play/${props.id}`} className="mb-3 px-3 py-2 bg-gray-600 text-gray-200">
            {props.name}
        </CustomLink>
    );
}

export function QuestionSetMakeSlot(props: QuestionSetSlotProps): JSX.Element {
    const { id, name, onEditName, onDeleteItem } = props;

    return (
        <EditableLink 
            name={name}
            to={`/make/${id}`}
            onEditName={newName => onEditName(id, newName)}
            onDeleteItem={() => onDeleteItem(id)} />
    );
}