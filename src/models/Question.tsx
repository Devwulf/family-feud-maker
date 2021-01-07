import short from "short-uuid";

export type Answer = {
    id: string;
    name: string;
    score: number;
}

export default class Question {
    public readonly id: string;
    public description: string;
    public answers: Answer[];

    constructor(description: string) {
        this.id = short.generate();
        this.description = description || "Please set a question...";
        this.answers = [];
    }

    setDescription(value: string): void {
        if (!value)
            return;

        this.description = value;
    }

    getAnswer(id: string): Answer | undefined {
        if (!id)
            return;

        return this.answers.find(ans => ans.id === id);
    }

    getExactAnswerId(name: string): string | undefined {
        const paramName = name.toLowerCase().replace(/[^a-z0-9 ]/g, "");

        for (let i = 0; i < this.answers.length; i++) {
            const ans = this.answers[i];
            const ansName = ans.name.toLowerCase().replace(/[^a-z0-9 ]/g, "");

            if (ansName === paramName)
                return ans.id;
        }
    }

    getApproxAnswerId(name: string): string | undefined {
        const paramName = name.toLowerCase().replace(/[^a-z0-9 ]/g, "");

        for (let i = 0; i < this.answers.length; i++) {
            const ans = this.answers[i];
            const ansName = ans.name.toLowerCase().replace(/[^a-z0-9 ]/g, "");

            if (ansName.includes(paramName))
                return ans.id;
        }
    }

    addAnswer(name: string, score: number): void {
        const answerId = this.getExactAnswerId(name);
        if (answerId)
            return;

        if (!name || !score)
            return;

        const newAnswer: Answer = {id: short.generate(), name, score};
        this.answers.push(newAnswer);
        this.answers.sort((a, b) => b.score - a.score);
    }

    removeAnswer(id: string): void {
        if (!id)
            return;

        for (let i = 0; i < this.answers.length; i++) {
            const ans = this.answers[i];
            if (ans.id === id) {
                this.answers.splice(i, 1);
                break;
            }
        }
    }
}