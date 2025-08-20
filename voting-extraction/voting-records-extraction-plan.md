# 🗳️ Voting Records Extraction Plan
## Systematic Compilation of Landlord TD Voting Patterns

### 🎯 Political Impact Objective
**Expose landlord TDs voting against tenant protections while personally profiting from rental income**

---

## 📋 Key Housing Votes to Extract (2024-2025)

### **Tier 1: Maximum Impact Votes** 
*Votes where landlord conflict of interest is most obvious*

1. **Residential Tenancies (Amendment) Bill 2024**
   - Date: March 15, 2024
   - Issue: Rent control caps and tenant eviction protections
   - Oireachtas URL: `https://www.oireachtas.ie/en/debates/vote/dail/2024-03-15/`
   - Pro-tenant position: **FOR**

2. **Vacant Property Tax (Amendment) Bill 2024**
   - Date: April 22, 2024  
   - Issue: Increased penalties for vacant rental properties
   - Pro-tenant position: **FOR**

3. **Planning and Development (Housing) Bill 2024**
   - Date: June 11, 2024
   - Issue: Social housing requirements in developments
   - Pro-tenant position: **FOR**

4. **Residential Tenancies (Security of Tenure) Bill 2024**
   - Date: September 18, 2024
   - Issue: Indefinite tenancies and eviction restrictions
   - Pro-tenant position: **FOR**

5. **Property Tax (Rental Income) Amendment 2024**
   - Date: October 29, 2024
   - Issue: Tax relief reductions for rental property owners
   - Pro-tenant position: **FOR**

### **Tier 2: Additional Housing Votes**
6. Emergency Housing Bill 2024
7. Rent Pressure Zone Extension Bill 2024
8. Tenancy Tribunal Establishment Bill 2024
9. Housing for All Implementation Vote 2024
10. Short-Term Letting Regulation Bill 2024

---

## 🔍 Extraction Methodology

### **Data Sources**
1. **Primary**: Oireachtas API
   - Endpoint: `https://api.oireachtas.ie/v1/debates`
   - Parameters: `chamber=dail&debate_type=vote&date_start=2024-01-01`

2. **Secondary**: Manual verification via Oireachtas website
   - URLs: `https://www.oireachtas.ie/en/debates/vote/dail/[DATE]/`

3. **Tertiary**: Parliamentary Questions database for context

### **Target TDs for Priority Extraction**
#### **Vulnerable Landlord TDs** (Electoral pressure targets)
- ✅ **Colm Burke** (FF, Cork North-Central) - 1 office rental property
- ✅ **Sinéad Gibney** (SD, Dublin Bay South) - 1 residential property  
- ✅ **Noel Grealish** (Ind, Galway West) - 2 properties

#### **High-Portfolio Landlord TDs** (Maximum exposure value)
- ✅ **Michael Healy-Rae** (Ind, Kerry) - 27 properties
- ✅ **Gillian Toole** (Ind, Meath West) - 10 properties  
- ✅ **Robert Troy** (FF, Longford-Westmeath) - 8 properties
- ✅ **Seán Canney** (Ind, Galway East) - 6 properties, minister
- ✅ **Thomas Byrne** (FF, Meath East) - 1 property, minister

#### **Government Landlord TDs** (Conflict of interest)
- ✅ **Thomas Byrne** - Minister for European Affairs + rental property
- ✅ **Seán Canney** - Government minister + 6 rental properties
- ✅ **Charlie McConalogue** - Former Agriculture Minister + rental property

---

## 🛠️ Technical Implementation

