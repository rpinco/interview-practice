export function equalArrays (arr1, arr2) {
    if (arr1.length !== arr2.length) {
      return false; // If the arrays have different lengths, they can't be equal
    }
  
    // Sort both arrays and compare each element
    const sortedArr1 = arr1.slice().sort();
    const sortedArr2 = arr2.slice().sort();
  
    for (let i = 0; i < sortedArr1.length; i++) {
      if (sortedArr1[i] !== sortedArr2[i]) {
        return false; // If any elements are different, the arrays are not equal
      }
    }
  
    return true; // All elements are the same, so the arrays are equal
}