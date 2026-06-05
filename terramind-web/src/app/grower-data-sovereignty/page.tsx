import type { Metadata } from "next";
import LegalPage from "@/components/LegalPage";

export const metadata: Metadata = {
  title: "Grower Data Sovereignty — TerraMind",
  description: "TerraMind's commitments to grower ownership and control of farm data.",
};

export default function GrowerDataSovereigntyPage() {
  return (
    <LegalPage title="Grower Data Sovereignty" lastUpdated="5 June 2026">
      <p>
        TerraMind is built on a simple principle: <strong>your orchard data belongs to you.</strong>
      </p>
      <p>
        This is not a marketing statement. It is an architectural commitment encoded into how
        TerraMind is built, how your data is stored, and what rights you have over it.
      </p>

      <hr />

      <h2>What "your data" means</h2>
      <p>
        Your data includes everything you provide to TerraMind and everything TerraMind derives
        specifically for your orchard:
      </p>
      <table>
        <thead>
          <tr>
            <th>Data type</th>
            <th>Examples</th>
            <th>Yours?</th>
          </tr>
        </thead>
        <tbody>
          <tr><td>Orchard profile</td><td>Name, address, contact details</td><td>Yes</td></tr>
          <tr><td>Block definitions</td><td>Boundaries, crop, variety, planting year</td><td>Yes</td></tr>
          <tr><td>Management actions</td><td>Sprays, irrigation, frost protection, costs</td><td>Yes</td></tr>
          <tr><td>Decision records</td><td>Which recommended actions you chose</td><td>Yes</td></tr>
          <tr><td>Outcome confirmations</td><td>Whether predictions matched reality</td><td>Yes</td></tr>
          <tr><td>Alert preferences</td><td>Thresholds, channels, quiet hours</td><td>Yes</td></tr>
          <tr><td>Xero data</td><td>Financial records synced from your Xero account</td><td>Yes</td></tr>
          <tr><td>Block-level predictions</td><td>Frost, Psa, yield, irrigation predictions for your blocks</td><td>Yes</td></tr>
          <tr><td>Block-level observations</td><td>Weather, satellite, soil data attributed to your blocks</td><td>Yes</td></tr>
          <tr><td>Financial projections</td><td>Revenue, losses, cash flow, P&amp;L for your orchard</td><td>Yes</td></tr>
        </tbody>
      </table>

      <hr />

      <h2>What you can do with your data</h2>

      <h3>Export at any time</h3>
      <p>
        Your account includes a complete data export feature. One click downloads your full
        orchard dataset — profile, blocks, management actions, predictions, observations,
        outcomes, alerts, and financial data — in a standard JSON format.
      </p>
      <p>
        You do not need to provide a reason. You do not need our permission. The export
        includes everything we hold about your orchard.
      </p>

      <h3>Leave at any time</h3>
      <p>You may delete your TerraMind account at any time. When you do:</p>
      <ul>
        <li>Your identifiable data is deleted within 30 days</li>
        <li>We recommend exporting your data before requesting deletion</li>
        <li>
          De-identified aggregate data already incorporated into our models is retained (see
          below)
        </li>
      </ul>

      <h3>Correct at any time</h3>
      <p>
        If any data we hold about you or your orchard is incorrect, you can update it through
        your account settings or by contacting us at{" "}
        <a href="mailto:support@terramind.co.nz">support@terramind.co.nz</a>.
      </p>

      <hr />

      <h2>How we use your data</h2>

      <h3>To power your predictions</h3>
      <p>
        Your primary data (blocks, management actions, outcomes) feeds the prediction and
        finance layers that serve your dashboard. This is the core purpose of the platform.
      </p>

      <h3>To improve our models (de-identified only)</h3>
      <p>
        We use <strong>de-identified, aggregated</strong> data across all users to improve
        prediction accuracy and calibration. This means:
      </p>
      <ul>
        <li>Your individual orchard is never identifiable in aggregate data</li>
        <li>
          We combine data from many orchards to detect patterns and improve models
        </li>
        <li>This aggregate learning benefits all users, including you</li>
      </ul>

      <h3>What we never do</h3>
      <ul>
        <li>We <strong>never sell</strong> your data to third parties</li>
        <li>
          We <strong>never share</strong> your identifiable orchard data with insurers, banks,
          industry bodies, competitors, or government agencies without your explicit written
          consent
        </li>
        <li>We <strong>never use</strong> your data to market other products to you</li>
        <li>
          We <strong>never lock</strong> your data behind export restrictions or format
          barriers
        </li>
      </ul>

      <hr />

      <h2>Data licensing</h2>
      <p>
        By using TerraMind, you grant us a limited license to use your data as described
        above. This license:
      </p>
      <ul>
        <li>Is non-exclusive (you can use your data however you want)</li>
        <li>Is revocable (delete your account to revoke it for identifiable data)</li>
        <li>
          Permits de-identified aggregate use only (we never share your identifiable data)
        </li>
        <li>Terminates for identifiable data when you leave</li>
      </ul>

      <hr />

      <h2>Third-party data we bring to your orchard</h2>
      <p>
        TerraMind enriches your orchard data with public and licensed data sources:
      </p>
      <ul>
        <li>Weather observations and forecasts (NIWA, MetService, Open-Meteo)</li>
        <li>Satellite imagery indices (Sentinel-2 / Copernicus NDVI)</li>
        <li>Terrain data (LINZ elevation, slope, aspect, hydrography)</li>
        <li>Soil classification (Manaaki Whenua Smap)</li>
      </ul>
      <p>
        This enrichment data is derived from public sources, not from other growers. When it
        is attributed to your blocks, it becomes part of your exportable data.
      </p>

      <hr />

      <h2>Future commitments</h2>

      <h3>Iwi and Māori data sovereignty</h3>
      <p>
        TerraMind recognises Te Mana Raraunga (Māori Data Sovereignty) principles. As we
        develop partnerships with iwi-owned horticultural operations, we are committed to:
      </p>
      <ul>
        <li>
          Engaging in genuine partnership conversations about data governance
        </li>
        <li>Respecting collective data rights alongside individual grower rights</li>
        <li>
          Ensuring any data from Māori-owned operations is governed in accordance with
          principles agreed with those communities
        </li>
      </ul>
      <p>
        This is a long-term commitment, not a current feature. We name it here because it
        shapes how we build the platform today.
      </p>

      <h3>Open data architecture</h3>
      <p>
        Our data layer is designed so that no grower's data is structurally trapped. Standard
        formats, documented schemas, and a complete export feature mean your data is always
        portable.
      </p>

      <hr />

      <h2>Contact</h2>
      <p>Questions about your data rights:</p>
      <ul>
        <li>
          <strong>Email:</strong>{" "}
          <a href="mailto:privacy@terramind.co.nz">privacy@terramind.co.nz</a>
        </li>
        <li>
          <strong>Export your data:</strong> Account settings, "Export orchard data"
        </li>
        <li>
          <strong>Delete your account:</strong>{" "}
          <a href="mailto:support@terramind.co.nz">support@terramind.co.nz</a>
        </li>
      </ul>
    </LegalPage>
  );
}
