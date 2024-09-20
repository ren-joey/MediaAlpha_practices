# Regulations
The mathematical expressions provided should follow the rules below:
1. There are only positive operands, negative operands, and binary operators could appear in the expression,
which means any operator should have two-sided operands, and the operator should appear.<br>
For instance, valid: (-1)*10; invalid: -(10+5), a(b+7)
2. If the + and - operators to appear continuously, they should be divided by "("
3. When fulfilling the above, if the number of parentheses is minimum, and the math results are the same, all possible combinations are acceptable.<br>
For example, Case: '(A/((-B)*C))' Valid: 'A/(-B*C)', 'A/(-B)*C'
4. The input expression should maintain its parenthesis valid.

# About The System Environment

## Versions
`node.js v20.17.0`

## Installation
```bash
cd 02_parenthesis_removal
npm install
```

## Run Test
```
npm test
```

## Test Report
```
 PASS  test/parentheses_test.test.ts

...

    ✓ case 1:  =>  (2 ms)
    ✓ case 2: 1 => 1
    ✓ case 3: A+B => A+B
    ✓ case 4: A+(B+(C)) => A+B+C
    ✓ case 5: (A*(B+C)) => A*(B+C)
    ✓ case 6: 1*(2+(3*(4+5))) => 1*(2+3*(4+5)) (1 ms)
    ✓ case 7: x+(y+z)+(t+(v+w)) => x+y+z+t+v+w
    ✓ case 8: x*(12+(16+y)) => x*(12+16+y)

Test Suites: 1 passed, 1 total
Tests:       8 passed, 8 total
Snapshots:   0 total
Time:        1.127 s, estimated 2 s
Ran all test suites.
```

## Add New Test Cases
You can append new mathematical expression from `test/parenthesis_test.test.ts`:
```ts
...

// You can append expression test cases here
const testCases = [
    ['', ''],
    ['1', '1'],
    ['A+B', 'A+B'],
    ['A+(B+(C))', 'A+B+C'],
    ['(A*(B+C))', 'A*(B+C)'],
    ['1*(2+(3*(4+5)))', '1*(2+3*(4+5))'],
    ['x+(y+z)+(t+(v+w))', 'x+y+z+t+v+w'],
    ['x*(12+(16+y))', 'x*(12+16+y)']
];

...
```