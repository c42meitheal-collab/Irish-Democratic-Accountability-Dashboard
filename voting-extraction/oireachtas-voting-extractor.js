/**
 * Oireachtas Voting Records Extractor
 * 
 * Systematically extracts TD voting patterns on housing legislation
 * focusing on landlord TDs and tenant protection votes
 */

class OireachtasVotingExtractor {
    constructor() {
        this.baseURL = 'https://api.oireachtas.ie/v1';
        this.cache = new Map();
        
        // Priority housing votes for extraction
        this.keyHousingVotes = [
            {
                date: '2024-03-15',
                title: 'Residential Tenancies (Amendment) Bill 2024',
                description: 'Rent control caps and tenant eviction protections',
                pro_tenant_position: 'FOR',
                impact_level: 'HIGH'
            },
            {
                date: '2024-04-22', 
                title: 'Vacant Property Tax (Amendment) Bill 2024',
                description: 'Increased penalties for vacant rental properties',
                pro_tenant_position: 'FOR',
                impact_level: 'HIGH'
            },
            {
                date: '2024-06-11',
                title: 'Planning and Development (Housing) Bill 2024',
                description: 'Social housing requirements in developments', 
                pro_tenant_position: 'FOR',
                impact_level: 'MEDIUM'
            },
            {
                date: '2024-09-18',
                title: 'Residential Tenancies (Security of Tenure) Bill 2024',
                description: 'Indefinite tenancies and eviction restrictions',
                pro_tenant_position: 'FOR',
                impact_level: 'HIGH'
            },
            {
                date: '2024-10-29',
                title: 'Property Tax (Rental Income) Amendment 2024',
                description: 'Tax relief reductions for rental property owners',
                pro_tenant_position: 'FOR', 
                impact_level: 'HIGH'
            }
        ];
        
        // Priority landlord TDs for extraction
        this.priorityLandlordTDs = [
            // Vulnerable seats (electoral pressure targets)
            { name: 'Colm Burke', constituency: 'Cork North-Central', properties: 1, electoral_margin: 2.3 },
            { name: 'Sinéad Gibney', constituency: 'Dublin Bay South', properties: 1, electoral_margin: 0.8 },
            { name: 'Noel Grealish', constituency: 'Galway West', properties: 2, electoral_margin: 4.1 },
            
            // High-profile targets
            { name: 'Michael Healy-Rae', constituency: 'Kerry', properties: 27, electoral_margin: 'SAFE' },
            { name: 'Robert Troy', constituency: 'Longford-Westmeath', properties: 8, electoral_margin: 'SAFE' },
            { name: 'Thomas Byrne', constituency: 'Meath East', properties: 1, minister: true },
            { name: 'Seán Canney', constituency: 'Galway East', properties: 6, minister: true }
        ];
    }

    /**
     * Extract voting records for a specific debate/vote
     */
    async extractVoteDetails(date, searchTerm) {
        try {
            const url = `${this.baseURL}/debates?date=${date}&chamber=dail&debate_type=vote&limit=50`;
            
            console.log(`🔍 Searching for votes on ${date}...`);
            
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`API request failed: ${response.status}`);
            }
            
            const data = await response.json();
            
            if (!data.results || data.results.length === 0) {
                console.log(`❌ No votes found for ${date}`);
                return null;
            }
            
            // Find votes containing the search term
            const relevantVotes = data.results.filter(debate => 
                debate.contextTitle?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                debate.contentSummary?.toLowerCase().includes(searchTerm.toLowerCase())
            );
            
            if (relevantVotes.length === 0) {
                console.log(`❌ No relevant votes found for "${searchTerm}" on ${date}`);
                return null;
            }
            
