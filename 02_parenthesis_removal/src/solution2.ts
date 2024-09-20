/* eslint-disable @typescript-eslint/no-explicit-any */

import { algebraRecovery, algebraReplace, isOperator, priority } from "./utils";

const convertToArr = (s: string, idx: number): any => {
    const res: string[] = [];

    for (let i = idx; i < s.length; i += 1) {
        const c = s[i];

        // If encounter "(", go deeper
        if (c === '(') {
            const [arr, idx2] = convertToArr(s, i + 1);

            res.push(arr);
            i = idx2;

        // If encounter ")", return the contents and the position index of the ending point
        } else if (c === ')') {
            return [res, i];
        } else res.push(c);
    }

    return [res, s.length - 1];
};

// Dealing with the " " characters (spaces)
const getPrevArrIdx = (arr: any[], idx: number) => {
    for (let i = idx - 1; i >= 0; i -= 1) {
        if (arr[i] === ' ') continue;
        return Array.isArray(arr[i]) ? i : -1;
    }
    return -1;
};

// Dealing with the " " characters (spaces)
const getNextArrIdx = (arr: any[], idx: number) => {
    for (let i = idx + 1; i < arr.length; i += 1) {
        if (arr[i] === ' ') continue;
        return Array.isArray(arr[i]) ? i : -1;
    }
    return -1;
};

const checkInside = (idx: number, arr: any[], parent: string|undefined, side?: 'left'|'right'): any => {
    // If length === 1, directly expand it, like [[[1,+,2]]]
    const [len, firstNonSpace] = arr.nonSpaceLength();
    if (process.env.mode === 'dev') console.log(len, firstNonSpace);
    if (len === 1 && Array.isArray(arr[firstNonSpace])) return checkInside(idx, arr[0], parent);

    // Dealing with the " " case
    if (len === 1 && arr[firstNonSpace] === '_') {
        if ((parent === '+' || parent === '-') && side === 'right') return '(' + arr.join('') + ')';
        return arr.join('');
    }

    let minPriority = Infinity;

    // If operand is on the left-hand side of "-", decrease the priority
    let parentPriority = priority[parent as any];
    if (side === 'left' && parent === '-') parentPriority -= 1;
    if (parent === '/' && side === 'right') parentPriority += 1;

    for (let i = 0; i < arr.length; i += 1) {
        const e = arr[i];

        // Use operator as a starter to check both-sided operand
        if (isOperator(e)) {
            minPriority = Math.min(minPriority, priority[e]);

            const prevArrIdx = getPrevArrIdx(arr, i);
            if (prevArrIdx !== -1) arr[prevArrIdx] = checkInside(idx+i-1, arr[prevArrIdx], e, 'left');
            const nextArrIdx = getNextArrIdx(arr, i);
            if (nextArrIdx !== -1) arr[nextArrIdx] = checkInside(idx+i+1, arr[nextArrIdx], e, 'right');
        }
    }

    // If the first operand is a negative, base on the rule, add parenthesis
    if (
        // if the first character is negative number and its idx isn't (means the negative number is at the beginning of the exp.)
        (arr[firstNonSpace] === '_' && idx !== 0)
        || (parent && minPriority < parentPriority)) return '(' + arr.join('') + ')';
    return arr.join('');
};

const parenthesisRemoval = (exp: string): string => {
    // Replace all negative numbers into algebra, I used "_" to prevent from algebra collision (the algebra I use was already in the original expression)
    const [s, list] = algebraReplace(exp);
    const [arr, _] = convertToArr(s, 0); // eslint-disable-line @typescript-eslint/no-unused-vars
    if (process.env.mode === 'dev') console.log(arr);
    let ans = checkInside(0, arr, '');
    if (process.env.mode === 'dev') console.log(ans);
    ans = algebraRecovery(ans, list);

    return ans;
};

export {
    parenthesisRemoval
};