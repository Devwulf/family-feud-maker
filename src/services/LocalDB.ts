import Dexie from "dexie";
import { HistoryItem, HistoryItemPrices } from "../dataContracts/HistoryItem";
import { ItemPriceSnapshot } from "../dataContracts/ItemPriceSnapshot";
import { HistoryTimespan } from "../utils/HistoryTimespan";

class LocalDB extends Dexie {
    private historyItems: Dexie.Table<HistoryItem, number>;

    constructor() {
        super("FamilyFeud");

        this.version(1).stores({
            historyItems: "Id"
        });
        this.open().catch(error => {
            console.error(`Opening the db '${this.name}' failed: ${error}`);
        });

        this.historyItems = this.table("historyItems");
        this.historyItems.mapToClass(HistoryItem);
    }

    async getHistoryItem(id: number, timespan: HistoryTimespan): Promise<HistoryItem | null> {
        const item = await this.historyItems.get(id);
        if (!item)
            return null;
        
        if (timespan === HistoryTimespan.OneMonth)
            return item;

        const now = new Date();
        let timeFromNow: number;
        switch (timespan) {
        case HistoryTimespan.OneHour:
            timeFromNow = now.setTime(now.getTime() - (1 * 60 * 60 * 1000));
            break;
        case HistoryTimespan.SixHours:
            timeFromNow = now.setTime(now.getTime() - (6 * 60 * 60 * 1000));
            break;
        case HistoryTimespan.TwelveHours:
            timeFromNow = now.setTime(now.getTime() - (12 * 60 * 60 * 1000));
            break;
        case HistoryTimespan.OneDay:
            timeFromNow = now.setDate(now.getDate() - 1);
            break;
        case HistoryTimespan.ThreeDays:
            timeFromNow = now.setDate(now.getDate() - 3);
            break;
        case HistoryTimespan.OneWeek:
            timeFromNow = now.setDate(now.getDate() - 7);
            break;
        case HistoryTimespan.TwoWeeks:
            timeFromNow = now.setDate(now.getDate() - 14);
            break;
        default:
            timeFromNow = now.setDate(now.getDate() - 30);
            break;
        }
        
        item.filterHistory(price => price.time >= timeFromNow);
        return item;
    }

    async hasDetails(id: number): Promise<boolean> {
        const item = await this.historyItems.get(id);
        if (item && item.Name)
            return true;
        return false;
    }

    async getNewestTime(id: number): Promise<number> {
        const item = await this.getHistoryItem(id, HistoryTimespan.OneMonth);
        if (!item || !item.History)
            return 0;
        
        return item.History[0].time;
    }

    async setHistoryItem(item: HistoryItem) {
        if (!item)
            return;
            
        const dbItem = await this.historyItems.get(item.Id);
        if (!dbItem)
            await this.historyItems.add(item, item.Id);

        await this.historyItems.update(item.Id, {
            ChatLink: item.ChatLink,
            Name: item.Name,
            Icon: item.Icon,
            Description: item.Description,
            Type: item.Type,
            Rarity: item.Rarity,
            Level: item.Level,
            History: item.History
        });
    }

    async setHistoryItemPrices(id: number, newHistory: ItemPriceSnapshot[]) {
        const item = await this.historyItems.get(id);
        if (!item)
            return;

        // Else, update the history of the current item to include the new history
        // Unshift (push to front) here because history is sorted by time descending,
        // and the higher the time value, the newer it is.
        item.History.unshift(...newHistory);
        await this.historyItems.update(id, {History: item.History});
    }

    async deleteOldPrices(id: number) {
        const item = await this.historyItems.get(id);
        if (!item)
            return;
        
        const currentPrices: ItemPriceSnapshot[] = [];
        const now: Date = new Date();
        const monthFromNow: number = now.setDate(now.getDate() - 30);
        item.History.forEach(price => {
            if (price.time >= monthFromNow)
                currentPrices.push(price);
        });

        await this.historyItems.update(id, {History: currentPrices});
    }
}

export default new LocalDB();