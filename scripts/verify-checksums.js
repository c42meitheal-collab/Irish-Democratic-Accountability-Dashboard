#!/usr/bin/env node
/**
 * 🇮🇪 Irish Democratic Accountability Dashboard - Checksum Verification Script
 * 
 * Verifies data integrity using cryptographic checksums to prevent tampering.
 * Used in CI/CD pipeline and runtime to ensure data authenticity.
 */

const crypto = require('crypto');
const fs = require('fs');

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

// Calculate SHA-256 hash of file
function calculateFileHash(filePath) {
    try {
        const data = fs.readFileSync(filePath);
        return crypto.createHash('sha256').update(data).digest('hex');
    } catch (err) {
        error(`Failed to calculate hash for ${filePath}: ${err.message}`);
        return null;
    }
}

// Calculate SHA-256 hash of JSON data (normalized)
function calculateJSONHash(data) {
    try {
        // Normalize JSON by stringifying with sorted keys
        const normalized = JSON.stringify(data, Object.keys(data).sort());
        return crypto.createHash('sha256').update(normalized).digest('hex');
    } catch (err) {
        error(`Failed to calculate JSON hash: ${err.message}`);
        return null;
    }
}

// Expected checksums (to be updated when data changes)
const EXPECTED_CHECKSUMS = {
    'complete-td-database.json': {
        description: 'Complete TD database with all 174 TDs',
        // This would be updated when the database changes
        expected: null // Will be calculated and stored
    },
    'data/property-data.json': {
        description: 'TD property ownership data',
        expected: null
    },
    'data/voting-records-2024.json': {
        description: '2024 housing-related voting records',
        expected: null
    },
    'data/housing-stats.json': {
        description: 'Housing market statistics',
        expected: null
    },
    'data/electoral-margins.json': {
        description: 'Electoral vulnerability data',
        expected: null
    }
};

function generateChecksums() {
    log('\n🔐 Generating Data Checksums...');
    
    const checksums = {};
    let allCalculated = true;
    
    for (const [filePath, info] of Object.entries(EXPECTED_CHECKSUMS)) {
        if (fs.existsSync(filePath)) {
            const hash = calculateFileHash(filePath);
            if (hash) {
                checksums[filePath] = {
                    hash,
                    description: info.description,
                    timestamp: new Date().toISOString(),
                    fileSize: fs.statSync(filePath).size
                };
                success(`${filePath}: ${hash.substring(0, 16)}...`);
            } else {
                allCalculated = false;
            }
        } else {
            warning(`File not found: ${filePath}`);
            allCalculated = false;
        }
    }
    
    if (allCalculated) {
        // Save checksums to file
        const checksumsFile = 'data/checksums.json';
        fs.writeFileSync(checksumsFile, JSON.stringify(checksums, null, 2));
        success(`Checksums saved to ${checksumsFile}`);
    }
    
    return checksums;
}

function verifyChecksums() {
    log('\n🔍 Verifying Data Checksums...');
    
    const checksumsFile = 'data/checksums.json';
    
    if (!fs.existsSync(checksumsFile)) {
        warning('No checksums file found. Generating new checksums...');
        return generateChecksums();
    }
    
    let savedChecksums;
    try {
        savedChecksums = JSON.parse(fs.readFileSync(checksumsFile, 'utf8'));
    } catch (err) {
        error(`Failed to read checksums file: ${err.message}`);
        return false;
    }
    
    let allVerified = true;
    
    for (const [filePath, savedData] of Object.entries(savedChecksums)) {
        if (fs.existsSync(filePath)) {
            const currentHash = calculateFileHash(filePath);
            
            if (currentHash === savedData.hash) {
                success(`${filePath}: Verified ✓`);
            } else {
                error(`${filePath}: CHECKSUM MISMATCH!`);
                error(`  Expected: ${savedData.hash}`);
                error(`  Actual:   ${currentHash}`);
                allVerified = false;
            }
        } else {
            error(`${filePath}: File missing!`);
            allVerified = false;
        }
    }
    
    return allVerified;
}

function validateDataIntegrity() {
    log('\n🛡️  Validating Data Integrity...');
    
    // Additional integrity checks beyond simple checksums
    
    // 1. Check TD count consistency
    try {
        const tdData = JSON.parse(fs.readFileSync('complete-td-database.json', 'utf8'));
        let tdCount = 0;
        
        for (const county in tdData) {
            for (const constituency in tdData[county]) {
                tdCount += tdData[county][constituency].length;
            }
        }
        
        if (tdCount === 174) {
            success(`TD count integrity: ${tdCount} TDs confirmed`);
        } else {
            error(`TD count integrity failure: Expected 174, found ${tdCount}`);
            return false;
        }
    } catch (err) {
        error(`TD data integrity check failed: ${err.message}`);
        return false;
    }
    
    // 2. Check property data consistency
    try {
        const propertyData = JSON.parse(fs.readFileSync('data/property-data.json', 'utf8'));
        
        if (Array.isArray(propertyData)) {
            const landlordCount = propertyData.filter(td => td.landlord).length;
            success(`Property data integrity: ${landlordCount} landlord TDs`);
        } else {
            warning('Property data format may need validation');
        }
    } catch (err) {
        error(`Property data integrity check failed: ${err.message}`);
        return false;
    }
    
    // 3. Check for suspicious modifications
    const criticalFiles = ['complete-td-database.json', 'data/property-data.json'];
    for (const file of criticalFiles) {
        const stats = fs.statSync(file);
        const modifiedTime = stats.mtime;
        const now = new Date();
        const hoursSinceModified = (now - modifiedTime) / (1000 * 60 * 60);
        
        if (hoursSinceModified < 1) {
            warning(`${file} was modified recently (${hoursSinceModified.toFixed(1)} hours ago)`);
        }
    }
    
    return true;
}

function runChecksumVerification() {
    log('🇮🇪 Irish Democratic Accountability Dashboard - Checksum Verification');
    log('====================================================================');
    
    const results = {
        checksumVerification: verifyChecksums(),
        dataIntegrity: validateDataIntegrity()
    };
    
    log('\n====================================================================');
    
    if (results.checksumVerification && results.dataIntegrity) {
        success('All integrity checks passed! ✅');
        log('🔐 Data authenticity and integrity confirmed.');
        process.exit(0);
    } else {
        error('Some integrity checks failed! ❌');
        
        if (!results.checksumVerification) {
            log('🚨 CHECKSUM VERIFICATION FAILED - Data may have been tampered with!');
        }
        
        if (!results.dataIntegrity) {
            log('🚨 DATA INTEGRITY ISSUES - Structural problems detected!');
        }
        
        log('⚠️  Please investigate data integrity issues before deployment.');
        process.exit(1);
    }
}

// Command line interface
if (require.main === module) {
    const args = process.argv.slice(2);
    
    if (args.includes('--generate')) {
        log('🔐 Generating new checksums...');
        generateChecksums();
    } else if (args.includes('--verify')) {
        log('🔍 Verifying existing checksums...');
        const verified = verifyChecksums();
        process.exit(verified ? 0 : 1);
    } else {
        runChecksumVerification();
    }
}

module.exports = {
    calculateFileHash,
    calculateJSONHash,
    generateChecksums,
    verifyChecksums,
    validateDataIntegrity,
    runChecksumVerification
};