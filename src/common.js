

export function assert(exp, msg='assert failed') {
    if(!exp) {
        throw new Error(msg);
    }
}