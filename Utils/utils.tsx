import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs));
};

export  const convertCentsToDollars = (cents: number) => {
  if (typeof cents !== "number" || isNaN(cents)) {
    return "Please provide a valid number of cents.";
  }

  const dollars = cents / 100;

  return dollars;
}

export const capitalizeFirstLetter = (string: string) => {
  return string?.charAt(0).toUpperCase() + string?.slice(1);
};

export const getErrorMessage = (errorCode: any) => {
  switch (errorCode) {
    case 'auth/claims-too-large':
      return 'The claims payload is too large.';
    case 'auth/email-already-exists':
      return 'This email is already in use. Please choose a different email.';
    case 'auth/email-already-in-use':
        return 'This email is already in use. Please choose a different email.';
    case 'auth/id-token-expired':
      return 'The provided Firebase ID token has expired.';
    case 'auth/id-token-revoked':
      return 'The Firebase ID token has been revoked.';
    case 'auth/insufficient-permission':
      return 'Insufficient permission to access the requested resource. Please check your credentials.';
    case 'auth/internal-error':
      return 'An unexpected error occurred on the server. Please report the issue.';
    case 'auth/invalid-argument':
      return 'An invalid argument was provided. Please check your input.';
    case 'auth/invalid-claims':
      return 'Invalid custom claim attributes.';
    case 'auth/invalid-continue-uri':
      return 'Invalid continue URL. Please provide a valid URL.';
    case 'auth/invalid-creation-time':
      return 'Invalid creation time. Please provide a valid UTC date string.';
    case 'auth/invalid-credential':
      return 'Invalid credential. Please use a valid credential for this action.';
    case 'auth/invalid-disabled-field':
      return 'Invalid value for the disabled user property. It must be a boolean.';
    case 'auth/invalid-display-name':
      return 'Invalid value for the display name. It must be a non-empty string.';
    case 'auth/invalid-dynamic-link-domain':
      return 'Invalid dynamic link domain. Please configure it for the current project.';
    case 'auth/invalid-email':
      return 'Invalid email address. Please provide a valid email.';
    case 'auth/invalid-email-verified':
      return 'Invalid value for email verification. It must be a boolean.';
    case 'auth/invalid-hash-algorithm':
      return 'Invalid hash algorithm.';
    case 'auth/invalid-hash-block-size':
      return 'Invalid hash block size. It must be a valid number.';
    case 'auth/invalid-hash-derived-key-length':
      return 'Invalid hash derived key length. It must be a valid number.';
    case 'auth/invalid-hash-key':
      return 'Invalid hash key. It must be a valid byte buffer.';
    case 'auth/invalid-hash-memory-cost':
      return 'Invalid hash memory cost. It must be a valid number.';
    case 'auth/invalid-hash-parallelization':
      return 'Invalid hash parallelization. It must be a valid number.';
    case 'auth/invalid-hash-rounds':
      return 'Invalid hash rounds. It must be a valid number.';
    case 'auth/invalid-hash-salt-separator':
      return 'Invalid hash salt separator. It must be a valid byte buffer.';
    case 'auth/invalid-id-token':
      return 'The provided ID token is not valid.';
    case 'auth/invalid-last-sign-in-time':
      return 'Invalid last sign-in time. Please provide a valid UTC date string.';
    case 'auth/invalid-page-token':
      return 'Invalid next page token. It must be a valid non-empty string.';
    case 'auth/invalid-password':
      return 'Invalid password. It must be a string with at least six characters.';
    case 'auth/invalid-password-hash':
      return 'Invalid password hash. It must be a valid byte buffer.';
    case 'auth/invalid-password-salt':
      return 'Invalid password salt. It must be a valid byte buffer.';
    case 'auth/invalid-phone-number':
      return 'Invalid phone number. It must be a non-empty E.164 standard compliant identifier string.';
    case 'auth/invalid-photo-url':
      return 'Invalid photo URL. It must be a string URL.';
    case 'auth/invalid-provider-data':
      return 'Invalid provider data. It must be a valid array of UserInfo objects.';
    case 'auth/invalid-provider-id':
      return 'Invalid provider ID. It must be a valid supported provider identifier string.';
    case 'auth/invalid-oauth-responsetype':
      return 'Only exactly one OAuth responseType should be set to true.';
    case 'auth/invalid-session-cookie-duration':
      return 'Invalid session cookie duration. It must be a valid number in milliseconds between 5 minutes and 2 weeks.';
    case 'auth/invalid-uid':
      return 'Invalid UID. It must be a non-empty string with at most 128 characters.';
    case 'auth/invalid-user-import':
      return 'Invalid user record to import.';
    case 'auth/maximum-user-count-exceeded':
      return 'Maximum allowed number of users to import has been exceeded.';
    case 'auth/missing-android-pkg-name':
      return 'Android Package Name is missing.';
    case 'auth/missing-continue-uri':
      return 'Missing continue URL. Please provide a valid continue URL.';
    case 'auth/missing-hash-algorithm':
      return 'Missing hashing algorithm for password hashes.';
    case 'auth/missing-ios-bundle-id':
      return 'Missing Bundle ID in the request.';
    case 'auth/missing-uid':
      return 'UID is required for the current operation.';
    case 'auth/missing-oauth-client-secret':
      return 'OAuth configuration client secret is missing.';
    case 'auth/operation-not-allowed':
      return 'The provided sign-in provider is disabled for your Firebase project.';
    case 'auth/phone-number-already-exists':
      return 'This phone number is already in use. Please choose a different phone number.';
    case 'auth/project-not-found':
      return 'No Firebase project found for the credential used. Please check your project setup.';
    case 'auth/reserved-claims':
      return 'One or more custom user claims provided are reserved.';
    default:
      return 'An unknown error occurred.';
  }
}