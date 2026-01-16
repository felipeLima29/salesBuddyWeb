export function isNull(text) {
    if (text === null || text.trim() === '') { 
        return false;
    }
    return true;
}