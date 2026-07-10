**TerraMind**

**AI Layer**

Product Requirements Document — Addendum to PRD v1.0

Version 2.0  |  June 2026

*Confidential*

**Authors**

Hasan Sheikh — Co-founder, Software

Aaqib Sharif — Co-founder, Hardware

# **1\. About This Document**

## **1.1 Purpose**

This document is the technical foundation for TerraMind's AI layer. It is a direct addendum to TerraMind PRD v1.0 (May 2026\) and must be read alongside it. Where the core PRD specifies the probabilistic forecasting engine, data layer, finance layer, and base frontend, this document specifies the AI feature set built on top of those foundations.

Conventions match the core PRD: schema tables define every new database entity, API contracts define every new endpoint, UI patterns are specified at the same level of detail as §7 of the core PRD, and implementation decisions are explicit throughout. References to the core PRD use the format §x.x.

## **1.2 Scope**

This document specifies the following features in full technical detail:

* Reports Tab — four AI-generated report types with full generation pipeline

* AI Season Planner/Calendar — prediction-driven scheduling, event detail views, conflict detection, inferred logging

* Nightly Insight Scan — background engine specification

* AI Agronomist Persona — context assembly, LLM integration, competence boundary enforcement

* Daily Briefing Tab — generation pipeline and content specification

* Insights Feed — proactive insight generation and surfacing

* Decision Confidence Scoring — three-tier system specification

* Season Trajectory Narrative — synthesis engine

* Pre-Decision Checklist — dynamic context surfacing

* Prediction Track Record and Decision Wins — per-block and season-level

* Compounding Season Intelligence — background block model

* Risk-Weighted Season Planning — Monte Carlo simulation engine

* Cross-Season What-If Modelling — counterfactual reconstruction

* Optimal Decision Threshold Personalisation — v2, documented as architectural intent

* Cross-Grower Pattern Detection — v2, documented as architectural intent

## **1.3 LLM Provider**

All LLM-powered features in this document use Gemma 4, self-hosted via OpenRouter on Railway. This supersedes the Anthropic Claude references in §5.4.5 and §8.1 of the core PRD. All prompts are versioned artifacts stored in the repository under prompts/ and treated as designed, tested engineering outputs.

LLM calls follow a strict grounding discipline: every call that references specific figures (probabilities, costs, yield estimates, revenue projections) receives those figures as structured context assembled from the database before the LLM is invoked. The LLM synthesises and narrates; it does not compute.

## **1.4 Scope Discipline**

Every feature in this document exists because of a TerraMind prediction. The test: could this feature exist without the prediction layer? If yes, it does not belong. This filter is applied explicitly in §18.4 (Scope Risk) and was the basis for excluding insurance automation, equipment management, and general operational scheduling from this document.

# **2\. Architectural Foundations**

## **2.1 AI Is an Intelligence Layer, Not a Product Layer**

The AI agronomist persona, nightly scan, insight engine, and decision confidence engine are infrastructure. They do not surface as named AI features in the product UI. Growers experience a product that surfaces the right information at the right moment.

One exception: the Insights Feed tab is explicitly AI-surfaced content, because the value proposition requires the grower to understand they are seeing AI-identified patterns, not threshold alerts. The visual distinction (§2.4 below) handles this.

## **2.2 Grounding Before Generation**

No LLM call produces a figure that has not first been retrieved from the database. The pipeline for every AI-generated output:

1. Query the database for all relevant structured data (predictions, observations, management\_actions, finance outputs, historical comparisons)

2. Assemble a structured context bundle as a JSON object

3. Pass the context bundle to Gemma 4 with a versioned prompt

4. Parse and validate the LLM output against the expected schema

5. Render the validated output to the grower

If step 4 validation fails, the system falls back to a structured display of the raw data rather than surfacing a malformed AI output. Fallback behaviour is specified per feature.

## **2.3 Human Confirmation Before Action**

The AI layer drafts, suggests, schedules, and generates. It does not execute without explicit grower confirmation. This applies to: inferred logging prompts, calendar conflict suggestions for human-added events, and any operation that writes to management\_actions. Read-only outputs (reports, insights, narratives, checklists) do not require confirmation.

## **2.4 Visual Distinction**

Three visual tiers distinguish output types throughout the product, consistent with §3.7 of the core PRD:

* Structured model output — default product styling; confidence bars and plumes as defined in §7.6.2 of the core PRD

* AI-synthesised output — warm amber left border, 'AI synthesis' label in small caps above content; used for report narratives, season trajectory, insights, and checklist items

* AI-inferred action — orange prompt card with explicit evidence shown; used for inferred logging prompts only

## **2.5 New Database Tables**

The AI layer requires the following new tables in addition to the core PRD schema. All tables live in the same Neon Postgres instance. All use uuid primary keys and include created\_at / updated\_at audit timestamps unless noted.

**reports**

| Field | Type | Description |
| :---- | :---- | :---- |
| **report\_id** | uuid | Primary key |
| **orchard\_id** | uuid | References orchards |
| **report\_type** | text | weekly | pre\_season | season\_debrief | agronomist |
| **status** | text | generating | ready | failed |
| **generated\_at** | timestamptz | When generation completed |
| **season\_year** | integer | Season this report covers |
| **block\_ids** | uuid\[\] | Blocks included (agronomist report may be subset) |
| **content** | jsonb | Structured report content by section |
| **pdf\_path** | text | Path to generated PDF in object storage |
| **model\_version** | text | Gemma 4 model version used |
| **prompt\_version** | text | Prompt artifact version used |
| **context\_snapshot** | jsonb | Structured data bundle passed to LLM at generation time |

**report\_schedules**

| Field | Type | Description |
| :---- | :---- | :---- |
| **schedule\_id** | uuid | Primary key |
| **orchard\_id** | uuid | References orchards |
| **report\_type** | text | weekly | pre\_season | season\_debrief |
| **scheduled\_date** | date | Date report should generate; season\_debrief is grower-set, others system-computed |
| **notified\_at** | timestamptz | When grower was notified report was ready; null if not yet sent |

**calendar\_events**

| Field | Type | Description |
| :---- | :---- | :---- |
| **event\_id** | uuid | Primary key |
| **block\_id** | uuid | References blocks; null for orchard-level events |
| **orchard\_id** | uuid | References orchards |
| **event\_type** | text | spray | irrigation | frost\_protection | harvest\_window | scouting | phenological\_milestone | human\_added |
| **source** | text | ai\_generated | human\_added |
| **title** | text | Display title |
| **scheduled\_date** | date | Primary date |
| **scheduled\_date\_end** | date | End date for window events (harvest, spray) |
| **confidence\_horizon** | text | near\_term | full\_season — controls visual confidence display |
| **detail** | jsonb | Event-type-specific detail (rates, volumes, labour estimates, etc.) |
| **prediction\_ids** | uuid\[\] | Predictions that drove this event |
| **conflict\_flag** | boolean | True if AI has detected a conflict |
| **conflict\_detail** | jsonb | What conflict was detected and why |
| **conflict\_suggestion** | jsonb | AI's suggested resolution for human\_added conflicts |
| **conflict\_acknowledged\_at** | timestamptz | When grower responded to conflict suggestion |
| **status** | text | active | completed | dismissed | superseded |
| **superseded\_by** | uuid | If AI moved own event, references new event\_id |

**nightly\_scan\_outputs**

| Field | Type | Description |
| :---- | :---- | :---- |
| **scan\_id** | uuid | Primary key |
| **orchard\_id** | uuid | References orchards |
| **scan\_date** | date | Date of scan |
| **findings** | jsonb | Structured array of findings by type and block |
| **insights\_generated** | uuid\[\] | insight\_ids generated from this scan |
| **weekly\_report\_id** | uuid | report\_id this scan fed into; null until report generated |

**insights**

