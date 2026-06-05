import type { Metadata } from "next";
import LegalPage from "@/components/LegalPage";

export const metadata: Metadata = {
  title: "Privacy Policy — TerraMind",
  description: "How TerraMind collects, uses, and protects your data.",
};

export default function PrivacyPage() {
  return (
    <LegalPage title="Privacy Policy" lastUpdated="5 June 2026">
      <p>
        TerraMind Limited ("TerraMind", "we", "us", "our") operates the TerraMind platform at
        terramind.co.nz. This Privacy Policy explains how we collect, use, store, and protect
        your personal information in compliance with the New Zealand Privacy Act 2020.
      </p>

      <hr />

      <h2>1. Information we collect</h2>

      <h3>1.1 Account information</h3>
      <p>When you create a TerraMind account, we collect:</p>
      <ul>
        <li>Full name</li>
        <li>Email address</li>
        <li>Phone number (optional, for SMS alerts)</li>
        <li>Password (managed by our authentication provider, Clerk)</li>
      </ul>

      <h3>1.2 Orchard and block data</h3>
      <p>When you set up your growing operation, we collect:</p>
      <ul>
        <li>Orchard name and address</li>
        <li>Block boundaries (geographic polygons drawn or confirmed by you)</li>
        <li>Crop type, variety, and planting year per block</li>
        <li>Protection action cost assumptions (e.g., wind machine cost, frost cloth cost)</li>
      </ul>

      <h3>1.3 Management action records</h3>
      <p>When you log management actions, we collect:</p>
      <ul>
        <li>Action type, date, cost, and block</li>
        <li>Decision records (which recommended action you chose)</li>
      </ul>

      <h3>1.4 Financial data (Xero integration)</h3>
      <p>If you connect your Xero account, we receive read-only access to:</p>
      <ul>
        <li>Revenue and expense records</li>
        <li>Account categories and transaction details</li>
        <li>Supplier invoices relevant to orchard operations</li>
      </ul>
      <p>
        We do not store your Xero credentials. Authentication uses OAuth 2.0 tokens managed
        securely.
      </p>

      <h3>1.5 Usage data</h3>
      <p>We collect standard usage information:</p>
      <ul>
        <li>Pages visited and features used</li>
        <li>Device type and browser</li>
        <li>IP address and approximate location</li>
        <li>Session duration and interaction patterns</li>
      </ul>

      <h3>1.6 Data we derive</h3>
      <p>From your orchard data and public data sources, we derive:</p>
      <ul>
        <li>Elevation, slope, aspect, and soil type for your blocks (from LINZ and Smap)</li>
        <li>Satellite vegetation indices (NDVI from Sentinel-2 / Copernicus)</li>
        <li>
          Weather observations and forecasts attributed to your blocks (from NIWA,
          Open-Meteo, MetService)
        </li>
        <li>
          Probabilistic predictions (frost risk, disease pressure, yield trajectory,
          irrigation need)
        </li>
        <li>Financial projections (expected revenue, losses, cash flow)</li>
      </ul>

      <hr />

      <h2>2. How we use your information</h2>
      <p>We use your information to:</p>
      <ul>
        <li>
          <strong>Provide the TerraMind service</strong> — generate predictions, financial
          projections, and recommendations for your orchard
        </li>
        <li>
          <strong>Send alerts</strong> — SMS and email notifications when prediction
          thresholds are breached or decisions are recommended
        </li>
        <li>
          <strong>Improve our models</strong> — use de-identified, aggregated data across all
          users to improve prediction accuracy and calibration
        </li>
        <li>
          <strong>Communicate with you</strong> — service updates, onboarding guidance, and
          support
        </li>
        <li>
          <strong>Maintain security</strong> — detect and prevent unauthorised access or abuse
        </li>
      </ul>
      <p>
        We do not sell your personal information. We do not use your data for advertising.
      </p>

      <hr />

      <h2>3. Legal basis for processing</h2>
      <p>
        Under the New Zealand Privacy Act 2020, we collect and process your information
        because:
      </p>
      <ul>
        <li>
          It is necessary to provide the TerraMind service you requested (Information Privacy
          Principle 1)
        </li>
        <li>
          Collection is directly from you or with your knowledge (IPP 2 and 3)
        </li>
        <li>We use it only for the purposes described in this policy (IPP 10)</li>
      </ul>

      <hr />

      <h2>4. Who we share your information with</h2>
      <p>We share your information only with:</p>
      <table>
        <thead>
          <tr>
            <th>Recipient</th>
            <th>Purpose</th>
            <th>Data shared</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Clerk (authentication)</td>
            <td>Account management and login</td>
            <td>Name, email, auth tokens</td>
          </tr>
          <tr>
            <td>Twilio (SMS)</td>
            <td>Alert delivery</td>
            <td>Phone number, alert content</td>
          </tr>
          <tr>
            <td>Resend (email)</td>
            <td>Alert and notification delivery</td>
            <td>Email address, alert content</td>
          </tr>
          <tr>
            <td>Neon (database hosting)</td>
            <td>Data storage</td>
            <td>All service data (encrypted at rest)</td>
          </tr>
          <tr>
            <td>Railway (compute hosting)</td>
            <td>Service execution</td>
            <td>Processed in memory only</td>
          </tr>
          <tr>
            <td>Vercel (web hosting)</td>
            <td>Frontend delivery</td>
            <td>Standard web request data</td>
          </tr>
          <tr>
            <td>Sentry (error tracking)</td>
            <td>Bug detection and resolution</td>
            <td>Error context (no personal data by design)</td>
          </tr>
          <tr>
            <td>Axiom (logging)</td>
            <td>Operational monitoring</td>
            <td>Service logs (minimised personal data)</td>
          </tr>
          <tr>
            <td>OpenRouter (AI provider)</td>
            <td>Ask TerraMind reasoning</td>
            <td>Block context for LLM queries (no PII)</td>
          </tr>
          <tr>
            <td>Xero (if connected)</td>
            <td>Financial data sync</td>
            <td>OAuth tokens only; Xero sends data to us</td>
          </tr>
        </tbody>
      </table>
      <p>
        We do not share your orchard data, predictions, or financial information with any
        third party for their own purposes. We do not share data with insurers, banks,
        industry bodies, or government agencies unless you explicitly consent or we are
        required by law.
      </p>

      <hr />

      <h2>5. Data retention</h2>
      <ul>
        <li>
          <strong>Account data</strong> is retained while your account is active and for 12
          months after deletion to allow account recovery
        </li>
        <li>
          <strong>Orchard and prediction data</strong> is retained while your account is
          active. On account deletion, your identifiable data is deleted within 30 days;
          de-identified aggregated data used for model calibration is retained
        </li>
        <li>
          <strong>Alert delivery records</strong> are retained for 24 months for audit and
          debugging purposes
        </li>
        <li>
          <strong>Xero data</strong> is deleted when you disconnect the integration or delete
          your account
        </li>
      </ul>

      <hr />

      <h2>6. Your rights</h2>
      <p>Under the Privacy Act 2020, you have the right to:</p>
      <ul>
        <li>
          <strong>Access</strong> your personal information — request a copy of all data we
          hold about you
        </li>
        <li>
          <strong>Correct</strong> inaccurate information — update your details at any time
          through the account settings or by contacting us
        </li>
        <li>
          <strong>Export</strong> your data — use the data export feature in your account to
          download your orchard profile, blocks, management actions, predictions, and
          financial data in JSON format
        </li>
        <li>
          <strong>Delete</strong> your account — contact us to request account deletion; we
          will delete your identifiable data within 30 days
        </li>
      </ul>
      <p>
        To exercise any of these rights, email{" "}
        <a href="mailto:privacy@terramind.co.nz">privacy@terramind.co.nz</a>.
      </p>

      <hr />

      <h2>7. Data security</h2>
      <p>We protect your information with:</p>
      <ul>
        <li>Encryption in transit (TLS/HTTPS on all connections)</li>
        <li>Encryption at rest (Neon database encryption)</li>
        <li>Role-based access control within orchards (Owner, Manager, Viewer)</li>
        <li>JWT-based authentication with secure session management</li>
        <li>No plaintext storage of passwords or API keys</li>
        <li>Admin access is logged and visibly indicated in the interface</li>
      </ul>

      <hr />

      <h2>8. Cookies</h2>
      <p>
        TerraMind uses essential cookies for authentication and session management. We do not
        use tracking cookies or third-party advertising cookies. If we introduce analytics in
        the future, we will update this policy and obtain your consent where required.
      </p>

      <hr />

      <h2>9. International data transfers</h2>
      <p>
        Your data is processed on servers in the United States (Railway, Vercel, Neon) and
        may transit through other jurisdictions. We ensure all service providers maintain
        appropriate security standards. New Zealand's Privacy Act 2020 requires that personal
        information transferred overseas receives comparable protection.
      </p>

      <hr />

      <h2>10. Children's privacy</h2>
      <p>
        TerraMind is a professional agricultural tool and is not directed at children under
        16. We do not knowingly collect personal information from children.
      </p>

      <hr />

      <h2>11. Changes to this policy</h2>
      <p>
        We may update this Privacy Policy from time to time. Material changes will be
        communicated via email to the address on your account and noted on this page with an
        updated effective date. Continued use of the service after changes constitutes
        acceptance.
      </p>

      <hr />

      <h2>12. Contact us</h2>
      <p>
        If you have questions about this Privacy Policy or wish to exercise your rights:
      </p>
      <ul>
        <li>
          <strong>Email:</strong>{" "}
          <a href="mailto:privacy@terramind.co.nz">privacy@terramind.co.nz</a>
        </li>
        <li>
          <strong>Mail:</strong> TerraMind Limited, 368 Blockhouse Bay Rd, Auckland 0600
        </li>
      </ul>
      <p>
        If you are not satisfied with our response, you may lodge a complaint with the Office
        of the Privacy Commissioner at{" "}
        <a href="https://www.privacy.org.nz" target="_blank" rel="noopener noreferrer">
          privacy.org.nz
        </a>
        .
      </p>
    </LegalPage>
  );
}
