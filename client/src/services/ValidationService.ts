type TValidationResult = {
  isValid: boolean;
  message: string;
};

class ValidationService {
  /**
   * Check email by length and format
   * @param {string} value
   * @returns {TValidationResult}
   */
  public static checkEmail(value: string): TValidationResult {
    const email = value.trim();
    const result = this.result();

    if (!this.isRequired(email)) {
      result.isValid = false;
      result.message = this.errorMessage('required');
    } else if (!this.isEmail(email)) {
      result.isValid = false;
      result.message = this.errorMessage('email');
    }

    return result;
  }

  /**
   * Check email by length and format
   * @param {string} value
   * @returns {TValidationResult}
   */
  public static checkPassword(value: string): TValidationResult {
    const password = value.trim();
    const result = this.result();

    if (!this.isRequired(password)) {
      result.isValid = false;
      result.message = this.errorMessage('required');
    } else if (!this.isSecurePassword(password)) {
      result.isValid = false;
      result.message = this.errorMessage('password');
    }

    return result;
  }

  /**
   * Validate field by length
   * @param {string} value
   * @param {number} min
   * @param {string | undefined} max
   * @returns {TValidationResult}
   */
  public static validate(value: string, min: number, max?: number): TValidationResult {
    const result = this.result();
    const fieldValue = value.trim();

    if (!this.isRequired(fieldValue)) {
      result.isValid = false;
      result.message = this.errorMessage('required');
    } else if (max && !this.isBetween(fieldValue.length, min, max)) {
      result.isValid = false;
      result.message = this.errorMessage('length');

      result.message = result.message
        .replace(':min', min.toString())
        .replace(':max', max.toString());
    } else if (!max && fieldValue.length < min) {
      result.isValid = false;
      result.message = this.errorMessage('min');

      result.message = result.message.replace(':min', min.toString());
    }

    return result;
  }

  public static isRequired(value: string): boolean {
    return value === '' ? false : true;
  }

  public static isBetween(length: number, min: number, max: number): boolean {
    return length < min || length > max ? false : true;
  }

  private static isEmail(value: string): boolean {
    const re =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    return re.test(value);
  }

  private static isSecurePassword(password: string): boolean {
    // const re = new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})');
    // return re.test(password);

    return password.length > 8;
  }

  /**
   * Result of validation
   * @param { string } field
   * @param {boolean} isValid
   * @returns {TValidationResult}
   */
  private static result(): TValidationResult {
    return {
      isValid: true,
      message: '',
    };
  }

  private static errorMessage(type: string): string {
    const errors: any = {
      required: 'Field cannot be empty',
      length: 'Field must be between :min and :max characters.',
      min: 'Field must be greater then :min',
      email: 'Email is not valid',
      password: 'Password must include minimum 8 characters',
    };
    return errors[type];
  }
}

export default ValidationService;