            console.log(`✅ Found ${relevantVotes.length} relevant vote(s)`);
            return relevantVotes;
            
        } catch (error) {
            console.error(`Failed to extract vote for ${date}:`, error);
            return null;
        }
    }

    /**
     * Extract individual TD votes from a specific debate
     */
    async extractTDVotes(debateUri) {
        try {
            const url = `${this.baseURL}/debates/${debateUri}/votes`;
            
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`Failed to get TD votes: ${response.status}`);
            }
            
            const data = await response.json();
            
            const tdVotes = [];
            
            if (data.results && data.results.length > 0) {
                for (const vote of data.results) {
                    if (vote.member) {
                        tdVotes.push({
                            name: vote.member.fullName,
                            party: vote.member.party?.showAs || 'Unknown',
                            constituency: vote.member.constituency?.showAs || 'Unknown',
                            vote: vote.vote?.voteType || 'Unknown', // 'For', 'Against', 'Abstain'
                            debate_uri: debateUri
                        });
                    }
                }
            }
            
            return tdVotes;
            
        } catch (error) {
            console.error(`Failed to extract TD votes for ${debateUri}:`, error);
            return [];
        }
    }

    /**
     * Process a single housing vote and extract landlord TD patterns
     */
    async processHousingVote(voteInfo) {
        console.log(`\n🏠 Processing: ${voteInfo.title}`);
        
        const debates = await this.extractVoteDetails(voteInfo.date, 'housing');
        if (!debates) {
            return null;
        }
        
        const voteResults = {
            date: voteInfo.date,
            title: voteInfo.title,
            description: voteInfo.description,
            pro_tenant_position: voteInfo.pro_tenant_position,
            landlord_td_votes: []
        };
        
        // Extract votes for each relevant debate
        for (const debate of debates) {
            const tdVotes = await this.extractTDVotes(debate.contextUri);
            
            // Filter for landlord TDs and analyze their votes
            for (const tdVote of tdVotes) {
                const landlordTD = this.priorityLandlordTDs.find(ltd => 
                    ltd.name.toLowerCase().includes(tdVote.name.toLowerCase()) ||
                    tdVote.name.toLowerCase().includes(ltd.name.toLowerCase())
                );
                
                if (landlordTD) {
                    const isHypocritical = this.analyzeVoteHypocrisy(tdVote.vote, voteInfo.pro_tenant_position);
                    
                    voteResults.landlord_td_votes.push({
                        td_name: landlordTD.name,
                        party: tdVote.party,
                        constituency: tdVote.constituency,
                        properties: landlordTD.properties,
                        vote_cast: tdVote.vote,
                        is_hypocritical: isHypocritical,
                        hypocrisy_explanation: isHypocritical ? 
                            `Voted ${tdVote.vote} on tenant protections while owning ${landlordTD.properties} rental properties` : null
                    });
                    
                    console.log(`📊 ${landlordTD.name}: ${tdVote.vote} ${isHypocritical ? '🚨 HYPOCRITICAL' : '✅'}`);
                }
            }
        }
        
        return voteResults;
    }

    /**
     * Analyze if a TD's vote represents hypocrisy given their landlord status
     */
    analyzeVoteHypocrisy(voteCast, proTenantPosition) {
        // If the pro-tenant position is 'FOR' and TD voted 'Against', that's hypocritical for a landlord
        if (proTenantPosition === 'FOR' && voteCast === 'Against') {
            return true;
        }
        
        // If the pro-tenant position is 'AGAINST' and TD voted 'For', that could also be hypocritical
        if (proTenantPosition === 'AGAINST' && voteCast === 'For') {
            return true;
        }
        
        return false;
    }

    /**
     * Extract all priority housing votes and compile hypocrisy database
     */
    async extractAllHousingVotes() {
        console.log('🚀 Starting systematic voting records extraction...\n');
        
        const compiledVotingData = {
            metadata: {
                extracted_at: new Date().toISOString(),
                source: 'Oireachtas API + Manual Analysis',
                vote_count: this.keyHousingVotes.length,
                landlord_td_count: this.priorityLandlordTDs.length
            },
            votes: [],
            td_summaries: {}
        };
        
        // Process each key housing vote
        for (const voteInfo of this.keyHousingVotes) {
            const voteResult = await this.processHousingVote(voteInfo);
            
            if (voteResult && voteResult.landlord_td_votes.length > 0) {
                compiledVotingData.votes.push(voteResult);
                
                // Update TD summaries
                for (const tdVote of voteResult.landlord_td_votes) {
                    if (!compiledVotingData.td_summaries[tdVote.td_name]) {
                        compiledVotingData.td_summaries[tdVote.td_name] = {
                            name: tdVote.td_name,
                            party: tdVote.party,
                            constituency: tdVote.constituency,
                            properties: tdVote.properties,
                            total_votes: 0,
                            hypocritical_votes: 0,
                            pro_tenant_votes: 0,
                            anti_tenant_votes: 0,
                            hypocrisy_score: 0
                        };
                    }
                    
                    const summary = compiledVotingData.td_summaries[tdVote.td_name];
                    summary.total_votes++;
                    
                    if (tdVote.is_hypocritical) {
                        summary.hypocritical_votes++;
                    }
                    
                    if (tdVote.vote_cast === 'For' && voteInfo.pro_tenant_position === 'FOR') {
                        summary.pro_tenant_votes++;
                    } else if (tdVote.vote_cast === 'Against' && voteInfo.pro_tenant_position === 'FOR') {
                        summary.anti_tenant_votes++;
                    }
                }
            }
            
            // Rate limiting - be respectful to Oireachtas API
            await new Promise(resolve => setTimeout(resolve, 1000));
        }
        
        // Calculate hypocrisy scores
        for (const tdName in compiledVotingData.td_summaries) {
            const summary = compiledVotingData.td_summaries[tdName];
            summary.hypocrisy_score = this.calculateHypocrisyScore(summary);
        }
        
        return compiledVotingData;
    }

    /**
     * Calculate comprehensive hypocrisy score for a landlord TD
     */
    calculateHypocrisyScore(tdSummary) {
        let score = 0;
        
        // Base score from property ownership
        score += Math.min(tdSummary.properties * 5, 50); // Max 50 points
        
        // Penalty for anti-tenant votes
        score += tdSummary.anti_tenant_votes * 15; // 15 points per anti-tenant vote
        
        // Penalty for hypocritical votes
        score += tdSummary.hypocritical_votes * 20; // 20 points per hypocritical vote
        
        // Bonus for electoral vulnerability (if applicable)
        const tdInfo = this.priorityLandlordTDs.find(td => td.name === tdSummary.name);
        if (tdInfo && typeof tdInfo.electoral_margin === 'number' && tdInfo.electoral_margin < 5) {
            score += 10; // Vulnerable TDs get extra pressure points
        }
        
        // Government position bonus
        if (tdInfo && tdInfo.minister) {
            score += 15; // Ministers held to higher standard
        }
        
        return Math.min(score, 100); // Cap at 100
    }

    /**
     * Generate media-ready hypocrisy report
     */
    generateHypocrisyReport(votingData) {
        const report = {
            headline: "LANDLORD TDs VOTING AGAINST TENANTS EXPOSED",
            summary: `${Object.keys(votingData.td_summaries).length} landlord TDs analyzed across ${votingData.votes.length} key housing votes`,
            top_hypocrites: [],
            vulnerable_targets: [],
            government_conflicts: []
        };
        
        // Sort TDs by hypocrisy score
        const sortedTDs = Object.values(votingData.td_summaries)
            .sort((a, b) => b.hypocrisy_score - a.hypocrisy_score);
        
        report.top_hypocrites = sortedTDs.slice(0, 5).map(td => ({
            name: td.name,
            party: td.party,
            properties: td.properties,
            anti_tenant_votes: td.anti_tenant_votes,
            hypocrisy_score: td.hypocrisy_score,
            attack_line: `${td.name} owns ${td.properties} properties but voted AGAINST tenant protections ${td.anti_tenant_votes} times`
        }));
        
        // Identify vulnerable targets for electoral pressure
        report.vulnerable_targets = sortedTDs.filter(td => {
            const tdInfo = this.priorityLandlordTDs.find(info => info.name === td.name);
            return tdInfo && typeof tdInfo.electoral_margin === 'number' && tdInfo.electoral_margin < 5;
        });
        
        // Identify government conflicts of interest
        report.government_conflicts = sortedTDs.filter(td => {
            const tdInfo = this.priorityLandlordTDs.find(info => info.name === td.name);
            return tdInfo && tdInfo.minister;
        });
        
        return report;
    }
}

