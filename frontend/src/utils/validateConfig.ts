/**
 * Frontend Configuration Validator
 * Use this to validate your frontend configuration
 */

import { API_CONFIG, isDevelopment, isProduction } from '@/config/api';

interface ConfigValidation {
  isValid: boolean;
  errors: string[];
  warnings: string[];
  info: string[];
}

export const validateConfiguration = (): ConfigValidation => {
  const errors: string[] = [];
  const warnings: string[] = [];
  const info: string[] = [];

  // Check API URL
  if (!API_CONFIG.BASE_URL) {
    errors.push('API_BASE_URL is not configured');
  } else {
    info.push(`API Base URL: ${API_CONFIG.BASE_URL}`);
    
    // Check for localhost in production
    if (isProduction && API_CONFIG.BASE_URL.includes('localhost')) {
      errors.push('Using localhost API URL in production environment');
    }
    
    // Check for HTTP in production
    if (isProduction && API_CONFIG.BASE_URL.startsWith('http://')) {
      warnings.push('Using HTTP instead of HTTPS in production');
    }
  }

  // Check environment variables
  const envVars = {
    'VITE_API_URL': import.meta.env.VITE_API_URL,
    'VITE_NODE_ENV': import.meta.env.VITE_NODE_ENV
  };

  Object.entries(envVars).forEach(([key, value]) => {
    if (value) {
      info.push(`${key}: ${value}`);
    } else if (key === 'VITE_API_URL' || key === 'VITE_NODE_ENV') {
      warnings.push(`${key} is not set`);
    }
  });

  // Environment-specific checks
  if (isDevelopment) {
    info.push('Running in development mode');
    if (!API_CONFIG.BASE_URL.includes('localhost')) {
      warnings.push('Not using localhost API in development');
    }
  }

  if (isProduction) {
    info.push('Running in production mode');
    if (API_CONFIG.BASE_URL.includes('localhost')) {
      errors.push('Using localhost API in production');
    }
  }



  return {
    isValid: errors.length === 0,
    errors,
    warnings,
    info
  };
};

export const logConfiguration = (): void => {
  const validation = validateConfiguration();
  
  console.group('🔍 Frontend Configuration Validation');
  
  if (validation.info.length > 0) {
    console.group('ℹ️ Information');
    validation.info.forEach(info => console.log(`• ${info}`));
    console.groupEnd();
  }
  
  if (validation.warnings.length > 0) {
    console.group('⚠️ Warnings');
    validation.warnings.forEach(warning => console.warn(`• ${warning}`));
    console.groupEnd();
  }
  
  if (validation.errors.length > 0) {
    console.group('❌ Errors');
    validation.errors.forEach(error => console.error(`• ${error}`));
    console.groupEnd();
  }
  
  if (validation.isValid) {
    console.log('✅ Configuration is valid!');
  } else {
    console.error('❌ Configuration has errors that need to be fixed');
  }
  
  console.groupEnd();
};

// Auto-run validation in development
if (isDevelopment) {
  logConfiguration();
}

export default validateConfiguration;