| Field | Type | Description |
| :---- | :---- | :---- |
| **insight\_id** | uuid | Primary key |
| **orchard\_id** | uuid | References orchards |
| **block\_ids** | uuid\[\] | Blocks this insight relates to |
| **scan\_id** | uuid | Nightly scan that generated this insight |
| **insight\_type** | text | trajectory\_comparison | cross\_prediction\_correlation | accumulating\_risk | positive\_signal | historical\_anomaly |
| **headline** | text | One-line summary shown in feed |
| **body** | text | Full insight text |
| **supporting\_data** | jsonb | Structured data behind the insight |
| **relevance\_score** | numeric | Internal quality filter score; only insights above threshold surface |
| **surfaced\_at** | timestamptz | When first shown in feed; null if filtered out |
| **dismissed\_at** | timestamptz | When grower dismissed; null if unread |

**inferred\_log\_prompts**

| Field | Type | Description |
| :---- | :---- | :---- |
| **prompt\_id** | uuid | Primary key |
| **block\_id** | uuid | References blocks |
| **event\_id** | uuid | References calendar\_events |
| **action\_type** | text | frost\_protection | irrigation | spray |
| **inferred\_at** | timestamptz | When inference was generated |
| **evidence** | jsonb | Observation data supporting the inference |
| **status** | text | pending | confirmed | rejected |
| **responded\_at** | timestamptz | When grower responded; null if pending |
| **resulting\_action\_id** | uuid | management\_actions row created on confirmation; null if rejected |

**block\_season\_models**

| Field | Type | Description |
| :---- | :---- | :---- |
| **model\_id** | uuid | Primary key |
| **block\_id** | uuid | References blocks |
| **season\_year** | integer | Season this model version was updated for |
| **microclimate\_corrections** | jsonb | Learned temperature/humidity deviation factors by synoptic condition type |
| **disease\_pressure\_antecedents** | jsonb | Antecedent conditions correlated with elevated disease risk on this block |
| **yield\_weather\_response** | jsonb | Yield sensitivity to weather patterns by phenological stage |
| **irrigation\_response** | jsonb | Soil moisture evolution model for this specific block |
| **seasons\_observed** | integer | Number of full seasons this model has been trained on |
| **last\_updated** | timestamptz | Last model update timestamp |

**decision\_wins**

| Field | Type | Description |
| :---- | :---- | :---- |
| **win\_id** | uuid | Primary key |
| **block\_id** | uuid | References blocks |
| **orchard\_id** | uuid | References orchards |
| **event\_type** | text | Type of event (frost\_protection, spray, etc.) |
| **prediction\_id** | uuid | Prediction that drove the recommendation |
| **action\_id** | uuid | management\_actions row for the action taken |
| **outcome\_confirmed\_at** | timestamptz | When outcome observation data confirmed the event occurred |
| **estimated\_value\_protected\_nzd** | numeric | Estimated dollar value protected; with uncertainty bounds |
| **value\_uncertainty\_low** | numeric | P25 estimate |
| **value\_uncertainty\_high** | numeric | P75 estimate |
| **evidence** | jsonb | Observation data confirming the outcome |

**season\_simulations**

| Field | Type | Description |
| :---- | :---- | :---- |
| **simulation\_id** | uuid | Primary key |
| **orchard\_id** | uuid | References orchards |
| **block\_id** | uuid | Block simulated; null for orchard-level |
| **season\_year** | integer | Season being simulated |
| **generated\_at** | timestamptz | When simulation was run |
| **n\_scenarios** | integer | Number of Monte Carlo scenarios run (default 5,000) |
| **frost\_event\_probability** | numeric | P(at least one significant frost event) |
| **psa\_threshold\_probability** | numeric | P(Psa pressure exceeds treatment threshold one or more times) |
| **yield\_distribution** | jsonb | P5/P25/P50/P75/P95 yield at harvest in kg/ha |
| **revenue\_distribution** | jsonb | P5/P25/P50/P75/P95 revenue in NZD |
| **covenant\_breach\_probability** | numeric | P(revenue falls below covenant threshold); null if no covenant configured |
| **scenario\_samples** | numeric\[\] | Raw Monte Carlo samples for downstream use |

# **3\. Reports Tab**

## **3.1 Purpose**

The Reports Tab is a dedicated navigation item in the TerraMind app containing four AI-generated report types: weekly, pre-season, season debrief, and agronomist. All reports are generated from data already present in the platform. No additional grower input is required at generation time beyond scheduling.

## **3.2 Navigation and Layout**

The Reports Tab shows a list view of available reports, grouped by type. Each report card shows: report type, season year, generation date, and status (generating | ready | failed). Tapping a ready report opens it in a full-screen in-app reader. A download button exports the report as PDF. Reports persist indefinitely.

Generating state: a progress indicator is shown on the card while generation is in progress (typically 10-30 seconds). If generation fails, the card shows a retry option and the error is logged to Sentry with the full context bundle for debugging.

## **3.3 Shared Generation Pipeline**

All four report types share the same five-stage generation pipeline:

#### **Stage 1: Context Assembly**

A context assembler specific to the report type queries the database and constructs a structured JSON bundle. The bundle is stored in reports.context\_snapshot at generation time, enabling exact reproduction of any report output and full debugging capability.

#### **Stage 2: LLM Generation**

The context bundle is passed to Gemma 4 via OpenRouter with a versioned prompt specific to the report type. Prompts are stored under prompts/reports/ in the monorepo. Each prompt specifies: report section structure, tone (warm-direct per §7.6.6 of the core PRD), which figures to include, how to frame uncertainty, and sections to generate. LLM output is structured JSON matching a report content schema — not free-form prose. Each section is a named key. This allows partial re-generation without regenerating the full report.

#### **Stage 3: Validation**

Output is validated against the report content schema. Required fields missing from the output trigger a fallback: the section renders as a structured data display (tables, confidence bars) rather than AI prose. All validation errors are logged to Sentry.

#### **Stage 4: PDF Rendering**

Validated report content is rendered to PDF via a server-side rendering pipeline. Charts are generated from the structured data in the context bundle — not from the LLM output — using the same chart primitives as the main product UI (§7.6.2 of core PRD). PDF is stored in object storage; path written to reports.pdf\_path.

#### **Stage 5: Notification**

On completion, a push notification and email are sent to the orchard Owner and any Manager with notifications enabled. Notification text: '\[Report type\] is ready for \[Orchard name\]. Tap to view.' No report content is included in the notification.

## **3.4 Weekly Report**

### **3.4.1 Trigger and Timing**

The weekly report generates automatically every Monday. The generation job runs after the nightly scan completes (targeting 04:00 NZST). It consumes the nightly\_scan\_outputs record from the most recent completed scan as its primary input.

### **3.4.2 Context Bundle**

The weekly report context assembler queries:

* nightly\_scan\_outputs — most recent scan findings for the orchard

* predictions — all predictions for all blocks, past 7 days and next 14 days

* observations — weather and NDVI observations for all blocks, past 7 days

* management\_actions — all actions logged this week with costs

* finance layer outputs — current expected revenue per block with week-over-week delta

* decision\_wins — any wins recorded this week

* insights — insights surfaced this week

### **3.4.3 Report Sections**

Sections in order:

* Season trajectory narrative — AI synthesis of season direction; see §9 for full specification

* This week's headline — single most important change or event this week

* Prediction accuracy this week — all predictions that resolved this week; predicted vs. actual in table format; sample size shown honestly

* Block-by-block state — all blocks; current prediction state per block with week-over-week change indicators

* Actions taken this week — summary of logged management\_actions with total cost

* Decision wins this week — win cards generated this week; empty state if none

* This week ahead — key risks and recommended actions for next 7 days ranked by economic impact

* Expected revenue change — orchard-level week-over-week with primary driver

### **3.4.4 Format**

Mobile-readable. Charts embedded: confidence bar per prediction type per block (current state), plume for frost trajectory (next 14 nights), sparklines for week-over-week revenue change. Target reading time: under 3 minutes. PDF export includes all charts.

## **3.5 Pre-Season Report**

### **3.5.1 Trigger and Timing**

Generates automatically once per year before spring. Trigger date: 6 weeks before the historical average last-frost date for the orchard's region, derived from the 10-year NIWA station archive. Grower receives notification when ready.

### **3.5.2 Context Bundle**

* Current block state — latest NDVI per block, soil type and PAW from Smap

* season\_simulations — most recent simulation for the coming season (from risk-weighted season planning; see §14)