// Usage example for immediate deployment
async function runVotingExtraction() {
    const extractor = new OireachtasVotingExtractor();
    
    console.log('🇮🇪 Irish Democratic Accountability - Voting Records Extraction');
    console.log('========================================================\n');
    
    try {
        // Extract all voting data
        const votingData = await extractor.extractAllHousingVotes();
        
        // Generate report
        const hypocrisyReport = extractor.generateHypocrisyReport(votingData);
        
        console.log('\n📊 EXTRACTION COMPLETE\n');
        console.log(hypocrisyReport.headline);
        console.log('-'.repeat(50));
        console.log(hypocrisyReport.summary);
        
        console.log('\n🚨 TOP HYPOCRITES:');
        hypocrisyReport.top_hypocrites.forEach((td, index) => {
            console.log(`${index + 1}. ${td.attack_line} (Score: ${td.hypocrisy_score})`);
        });
        
        console.log('\n🎯 VULNERABLE ELECTORAL TARGETS:');
        hypocrisyReport.vulnerable_targets.forEach(td => {
            console.log(`- ${td.name} (${td.party}) - ${td.hypocrisy_score} hypocrisy score`);
        });
        
        console.log('\n🏛️ GOVERNMENT CONFLICTS:');
        hypocrisyReport.government_conflicts.forEach(td => {
            console.log(`- ${td.name} - Minister with ${td.properties} properties`);
        });
        
        // Return data for dashboard integration
        return {
            votingData,
            hypocrisyReport
        };
        
    } catch (error) {
        console.error('❌ Extraction failed:', error);
        throw error;
    }
}

// Export for use in dashboard
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { OireachtasVotingExtractor, runVotingExtraction };
}

// Browser compatibility
if (typeof window !== 'undefined') {
    window.OireachtasVotingExtractor = OireachtasVotingExtractor;
    window.runVotingExtraction = runVotingExtraction;
}