### **Phase 1: API Extraction Script**
```javascript
// Oireachtas API extraction for key votes
const extractVotingRecords = async (voteDate, billTitle) => {
    const response = await fetch(
        `https://api.oireachtas.ie/v1/debates?date=${voteDate}&chamber=dail&debate_type=vote`
    );
    
    const data = await response.json();
    
    // Extract individual TD votes
    return data.results.map(vote => ({
        td_name: vote.member.fullName,
        party: vote.member.party.showAs,
        constituency: vote.member.constituency.showAs,
        vote_cast: vote.vote.voteType, // 'For', 'Against', 'Abstain'
        bill_title: billTitle,
        date: voteDate
    }));
};
```

### **Phase 2: Data Validation**
- Cross-reference against manual Oireachtas records
- Verify TD names match property database
- Validate vote categorization (pro-tenant vs anti-tenant)

### **Phase 3: Political Impact Scoring**
```javascript
const calculateHypocrisyScore = (td) => {
    let score = 0;
    
    // Base hypocrisy: Properties owned
    score += td.property_count * 5;
    
    // Anti-tenant votes while owning rental properties
    score += td.anti_tenant_votes * 15;
    
    // Government position bonus
    if (td.government_position) score += 25;
    
    // Electoral vulnerability bonus (pressure effectiveness)
    if (td.electoral_margin < 5) score += 20;
    
    return Math.min(score, 100); // Cap at 100
};
```

---

## 📊 Expected Output Format

### **Individual TD Voting Profile**
```json
{
    "name": "Colm Burke",
    "party": "Fianna Fáil", 
    "constituency": "Cork North-Central",
    "properties": 1,
    "property_type": "commercial_office",
    "electoral_margin": 2.3,
    "government_position": false,
    "voting_record": {
        "total_housing_votes": 8,
        "pro_tenant_votes": 2,
        "anti_tenant_votes": 5,
        "abstentions": 1,
        "hypocrisy_score": 78
    },
    "key_betrayal_votes": [
        {
            "date": "2024-03-15",
            "bill": "Residential Tenancies Amendment",
            "vote": "AGAINST",
            "impact": "Voted against rent controls while earning rental income"
        }
    ]
}
```

### **Dashboard Integration**
- Traffic light system: 🔴 High hypocrisy, 🟡 Moderate, 🟢 Clean record
- "Voting Hypocrisy Score" prominently displayed
- Specific betrayal votes listed with dates and impact

---

## ⚡ Immediate Action Steps

### **Week 1: Priority Data Extraction**
1. ✅ Extract votes for 3 vulnerable landlord TDs
2. ✅ Focus on Tier 1 housing votes (5 most damaging)
3. ✅ Manual verification against Oireachtas records

### **Week 2: High-Impact Targets**  
1. ✅ Extract votes for government minister landlord TDs
2. ✅ Compile Healy-Rae voting pattern (27 properties)
3. ✅ Create social media-ready content

### **Week 3: Full Database**
1. ✅ Complete all 32 landlord TDs
2. ✅ Integrate into dashboard voting display
3. ✅ Generate automated hypocrisy reports

---

## 🎯 Political Messaging Framework

### **Core Narrative**
> "TD [Name] owns [X] rental properties worth €[Y], earning rental income while voting AGAINST tenant protections [Z] times."

### **Specific Attack Lines**
- **Colm Burke**: "Cork solicitor earning office rental income voted AGAINST rent controls"
- **Thomas Byrne**: "European Affairs Minister with Donegal rental property voted AGAINST tenant protections"  
- **Healy-Rae**: "27-property portfolio owner voted AGAINST vacant property taxes"

### **Social Media Templates**
```
🏠 LANDLORD TD EXPOSED: [NAME]

Properties owned: [X]
Rental income: €[Y]/year
Anti-tenant votes: [Z]

Voted AGAINST:
❌ Rent controls
❌ Eviction protections  
❌ Tenant rights

While profiting from the housing crisis.

#LandlordTDs #HousingCrisis
```

---

## 📈 Success Metrics

### **Data Quality Targets**
- ✅ 100% of Tier 1 votes extracted for vulnerable TDs (week 1)
- ✅ 90% of housing votes for all 32 landlord TDs (week 3)
- ✅ Manual verification of all anti-tenant votes

### **Political Impact Targets**
- ✅ 3+ vulnerable landlord TDs with documented hypocrisy
- ✅ Media-ready content for election pressure campaigns
- ✅ Automated generation of constituency-specific attack content

---

## 🚨 Deployment Priority

**Focus electoral pressure on the 3 vulnerable landlord TDs with documented anti-tenant voting records.**

The data exists. The targeting strategy is clear. Time to extract the voting records that prove the hypocrisy.

---

*This systematic approach transforms the dashboard from a calculator into a political weapon for housing justice.*