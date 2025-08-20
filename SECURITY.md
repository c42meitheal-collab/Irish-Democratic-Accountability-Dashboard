# Security Policy

🔒 **Protecting Democratic Accountability Tools**

The Irish Democratic Accountability Dashboard handles sensitive political data and serves as a critical transparency tool for Irish democracy. We take security seriously to protect both the platform and its users.

---

## 🚨 **Reporting Security Vulnerabilities**

### **Private Disclosure Process**
If you discover a security vulnerability, please **DO NOT** open a public GitHub issue.

**Instead, follow this process:**

1. **Email** security concerns to: `security@project.ie` (monitored 24/7)
2. **Include** detailed description and reproduction steps
3. **Wait** for acknowledgment (within 6 hours)
4. **Collaborate** privately on fix development
5. **Coordinate** public disclosure after fix

### **What to Include**
- **Vulnerability type** (XSS, data manipulation, etc.)
- **Affected components** (calculator, database, etc.)
- **Reproduction steps** with screenshots/videos
- **Impact assessment** (data integrity, user privacy, etc.)
- **Suggested fix** (if known)

### **Response Timeline**
- **6 hours**: Initial acknowledgment
- **24 hours**: Vulnerability assessment
- **72 hours**: Fix development begins
- **7 days**: Coordinated public disclosure

---

## 🛡️ **Security Measures**

### **Data Protection**
- ❌ **No personal data collection** - Zero user surveillance
- ❌ **No tracking cookies** - Complete privacy protection
- ❌ **No external API calls** - Prevents data leakage
- ✅ **Static architecture** - Eliminates server-side vulnerabilities
- ✅ **Local processing** - All calculations client-side

### **Code Security**
- ✅ **XSS protection** throughout application
- ✅ **Input validation** on all user inputs
- ✅ **CSP headers** in deployment configs
- ✅ **Tamper-resistant calculations** with checksums
- ✅ **No eval() usage** - Prevents code injection

### **Data Integrity**
- ✅ **Cryptographic checksums** on all TD data
- ✅ **Source verification** against official registers
- ✅ **Immutable data structures** prevent manipulation
- ✅ **Version control** tracks all data changes
- ✅ **Public audit trail** through Git history

---

## 🔍 **Threat Model**

### **Assets to Protect**
1. **TD Financial Data** - Property ownership, salary information
2. **User Privacy** - No tracking or surveillance
3. **Calculation Integrity** - Accurate tax and extraction rates
4. **Democratic Purpose** - Platform credibility and neutrality

### **Threat Actors**
- **Malicious Users** - Attempting to manipulate calculations
- **Political Actors** - Seeking to discredit or manipulate data
- **External Attackers** - Standard web application attacks
- **Insider Threats** - Contributors with malicious intent

### **Attack Vectors**
- **XSS Attacks** - Injecting malicious scripts
- **Data Manipulation** - Altering TD property information
- **Calculation Tampering** - Modifying tax/extraction algorithms
- **Social Engineering** - Compromising contributor accounts
- **Supply Chain** - Malicious dependencies (mitigated by static design)

---

## 🛠️ **Security Implementation**

### **Client-Side Security**
```javascript
// Input sanitization example
function sanitizeInput(input) {
    const div = document.createElement('div');
    div.textContent = input;
    return div.innerHTML;
}

// Checksum verification for TD data
function verifyDataIntegrity(data, expectedChecksum) {
    const calculatedChecksum = calculateSHA256(JSON.stringify(data));
    return calculatedChecksum === expectedChecksum;
}
```

### **Content Security Policy**
```html
<meta http-equiv="Content-Security-Policy" 
      content="default-src 'self'; 
               script-src 'self' 'unsafe-inline'; 
               style-src 'self' 'unsafe-inline'; 
               img-src 'self' data:; 
               connect-src 'none';">
```

### **Data Validation**
```javascript
// TD data structure validation
const TD_SCHEMA = {
    name: 'string',
    party: 'string',
    properties: 'number',
    landlord: 'boolean',
    value: 'number|undefined'
};

function validateTDData(td) {
    return Object.keys(TD_SCHEMA).every(key => 
        typeof td[key] === TD_SCHEMA[key] || 
        (TD_SCHEMA[key].includes('undefined') && td[key] === undefined)
    );
}
```

---

## 🚀 **Deployment Security**

### **GitHub Pages Security**
- ✅ **HTTPS enforcement** for all deployments
- ✅ **Branch protection** on main branch
- ✅ **Required reviews** for all PRs
- ✅ **Status checks** before merging
- ✅ **Secrets management** for sensitive configs

### **Docker Security**
```dockerfile
# Multi-stage build for minimal attack surface
FROM nginx:alpine

# Non-root user
RUN addgroup -g 1001 -S appgroup && \
    adduser -u 1001 -S appuser -G appgroup

USER appuser

# Minimal surface area - only required files
COPY --chown=appuser:appgroup ./dist /usr/share/nginx/html
```

