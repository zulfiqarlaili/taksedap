
export function base64ToFileBody(base64String: string) {
    // const type = base64String.split(';')[0].split('/')[1];
    // alert('Image format:' + type);

    // Convert base64 string to Blob
    const byteCharacters = atob(base64String.split(';base64,')[1]);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    const blob = new Blob([byteArray], { type: 'image/jpeg' });


    // Create a file from the blob
    return new File([blob], 'image.jpg', { type: 'image/jpeg' });
}