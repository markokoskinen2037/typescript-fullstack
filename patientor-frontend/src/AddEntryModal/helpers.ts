export function validateDate(value: string) {
    if (!value) return "Field is required";
    if (!Date.parse(value) || value.length !== 10) return "Bad format";
    return null;
}

export function validateDateNotRequired(value: string) {
    if (value && (!Date.parse(value) || value.length !== 10)) return "Bad format";
    return null;
}

export function validateRequired(value: string) {
    if (!value) return "Field is required";
    return null;
}

export function validateHealthCheckRating(value: number){
    if (!value && value !== 0) return "Field is required";
    if(value < 0 || value > 3) return "Must be in range [0,3]";  
    return null;
}