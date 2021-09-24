# indian-number-format
[![Build Status](https://travis-ci.org/unixdev/indian-number-format.svg?branch=master)](https://travis-ci.org/unixdev/indian-number-format)
[![Coverage Status](https://coveralls.io/repos/github/unixdev/indian-number-format/badge.svg?branch=master)](https://coveralls.io/github/unixdev/indian-number-format?branch=master)

When formatting numbers with commas, the Indian sub-continent (Bangladesh, India, Nepal, Maldives, Pakistan,
Sri Lanka) has a peculiar system. Instead of grouping numbers every 3 digits, it uses a repeating pattern of
3,2,2 digits. The first comma is after the third digit, in the thousand's place. One hundred thousand is expressed
as one lac (or one lakh). One hundred lacs is expressed as one crore. This pattern repeats itself. As an example,
1 trillion is written as: 100,000,00,00,000. It is read as "one lac crore".

You can read about it on Wikipedia here:
[Indian numbering system](https://en.wikipedia.org/wiki/Indian_numbering_system)

This modules lets you format numbers according to the Indian numbering system.

## Install

Install the package in the usual way:

```
npm install --save indian-number-format
```

## Usage

Require the package like so:

```javascript
const fmt = require('indian-number-format')
```

The module exposes two functions:
1. `format(numberToFormat)`
2. `formatFixed(numberToFormat, decimals)`

The parameter `numberToFormat` can be any number: a primitive number, string or a Number object. If it is anything
other than a number, it is returned unchanged. The first function formats the number with commas. The second
function does the same but also converts it to a number with the specified number of decimal points.

## Examples
```javascript
const fmt = require('indian-number-format')

// format
console.log(fmt.format(270371))                 // prints: 2,70,371
console.log(fmt.format(123456789327.6452))      // prints: 12,345,67,89,327.6452

// formatFixed
console.log(fmt.formatFixed(1234567.2369, 2))   // prints: 1,23,4567.24
console.log(fmt.formatFixed(1234, 2))           // prints: 1,234.00
console.log(fmt.formatFixed(12.6))              // prints: 13

// return non-numeric input unchanged
console.log(fmt.format(null))                   // prints: null
console.log(fmt.format(true))                   // prints: true
console.log(fmt.format(''))                     // prints the empty string

// has the same idiosyncrasies of parseFloat
console.log(fmt.format('10abcd'))               // prints: 10
```

## Development

This is a simple module. There is extensive test coverage. I intentionally used ES5 Javascript to avoid the need to
transpile to browser compatible Javascript.

## Thanks

Thanks to my employer [Dynamic Solution Innovators](http://www.dsinnovators.com) for allowing me to open source this
module.

## License
[MIT](LICENSE)
