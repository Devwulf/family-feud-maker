import React from "react";
import AddAnswerSlot from "../components/AddAnswerSlot";
import { AnswerMakeSlot } from "../components/AnswerSlot";
import { Answer, QuestionHelper } from "../models/Question";
import LocalDB from "../services/LocalDB";

type EditQuestionProps = {
    setId: string;
    questionId: string;
}

type EditQuestionState = {
    setName: string;
    description: string;
    answers: Answer[];
}

export default class EditQuestion extends React.Component<EditQuestionProps, EditQuestionState> {
    constructor(props: EditQuestionProps) {
        super(props);

        this.state = {
            setName: "",
            description: "",
            answers: []
        };

        this.getAnswers = this.getAnswers.bind(this);
        this.onAddAnswer = this.onAddAnswer.bind(this);
        this.onEditAnswer = this.onEditAnswer.bind(this);
        this.onDeleteAnswer = this.onDeleteAnswer.bind(this);
    }

    async componentDidMount(): Promise<void> {
        await this.getAnswers();
    }

    async getAnswers(): Promise<void> {
        const { setId, questionId } = this.props;
        const set = await LocalDB.getQuestionSet(setId);
        if (!set)
            return;

        const question = set.getQuestion(questionId);
        if (!question)
            return;

        this.setState({setName: set.name, description: question.description, answers: question.answers});
    }

    async onAddAnswer(name: string, score: number): Promise<void> {
        if (!name || score <= 0)
            return;

        const { setId, questionId } = this.props;
        const set = await LocalDB.getQuestionSet(setId);
        if (!set)
            return;

        const question = set.getQuestion(questionId);
        if (!question)
            return;

        QuestionHelper.addAnswer(question, name, score);
        await LocalDB.updateQuestionSetQuestions(setId, set.questions);
        await this.getAnswers();
    }

    async onEditAnswer(id: string, name: string, score: number): Promise<void> {
        if (!id || !name || score <= 0)
            return;

        const { setId, questionId } = this.props;
        const set = await LocalDB.getQuestionSet(setId);
        if (!set)
            return;

        const question = set.getQuestion(questionId);
        if (!question)
            return;

        QuestionHelper.editAnswer(question, id, name, score);
        await LocalDB.updateQuestionSetQuestions(setId, set.questions);
        await this.getAnswers();
    }

    async onDeleteAnswer(id: string): Promise<void> {
        if (!id)
            return;

        const { setId, questionId } = this.props;
        const set = await LocalDB.getQuestionSet(setId);
        if (!set)
            return;

        const question = set.getQuestion(questionId);
        if (!question)
            return;

        QuestionHelper.removeAnswer(question, id);
        await LocalDB.updateQuestionSetQuestions(setId, set.questions);
        await this.getAnswers();
    }

    render(): JSX.Element {
        const { setName, description, answers } = this.state;

        return (
            <div className="w-screen h-screen flex justify-center items-center">
                <div className="px-4 py-2 w-full lg:w-1/2">
                    <span className="mb-4 flex justify-center text-2xl font-bold">{setName}</span>
                    <span className="mb-4 flex justify-center text-xl font-bold">{description}</span>
                    {answers.map((answer, index) => (
                        <div key={index} className="mb-2">
                            <AnswerMakeSlot answerId={answer.id} name={answer.name} score={answer.score} onEdit={this.onEditAnswer} onDeleteItem={this.onDeleteAnswer} />
                        </div>
                    ))}
                    {answers.length < 8 && (
                        <AddAnswerSlot label="Add New Answer..." onAddItem={this.onAddAnswer} />
                    )}
                </div>
            </div>
        );
    }
}