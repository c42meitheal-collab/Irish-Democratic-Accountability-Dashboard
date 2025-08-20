#!/usr/bin/env node

/**
 * 🧪 Irish Democratic Accountability Dashboard - Pre-Deployment Test
 * 
 * Quick validation to ensure everything works before going live
 */

const fs = require('fs');
const path = require('path');

console.log('🧪 IRISH DEMOCRATIC ACCOUNTABILITY DASHBOARD - PRE-DEPLOYMENT TEST');
console.log('==================================================================');

let testsPassed = 0;
let totalTests = 0;

function test(description, assertion) {
    totalTests++;
    try {
        if (assertion()) {
            console.log(`✅ ${description}`);
            testsPassed++;
            return true;
        } else {
            console.log(`❌ ${description}`);
            return false;
        }
    } catch (error) {
        console.log(`❌ ${description} - Error: ${error.message}`);
        return false;
    }
}

function fileExists(filePath) {
    return fs.existsSync(filePath);
}

function fileContains(filePath, searchString) {
    if (!fileExists(filePath)) return false;
    const content = fs.readFileSync(filePath, 'utf8');
    return content.includes(searchString);
}

function jsonValid(filePath) {
    if (!fileExists(filePath)) return false;
    try {
        const content = fs.readFileSync(filePath, 'utf8');
        JSON.parse(content);
        return true;
    } catch {
        return false;
    }
}

console.log('\n📋 PHASE 1: Core File Tests');
console.log('==========================');

test('index.html exists', () => fileExists('index.html'));
test('index.html contains TD Finance Calculator', () => fileContains('index.html', 'Enhanced TD Finance Comparison'));
test('index.html contains property hoarding stats', () => fileContains('index.html', '75% of new Dublin properties'));
test('index.html contains dark mode toggle', () => fileContains('index.html', 'toggleTheme'));
test('CSS embedded in index.html', () => fileContains('index.html', '.theme-toggle'));

console.log('\n📊 PHASE 2: Data Integrity Tests');
console.log('===============================');

test('complete-td-database.json is valid JSON', () => jsonValid('complete-td-database.json'));
test('property-data.json exists and valid', () => jsonValid('data/property-data.json'));
test('voting-records-2024.json exists and valid', () => jsonValid('data/voting-records-2024.json'));
test('housing-stats.json exists and valid', () => jsonValid('data/housing-stats.json'));
test('electoral-margins.json exists and valid', () => jsonValid('data/electoral-margins.json'));

// Test TD database content
if (fileExists('complete-td-database.json')) {
    try {
        const tdData = JSON.parse(fs.readFileSync('complete-td-database.json', 'utf8'));
        test('TD database contains Dublin constituencies', () => tdData.Dublin && Object.keys(tdData.Dublin).length > 0);
        test('TD database contains Cork constituencies', () => tdData.Cork && Object.keys(tdData.Cork).length > 0);
        test('TD database contains Kerry (landlord TD hotspot)', () => tdData.Kerry && Object.keys(tdData.Kerry).length > 0);
    } catch (error) {
        test('TD database content validation', () => false);
    }
}

console.log('\n🔧 PHASE 3: Configuration Tests');
console.log('==============================');

test('package.json is valid JSON', () => jsonValid('package.json'));
test('README.md exists', () => fileExists('README.md'));
test('CHANGELOG.md exists', () => fileExists('CHANGELOG.md'));
test('LICENSE exists', () => fileExists('LICENSE'));

// Check if repository URLs have been updated
if (fileExists('package.json')) {
    test('Repository URLs updated (no "yourusername")', () => !fileContains('package.json', 'yourusername'));
    test('Package.json contains proper homepage', () => fileContains('package.json', 'github.io'));
}

console.log('\n🚀 PHASE 4: Deployment Readiness');
console.log('===============================');

test('GitHub workflows directory exists', () => fileExists('.github/workflows'));
test('Deploy workflow exists', () => fileExists('.github/workflows/deploy.yml'));
test('Issue templates exist', () => fileExists('.github/ISSUE_TEMPLATE'));
test('Pull request template exists', () => fileExists('.github/pull_request_template.md'));
test('Deploy script exists (Linux/Mac)', () => fileExists('scripts/deploy-github.sh'));
test('Deploy script exists (Windows)', () => fileExists('scripts/deploy-github.bat'));

