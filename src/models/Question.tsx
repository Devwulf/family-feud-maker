import short from "short-uuid";

export type Answer = {
    id: string;
    name: string;
    score: number;
}

export type Question = {
    id: string;
    description: string;
    answers: Answer[];
}

export class QuestionHelper {
    static create(description: string): Question {
        return {
            id: short.generate(),
            description: description || "Please set a question...",
            answers: []
        };
    }

    static setDescription(question: Question, value: string): void {
        if (!value)
            return;

        question.description = value;
    }

    static getAnswer(question: Question, id: string): Answer | undefined {
        if (!id)
            return;

        return question.answers.find(ans => ans.id === id);
    }

    static getExactAnswerId(question: Question, name: string): string | undefined {
        const paramName = name.toLowerCase().replace(/[^a-z0-9 ]/g, "");

        for (let i = 0; i < question.answers.length; i++) {
            const ans = question.answers[i];
            const ansName = ans.name.toLowerCase().replace(/[^a-z0-9 ]/g, "");

            if (ansName === paramName)
                return ans.id;
        }
    }

    static getApproxAnswerId(question: Question, name: string): string | undefined {
        const paramName = name.toLowerCase().replace(/[^a-z0-9 ]/g, "");

        for (let i = 0; i < question.answers.length; i++) {
            const ans = question.answers[i];
            const ansName = ans.name.toLowerCase().replace(/[^a-z0-9 ]/g, "");

            if (ansName.includes(paramName))
                return ans.id;
        }
    }

    static addAnswer(question: Question, name: string, score: number): void {
        const answerId = QuestionHelper.getExactAnswerId(question, name);
        if (answerId)
            return;

        if (!name || !score)
            return;

        const newAnswer: Answer = {id: short.generate(), name, score};
        question.answers.push(newAnswer);
        question.answers.sort((a, b) => b.score - a.score);
    }

    static removeAnswer(question: Question, id: string): void {
        if (!id)
            return;

        for (let i = 0; i < question.answers.length; i++) {
            const ans = question.answers[i];
            if (ans.id === id) {
                question.answers.splice(i, 1);
                break;
            }
        }
    }
}