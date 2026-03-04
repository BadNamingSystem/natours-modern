export const slugify = (str: string) => {
    return str
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLowerCase()
        .trim()
        .replace(/[^\w\s-]/g, "")
        .replace(/[\s_-]+/g, "-")
        .replace(/^-+|-+$/g, "")
}

export const containsOnlyLetters = (str: string) => {
    // and spaces
    return /^[a-zA-Z\s]+$/.test(str)
}

export const validateName = (str: string) => {
    // Allows letters from any language (Unicode) and spaces
    return /^[\p{L}\s]+$/u.test(str)
}

export const isValidEmail = (email: string) => {
    const emailRegex =
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9]([a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(\.[a-zA-Z0-9]([a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*\.[a-zA-Z]{2,}$/
    return emailRegex.test(email)
}

export const isValidUUID = (uuid: string) => {
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i
    return uuidRegex.test(uuid)
}

// Whitelist approach to filter out unwanted fields
export const filterObj = (obj: Record<string, unknown>, ...allowedFields: string[]) => {
    const newObj: Record<string, unknown> = {}
    // Loop through every property (key) in the object
    Object.keys(obj).forEach(el => {
        // If the property is in the allowedFields array, add it to the new object
        if (allowedFields.includes(el)) {
            newObj[el] = obj[el]
        }
    })
    return newObj
}

/**
 * Exclude fields from an object (e.g. password from User)
 */
export function exclude<T, Key extends keyof T>(obj: T, keys: Key[]): Omit<T, Key> {
    const newObj = { ...obj }
    for (const key of keys) {
        delete (newObj as any)[key]
    }
    return newObj
}
