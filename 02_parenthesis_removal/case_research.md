### Signs
- Positive values, ex. 0, 1, 2
- Negative values, ex. -0, -1, -2

### Operators
- `+`
- `-`
- `*`
- `/`

### Pairing Cases
|Operator|Case|Expected|Regulations|
|-|-|-|-|
|`+`|`(-3+4)+(-5)`|`-3+4+-5`| with `+` all removable
|`+`|`(-3-4)+(-5-6)`|`-3-4+-5-6`| with `-` all removable
|`+`|`(-3*-4)+(-5*-6)`|`-3*-4+-5*-6`| with `*` all removable
|`+`|`(-3/-4)+(-5/-6)`|`-3/-4+-5/-6`| with `/` all removable
|`-`|`(-3+4)-(-5)`|`-3+4--5`| with `+` all removable
|`-`|`(-3-4)-(-5-6)`|`-3-4--5-6`| with `-` all removable
|`-`|`(-3*-4)-(-5*-6)`|`-3*-4--5*-6`| with `*` all removable
|`-`|`(-3/-4)-(-5/-6)`|`-3/-4--5/-6`| with `/` all removable
|`*`|`(-3+4)*(-5)`|`(-3+4)*-5`| with `+` unremovable
|`*`|`(-3-4)*(-5-6)`|`(-3-4)*(-5-6)`| with `-` unremovable
|`*`|`(-3*-4)*(-5*-6)`|`-3*-4*-5*-6`| with `*` all removable
|`*`|`(-3/-4)*(-5/-6)`|`-3/-4*-5/-6`| with `/` all removable
|`/`|`(-3+4)/(-5)`|`(-3+4)/-5`| with `+` unremovable
|`/`|`(-3-4)/(-5-6)`|`(-3-4)/(-5-6)`| with `-` unremovable
|`/`|`(-3*-4)/(-5*-6)`|`-3*-4/(-5*-6)`| with `*` left-sided removable
|`/`|`(-3/-4)/(-5/-6)`|`-3/-4/(-5/-6)`| with `/` left-sided removable

The `removable` means that after parenthesis removal, the results from `eval()` function are the same.