export const validatePhone = (phone: string): boolean => {
    const phoneRegex = /^254[0-9]{9}$/;
    return phoneRegex.test(phone);
  };
  
  export const validateAmount = (amount: number): boolean => {
    return !isNaN(amount) && amount >= 10 && amount <= 150000;
  };
  
  export const validateContactForm = (values: {
    name: string;
    email: string;
    message: string;
  }) => {
    const errors: Partial<typeof values> = {};
  
    if (!values.name.trim()) {
      errors.name = 'Name is required';
    }
  
    if (!values.email.trim()) {
      errors.email = 'Email is required';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
      errors.email = 'Invalid email address';
    }
  
    if (!values.message.trim()) {
      errors.message = 'Message is required';
    } else if (values.message.length < 10) {
      errors.message = 'Message must be at least 10 characters';
    }
  
    return errors;
  };