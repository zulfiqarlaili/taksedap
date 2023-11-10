import { TABLE_NAME } from "./constants";
import type { IReaction } from "./interface";
import { supabase } from "./supabaseClient";

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

export async function updateReactionCount(storeId: string, extraParam: {
    isReacted: boolean | undefined,
    removeReaction: boolean | undefined,
    previousReaction: boolean | undefined

}) {
    let likeCount
    let dislikeCount

    const counts = await fetchLikeAndDislikeCounts(storeId)
    const { isReacted, removeReaction, previousReaction } = extraParam;

    if (isReacted == true && removeReaction == false) {
        if (previousReaction != undefined) {
            if (isReacted === true && removeReaction === false && previousReaction == false) {
                likeCount = counts?.likeCount + 1
                dislikeCount = counts?.dislikeCount - 1
            }
        }
        likeCount = counts?.likeCount + 1
    } else if (isReacted == undefined && removeReaction == true) {
        likeCount = counts?.likeCount - 1
    } else if (isReacted == false && removeReaction == false) {
        if (previousReaction != undefined) {
            if (isReacted === false && removeReaction === false && previousReaction == true) {
                likeCount = counts?.likeCount - 1
                dislikeCount = counts?.dislikeCount + 1
            }
        } else {
            dislikeCount = counts?.dislikeCount + 1
        }
    } else if (isReacted == undefined && removeReaction == false) {
        dislikeCount = counts?.dislikeCount - 1
    }

    console.log('likeCount', likeCount)
    console.log('disLikeCount', dislikeCount)
    const updateData = {
        ...(likeCount !== undefined && { likeCount }),
        ...(dislikeCount !== undefined && { dislikeCount })
    }
    console.log('updateData', updateData)
    // Update database based on the changes in likeCount and dislikeCount
    const { error } = await supabase
        .from(TABLE_NAME)
        .update(updateData)
        .eq('storeId', storeId)
        .select();

    if (error) {
        console.error('Error updating database:', error.message);
    } else {
        console.log('Database updated successfully:');
    }

}

async function fetchLikeAndDislikeCounts(storeId: string) {
    const { data, error } = await supabase
        .from(TABLE_NAME)
        .select("*")
        .eq("storeId", storeId);

    if (error) {
        console.log(error.message);
    } else {
        if (data.length > 0) {
            return {
                likeCount: data[0]?.likeCount,
                dislikeCount: data[0]?.dislikeCount
            }
        } else {
            return undefined
        }
    }
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

