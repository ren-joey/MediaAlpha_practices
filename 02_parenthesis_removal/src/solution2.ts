/* eslint-disable @typescript-eslint/no-explicit-any */

import { algebraRecovery, algebraReplace, isOperator, priority } from "./utils";

const convertToArr = (s: string, idx: number): any => {
    const res: string[] = [];

    for (let i = idx; i < s.length; i += 1) {
        const c = s[i];

        if (c === '(') {
            const [arr, idx2] = convertToArr(s, i + 1);

            res.push(arr);
            i = idx2;
        } else if (c === ')') {
            return [res, i];
        } else res.push(c);
    }

    return [res, s.length - 1];
};

const checkInside = (arr: any[], parent: string|undefined, side?: 'left'|'right'): any => {
    if (arr.length === 1 && Array.isArray(arr[0])) return checkInside(arr[0], parent);
    if (arr.length === 1 && arr[0] === '_') return '_';

    let minPriority = Infinity;
    const parentPriority = (side === 'left' && parent === '-') ? priority[parent] - 1 : priority[parent as any];

    for (let i = 0; i < arr.length; i += 1) {
        const e = arr[i];
        if (isOperator(e)) {
            minPriority = Math.min(minPriority, priority[e]);
            if (Array.isArray(arr[i-1])) arr[i-1] = checkInside(arr[i-1], e, "left");
            if (Array.isArray(arr[i+1])) arr[i+1] = checkInside(arr[i+1], e);
        }
    }

    if (arr[0] === '_' || (parent && minPriority < parentPriority)) return '(' + arr.join('') + ')';
    return arr.join('');
};

const parenthesisRemoval = (exp: string): string => {
    const [s, list] = algebraReplace(exp);
    const [arr, _] = convertToArr(s, 0); // eslint-disable-line @typescript-eslint/no-unused-vars
    let ans = checkInside(arr, '');
    ans = algebraRecovery(ans, list);

    return ans;
};

export {
    parenthesisRemoval
};