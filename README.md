# 🇮🇪 Irish Democratic Accountability Dashboard

**Complete Political Transparency Platform Exposing TD Property Ownership & Financial Inequality**

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
[![GitHub Pages](https://img.shields.io/badge/Deploy-GitHub%20Pages-brightgreen)](https://pages.github.com/)
[![Deploy to Netlify](https://img.shields.io/badge/Deploy-Netlify-blue)](https://netlify.com/drop)
[![Docker](https://img.shields.io/badge/Deploy-Docker-blue)](https://www.docker.com/)

> **Every TD. Every Property. Every Euro. Real accountability for systematic wealth extraction.**

![Dashboard](https://github.com/c42meitheal-collab/Irish-Democratic-Accountability-Dashboard/blob/main/Irish%20Democratic%20Accountability%20Dashboard.jpg)

---

## 🚨 **LATEST UPDATE: Enhanced TD Finance Comparison**

**✅ NEW FEATURES:**
- **Three-way comparison**: You vs Regular TDs vs Landlord TDs
- **Real 2024 financial data**: €113k salaries + €57k allowances + €250k property income
- **System bias calculation**: Shows exactly how much MORE extracted from workers
- **Comprehensive expense breakdown**: Travel, accommodation, representation allowances

**🎯 EXPOSING THE REALITY:**
- **You keep**: ~42% (after tax + housing)
- **Regular TDs keep**: ~65% (€170k packages)  
- **Landlord TDs keep**: ~78% (€420k total income)
- **System extracts 36% MORE from workers** than landlord TDs

---

## 🚀 **Instant Deployment (Choose Your Method)**

### ⚡ **GitHub Pages (Recommended)**
```bash
# Clone repository
git clone https://github.com/yourusername/irish-democratic-accountability-dashboard.git
cd irish-democratic-accountability-dashboard

# Deploy to GitHub Pages
./scripts/deploy-github.sh
```
**Result**: `https://yourusername.github.io/irish-democratic-accountability-dashboard/`

### 💫 **Netlify Drop**
1. Download project as ZIP
2. Go to [netlify.com/drop](https://netlify.com/drop)
3. Drag ZIP file to upload area
4. Get instant live URL

### 🐳 **Docker (Production Ready)**
```bash
docker run -d -p 80:80 ghcr.io/yourusername/irish-accountability-dashboard:latest
```

### 💻 **Local Development**
```bash
# Simple HTTP server
python -m http.server 8080
# OR
npx serve . -l 8080

# Open http://localhost:8080
```

---

## 🎯 **Core Features**

### 🔥 **Enhanced TD Finance Tracker**
- **Real 2024 financial data** from official Oireachtas sources
- **Three-way comparison**: Workers vs Regular TDs vs Landlord TDs
- **System bias calculation** showing wealth extraction disparity
- **Interactive calculator** with Irish tax bands and housing costs

### 🏠 **Property Ownership Database**
- **36 landlord TDs** with €26M+ combined portfolio
- **Property-by-property breakdown** from Register of Members' Interests
- **Rental income estimates** based on market analysis
- **Electoral vulnerability analysis** for democratic accountability

### 🗳️ **Democratic Accountability Tools**
- **Find Your TDs** with property conflict identification
- **Voting record analysis** linked to personal property interests
- **Electoral vulnerability mapping** for democratic engagement
- **Direct action resources** with tenant rights organisations

### 📊 **Data Transparency**
- **174 TDs tracked** with complete constituency mapping
- **Legal compliance** under Irish transparency laws
- **Source verification** from official Oireachtas registers
- **Regular updates** from latest Register supplements

---

## 📋 **Quick Start Guide**

### 1. **Deploy the Dashboard**
Choose any deployment method above - all files are production-ready.

### 2. **Use the TD Finance Tracker**
- Enter your income and housing costs
- Compare with Regular TDs (€170k packages) and Landlord TDs (€420k total)
- See exactly how the system extracts more from workers

### 3. **Find Your TDs**
- Select your county and constituency  
- Identify which representatives own properties
- Access their voting records on housing issues

### 4. **Take Action**
- Contact TDs about property conflicts
- Register to vote at checktheregister.ie
- Connect with tenant rights organisations

---

## 🗂️ **Project Structure**

```
irish-democratic-accountability-dashboard/
├── 📱 Core Application
│   ├── index.html                    # Main dashboard
│   ├── app.js                        # Application logic
│   ├── complete-td-database.json     # All 174 TDs
│   ├── static-data-manager.js        # Data loading
│   └── manifest.json                 # PWA support
│
├── 📊 Data Sources
│   ├── data/
│   │   ├── property-data.json        # TD property ownership
│   │   ├── voting-records-2024.json  # Housing voting patterns
│   │   ├── housing-stats.json        # Market statistics
│   │   └── *.pdf                     # Official registers (9 PDFs)
│   
├── 🚀 Deployment
│   ├── scripts/
│   │   ├── deploy-github.sh          # GitHub Pages deployment
│   │   └── deploy-docker.sh          # Docker deployment
│   ├── Dockerfile                    # Container configuration
│   └── .github/workflows/            # CI/CD automation
│
└── 📖 Documentation
    ├── README.md                     # This file
    ├── CONTRIBUTING.md               # Contribution guidelines
    ├── SECURITY.md                   # Security policy
    └── CHANGELOG.md                  # Version history
```

---

## 🛡️ **Security & Privacy**

### **Zero Data Collection**
- ❌ No personal data stored
- ❌ No tracking cookies
- ❌ No user surveillance
- ✅ Complete transparency

### **Security Hardened**
- ✅ Static architecture (no server vulnerabilities)
- ✅ Tamper-resistant calculations with checksums
- ✅ XSS protection throughout
- ✅ HTTPS deployment ready

### **Privacy Enhanced**
- ✅ Works offline
- ✅ No external API dependencies
- ✅ Local data processing
- ✅ Source code fully open

---

## 📊 **Data Sources & Legal Basis**

All data from **official public sources** under Irish transparency law:

| **Data Type** | **Source** | **Legal Basis** |
|---------------|------------|----------------|
| TD Information | Oireachtas member lists | Houses of Parliament Act |
| Property Data | Register of Members' Interests | Ethics in Public Office Act 1995 |
| Salary Data | Houses of the Oireachtas | Public salary transparency |
| Voting Records | Oireachtas voting database | Public parliamentary records |
| Housing Stats | Central Statistics Office | CSO StatBank |

**Legal Compliance**: All data extraction and publication complies with Irish transparency laws and GDPR requirements.

---

## 🤝 **Contributing**

We welcome contributions! See [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

### **Priority Areas**
- **Data Updates**: Latest Register supplements and voting records
- **Feature Development**: Enhanced visualizations and analysis tools
- **Regional Expansion**: Additional counties and constituencies
- **Accessibility**: WCAG compliance improvements

### **Quick Contribution**
```bash
# Fork the repository
git clone https://github.com/yourusername/irish-democratic-accountability-dashboard.git
cd irish-democratic-accountability-dashboard

# Create feature branch
git checkout -b feature/your-enhancement

# Make changes and test
python -m http.server 8080

# Submit pull request
git push origin feature/your-enhancement
```

---

## 🔄 **Updates & Maintenance**

### **Automated Updates**
- **Weekly**: Housing statistics from CSO
- **Monthly**: Electoral data updates
- **Quarterly**: Register of Members' Interests supplements
- **Annually**: Complete data refresh

### **Community Maintenance**
- **Issue tracking** via GitHub Issues
- **Security updates** via GitHub Security Advisories  
- **Feature requests** via GitHub Discussions
- **Community contributions** via Pull Requests

---

## ⚖️ **Legal & Ethical Framework**

### **Political Neutrality**
- ✅ Presents factual data from official sources
- ✅ Uses transparent calculations
- ✅ Encourages democratic participation
- ❌ Does not endorse specific candidates
- ❌ Does not make unsubstantiated claims

### **Democratic Purpose**
This tool serves democratic accountability by:
- **Exposing conflicts of interest** in property ownership
- **Enabling informed voting** with factual TD data
- **Supporting tenant rights** with direct action resources
- **Promoting transparency** in political representation

---

## 📞 **Support & Community**

### **Getting Help**
- 📖 **Documentation**: Check our comprehensive guides
- 🐛 **Bug Reports**: Use GitHub Issues with reproduction steps
- 💡 **Feature Requests**: Start a GitHub Discussion
- 🔒 **Security Issues**: Email security@project.ie (private)

### **Community Resources**
- **GitHub Discussions**: Project roadmap and feature planning
- **Issue Templates**: Structured bug reports and feature requests
- **Wiki**: Technical documentation and deployment guides
- **Releases**: Version history and update notifications

---

## 🌟 **Impact & Recognition**

### **Democratic Impact**
- **Transparency Tool**: Used by journalists and activists
- **Research Platform**: Academic housing crisis analysis
- **Accountability Mechanism**: Electoral strategy for civic groups
- **Educational Resource**: Civic engagement and voter information

### **Technical Recognition**
- **Open Source**: MIT license for maximum accessibility
- **Production Ready**: Institutional-grade security and performance
- **International Template**: Adaptable for other democracies
- **Privacy Focused**: Zero surveillance democratic tools

---

## 🚀 **Deploy Your Instance**

Ready to expose systematic wealth extraction in your democracy?

**Choose your deployment:**

```bash
# Public transparency (recommended)
./scripts/deploy-github.sh

# Private analysis
docker run -d -p 80:80 irish-accountability-dashboard

# Development
python -m http.server 8080
```

**Result**: A live platform exposing how political representatives profit from housing crisis while workers are systematically extracted.

---

## 📜 **License**

MIT License - Democratic accountability tools should be freely available.

See [LICENSE](LICENSE) for full details.

---

*Built for the Irish housing crisis. Template for democratic accountability worldwide.*

**🇮🇪 The data exposes the system. Your deployment changes it. 🇮🇪**
