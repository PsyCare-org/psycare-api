export function bufferToImage(buffer: Uint8Array): string {
    let binary = '';

    const bytes = new Uint8Array(buffer);
    const len = bytes.byteLength;

    for (let i = 0; i < len; i++) {
        binary += String.fromCharCode(bytes[i]);
    }

    return 'data:image/png;base64,' + btoa(binary);
}
