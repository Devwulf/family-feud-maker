import short from "short-uuid";
import Question from "./Question";

export default class QuestionSet {
    public readonly id: string;
    public name: string;
    public questions: Question[];

    constructor(name: string) {
        this.id = short.generate();
        this.name = name || "Question Set";
        this.questions = [];
    }

    setName(value: string): void {
        if (!value)
            return;

        this.name = value;
    }

    getQuestion(id: string): Question | undefined {
        if (!id)
            return;

        return this.questions.find(question => question.id === id);
    }

    addQuestion(question: Question): void {
        if (!question)
            return;

        this.questions.push(question);
    }

    removeQuestion(id: string): void {
        if (!id)
            return;

        for (let i = 0; i < this.questions.length; i++) {
            const ques = this.questions[i];
            if (ques.id === id) {
                this.questions.splice(i, 1);
                break;
            }
        }
    }
}