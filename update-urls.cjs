#!/usr/bin/env node

/**
 * URL Update Script
 * Replaces all placeholder URLs with actual deployment URLs
 */

const fs = require('fs');
const path = require('path');

// Your actual URLs
const FRONTEND_URL = 'https://wellness-registry-portal.vercel.app';
const BACKEND_URL = 'https://ayushwellness-backend.onrender.com';

// Files to update
const filesToUpdate = [
    'DEPLOYMENT_GUIDE.md',
    'URL_CONFIGURATION.md',
    'QUICK_SETUP.md',
    'FINAL_CONFIGURATION.md',
    'DEPLOYMENT_TESTING.md'
];

// URL replacements
const replacements = [
    {
        from: /https:\/\/your-app-name\.vercel\.app/g,
        to: FRONTEND_URL
    },
    {
        from: /https:\/\/your-backend-name\.onrender\.com/g,
        to: BACKEND_URL
    },
    {
        from: /https:\/\/YOUR_RENDER_SERVICE_NAME\.onrender\.com/g,
        to: BACKEND_URL
    },
    {
        from: /https:\/\/YOUR_VERCEL_APP\.vercel\.app/g,
        to: FRONTEND_URL
    },
    {
        from: /your-backend-name\.onrender\.com/g,
        to: 'ayushwellness-backend.onrender.com'
    },
    {
        from: /your-app-name\.vercel\.app/g,
        to: 'wellness-registry-portal.vercel.app'
    }
];

console.log('🔄 Updating URLs in documentation files...\n');

filesToUpdate.forEach(filename => {
    if (fs.existsSync(filename)) {
        let content = fs.readFileSync(filename, 'utf8');
        let updated = false;

        replacements.forEach(replacement => {
            if (replacement.from.test(content)) {
                content = content.replace(replacement.from, replacement.to);
                updated = true;
            }
        });

        if (updated) {
            fs.writeFileSync(filename, content);
            console.log(`✅ Updated: ${filename}`);
        } else {
            console.log(`⏭️  No changes needed: ${filename}`);
        }
    } else {
        console.log(`⚠️  File not found: ${filename}`);
    }
});

console.log('\n🎉 URL update complete!');
console.log(`Frontend: ${FRONTEND_URL}`);
console.log(`Backend:  ${BACKEND_URL}`);