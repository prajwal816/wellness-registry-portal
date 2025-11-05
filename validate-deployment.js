#!/usr/bin/env node

/**
 * Deployment Validation Script
 * Checks if your deployment is configured correctly
 */

const https = require('https');
const http = require('http');

const colors = {
    green: '\x1b[32m',
    red: '\x1b[31m',
    yellow: '\x1b[33m',
    blue: '\x1b[34m',
    reset: '\x1b[0m',
    bold: '\x1b[1m'
};

const log = (color, message) => console.log(`${color}${message}${colors.reset}`);

// Your deployment URLs
const FRONTEND_URL = 'https://wellness-registry-portal.vercel.app';
const BACKEND_URL = 'https://ayushwellness-backend.onrender.com';

console.log(`${colors.bold}${colors.blue}🚀 Deployment Validation${colors.reset}\n`);

// Test function for HTTP requests
function testUrl(url, description) {
    return new Promise((resolve) => {
        const protocol = url.startsWith('https') ? https : http;

        const req = protocol.get(url, (res) => {
            if (res.statusCode >= 200 && res.statusCode < 300) {
                log(colors.green, `✅ ${description}: ${res.statusCode}`);
                resolve(true);
            } else {
                log(colors.yellow, `⚠️  ${description}: ${res.statusCode}`);
                resolve(false);
            }
        });

        req.on('error', (error) => {
            log(colors.red, `❌ ${description}: ${error.message}`);
            resolve(false);
        });

        req.setTimeout(10000, () => {
            log(colors.red, `❌ ${description}: Timeout`);
            req.destroy();
            resolve(false);
        });
    });
}

// Test CORS
function testCors(url, origin) {
    return new Promise((resolve) => {
        const protocol = url.startsWith('https') ? https : http;
        const urlObj = new URL(url);

        const options = {
            hostname: urlObj.hostname,
            port: urlObj.port || (urlObj.protocol === 'https:' ? 443 : 80),
            path: urlObj.pathname,
            method: 'OPTIONS',
            headers: {
                'Origin': origin,
                'Access-Control-Request-Method': 'GET'
            }
        };

        const req = protocol.request(options, (res) => {
            const corsHeader = res.headers['access-control-allow-origin'];
            if (corsHeader === origin || corsHeader === '*') {
                log(colors.green, `✅ CORS allows origin: ${origin}`);
                resolve(true);
            } else {
                log(colors.red, `❌ CORS blocks origin: ${origin}`);
                resolve(false);
            }
        });

        req.on('error', (error) => {
            log(colors.red, `❌ CORS test failed: ${error.message}`);
            resolve(false);
        });

        req.setTimeout(10000, () => {
            log(colors.red, `❌ CORS test timeout`);
            req.destroy();
            resolve(false);
        });

        req.end();
    });
}

// Main validation function
async function validateDeployment() {
    log(colors.bold, '🌐 Testing URLs:');
    log(colors.reset, `Frontend: ${FRONTEND_URL}`);
    log(colors.reset, `Backend:  ${BACKEND_URL}\n`);

    // Test frontend
    log(colors.bold, '📱 Frontend Tests:');
    await testUrl(FRONTEND_URL, 'Frontend accessibility');

    // Test backend
    log(colors.bold, '\n🔧 Backend Tests:');
    await testUrl(BACKEND_URL, 'Backend root endpoint');
    await testUrl(`${BACKEND_URL}/health`, 'Backend health endpoint');

    // Test CORS
    log(colors.bold, '\n🔒 CORS Tests:');
    await testCors(`${BACKEND_URL}/api/auth/me`, FRONTEND_URL);

    // Configuration summary
    log(colors.bold, '\n📋 Configuration Summary:');
    log(colors.blue, 'Environment Variables to set:');

    log(colors.reset, '\nRender (Backend):');
    log(colors.reset, `CLIENT_URL=${FRONTEND_URL}`);
    log(colors.reset, `GOOGLE_CALLBACK_URL=${BACKEND_URL}/api/auth/google/callback`);

    log(colors.reset, '\nVercel (Frontend):');
    log(colors.reset, `VITE_API_URL=${BACKEND_URL}`);
    log(colors.reset, `VITE_NODE_ENV=production`);

    log(colors.reset, '\nGoogle Cloud Console:');
    log(colors.reset, `Authorized Origins: ${FRONTEND_URL}`);
    log(colors.reset, `Redirect URIs: ${BACKEND_URL}/api/auth/google/callback`);

    log(colors.bold, '\n🎯 Next Steps:');
    log(colors.reset, '1. Set environment variables on both platforms');
    log(colors.reset, '2. Update Google OAuth settings');
    log(colors.reset, '3. Test Google Sign-In functionality');
    log(colors.reset, '4. Test file upload functionality');

    console.log();
    log(colors.green, '✨ Validation complete!');
    log(colors.yellow, '💡 If any tests failed, check the deployment guides for troubleshooting.');
}

// Run validation
validateDeployment().catch(console.error);