* Historical seasonal data — past 5 seasons of NIWA observations for the region

* block\_season\_models — compounding intelligence model per block

* management\_actions — last season's full action history for carry-over context

* predictions — current yield trajectory as season starting point

### **3.5.3 Report Sections**

* Current block state — NDVI trajectory, soil health indicators, carry-over risks from previous season

* Coming season risk profile — from season\_simulations; P(frost event), P(Psa threshold breach), yield distribution in plain language

* Recommended preparatory actions — ranked by expected economic impact; specific and actionable

* Budget estimate — projected cost of protection actions based on risk profile and historical action costs from management\_actions

* Season outlook — forward projection narrative; honest about uncertainty at this horizon

## **3.6 Season Debrief**

### **3.6.1 Trigger and Timing**

Generates on a grower-specified date stored in report\_schedules. Growers are prompted to set this date at the start of each season and again at harvest if not set. The system does not auto-generate the season debrief; grower intent is required.

### **3.6.2 Context Bundle**

* All predictions for all blocks for the full season

* All observations for the full season

* All management\_actions for the full season with costs

* All decision\_wins for the full season

* Finance layer outputs — full season P\&L, actual vs. predicted revenue

* Prediction accuracy data — all resolved predictions with outcomes

* block\_season\_models — what the compounding model learned this season

* Cross-season what-if counterfactual data — see §15 for specification

### **3.6.3 Report Sections**

* Season overview — plain-language narrative of the full season

* Block-by-block performance — predicted vs. actual yield per block; key events; notable deviations

* Prediction accuracy — full season calibration breakdown; honest framing including where TerraMind was wrong

* Actions taken and ROI — every logged action, cost, and estimated contribution to revenue protection

* Decision wins compilation — all win cards from the season with total estimated value protected

* Cross-season what-if — see §15

* Financial Deep Dive — see §3.7

* Next season recommendations — specific actions before next season based on what was learned

## **3.7 Financial Deep Dive**

The Financial Deep Dive is a self-contained section within the season debrief. Designed to be read independently by a rural lender or investor. Opens with a one-paragraph season summary so no prior reading is required.

Sections within the Financial Deep Dive:

* Season summary — one paragraph; what happened, what it meant financially

* Season P\&L — actual revenue, actual costs, net outcome; table format

* Risk-adjusted outcomes — estimated value of protection actions taken; loss avoided

* Covenant status — whether loan covenants were met with supporting data; null section if no covenants configured in orchard\_settings

* Forward projection — next season expected revenue P25/P50/P75 from risk-weighted planning; framed as projection with explicit uncertainty bounds

The 'not financial advice' disclaimer from §6.3 of the core PRD appears at the top of the Financial Deep Dive section in every render context.

## **3.8 Agronomist Report**

### **3.8.1 Trigger**

Generated on demand. Grower taps 'Generate Agronomist Report' in the Reports Tab. A block selector allows choosing which blocks to include (all blocks default). Generation is immediate; no scheduling required. Typical generation time: 15-30 seconds.

### **3.8.2 Context Bundle**

* All predictions for selected blocks since last agronomist report or past 90 days if no prior report

* All observations for selected blocks in the same window

* All management\_actions for selected blocks in the window

* insights — all insights surfaced for these blocks in the window

* inferred\_log\_prompts — pending and recently rejected inferences for context

* Current prediction state per block — all active prediction types

### **3.8.3 Report Sections**

* Block history since last report — prediction trajectory, observed conditions, anomalies flagged

* Current prediction state — structured table per block; all active prediction types

* Anomalies and flagged issues — what TerraMind identified as unusual with supporting data

* Open questions — variables the LLM explicitly refused or flagged as uncertain

* Recommended discussion points — AI-generated agenda for the visit based on current state

Format: dense, technical, agronomist-readable. Embedded data tables throughout. PDF only. No in-app reader optimisation for this report type.

# **4\. AI Season Planner / Calendar**

## **4.1 Purpose**

The AI Season Planner is a dedicated tab in the TerraMind application presenting a prediction-driven schedule of actions for the grower's orchard. Every AI-generated event exists because of a TerraMind prediction. The calendar is also a logging surface — every completed event becomes a management\_actions entry.

## **4.2 Calendar Horizons**

| Horizon | Window | Confidence display |
| :---- | :---- | :---- |
| **Near-term operational** | Rolling 14 days, aligned to forecast horizon | High confidence; specific dates and block assignments |
| **Full season arc** | Remainder of season beyond 14 days | Approximate; dates shown with 'estimated' label and wider visual uncertainty; dates update as season progresses |

The confidence\_horizon field on calendar\_events controls display tier. AI-generated events within the near-term window carry near\_term. Full-season arc events carry full\_season. Human-added events always carry near\_term regardless of date — they are grower commitments, not AI estimates.

## **4.3 AI Calendar Population**

The calendar population job runs nightly as part of the nightly scan pipeline and whenever a new forecast cycle is ingested (every 6 hours for weather-driven events). It reads current prediction outputs and generates or updates calendar\_events per block.

### **4.3.1 Spray Window Events**

For each block, the spray window identifier evaluates the next 14 days of forecast data against suitability criteria:

* Wind speed \< 15 km/h sustained, \< 25 km/h gusts (Open-Meteo ECMWF wind components)

* No precipitation forecast in the 6 hours before or 4 hours after planned application

* Temperature within label requirements for the block's active spray programme (crop\_parameters table)

* Withholding period clearance — calculated from last spray date in management\_actions against registered WHP

The best 1-2 day window per week per block is written as a calendar\_events row with event\_type \= 'spray' and confidence\_horizon \= 'near\_term'. If no suitable window exists in the 14-day horizon, a full\_season placeholder is written at the estimated next suitable period based on seasonal climatology.

### **4.3.2 Irrigation Events**

Generated from the irrigation need prediction output (§5.4.4 of core PRD). When the predicted days-to-irrigation distribution median falls below 3 days, a near-term irrigation event is created or updated. The event detail contains the predicted soil moisture deficit and recommended application volume from the FAO-56 model output.

### **4.3.3 Frost Protection Events**

Created when frost probability for a block exceeds the block-specific alert threshold (§11.2.3 of core PRD) for any night in the next 14 days. One event per night per block. Updated every 6 hours as new forecast cycles arrive. Event detail contains the full frost probability distribution, economic decision analysis (cost of protection vs. expected loss), and decision confidence score.

### **4.3.4 Harvest Window Events**

One harvest window event per block, generated from the yield trajectory prediction, updated as the season progresses. Early season: full\_season confidence, wide date range. Within 3 weeks of predicted harvest: near\_term confidence, specific date range. Event detail includes labour planning data (see §4.5.4).

### **4.3.5 Scouting Events**

Triggered by nightly scan anomaly detection: NDVI deviation beyond 1.5 standard deviations from the block's historical trajectory at the same phenological stage, or Psa risk entering the high tier. One scouting event per trigger per block. Event detail contains the anomaly that triggered it and what the grower should observe.

### **4.3.6 Phenological Milestone Events**

Generated from crop\_parameters combined with GDD accumulation from the observations table. Events: budburst, flowering, fruit set, canopy closure, pre-harvest. All carry full\_season confidence until within 14 days of predicted date. Milestones are informational — no logging action, no detail view beyond date and stage description.

## **4.4 Event Detail View**

Tapping any non-milestone calendar event opens a detail view. Structure is event-type-specific.

### **4.4.1 Common Elements (all event types)**

* Event title and block(s) affected

* Confidence horizon indicator — near-term or full-season with plain-language explanation

* Why this event was generated — driver attribution from the prediction that triggered it (§5.5 of core PRD)

* Pre-decision checklist — see §10; surfaces automatically on open for actionable events

* Decision confidence score — see §8; high / medium / marginal with explanation on tap

* Log action button — opens logging interface

### **4.4.2 Spray Event Detail**

* Which blocks the window applies to with recommended application conditions

* Variable-rate recommendations per block — recommended application rate in L/ha from NDVI, disease pressure, and crop\_parameters; not a flat default

* Consolidated volume summary — total volume required across all relevant blocks for this spray event; single shopping list figure

* Per-block volume breakdown — on tap

