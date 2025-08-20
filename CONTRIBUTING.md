# Contributing to Irish Democratic Accountability Dashboard

🇮🇪 **Thank you for your interest in improving democratic accountability in Ireland!**

This project serves the public interest by exposing systematic wealth extraction and property conflicts among political representatives. All contributions help strengthen Irish democracy.

---

## 🎯 **How to Contribute**

### **Priority Areas**
1. **Data Updates** - Most needed and impactful
2. **Feature Development** - Enhanced analysis tools
3. **Documentation** - User guides and technical docs
4. **Testing** - Cross-platform compatibility
5. **Accessibility** - WCAG compliance improvements

---

## 📊 **Data Contributions** *(Highest Priority)*

### **Register Updates**
When new Register of Members' Interests supplements are published:

```bash
# 1. Download new Register PDF from oireachtas.ie
wget https://data.oireachtas.ie/ie/oireachtas/members/[NEW_REGISTER].pdf

# 2. Place in data/ directory with standard naming
mv [NEW_REGISTER].pdf data/2025-XX-XX_supplement-register-members-interests_en.pdf

# 3. Extract new property declarations
# Review PDF and update data/property-data.json

# 4. Submit pull request with:
git add data/
git commit -m "feat: Add [DATE] Register supplement with [X] new property declarations"
```

### **Voting Record Updates**
```bash
# 1. Query Oireachtas API for new housing-related votes
# 2. Update data/voting-records-2024.json
# 3. Link votes to property ownership where relevant

git commit -m "feat: Add voting records for [BILL_NAME] with property conflict analysis"
```

### **Electoral Data Updates**
```bash
# Update constituency changes, boundary reviews, or election results
# File: complete-td-database.json

git commit -m "feat: Update TD database post-[EVENT] with [X] changes"
```

---

## 💻 **Code Contributions**

### **Development Setup**
```bash
# Fork and clone
git clone https://github.com/yourusername/irish-democratic-accountability-dashboard.git
cd irish-democratic-accountability-dashboard

# Create feature branch
git checkout -b feature/your-feature-name

# Test locally
python -m http.server 8080
# Open http://localhost:8080

# Make changes, test thoroughly
# Submit PR when ready
```

### **Code Standards**
- **JavaScript**: ES6+, no external dependencies
- **HTML**: Semantic markup, WCAG accessible
- **CSS**: Mobile-first responsive design
- **Data**: JSON format, validated structure
- **Comments**: Clear explanations for complex logic

### **Feature Ideas**
- **Enhanced Visualizations**: Charts, graphs, maps
- **Advanced Filtering**: Party, region, property value ranges
- **Export Functions**: CSV download, shareable links
- **Mobile Improvements**: Touch-friendly interactions
- **Performance**: Faster loading, smaller payloads

---

## 🐛 **Bug Reports**

### **Before Reporting**
1. Check existing GitHub Issues
2. Test in multiple browsers
3. Disable browser extensions
4. Clear cache and reload

### **Report Template**
```markdown
## Bug Description
Clear, concise description of the issue

## Steps to Reproduce
1. Go to...
2. Click on...
3. Enter...
4. See error

## Expected Behavior
What should have happened

## Actual Behavior  
What actually happened

## Environment
- Browser: [Chrome 118, Firefox 119, etc.]
- Device: [Desktop, Mobile, Tablet]
- Operating System: [Windows 11, macOS 14, Ubuntu 22.04]
- Screen Size: [1920x1080, mobile, etc.]

## Screenshots
If applicable, add screenshots to help explain

## Additional Context
Any other context about the problem
```

---

## 💡 **Feature Requests**

### **Request Template**
```markdown
## Feature Summary
Brief description of the proposed feature

## Problem Statement
What problem does this solve? Who benefits?

## Proposed Solution
Detailed description of the feature

## Alternatives Considered
Other approaches you've thought about

## Implementation Notes
Technical considerations, if any

## Democratic Impact
How does this enhance accountability/transparency?

## Priority Level
- Critical (security/accessibility)
- High (major user benefit)
- Medium (nice to have)
- Low (future consideration)
```

---

## 📖 **Documentation Contributions**

### **User Documentation**
- **Setup guides** for different deployment methods
- **User tutorials** for dashboard features  
- **FAQ** addressing common questions
- **Troubleshooting guides** for technical issues

### **Technical Documentation**
- **API documentation** for data structures
- **Architecture overview** for developers
- **Security analysis** for transparency
- **Performance optimization** guides

### **Legal/Ethical Documentation**
- **Data sources verification** and legal basis
- **Privacy policy** updates
- **Accessibility compliance** documentation
- **Political neutrality** guidelines

---

## 🔒 **Security Contributions**

### **Security Review Process**
1. **Private disclosure** first - email c42meitheal@gmail.com
2. **Vulnerability assessment** by maintainers
3. **Fix development** in private
4. **Coordinated disclosure** after fix
5. **Public acknowledgment** of contributor

