import React from "react";
import Scrollbar from "react-scrollbars-custom";
import AddItemSlot from "../components/AddItemSlot";
import { QuestionSetMakeSlot } from "../components/QuestionSetSlot";
import LocalDB from "../services/LocalDB";

type QuestionSetIdName = {
    id: string;
    name: string;
}

type MakeProps = {

}

type MakeState = {
    sets: QuestionSetIdName[];
}

export default class Make extends React.Component<MakeProps, MakeState> {
    constructor(props: MakeProps) {
        super(props);

        this.state = {
            sets: []
        };

        this.getQuestionSets = this.getQuestionSets.bind(this);
        this.onAddQuestionSet = this.onAddQuestionSet.bind(this);
        this.onEditQuestionSetName = this.onEditQuestionSetName.bind(this);
        this.onDeleteQuestionSet = this.onDeleteQuestionSet.bind(this);
    }

    async componentDidMount(): Promise<void> {
        await this.getQuestionSets();
    }

    async getQuestionSets(): Promise<void> {
        const items = await LocalDB.getQuestionSetIdNames();
        this.setState({sets: items});
    }

    async onAddQuestionSet(name: string): Promise<void> {
        if (!name)
            return;

        const newSet = await LocalDB.createQuestionSet(name);
        if (!newSet)
            return;

        await this.getQuestionSets();
    }

    async onEditQuestionSetName(id: string, name: string): Promise<void> {
        if (!id || !name)
            return;

        await LocalDB.updateQuestionSetName(id, name);
        await this.getQuestionSets();
    }

    async onDeleteQuestionSet(id: string): Promise<void> {
        if (!id)
            return;

        await LocalDB.deleteQuestionSet(id);
        await this.getQuestionSets();
    }

    render(): JSX.Element {
        const { sets } = this.state;

        return (
            <div className="w-screen h-screen flex justify-center items-center">
                <div className="px-4 py-2 w-1/2">
                    <span className="mb-4 flex justify-center text-xl font-bold">Question Sets</span>
                    <Scrollbar noScrollX style={{height: "calc(100vh - 4rem)"}}>
                        {sets.map((set, index) => (
                            <div key={index} className="mb-2">
                                <QuestionSetMakeSlot id={set.id} name={set.name} onEditName={this.onEditQuestionSetName} onDeleteItem={this.onDeleteQuestionSet} />
                            </div>
                        ))}
                        <AddItemSlot onAddItem={this.onAddQuestionSet} />
                    </Scrollbar>
                </div>
            </div>
        );
    }
}