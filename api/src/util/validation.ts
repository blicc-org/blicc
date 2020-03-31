export class Validation {
  public static isName(name: string): boolean {
    return /^[a-zA-Z ]{2,50}$/.test(name)
  }

  public static isEmail(email: string): boolean {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    return re.test(String(email).toLowerCase())
  }

  public static isPassword(password: string): boolean {
    return (
      /[A-Z]/.test(password) &&
      /[a-z]/.test(password) &&
      /[0-9]/.test(password) &&
      password.length > 8
    )
  }

  public static escapeSearchQuery(str = ''): string {
    return str.replace(/[^\w\s!?]/g, '')
  }

  public static escapeQueryNumber(queryNumber = '0'): number {
    let castedNumber = parseInt(queryNumber)
    if (!Number.isInteger(castedNumber)) castedNumber = 0
    return castedNumber
  }

  public static escapeFields(
    requestedFields: string,
    existingFields: string[]
  ): string[] {
    const fields = requestedFields ? requestedFields.split(',') : undefined
    if (fields && fields.every((field) => existingFields.includes(field))) {
      return fields
    } else {
      return existingFields
    }
  }
}