### **Security Focus Areas**
- **Data integrity** - Preventing tampering with calculations
- **XSS prevention** - Securing dynamic content
- **Privacy protection** - Eliminating tracking possibilities
- **Input validation** - Securing user inputs

---

## 🎨 **Design Contributions**

### **UI/UX Improvements**
- **Mobile responsiveness** enhancements
- **Dark mode** support
- **Accessibility** improvements (WCAG compliance)
- **User flow** optimization

### **Visual Design**
- **Data visualization** improvements
- **Color scheme** accessibility
- **Typography** readability
- **Icon** design and implementation

---

## 🌍 **Translation & Localization**

### **Irish Language (Gaeilge)**
```bash
# Add Irish translations
# File: i18n/ga.json

{
  "title": "Clár Freagrúlachta Daonlathach na hÉireann",
  "subtitle": "Teachtaí Dála agus Maoin Phríobháideach",
  ...
}
```

### **Regional Adaptations**
- **Northern Ireland** constituency data
- **Local government** accountability tools
- **European Parliament** representation

---

## 🧪 **Testing Contributions**

### **Manual Testing**
- **Cross-browser compatibility** (Chrome, Firefox, Safari, Edge)
- **Mobile device testing** (iOS, Android)
- **Accessibility testing** (screen readers, keyboard navigation)
- **Performance testing** (loading times, responsiveness)

### **Automated Testing**
```bash
# Add test cases for new features
# File: tests/feature-name.test.js

describe('TD Finance Calculator', () => {
  test('calculates correct keep rates', () => {
    // Test implementation
  });
});
```

---

## 📋 **Pull Request Process**

### **Before Submitting**
1. **Test thoroughly** on multiple browsers/devices
2. **Update documentation** if needed
3. **Add tests** for new features
4. **Follow code standards** 
5. **Rebase** on latest main branch

### **PR Template**
```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix (non-breaking change fixing an issue)
- [ ] New feature (non-breaking change adding functionality)
- [ ] Breaking change (fix or feature causing existing functionality to change)
- [ ] Documentation update

## Testing
- [ ] Manual testing completed
- [ ] Cross-browser testing
- [ ] Mobile testing
- [ ] Accessibility testing

## Screenshots/Videos
If applicable, add screenshots showing the changes

## Checklist
- [ ] Code follows project style guidelines
- [ ] Self-review completed
- [ ] Documentation updated
- [ ] No breaking changes introduced
```

### **Review Process**
1. **Automated checks** (if applicable)
2. **Maintainer review** within 48 hours
3. **Feedback incorporation** 
4. **Final approval** and merge
5. **Recognition** in contributors list

---

## 👥 **Community Guidelines**

### **Code of Conduct**
- **Respectful communication** in all interactions
- **Constructive feedback** in reviews and discussions
- **Inclusive language** welcoming all contributors
- **Focus on the mission** - democratic accountability

### **Political Neutrality**
- **Factual accuracy** over political opinion
- **Transparent methods** in all analysis
- **Source verification** for all claims
- **Non-partisan approach** to democratic accountability

### **Collaboration Standards**
- **Clear communication** in issues and PRs
- **Timely responses** to feedback
- **Credit attribution** for contributions
- **Knowledge sharing** to help other contributors

---

## 🏆 **Recognition**

### **Contributor Types**
- **🔥 Core Contributors** - Major ongoing contributions
- **📊 Data Contributors** - Register updates and analysis
- **🛠️ Technical Contributors** - Code and infrastructure
- **📖 Documentation Contributors** - Guides and explanations
- **🔒 Security Contributors** - Vulnerability disclosure and fixes
- **🌍 Community Contributors** - Support and outreach

### **Recognition Methods**
- **Contributors section** in README
- **Changelog attribution** for all contributions
- **Release notes** highlighting major contributors
- **Annual recognition** for sustained contributions

---

## 📞 **Getting Help**

### **Where to Ask**
- **GitHub Discussions** - General questions and ideas
- **GitHub Issues** - Bug reports and feature requests
- **Discord/Slack** - Real-time collaboration (if established)
- **Email** - Private/security concerns

### **Response Times**
- **Bug reports** - Within 24 hours
- **Feature requests** - Within 48 hours
- **Pull requests** - Within 48 hours
- **Security issues** - Within 6 hours

---

## 🎯 **Project Roadmap**

### **Short Term (Next 3 Months)**
- Complete county coverage for all 32 counties
- Enhanced mobile responsiveness
- Additional data visualization features
- WCAG 2.1 AA compliance

### **Medium Term (3-6 Months)**
- Local government accountability features
- Historical trend analysis
- API for external integrations
- Multi-language support

### **Long Term (6+ Months)**
- International adaptations
- Advanced analytics and predictions
- Integration with voting platforms
- Automated data pipeline

---

**🇮🇪 Together, we build the transparency tools Irish democracy needs. 🇮🇪**

*Every contribution helps expose systematic wealth extraction and strengthens democratic accountability.*
