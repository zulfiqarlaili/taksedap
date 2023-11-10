export interface IStore {
    storeId: string
    storeName: string
    descriptionList: string[];
    url: string;
    likeCount?: number;
    dislikeCount?: number;
    isReacted?: boolean
    removeReaction?: boolean
    previousReaction?: boolean
}
export interface IReaction {
    storeId: string;
    reaction: string;
}