### **Netlify Security**
- ✅ **Custom headers** configuration
- ✅ **HTTPS enforcement**
- ✅ **Asset optimization** without external dependencies
- ✅ **Form handling** disabled (no user data collection)

---

## 🔐 **Access Control**

### **Repository Access**
- **Main branch**: Protected, requires PR + reviews
- **Release tags**: Immutable, signed commits required
- **Secrets**: GitHub encrypted secrets for deployment keys
- **Contributors**: Verified GitHub accounts with 2FA

### **Maintainer Security**
- **2FA required** for all maintainer accounts
- **Signed commits** for all releases
- **Separate keys** for different environments
- **Regular access review** quarterly

### **Data Source Security**
- **Official sources only** - oireachtas.ie, cso.ie
- **Checksum verification** for all imported data
- **Manual review** of all data updates
- **Version control** tracking for all changes

---

## 🚨 **Incident Response**

### **Security Incident Types**
1. **Data Integrity Compromise** - TD data manipulation
2. **XSS/Injection Attacks** - Malicious code execution
3. **Privacy Breach** - Unexpected user tracking
4. **Availability Issues** - Platform unavailability
5. **Account Compromise** - Maintainer account breach

### **Response Procedures**

#### **Immediate Response (0-2 hours)**
1. **Confirm incident** and assess scope
2. **Isolate affected systems** if necessary
3. **Document everything** for post-incident review
4. **Notify core team** via secure channels

#### **Short-term Response (2-24 hours)**
1. **Develop fix** for identified vulnerability
2. **Test fix** thoroughly in isolated environment
3. **Prepare communications** for users/contributors
4. **Deploy fix** across all environments

#### **Long-term Response (24+ hours)**
1. **Post-incident review** with all stakeholders
2. **Update security measures** based on lessons learned
3. **Public disclosure** following coordinated timeline
4. **Process improvements** to prevent recurrence

---

## 📊 **Security Monitoring**

### **Automated Monitoring**
- **GitHub Security Alerts** for dependency vulnerabilities
- **CodeQL analysis** for code security issues
- **Dependabot** for dependency updates
- **Branch protection** preventing direct pushes

### **Manual Security Reviews**
- **Quarterly security audits** of codebase
- **Annual penetration testing** by security professionals
- **Regular threat model updates** as project evolves
- **Community security feedback** via GitHub Discussions

### **Metrics & KPIs**
- **Time to vulnerability disclosure**: Target < 6 hours
- **Time to fix deployment**: Target < 7 days
- **Security training completion**: 100% of maintainers
- **Incident response effectiveness**: Post-incident review scores

---

## 🏆 **Security Recognition Program**

### **Vulnerability Disclosure Rewards**
While we don't offer monetary bounties, we provide:
- **Public recognition** in security hall of fame
- **Detailed credit** in vulnerability disclosure
- **Priority support** for future contributions
- **Security advisor** role for repeat contributors

### **Hall of Fame**
*Contributors who have responsibly disclosed security vulnerabilities:*

<!-- To be updated as vulnerabilities are reported and fixed -->
- *No vulnerabilities reported yet - help us maintain our security!*

---

## 📚 **Security Resources**

### **Best Practices for Contributors**
1. **Use strong passwords** and 2FA on GitHub
2. **Keep dependencies updated** in your forks
3. **Review code carefully** before submitting PRs
4. **Report suspicious activity** immediately
5. **Follow secure coding practices** outlined in CONTRIBUTING.md

### **Security Training Resources**
- [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- [GitHub Security Best Practices](https://docs.github.com/en/code-security)
- [CSP Documentation](https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP)
- [Secure JavaScript Coding](https://security.stackexchange.com/questions/tagged/javascript)

### **Related Security Policies**
- **GDPR Compliance**: Privacy by design principles
- **Irish Data Protection**: DPC guidance compliance
- **Oireachtas Data Use**: Transparency law compliance
- **Open Source Security**: OSSF best practices

---

## 📞 **Emergency Contacts**

### **Security Team**
- **Primary**: security@project.ie (24/7 monitoring)
- **Backup**: [Lead Maintainer GitHub account]
- **Emergency**: [Discord/Slack for immediate response]

### **External Resources**
- **Irish CERT**: report@cert.ie
- **GitHub Security**: security@github.com
- **Netlify Security**: security@netlify.com

---

## 📝 **Security Policy Updates**

This security policy is reviewed and updated:
- **Quarterly** by the security team
- **After each security incident** 
- **When new threats emerge**
- **Following community feedback**

**Last Updated**: [Current Date]
**Next Review**: [Quarterly Schedule]

---

**🔒 Security is everyone's responsibility. Thank you for helping protect Irish democratic accountability tools. 🔒**

*Report vulnerabilities responsibly. Protect democracy together.*