* Estimated product cost — total at industry average pricing from crop\_parameters economic data; grower can override with actual supplier price stored in orchard\_settings; override applies to all future cost estimates

* Expected outcome — what risk the spray mitigates and estimated economic value of mitigation

* AI execution advice — plain-language guidance on timing, equipment setup, and conditions to watch

### **4.4.3 Frost Protection Event Detail**

* Frost probability distribution for the night — confidence bar (P5/P25/P50/P75/P95) per block

* Decision economics — EV of protecting vs. not protecting; breakdown per method (wind machines / frost cloth / helicopter) with cost and net EV

* Recommended action — highest-EV option highlighted

* Decision confidence score — prominent on this event type given economic stakes

* Forecast model agreement — how many of the 4-6 ensemble models agree on severity; shown as count

### **4.4.4 Harvest Window Event Detail**

* Predicted harvest window — date range with confidence interval; narrows as season progresses

* Brix/dry matter trajectory — plume showing projected harvest readiness

* Labour planning estimate:

* Estimated harvest start date per block

* Projected yield per block — from yield trajectory prediction with P25/P50/P75

* Recommended picker numbers — derived from projected yield, block area, historical picking rate from management\_actions if available, and any other labour records in the system; confidence interval shown

* Estimated harvest duration per block

* Total estimated labour cost at standard labour rates configurable in orchard\_settings

Labour planning estimates are explicitly framed as data-grounded starting points for contractor conversations, not precise commitments. Confidence intervals are always shown. Estimates tighten as harvest approaches and picking rate history accumulates.

## **4.5 Dynamic Conflict Detection**

The conflict detection job runs as part of the nightly scan and whenever a new forecast cycle is ingested. It compares scheduled calendar\_events against current conditions and sets conflict\_flag \= true with conflict\_detail populated when a conflict is found.

### **4.5.1 Conflict Types Detected**

* Spray window invalidated — forecast changed; conditions no longer meet suitability criteria

* Frost event conditions changed significantly — frost probability moved materially since event creation

* Irrigation rendered unnecessary — significant rainfall makes scheduled irrigation unnecessary

* Harvest window shifted — Brix/dry matter trajectory update moved predicted window by more than 5 days

* Human event conflicts with AI scheduling — human-added event occupies date AI has identified as optimal for a different action

### **4.5.2 Two-Tier Resolution Model**

**AI-generated events:**

The AI resolves conflicts in its own events automatically. It updates the event parameters or reschedules (creating a new calendar\_events row; superseded event gets status \= 'superseded' and superseded\_by populated). A visible change indicator appears on the event in the calendar UI showing what changed and why. No notification is sent. Grower sees the change on next app open.

**Human-added events:**

The AI cannot modify human-added events. When a conflict is detected, conflict\_suggestion is populated with the AI's recommended resolution. A visible conflict indicator appears on the event in the calendar. An in-app notification and email are sent: '\[Event\] on \[date\] may conflict with \[AI event\]. TerraMind suggests \[resolution\]. View in Calendar.' No SMS. Grower opens calendar, sees suggestion, accepts (AI updates the event) or dismisses (conflict flag cleared, event unchanged). conflict\_acknowledged\_at is populated on response.

### **4.5.3 Reasoning Transparency**

When a human-added event influenced AI reasoning — whether a conflict was detected or a scheduling recommendation was shaped by a grower-entered date — the AI surfaces its reasoning in the affected event's detail view as a clearly labelled 'Why this was recommended' section. The specific human events that contributed are named.

## **4.6 Human-Editable Calendar**

Growers can add, edit, and delete events on the calendar. Human-added events use event\_type \= 'human\_added' and source \= 'human\_added'. Growers provide title, date(s), and optional notes. Block assignment is optional.

The nightly calendar population job reads all human-added events and incorporates them into scheduling logic:

* Days with human events are excluded from AI spray window and irrigation candidates

* Packhouse delivery dates (detected by title or grower tag) are factored into harvest window recommendations

* Contractor availability windows shape when AI schedules contractor-dependent events

AI-generated events are visually distinct from human-added events via colour coding, icon, and source label. The AI cannot delete or modify human-added events. Growers can modify or delete any event type.

## **4.7 Action Logging**

### **4.7.1 One-Tap Confirmation**

Grower taps the calendar event and marks it done. Recommended parameters from the event detail auto-populate the management\_actions fields. The event stays open (status \= 'active') until the grower explicitly closes it, allowing time to add notes or correct values before saving.

### **4.7.2 Voice Logging**

Grower speaks the action in the field. Voice input is transcribed and parsed by the AI into structured management\_actions fields. The parsed interpretation is shown alongside the original transcription for grower review before saving. Voice input is not stored after parsing; only the structured output and confirmation state are persisted.

Voice parsing extracts: action\_type, action\_subtype, quantity, unit, cost\_nzd (if stated), block reference, and performed\_at. If any required field cannot be parsed with confidence, that field is left blank for grower completion rather than guessed.

### **4.7.3 Inferred Logging**

See §4.8 below.

## **4.8 Inferred Logging**

### **4.8.1 Purpose and Trigger Conditions**

Inferred logging generates an inferred\_log\_prompts record and surfaces a confirmation prompt to the grower when all three of the following conditions are simultaneously true:

* TerraMind made an explicit recommendation for a specific action on a specific block

* Post-event observation data ingested since the event time confirms the predicted conditions occurred

* The grower has not logged any action for that event (no management\_actions row referencing the event\_id)

### **4.8.2 Applicable Event Types and Confirmation Signals**

| Event type | Confirmation signal | Observation source |
| :---- | :---- | :---- |
| **Frost protection** | Observed min temperature fell below frost threshold for the block | NIWA station observations ingested post-event |
| **Irrigation** | Soil moisture deficit persisted (no significant rainfall offset irrigation need) | Rainfall actuals from NIWA and Open-Meteo |
| **Spray window** | Conditions remained within suitability criteria through the window | Wind speed and precipitation actuals from NIWA |

### **4.8.3 Prompt Generation**

The inference job runs each morning. It checks all calendar\_events with status \= 'active' where scheduled\_date has passed and no linked management\_actions row exists. For events where confirmation signal conditions are met in the observations table, an inferred\_log\_prompts record is created with evidence populated as structured JSON showing the specific observations (station ID, value, timestamp, threshold compared against) and status \= 'pending'.

### **4.8.4 Prompt Surfacing and UI**

Pending inferred\_log\_prompts surface when the grower opens the app. The prompt appears as an orange prompt card at the top of the screen before any other content. Multiple pending prompts queue; one is shown at a time, oldest first.

Prompt card content:

* Headline: '\[Action type\] on \[Block name\] — did this happen?' e.g., 'Frost protection on North Block — did you run the wind machines?'

* Evidence section: plain-language summary of the observation data that triggered the inference e.g., 'NIWA Cromwell station recorded \-1.2°C at 3:14am — below the \-0.5°C frost threshold for this block'

* Two explicit buttons: 'Yes, I acted' and 'No, I didn’t'

* No passive dismiss option — grower must choose one of the two buttons

### **4.8.5 Confirmation Flow**

'Yes, I acted': a management\_actions row is created with action\_type, block\_id, performed\_at, and recommended parameters pre-filled from the calendar event detail. The grower is taken directly to the action log entry to review and optionally edit values before final save. inferred\_log\_prompts.status \= 'confirmed' and resulting\_action\_id populated on save.

'No, I didn’t': the prompt is dismissed. inferred\_log\_prompts.status \= 'rejected'. No management\_actions row is created. No follow-up question is asked. The calendar event remains open for manual logging if the grower chooses.

### **4.8.6 Data Quality Safeguard**

The prompt card design — explicit two-button choice, evidence displayed, no passive dismiss — exists to prevent passive confirmation corrupting the management\_actions record. A confirmed inferred log that is actually wrong propagates errors through the finance layer, what-if modelling, decision wins, and compounding season intelligence. The design accepts grower friction to protect data integrity. Pilot monitoring: track confirmation rate and any subsequent grower corrections to logged actions as a quality signal.

### **4.8.7 Prompt Persistence**

