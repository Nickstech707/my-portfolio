export const formatPhoneNumber = (phone: string): string => {
    // Remove any non-digit characters
    const cleaned = phone.replace(/\D/g, '');
    
    // Handle different formats
    if (cleaned.startsWith('0')) {
      // Convert 07... to 2547...
      return `254${cleaned.substring(1)}`;
    } else if (cleaned.startsWith('7')) {
      // Convert 7... to 2547...
      return `254${cleaned}`;
    } else if (cleaned.startsWith('254')) {
      // Already in correct format
      return cleaned;
    }
    
    return cleaned;
  };
  
  export const formatPhoneNumberForDisplay = (phone: string): string => {
    const cleaned = phone.replace(/\D/g, '');
    if (cleaned.startsWith('254')) {
      return `0${cleaned.substring(3)}`;
    }
    return cleaned;
  };