export const isEmpty = (obj: any): boolean => {
    if (!obj) return true
    if (Array.isArray(obj)) return !!obj.length
    if (typeof obj === 'object') return !!Object.keys(obj).length
    return false
}