Pending prompts stay pending until the grower explicitly responds. They do not expire or auto-dismiss. If the grower closes the app without responding, the prompt reappears on next open. There is no maximum pending period.

## **4.9 Staff View**

A simplified read-only calendar view is available to staff. The orchard Owner generates a staff access link from Settings. Staff open the link in a browser without a TerraMind account. The view shows: today's scheduled actions per block in plain language, block name, action type, any timing notes from the event detail. No prediction data, finance information, or decision context is shown. The staff view auto-expires 24 hours after generation and must be refreshed by the Owner.

# **5\. Nightly Insight Scan**

## **5.1 Purpose**

The nightly scan is a background batch job with no direct user interface. It runs once per night, reads all prediction and observation data for all orchards, and produces two outputs: nightly\_scan\_outputs records (consumed by the weekly report pipeline) and insights records (surfaced in the Insights Feed).

## **5.2 Job Architecture**

The scan runs as a Railway cron job targeting 02:30 NZST daily — after the nightly Open-Meteo ingestion cycle completes (01:00-02:00 NZST) and before the Monday weekly report generation job fires (04:00 NZST). The scan processes all orchards in parallel up to a configured concurrency limit. Per-orchard scan time is logged to Axiom. Orchards taking more than 60 seconds trigger a warning to Axiom; more than 5 minutes trigger a Sentry alert.

## **5.3 Scan Logic: Five Finding Types**

### **5.3.1 Prediction Trajectory Changes**

For each block and each active prediction type, the scan compares the current prediction distribution to the prediction from 7 days ago via the supersedes chain in the predictions table. If the median has shifted by more than one standard deviation of the 7-day rolling change distribution for that prediction type and block, a trajectory\_change finding is recorded.

### **5.3.2 Cross-Prediction Correlations**

The scan evaluates a set of defined cross-prediction correlation rules stored as configuration in the codebase. Example rules:

* Psa risk elevated (score \> 0.6) for 5+ consecutive days AND yield trajectory softening (week-over-week median decline \> 5%)

* Frost exposure accumulating (cumulative degree-hours below 0°C \> seasonal threshold) AND irrigation deficit building

* NDVI rate of change declining across 3+ blocks of the same variety simultaneously

Rules are reviewed quarterly. New rules are added as agronomic knowledge accumulates from pilot grower feedback and Plant & Food Research literature.

### **5.3.3 Historical Comparisons**

For each block, the scan compares the current season's prediction trajectory to the same block's trajectory at the same phenological stage in each past season available (up to 10 years per §4.6 of core PRD). If the current trajectory is more than 2 standard deviations from the historical mean at this phenological stage, a historical\_anomaly finding is recorded with direction (ahead / behind) and the closest historical season identified.

### **5.3.4 Accumulating Risks**

The scan tracks risk variables that accumulate over time without breaching single-day thresholds. Variables tracked: cumulative cold exposure (degree-hours below 0°C), cumulative Psa-favourable conditions (days with risk score \> 0.4), cumulative irrigation deficit (mm). When a cumulative variable crosses a configurable threshold without having triggered a standard alert, an accumulating\_risk finding is recorded.

### **5.3.5 Unexplained Deviations**

For each block, the scan checks whether the current prediction state is consistent with what the block model predicts given current conditions. Significant residuals — actual prediction outside the 90% CI of what block\_season\_models expects given observed inputs — are flagged as unexplained\_deviation findings.

## **5.4 Output**

All findings are written to nightly\_scan\_outputs.findings as a structured JSON array. Each finding has: type, block\_id, severity (low / medium / high), headline, supporting\_data, and surface\_as\_insight boolean.

Findings with surface\_as\_insight \= true are passed to the insight generation pipeline (see §6). All findings are passed to the weekly report generation pipeline on Monday mornings.

# **6\. Insights Feed**

## **6.1 Purpose**

The Insights Feed is a dedicated tab in the TerraMind application surfacing AI-identified patterns worth the grower's attention that would not trigger a standard threshold alert. Distinct from the Alerts system (§11.2 of core PRD): alerts fire on threshold breach; insights surface when the AI identifies something non-obvious across multiple data points.

## **6.2 Insight Generation Pipeline**

6. Nightly scan produces findings with surface\_as\_insight \= true

7. Relevance scorer evaluates each finding; findings below minimum relevance\_score threshold are not surfaced (threshold initially conservative; calibrated against pilot grower engagement data)

8. For findings above threshold, Gemma 4 generates insight headline and body from the structured finding data

9. Generated insight written to insights table with surfaced\_at populated

10. Insight appears in the grower's feed on next app open

## **6.3 Relevance Filter**

A finding generates an insight only if it meets all of:

* The pattern is not visible to a grower monitoring individual prediction dashboards — it requires cross-block, cross-time, or cross-variable reasoning

* The finding has a plausible economic consequence — it connects to a prediction type with known financial implications

* The finding is not already covered by an active alert — no duplicate surfacing of threshold-breach events

* The relevance\_score exceeds the configured minimum

## **6.4 Feed UI**

Insights shown in reverse chronological order. Each card: headline, block(s) affected, insight type icon, age. Tapping an insight opens the full body with supporting data visualised using the standard probability visualisation primitives (§7.6.2 of core PRD). A dismiss control removes the insight from the feed (sets dismissed\_at). Dismissed insights are not shown again. A badge count on the Insights tab icon shows unread insight count.

Empty state: 'No new insights — TerraMind is watching your orchard.' The empty state is the expected state most days; it should not feel like a failure.

# **7\. AI Agronomist Persona**

## **7.1 Purpose**

The AI agronomist persona is the reasoning capability behind every AI feature in this document. It is not a UI surface, a named entity, or a standalone product feature. It is the context assembly and LLM reasoning layer that makes reports richer, insights more accurate, checklists more relevant, and Ask TerraMind more capable.

## **7.2 Context Assembly**

The persona assembles context on demand. When any AI feature requires reasoning, the context assembler builds a JSON bundle from:

* Full prediction history for the relevant block(s) via the predictions table, including the supersedes chain

* All management\_actions for the block(s) current season

* block\_season\_models record for the block — compounding intelligence

* Historical season summaries — prior season debrief content from reports table

* Finance layer outputs — current expected revenue and risk exposure

* Current nightly\_scan\_outputs findings

Context is scoped to what is relevant for the specific query. An Ask TerraMind question about frost receives frost prediction history and frost-related management actions. It does not receive the full Psa history unless relevant. Context scoping reduces token usage and improves response quality.

## **7.3 Ask TerraMind Enhancement**

The existing Ask TerraMind free-text interface per block (§7.2.3 of core PRD) is unchanged in its UI. The underlying capability is substantially enhanced: the persona now receives full block history rather than the limited context available in the original specification. Response quality improves automatically with no UI change required.

## **7.4 Competence Boundary Enforcement**

The LLM is explicitly instructed in every prompt to refuse questions outside its competence. Refusal conditions:

* Question requires data not available in the context bundle and not retrievable from the database

* Question requires agrochemical product-specific advice (MPI regulatory scope; §9.6.3 of core PRD)

* Question requires personalised financial or legal advice (FMA scope; §9.6.1 of core PRD)

* Question requires certainty the model cannot honestly provide given available data

Refusal response format: 'TerraMind doesn’t have enough data to give you a reliable answer here. We recommend speaking with your agronomist / adviser.' Refusals are logged in the reports table for review during the pilot.

## **7.5 Identity**

The persona has no name, no avatar, no personality beyond TerraMind's existing tone of voice (§7.6.6 of core PRD). All outputs are attributed to TerraMind. Growers interact with the product, not an AI character.

# **8\. Decision Confidence Scoring**

## **8.1 Purpose**

Decision confidence scoring provides a meta-layer above the raw prediction probability. Where the prediction layer answers 'what is likely to happen,' decision confidence answers 'how confident should the grower be in the recommendation to act.'

## **8.2 Three-Tier System**

| Tier | Conditions | Display |
| :---- | :---- | :---- |
| **High** | Multiple forecast models agree; block history supports prediction; economic margin large relative to uncertainty | Green indicator; 'High confidence' label |
| **Medium** | Forecast models partially agree; some block-specific uncertainty; meaningful economic margin | Amber indicator; 'Medium confidence' label |
| **Marginal** | High model spread; limited block history or contradictory signals; small economic margin relative to uncertainty | Grey indicator; 'Marginal — your call' label |

