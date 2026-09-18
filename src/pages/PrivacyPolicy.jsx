import { useEffect } from 'react';
import { Link } from 'react-router-dom';

const PrivacyPolicy = () => {
  useEffect(() => {
    document.title = 'Privacy Policy | Jitesh Petrochemicals';
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute(
        'content',
        'Read the Privacy Policy of Jitesh Petrochemicals — learn how we collect, use, and protect your personal information in compliance with Indian data protection laws (IT Act & DPDP Act, 2023).'
      );
    }
  }, []);

  useEffect(() => {
    const revealElements = document.querySelectorAll('.reveal');
    const revealObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add('active');
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.15 }
    );
    revealElements.forEach((el) => revealObserver.observe(el));
    return () => revealObserver.disconnect();
  }, []);

  return (
    <div className="min-h-screen">

      {/* ── Hero Banner ── */}
      <div className="relative overflow-hidden bg-brand-panel border-b border-brand-border">
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              'linear-gradient(var(--color-brand-border) 1px, transparent 1px), linear-gradient(90deg, var(--color-brand-border) 1px, transparent 1px)',
            backgroundSize: '40px 40px',
          }}
        />
        <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full bg-primary/5 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -right-24 w-96 h-96 rounded-full bg-primary/5 blur-3xl pointer-events-none" />

        <div className="container relative z-10 py-16 md:py-24 text-center">
          <span className="inline-block text-primary font-heading font-semibold text-xs tracking-[0.25em] uppercase mb-4">
            Legal &amp; Compliance
          </span>
          <h1 className="text-[clamp(2rem,5vw,3.5rem)] font-heading font-extrabold uppercase tracking-wide mb-4">
            Privacy <span className="text-primary">Policy</span>
          </h1>
          <div className="w-[35%] max-w-[180px] h-[2px] bg-gradient-to-r from-transparent via-primary to-transparent mx-auto mb-5" />
          <p className="text-brand-muted/70 text-sm font-heading tracking-wider">
            Last Updated: {new Date().toLocaleDateString('en-IN', { year: 'numeric', month: 'long' })} &nbsp;|&nbsp; As per Indian Data Protection Laws (IT Act &amp; DPDP Act)
          </p>
        </div>
      </div>

      {/* ── Body ── */}
      <section className="section-padding">
        <div className="container">
          <div className="mx-auto">

            {/* Intro */}
            <div className="reveal mb-10 text-brand-muted leading-relaxed text-[0.97rem] md:text-base">
              <p>
                Welcome to <strong className="text-brand-text">Jitesh Petrochemicals</strong> (accessible via{' '}
                <a
                  href="https://www.jiteshpetrochemicals.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:text-primary-light underline underline-offset-2 transition-colors"
                >
                  www.jiteshpetrochemicals.com
                </a>
                ). We value your privacy and are committed to protecting your personal data. This Privacy Policy
                outlines how we collect, use, store, and disclose your information when you visit our website,
                in strict compliance with the <strong className="text-brand-text">Indian Information Technology Act, 2000 (IT Act)</strong>,
                the <strong className="text-brand-text">IT (SPDI) Rules, 2011</strong>, and
                the <strong className="text-brand-text">Digital Personal Data Protection Act, 2023 (DPDP Act)</strong>.
              </p>
            </div>

            {/* Divider */}
            <div className="reveal border-t border-brand-border mb-10" />

            {/* Sections */}
            <div className="space-y-10">

              {/* 1 */}
              <div className="reveal">
                <h2 className="text-[1rem] md:text-[1.1rem] font-heading font-bold text-brand-text uppercase tracking-wide mb-3">
                  1. Information We Collect
                </h2>
                <p className="text-brand-muted leading-relaxed text-[0.95rem] md:text-base mb-2">
                  We only collect personal data that is necessary for providing and improving our services. This includes:
                </p>
                <ul className="list-disc list-inside space-y-1 text-brand-muted text-[0.95rem] md:text-base pl-2">
                  <li><span className="text-brand-text font-medium">Personal Identifiers:</span> Name</li>
                  <li><span className="text-brand-text font-medium">Contact Information:</span> Email Address, Phone Number</li>
                  <li><span className="text-brand-text font-medium">Technical Data:</span> IP address, browser type, cookies, and usage data automatically collected during your visit.</li>
                </ul>
              </div>

              {/* 2 */}
              <div className="reveal">
                <h2 className="text-[1rem] md:text-[1.1rem] font-heading font-bold text-brand-text uppercase tracking-wide mb-3">
                  2. Legal Basis for Processing
                </h2>
                <p className="text-brand-muted leading-relaxed text-[0.95rem] md:text-base">
                  Under Indian law (specifically the DPDP Act, 2023), we process your personal data based on your
                  explicit, specific, unconditional, and unambiguous <strong className="text-brand-text">Consent</strong>. By providing your details or
                  browsing our website, you signify your agreement to the terms of this policy. You have the right
                  to withdraw your consent at any time.
                </p>
              </div>

              {/* 3 */}
              <div className="reveal">
                <h2 className="text-[1rem] md:text-[1.1rem] font-heading font-bold text-brand-text uppercase tracking-wide mb-3">
                  3. How We Use Your Information
                </h2>
                <p className="text-brand-muted leading-relaxed text-[0.95rem] md:text-base mb-2">
                  We use the collected information for the following specific purposes:
                </p>
                <ul className="list-disc list-inside space-y-1 text-brand-muted text-[0.95rem] md:text-base pl-2">
                  <li>To respond to your inquiries, quotes, or support requests.</li>
                  <li>To communicate updates, newsletters, or business materials (where permitted).</li>
                  <li>To maintain, optimize, and secure our website infrastructure.</li>
                  <li>To comply with statutory legal mandates or government orders issued under Indian law.</li>
                </ul>
              </div>

              {/* 4 */}
              <div className="reveal">
                <h2 className="text-[1rem] md:text-[1.1rem] font-heading font-bold text-brand-text uppercase tracking-wide mb-3">
                  4. Data Retention
                </h2>
                <p className="text-brand-muted leading-relaxed text-[0.95rem] md:text-base">
                  We will retain your personal information only for as long as is necessary for the purposes set out
                  in this Privacy Policy, or as required by prevailing statutory laws in India. Once the purpose is
                  fulfilled or consent is withdrawn, your data will be securely deleted or anonymized.
                </p>
              </div>

              {/* 5 */}
              <div className="reveal">
                <h2 className="text-[1rem] md:text-[1.1rem] font-heading font-bold text-brand-text uppercase tracking-wide mb-3">
                  5. Data Disclosure &amp; Third-Party Sharing
                </h2>
                <p className="text-brand-muted leading-relaxed text-[0.95rem] md:text-base mb-2">
                  We do not sell, trade, or rent your personal information to third parties. We may share information
                  only under the following conditions:
                </p>
                <ul className="list-disc list-inside space-y-1 text-brand-muted text-[0.95rem] md:text-base pl-2">
                  <li>
                    <span className="text-brand-text font-medium">Service Providers:</span> Trusted third-party vendors
                    who assist us in operating our website or conducting business, subject to strict confidentiality agreements.
                  </li>
                  <li>
                    <span className="text-brand-text font-medium">Legal Obligations:</span> When required by law,
                    subpoena, or government enforcement agencies under the IT Act, 2000 or court directives.
                  </li>
                </ul>
              </div>

              {/* 6 */}
              <div className="reveal">
                <h2 className="text-[1rem] md:text-[1.1rem] font-heading font-bold text-brand-text uppercase tracking-wide mb-3">
                  6. Reasonable Security Practices
                </h2>
                <p className="text-brand-muted leading-relaxed text-[0.95rem] md:text-base">
                  In accordance with Rule 8 of the IT SPDI Rules, 2011, we have implemented appropriate technical,
                  operational, and physical security measures to safeguard your personal data against unauthorized
                  access, alteration, disclosure, or destruction. However, please note that no method of transmission
                  over the Internet is 100% secure.
                </p>
              </div>

              {/* 7 */}
              <div className="reveal">
                <h2 className="text-[1rem] md:text-[1.1rem] font-heading font-bold text-brand-text uppercase tracking-wide mb-3">
                  7. Your Rights as a Data Principal
                </h2>
                <p className="text-brand-muted leading-relaxed text-[0.95rem] md:text-base mb-2">
                  Under the DPDP Act, 2023, you hold specific statutory rights regarding your personal data:
                </p>
                <ul className="list-disc list-inside space-y-1 text-brand-muted text-[0.95rem] md:text-base pl-2">
                  <li><span className="text-brand-text font-medium">Right to Access &amp; Review:</span> Request a summary of the personal data we hold about you.</li>
                  <li><span className="text-brand-text font-medium">Right to Correction &amp; Erasure:</span> Request updates to inaccurate data or deletion of your data when no longer needed.</li>
                  <li><span className="text-brand-text font-medium">Right to Withdraw Consent:</span> Revoke your consent for data processing easily at any time.</li>
                  <li><span className="text-brand-text font-medium">Right to Grievance Redressal:</span> Lodge a complaint with our Grievance Officer regarding any unresolved issues.</li>
                </ul>
              </div>

              {/* 8 */}
              <div className="reveal">
                <h2 className="text-[1rem] md:text-[1.1rem] font-heading font-bold text-brand-text uppercase tracking-wide mb-3">
                  8. Children&apos;s Privacy
                </h2>
                <p className="text-brand-muted leading-relaxed text-[0.95rem] md:text-base">
                  Our services are not directed to individuals under the age of 18. We do not knowingly collect
                  personal data from minors without verifiable parental or guardian consent, as mandated by Indian
                  data protection frameworks.
                </p>
              </div>

              {/* 9 */}
              <div className="reveal">
                <h2 className="text-[1rem] md:text-[1.1rem] font-heading font-bold text-brand-text uppercase tracking-wide mb-3">
                  9. Grievance Officer
                </h2>
                <p className="text-brand-muted leading-relaxed text-[0.95rem] md:text-base mb-4">
                  In accordance with the Information Technology Act, 2000 and the DPDP Act, 2023, we have designated
                  a Grievance Officer to address any concerns, discrepancies, or grievances you may have regarding
                  your personal data. We will acknowledge your grievance within <strong className="text-brand-text">36 hours</strong> and
                  aim to resolve it within the statutory timeframe specified under Indian law.
                </p>
                <div className="border border-brand-border rounded-sm p-5 space-y-1 text-[0.95rem] md:text-base bg-brand-panel/50">
                  <p className="text-brand-muted"><span className="text-brand-text font-semibold">Attention:</span> Grievance Officer</p>
                  <p className="text-brand-muted"><span className="text-brand-text font-semibold">Company:</span> Jitesh Petrochemicals</p>
                  <p className="text-brand-muted">
                    <span className="text-brand-text font-semibold">Email:</span>{' '}
                    <a
                      href="mailto:chintan@jiteshpetrochemicals.com"
                      className="text-primary hover:text-primary-light underline underline-offset-2 transition-colors"
                    >
                      chintan@jiteshpetrochemicals.com
                    </a>
                  </p>
                </div>
              </div>

              {/* 10 */}
              <div className="reveal">
                <h2 className="text-[1rem] md:text-[1.1rem] font-heading font-bold text-brand-text uppercase tracking-wide mb-3">
                  10. Updates to This Policy
                </h2>
                <p className="text-brand-muted leading-relaxed text-[0.95rem] md:text-base">
                  We reserve the right to modify this Privacy Policy at any time. Any changes will be posted
                  directly to this page with a revised &apos;Last Updated&apos; date. We encourage you to review
                  this policy periodically.
                </p>
              </div>

            </div>

            {/* Divider */}
            <div className="reveal border-t border-brand-border mt-12 mb-8" />

            {/* Footer note */}
            <div className="reveal text-center pb-2">
              <p className="text-brand-muted/60 text-sm mb-4">
                By using this website, you agree to the terms of this Privacy Policy.
              </p>
              <Link
                to="/"
                className="inline-flex items-center gap-2 text-primary font-heading font-semibold text-sm tracking-wider uppercase hover:text-primary-light transition-colors"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="15 18 9 12 15 6" />
                </svg>
                Back to Home
              </Link>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
};

export default PrivacyPolicy;
