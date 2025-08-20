#!/usr/bin/env node

/**
 * 🇮🇪 Irish Democratic Accountability Dashboard - Release Setup
 * 
 * This script updates all repository URLs with c42meitheal-collab GitHub details
 * and prepares the project for deployment.
 */

const fs = require('fs');
const path = require('path');

console.log('🇮🇪 IRISH DEMOCRATIC ACCOUNTABILITY DASHBOARD - RELEASE SETUP');
console.log('================================================================');
console.log('Repository: https://github.com/c42meitheal-collab/Irish-Democratic-Accountability-Dashboard/');
console.log('================================================================\n');

const GITHUB_USERNAME = 'c42meitheal-collab';
const REPO_NAME = 'Irish-Democratic-Accountability-Dashboard';

function updateFileUrls(filePath, username, repoName) {
    try {
        let content = fs.readFileSync(filePath, 'utf8');
        
        // Replace all instances of yourusername with actual username
        content = content.replace(/yourusername/g, username);
        
        // Replace any generic repository names with the actual repo name
        content = content.replace(/irish-democratic-accountability-dashboard/g, repoName);
        
        fs.writeFileSync(filePath, content);
        console.log(`✅ Updated: ${filePath}`);
        return true;
    } catch (error) {
        console.log(`❌ Error updating ${filePath}: ${error.message}`);
        return false;
    }
}

function main() {
    try {
        console.log('🔄 Updating files for c42meitheal-collab deployment...');
        console.log('================================================================');
        
        // Files to update
        const filesToUpdate = [
            'package.json',
            'README.md', 
            'CONTRIBUTING.md',
            'manifest.json'
        ];
        
        let successCount = 0;
        
        for (const file of filesToUpdate) {
            if (fs.existsSync(file)) {
                if (updateFileUrls(file, GITHUB_USERNAME, REPO_NAME)) {
                    successCount++;
                }
            } else {
                console.log(`⚠️  File not found: ${file}`);
            }
        }
        
        console.log('\n================================================================');
        console.log(`📊 SETUP COMPLETE: ${successCount}/${filesToUpdate.length} files updated`);
        
        console.log('\n🚀 NEXT STEPS:');
        console.log('1. Repository already specified:');
        console.log(`   📍 https://github.com/${GITHUB_USERNAME}/${REPO_NAME}/`);
        
        console.log('\n2. Deploy to GitHub:');
        console.log(`   git remote add origin https://github.com/${GITHUB_USERNAME}/${REPO_NAME}.git`);
        console.log('   git add .');
        console.log('   git commit -m "Release v2.0.0: Enhanced TD Finance Comparison"');
        console.log('   git branch -M main');
        console.log('   git push -u origin main');
        
        console.log('\n3. Enable GitHub Pages:');
        console.log('   - Go to repository Settings > Pages');
        console.log('   - Source: Deploy from a branch');
        console.log('   - Branch: main / (root)');
        console.log('   - Save');
        
        console.log('\n4. Your live dashboard will be at:');
        console.log(`   🌐 https://${GITHUB_USERNAME}.github.io/${REPO_NAME}/`);
        
        console.log('\n🎯 TESTING COMMAND:');
        console.log('   node test-dashboard.js');
        
        console.log('\n🇮🇪 Ready to expose systematic wealth extraction! 🇮🇪');
        
    } catch (error) {
        console.error('❌ Setup failed:', error.message);
    }
}

main();
