import type { IReaction } from "./interface";

export function base64ToFileBody(base64String: string) {
    const byteCharacters = atob(base64String.split(';base64,')[1]);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    const blob = new Blob([byteArray], { type: 'image/jpeg' });

    return new File([blob], 'image.jpg', { type: 'image/jpeg' });
}

function getReactionList() {
    const reactionList = localStorage.getItem('reactionList');
    return reactionList ? JSON.parse(reactionList) : [];
}

export function isReaction(storeId: string) {
    const reactionList = getReactionList();
    const storeData = reactionList.find((item: IReaction) => item.storeId === storeId);
    return (storeData === undefined) ? undefined : storeData.reaction
}

export function updateReactionCount() {

}

export function addOrUpdateReaction(storeId: string, reaction: boolean | undefined) {
    const reactionList = getReactionList();
    const existingReactionIndex = reactionList.findIndex((item: IReaction) => item.storeId === storeId);

    if (existingReactionIndex !== -1) {
        reactionList[existingReactionIndex].reaction = reaction;
    } else {
        reactionList.push({ storeId, reaction });
    }
    localStorage.setItem('reactionList', JSON.stringify(reactionList));
}

export function deleteReaction(storeId: string) {
    let reactionList = getReactionList();

    reactionList = reactionList.filter((item: IReaction) => item.storeId !== storeId);
    localStorage.setItem('reactionList', JSON.stringify(reactionList));
}