console.log('\n🎯 PHASE 5: Security & Privacy Tests');
console.log('===================================');

test('No API keys in code', () => !fileContains('index.html', 'api_key') && !fileContains('index.html', 'secret'));
test('No external tracking', () => !fileContains('index.html', 'google-analytics') && !fileContains('index.html', 'gtag'));
test('HTTPS ready (no HTTP links)', () => !fileContains('index.html', 'http://'));
test('No localStorage usage', () => !fileContains('index.html', 'localStorage.setItem'));

// Check for proper dark mode implementation
test('Dark mode properly implemented', () => fileContains('index.html', 'data-theme') && fileContains('index.html', 'localStorage.getItem(\'theme\')'));

console.log('\n📱 PHASE 6: Functionality Tests');
console.log('==============================');

// Test JavaScript functionality indicators
test('Tax calculation functions present', () => fileContains('index.html', 'calculateIncomeTax'));
test('TD database integration', () => fileContains('index.html', 'TD_DATABASE'));
test('Hoarding statistics integration', () => fileContains('index.html', 'HOARDING_DATA'));
test('Event handlers attached', () => fileContains('index.html', 'addEventListener'));
test('Mobile responsive meta tag', () => fileContains('index.html', 'viewport'));

console.log('\n📄 PHASE 7: Documentation Tests');
console.log('==============================');

test('README contains deployment instructions', () => fileContains('README.md', 'deployment') || fileContains('README.md', 'deploy'));
test('README contains feature descriptions', () => fileContains('README.md', 'TD Finance') && fileContains('README.md', 'Property'));
test('CONTRIBUTING.md exists', () => fileExists('CONTRIBUTING.md'));
test('SECURITY.md exists', () => fileExists('SECURITY.md'));
test('Deployment guide created', () => fileExists('DEPLOYMENT_GUIDE.md'));

console.log('\n🌍 PHASE 8: Accessibility & Performance');
console.log('=====================================');

test('Semantic HTML structure', () => fileContains('index.html', '<main>') && fileContains('index.html', '<section>'));
test('Alt text for interactive elements', () => fileContains('index.html', 'aria-label'));
test('Proper heading hierarchy', () => fileContains('index.html', '<h1>') && fileContains('index.html', '<h2>'));
test('CSS animations are reasonable', () => fileContains('index.html', 'transition') || fileContains('index.html', 'animation'));

console.log('\n==================================================================');
console.log('📊 TEST RESULTS SUMMARY');
console.log('==================================================================');

const successRate = ((testsPassed / totalTests) * 100).toFixed(1);

console.log(`✅ Tests Passed: ${testsPassed}/${totalTests} (${successRate}%)`);

if (successRate >= 95) {
    console.log('🎉 EXCELLENT: Dashboard ready for deployment!');
    console.log('🚀 Proceed with GitHub deployment immediately.');
} else if (successRate >= 85) {
    console.log('✅ GOOD: Dashboard mostly ready, minor issues to fix.');
    console.log('🔧 Review failed tests above before deployment.');
} else if (successRate >= 70) {
    console.log('⚠️  CAUTION: Several issues need attention.');
    console.log('🛠️  Fix critical issues before deploying.');
} else {
    console.log('❌ CRITICAL: Major issues detected.');
    console.log('🚫 Do not deploy until issues are resolved.');
}

console.log('\n🎯 NEXT STEPS:');
if (successRate >= 85) {
    console.log('1. Run: node setup-release.js (to update repository URLs)');
    console.log('2. Follow: DEPLOYMENT_GUIDE.md');
    console.log('3. Deploy to GitHub Pages');
    console.log('4. Share your transparency weapon! 🇮🇪');
} else {
    console.log('1. Fix the failed tests above');
    console.log('2. Re-run this test script');
    console.log('3. Once >85% passing, proceed with deployment');
}

console.log('\n🇮🇪 Exposing systematic wealth extraction, one test at a time! 🇮🇪');
