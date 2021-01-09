import React from "react";
import Scrollbar from "react-scrollbars-custom";
import AddItemSlot from "../components/AddItemSlot";
import { QuestionMakeSlot } from "../components/QuestionSlot";
import { QuestionHelper } from "../models/Question";
import LocalDB from "../services/LocalDB";

type QuestionIdDescription = {
    id: string;
    description: string;
}

type EditQuestionSetProps = {
    id: string;
}

type EditQuestionSetState = {
    name: string;
    questions: QuestionIdDescription[];
}

export default class EditQuestionSet extends React.Component<EditQuestionSetProps, EditQuestionSetState> {
    constructor(props: EditQuestionSetProps) {
        super(props);

        this.state = {
            name: "",
            questions: []
        };

        this.getQuestions = this.getQuestions.bind(this);
        this.onAddQuestion = this.onAddQuestion.bind(this);
        this.onEditQuestionDescription = this.onEditQuestionDescription.bind(this);
        this.onDeleteQuestion = this.onDeleteQuestion.bind(this);
    }

    async componentDidMount(): Promise<void> {
        await this.getQuestions();
    }

    async getQuestions(): Promise<void> {
        const { id } = this.props;
        const set = await LocalDB.getQuestionSet(id);
        if (!set)
            return;

        this.setState({name: set.name, questions: set.questions});
    }

    async onAddQuestion(description: string): Promise<void> {
        if (!description)
            return;

        const { id } = this.props;
        const questionSet = await LocalDB.getQuestionSet(id);
        if (!questionSet)
            return;

        questionSet.addQuestion(QuestionHelper.create(description));
        await LocalDB.updateQuestionSetQuestions(id, questionSet.questions);
        await this.getQuestions();
    }

    async onEditQuestionDescription(questionId: string, description: string): Promise<void> {
        if (!questionId || !description)
            return;

        const { id } = this.props;
        const questionSet = await LocalDB.getQuestionSet(id);
        if (!questionSet)
            return;

        const question = questionSet.getQuestion(questionId);
        if (!question)
            return;

        QuestionHelper.setDescription(question, description);
        await LocalDB.updateQuestionSetQuestions(id, questionSet.questions);
        await this.getQuestions();
    }

    async onDeleteQuestion(questionId: string): Promise<void> {
        if (!questionId)
            return;

        const { id } = this.props;
        const questionSet = await LocalDB.getQuestionSet(id);
        if (!questionSet)
            return;

        questionSet.removeQuestion(questionId);
        await LocalDB.updateQuestionSetQuestions(id, questionSet.questions);
        await this.getQuestions();
    }

    render(): JSX.Element {
        const { id } = this.props;
        const { name, questions } = this.state;

        return (
            <div className="w-screen h-screen flex justify-center items-center">
                <div className="px-4 py-2 w-full lg:w-1/2">
                    <span className="mb-4 flex justify-center text-xl font-bold">{name}</span>
                    <Scrollbar noScrollX style={{height: "calc(100vh - 8rem)"}}>
                        {questions.map((question, index) => (
                            <div key={index} className="mb-2">
                                <QuestionMakeSlot setId={id} questionId={question.id} description={question.description} onEditName={this.onEditQuestionDescription} onDeleteItem={this.onDeleteQuestion} />
                            </div>
                        ))}
                        <AddItemSlot label="Add New Question..." onAddItem={this.onAddQuestion} />
                    </Scrollbar>
                </div>
            </div>
        );
    }
}