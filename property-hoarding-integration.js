/**
 * URGENT: Property Hoarding Data Integration
 * 
 * Latest LPT data from Richard Chambers/Pearse Doherty reveals systematic property hoarding
 * that makes TD conflicts even more damaging to democracy.
 */

const PROPERTY_HOARDING_DATA = {
    metadata: {
        source: "Local Property Tax registrations 2024 via Richard Chambers/Virgin Media",
        date: "2025-08-20",
        analysis_by: "Pearse Doherty TD (SF)",
        legal_basis: "LPT registration data - public information"
    },
    
    nationwide_hoarding: {
        total_newly_liable: 18411,
        hoarded_by_10plus_owners: 8272,
        hoarding_percentage: 45.0,
        individual_family_percentage: 55.0,
        context: "45% of new properties go to mega-landlords with 10+ portfolios"
    },
    
    dublin_crisis: {
        total_newly_liable: 8797,
        hoarded_by_10plus_owners: 6601,
        hoarding_percentage: 75.1,
        individual_family_percentage: 24.9,
        context: "3 out of 4 new Dublin properties captured by property hoarders"
    },
    
    market_manipulation: {
        house_price_increase: 8.0, // % year-on-year
        consecutive_months_rising: 22,
        manipulation_mechanism: "Systematic property hoarding by investor class",
        political_response: "Government TDs who own properties benefit from this crisis"
    },
    
    td_conflict_context: {
        td_landlords_count: 32,
        td_properties_total: 103,
        td_portfolio_value: 23100000,
        systemic_issue: "TD landlords are part of broader property-hoarding class extracting wealth from housing crisis",
        democratic_deficit: "Representatives profit from crisis they're supposed to solve"
    }
};

// Enhanced hypocrisy calculation including systemic hoarding context
function calculateSystemicHypocrisyScore(td, marketContext = PROPERTY_HOARDING_DATA) {
    let score = td.baseHypocrisyScore || 0;
    
    // Systemic complicity bonus (0-25 points)
    // TDs who own properties while 75% of Dublin goes to mega-landlords
    if (td.properties.landlord_status && td.constituency.includes('Dublin')) {
        score += 25; // Maximum complicity in Dublin housing capture
    } else if (td.properties.landlord_status) {
        score += 15; // High complicity in national housing capture
    }
    
    // Government position during hoarding crisis (0-20 points)
    if (['Fianna Fáil', 'Fine Gael', 'Green Party'].includes(td.party)) {
        score += 20; // In power during 22 months of price rises
    }
    
    // Property count in context of hoarding (0-15 points)
    if (td.properties.property_count >= 10) {
        score += 15; // Part of the 10+ property hoarding class
    } else if (td.properties.property_count >= 3) {
        score += 10; // Multiple property owner during crisis
    } else if (td.properties.property_count >= 1) {
        score += 5; // Any property ownership creates conflict
    }
    
    return Math.min(score, 100);
}

// Updated messaging framework incorporating hoarding data
const ENHANCED_MESSAGING = {
    systemic_context: {
        primary_message: "75% of new Dublin properties captured by mega-landlords while families are shut out",
        td_complicity: "Your TD owns properties while representing you in this rigged system",
        democratic_crisis: "How can property-owning TDs solve a crisis they profit from?"
    },
    
    specific_attacks: {
        dublin_tds: "While 75% of new Dublin properties go to property hoarders, your TD owns [X] properties worth €[Y]",
        government_tds: "22 months of rising prices, 75% Dublin capture, and your government TD owns [X] properties",
        all_landlord_tds: "The system is rigged: mega-landlords capture properties while your representative profits from the crisis"
    },
    
    electoral_pressure: {
        vulnerable_seats: "Your TD won by [X]% while profiting from a housing system that excludes 75% of families",
        campaign_message: "Vote out the landlord TDs who profit from your housing crisis",
        systemic_change: "End the property-hoarding political class"
    }
};

// Critical update for dashboard display
const DASHBOARD_ALERTS = {
    breaking_news: {
        title: "🚨 BREAKING: 75% of New Dublin Properties Captured by Mega-Landlords",
        subtitle: "Latest LPT data exposes systematic housing market rigging",
        impact: "Your landlord TDs are complicit in this systematic extraction",
        action: "Time to hold property-owning representatives accountable"
    },
    
    extraction_context: {
        user_extraction: "You're working [X] days out of 5 for others",
        system_extraction: "75% of new Dublin properties go to property hoarders",
        td_position: "Your TD owns [X] properties in this rigged system",
        conclusion: "The extraction isn't just personal - it's systematic"
    }
};

// Integration with existing TD targeting
function enhanceTargetingWithHoardingData(existingTargets) {
    return existingTargets.map(target => ({
        ...target,
        systemic_context: {
            local_hoarding_rate: target.constituency.includes('Dublin') ? 75.1 : 45.0,
            complicity_level: target.constituency.includes('Dublin') ? 'MAXIMUM' : 'HIGH',
            enhanced_message: `While ${target.constituency.includes('Dublin') ? '75%' : '45%'} of new properties go to mega-landlords, ${target.name} owns ${target.properties} properties`,
            democratic_crisis_score: calculateSystemicHypocrisyScore(target)
        }
    }));
}

console.log('🔥 PROPERTY HOARDING DATA INTEGRATED');
console.log('📊 75% of new Dublin properties captured by mega-landlords');
console.log('🎯 TD targeting enhanced with systemic context');
console.log('⚡ Democratic crisis quantified: representatives profit from rigged system');
