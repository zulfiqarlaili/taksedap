export interface IStore {
    storeId: string
    storeName: string
    descriptionList: string[];
    url: string;
    likeCount: number;
    dislikeCount: number;
    isReacted?: boolean
    removeReaction?: boolean
}
export interface IReaction {
    stationId: string;
    reaction: string;
}