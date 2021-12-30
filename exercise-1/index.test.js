const calculator = require('./js/index')

test("Given an array integers and a target, the function should return two indices such that they add up to the target.", () => {
    expect(twoSum([2,7,11,15], 9)).toEqual([0,1])
})