#!/usr/bin/env node
/**
 * 🇮🇪 Irish Democratic Accountability Dashboard - Data Validation Script
 * 
 * Validates the structure and integrity of TD database and related data files.
 * Used in CI/CD pipeline to ensure data quality.
 */

const fs = require('fs');
const path = require('path');

// Colors for console output
const colors = {
    green: '\x1b[32m',
    red: '\x1b[31m',
    yellow: '\x1b[33m',
    reset: '\x1b[0m'
};

function log(message, color = colors.reset) {
    console.log(`${color}${message}${colors.reset}`);
}

function success(message) {
    log(`✅ ${message}`, colors.green);
}

function error(message) {
    log(`❌ ${message}`, colors.red);
}

function warning(message) {
    log(`⚠️  ${message}`, colors.yellow);
}

// Validation functions
function validateTDDatabase() {
    log('\n📋 Validating TD Database...');
    
    try {
        const data = JSON.parse(fs.readFileSync('complete-td-database.json', 'utf8'));
        
        // Count total TDs
        let totalTDs = 0;
        let countiesCovered = 0;
        let constituenciesCovered = 0;
        
        for (const county in data) {
            countiesCovered++;
            for (const constituency in data[county]) {
                constituenciesCovered++;
                totalTDs += data[county][constituency].length;
            }
        }
        
        // Validate TD count
        if (totalTDs === 174) {
            success(`TD count correct: ${totalTDs} TDs`);
        } else {
            error(`TD count incorrect: Expected 174, found ${totalTDs}`);
            return false;
        }
        
        success(`Counties covered: ${countiesCovered}`);
        success(`Constituencies covered: ${constituenciesCovered}`);
        
        // Validate TD structure
        let validationErrors = 0;
        for (const county in data) {
            for (const constituency in data[county]) {
                for (const td of data[county][constituency]) {
                    if (!td.name || typeof td.name !== 'string') {
                        error(`Invalid TD name in ${constituency}: ${JSON.stringify(td)}`);
                        validationErrors++;
                    }
                    if (!td.party || typeof td.party !== 'string') {
                        error(`Invalid party for ${td.name}: ${td.party}`);
                        validationErrors++;
                    }
                    if (typeof td.properties !== 'number' || td.properties < 0) {
                        error(`Invalid property count for ${td.name}: ${td.properties}`);
                        validationErrors++;
                    }
                    if (typeof td.landlord !== 'boolean') {
                        error(`Invalid landlord status for ${td.name}: ${td.landlord}`);
                        validationErrors++;
                    }
                }
            }
        }
        
        if (validationErrors === 0) {
            success('TD database structure validation passed');
            return true;
        } else {
            error(`TD database validation failed with ${validationErrors} errors`);
            return false;
        }
        
    } catch (err) {
        error(`Failed to validate TD database: ${err.message}`);
        return false;
    }
}

function validatePropertyData() {
    log('\n🏠 Validating Property Data...');
    
    try {
        const data = JSON.parse(fs.readFileSync('data/property-data.json', 'utf8'));
        
        let landlordTDs = 0;
        let totalProperties = 0;
        let totalValue = 0;
        
        if (Array.isArray(data)) {
            for (const td of data) {
                if (td.landlord) {
                    landlordTDs++;
                    totalProperties += td.properties || 0;
                    totalValue += td.value || 0;
                }
            }
        } else {
            warning('Property data format may need updating');
        }
        
        success(`Landlord TDs: ${landlordTDs}`);
        success(`Total properties: ${totalProperties}`);
        success(`Total estimated value: €${(totalValue / 1000000).toFixed(1)}M`);
        
        return true;
        
    } catch (err) {
        error(`Failed to validate property data: ${err.message}`);
        return false;
    }
}

function validateVotingRecords() {
    log('\n🗳️  Validating Voting Records...');
    
    try {
        const data = JSON.parse(fs.readFileSync('data/voting-records-2024.json', 'utf8'));
        
        let votingRecords = 0;
        if (Array.isArray(data)) {
            votingRecords = data.length;
        } else if (typeof data === 'object') {
            votingRecords = Object.keys(data).length;
        }
        
        success(`Voting records: ${votingRecords} entries`);
        return true;
        
    } catch (err) {
        error(`Failed to validate voting records: ${err.message}`);
        return false;
    }
}

function validateHousingStats() {
    log('\n📊 Validating Housing Statistics...');
    
    try {
        const data = JSON.parse(fs.readFileSync('data/housing-stats.json', 'utf8'));
        
        success('Housing statistics file is valid JSON');
        return true;
        
    } catch (err) {
        error(`Failed to validate housing statistics: ${err.message}`);
        return false;
    }
}

function validateElectoralData() {
    log('\n⚡ Validating Electoral Data...');
    
    try {
        const data = JSON.parse(fs.readFileSync('data/electoral-margins.json', 'utf8'));
        
        success('Electoral margins file is valid JSON');
        return true;
        
    } catch (err) {
        error(`Failed to validate electoral data: ${err.message}`);
        return false;
    }
}

function validateRequiredFiles() {
    log('\n📁 Validating Required Files...');
    
    const requiredFiles = [
        'index.html',
        'complete-td-database.json',
        'data/property-data.json',
        'data/voting-records-2024.json',
        'data/housing-stats.json',
        'data/electoral-margins.json'
    ];
    
    let allFilesPresent = true;
    
    for (const file of requiredFiles) {
        if (fs.existsSync(file)) {
            success(`Found: ${file}`);
        } else {
            error(`Missing: ${file}`);
            allFilesPresent = false;
        }
    }
    
    return allFilesPresent;
}

// Main validation function
function runValidation() {
    log('🇮🇪 Irish Democratic Accountability Dashboard - Data Validation');
    log('================================================================');
    
    const validations = [
        validateRequiredFiles,
        validateTDDatabase,
        validatePropertyData,
        validateVotingRecords,
        validateHousingStats,
        validateElectoralData
    ];
    
    let allPassed = true;
    
    for (const validation of validations) {
        try {
            const result = validation();
            if (!result) {
                allPassed = false;
            }
        } catch (err) {
            error(`Validation error: ${err.message}`);
            allPassed = false;
        }
    }
    
    log('\n================================================================');
    if (allPassed) {
        success('All validations passed! ✅');
        log('🇮🇪 Data integrity confirmed for democratic accountability.');
        process.exit(0);
    } else {
        error('Some validations failed! ❌');
        log('🚨 Please fix data issues before deployment.');
        process.exit(1);
    }
}

// Run validation if called directly
if (require.main === module) {
    runValidation();
}

module.exports = {
    validateTDDatabase,
    validatePropertyData,
    validateVotingRecords,
    validateHousingStats,
    validateElectoralData,
    validateRequiredFiles,
    runValidation
};