The tier label is the default display. Plain-language explanation is available on tap, generated by the AI from the scoring inputs. Example: 'High confidence because ECMWF, GFS, and ICON all predict minimum temperatures below \-0.5°C tonight (3/4 models agree), North Block has a history of frost in these conditions (3 prior events), and the net expected value of protection ($22,800) is large relative to the protection cost ($1,200).'

## **8.3 Scoring Inputs**

* Model agreement — number of ensemble forecast models within 1 standard deviation of each other on the key variable; expressed as a ratio

* Block history support — whether the block's historical response to similar conditions is consistent with the current prediction; derived from block\_season\_models

* Economic margin — ratio of net expected value of acting to uncertainty in that estimate

## **8.4 Where It Appears**

Decision confidence score appears on every actionable recommendation: frost protection events in the calendar, spray window events, irrigation events, and the Daily Briefing decision list. It does not appear on informational events (phenological milestones, harvest window when more than 3 weeks out).

# **9\. Season Trajectory Narrative**

## **9.1 Purpose**

The season trajectory narrative synthesises all active prediction types into a single plain-language picture of where the season is heading as a whole. Individual predictions tell growers what is happening on one dimension; the narrative tells them what is happening to their season.

## **9.2 Generation**

Generated as part of the weekly report pipeline. It is the first section of the weekly report. Context bundle contains:

* Current prediction state for all prediction types across all blocks

* Week-over-week prediction trajectory changes

* Historical trajectory comparison — current season vs. prior seasons at the same phenological stage

* Finance layer summary — current expected revenue trajectory

* Key findings from the nightly scan

## **9.3 Content Specification**

Four elements, each a single sentence or short paragraph:

* Season trajectory assessment — ahead of, behind, or in line with expectations; grounded in historical comparison

* Primary driver — the single factor most influencing the season's current direction

* Key watch item — the most important risk or opportunity in the coming two weeks

* Forward outlook — one sentence; where the season is heading if current conditions persist; honest about uncertainty

## **9.4 Tone**

Warm-direct (§7.6.6 of core PRD). Written for a grower on a Monday morning, not a technical audience. Uncertainty acknowledged naturally ('if the current wet pattern continues') not with formal probability notation.

# **10\. Pre-Decision Checklist**

## **10.1 Purpose**

The pre-decision checklist surfaces contextual information a grower should consider before acting on a recommendation. It appears automatically when a grower opens an actionable event detail view — the act of opening the view is treated as a signal of intent.

## **10.2 Checklist Generation**

Generated dynamically at the time the detail view is opened. Context bundle:

* Current prediction state for the event's block and prediction type

* Upcoming forecast update schedule — when the next ECMWF and Open-Meteo cycles are due

* Recent management\_actions for the block — last 7 days

* Forecast model agreement data — spread across ensemble members

* Economic sensitivity — EV of acting relative to total expected block revenue

Gemma 4 evaluates this bundle against the specific event type and generates checklist items. Each item has a type (forecast\_update | conflicting\_signal | recent\_action | economic\_context) and a plain-language description.

## **10.3 Display**

Checklist items appear below the recommendation and confidence score under the heading 'Before you decide.' Items shown as a bulleted list with the AI synthesis visual treatment (amber left border, 'AI synthesis' label). Maximum 3 items displayed; if more are generated, the 3 most relevant are selected by relevance score. The 'Before you decide' section is not shown if no items meet the relevance threshold. Not shown for informational events.

# **11\. Prediction Track Record and Decision Wins**

## **11.1 Purpose**

Trust in TerraMind's recommendations is built through demonstrated accuracy over time. Track record and wins surfaces show growers how accurate TerraMind has been on their specific blocks and surface instances where following a recommendation led to a measurable positive outcome. Losses — where TerraMind was wrong — are not surfaced here. Aggregate accuracy including misses is reported on the public calibration page.

## **11.2 Prediction Track Record**

Per-block track record is computed from the predictions table. For each resolved prediction (outcome data available), the prediction is compared to the observed outcome. Track record statistics are computed per prediction type:

* 'When TerraMind predicted frost probability above X% on this block, frost occurred Y% of the time (N predictions)'

* Sample size is always shown. N \< 5 is explicitly flagged as insufficient for reliable track record

* Track record compounds every season; statistically meaningful after approximately 3 seasons

## **11.3 Decision Wins**

A decision\_wins record is created when:

* TerraMind recommended a protective action on a specific block

* The grower logged that they took the action

* Post-event observation data confirms the predicted risk condition occurred

Estimated value protected is computed from the finance layer — predicted loss without protection applied to the actual observed severity. Stored with P25 and P75 uncertainty bounds.

Win card format: '\[Action taken\] on \[Block\] on \[Date\]. \[Event\] occurred. Estimated value protected: \~$\[P50\] (range $\[P25\]–$\[P75\]).'

## **11.4 Surfaces**

* Per-block historical panel — accessible from the per-block view throughout the season; running track record statistics and most recent 5 win cards

* Season debrief — full season win compilation with total estimated value protected and full track record summary

# **12\. Compounding Season Intelligence**

## **12.1 Purpose**

Every season a grower uses TerraMind, predictions for their specific blocks become more accurate. The engine builds block-level models from accumulated seasonal observations. It is a background process with no direct user interface.

## **12.2 Four Model Components**

### **12.2.1 Microclimate Corrections**

Compares actual observed temperature and humidity at the block to the regional forecast. Learns the systematic deviation pattern for this block under different synoptic condition types (clear nights, advection fog, north-westerly flow, etc.). Stored as correction factors in block\_season\_models.microclimate\_corrections. Applied by the frost prediction model when generating block-level predictions.

### **12.2.2 Disease Pressure Antecedents**

Correlates historical Psa risk score time series with lagged weather variables to identify which antecedent conditions predict elevated disease pressure on this specific block. Block-level because aspect, shelter, and microclimate affect leaf wetness patterns independently of regional conditions.

### **12.2.3 Yield-Weather Response**

Builds a block-specific yield sensitivity model: how yield on this block responds to weather patterns at each phenological stage. Calibrated against grower-confirmed yield outcomes from management\_actions (harvest entries). Requires at least 2 seasons of confirmed yield data; before that, the regional model from §5.4.3 of core PRD is used.

### **12.2.4 Irrigation Response**

Learns the actual soil moisture evolution on this block under different rainfall and ET conditions, correcting the FAO-56 model for this block's specific soil properties and drainage characteristics. Calibrated against irrigation actions in management\_actions.

## **12.3 Switching Cost**

The compounding model is the most significant structural switching cost in the TerraMind product. A grower who leaves after three seasons leaves behind three seasons of block-specific calibration that no competitor can access or replicate without observing the same block through the same seasons.

# **13\. Daily Briefing Tab**

## **13.1 Purpose**

The Daily Briefing Tab is the grower's first stop when they open TerraMind each morning. It consolidates everything that needs attention today in a single, scannable surface. Pull only — no notification is sent; growers open it as part of their morning routine.

## **13.2 Generation**

Generates once per day at a configurable time (default: 05:00 NZST). Does not update continuously through the day. The generation job reads:

* Current prediction state for all blocks — all active prediction types

* calendar\_events for today — AI-generated and human-added events scheduled for today

* Finance layer outputs — any covenants approaching breach, significant revenue changes

* insights — any high-severity insights generated overnight

Pending inferred\_log\_prompts are not embedded in the briefing content. They surface separately as orange prompt cards shown before the briefing content when the grower opens the app.

## **13.3 Content: Today's Decisions**

Lists every decision requiring grower attention today, ranked by economic impact (highest first). For each decision:

* What the decision is — plain language headline

* Why it matters today — one-sentence AI reasoning

* TerraMind's recommendation — with decision confidence tier

* Expected economic impact — EV of acting vs. not acting

* Link to full calendar event detail

Maximum 5 decisions shown. If more than 5 are present, the top 5 by economic impact are shown with a 'See all' option. Marginal confidence decisions carry a visual indicator distinguishing them from high/medium confidence recommendations.

