
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