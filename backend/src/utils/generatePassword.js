export default function generatePassword(){
    return Math.random().toString(36).slice(-10);
}