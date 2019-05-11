export function haveIntersection (array1: any[], array2: any[]) {
    if (!array1 || array1.length === 0 || !array2 || array2.length === 0) {
        return false;
    }

    for (const element of array1) {
      if (array2.includes(element)) {
        return true;
      }
    }

    return false;
}
