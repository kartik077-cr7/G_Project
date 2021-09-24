/**
 * Test suite for the module.
 *
 * @author Mojahedul Hoque Abul Hasanat <just.unix@gmail.com>
 */

var assert = require('assert')
var formatter = require('../')

var format = formatter.format
var formatFixed = formatter.formatFixed

describe('#format', function () {
    describe('Non-numeric input', function () {
        it('should return null unchanged', function () {
            var result = format(null)
            assert.equal(result, null)
        })

        it('should return NaN unchanged', function () {
            var result = format(NaN)
            // noinspection JSCheckFunctionSignatures
            assert(isNaN(result))
        })

        it('should return undefined unchanged', function () {
            var result = format(undefined)
            assert.equal(result, undefined)
        })

        it('should return a string unchanged', function () {
            var result = format('hello')
            assert.equal(result, 'hello')
        })

        it('should return an empty string unchanged', function () {
            var result = format('')
            assert.equal(result, '')
        });

        it('should return a boolean unchanged', function () {
            // noinspection JSCheckFunctionSignatures
            var result = format(true)
            assert.deepEqual(result, true)
        })

        it('should return an object unchanged', function () {
            var obj = {
                prop: 23
            }
            // noinspection JSCheckFunctionSignatures
            var result = format(obj)
            assert.equal(result, obj)
        })

        it('should return the first number like parseFloat', function () {
            var result = format('10 20')
            assert.equal(result, 10)
        })
    })

    describe('Different types of numeric input', function () {
        it('should format a primitive number', function () {
            var result = format(123)
            assert.equal(result, '123')
        })

        it('should format a string containing a number', function () {
            var result = format('123')
            assert.equal(result, '123')
        })

        it('should format a Number object', function () {
            // noinspection JSPrimitiveTypeWrapperUsage
            var result = new Number(123)
            assert.equal(result, '123')
        })
    })

    describe('No commas', function () {
        it('should not add comma to a small positive number', function () {
            var result = format(23)
            assert.equal(result, '23')
        })

        it('should not add comma if it is on the boundary', function () {
            var result = format(123)
            assert.equal(result, '123')
        })

        it('should not add comma to a small negative number', function () {
            var result = format(-23)
            assert.equal(result, '-23')
        })

        it('should not add comma to a small positive fraction', function () {
            var result = format(0.234567)
            assert.equal(result, '0.234567')
        })

        it('should not add comma to a small negative fraction', function () {
            var result = format(-0.234567)
            assert.equal(result, '-0.234567')
        })
    })

    describe('Normal groups with commas', function () {
        it('should add a comma for a thousand', function () {
            var result = format(1024)
            assert.equal(result, '1,024')
        })

        it('should add commas for lac', function () {
            var result = format(150414)
            assert.equal(result, '1,50,414')
        })

        it('should add commas for a crore', function () {
            var result = format(23766313)
            assert.equal(result, '2,37,66,313')
        })

        it('should add commas for lac crore', function () {
            var result = format(5243137280211)
            assert.equal(result, '5,24,313,72,80,211')
        })

        it('should add commas for crore crore', function () {
            var result = format(570102410000000)
            assert.equal(result, '5,70,10,241,00,00,000')
        })

        it('should add commas to a negative number', function () {
            var result = format(-12350212)
            assert.equal(result, '-1,23,50,212')
        })
    })

    describe('Groups with fractions', function () {
        it('should add a thousand comma', function () {
            var result = format(1024.2567)
            assert.equal(result, '1,024.2567')
        })

        it('should add a thousand comma to a negative fractional number', function () {
            var result = format(-1024.2567)
            assert.equal(result, '-1,024.2567')
        })

        it('should be able to read a fractional number with only the decimal', function () {
            var result = format('123.')
            assert.equal(result, '123')
        })
    })
})

/**
 * We have not done a comprehensive test for {@link formatFixed} as we know the bulk of its functionality
 * comes from the {@link format} function.
 */
describe('#formatFixed', function () {
    describe('Non-numeric input', function () {
        it('should return null unchanged', function () {
            var result = formatFixed(null, 2)
            assert.equal(result, null)
        })

        it('should return NaN unchanged', function () {
            var result = formatFixed(NaN, 2)
            // noinspection JSCheckFunctionSignatures
            assert(isNaN(result))
        })

        it('should return undefined unchanged', function () {
            var result = formatFixed(undefined, 2)
            assert.equal(result, undefined)
        })

        it('should return a string unchanged', function () {
            var result = formatFixed('hello', 2)
            assert.equal(result, 'hello')
        })

        it('should return a boolean unchanged', function () {
            // noinspection JSCheckFunctionSignatures
            var result = formatFixed(true, 2)
            assert.deepEqual(result, true)
        })
    })

    describe('Groups', function () {
        it('should format a positive fractional number', function () {
            var result = formatFixed(56070210.34567, 2)
            assert.equal(result, '5,60,70,210.35')
        })

        it('should format a positive number with fixed decimals', function () {
            var result = formatFixed(1024, 2)
            assert.equal(result, '1,024.00')
        })

        it('should format a negative number with fixed decimals', function () {
            var result = formatFixed(11024, 2)
            assert.equal(result, '11,024.00')
        })
    })

    describe('Missing parameter', function () {
        it('should format with 0 decimals if second parameter is missing', function () {
            // noinspection JSCheckFunctionSignatures
            var result = formatFixed(123.7567)
            assert.equal(result, '124')
        })
    })
})
