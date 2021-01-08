import Dexie from "dexie";
import { Question } from "../models/Question";
import QuestionSet from "../models/QuestionSet";

class LocalDB extends Dexie {
    private questionSets: Dexie.Table<QuestionSet, string>;

    constructor() {
        super("FamilyFeud");

        this.version(1).stores({
            questionSets: "id"
        });
        this.open().catch(error => {
            console.error(`Opening the db '${this.name}' failed: ${error}`);
        });

        this.questionSets = this.table("questionSets");
        this.questionSets.mapToClass(QuestionSet);
    }

    async getQuestionSetIdNames(): Promise<{id: string, name: string}[]> {
        const items = await this.questionSets.toArray();
        const result: {id: string, name: string}[] = [];
        items.forEach(item => {
            result.push({id: item.id, name: item.name});
        });
        return result;
    }

    async getQuestionSet(id: string): Promise<QuestionSet | undefined> {
        const item = await this.questionSets.get(id);
        return item;
    }

    async createQuestionSet(name: string): Promise<QuestionSet | undefined> {
        if (!name)
            return;

        const questionSet = new QuestionSet(name);
        await this.questionSets.add(questionSet, questionSet.id);
        return questionSet;
    }

    async updateQuestionSetName(id: string, name: string): Promise<void> {
        if (!id || !name)
            return;

        await this.questionSets.update(id, {name});
    }

    async updateQuestionSetQuestions(id: string, questions: Question[]): Promise<void> {
        if (!id || !questions)
            return;

        await this.questionSets.update(id, {questions});
    }

    async deleteQuestionSet(id: string): Promise<void> {
        if (!id)
            return;

        await this.questionSets.delete(id);
    }
}

export default new LocalDB();