## **13.4 Content: Staff Briefing**

AI-generated plain-language summary of today's activities written for farm staff. Second-person voice ('Today on the orchard...'). Covers: which blocks have actions scheduled today, what the weather risk is, and any important conditions to be aware of. No technical terminology.

The grower copies this text and distributes through their own channel. TerraMind provides the content; grower controls distribution. No outbound messaging from the platform.

# **14\. Risk-Weighted Season Planning**

## **14.1 Purpose**

Before the season starts, the grower sees their risk profile for the coming season as a probability distribution over the outcomes that matter. Not a point forecast — a full Monte Carlo simulation over plausible season scenarios, providing quantified risk for planning and financing conversations.

## **14.2 Simulation Engine**

The simulation runs at the start of each season (triggered by the pre-season report generation job) and on demand when the grower accesses the live season view. Produces a season\_simulations record per orchard and block. Monte Carlo approach:

11. Sample N \= 5,000 weather scenarios from historical climate variability for the orchard's region (drawn from the 10-year NIWA observation archive)

12. For each scenario, run the full prediction model suite (frost, Psa, yield, irrigation) using block\_season\_models corrections for this specific block

13. Compute financial outcomes for each scenario using the finance layer economic parameters

14. Aggregate across all scenarios to produce output distributions

## **14.3 Outputs**

* P(at least one significant frost event before a given date) — 'significant' defined as causing \>5% yield loss at the crop-specific damage threshold

* P(Psa pressure exceeds treatment threshold one or more times)

* Yield distribution at harvest — P5/P25/P50/P75/P95 in kg/ha

* Revenue distribution — P5/P25/P50/P75/P95 in NZD

* P(revenue below loan covenant threshold) — null if no covenant configured in orchard\_settings

## **14.4 Surfaces**

* Pre-season report — primary surface; full distribution with recommended preparatory actions based on risk profile

* Live season view — accessible from the dashboard throughout the season; updated weekly as early-season predictions resolve and the remaining risk distribution narrows

## **14.5 Update Cadence During Season**

The simulation is re-run weekly from month two of the season onward. As actual weather observations replace simulated weather for the elapsed portion, the remaining risk distribution narrows. The live season view always shows the current remaining distribution, not the original pre-season distribution.

# **15\. Cross-Season What-If Modelling**

## **15.1 Purpose**

Shows growers what their cumulative returns would have looked like if they had always followed TerraMind's recommendations. The figure is specific to their blocks, their seasons, their decisions — it cannot be made generically and cannot be replicated by a competitor.

## **15.2 Reconstruction Logic**

For each season where TerraMind has prediction data for the orchard:

15. Identify all decision points: moments where a recommendation was made and the grower either followed or diverged from it

16. For divergences — grower did not follow the recommendation — apply the counterfactual using the finance layer's prediction distributions and economic parameters from that point in time

17. For followed recommendations, verify the outcome was positive (decision\_wins record exists). If no win record exists (outcome data unavailable), the decision point is excluded

18. Sum the estimated value difference across all decision points for the season

## **15.3 Honest Framing**

Counterfactual estimates carry inherent uncertainty. Display format: 'If you had followed TerraMind's recommendations throughout this season, we estimate you would have been approximately $\[P50\] better off (range $\[P25\]–$\[P75\]).' The methodology is available on tap. The framing always uses 'we estimate' and 'approximately.' Confidence interval is always shown alongside the point estimate.

## **15.4 Surfaces**

* Season debrief — dedicated section for the current season's what-if analysis

* Multi-season cumulative view — as additional seasons accumulate, expands to show cumulative analysis across all seasons; total estimated cumulative benefit displayed prominently

# **16\. Future Features (v2)**

## **16.1 Optimal Decision Threshold Personalisation**

In v1 the platform applies a universal risk-averse posture regardless of grower financial position. This is the correct v1 default.

In v2, as grower financial data accumulates through Xero integration and loan covenant tracking, the platform will personalise recommendation thresholds to each grower's specific financial position. A heavily leveraged grower receives earlier, more conservative recommendations. A grower with strong financial headroom receives recommendations calibrated to their actual risk capacity.

Architectural requirement on v1: the decision confidence scoring system (§8) must be built to accept a per-grower threshold parameter that defaults to the universal risk-averse value. The parameter slot exists in v1 code; personalised values populate it in v2.

## **16.2 Cross-Grower Pattern Detection**

Identifies signals visible across multiple growers' blocks simultaneously that are not detectable from any single grower's data. Surfaced to all affected growers via the Insights Feed.

Operates on de-identified, aggregated data only. Individual grower block data is never exposed to other growers. Operates within the existing data license (§3.11 of core PRD). Legal review required before v2 build begins.

## **16.3 WhatsApp Action Logging**

Grower sends a WhatsApp message describing a completed action. AI parses it into a structured management\_actions row and surfaces a confirmation prompt in the app. Requires WhatsApp Business API integration. Deferred because voice logging covers the core in-field friction point.

# **17\. Integration with Core Platform**

## **17.1 New Railway Services**

The AI layer adds two new Railway services alongside the existing three (data ingestion, prediction engine, application API):

* AI generation service — handles all LLM calls: report generation, insight synthesis, narrative generation, checklist population, Ask TerraMind responses. Stateless; scales independently. Reads from the database; writes completed outputs back. Logs all LLM calls (model version, prompt version, token usage, latency) to Axiom.

* Background intelligence service — handles nightly scan, calendar population, conflict detection, inferred log prompt generation, compounding model updates, season simulation. All cron-driven via Railway cron jobs.

## **17.2 API Additions**

New endpoints added to the application API service:

GET    /reports                           — list reports for orchard

GET    /reports/:id                       — get report content

POST   /reports/generate                  — trigger on-demand generation (agronomist report)

GET    /reports/:id/pdf                   — download PDF

GET    /calendar                          — list calendar events for orchard

POST   /calendar/events                   — create human-added event

PUT    /calendar/events/:id               — update event

DELETE /calendar/events/:id               — delete event

POST   /calendar/events/:id/log           — log action against event (one-tap)

POST   /calendar/events/:id/log/voice     — submit voice input for parsing

GET    /inferred-prompts                  — list pending prompts for orchard

POST   /inferred-prompts/:id/confirm      — confirm inferred action

POST   /inferred-prompts/:id/reject       — reject inferred prompt

GET    /insights                          — list insights for orchard

POST   /insights/:id/dismiss              — dismiss insight

GET    /daily-briefing                    — get today's briefing for orchard

GET    /season-simulation/:block\_id       — get current simulation for block

GET    /track-record/:block\_id            — get prediction track record for block

GET    /decision-wins                     — list wins for orchard

## **17.3 Frontend Navigation**

| Tab | Status | Notes |
| :---- | :---- | :---- |
| **Dashboard** | Existing | Unchanged from core PRD §7.2.2; gains decision confidence indicators on recommendation cards |
| **Daily Briefing** | New | Pull only; inferred log prompts surface as overlay before briefing content |
| **Calendar** | New | AI Season Planner; near-term and full-season horizons; human-editable |
| **Insights** | New | Proactive insight feed; pull only; unread badge count on tab icon |
| **Reports** | New | All four report types; list view; PDF download |
| **Alerts** | Existing | Unchanged from core PRD §11.2 |
| **Settings** | Existing | Gains: supplier price overrides, staff access link, season debrief date, labour rate config |

# **18\. Risks and Open Questions**

## **18.1 FMA Regulatory Boundary**

The AI agronomist persona, variable-rate recommendations, labour cost estimates, and decision economics throughout the AI layer edge toward personalised advice territory.

Risk: product evolution in this direction could trigger FMA financial advice provider registration (§9.6.1 of core PRD) or MPI agrochemical advice scope (§9.6.3 of core PRD).

Mitigation: persistent 'not financial advice' disclaimer on all finance outputs (§6.3 of core PRD). Competence boundary enforcement (§7.4). Labour planning estimates framed explicitly as starting points for contractor conversations. Legal review of the full AI feature set recommended before launch.

## **18.2 LLM Output Quality**

