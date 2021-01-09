import React from "react";
import StrNumInput from "./StrNumInput";

type AnswerSlotProps = {
    answerId: string;
    name: string;
    score: number;
    onEdit(id: string, name: string, value: number): Promise<void>;
    onDeleteItem(id: string): Promise<void>;
}

export function AnswerMakeSlot(props: AnswerSlotProps): JSX.Element {
    const { answerId, name, score, onEdit, onDeleteItem } = props;
    return (
        <StrNumInput 
            name={name}
            value={score}
            onEdit={(name, value) => onEdit(answerId, name, value)}
            onDeleteItem={() => onDeleteItem(answerId)} />
    );
}