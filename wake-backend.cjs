#!/usr/bin/env node

/**
 * Wake Up Backend Script
 * Pings the backend to wake it up from sleep
 */

const https = require('https');

const BACKEND_URL = 'https://ayushwellness-backend.onrender.com';

console.log('🔄 Waking up backend...');
console.log(`📍 URL: ${BACKEND_URL}/health`);
console.log('⏳ This may take 30-60 seconds...\n');

let attempts = 0;
const maxAttempts = 12; // 12 attempts = 60 seconds

function pingBackend() {
    attempts++;
    console.log(`Attempt ${attempts}/${maxAttempts}...`);

    https.get(`${BACKEND_URL}/health`, (res) => {
        let data = '';

        res.on('data', (chunk) => {
            data += chunk;
        });

        res.on('end', () => {
            if (res.statusCode === 200) {
                console.log('\n✅ Backend is awake!');
                console.log('📊 Response:', data);
                console.log('\n🎉 You can now use your app!');
                console.log(`🌐 Frontend: https://wellness-registry-portal.vercel.app`);
                process.exit(0);
            } else {
                console.log(`❌ Got status code: ${res.statusCode}`);
                retry();
            }
        });
    }).on('error', (err) => {
        console.log(`⚠️  Error: ${err.message}`);
        retry();
    });
}

function retry() {
    if (attempts < maxAttempts) {
        setTimeout(pingBackend, 5000); // Wait 5 seconds between attempts
    } else {
        console.log('\n❌ Backend did not wake up after 60 seconds');
        console.log('💡 Try running this script again or check Render logs');
        process.exit(1);
    }
}

pingBackend();