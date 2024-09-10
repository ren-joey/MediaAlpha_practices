


# Table of Contents
- [Use Docker](#option-1-use-docker)
- [Directly Run on Your Device](#option-2-run-on-your-device-directly)
- [The Locations of Main Program](#the-locations-of-main-program)


## Option 1: Use Docker
If you don't want to change your current environment, you may use docker to run the code.


### STEP 1: Add Testing Cases (Optional)
Before starting, if you want to add some test cases for the two tasks, you may add them into: `01_perl_password_checker/passwords`
```bash
123
123412341
123dqwdw2
123dqwdWq
...
```
Where each row presents a single task.

`02_parenthesis_removal/test/parenthesis_cases.test.ts`
```ts
const testCases = [
    ['', ''],
    ['1', '1'],
    ['A+B', 'A+B'],
    ['A+(B+(C))', 'A+B+C'],
    ['(A*(B+C))', 'A*(B+C)'],
    ['1*(2+(3*(4+5)))', '1*(2+3*(4+5))']
    ...
];
```
Where the `first element` represents the mathematical expression `with redundant parenthesis`, and the `second element` is the same expression with the `accurate parenthesis`.

### STEP 2: Build & Run The Image
Before you enter the commands, make sure that you are at the root directory of this project, which is where the `dockerfile` located.
```bash
# Build a image named "hw"
docker build -t hw .
# Run a contained also named "hw" from the image
docker run -d --name hw hw tail -f /dev/null
```
Next, log into the container terminal by:
```bash
docker exec -it hw bash
```

### STEP 3: Run The Image by Commands<br>
- For the perl program:
```bash
perl 01_perl_password_checker/password_checker.pl
```
- For the parenthesis removal program:
```bash
npm test --prefix 02_parenthesis_removal/
```

### STEP 4: Remove The Image and The Container
You can exit the container terminal by:
```bash
exit
```
Then stop and remove the container, so as the image:
```bash
# Stop the container "hw"
docker stop hw
# Remove the container "hw"
docker rm hw
# Remove the image "hw"
docker rmi hw
```

## Option 2: Run on Your Device Directly

### TASK 1: Perl Password Checker
- You may check the `readme.md` file from here: [01_perl_password_checker/readme.md](./01_perl_password_checker/readme.md)

### TASK 2: Parenthesis Removal
- This repository use `Unit Test` library to validate the correctness. You may like to check the `readme.md` file to make sure how to proceed the test: [02_parenthesis_removal/readme.md](./02_parenthesis_removal/readme.md)
- Test cases are written from here: [02_parenthesis_removal/test/parenthesis_cases.test.ts](./02_parenthesis_removal/test/parenthesis_cases.test.ts)


## The Locations of Main Program
### TASK 1: Perl Password Checker
- Program entry located here: [01_perl_password_checker/password_checker.pl](./01_perl_password_checker/password_checker.pl)
### TASK 2: Parenthesis Removal
- Program entry located here: [02_parenthesis_removal/src/index.ts](./02_parenthesis_removal/src/index.ts)