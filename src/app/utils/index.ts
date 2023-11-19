/**
 * write a function called calculate the result of inputs, with three type of number parameters, propertyA, propertyB, propertyC
 * step1:  propertyA + propertyB
 * step2:  step1 - 2 * propertyC
 * step3:  step2 * propertyA
 * 
 * @param propertyA
 * @param propertyB
 * @param propertyC
 * 
 * @returns the result of inputs
 */
function calculate(propertyA: number, propertyB: number, propertyC: number): number {
  return propertyA + propertyB - 2 * propertyC * propertyA;
}

function doWork(x, y, z, w) {
// Add 3 to y, then subtract 4 from both x and w. Return the product of the four numbers.
  return (y + 3) * (x - 4) * w;
}