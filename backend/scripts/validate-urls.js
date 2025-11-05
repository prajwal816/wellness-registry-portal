#!/usr/bin/env node

/**
 * URL Configuration Validator
 * Run this script to validate your URL configuration
 */

require('dotenv').config();

const colors = {
    green: '\x1b[32m',
    red: '\x1b[31m',
    yellow: '\x1b[33m',
    blue: '\x1b[34m',
    reset: '\x1b[0m',
    bold: '\x1b[1m'
};

const log = (color, message) => console.log(`${color}${message}${colors.reset}`);

console.log(`${colors.bold}${colors.blue}🔍 URL Configuration Validator${colors.reset}\n`);

// Check required environment variables
const requiredVars = [
    'MONGODB_URI',
    'JWT_SECRET',
    'GOOGLE_CLIENT_ID',
    'GOOGLE_CLIENT_SECRET',
    'CLIENT_URL'
];

const optionalVars = [
    'GOOGLE_CALLBACK_URL'
];

log(colors.bold, '📋 Required Environment Variables:');
requiredVars.forEach(varName => {
    const value = process.env[varName];
    if (value) {
        log(colors.green, `✅ ${varName}: ${value.substring(0, 50)}${value.length > 50 ? '...' : ''}`);
    } else {
        log(colors.red, `❌ ${varName}: Missing!`);
    }
});

console.log();
log(colors.bold, '🔗 Optional URL Variables:');
optionalVars.forEach(varName => {
    const value = process.env[varName];
    if (value) {
        log(colors.green, `✅ ${varName}: ${value}`);
    } else {
        log(colors.yellow, `⚠️  ${varName}: Not set`);
    }
});

console.log();
log(colors.bold, '🌐 CORS Configuration Preview:');

const getAllowedOrigins = () => {
    const origins = [
        process.env.CLIENT_URL,
        'http://localhost:3000',
        'http://localhost:8080',
        'http://localhost:5173'
    ].filter(Boolean);

    return [...new Set(origins)];
};

const allowedOrigins = getAllowedOrigins();
allowedOrigins.forEach(origin => {
    const isLocal = origin.includes('localhost') || origin.includes('127.0.0.1');
    const color = isLocal ? colors.yellow : colors.green;
    log(color, `  • ${origin}`);
});

console.log();
log(colors.bold, '🔐 Google OAuth Configuration:');
const callbackUrl = process.env.GOOGLE_CALLBACK_URL;
if (callbackUrl) {
    log(colors.green, `✅ Callback URL: ${callbackUrl}`);

    console.log();
    log(colors.blue, '📝 Add these to Google Cloud Console:');
    log(colors.reset, `Authorized JavaScript Origins:`);
    allowedOrigins.filter(url => !url.includes('localhost')).forEach(url => {
        log(colors.reset, `  ${url}`);
    });

    log(colors.reset, `\nAuthorized Redirect URIs:`);
    log(colors.reset, `  ${callbackUrl}`);
} else {
    log(colors.red, '❌ GOOGLE_CALLBACK_URL not set!');
}

console.log();
log(colors.bold, '💡 Tips:');
log(colors.reset, '• Make sure all production URLs use HTTPS');
log(colors.reset, '• Remove trailing slashes from URLs');
log(colors.reset, '• Redeploy after changing environment variables');
log(colors.reset, '• Test CORS with browser developer tools');

console.log();
log(colors.green, '✨ Validation complete!');

// Check for common issues
console.log();
log(colors.bold, '🔍 Common Issues Check:');

// Check for localhost in production
if (process.env.NODE_ENV === 'production') {
    const hasLocalhost = allowedOrigins.some(url => url.includes('localhost'));
    if (hasLocalhost) {
        log(colors.yellow, '⚠️  Localhost URLs detected in production environment');
    }
}

// Check for missing HTTPS in production URLs
const productionUrls = allowedOrigins.filter(url => !url.includes('localhost'));
const hasHttp = productionUrls.some(url => url.startsWith('http://'));
if (hasHttp) {
    log(colors.red, '❌ HTTP URLs detected! Use HTTPS for production');
}

// Check for trailing slashes
const hasTrailingSlash = allowedOrigins.some(url => url.endsWith('/'));
if (hasTrailingSlash) {
    log(colors.yellow, '⚠️  URLs with trailing slashes detected - remove them');
}

console.log();