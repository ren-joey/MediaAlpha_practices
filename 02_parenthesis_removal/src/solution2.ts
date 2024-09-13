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

const checkInside = (arr: any[], parent: string|undefined, side?: 'left'|'right'): any => {
    // If length === 1, directly expand it, like [[[1,+,2]]]
    if (arr.length === 1 && Array.isArray(arr[0])) return checkInside(arr[0], parent);
    if (arr.length === 1 && arr[0] === '_') return '_';

    let minPriority = Infinity;

    // If operand is on the left-hand side of "-", decrease the priority
    const parentPriority = (side === 'left' && parent === '-') ? priority[parent] - 1 : priority[parent as any];

    for (let i = 0; i < arr.length; i += 1) {
        const e = arr[i];

        // Use operator as a starter to check both-sided operand
        if (isOperator(e)) {
            minPriority = Math.min(minPriority, priority[e]);
            if (Array.isArray(arr[i-1])) arr[i-1] = checkInside(arr[i-1], e, "left");
            if (Array.isArray(arr[i+1])) arr[i+1] = checkInside(arr[i+1], e);
        }
    }

    // If the first operand is a negative, base on the rule, add parenthesis
    if (arr[0] === '_' || (parent && minPriority < parentPriority)) return '(' + arr.join('') + ')';
    return arr.join('');
};

const parenthesisRemoval = (exp: string): string => {
    // Replace all negative numbers into algebra, I used "_" to prevent from algebra collision (the algebra I use was already in the original expression)
    const [s, list] = algebraReplace(exp);
    const [arr, _] = convertToArr(s, 0); // eslint-disable-line @typescript-eslint/no-unused-vars
    let ans = checkInside(arr, '');
    ans = algebraRecovery(ans, list);

    return ans;
};

export {
    parenthesisRemoval
};