# About The Password Checker

## Versions
`Perl v5.34.1`

## Add Test Case
If you would like to add any new password as a test case,
you can append it into the file `passwords`.
Each line represents a password test case.
```
123
123412341
123dqwdw2
123dqwdWq
123dq@wdw
dq@wdAwww
...
```

## Run Perl
```bash
perl ./password_checker.pl
```

## Check Report
```
[Invalid] The length of password should be greater or equal to 8. (123)
[Invalid] Password requires mixed case letters, numbers and symbols. (123412341)
[Invalid] Password requires mixed case letters, numbers and symbols. (123dqwdw2)
[Invalid] Password requires mixed case letters, numbers and symbols. (123dqwdWq)
[Invalid] Password requires mixed case letters, numbers and symbols. (123dq@wdw)
[Invalid] Password requires mixed case letters, numbers and symbols. (dq@wdAwww)
[Valid] This password can be used. (123dq@wdA)
[Invalid] Password requires mixed case letters, numbers and symbols. (dqwdqq~dw)
...
```