Gemma 4 powers narrative and reasoning outputs across all features. Risk: hallucinated figures, incorrect economic data, or confidently wrong recommendations.

Mitigation: grounding discipline (§2.2) ensures LLM never computes figures — it narrates structured data. Prompt versioning and testing against real NZ horticultural scenarios before launch. Output schema validation with structured fallback on failure (§3.3). Visual distinction (§2.4). Grower confirmation before any action (§2.3).

## **18.3 Inferred Logging Data Integrity**

An incorrectly confirmed inferred log corrupts management\_actions and propagates errors through the finance layer, what-if modelling, decision wins, and compounding season intelligence.

Mitigation: prompt card design requires explicit two-button response with evidence displayed (§4.8.4). No passive dismiss. Pilot monitoring: track confirmation rate and any subsequent grower corrections as a quality signal.

## **18.4 Product Scope Risk — Management App Drift**

This document contains features that sit at the boundary of TerraMind's core positioning as a probabilistic forecasting and decision-support platform. The test: does the feature exist because of a TerraMind prediction?

Clearly within scope — exist entirely because of predictions: all forecasting intelligence features (§8–15), reports, insights feed, daily briefing, nightly scan, AI agronomist persona.

At the boundary: the AI Season Planner/Calendar. Spray windows, frost protection nights, irrigation events, scouting events, and harvest windows are direct prediction outputs. Labour planning estimates, spray volume calculations, and human-editable general events extend into operational management territory that AgriSmart and similar tools already serve.

This tension is documented for co-founder review before build. The calendar is specified in full in this document. Co-founders should decide whether the full calendar scope is the right product decision or whether the calendar should be scoped back to prediction-driven events only. This document does not resolve that decision; it makes it explicit.

## **18.5 Calendar Full-Season Accuracy**

Full-season calendar events are generated months in advance with inherently wide uncertainty. Risk: growers treating approximate full-season events as high-confidence commitments.

Mitigation: confidence\_horizon field drives mandatory visual distinction in the UI. Onboarding explicitly explains the two horizons. The calendar UI must make it impossible to mistake a full\_season event for a near\_term event.

## **18.6 Season Simulation Compute Time**

N=5,000 Monte Carlo scenarios per block may exceed acceptable compute time at scale. Target: \<60 seconds per orchard. If exceeded, N may need to be reduced or the simulation moved to async with a progress indicator in the pre-season report.

## **18.7 Open Questions**

* Gemma 4 prompt engineering for agronomic domain — all prompts require testing against NZ horticultural scenarios before launch; no prompt ships untested against real block data

* Relevance scoring threshold for insights — initial threshold set conservatively; requires calibration against pilot grower engagement data

* Compounding model update cadence during season — weekly recommended; frequency vs. compute cost to be determined in implementation

* Legal review of full AI feature set against FMA and MPI scope — recommended before launch

* Staff view access model — 24-hour link expiry is current spec; may need adjustment based on pilot grower feedback

* Cross-grower pattern detection data license confirmation — legal review required before v2 build begins

# **19\. Roadmap**

## **19.1 Initial AI Release**

* Reports Tab — weekly, pre-season, season debrief (with Financial Deep Dive), agronomist report

* AI Season Planner/Calendar — all six event types, event detail views, conflict detection, human-editable events, staff view

* Action Logging — one-tap, voice, and inferred logging

* Nightly Insight Scan — five finding types

* AI Agronomist Persona — context assembly, Ask TerraMind enhancement, competence boundary enforcement

* Daily Briefing Tab — decisions and staff briefing

* Insights Feed — proactive insight generation and surfacing

* Decision Confidence Scoring — three-tier system on all actionable recommendations

* Season Trajectory Narrative — weekly report section

* Pre-Decision Checklist — dynamic context on recommendation detail views

* Prediction Track Record and Decision Wins — per-block and season debrief

* Compounding Season Intelligence — background engine

* Risk-Weighted Season Planning — pre-season report and live season view

* Cross-Season What-If Modelling — season debrief section

## **19.2 v2 AI Additions**

* Optimal decision threshold personalisation — requires Xero integration maturity and financial position data

* Cross-grower pattern detection — requires legal review and sufficient cohort size

* WhatsApp action logging — requires WhatsApp Business API integration

* Forecast meta-model — learned weighting of forecast sources by microregion skill; requires 1+ seasons post-launch

* NDVI anomaly detection as standalone prediction type — currently within nightly scan; v2 promotes to full prediction type

# **Appendix A: Document Changelog**

| Version / Date | Changes |
| :---- | :---- |
| **v1.0 — June 2026** | Initial document: five core AI features, high-level specification |
| **v2.0 — June 2026** | Full technical rewrite to PRD depth: schemas, API contracts, UI patterns, implementation detail. Added forecasting intelligence features (§8–15), inferred logging full spec, calendar spec in full, scope risk section. |

# **Appendix B: Decisions Log**

| Area | Decision |
| :---- | :---- |
| **LLM provider** | Gemma 4 via OpenRouter on Railway; supersedes Claude references in core PRD §5.4.5 and §8.1 |
| **LLM grounding discipline** | LLM narrates structured data; never computes figures; context bundle assembled from database before every call |
| **AI identity** | No named persona; no avatar; operates as TerraMind throughout |
| **Visual distinction** | Three tiers: structured model output (default), AI-synthesised (amber border \+ label), AI-inferred action (orange prompt card) |
| **Report notification** | Push \+ email on completion for weekly and pre-season; on-demand for agronomist; pull only for daily briefing |
| **Report distribution** | PDF download only; grower distributes themselves; no external share links |
| **Season debrief trigger** | Grower sets date; prompted at season start and again at harvest if not set |
| **Agronomist report trigger** | On-demand any time; grower selects blocks; all blocks default |
| **Financial Deep Dive** | Self-contained section in season debrief; forward projection included; 'not financial advice' disclaimer at top |
| **Calendar horizons** | Full season arc (full\_season, approximate) and rolling 14-day (near\_term, specific); same surface, visually distinct |
| **Calendar population** | AI populates from day one; grower baseline preferences optional; stored in orchard\_settings |
| **Conflict resolution** | AI adjusts own events automatically with change indicator; human events get suggestion \+ in-app \+ email; no SMS for conflicts |
| **Human calendar events** | AI reads all; factors into scheduling; cannot modify without confirmation; surfaces reasoning when human events influence recommendations |
| **Spray event detail** | Consolidated volume across blocks as default; per-block on tap; industry average pricing default; grower override in orchard\_settings |
| **Harvest event detail** | Labour planning included; confidence intervals shown; framed as starting point for contractor conversations |
| **Action logging** | One-tap, voice (transcribe \+ parse \+ confirm), inferred logging; all write to management\_actions on grower confirmation |
| **Inferred logging trigger** | Three conditions required: recommendation made, post-event data confirms conditions occurred, no action logged for event |
| **Inferred prompt timing** | Surfaces on app open; persists until grower responds; no expiry |
| **Inferred prompt rejection** | Closes silently; event remains unlogged; no follow-up question |
| **Inferred prompt design** | Explicit two-button choice; evidence displayed; no passive dismiss |
| **Decision confidence scoring** | Three-tier: high / medium / marginal; inputs: model agreement, block history support, economic margin; explanation on tap |
| **SMS scope** | Reserved for urgent immediate-action alerts only: severe weather, frost at critical threshold |
| **Insights feed** | Dedicated tab; pull only; relevance filter; quality over quantity; empty state is expected |
| **Track record and wins** | Wins only surfaced; aggregate accuracy with misses on public calibration page; sample sizes always shown |
| **Compounding intelligence** | Background engine only; four components: microclimate, disease, yield-weather, irrigation |
| **Risk-weighted planning** | N=5,000 Monte Carlo; pre-season report primary; live season view updates weekly |
| **Cross-season what-if** | P25/P50/P75 confidence intervals; 'we estimate' framing mandatory; never presented as precise figures |
| **Threshold personalisation** | v2; universal risk-averse posture in v1; parameter slot in v1 code defaulting to universal value |
| **Scope risk** | Calendar flagged as primary management app drift risk; co-founders to resolve before build |

TerraMind AI Layer PRD v2.0  •  Confidential