declare global {
    interface Array<T> { // eslint-disable-line @typescript-eslint/no-unused-vars
        nonSpaceLength(): [number, number]
    }
}

// Dealing with the " " case
Array.prototype.nonSpaceLength = function() {
    if (this === undefined || this === null) throw Error();

    let firstNonSpace = -1;
    let nonSpaceLength = 0;

    for (let i = 0; i < this.length; i++) {
        const el = this[i];
        if (el !== ' ') {
            if (firstNonSpace === -1) firstNonSpace = i;
            nonSpaceLength += 1;
        }
    }

    return [nonSpaceLength, firstNonSpace];
};

const priority: {[s: string]: number} = {
    '+': 1,
    '-': 2,
    '*': 3,
    '/': 3
};

const isOperator = (s: string): boolean => priority[s] !== undefined;

const replaceRange = (s: string, start: number, end: number, substitute: string) => {
    return s.substring(0, start) + substitute + s.substring(end);
};

const prevNonSpace = (s: string, idx: number, order=1) => {
    let cur_order = 1;
    for (let i = idx - 1; i >= 0; i -= 1) {
        if (s[i] === ' ') continue;
        if (cur_order === order) return i;
        cur_order += 1;
    }
    return -1;
};

const nextNonSpace = (s: string, idx: number, order=1) => {
    let cur_order = 1;
    for (let i = idx + 1; i < s.length; i += 1) {
        if (s[i] === ' ') continue;
        if (cur_order === order) return i;
        cur_order += 1;
    }
    return -1;
};

const algebraReplace = (s: string): [expression: string, list: string[]] => {
    const list: string[] = [];
    const negativeNumbers: number[][] = [];

    let operators: number[] = [];
    let operands: number[] = [];
    let firstDetect = true;

    for (let i = 0; i < s.length; i += 1 ) {
        const c = s[i];
        if(c !== '(' && c !== ')') {
            if (c === ' ') continue;
            if (c === '+' || c === '-' || c === '*' || c === '/') {
                if (firstDetect && operators.length === 1 && s[operators[0]] === '-' && operands.length > 0) {
                    if (firstDetect) firstDetect = false;

                    const substr = s.substring(operators[0], operands[operands.length - 1] + 1);

                    // Dealing with the -(N) case
                    const count: number = [...substr].reduce((sum, c) => {
                        if (c === '(') return sum + 1;
                        else if (c === ')') return sum - 1;
                        return sum;
                    }, 0);

                    const nextNonSpaceIdx = nextNonSpace(s, operands[operands.length - 1], count);
                    let earlyStop = false;
                    if (count !== 0) {
                        for (let i = operands[operands.length - 1] + 1; i <= nextNonSpaceIdx; i += 1) {
                            const c = s[i];
                            if (c !== ')') {
                                earlyStop = true;
                                operands = [];
                                operators = [i];
                                continue;
                            }
                        }
                    }
                    if (earlyStop) continue;

                    negativeNumbers.push(
                        [
                            operators[0],
                            (count === 0)
                                ? operands[operands.length - 1]
                                : nextNonSpace(s, operands[operands.length - 1], count)
                        ]
                    );

                    operands = [];
                    operators = [i];
                }

                // If there are 2 operators along with some operands
                // assume the second operator will definitely be '-'
                else if (operands.length > 0 && operators.length >= 2) {
                    if (firstDetect) firstDetect = false;

                    const substr = s.substring(operators[1], operands[operands.length - 1] + 1);

                    // Dealing with the -(N) case
                    const count: number = [...substr].reduce((sum, c) => {
                        if (c === '(') return sum + 1;
                        else if (c === ')') return sum - 1;
                        return sum;
                    }, 0);

                    negativeNumbers.push(
                        [
                            operators[1],
                            (count === 0)
                                ? operands[operands.length - 1]
                                : nextNonSpace(s, operands[operands.length - 1], count)
                        ]
                    );

                    operands = [];
                    operators = [i];

                // If there already has operands and operator, mean the operator belongs a new operand.
                } else if (operands.length > 0) {
                    operands = [];
                    operators = [i];

                // If there are no operands, directly push the operator
                } else operators.push(i);

            // Push any operands directly
            } else {
                if (firstDetect && operators.length === 0) firstDetect = false;
                operands.push(i);
            }
        }
    }

    // Append the remained negative operands into array
    if (operands.length > 0) {
        if (operators.length >= 2) {
            const substr = s.substring(operators[1], operands[operands.length - 1] + 1);

            // Dealing with the -(N) case
            const count: number = [...substr].reduce((sum, c) => {
                if (c === '(') return sum + 1;
                else if (c === ')') return sum - 1;
                return sum;
            }, 0);

            negativeNumbers.push(
                [
                    operators[1],
                    (count === 0)
                        ? operands[operands.length - 1]
                        : nextNonSpace(s, operands[operands.length - 1], count)
                ]
            );
        } else if (firstDetect && s[operators[0]] === '-') {
            const substr = s.substring(operators[0], operands[operands.length - 1] + 1);

            // Dealing with the -(N) case
            const count: number = [...substr].reduce((sum, c) => {
                if (c === '(') return sum + 1;
                else if (c === ')') return sum - 1;
                return sum;
            }, 0);

            negativeNumbers.push(
                [
                    operators[0],
                    (count === 0)
                        ? operands[operands.length - 1]
                        : nextNonSpace(s, operands[operands.length - 1], count)
                ]
            );
        }
    }

    // Replace all negative operands into "_" (except the first one)
    for (let i = negativeNumbers.length - 1; i >= 0; i -= 1) {
        const nums = negativeNumbers[i];
        let substr = s.substring(nums[0], nums[nums.length - 1] + 1);

        // Remove the parenthesis in -(N) directly
        substr = substr.replaceAll(/[()]/g, '');
        list.unshift(substr);
        s = replaceRange(s, nums[0], nums[nums.length - 1] + 1, '_');
    }

    if (process.env.mode === 'dev') console.log(s);

    return [s, list];
};

const algebraRecovery = (s: string, list: string[]): string => {
    for (let i = s.length - 1; i >= 0; i -= 1) {
        if (s[i] === '_') {
            const exp = list.pop();

            const prevNonSpaceIdx = prevNonSpace(s, i, 1);

            if (i !== 0 && s[prevNonSpaceIdx] !== '(' && s[prevNonSpaceIdx] === '+') {
                s = replaceRange(s, i, i+1, `(${exp})`);
            }
            else s = replaceRange(s, i, i+1, `${exp}`);
        }
    }

    return s;
};

export {
    priority,
    isOperator,
    algebraReplace,
    algebraRecovery
};