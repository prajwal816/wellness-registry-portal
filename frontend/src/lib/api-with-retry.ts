import axios, { AxiosError } from 'axios';
import { authAPI } from './api';

/**
 * Wrapper for API calls with automatic retry logic for sleeping backend
 */

const MAX_RETRIES = 3;
const RETRY_DELAYS = [5000, 15000, 30000]; // 5s, 15s, 30s

async function sleep(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export async function registerWithRetry(userData: {
  name: string;
  email: string;
  password: string;
}, onRetry?: (attempt: number, maxAttempts: number) => void) {
  let lastError: any;

  for (let attempt = 0; attempt < MAX_RETRIES; attempt++) {
    try {
      console.log(`Registration attempt ${attempt + 1}/${MAX_RETRIES}`);
      const response = await authAPI.register(userData);
      console.log('Registration successful!');
      return response;
    } catch (error: any) {
      lastError = error;
      const isNetworkError = error.code === 'ERR_NETWORK' || error.message === 'Network Error';
      
      console.error(`Attempt ${attempt + 1} failed:`, error.message);

      // If it's a network error and we have retries left, wait and retry
      if (isNetworkError && attempt < MAX_RETRIES - 1) {
        const delay = RETRY_DELAYS[attempt];
        console.log(`Backend is waking up... Retrying in ${delay / 1000} seconds`);
        
        if (onRetry) {
          onRetry(attempt + 1, MAX_RETRIES);
        }
        
        await sleep(delay);
        continue;
      }

      // If it's not a network error, or we're out of retries, throw immediately
      throw error;
    }
  }

  throw lastError;
}

export async function loginWithRetry(credentials: {
  email: string;
  password: string;
}, onRetry?: (attempt: number, maxAttempts: number) => void) {
  let lastError: any;

  for (let attempt = 0; attempt < MAX_RETRIES; attempt++) {
    try {
      console.log(`Login attempt ${attempt + 1}/${MAX_RETRIES}`);
      const response = await authAPI.login(credentials);
      console.log('Login successful!');
      return response;
    } catch (error: any) {
      lastError = error;
      const isNetworkError = error.code === 'ERR_NETWORK' || error.message === 'Network Error';
      
      console.error(`Attempt ${attempt + 1} failed:`, error.message);

      // If it's a network error and we have retries left, wait and retry
      if (isNetworkError && attempt < MAX_RETRIES - 1) {
        const delay = RETRY_DELAYS[attempt];
        console.log(`Backend is waking up... Retrying in ${delay / 1000} seconds`);
        
        if (onRetry) {
          onRetry(attempt + 1, MAX_RETRIES);
        }
        
        await sleep(delay);
        continue;
      }

      // If it's not a network error, or we're out of retries, throw immediately
      throw error;
    }
  }

  throw lastError;
}