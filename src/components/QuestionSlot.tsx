import React from "react";
import CustomLink from "./CustomLink";
import EditableLink from "./EditableLink";

type QuestionSlotProps = {
    setId: string;
    questionId: string;
    description: string;
    onEditName(id: string, name: string): Promise<void>;
    onDeleteItem(id: string): Promise<void>;
}

export function QuestionMakeSlot(props: QuestionSlotProps): JSX.Element {
    const { setId, questionId, description, onEditName, onDeleteItem } = props;
    return (
        <EditableLink 
            name={description}
            to={`/make/${setId}/${questionId}`}
            onEditName={name => onEditName(questionId, name)}
            onDeleteItem={() => onDeleteItem(questionId)} />
    );
}