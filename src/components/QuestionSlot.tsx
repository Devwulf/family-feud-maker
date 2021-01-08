import React from "react";
import CustomLink from "./CustomLink";
import EditableLink from "./EditableLink";

type QuestionSlotProps = {
    id: string;
    description: string;
    onEditName(id: string, name: string): Promise<void>;
    onDeleteItem(id: string): Promise<void>;
}

export function QuestionMakeSlot(props: QuestionSlotProps): JSX.Element {
    const { id, description, onEditName, onDeleteItem } = props;
    return (
        <EditableLink 
            name={description}
            to={`/make/question/${props.id}`}
            onEditName={name => onEditName(id, name)}
            onDeleteItem={() => onDeleteItem(id)} />
    );
}