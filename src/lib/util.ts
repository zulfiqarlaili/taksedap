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

// Function to add or update a reaction in the reactionList
export function addOrUpdateReaction(stationId: string, reaction: boolean | undefined) {
    const reactionList = getReactionList();

    // Check if the stationId already exists in the reactionList
    const existingReactionIndex = reactionList.findIndex((item: IReaction) => item.stationId === stationId);

    if (existingReactionIndex !== -1) {
        // If the stationId exists, update the reaction
        reactionList[existingReactionIndex].reaction = reaction;
    } else {
        // If the stationId doesn't exist, add a new reaction
        reactionList.push({ stationId, reaction });
    }

    // Save the updated reactionList in localStorage
    localStorage.setItem('reactionList', JSON.stringify(reactionList));
}

// Function to delete a reaction from the reactionList
export function deleteReaction(stationId: string) {
    let reactionList = getReactionList();

    // Filter out the item with the given stationId
    reactionList = reactionList.filter((item: IReaction) => item.stationId !== stationId);

    // Save the updated reactionList in localStorage
    localStorage.setItem('reactionList', JSON.stringify(reactionList));
}