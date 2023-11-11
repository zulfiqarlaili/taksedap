export interface IStore {
    storeId: string
    storeName: string
    descriptionList: string[];
    url: string;
    likeCount?: number;
    dislikeCount?: number;
    reaction?: boolean
    removeReaction?: boolean
    previousReaction?: boolean
}
export interface IReaction {
    storeId: string;
    reaction: string;
}

export interface IExtraParam {
    reaction: boolean | undefined,
    removeReaction: boolean | undefined,
    previousReaction: boolean | undefined

}
