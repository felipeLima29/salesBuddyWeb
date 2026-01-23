export function isNull(text) {
    if (text === null || text.trim() === '') { 
        return true;
    }
    return false;
}