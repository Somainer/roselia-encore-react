export const optionalValue = <T>(value: T | undefined, whenNotDefined: T): T => 
    typeof value === 'undefined' ? whenNotDefined : value
