/**
 * Utility functions for ZIP code operations
 * Using the zipcodes npm package for fast and reliable lookups
 */
import zipcodes from 'zipcodes';

export interface ZipLookupResponse {
  city: string;
  state: string;
  country: string;
}

// Simple cache for any fallback lookups
const zipCache: Record<string, ZipLookupResponse> = {};

/**
 * Lookup city/state information from a ZIP code using the zipcodes package
 * @param zipCode ZIP code to lookup
 * @returns Object containing city, state, and country info
 */
export const lookupZipInfo = (zipCode: string): ZipLookupResponse | null => {
  // Validate ZIP code format
  if (!zipCode || !/^\d{5}(-\d{4})?$/.test(zipCode)) {
    console.log(`⚠️ Invalid ZIP code format: ${zipCode}`);
    return null;
  }
  
  try {
    // Use the zipcodes package to look up the zip code
    const normalizedZip = zipCode.substring(0, 5);
    console.log(`🔍 Looking up ZIP code in zipcodes package: ${normalizedZip}`);
    
    // First check if we have a cached result
    if (zipCache[normalizedZip]) {
      console.log(`🔄 Using cached result for ZIP: ${normalizedZip}`);
      return zipCache[normalizedZip];
    }
    
    const result = zipcodes.lookup(normalizedZip);
    
    // Return null if not found
    if (!result) {
      console.log(`❌ ZIP code not found in zipcodes package: ${normalizedZip}`);
      return null;
    }
    
    // Cache the result
    const response = {
      city: result.city,
      state: result.state,
      country: result.country
    };
    zipCache[normalizedZip] = response;
    
    console.log(`✅ Found city: ${result.city}, state: ${result.state} for ZIP: ${normalizedZip}`);
    return response;
  } catch (error) {
    console.error(`Error looking up ZIP code: ${zipCode}`, error);
    return null;
  }
};

/**
 * Fallback city names for common area codes we serve
 * This is used if the zipcodes package lookup fails
 */
const fallbackZipMapping: Record<string, ZipLookupResponse> = {
  '92618': { city: 'Irvine', state: 'CA', country: 'US' },
  '92602': { city: 'Irvine', state: 'CA', country: 'US' },
  '92603': { city: 'Irvine', state: 'CA', country: 'US' },
  '92604': { city: 'Irvine', state: 'CA', country: 'US' },
  '92606': { city: 'Irvine', state: 'CA', country: 'US' },
  '92612': { city: 'Irvine', state: 'CA', country: 'US' },
  '92614': { city: 'Irvine', state: 'CA', country: 'US' },
  '92617': { city: 'Irvine', state: 'CA', country: 'US' },
  '92620': { city: 'Irvine', state: 'CA', country: 'US' },
  '92707': { city: 'Santa Ana', state: 'CA', country: 'US' },
  '92780': { city: 'Tustin', state: 'CA', country: 'US' },
  // Add more common ZIP codes as needed
};

/**
 * Get city information from a ZIP code
 * This function will:
 * 1. Try to get the city from the zipcodes package
 * 2. If that fails, try to get it from our fallback mapping
 * 3. If both fail, return "Unknown"
 * 
 * @param zipCode ZIP code to lookup
 * @returns City name
 */
export const getCityFromZip = (zipCode: string): string => {
  if (!zipCode) {
    console.log('❌ No ZIP code provided');
    return "Unknown";
  }
  
  // Try zipcodes package lookup first
  const zipResult = lookupZipInfo(zipCode);
  if (zipResult) {
    console.log(`✅ Found city from zipcodes package: ${zipResult.city}`);
    return zipResult.city;
  }
  
  // Try fallback mapping
  const normalizedZip = zipCode.substring(0, 5);
  if (fallbackZipMapping[normalizedZip]) {
    console.log(`✅ Found city from fallback mapping: ${fallbackZipMapping[normalizedZip].city}`);
    return fallbackZipMapping[normalizedZip].city;
  }
  
  // Return a default if all else fails
  console.log(`❌ No city found for ZIP: ${zipCode}`);
  return "Unknown";
}; 