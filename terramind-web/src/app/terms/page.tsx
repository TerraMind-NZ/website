import type { Metadata } from "next";
import LegalPage from "@/components/LegalPage";

export const metadata: Metadata = {
  title: "Terms of Service — TerraMind",
  description: "Terms governing use of TerraMind's platform and services.",
};

export default function TermsPage() {
  return (
    <LegalPage title="Terms of Service" lastUpdated="5 June 2026">
      <p>
        These Terms of Service ("Terms") govern your use of the TerraMind platform operated
        by TerraMind Limited ("TerraMind", "we", "us", "our"), a New Zealand limited company.
        By creating an account or using TerraMind, you agree to these Terms.
      </p>

      <hr />

      <h2>1. The service</h2>
      <p>
        TerraMind is a probabilistic forecasting and decision-support platform for New Zealand
        horticultural growers. The service provides:
      </p>
      <ul>
        <li>
          Block-level probability distributions for frost risk, disease pressure, yield
          trajectory, and irrigation need
        </li>
        <li>Economic translations of predictions into dollar-denominated outcomes</li>
        <li>Decision recommendations with explicit confidence levels</li>
        <li>
          AI-mediated reasoning for questions outside structured model coverage
        </li>
        <li>
          Financial integration (read-only Xero sync) for grounding projections in actual
          data
        </li>
        <li>
          SMS and email alerts when thresholds are breached or decisions are recommended
        </li>
      </ul>

      <hr />

      <h2>2. Account registration</h2>

      <h3>2.1 Eligibility</h3>
      <p>
        You must be at least 18 years old and legally capable of entering into a binding
        agreement under New Zealand law.
      </p>

      <h3>2.2 Account responsibility</h3>
      <p>
        You are responsible for maintaining the security of your account credentials and for
        all activity under your account. Notify us immediately at{" "}
        <a href="mailto:support@terramind.co.nz">support@terramind.co.nz</a> if you suspect
        unauthorised access.
      </p>

      <h3>2.3 Orchard roles</h3>
      <p>Accounts operate within orchard-level roles:</p>
      <ul>
        <li>
          <strong>Owner:</strong> Full access including billing, team management, and economic
          parameters
        </li>
        <li>
          <strong>Manager:</strong> Operational access to predictions, decisions, action
          logging, and alerts
        </li>
        <li>
          <strong>Viewer:</strong> Read-only access for consultants, advisors, or family
          members
        </li>
      </ul>
      <p>
        The account creator is the initial Owner. Owners may invite additional users up to
        the plan limit.
      </p>

      <hr />

      <h2>3. Acceptable use</h2>
      <p>You agree not to:</p>
      <ul>
        <li>Use the service for any unlawful purpose</li>
        <li>Attempt to access accounts or data belonging to other users</li>
        <li>
          Reverse-engineer, decompile, or extract the source code of TerraMind's prediction
          models
        </li>
        <li>
          Resell, sublicense, or redistribute TerraMind data or outputs without written
          permission
        </li>
        <li>
          Use automated tools (scrapers, bots) to access the service beyond normal usage
        </li>
        <li>
          Deliberately provide false orchard data to manipulate predictions or outputs
        </li>
      </ul>

      <hr />

      <h2>4. Predictions, recommendations, and disclaimers</h2>

      <h3>4.1 Not financial advice</h3>
      <p>
        TerraMind provides decision-support calculations based on probabilistic models and
        publicly available data.{" "}
        <strong>
          TerraMind does not provide personalised financial advice, investment advice, or
          insurance advice.
        </strong>{" "}
        Recommendations are computed outputs, not professional opinions.
      </p>
      <p>
        TerraMind is not a registered financial advice provider under the Financial Markets
        Conduct Act 2013. Our outputs are not a substitute for professional financial, legal,
        or agronomic advice.
      </p>

      <h3>4.2 No guarantee of accuracy</h3>
      <p>
        Predictions are probabilistic estimates based on available data and models. They are
        not guarantees. Weather is inherently uncertain. Models have known limitations
        documented on our calibration page. Actual outcomes may differ materially from
        predictions.
      </p>

      <h3>4.3 Your decisions</h3>
      <p>
        All operational and financial decisions remain yours. TerraMind presents options and
        computed expected values; you choose what to do. We are not responsible for losses
        arising from decisions made based on TerraMind outputs.
      </p>

      <h3>4.4 AI-mediated reasoning</h3>
      <p>
        The "Ask TerraMind" feature uses large language model technology. Outputs from this
        feature are exploratory and may be unreliable. They are visually distinguished from
        calibrated structured-model predictions and carry persistent "AI reasoning — answers
        may be unreliable" framing.
      </p>

      <hr />

      <h2>5. Data ownership and sovereignty</h2>

      <h3>5.1 Your data belongs to you</h3>
      <p>
        You retain full ownership of your orchard data, including block geometries,
        management actions, yield outcomes, and personal information.
      </p>

      <h3>5.2 Our license to operate</h3>
      <p>
        By using TerraMind, you grant us a non-exclusive, worldwide license to use your data
        to:
      </p>
      <ul>
        <li>Provide the TerraMind service to you</li>
        <li>
          Improve our prediction models using de-identified, aggregated data
        </li>
        <li>Generate calibration metrics using de-identified outcomes</li>
      </ul>
      <p>
        This license terminates when you delete your account, except for de-identified
        aggregate data already incorporated into our models.
      </p>

      <h3>5.3 Export and portability</h3>
      <p>
        You may export your complete orchard data at any time through the account settings.
        The export includes your orchard profile, blocks, management actions, predictions,
        observations, outcome confirmations, alert preferences, and financial data in JSON
        format.
      </p>

      <h3>5.4 Deletion</h3>
      <p>
        You may request account deletion at any time. We will delete your identifiable data
        within 30 days. De-identified aggregate data used for model calibration is retained.
      </p>

      <hr />

      <h2>6. Intellectual property</h2>

      <h3>6.1 Our IP</h3>
      <p>
        TerraMind's prediction models, calibration methodology, economic parameter library,
        software code, user interface design, and brand assets are our intellectual property.
        Nothing in these Terms transfers IP rights to you.
      </p>

      <h3>6.2 Your content</h3>
      <p>
        You retain IP rights over any content you provide (orchard names, notes, action
        descriptions).
      </p>

      <h3>6.3 Feedback</h3>
      <p>
        If you provide feedback, suggestions, or ideas about the service, you grant us a
        perpetual, irrevocable license to use that feedback without compensation.
      </p>

      <hr />

      <h2>7. Third-party data sources</h2>
      <p>
        TerraMind incorporates data from third-party sources including NIWA, MetService,
        Open-Meteo, LINZ, Manaaki Whenua (Smap), and the European Space Agency (Sentinel-2 /
        Copernicus). These sources are used under their respective licenses. We attribute data
        sources where required. We do not guarantee the availability or accuracy of
        third-party data.
      </p>

      <hr />

      <h2>8. Service availability</h2>

      <h3>8.1 Best efforts</h3>
      <p>
        We aim to provide the service reliably but do not guarantee uninterrupted
        availability. Scheduled maintenance, infrastructure failures, third-party outages, and
        force majeure events may cause service interruptions.
      </p>

      <h3>8.2 Status page</h3>
      <p>Current operational status is published at terramind.co.nz/status.</p>

      <h3>8.3 Data freshness</h3>
      <p>
        Predictions depend on timely data from external sources. If a data source is delayed
        or unavailable, predictions may use stale data with explicit "as of" timestamps. The
        system does not silently substitute or interpolate missing data.
      </p>

      <hr />

      <h2>9. Pricing</h2>
      <p>
        Pricing is tailored to your operation and crop type. Contact us at{" "}
        <a href="mailto:support@terramind.co.nz">support@terramind.co.nz</a> to discuss your
        plan.
      </p>

      <hr />

      <h2>10. Limitation of liability</h2>

      <h3>10.1 Service provided "as is"</h3>
      <p>
        To the maximum extent permitted by New Zealand law, including the Consumer Guarantees
        Act 1993, TerraMind is provided "as is" and "as available" without warranties of any
        kind, express or implied.
      </p>

      <h3>10.2 Liability cap</h3>
      <p>
        Our total aggregate liability to you for any claims arising from or related to your
        use of TerraMind shall not exceed the amount you paid us in the 12 months preceding
        the claim, or NZD $500, whichever is greater.
      </p>

      <h3>10.3 Exclusions</h3>
      <p>We are not liable for:</p>
      <ul>
        <li>Losses arising from decisions you make based on TerraMind outputs</li>
        <li>Crop damage, financial losses, or missed opportunities</li>
        <li>Inaccurate predictions or recommendations</li>
        <li>Third-party data source failures</li>
        <li>Service interruptions beyond our reasonable control</li>
      </ul>

      <h3>10.4 Consumer law</h3>
      <p>
        Nothing in these Terms excludes or limits liability that cannot be excluded or limited
        under New Zealand law, including the Consumer Guarantees Act 1993 and the Fair
        Trading Act 1986.
      </p>

      <hr />

      <h2>11. Indemnification</h2>
      <p>
        You agree to indemnify and hold harmless TerraMind and its founders, employees, and
        agents from any claims, losses, or damages arising from your breach of these Terms or
        misuse of the service.
      </p>

      <hr />

      <h2>12. Termination</h2>

      <h3>12.1 By you</h3>
      <p>
        You may terminate your account at any time by contacting{" "}
        <a href="mailto:support@terramind.co.nz">support@terramind.co.nz</a> or through
        account settings.
      </p>

      <h3>12.2 By us</h3>
      <p>
        We may suspend or terminate your account if you breach these Terms, engage in abusive
        behaviour, or if required by law. We will provide reasonable notice where possible.
      </p>

      <h3>12.3 Effect of termination</h3>
      <p>
        On termination, your right to use the service ends. You may export your data before
        or within 30 days after termination. After 30 days, your identifiable data is
        deleted.
      </p>

      <hr />

      <h2>13. Dispute resolution</h2>

      <h3>13.1 Governing law</h3>
      <p>These Terms are governed by the laws of New Zealand.</p>

      <h3>13.2 Informal resolution</h3>
      <p>
        Before initiating formal proceedings, you agree to contact us at{" "}
        <a href="mailto:legal@terramind.co.nz">legal@terramind.co.nz</a> and attempt to
        resolve the dispute informally for at least 30 days.
      </p>

      <h3>13.3 Jurisdiction</h3>
      <p>
        Any disputes not resolved informally shall be subject to the exclusive jurisdiction
        of the courts of New Zealand.
      </p>

      <hr />

      <h2>14. Changes to these Terms</h2>
      <p>
        We may update these Terms from time to time. Material changes will be communicated
        via email at least 30 days before taking effect. Continued use of the service after
        changes constitutes acceptance.
      </p>

      <hr />

      <h2>15. Contact</h2>
      <ul>
        <li>
          <strong>Email:</strong>{" "}
          <a href="mailto:support@terramind.co.nz">support@terramind.co.nz</a>
        </li>
        <li>
          <strong>Mail:</strong> TerraMind Limited, 368 Blockhouse Bay Rd, Auckland 0600
        </li>
      </ul>
    </LegalPage>
  );
}
