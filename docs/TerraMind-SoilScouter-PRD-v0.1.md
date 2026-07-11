

**TerraMind**  
**Soil Scouter**  
Hardware & Software Product Requirements Document

Addendum to TerraMind AI Layer PRD v2.0  
Version 0.1-DRAFT  |  June 2026  
Confidential — Internal Use Only

**⚠  DRAFT — FOR REVIEW ONLY  ⚠  All component prices, specifications, and timelines are indicative and subject to change.**

**Authors**  
Aaqib Aadil Sharif — Co-founder, Hardware | Hasan Sheikh — Co-founder, Software

# **Table of Contents** {#table-of-contents}

[Table of Contents	2](#table-of-contents)

[1\. About This Document	5](#1.-about-this-document)

[1.1 Purpose	5](#1.1-purpose)

[1.2 Scope	5](#1.2-scope)

[1.3 Relationship to TerraMind AI Layer PRD v2.0	5](#1.3-relationship-to-terramind-ai-layer-prd-v2.0)

[1.4 Conventions	6](#1.4-conventions)

[1.5 Draft Status	6](#1.5-draft-status)

[2\. Product Definition	7](#2.-product-definition)

[2.1 What Is the Soil Scouter	7](#2.1-what-is-the-soil-scouter)

[2.2 Parameters Measured	7](#2.2-parameters-measured)

[2.3 Measurement Limitations and Honest Framing	7](#2.3-measurement-limitations-and-honest-framing)

[2.4 Scope: What the Soil Scouter Is Not	7](#2.4-scope:-what-the-soil-scouter-is-not)

[3\. System Architecture	9](#3.-system-architecture)

[3.1 High-Level Architecture	9](#3.1-high-level-architecture)

[3.2 Data Flow	9](#3.2-data-flow)

[3.3 Communication Topology	9](#3.3-communication-topology)

[4\. Hardware Architecture	11](#4.-hardware-architecture)

[4.1 Subsystem Block Diagram	11](#4.1-subsystem-block-diagram)

[4.2 Design Decisions	11](#4.2-design-decisions)

[5\. Component Specifications	13](#5.-component-specifications)

[5.1 MCU / Radio Module — Heltec WiFi LoRa 32 V3	13](#5.1-mcu-/-radio-module-—-heltec-wifi-lora-32-v3)

[5.2 Soil Sensor — 7-in-1 RS485 Modbus Probe	13](#5.2-soil-sensor-—-7-in-1-rs485-modbus-probe)

[5.3 RS485 Transceiver — SP3485E	14](#5.3-rs485-transceiver-—-sp3485e)

[5.4 Power Subsystem	14](#5.4-power-subsystem)

[5.4.1 Li-Ion Cells — 18650 3000 mAh	14](#5.4.1-li-ion-cells-—-18650-3000-mah)

[5.4.2 Solar Panel — 6V / 2W Mini Monocrystalline	15](#5.4.2-solar-panel-—-6v-/-2w-mini-monocrystalline)

[5.4.3 CN3791 Solar MPPT Charger Module	15](#5.4.3-cn3791-solar-mppt-charger-module)

[5.4.4 MT3608 5V Step-Up (Boost) Converter	15](#5.4.4-mt3608-5v-step-up-\(boost\)-converter)

[5.5 Ambient Environmental Sensor — SHT31	16](#5.5-ambient-environmental-sensor-—-sht31)

[5.6 Status LED — RGB 5mm Common Cathode	16](#5.6-status-led-—-rgb-5mm-common-cathode)

[5.7 Enclosure — IP65 ABS Junction Box	16](#5.7-enclosure-—-ip65-abs-junction-box)

[5.8 Passive Components and Ancillaries	17](#5.8-passive-components-and-ancillaries)

[6\. Electrical Design	19](#6.-electrical-design)

[6.1 Power Distribution Architecture	19](#6.1-power-distribution-architecture)

[6.2 Power Budget Analysis	19](#6.2-power-budget-analysis)

[6.3 GPIO Pin Assignment — Heltec WiFi LoRa 32 V3	20](#6.3-gpio-pin-assignment-—-heltec-wifi-lora-32-v3)

[6.4 RS485 Modbus Register Map	20](#6.4-rs485-modbus-register-map)

[7\. Mechanical Design	22](#7.-mechanical-design)

[7.1 Enclosure Layout	22](#7.1-enclosure-layout)

[7.2 Soil Probe Deployment	22](#7.2-soil-probe-deployment)

[7.3 Solar Panel Mounting	22](#7.3-solar-panel-mounting)

[7.4 Weatherproofing Checklist	22](#7.4-weatherproofing-checklist)

[8\. Firmware Architecture	24](#8.-firmware-architecture)

[8.1 Firmware Stack	24](#8.1-firmware-stack)

[8.2 Boot Sequence	24](#8.2-boot-sequence)

[8.3 Modbus RTU Implementation	25](#8.3-modbus-rtu-implementation)

[8.4 Data Sampling and Averaging	25](#8.4-data-sampling-and-averaging)

[8.5 Deep Sleep and Power Management	25](#8.5-deep-sleep-and-power-management)

[8.6 Communication — WiFi and LoRa	25](#8.6-communication-—-wifi-and-lora)

[8.6.1 WiFi Path	25](#8.6.1-wifi-path)

[8.6.2 LoRa / LoRaWAN Path	26](#8.6.2-lora-/-lorawan-path)

[8.7 OTA Firmware Updates	26](#8.7-ota-firmware-updates)

[8.8 Local AP Configuration Mode	26](#8.8-local-ap-configuration-mode)

[8.9 LED State Machine	26](#8.9-led-state-machine)

[8.10 Watchdog and Error Handling	27](#8.10-watchdog-and-error-handling)

[9\. Connectivity & Communication Specification	28](#9.-connectivity-&-communication-specification)

[9.1 Device Registration	28](#9.1-device-registration)

[9.2 HTTPS Payload Specification	28](#9.2-https-payload-specification)

[9.3 LoRaWAN Binary Payload	28](#9.3-lorawan-binary-payload)

[10\. Data Schema & API Integration	30](#10.-data-schema-&-api-integration)

[10.1 New Database Tables	30](#10.1-new-database-tables)

[10.1.1 soil\_scouter\_devices	30](#10.1.1-soil_scouter_devices)

[10.1.2 soil\_readings	30](#10.1.2-soil_readings)

[10.2 API Endpoints	31](#10.2-api-endpoints)

[11\. Software Integration with TerraMind Platform	32](#11.-software-integration-with-terramind-platform)

[11.1 Data Ingestion Service Modifications (Railway)	32](#11.1-data-ingestion-service-modifications-\(railway\))

[11.2 Nightly Insight Scan Integration (AI PRD §5)	32](#11.2-nightly-insight-scan-integration-\(ai-prd-§5\))

[11.2.1 Soil Moisture Accumulating Deficit	32](#11.2.1-soil-moisture-accumulating-deficit)

[11.2.2 EC Anomaly Cross-Block	32](#11.2.2-ec-anomaly-cross-block)

[11.3 Irrigation Prediction Engine Integration (Core PRD §5.4.4)	32](#11.3-irrigation-prediction-engine-integration-\(core-prd-§5.4.4\))

[11.4 Compounding Season Intelligence Integration (AI PRD §12)	32](#11.4-compounding-season-intelligence-integration-\(ai-prd-§12\))

[11.5 Dashboard and UI Integration	32](#11.5-dashboard-and-ui-integration)

[11.5.1 Block Detail View — Soil Panel	33](#11.5.1-block-detail-view-—-soil-panel)

[11.5.2 Settings — Soil Scouters Page	33](#11.5.2-settings-—-soil-scouters-page)

[11.6 Alert Thresholds	33](#11.6-alert-thresholds)

[12\. Calibration Protocol	34](#12.-calibration-protocol)

[12.1 Overview	34](#12.1-overview)

[12.2 Laboratory Calibration (Recommended at Deployment)	34](#12.2-laboratory-calibration-\(recommended-at-deployment\))

[12.3 pH and EC Field Calibration	34](#12.3-ph-and-ec-field-calibration)

[12.3.1 pH Calibration	34](#12.3.1-ph-calibration)

[12.3.2 EC Calibration	34](#12.3.2-ec-calibration)

[12.4 Calibration Drift Monitoring	34](#12.4-calibration-drift-monitoring)

[13\. Testing Protocol	35](#13.-testing-protocol)

[13.1 Phase 1 — Electronics and Bench Testing	35](#13.1-phase-1-—-electronics-and-bench-testing)

[13.2 Phase 2 — Firmware Unit Tests (on-device)	36](#13.2-phase-2-—-firmware-unit-tests-\(on-device\))

[13.3 Phase 3 — Environmental Testing	36](#13.3-phase-3-—-environmental-testing)

[13.4 Phase 4 — Field Validation (Pilot Orchard)	36](#13.4-phase-4-—-field-validation-\(pilot-orchard\))

[13.5 Phase 5 — Integration Testing with TerraMind Platform	37](#13.5-phase-5-—-integration-testing-with-terramind-platform)

[13.6 Acceptance Criteria Summary	37](#13.6-acceptance-criteria-summary)

[14\. Prototype Build Guide	39](#14.-prototype-build-guide)

[14.1 Sequence Overview	39](#14.1-sequence-overview)

[14.2 PCB Assembly	39](#14.2-pcb-assembly)

[14.3 Firmware Flash	39](#14.3-firmware-flash)

[14.4 Enclosure Assembly	39](#14.4-enclosure-assembly)

[14.5 Device Configuration via AP Mode	40](#14.5-device-configuration-via-ap-mode)

[14.6 Field Deployment	40](#14.6-field-deployment)

[15\. Regulatory Considerations	41](#15.-regulatory-considerations)

[15.1 Radio Frequency Compliance — New Zealand	41](#15.1-radio-frequency-compliance-—-new-zealand)

[15.2 Electrical Safety	41](#15.2-electrical-safety)

[15.3 IP Rating	41](#15.3-ip-rating)

[15.4 Data and Privacy	41](#15.4-data-and-privacy)

[16\. Risks and Open Questions	42](#16.-risks-and-open-questions)

[17\. Development Roadmap	44](#17.-development-roadmap)

[17.1 Phase 0 — Design Validation (2 weeks)	44](#17.1-phase-0-—-design-validation-\(2-weeks\))

[17.2 Phase 1 — Prototype Build and Bench Testing (3 weeks)	44](#17.2-phase-1-—-prototype-build-and-bench-testing-\(3-weeks\))

[17.3 Phase 2 — Environmental and Communication Testing (1 week)	44](#17.3-phase-2-—-environmental-and-communication-testing-\(1-week\))

[17.4 Phase 3 — TerraMind Integration and API (2 weeks, parallel with Phase 2\)	44](#17.4-phase-3-—-terramind-integration-and-api-\(2-weeks,-parallel-with-phase-2\))

[17.5 Phase 4 — Field Validation Pilot (2 weeks)	44](#17.5-phase-4-—-field-validation-pilot-\(2-weeks\))

[17.6 v2 Hardware Considerations (Post-Pilot, Not in Scope for v1)	44](#17.6-v2-hardware-considerations-\(post-pilot,-not-in-scope-for-v1\))

[Appendix A: Hardware Bill of Materials — Prototype (2 Units)	46](#appendix-a:-hardware-bill-of-materials-—-prototype-\(2-units\))

[Appendix B: Document Changelog	54](#appendix-b:-document-changelog)

[Appendix C: Open Decisions Log	54](#appendix-c:-open-decisions-log)

# **1\. About This Document** {#1.-about-this-document}

## **1.1 Purpose** {#1.1-purpose}

This document is the complete technical blueprint for the TerraMind Soil Scouter — a field-deployable, battery-powered, wireless soil monitoring device that provides real-time soil data directly to the TerraMind platform. It is a formal addendum to the TerraMind AI Layer PRD v2.0 (June 2026\) and must be read alongside it.

Where the AI Layer PRD specifies the intelligence that acts on soil and environmental data, this document specifies the hardware, firmware, integration, and testing required to collect that data at the block level and stream it reliably into the TerraMind data pipeline.

## **1.2 Scope** {#1.2-scope}

This document covers the full lifecycle of the Soil Scouter prototype from component selection through integration testing:

* Hardware architecture and component specifications

* Electrical design: power, signalling, GPIO allocation

* Mechanical design: enclosure, weatherproofing, probe deployment

* Firmware architecture: sampling, Modbus RTU, deep sleep, OTA updates

* Connectivity: WiFi primary, LoRa fallback, local AP configuration mode

* Data schema: raw payload format, mapping to TerraMind database tables

* Software integration: new API endpoints, nightly scan feeds, block model inputs

* Calibration protocol: factory and field calibration procedures

* Testing protocol: electronics, firmware, communication, environmental, and integration tests

* Prototype build guide: assembly, flashing, deployment

* Hardware Bill of Materials: full parts list with justifications and pricing

## **1.3 Relationship to TerraMind AI Layer PRD v2.0** {#1.3-relationship-to-terramind-ai-layer-prd-v2.0}

The Soil Scouter provides a new first-party observation data source that directly strengthens the following features defined in the AI Layer PRD:

| AI Layer PRD Feature | Section | How Soil Scouter Feeds It |
| :---- | :---- | :---- |
| Nightly Insight Scan | §5 | Real-time soil moisture, EC, and pH readings feed the five finding types — particularly accumulating risks (§5.3.4) and unexplained deviations (§5.3.5). |
| Compounding Season Intelligence — Irrigation Response | §12.2.4 | Actual soil moisture evolution data calibrates the FAO-56 model correction for each block (block\_season\_models.irrigation\_response). |
| AI Season Planner — Irrigation Events | §4.3.2 | Direct soil moisture deficit readings replace simulated deficit estimates, tightening irrigation event precision. |
| Inferred Logging — Irrigation | §4.8.2 | Post-irrigation soil moisture recovery confirms or refutes the irrigation event signal, strengthening inferred log accuracy. |
| Insights Feed | §6 | Cross-block soil pattern anomalies (e.g. EC spikes across multiple blocks) surface as insights that would not trigger standard threshold alerts. |
| Pre-Decision Checklist | §10 | Current soil moisture deficit and EC readings appear in the checklist context for irrigation and spray decisions. |
| Risk-Weighted Season Planning | §14 | Soil parameter time-series enriches the Monte Carlo weather-scenario model with block-level soil state. |
| Weekly Report — Block-by-block state | §3.4.3 | Soil readings are included in the block state summary alongside NDVI and prediction outputs. |

## **1.4 Conventions** {#1.4-conventions}

This document uses the same conventions as TerraMind AI Layer PRD v2.0. References to the AI Layer PRD use the format §x.x (AI PRD). References to the core PRD (TerraMind PRD v1.0, May 2026\) use §x.x (Core PRD). All prices are in NZD unless otherwise specified. All times are NZST unless otherwise specified.

## **1.5 Draft Status** {#1.5-draft-status}

**Note:** This document is version 0.1-DRAFT. Component pricing is indicative based on June 2026 AliExpress and NZ distributor pricing. Firmware architecture is a design intent document; implementation details will evolve through the prototype build phase. All decisions marked \[OPEN\] require co-founder resolution before build begins.

# **2\. Product Definition** {#2.-product-definition}

## **2.1 What Is the Soil Scouter** {#2.1-what-is-the-soil-scouter}

The Soil Scouter is a self-contained, weatherproof, solar-assisted sensor node that measures seven soil parameters simultaneously at the point of care in a kiwifruit orchard block. It transmits readings to the TerraMind platform over WiFi (primary) or LoRa (fallback) on a configurable schedule. It requires no per-deployment subscription beyond the TerraMind platform itself.

One Soil Scouter per block is the intended deployment density for the prototype phase. Multiple units per block may be used in v2 for spatial averaging.

## **2.2 Parameters Measured** {#2.2-parameters-measured}

| Parameter | Symbol | Range | Resolution | Accuracy |
| :---- | :---- | :---- | :---- | :---- |
| Soil Moisture (VWC) | SM | 0–100% | 0.1% | ±2% (0–53%), ±3% (53–100%) |
| Soil Temperature | ST | \-40 to \+80°C | 0.1°C | ±0.5°C |
| Electrical Conductivity | EC | 0–20,000 µS/cm | 1 µS/cm | ±3% FS |
| Soil pH | pH | 3.0–9.0 pH | 0.01 pH | ±0.3 pH (indicative, see §2.3) |
| Nitrogen (N) | N | 0–1999 mg/kg | 1 mg/kg | ±2% FS (FDR method) |
| Phosphorus (P) | P | 0–1999 mg/kg | 1 mg/kg | ±2% FS (FDR method) |
| Potassium (K) | K | 0–1999 mg/kg | 1 mg/kg | ±2% FS (FDR method) |

## **2.3 Measurement Limitations and Honest Framing** {#2.3-measurement-limitations-and-honest-framing}

The 7-in-1 RS485 Modbus sensor uses the Frequency Domain Reflectometry (FDR) principle to estimate NPK values from the soil's dielectric constant and conductivity. This method provides a relative indication of nutrient levels and directional trends, not laboratory-grade analysis. Soil pH from FDR probes carries ±0.3 pH uncertainty and should be treated as a screen for significant excursions, not as a replacement for laboratory pH testing.

**Note:** All NPK and pH readings surfaced in the TerraMind UI must include a disclaimer: 'Indicative reading only — confirm significant changes with laboratory analysis.' This applies to all insight, report, and briefing surfaces that display these values (AI PRD §7.4 competence boundary enforcement).

## **2.4 Scope: What the Soil Scouter Is Not** {#2.4-scope:-what-the-soil-scouter-is-not}

* Not a standalone product: the Soil Scouter has no value without the TerraMind platform. It is a first-party hardware peripheral.

* Not a laboratory instrument: NPK and pH values are directional, not certified. See §2.3.

* Not a rainfall gauge or evapotranspiration sensor: these remain sourced from NIWA and Open-Meteo (Core PRD §4.x).

* Not a multi-depth probe: v1 measures at a single insertion depth (typically 15–20 cm). Multi-depth is a v2 consideration.

* Not certified for resale: prototype units are not CE/FCC/RCM certified. Certification is required before commercial distribution.

# **3\. System Architecture** {#3.-system-architecture}

## **3.1 High-Level Architecture** {#3.1-high-level-architecture}

The Soil Scouter system consists of three layers: the device layer (the node in the field), the edge layer (LoRa gateway or WiFi router), and the cloud layer (TerraMind platform on Railway).

| Layer | Component | Function |
| :---- | :---- | :---- |
| Device | Soil Scouter Node | Senses soil parameters via RS485 Modbus probe. Processes and transmits readings over WiFi (primary) or LoRa (fallback). Manages power via solar \+ Li-Ion. Hosts local AP for configuration. |
| Edge (WiFi path) | Orchard WiFi Router / Mesh AP | Existing infrastructure. Node connects as a standard WiFi client. No edge compute. |
| Edge (LoRa path) | LoRa Gateway (TTN or self-hosted) | LoRaWAN Class A gateway. Required only in blocks with no WiFi coverage. One gateway covers \~5 km radius in open farmland. |
| Cloud | TerraMind Data Ingestion Service (Railway) | Receives HTTPS POST from Soil Scouter (WiFi) or LoRaWAN network server webhook (LoRa path). Validates, persists to Neon Postgres, triggers block model updates. |
| Cloud | TerraMind AI Generation Service (Railway) | Consumes soil readings from database via nightly scan, prediction engine, and report generation pipelines as defined in AI PRD §5, §12, §14. |

## **3.2 Data Flow** {#3.2-data-flow}

The following sequence describes one complete measurement cycle:

1. Soil Scouter wakes from deep sleep on configurable interval (default: 15 minutes).

2. MCU powers up the RS485 transceiver and sends Modbus RTU read command to probe.

3. Probe responds with 7-parameter payload within 1 second.

4. MCU reads ambient SHT31 temperature and humidity for above-ground reference.

5. MCU reads battery voltage via onboard ADC.

6. MCU assembles a JSON payload (see §10.1) with device ID, timestamp, readings, and battery state.

7. MCU attempts WiFi connection using stored credentials. If connection succeeds within 10 seconds, payload is posted via HTTPS to TerraMind data ingestion endpoint.

8. If WiFi fails (no credentials, no AP, or timeout), MCU transmits payload via LoRa using LoRaWAN OTAA on AU915 band. TTN or self-hosted gateway forwards to TerraMind via webhook.

9. MCU records transmission success/failure in SPIFFS log for diagnostics.

10. MCU enters deep sleep for configured interval. Total active window: typically 15–25 seconds.

## **3.3 Communication Topology** {#3.3-communication-topology}

The AU915 (915 MHz) LoRa band is used for New Zealand deployments — this is the same band used in Australia, which shares NZ's ISM allocation. A LoRaWAN gateway is required for LoRa path deployments. The Things Network (TTN) Community edition covers most NZ urban and rural areas; self-hosted ChirpStack on Railway is the fallback for areas without TTN coverage.

**Note:** \[OPEN\] Determine TTN gateway coverage for initial pilot orchard locations. If coverage is insufficient, budget for one Heltec HT-M02 LoRaWAN gateway (\~NZD $180) per orchard cluster.

# **4\. Hardware Architecture** {#4.-hardware-architecture}

## **4.1 Subsystem Block Diagram** {#4.1-subsystem-block-diagram}

The Soil Scouter node is composed of six hardware subsystems:

| Subsystem | Function | Key Components |
| :---- | :---- | :---- |
| Sensing | Acquires 7 soil parameters \+ ambient temp/humidity | 7-in-1 RS485 Modbus probe, SHT31 ambient sensor |
| Signal Conversion | Converts RS485 differential signals to 3.3V UART for MCU | SP3485 RS485 transceiver (half-duplex, 3.3V compatible) |
| Processing & Radio | Executes firmware, manages WiFi/BLE/LoRa, drives all peripherals | Heltec WiFi LoRa 32 V3 (ESP32-S3 \+ SX1262) |
| Power | Stores energy (Li-Ion), harvests solar, regulates voltages, protects cells | 2× 18650 3000mAh cells, TP4056 \+ DW01A protection, CN3791 solar MPPT, MT3608 5V boost |
| Status Indication | Provides field-visible status feedback | RGB LED (common cathode, 5mm) |
| Mechanical | Houses all electronics, seals against moisture and dust, mounts solar panel and antenna | IP65 ABS junction box, M12 cable glands, 915 MHz stub antenna |

## **4.2 Design Decisions** {#4.2-design-decisions}

The following design decisions were made relative to the original hardware specification in the Hardware Expense Sheet (v1, June 2026):

| Original Spec | Revised Spec | Rationale |
| :---- | :---- | :---- |
| ESP32 DevKitC V4 (ESP32-WROOM-32D), $20 NZD from Jaycar | Heltec WiFi LoRa 32 V3 (ESP32-S3 \+ SX1262), \~$30 NZD from AliExpress | The Heltec board integrates WiFi, BLE, LoRa (SX1262), OLED display, Li-Ion battery management, and UART in one package. This eliminates the need for a separate LoRa module, RS485 power supply stage, and battery charger module. The ESP32-S3 has faster UART, more GPIO, and better deep sleep current than the WROOM-32D. |
| MAX485CPA+ ($15 from Element 14\) | SP3485E RS485 transceiver (3.3V native, \~$0.50/unit from AliExpress 5-pack) | The MAX485CPA+ operates at 5V and requires level shifting to the ESP32-S3's 3.3V GPIO. The SP3485E is a 3.3V-native half-duplex RS485 transceiver with identical pinout and protocol compatibility. Direct 3.3V operation eliminates a voltage translation stage. |
| No LoRa — WiFi only | WiFi primary \+ LoRa fallback (SX1262 on Heltec board) | Kiwifruit orchards commonly have poor WiFi penetration across blocks. LoRa provides a resilient fallback over distances up to 5 km without additional infrastructure. LoRa is integrated on the Heltec board at no additional hardware cost. |
| No power management / solar | TP4056 (built into Heltec) \+ 2× 18650 \+ 6V/2W solar panel \+ CN3791 MPPT | A sensor node in a kiwifruit block cannot realistically be wired for mains power. Solar-assisted 18650 batteries provide 3–6 months of unattended operation at 15-minute sampling intervals. |
| No ambient sensor | SHT31 ambient temperature and humidity sensor (\~$4 NZD each) | Above-ground ambient humidity is a critical Psa risk input (Core PRD §5.4.x). The SHT31 is a calibrated, I2C digital sensor with ±2% RH accuracy. Adding it to the node eliminates dependency on regional NIWA station data for this variable at the block level. |

# **5\. Component Specifications** {#5.-component-specifications}

## **5.1 MCU / Radio Module — Heltec WiFi LoRa 32 V3** {#5.1-mcu-/-radio-module-—-heltec-wifi-lora-32-v3}

| Model | Heltec WiFi LoRa 32 (V3) — 915 MHz AU/NZ variant |
| :---- | :---- |
| **MCU** | ESP32-S3FN8 — Xtensa LX7 dual-core, 240 MHz |
| **RAM** | 512 KB SRAM (on-die) |
| **Flash** | 8 MB (on-module) |
| **LoRa Chip** | Semtech SX1262 |
| **LoRa Frequency** | 915 MHz (AU915 LoRaWAN band — correct for New Zealand) |
| **LoRa TX Power** | \+20 dBm typical |
| **LoRa Sensitivity** | \-148 dBm at SF12 |
| **WiFi** | 802.11 b/g/n 2.4 GHz |
| **Bluetooth** | BLE 5.0 |
| **Display** | 0.96-inch OLED 128×64 (SSD1306 I2C) |
| **Battery Interface** | SH1.25-2P JST — integrated LiPo management (charge \+ protection \+ ADC) |
| **USB** | USB-C — programming and charging |
| **Deep Sleep Current** | \<20 µA (ESP32-S3 modem-off, LoRa in sleep) |
| **Active Current** | \~80 mA (WiFi TX) / \~45 mA (LoRa TX) |
| **GPIO** | 36 usable GPIO including SPI, I2C, UART, ADC, DAC |
| **Operating Voltage** | 3.3V logic; 3.7V–4.2V battery; 5V USB input |
| **Operating Temperature** | \-20°C to \+70°C |
| **Dimensions** | 50.2 × 25.4 mm |
| **Indicative Unit Price (NZD)** | \~$30 (AliExpress, including 915 MHz antenna) |

**Note:** The V3 uses the SX1262 chip, which supersedes the SX1276 used in earlier Heltec modules. The SX1262 offers lower power consumption, better sensitivity at \-148 dBm, and LoRaWAN Class A/B/C compliance. The AU915 variant is mandatory for NZ legal operation on the 915 MHz ISM band.

## **5.2 Soil Sensor — 7-in-1 RS485 Modbus Probe** {#5.2-soil-sensor-—-7-in-1-rs485-modbus-probe}

| Model | Generic 7-in-1 Agricultural RS485 Modbus Soil Sensor (5-pin stainless probe) |
| :---- | :---- |
| **Communication** | RS485, Modbus-RTU protocol |
| **Parameters** | Moisture, Temperature, EC, pH, N, P, K (7 in 1\) |
| **Probe Material** | 316L stainless steel — corrosion and electrolysis resistant |
| **Supply Voltage** | 5–30V DC (powered at 12V in this design from MT3608 boost) |
| **Baud Rate** | 9600 baud (configurable via Modbus to 1200–9600) |
| **Response Time** | \<1 second per read cycle |
| **Waterproofing** | IP68 — vacuum potted body with high-density epoxy resin |
| **Cable Length** | 2 metres (standard) — 4-wire RS485 \+ power |
| **Operating Temperature (soil)** | \-20°C to \+60°C |
| **Storage Temperature** | \-40°C to \+70°C |
| **Moisture Range / Accuracy** | 0–100% VWC ± 2% (0–53%) / ±3% (53–100%) |
| **Temperature Range / Accuracy** | \-40 to \+80°C / ±0.5°C |
| **EC Range / Accuracy** | 0–20,000 µS/cm / ±3% FS |
| **pH Range / Accuracy** | 3.0–9.0 pH / ±0.3 pH (FDR indicative) |
| **N/P/K Range / Accuracy** | 0–1999 mg/kg / ±2% FS (FDR indicative) |
| **Modbus Base Address** | 0x01 (default, configurable) |
| **Indicative Unit Price (NZD)** | \~$42–55 per unit (AliExpress, including shipping) |

**Note:** Multiple suppliers manufacture electrically identical sensors under different brand names on AliExpress. Confirmed compatible suppliers include: JXCT, Niubol, Generic 7in1 sensor listings. Verify Modbus register map matches the register layout in §6.3 before ordering at volume.

## **5.3 RS485 Transceiver — SP3485E** {#5.3-rs485-transceiver-—-sp3485e}

| Model | SP3485E or equivalent (SOP-8 / DIP-8 package, 3.3V) |
| :---- | :---- |
| **Supplier** | AliExpress — 5-pack \~$2–3 NZD |
| **Supply Voltage** | 3.0–3.6V (directly powered from Heltec 3.3V rail) |
| **Max Data Rate** | 10 Mbps |
| **Interface to MCU** | UART TX/RX \+ DIR (direction control via GPIO) |
| **Half-Duplex** | Yes — single pair RS485, controlled by DIR pin |
| **ESD Protection** | ±15 kV human body model |
| **Operating Temperature** | \-40°C to \+85°C |
| **Package** | DIP-8 preferred for prototype (breadboard-compatible) |
| **Why Not MAX485CPA+?** | MAX485CPA+ operates at 5V, requiring level-shifting to 3.3V ESP32-S3 GPIO. SP3485E is pin-compatible but operates at 3.3V natively, eliminating the level-shift stage and reducing BOM cost. |

## **5.4 Power Subsystem** {#5.4-power-subsystem}

### **5.4.1 Li-Ion Cells — 18650 3000 mAh** {#5.4.1-li-ion-cells-—-18650-3000-mah}

| Chemistry | Li-Ion (Lithium-Ion) |
| :---- | :---- |
| **Cell Format** | 18650 cylindrical |
| **Nominal Voltage** | 3.7V per cell |
| **Capacity (each)** | 3000 mAh (Samsung 30Q or equivalent quality cell) |
| **Configuration** | 2S1P — two cells in series for 7.4V — OR 2P1S for extended 3.7V capacity |
| **Recommended Config** | 2P1S (parallel) — 6000 mAh total at 3.7V, matched to Heltec battery input |
| **Protection Circuit** | Built into Heltec board (overcharge, over-discharge, short-circuit) |
| **Indicative Price (NZD)** | \~$6–10 per quality cell (avoid unbranded cells with inflated capacity claims) |

### **5.4.2 Solar Panel — 6V / 2W Mini Monocrystalline** {#5.4.2-solar-panel-—-6v-/-2w-mini-monocrystalline}

| Type | Monocrystalline silicon, rigid or semi-flexible |
| :---- | :---- |
| **Open Circuit Voltage (Voc)** | 7.2V at STC |
| **Max Power Voltage (Vmp)** | 6.0V at STC |
| **Peak Power** | 2W at STC |
| **Short Circuit Current (Isc)** | 330 mA |
| **Dimensions (approx.)** | \~130 × 110 mm |
| **Indicative Price (NZD)** | \~$5–8 (AliExpress) |
| **Expected Daily Yield (NZ winter)** | \~2–4 Wh/day (4–6 peak sun hours at NZ latitude) |
| **Charge Management** | CN3791 MPPT module — regulates solar input to Li-Ion charging voltage |

### **5.4.3 CN3791 Solar MPPT Charger Module** {#5.4.3-cn3791-solar-mppt-charger-module}

| Model | CN3791 — Maximum Power Point Tracking solar charge controller |
| :---- | :---- |
| **Input Voltage** | 4.5–28V (accepts 6V panel directly) |
| **Output** | 4.2V regulated Li-Ion charge voltage, up to 900 mA |
| **MPPT Method** | Constant voltage MPPT (\~80% of Voc panel voltage) |
| **Efficiency** | Up to 90% |
| **Low Power Standby** | \<50 µA |
| **Indicative Price (NZD)** | \~$2–4 per module (AliExpress 5-pack \~$8) |
| **Why not TP4056 for solar?** | The TP4056 has no MPPT capability and cannot efficiently extract power from a solar panel under varying irradiance. The CN3791 tracks maximum power point, increasing harvest yield by 20–40% vs TP4056 in field conditions. |

### **5.4.4 MT3608 5V Step-Up (Boost) Converter** {#5.4.4-mt3608-5v-step-up-(boost)-converter}

| Model | MT3608 — 2A 28V output step-up converter module |
| :---- | :---- |
| **Input Voltage** | 2V–24V (3.7V battery input) |
| **Output Voltage** | 5–28V (trimmer set to 12V for soil sensor supply) |
| **Output Current** | Up to 2A (derate to 1A at 12V output from 3.7V input) |
| **Efficiency** | \~93% at 500 mA |
| **Quiescent Current** | \<1 mA |
| **Indicative Price (NZD)** | \~$1–2 per module (AliExpress 5-pack \~$5) |
| **Note** | The RS485 soil probe requires 5–30V supply. The Heltec board does not supply 12V. The MT3608 boosts battery voltage to 12V specifically for the sensor supply rail. This power rail is software-switched via a GPIO-driven P-channel MOSFET to eliminate sensor quiescent drain during deep sleep. |

## **5.5 Ambient Environmental Sensor — SHT31** {#5.5-ambient-environmental-sensor-—-sht31}

| Model | Sensirion SHT31-D (or SHT31 breakout module) |
| :---- | :---- |
| **Interface** | I2C (address 0x44 or 0x45 via ADDR pin) |
| **Humidity Range / Accuracy** | 0–100% RH / ±2% RH (0–100%) |
| **Temperature Range / Accuracy** | \-40 to \+125°C / ±0.3°C |
| **Supply Voltage** | 2.4–5.5V (3.3V from Heltec) |
| **Current (active)** | \~1.5 mA |
| **Current (idle)** | \<0.5 µA |
| **Response Time** | \<8 seconds |
| **Indicative Price (NZD)** | \~$4–6 per breakout module (AliExpress) |
| **Purpose** | Measures above-canopy ambient temperature and relative humidity at the block level. These values directly feed the Psa leaf wetness risk model (Core PRD §5.4.x) with block-level resolution rather than relying on regional NIWA station data. |

## **5.6 Status LED — RGB 5mm Common Cathode** {#5.6-status-led-—-rgb-5mm-common-cathode}

| Type | 5mm common cathode RGB LED |
| :---- | :---- |
| **Forward Voltage** | Red: \~2.0V, Green: \~3.2V, Blue: \~3.2V |
| **Max Forward Current** | 20 mA per channel (operate at 10 mA) |
| **Current Limiting Resistors** | Red: 130Ω, Green/Blue: 33Ω (at 3.3V, 10 mA target) |
| **GPIO Pins Required** | 3 (active HIGH drive to common cathode LED) |
| **LED State Machine** | See §8.9 |
| **Indicative Price (NZD)** | \~$2 for 10-pack |

## **5.7 Enclosure — IP65 ABS Junction Box** {#5.7-enclosure-—-ip65-abs-junction-box}

| Dimensions | 100 × 68 × 50 mm (external) |
| :---- | :---- |
| **Material** | ABS plastic with UV-resistant coating |
| **IP Rating** | IP65 (dust-tight, protected against water jets) |
| **Sealing** | Neoprene gasket on lid, compression-fit |
| **Lid Fixings** | 4× M4 stainless screws |
| **Mounting** | 4× external mounting lugs — stainless M4 bolts to post or stake |
| **Cable Entry Points** | 2× M12 cable glands (drill-to-fit) |
| **Internal Volume** | \~200 cm³ — sufficient for Heltec board, PCB, 2× 18650 cells, connectors |
| **Indicative Price (NZD)** | \~$8–12 per unit (AliExpress) |
| **Limitation** | IP65 is dust-tight and splash-proof but not submersion-rated. Do not deploy in flood-prone furrows. A step up to IP67 is available at \~$5 additional cost if required. |

## **5.8 Passive Components and Ancillaries** {#5.8-passive-components-and-ancillaries}

| Component | Specification | Qty (per node) | Purpose |
| :---- | :---- | :---- | :---- |
| M12 waterproof cable gland | PG7 / 3–6.5mm OD cable | 2 | Sealed cable entry for sensor cable and solar cable |
| 120Ω termination resistor | 0.25W, ±5% | 1 | RS485 bus termination at the node end (far end of cable) |
| 10kΩ pull-up resistors | 0.25W, ±5% | 2 | RS485 bus bias resistors on A/B lines |
| 100µF electrolytic capacitor | 10V, radial | 1 | Decoupling on 12V boost output supply rail |
| 10µF ceramic capacitor | 10V, X5R | 2 | Decoupling on 3.3V and 5V rails |
| IRF9540N P-channel MOSFET | TO-220 or SOT-23 equivalent | 1 | GPIO-controlled switch for sensor 12V power rail (deep sleep power cut) |
| Hookup wire 22AWG stranded | Multi-colour, silicone jacket preferred | \~2 m | Internal wiring harness |
| JST SH-1.25 2-pin female connector | Matches Heltec battery port | 1 | Battery connection to Heltec |
| JST PH 2.0 2-pin connector | Solar panel to CN3791 input | 1 | Solar panel connection |
| M3 machine screws \+ nuts | Stainless A2, 8mm length | 8 | PCB mounting standoffs in enclosure |
| M3 nylon standoffs 10mm | Nylon PA6 | 4 | PCB clearance from enclosure base |
| Silicone RTV sealant | Clear, \-60°C to \+200°C rated | 1 tube (shared) | Additional sealing around cable glands |
| Heatshrink tubing assortment | 3:1 ratio, black, 2–8mm sizes | 1 pack | Cable joint insulation and strain relief |
| Prototype breadboard or 70×90mm perf PCB | Solderable copper pad | 1 per node | Component mounting for prototype phase |

# **6\. Electrical Design** {#6.-electrical-design}

## **6.1 Power Distribution Architecture** {#6.1-power-distribution-architecture}

The Soil Scouter node operates from a primary Li-Ion battery rail (3.7V nominal), regulated to the appropriate voltage for each subsystem. Three voltage rails are present:

| Rail | Voltage | Source | Loads |
| :---- | :---- | :---- | :---- |
| VBAT | 3.7V (3.0–4.2V range) | 2× 18650 in parallel via TP4056 circuit on Heltec board | Heltec board primary input |
| V3.3 | 3.3V regulated | Heltec onboard LDO from VBAT | ESP32-S3, SX1262, SHT31, SP3485E, LED, OLED |
| VSENSE | 12V boosted | MT3608 boost from VBAT, GPIO-switched via P-channel MOSFET | 7-in-1 RS485 soil probe power supply |

The VSENSE rail is switched off during deep sleep by driving the gate of the P-channel MOSFET HIGH from GPIO. This eliminates the \~3 mA quiescent draw of the soil probe during sleep cycles, contributing the largest share of deep sleep power reduction.

## **6.2 Power Budget Analysis** {#6.2-power-budget-analysis}

The following power budget is calculated for the default 15-minute sampling interval:

| State | Duration (sec) | Current Draw (mA) | Energy (mWh) |
| :---- | :---- | :---- | :---- |
| Deep sleep (all subsystems) | 885 (14m 45s) | 0.020 | 0.0055 |
| Wake — MCU boot \+ sensor power-up | 2 | 45 | 0.025 |
| Modbus RS485 read cycle | 3 | 80 | 0.067 |
| SHT31 ambient read | 1 | 47 | 0.013 |
| WiFi connect \+ HTTPS POST | 12 | 120 | 0.400 |
| LoRa TX fallback (if WiFi fails) | 3 | 90 | 0.075 |
| Total per 15-min cycle (WiFi success) | 903 | — | 0.511 mWh/cycle |
| Total per 15-min cycle (LoRa fallback) | 906 | — | 0.186 mWh/cycle |
| Daily energy (WiFi, 96 cycles/day) | — | — | 49 mWh/day |
| 6000 mAh battery capacity at 3.7V | — | — | 22,200 mWh |
| Estimated battery life (WiFi, no solar) | — | — | \~453 days (theoretical) |
| Realistic battery life (WiFi, NZ winter solar) | — | — | \~180–360 days with 2W solar trickle |

**Note:** WiFi connection time is the dominant power consumer. If orchard WiFi is unreliable and LoRa path is used, battery life is substantially extended due to LoRa's lower TX power and shorter active window. The 15-minute interval is configurable; 30-minute intervals roughly halve the daily energy budget.

## **6.3 GPIO Pin Assignment — Heltec WiFi LoRa 32 V3** {#6.3-gpio-pin-assignment-—-heltec-wifi-lora-32-v3}

| GPIO | Function | Direction | Notes |
| :---- | :---- | :---- | :---- |
| GPIO17 (UART1 TX) | RS485 UART TX to SP3485E DI pin | Output | Heltec UART1 |
| GPIO18 (UART1 RX) | RS485 UART RX from SP3485E RO pin | Input | Heltec UART1 |
| GPIO19 | RS485 direction control (SP3485E /RE and DE pins) | Output | HIGH \= transmit, LOW \= receive |
| GPIO21 (I2C SDA) | SHT31 SDA | Bidirectional | Heltec default I2C SDA |
| GPIO22 (I2C SCL) | SHT31 SCL | Output | Heltec default I2C SCL |
| GPIO35 | RGB LED — Red channel | Output | PWM-capable; 130Ω series resistor |
| GPIO36 | RGB LED — Green channel | Output | PWM-capable; 33Ω series resistor |
| GPIO37 | RGB LED — Blue channel | Output | PWM-capable; 33Ω series resistor |
| GPIO38 | VSENSE MOSFET gate (sensor power switch) | Output | HIGH \= sensor power OFF (P-channel), LOW \= ON |
| GPIO1 (ADC1\_CH0) | Battery voltage divider ADC | Analog Input | 1/2 divider to 3.3V ADC range; Heltec built-in divider |
| GPIO4 (SPI CS) | SX1262 LoRa chip select (internal) | Output | Fixed in Heltec board hardware |
| GPIO5 (SPI MOSI) | SX1262 MOSI (internal) | Output | Fixed in Heltec board hardware |
| GPIO3 (SPI MISO) | SX1262 MISO (internal) | Input | Fixed in Heltec board hardware |
| GPIO9 (SPI SCK) | SX1262 SCK (internal) | Output | Fixed in Heltec board hardware |
| GPIO8 | OLED I2C SDA (internal, SSD1306) | Bidirectional | Fixed in Heltec board hardware |
| GPIO18 (OLED SCL) | OLED I2C SCL (internal) | Output | Note: shared with UART1 RX — verify Heltec V3 pinout before firmware |

**Note:** \[OPEN\] The Heltec V3 pinout must be verified against the official Heltec V3 schematic before firmware development. Several GPIO assignments listed above are indicative based on publicly available documentation. Do not assume GPIO overlap with OLED and UART1 without physical verification on a test board.

## **6.4 RS485 Modbus Register Map** {#6.4-rs485-modbus-register-map}

The 7-in-1 soil probe uses Modbus-RTU function code 0x03 (Read Holding Registers) at slave address 0x01 (configurable). The standard register map for this sensor class:

| Register Address | Parameter | Units | Scale Factor | Data Type |
| :---- | :---- | :---- | :---- | :---- |
| 0x0000 | Soil Moisture (VWC) | % × 10 | ÷ 10 for % | 16-bit unsigned |
| 0x0001 | Soil Temperature | °C × 10 (offset \+400) | ÷ 10, −40 for °C | 16-bit unsigned |
| 0x0002 | Electrical Conductivity (EC) | µS/cm | × 1 direct | 16-bit unsigned |
| 0x0003 | Soil pH | pH × 10 | ÷ 10 for pH | 16-bit unsigned |
| 0x0004 | Nitrogen (N) | mg/kg | × 1 direct | 16-bit unsigned |
| 0x0005 | Phosphorus (P) | mg/kg | × 1 direct | 16-bit unsigned |
| 0x0006 | Potassium (K) | mg/kg | × 1 direct | 16-bit unsigned |

Modbus query frame (read all 7 registers from address 0x0000):

01 03 00 00 00 07 04 08  
Response frame structure: \[device\_addr\]\[func\_code\]\[byte\_count\]\[reg0\_hi\]\[reg0\_lo\]...\[reg6\_hi\]\[reg6\_lo\]\[CRC\_lo\]\[CRC\_hi\]

**Note:** Register addresses and scale factors vary between sensor manufacturers. Always verify against the datasheet included with the unit by issuing a test read via serial terminal before integration. Mismatched register maps are the most common integration failure mode for this sensor class.

# **7\. Mechanical Design** {#7.-mechanical-design}

## **7.1 Enclosure Layout** {#7.1-enclosure-layout}

The IP65 ABS junction box (100 × 68 × 50 mm) houses all electronics. Internal layout from base to lid:

* Base layer: 4× nylon M3 standoffs at corners, PCB mounted at 10 mm clearance from base

* PCB layer: prototype PCB (70 × 90 mm max) carrying SP3485E, MT3608, MOSFET, passive components, and connector headers. Heltec board plugs into female header strips on PCB.

* Battery layer: 2× 18650 cells in parallel holder, Velcro-secured to PCB base, JST connector to Heltec battery port.

* CN3791 solar module: mounted flat on PCB next to battery holder.

* Heltec board: plugged vertically into PCB headers, OLED display accessible via clear acrylic window insert in lid (optional — lid can remain opaque).

* RGB LED: protrudes through 5mm drilled hole in side of box at top, sealed with silicone.

* Cable glands: 2× M12 glands on bottom face — one for soil probe 4-wire cable, one for solar panel 2-wire cable.

* Antenna: 915 MHz external whip antenna, SMA connector on Heltec board, routed through cable gland or dedicated SMA bulkhead fitting on enclosure.

## **7.2 Soil Probe Deployment** {#7.2-soil-probe-deployment}

The RS485 soil probe is installed vertically into the soil at 15–20 cm depth, positioned in the root zone of the kiwifruit vine row. Standard installation procedure:

11. Using an auger or soil knife, create a 30–35 mm diameter pilot hole to the required depth to avoid displacing soil structure around the probe.

12. Insert the probe vertically with the stainless steel pins fully below the soil surface.

13. Backfill any annular gap around the probe body with the original soil, tamping gently to maintain soil-probe contact.

14. Route the sensor cable along the ground or through existing irrigation conduit to the enclosure location.

15. Enclosure is mounted on a 50 mm diameter stake at 80–120 cm above ground for solar panel exposure and LED visibility.

## **7.3 Solar Panel Mounting** {#7.3-solar-panel-mounting}

The 130 × 110 mm solar panel mounts to the top of the deployment stake at a fixed 30–45° tilt facing north (Southern Hemisphere optimal tilt for NZ latitude range 36–47°S). The panel connects to the enclosure via a 2-core 1.0 mm² UV-rated cable routed through the lower M12 cable gland.

## **7.4 Weatherproofing Checklist** {#7.4-weatherproofing-checklist}

Before field deployment, verify each of the following:

16. All cable glands are tightened to the torque specified on the gland body (typically finger-tight plus 1/4 turn with spanner).

17. Both cable entry holes have gland gaskets intact and correctly seated.

18. Lid neoprene gasket is undamaged and correctly seated in the lid groove.

19. All 4× lid screws are tightened evenly — do not overtighten ABS lid threads.

20. RGB LED hole sealed with clear silicone around LED body.

21. Antenna cable exit (if external SMA) sealed with self-amalgamating tape over SMA bulkhead nut.

22. Sensor cable jacket is not kinked, pinched, or damaged at cable gland entry.

23. Solar panel cable junction weatherproofed with self-amalgamating tape if not using waterproof MC4 connectors.

# **8\. Firmware Architecture** {#8.-firmware-architecture}

## **8.1 Firmware Stack** {#8.1-firmware-stack}

| Layer | Framework / Library | Function |
| :---- | :---- | :---- |
| Build System | PlatformIO \+ Arduino framework for ESP32-S3 | Project structure, dependency management, OTA, serial monitor |
| LoRaWAN Stack | LoRaMac-node (Arduino port: MCCI LMIC) | LoRaWAN Class A OTAA, AU915 channel plan, payload encoding |
| RS485 / Modbus | ModbusMaster library or custom UART implementation | Half-duplex Modbus-RTU master: send query, receive response, CRC validation |
| HTTP Client | ESP32 Arduino HTTPClient over WiFi | HTTPS POST of JSON payload to TerraMind ingestion endpoint |
| JSON | ArduinoJson v6 | Serialise sensor readings, deserialise configuration |
| I2C Sensors | Adafruit SHT31 library | Read temperature and humidity from SHT31 via I2C |
| Storage | SPIFFS (SPI Flash File System) | Persist WiFi credentials, device config, transmission log, calibration offsets |
| OTA Updates | ESP32 OTA via WiFi (ArduinoOTA or HTTPS binary fetch) | Field firmware updates without physical access |
| Power Management | ESP32 deep sleep API | esp\_deep\_sleep\_start(), esp\_sleep\_enable\_timer\_wakeup() |
| Display | U8g2 library (SSD1306) | Diagnostic display on Heltec OLED during setup and error states |

## **8.2 Boot Sequence** {#8.2-boot-sequence}

On wake from deep sleep (or on cold boot):

24. ESP32-S3 resumes from RTC fast memory — reads sleep reason and boot count from RTC memory.

25. GPIO38 driven HIGH (VSENSE power OFF) immediately on boot — sensor power OFF until explicitly enabled.

26. SPIFFS mounted — load device configuration (device\_id, wifi\_ssid, wifi\_pass, lorawan\_keys, sample\_interval\_min, calibration\_offsets).

27. If first boot (no config file): enter configuration AP mode (§8.8) — halt normal operation.

28. Initialise SHT31 on I2C — verify presence (ACK on 0x44).

29. GPIO38 driven LOW — VSENSE enabled, MT3608 powers up 12V rail.

30. Wait 500 ms for probe power stabilisation.

31. UART1 initialised at 9600 baud, SP3485E direction pin set LOW (receive).

32. Issue Modbus read command — await response with 1.5-second timeout.

33. On timeout or CRC error: retry up to 3 times with 500 ms inter-retry delay. If all retries fail: log error, skip to step 14 with null probe readings.

34. Parse Modbus response — apply scale factors and calibration offsets from SPIFFS config.

35. Read SHT31 ambient temperature and humidity.

36. Read battery voltage from ADC with IIR filter (10 samples, 50 µS interval).

37. GPIO38 driven HIGH — VSENSE power OFF.

38. Assemble JSON payload (§10.1).

39. Attempt WiFi connection — 10-second timeout. If connected: HTTPS POST with 15-second timeout. On success: log success to RTC memory.

40. If WiFi fails or HTTPS POST returns non-2xx: attempt LoRa transmission (§8.6.2).

41. If both fail: save payload to SPIFFS queue (max 48 entries) for transmission on next successful connection.

42. Update OLED (if boot count \< 10, display last reading summary for 5 seconds — avoids unnecessary display power during normal cycling).

43. Enter deep sleep for configured interval. RTC timer set to sample\_interval\_min × 60 seconds.

## **8.3 Modbus RTU Implementation** {#8.3-modbus-rtu-implementation}

The Modbus master implementation operates UART1 in half-duplex mode using the SP3485E transceiver. The DE/RE direction control is toggled via GPIO19:

* Before transmit: GPIO19 HIGH (enable transmit on SP3485E).

* Write Modbus query bytes to UART1 TX FIFO.

* Wait for UART1 TX complete interrupt (or calculated byte-time × 8 \+ guard time).

* GPIO19 LOW (enable receive on SP3485E) — critical to switch within the inter-frame gap.

* Read UART1 RX FIFO with timeout. Expected response length: 2 \+ 2 \+ (7 × 2\) \+ 2 \= 20 bytes.

* Validate CRC-16/Modbus of received frame. On mismatch: increment error counter, retry.

## **8.4 Data Sampling and Averaging** {#8.4-data-sampling-and-averaging}

The probe performs one read per wake cycle. No onboard averaging is applied — the TerraMind platform handles time-series smoothing. However, if CRC-validated reads from 3 consecutive retries return mutually inconsistent values (\>20% relative deviation on any parameter), the reading is flagged with reading\_quality: 'suspect' in the JSON payload and logged to SPIFFS for review.

## **8.5 Deep Sleep and Power Management** {#8.5-deep-sleep-and-power-management}

The ESP32-S3 enters light sleep or deep sleep between cycles. Deep sleep is the default:

* In deep sleep, the CPU, WiFi, BLE, and most peripherals are powered off. Only the RTC domain, RTC memory, and RTC GPIO remain active.

* Wake source: RTC timer set to sample\_interval\_min × 60 seconds (configurable, default: 900 seconds \= 15 minutes).

* All UART, I2C, and GPIO states are re-initialised on each wake — do not rely on pre-sleep GPIO state.

* A daily NTP sync cycle runs on the first WiFi-successful wake after 00:00 NZST to maintain RTC accuracy. The ESP32 RTC drifts \~20 ppm; daily sync is sufficient for timestamp accuracy.

## **8.6 Communication — WiFi and LoRa** {#8.6-communication-—-wifi-and-lora}

### **8.6.1 WiFi Path** {#8.6.1-wifi-path}

* WiFi credentials stored in SPIFFS config. Support for up to 3 SSIDs (e.g. orchard router, mesh extender, phone hotspot for setup).

* WPA2-PSK only. No WPA3 or enterprise in v1.

* TLS 1.2 HTTPS with server certificate fingerprint pinned to TerraMind ingestion endpoint certificate. Certificate fingerprint stored in SPIFFS config; updated via OTA firmware update when certificate rotates.

* HTTP response 200 or 201 \= success. 400 \= payload validation error (log full response to SPIFFS). 429 \= rate limit (back off 5 minutes). 5xx \= server error (queue payload, retry on next cycle).

### **8.6.2 LoRa / LoRaWAN Path** {#8.6.2-lora-/-lorawan-path}

* LoRaWAN Class A, OTAA activation. DevEUI, AppEUI, AppKey stored in SPIFFS config.

* AU915 channel plan — 64 upstream channels at 125 kHz BW, 8 upstream channels at 500 kHz BW. Default to sub-band 2 (channels 8–15 \+ 65\) matching The Things Network AU915 plan.

* Spreading factor: SF9 (default) — balances range (\>3 km) with air time (\<1 second payload). Configurable to SF7–SF12 via config.

* Payload encoding: Cayenne Low Power Payload (LPP) format, or custom binary encoding (§10.2) — 51-byte max LoRa payload easily accommodates all 7 soil parameters \+ ambient \+ battery.

* Confirmed uplinks (ACK from gateway) for reliability. Max 1 retry on no-ACK.

## **8.7 OTA Firmware Updates** {#8.7-ota-firmware-updates}

OTA updates are delivered over WiFi using the ESP32 HTTPS OTA partition scheme:

* On successful WiFi connection, the firmware checks a TerraMind-hosted manifest file at a known URL. Manifest contains: latest\_version, firmware\_binary\_url, binary\_sha256.

* If current firmware version \< manifest latest\_version: download binary, verify SHA-256, write to OTA partition. Reboot into new partition on next deep sleep wake.

* Rollback: if new firmware fails to mark itself valid within 60 seconds of boot, ESP32 IDF bootloader reverts to previous OTA partition.

* OTA check frequency: once per day (on the first WiFi-successful wake after 03:00 NZST) to minimise battery impact.

## **8.8 Local AP Configuration Mode** {#8.8-local-ap-configuration-mode}

On first boot (no SPIFFS config file), or when the user holds the Heltec user button for 5 seconds on boot, the device enters AP configuration mode:

* ESP32-S3 broadcasts a WiFi access point: SSID \= 'SoilScouter-XXXXXX' (last 6 chars of MAC address), password \= 'terramind' (printed on device label).

* Captive portal served on 192.168.4.1 — a single-page HTML form (no external CSS/JS dependencies — all inline) allowing configuration of: WiFi SSID \+ password (up to 3), TerraMind device registration token, sample interval (minutes), LoRaWAN keys (if applicable).

* On form submission, configuration saved to SPIFFS, AP mode exited, normal boot sequence begins.

* AP mode times out after 5 minutes if no client connects — device falls into deep sleep and retries on next wake.

## **8.9 LED State Machine** {#8.9-led-state-machine}

| State | LED Pattern | Duration / Condition |
| :---- | :---- | :---- |
| Deep sleep / off | All off | Normal operation — LED off during sleep |
| Sensor reading | Blue solid | During Modbus read cycle (\~3 seconds) |
| WiFi connecting | Cyan slow blink (1 Hz) | During WiFi connection attempt |
| WiFi connected, transmitting | Green solid | During HTTPS POST |
| LoRa transmitting | Purple blink (2 Hz) | During LoRa TX (fallback path) |
| Success — data sent | Green flash × 2 | 2 quick flashes on successful transmission |
| Probe read error | Red blink × 3 | 3 red blinks on Modbus failure (all retries failed) |
| WiFi \+ LoRa fail — queued | Orange blink × 1 | 1 orange blink — payload queued to SPIFFS |
| Configuration AP mode | Blue fast blink (4 Hz) | While AP is active |
| OTA update downloading | White slow breathe | During OTA download |
| OTA complete — reboot | White flash × 5 | Before OTA reboot |
| Critical error / watchdog | Red solid 3s then off | Unrecoverable error — will enter deep sleep and reset |

## **8.10 Watchdog and Error Handling** {#8.10-watchdog-and-error-handling}

* Hardware watchdog: ESP32 TWDT (task watchdog timer) set to 30 seconds. If firmware hangs during any blocking call (WiFi, Modbus, OTA), watchdog resets the device.

* All error events written to SPIFFS error log with timestamp, error code, and context. Log capped at 100 entries (circular buffer).

* Boot counter stored in RTC memory. If \> 5 reboots within 10 minutes (crash loop): enter AP config mode for diagnostics.

* Payload SPIFFS queue maximum: 48 entries (\~12 hours of readings at 15-minute interval). If queue full and new reading fails transmission: oldest queued entry is discarded.

# **9\. Connectivity & Communication Specification** {#9.-connectivity-&-communication-specification}

## **9.1 Device Registration** {#9.1-device-registration}

Before first use, each Soil Scouter must be registered to an orchard block in TerraMind. Registration assigns:

* device\_id: UUID generated by TerraMind at registration time

* block\_id: the TerraMind block this device monitors

* orchard\_id: inherited from block

* device\_token: a secret shared credential used to authenticate HTTPS payloads

Registration is performed via the TerraMind Settings page (new 'Soil Scouters' section). The grower scans a QR code on the device label (encodes device serial number) and the platform issues device credentials. These credentials are stored to the device via the AP configuration mode portal.

## **9.2 HTTPS Payload Specification** {#9.2-https-payload-specification}

POST /api/v1/soil-readings — content-type: application/json — authenticated via Authorization: Bearer {device\_token}

Request body:

{  
  "device\_id": "uuid-v4",  
  "block\_id": "uuid-v4",  
  "timestamp\_utc": "2026-06-10T14:23:00Z",  
  "firmware\_version": "1.0.3",  
  "battery\_voltage": 3.82,  
  "battery\_percent": 76,  
  "transmission\_path": "wifi",  
  "readings": {  
    "soil\_moisture\_pct": 34.2,  
    "soil\_temperature\_c": 18.4,  
    "electrical\_conductivity\_us\_cm": 420,  
    "soil\_ph": 6.2,  
    "nitrogen\_mg\_kg": 145,  
    "phosphorus\_mg\_kg": 62,  
    "potassium\_mg\_kg": 189  
  },  
  "ambient": {  
    "temperature\_c": 12.3,  
    "humidity\_pct": 84.2  
  },  
  "reading\_quality": "good",  
  "queued\_readings\_count": 0  
}

## **9.3 LoRaWAN Binary Payload** {#9.3-lorawan-binary-payload}

When transmitting via LoRa (fallback path), the 7 soil parameters \+ ambient \+ battery are packed into a compact binary payload to minimise air time. Maximum payload: 51 bytes (LoRaWAN SF9 at AU915). Encoding uses Cayenne LPP channel IDs:

| Channel | LPP Type | Value | Bytes | Scale |
| :---- | :---- | :---- | :---- | :---- |
| 01 | Temperature (0x67) | Soil temperature | 2 signed | × 10 \= int16 |
| 02 | Humidity (0x68) | Soil moisture VWC | 1 unsigned | × 2 \= uint8 |
| 03 | Analog Input (0x02) | EC µS/cm | 2 signed | × 1 \= int16 |
| 04 | Analog Input (0x02) | Soil pH × 10 | 2 signed | × 10 \= int16 |
| 05 | Analog Input (0x02) | Nitrogen mg/kg | 2 signed | × 1 \= int16 |
| 06 | Analog Input (0x02) | Phosphorus mg/kg | 2 signed | × 1 \= int16 |
| 07 | Analog Input (0x02) | Potassium mg/kg | 2 signed | × 1 \= int16 |
| 08 | Temperature (0x67) | Ambient temperature | 2 signed | × 10 \= int16 |
| 09 | Humidity (0x68) | Ambient humidity | 1 unsigned | × 2 \= uint8 |
| 10 | Analog Input (0x02) | Battery voltage mV | 2 signed | × 1 \= int16 |

Total encoded payload: \~30 bytes. Well within LoRaWAN duty cycle constraints at SF9.

The TerraMind LoRaWAN integration server registers a webhook with The Things Network (TTN) or self-hosted ChirpStack to receive decoded uplinks and write them to the soil\_readings table (§10.2).

# **10\. Data Schema & API Integration** {#10.-data-schema-&-api-integration}

## **10.1 New Database Tables** {#10.1-new-database-tables}

Two new tables are added to the TerraMind Neon Postgres instance alongside the tables defined in AI PRD §2.5:

### **10.1.1 soil\_scouter\_devices** {#10.1.1-soil_scouter_devices}

| Field | Type | Description |
| :---- | :---- | :---- |
| device\_id | uuid | Primary key — generated at registration |
| block\_id | uuid | References blocks — the block this device monitors |
| orchard\_id | uuid | References orchards — denormalised for query efficiency |
| device\_serial | text | Hardware serial number — unique per unit, printed on label |
| device\_token\_hash | text | bcrypt hash of device\_token — plain token never stored |
| firmware\_version | text | Last reported firmware version |
| last\_seen\_at | timestamptz | Timestamp of last successful reading |
| last\_battery\_pct | numeric | Last reported battery percentage |
| last\_transmission\_path | text | wifi | lora — last successful path |
| sample\_interval\_min | integer | Configured sampling interval in minutes |
| calibration\_offsets | jsonb | Per-parameter calibration offsets applied server-side |
| status | text | active | inactive | error |
| registered\_at | timestamptz | Registration timestamp |
| created\_at | timestamptz | Row creation timestamp |
| updated\_at | timestamptz | Last update timestamp |

### **10.1.2 soil\_readings** {#10.1.2-soil_readings}

| Field | Type | Description |
| :---- | :---- | :---- |
| reading\_id | uuid | Primary key |
| device\_id | uuid | References soil\_scouter\_devices |
| block\_id | uuid | References blocks — denormalised |
| orchard\_id | uuid | References orchards — denormalised |
| measured\_at | timestamptz | UTC timestamp of measurement on device |
| received\_at | timestamptz | UTC timestamp of server receipt |
| transmission\_path | text | wifi | lora |
| firmware\_version | text | Firmware version at time of reading |
| soil\_moisture\_pct | numeric | Volumetric water content 0–100% |
| soil\_temperature\_c | numeric | Soil temperature °C |
| electrical\_conductivity\_us\_cm | numeric | EC µS/cm |
| soil\_ph | numeric | Soil pH (indicative) |
| nitrogen\_mg\_kg | numeric | Soil nitrogen mg/kg (indicative) |
| phosphorus\_mg\_kg | numeric | Soil phosphorus mg/kg (indicative) |
| potassium\_mg\_kg | numeric | Soil potassium mg/kg (indicative) |
| ambient\_temperature\_c | numeric | Ambient temperature °C (SHT31) |
| ambient\_humidity\_pct | numeric | Ambient relative humidity % (SHT31) |
| battery\_voltage\_v | numeric | Device battery voltage |
| battery\_pct | integer | Estimated battery percentage (0–100) |
| reading\_quality | text | good | suspect | partial — quality flag from firmware |
| raw\_payload | jsonb | Original unmodified JSON payload from device — for audit |

## **10.2 API Endpoints** {#10.2-api-endpoints}

New endpoints added to the TerraMind application API service (Railway), alongside endpoints defined in AI PRD §17.2:

| Method | Endpoint | Auth | Description |
| :---- | :---- | :---- | :---- |
| POST | /api/v1/soil-readings | device\_token | Ingest a soil reading from a Soil Scouter device. Writes to soil\_readings table. Triggers real-time block model update flag. |
| GET | /soil-scouters | user\_jwt | List all Soil Scouter devices for the authenticated orchard. Returns device status, last reading, battery level. |
| POST | /soil-scouters/register | user\_jwt | Register a new Soil Scouter device to a block. Returns device\_id and device\_token (single display — never stored). |
| GET | /soil-scouters/:id/readings | user\_jwt | Get time-series soil readings for a device. Supports ?from=\&to=\&interval=1h query parameters. |
| GET | /soil-scouters/:id/status | user\_jwt | Get current device status: online/offline, battery, last seen, firmware version. |
| PUT | /soil-scouters/:id/calibration | user\_jwt | Update calibration offsets for a device. Applied server-side to all future and historical readings. |
| DELETE | /soil-scouters/:id | user\_jwt (owner) | Deregister a device. Soil\_readings data retained; device marked inactive. |
| POST | /lorawan/uplink | webhook\_secret | LoRaWAN network server webhook endpoint. Accepts TTN/ChirpStack uplink JSON, decodes LPP payload, writes to soil\_readings. |

# **11\. Software Integration with TerraMind Platform** {#11.-software-integration-with-terramind-platform}

## **11.1 Data Ingestion Service Modifications (Railway)** {#11.1-data-ingestion-service-modifications-(railway)}

The existing TerraMind data ingestion service (Railway, Node.js) requires the following additions:

* New ingestion handler for POST /api/v1/soil-readings — authenticates device token, validates payload schema, writes to soil\_readings, updates soil\_scouter\_devices.last\_seen\_at.

* New LoRaWAN webhook handler for POST /lorawan/uplink — validates webhook shared secret header, decodes LPP payload from base64, maps to soil\_readings schema, writes to database.

* On each successful write to soil\_readings: set a Redis flag block:{block\_id}:soil\_updated \= 1 with 1-hour TTL. This flag is read by the nightly scan and irrigation prediction jobs to prioritise blocks with fresh soil data.

## **11.2 Nightly Insight Scan Integration (AI PRD §5)** {#11.2-nightly-insight-scan-integration-(ai-prd-§5)}

The nightly scan (AI PRD §5) is extended with two new finding types that consume soil\_readings data:

### **11.2.1 Soil Moisture Accumulating Deficit** {#11.2.1-soil-moisture-accumulating-deficit}

When the soil\_moisture\_pct reading for a block has remained below the block's irrigation trigger threshold (stored in crop\_parameters) for more than 48 consecutive hours, an accumulating\_risk finding is generated. This replaces or supplements the simulated soil moisture deficit currently used by the irrigation prediction model.

### **11.2.2 EC Anomaly Cross-Block** {#11.2.2-ec-anomaly-cross-block}

When electrical\_conductivity\_us\_cm across 3 or more blocks in the same orchard has risen by more than 30% over a rolling 7-day window simultaneously, a cross\_prediction\_correlation finding is generated. This pattern may indicate irrigation with saline water, fertiliser application, or soil health changes requiring agronomist review.

## **11.3 Irrigation Prediction Engine Integration (Core PRD §5.4.4)** {#11.3-irrigation-prediction-engine-integration-(core-prd-§5.4.4)}

The FAO-56 soil moisture model in the irrigation prediction engine currently runs on simulated soil moisture deficit computed from weather observations. With Soil Scouter data available:

* When soil\_readings exist for a block within the past 24 hours, the direct soil\_moisture\_pct measurement replaces the FAO-56 modelled VWC estimate as the initial condition for the irrigation forecast.

* The FAO-56 model continues to project forward from the measured initial condition. The measured initial condition reduces the forecast error associated with cumulative ET estimation errors.

* block\_season\_models.irrigation\_response is updated each week with a correction factor derived from the relationship between FAO-56 modelled VWC and measured VWC — the error represents the block's actual soil hydraulic properties vs. the generic model.

## **11.4 Compounding Season Intelligence Integration (AI PRD §12)** {#11.4-compounding-season-intelligence-integration-(ai-prd-§12)}

Soil readings contribute to two of the four compounding model components defined in AI PRD §12.2:

* Irrigation Response model (AI PRD §12.2.4): direct soil moisture measurements provide ground truth for calibrating the FAO-56 correction factors stored in block\_season\_models.irrigation\_response.

* Disease Pressure Antecedents (AI PRD §12.2.2): the ambient humidity readings from the SHT31 sensor (at the block) provide block-level leaf wetness proxy data that supplements regional NIWA station observations for Psa risk antecedent modelling.

## **11.5 Dashboard and UI Integration** {#11.5-dashboard-and-ui-integration}

The TerraMind frontend (Core PRD §7) gains the following additions for Soil Scouter data:

### **11.5.1 Block Detail View — Soil Panel** {#11.5.1-block-detail-view-—-soil-panel}

A new 'Soil' panel appears in the per-block detail view for blocks with a registered Soil Scouter. The panel shows:

* Current soil moisture % with trend arrow (vs 24h prior)

* Current soil temperature °C

* EC with 7-day sparkline

* pH reading with indicative disclaimer

* NPK readings with indicative disclaimer

* Device battery status indicator

* Last reading timestamp ('Updated 14 minutes ago')

### **11.5.2 Settings — Soil Scouters Page** {#11.5.2-settings-—-soil-scouters-page}

New Settings section: 'Soil Scouters'. Lists all registered devices with block assignment, battery level, last seen timestamp, and firmware version. Provides QR-based registration flow for new devices and calibration offset editor.

## **11.6 Alert Thresholds** {#11.6-alert-thresholds}

Two new alert types are added to the TerraMind alert system (Core PRD §11.2):

| Alert Type | Trigger Condition | Severity | Channel |
| :---- | :---- | :---- | :---- |
| Soil moisture critical low | soil\_moisture\_pct \< block irrigation trigger threshold for 6+ hours with no irrigation event logged | High | Push \+ email |
| Soil Scouter offline | No reading received from device for \> sample\_interval\_min × 4 minutes | Medium | Push \+ email |
| Battery low | battery\_pct \< 20% | Low | In-app only |
| EC spike detected | EC \> 3000 µS/cm (or \> 200% of 7-day median) on any reading | Medium | Push \+ email |

# **12\. Calibration Protocol** {#12.-calibration-protocol}

## **12.1 Overview** {#12.1-overview}

All 7-in-1 RS485 Modbus sensors are factory calibrated by the manufacturer. The factory calibration provides adequate accuracy for the relative-change monitoring TerraMind relies on for trend detection. However, soil type, temperature, and salinity effects can introduce systematic offsets. Calibration at two levels is supported:

## **12.2 Laboratory Calibration (Recommended at Deployment)** {#12.2-laboratory-calibration-(recommended-at-deployment)}

Procedure: before installing the probe in the field, a soil sample from the deployment site is analysed by a certified laboratory (e.g. Hill Laboratories, Hamilton). The lab report provides precise values for moisture, EC, pH, N, P, K. These are compared against the probe's readings in the same soil sample under controlled conditions, and offset values are calculated and stored in soil\_scouter\_devices.calibration\_offsets as a JSON object:

{ "soil\_moisture\_offset": \-1.2, "ec\_offset": 45, "ph\_offset": 0.1,  
  "n\_offset": 0, "p\_offset": 12, "k\_offset": \-8 }  
These offsets are applied server-side by the data ingestion service to all readings from this device, before storage in soil\_readings.

## **12.3 pH and EC Field Calibration** {#12.3-ph-and-ec-field-calibration}

### **12.3.1 pH Calibration** {#12.3.1-ph-calibration}

The FDR-based pH reading cannot be calibrated to laboratory accuracy using standard buffer solutions (the probe is not a glass electrode pH sensor). pH calibration consists of:

44. Confirm the probe reports a stable reading after 60 seconds in undisturbed soil.

45. Compare to a laboratory analysis of the same sample location.

46. Apply the difference as ph\_offset in calibration\_offsets.

    **Note:** pH offsets of more than ±1.0 pH unit indicate the FDR sensor is unsuitable as a pH reference for this soil type. In this case, flag the pH channel as not\_calibrated in calibration\_offsets and exclude pH from AI feature inputs for this device.

### **12.3.2 EC Calibration** {#12.3.2-ec-calibration}

EC calibration is more reliable on FDR sensors than pH. Field calibration:

47. Prepare a standard KCl solution at known EC (e.g. 1413 µS/cm at 25°C from a pre-made calibration sachet, available from most lab suppliers for \~$5).

48. Pack the calibration solution around the probe body (not immersed — the probe measures soil, not solution; create a slurry of the deployment soil \+ known KCl solution).

49. Record the probe EC reading and apply offset to match known KCl EC.

## **12.4 Calibration Drift Monitoring** {#12.4-calibration-drift-monitoring}

The nightly scan computes the rolling 30-day median of each soil parameter for each block. If any parameter's median drifts by more than 3 standard deviations of its historical variance without a corresponding agronomic event logged, a calibration\_drift finding is generated and surfaced as a medium-severity insight in the Insights Feed (AI PRD §6) with the message: 'Soil Scouter readings on \[Block\] may have drifted — consider recalibration.'

# **13\. Testing Protocol** {#13.-testing-protocol}

## **13.1 Phase 1 — Electronics and Bench Testing** {#13.1-phase-1-—-electronics-and-bench-testing}

Prerequisite: prototype PCB assembled, firmware loaded via USB-C, before enclosure assembly.

| Test ID | Test Description | Pass Criterion | Tools Required |
| :---- | :---- | :---- | :---- |
| E-01 | Power rail voltages at all nodes | VBAT: 3.6–4.2V; V3.3: 3.28–3.32V; VSENSE (12V): 11.7–12.3V with MOSFET enabled | Digital multimeter |
| E-02 | VSENSE power switching via GPIO38 | VSENSE drops to \<0.1V within 100ms of GPIO HIGH; rises to 12V within 500ms of GPIO LOW | Multimeter \+ oscilloscope |
| E-03 | Deep sleep current measurement | \<100 µA on VBAT rail with VSENSE off, SHT31 idle, Heltec in deep sleep | µA-capable meter or INA219 in series |
| E-04 | Battery charging via USB-C | Heltec onboard charger accepts 5V USB-C input; VBAT rises from 3.6V to 4.1V+ over 2 hours | Multimeter, USB-C power supply |
| E-05 | Solar charging via CN3791 | With 6V solar input: VBAT rises at \> 50 mA charging rate under 500 lux illumination | Adjustable bench supply set to 6V as solar proxy, multimeter |
| E-06 | RS485 Modbus read — all 7 parameters | Modbus query returns valid CRC-checked 20-byte response within 1 second; all 7 values within sensor specified ranges | Serial monitor (PlatformIO), soil probe connected |
| E-07 | SHT31 ambient read | I2C address ACK on 0x44; temperature within ±1°C of reference thermometer; humidity within ±3% RH of reference hygrometer | Serial monitor, calibrated reference instruments |
| E-08 | LED all colours and patterns | All 3 LED channels drive correctly; no channel crossfeed; brightness consistent | Visual inspection |
| E-09 | WiFi connect and HTTPS POST | Device connects to test AP; HTTPS POST returns 201; row written to test database | Test WiFi AP, TerraMind staging endpoint |
| E-10 | LoRa TX and TTN receipt | LoRa frame transmitted; received by TTN console within 30 seconds; LPP payload decoded correctly | TTN console, LoRaWAN coverage at test location |

## **13.2 Phase 2 — Firmware Unit Tests (on-device)** {#13.2-phase-2-—-firmware-unit-tests-(on-device)}

Implemented as a PlatformIO test suite running on target hardware (not emulated):

* test\_modbus\_crc: verify CRC-16/Modbus computation for known test vectors

* test\_lpp\_encoding: verify binary LPP payload encoding/decoding round-trip for all parameters

* test\_json\_serialisation: verify JSON payload construction with edge values (0, max, negative temperature)

* test\_spiffs\_read\_write: verify config read/write to SPIFFS survives power cycle

* test\_calibration\_offset\_application: verify calibration offsets are applied correctly to raw readings

* test\_deep\_sleep\_rtc\_persistence: verify boot counter and last readings persist across deep sleep cycle

* test\_retry\_logic: simulate Modbus timeout — verify 3 retries, then graceful null-reading path

## **13.3 Phase 3 — Environmental Testing** {#13.3-phase-3-—-environmental-testing}

Tests conducted on assembled, sealed units before field deployment:

| Test ID | Test Description | Pass Criterion | Duration |
| :---- | :---- | :---- | :---- |
| ENV-01 | IP65 water ingress — 12.5 L/min nozzle at 2.5 bar from all angles (as per IEC 60529 IPX5) | No water ingress to internal components after 3-minute test. No condensation on PCB. | 3 minutes per enclosure |
| ENV-02 | Dust exclusion — fine talcum powder applied around all seals | No powder deposits on internal components after 30 minutes exposure with enclosure shaken every 5 minutes | 30 minutes |
| ENV-03 | Temperature cycling — \-5°C to \+50°C | Device completes a full measurement and transmission cycle at \-5°C and at \+50°C without firmware error | 2 hours per extreme (domestic freezer \+ summer greenhouse) |
| ENV-04 | Cable gland pull test | Sensor cable supports 50N tensile load for 60 seconds without ingress or cable pullout | 60 seconds per gland |
| ENV-05 | UV exposure — solar panel and enclosure lid | No physical degradation (cracking, yellowing, seal compression) after 72-hour outdoor UV exposure | 72 hours |

## **13.4 Phase 4 — Field Validation (Pilot Orchard)** {#13.4-phase-4-—-field-validation-(pilot-orchard)}

Deployed at pilot orchard with TerraMind platform in operation. Target: 2 nodes on different blocks, 14-day validation run.

* Reading continuity: \>95% of expected readings received by TerraMind over 14 days (at 15-minute intervals: expected \~1,344 readings per device; accept \>1,277 received).

* Battery performance: battery% decrease \< 5% per week in winter conditions with solar panel attached (validates power budget model).

* Modbus read error rate: \<2% of reads result in CRC error or timeout (retries not counted as errors if ultimately successful).

* WiFi/LoRa path distribution: log proportion of WiFi vs LoRa transmission across 14 days — LoRa fallback rate reported to co-founders.

* Comparison to laboratory reference: extract 2 soil samples per node location at week 2 for laboratory analysis. Compare against Soil Scouter readings. Document offset for each parameter. Acceptable deviation: moisture ±3%, EC ±10%, pH ±0.5, NPK qualitative agreement on directional ranking.

## **13.5 Phase 5 — Integration Testing with TerraMind Platform** {#13.5-phase-5-—-integration-testing-with-terramind-platform}

End-to-end integration test against TerraMind staging environment:

* Soil\_readings row written to database with correct block\_id assignment on both WiFi and LoRa paths.

* Nightly scan correctly consumes soil\_readings for soil moisture accumulating deficit finding — manually stage conditions and verify finding generated.

* Irrigation prediction engine uses measured VWC as initial condition — verify by querying prediction API before and after injecting a soil reading with extreme low moisture value.

* Soil panel appears in block detail view with correct current readings and trend arrow.

* Soil Scouter offline alert fires if device is turned off for \> sample\_interval × 4 minutes.

* OTA update delivery — load older firmware, trigger OTA check, verify new firmware applied and device reboots into correct version.

## **13.6 Acceptance Criteria Summary** {#13.6-acceptance-criteria-summary}

| Criterion | Threshold | Test Phase |
| :---- | :---- | :---- |
| Reading continuity (14-day field trial) | \>95% of expected readings received | Field Validation |
| Modbus read error rate | \<2% of read attempts (after retries) | Field Validation |
| Deep sleep current | \<100 µA | Bench Testing |
| IP65 water ingress | Zero ingress after 3-minute IPX5 test | Environmental |
| WiFi connection reliability (good coverage) | \>98% of transmissions succeed on WiFi path | Field Validation |
| LoRa range (open farmland) | \>2 km with TTN gateway; \>500 m without line of sight | Field Validation |
| Battery life without solar (winter) | \>60 days at 15-minute intervals | Field Validation |
| Soil moisture accuracy vs laboratory | Within ±3% VWC | Field Validation |
| EC accuracy vs laboratory | Within ±10% | Field Validation |
| OTA update delivery rate | \>99% of devices update within 48 hours of release | Integration Testing |
| End-to-end latency (reading to TerraMind) | \<5 minutes from measurement to database row written | Integration Testing |

# **14\. Prototype Build Guide** {#14.-prototype-build-guide}

## **14.1 Sequence Overview** {#14.1-sequence-overview}

The prototype build follows this sequence:

50. Order all components from BOM (Appendix A) — allow 2–4 weeks for AliExpress delivery.

51. Set up PlatformIO development environment and clone firmware repository.

52. Assemble prototype PCB (step 14.2).

53. Flash firmware and run bench tests (step 14.3).

54. Assemble enclosure (step 14.4).

55. Configure device via AP mode (step 14.5).

56. Deploy to field (step 14.6).

## **14.2 PCB Assembly** {#14.2-pcb-assembly}

For the prototype phase, assembly is on a solderable prototype PCB (70 × 90 mm). Component placement (recommended):

* SP3485E (DIP-8): solder directly to PCB at position A1. Wire DI, RO, DE/RE pins to Heltec header connections per GPIO map (§6.3).

* MT3608 boost module: solder to PCB at position B1. Connect input to VBAT (3.7V); trim output potentiometer to 12V (measure with multimeter before connecting sensor); connect output to VSENSE node via MOSFET drain.

* CN3791 solar MPPT module: solder to PCB at position B2. Connect V-IN/GND to solar panel JST connector; V-OUT to VBAT (parallel with Heltec battery input via schottky diode).

* IRF9540N MOSFET (or SOT-23 equivalent): gate to GPIO38 via 10kΩ resistor; drain to VSENSE line; source to VBAT.

* 120Ω RS485 termination resistor: between RS485 A and B lines at the PCB end.

* 10kΩ bias resistors: A line pulled up to 3.3V; B line pulled down to GND.

* 100µF decoupling capacitor: across VSENSE rail at MT3608 output.

* 10µF decoupling capacitors: across V3.3 rail and at Heltec power input.

* RGB LED: mount externally through enclosure wall; 3-pin connector to PCB for easy disassembly.

* 18650 battery holder: mount flat on PCB with JST SH-1.25 connector to Heltec battery port. Ensure polarity verified before connecting.

## **14.3 Firmware Flash** {#14.3-firmware-flash}

Prerequisite: PlatformIO installed in VS Code; Heltec V3 USB-C driver installed.

57. Clone firmware repository: git clone https://github.com/terramind-io/soil-scouter-firmware

58. Open project in VS Code / PlatformIO.

59. Copy include/config.h.example to include/config.h — do not commit config.h (gitignored).

60. Connect Heltec V3 to PC via USB-C. Select Heltec WiFi LoRa 32(V3) as PlatformIO target.

61. Build and upload: PlatformIO \> Upload.

62. Open Serial Monitor at 115200 baud. Verify boot log shows correct firmware version, SPIFFS mounted, no config file found → AP mode activated.

63. Run PlatformIO test suite: PlatformIO \> Test. All 7 unit tests must pass.

## **14.4 Enclosure Assembly** {#14.4-enclosure-assembly}

64. Drill 2× M12 cable gland holes on bottom face of enclosure. Use 12mm hole saw or step drill.

65. Drill 5mm LED hole on side face at top, angled 15° downward for field visibility.

66. If external SMA antenna: drill SMA bulkhead hole on side face; mount SMA bulkhead connector; connect Heltec SMA pigtail.

67. Install M3 nylon standoffs on PCB corners with 8mm M3 screws.

68. Mount PCB assembly inside enclosure on M3 standoffs using additional M3 screws through enclosure base.

69. Route sensor cable through lower cable gland — insert from outside, tighten gland body.

70. Route solar cable through upper cable gland — same procedure.

71. Connect sensor 4-wire cable to PCB RS485 terminal block: \+12V (red), GND (black), RS485-A (green), RS485-B (yellow).

72. Connect solar 2-wire cable to CN3791 module input.

73. Insert LED through external hole, secure with silicone, connect 3-pin connector to PCB.

74. Verify all internal connections are secure and no wires can contact PCB copper or 12V rails unexpectedly.

75. Apply RTV silicone bead inside lid gasket groove. Seat lid, tighten 4× M4 screws evenly in cross pattern.

## **14.5 Device Configuration via AP Mode** {#14.5-device-configuration-via-ap-mode}

76. Power device via USB-C (charge battery before field deployment).

77. On first boot, device broadcasts AP 'SoilScouter-XXXXXX'.

78. Connect phone or laptop to the AP (password: 'terramind').

79. Navigate to http://192.168.4.1 in browser.

80. Enter: WiFi SSID \+ password, TerraMind registration token (obtained from Settings \> Soil Scouters in the app), sample interval (default: 15 minutes), LoRaWAN keys if applicable.

81. Submit form. Device reboots into normal operation.

82. Verify in TerraMind app \> Settings \> Soil Scouters: device appears as 'active', last seen within past 5 minutes.

## **14.6 Field Deployment** {#14.6-field-deployment}

83. Select probe installation point: root zone of representative vine, mid-row, avoiding irrigation emitter direct splash zone.

84. Create pilot hole to 20 cm depth using 30mm auger or soil knife.

85. Insert probe vertically — ensure all 5 stainless probes are below soil surface.

86. Backfill annular gap with original soil. Tamp firmly.

87. Route cable to stake location. Cable should not be taut — allow 20% slack for ground settlement.

88. Mount enclosure on 50mm diameter stake at 100 cm height. Ensure solar panel faces north at 35° tilt.

89. Confirm LED green flash on next transmission cycle (within 15 minutes of power-on).

90. Confirm reading visible in TerraMind app \> Block detail \> Soil panel within 20 minutes of deployment.

# **15\. Regulatory Considerations** {#15.-regulatory-considerations}

## **15.1 Radio Frequency Compliance — New Zealand** {#15.1-radio-frequency-compliance-—-new-zealand}

The Heltec WiFi LoRa 32 V3 operates on two radio bands:

* 2.4 GHz WiFi and BLE: permitted in NZ under the general user licence for radio devices (RSM General User Licences for Radio Communication). The Heltec V3 uses an ESP32-S3 module with FCC/CE certification on the radio subsystem. Prototype use in NZ is permitted under Class Licence provisions.

* 915 MHz LoRa (AU915 band): permitted in NZ under the General User Licence for Short Range Devices (SRD) operating in the 915–928 MHz band. Maximum 1W EIRP for wideband signals. The Heltec V3 at \+20 dBm (100 mW) with the supplied 0 dBi stub antenna is compliant.

  **Note:** The prototype is exempt from Radiocommunications Act compliance testing as a self-supplied research and development device used by the manufacturer. Commercial sale or supply of the assembled product requires Telepermit certification or compliance with NZ General User Licence conditions.

## **15.2 Electrical Safety** {#15.2-electrical-safety}

The Soil Scouter prototype operates entirely on SELV (Safety Extra Low Voltage) — maximum 12V DC from the MT3608 boost. No mains-voltage connection at any point. Li-Ion battery management (overcharge, over-discharge, short-circuit protection) is provided by the Heltec board's integrated protection circuit.

The lithium-ion cells must be from a reputable manufacturer (Samsung, Panasonic, LG). Do not use unbranded cells with inflated capacity claims — cell quality directly affects protection circuit behaviour. Label all battery-containing enclosures: 'Li-Ion Battery — Do not short-circuit or pierce.'

## **15.3 IP Rating** {#15.3-ip-rating}

IP65 provides protection against dust ingress (dust-tight) and water jets (6.3 L/min nozzle from any direction at 2.5 bar). This is adequate for outdoor orchard deployment exposed to rain and irrigation spray. It does not provide protection against submersion. Deploy the enclosure above the maximum expected flood line in the orchard row.

## **15.4 Data and Privacy** {#15.4-data-and-privacy}

Soil readings are orchard-specific agronomic data. Under the TerraMind data licence (Core PRD §3.11), growers retain ownership of their block data. Soil readings must not be shared with other growers or third parties without explicit consent. The AI PRD §16.2 cross-grower pattern detection feature applies only to de-identified aggregated data — individual block soil readings are never exposed to other growers.

# **16\. Risks and Open Questions** {#16.-risks-and-open-questions}

| Risk / Open Question | Category | Severity | Mitigation / Resolution Required |
| :---- | :---- | :---- | :---- |
| NPK and pH FDR measurement accuracy is insufficient for TerraMind's agronomic recommendations | Product / Data Quality | High | Framed as indicative in all UI surfaces (§2.3). Field validation against Hill Labs analysis in §13.4 will quantify accuracy gap. If gap is unacceptable, NPK/pH channels are excluded from AI feature inputs and the sensor is respecified as a 4-parameter device (moisture, temperature, EC \+ ambient). |
| WiFi coverage insufficient at pilot orchard blocks | Connectivity | Medium | LoRa fallback specified and costed. TTN coverage pre-check required before deployment. LoRa gateway budget should be in project contingency. |
| LoRa AU915 gateway not available near pilot orchards | Connectivity | Medium | \[OPEN\] Confirm TTN gateway coverage at pilot locations. If absent, budget for one Heltec HT-M02 LoRaWAN gateway (\~NZD $180) per orchard. |
| Modbus register map of received sensors does not match documented map | Hardware / Integration | Medium | Physical verification protocol specified in §6.4. Always verify with serial terminal before integration. Sensors from different AliExpress suppliers may have different register layouts. |
| 12V VSENSE boost converter causes EMI that interferes with RS485 signal quality | Hardware / EMC | Low-Medium | Shielded cable for RS485; capacitive decoupling on boost output; ferrite bead on VSENSE rail. If EMI is observed during bench testing, consider switching VSENSE to 5V (minimum for this sensor class). |
| Li-Ion cell quality variation from AliExpress suppliers | Hardware / Safety | Medium | Specify Samsung 30Q or LG MJ1 cells by model number. Do not accept unbranded or counterfeit cells. Source from reputable NZ distributor (PB Technologies, Jaycar) for pilot units even at higher cost. |
| Soil probe cable damaged by orchard machinery (mowers, tractors) | Field / Reliability | Medium | Route cable through existing irrigation conduit or bury in conduit. Cable jacket should be rated for UV and mechanical stress (TPU or PUR jacket). Document installation guide for orchard staff. |
| Deep sleep current exceeds budget due to Heltec V3 peripheral leakage | Power / Reliability | Low-Medium | Measure actual deep sleep current on assembled board per test E-03. If \> 100 µA, investigate peripheral leakage (OLED, RS485 transceiver bias). GPIO hold configuration may be required for some pins. |
| \[OPEN\] Sample interval configuration — what is the minimum meaningful interval? | Product | Low | Default 15 minutes is proposed. Soil moisture changes on hourly timescales in most kiwifruit soil types. 15-minute interval is arguably higher than necessary and increases battery drain. Co-founders to decide: 15 min vs 30 min default based on battery life priority vs data resolution priority. |
| \[OPEN\] Multi-depth sensing for v1 | Product Scope | Low | Single depth (15–20 cm) is specified. Kiwifruit root zone extends to 50 cm in some soils. Multi-depth capability deferred to v2 to control prototype complexity. Document for v2 backlog. |

# **17\. Development Roadmap** {#17.-development-roadmap}

## **17.1 Phase 0 — Design Validation (2 weeks)** {#17.1-phase-0-—-design-validation-(2-weeks)}

* Resolve all \[OPEN\] items in this document

* Order prototype components from Appendix A BOM

* Complete GPIO and pinout verification on Heltec V3 hardware

* Verify Modbus register map against physical sensor units

* Set up PlatformIO project structure and firmware repository

## **17.2 Phase 1 — Prototype Build and Bench Testing (3 weeks)** {#17.2-phase-1-—-prototype-build-and-bench-testing-(3-weeks)}

* Assemble 2 prototype units on prototype PCBs

* Flash firmware, run all Phase 1 bench tests (§13.1) and firmware unit tests (§13.2)

* Achieve all bench test pass criteria

* Iterate enclosure assembly and sealing

## **17.3 Phase 2 — Environmental and Communication Testing (1 week)** {#17.3-phase-2-—-environmental-and-communication-testing-(1-week)}

* Complete Phase 3 environmental tests (§13.3)

* Complete LoRa range and TTN integration tests

* Complete OTA update delivery test

## **17.4 Phase 3 — TerraMind Integration and API (2 weeks, parallel with Phase 2\)** {#17.4-phase-3-—-terramind-integration-and-api-(2-weeks,-parallel-with-phase-2)}

* Deploy new soil\_readings and soil\_scouter\_devices database tables to staging

* Implement ingestion API endpoint and LoRaWAN webhook

* Implement Soil panel in block detail view (frontend)

* Implement Settings \> Soil Scouters page

* Implement nightly scan soil moisture and EC anomaly finding types

* Implement irrigation prediction engine soil moisture initial condition integration

* Complete Phase 5 integration tests (§13.5)

## **17.5 Phase 4 — Field Validation Pilot (2 weeks)** {#17.5-phase-4-—-field-validation-pilot-(2-weeks)}

* Deploy 2 units to pilot orchard — one per block

* Monitor all acceptance criteria (§13.6) over 14 days

* Collect laboratory soil samples at day 14 for accuracy validation

* Document field findings, update calibration offsets

* Prepare prototype-to-production recommendation report for co-founder review

## **17.6 v2 Hardware Considerations (Post-Pilot, Not in Scope for v1)** {#17.6-v2-hardware-considerations-(post-pilot,-not-in-scope-for-v1)}

* Custom PCB design (JLCPCB 4-layer) — replaces prototype PCB, reduces assembly time and failure modes

* RCM certification for commercial supply in NZ/AU (required before selling to growers)

* Multi-depth probe configuration (2 probes at 15 cm and 40 cm per node)

* 4G/LTE CAT-M1 modem as tertiary fallback (for blocks with neither WiFi nor LoRa coverage)

* GPS tagging on first deployment (auto-populate block coordinates)

* NB-IoT investigation as lower-power alternative to LoRa for high-density deployments

# **Appendix A: Hardware Bill of Materials — Prototype (2 Units)** {#appendix-a:-hardware-bill-of-materials-—-prototype-(2-units)}

**⚠  DRAFT — FOR REVIEW ONLY  ⚠  All component prices, specifications, and timelines are indicative and subject to change.**

All prices are indicative NZD estimates based on June 2026 AliExpress, PB Technologies, Jaycar, and Element 14 pricing. Prices exclude GST unless stated. Shipping estimated where applicable.

| \# | Component | Part / Model | Qty | Unit Price (NZD) | Total (NZD) | Source | Why Needed |
| :---- | :---- | :---- | :---- | :---- | :---- | :---- | :---- |
| 1 | MCU \+ LoRa \+ WiFi \+ BLE \+ OLED \+ Battery Mgmt | Heltec WiFi LoRa 32 V3 — 915 MHz | 2 | $30.00 | $60.00 | AliExpress (Heltec official store) | Primary MCU for all computation, WiFi, BLE, and LoRa radio in one module. Replaces separate ESP32 DevKitC, LoRa module, and battery management module from original BOM. ESP32-S3 dual-core at 240 MHz; SX1262 LoRa; integrated Li-Ion management; 0.96-inch OLED for diagnostics. |
| 2 | 7-in-1 Soil Sensor (Moisture, Temp, EC, pH, N, P, K) | RS485 Modbus 7-in-1 soil sensor, stainless 5-probe, IP68 | 2 | $47.00 | $94.00 | AliExpress (JXCT or equivalent) | Primary sensing element. Measures all 7 soil parameters via Modbus-RTU at 9600 baud on RS485. IP68-rated probe for permanent burial. 5V–30V supply voltage. |
| 3 | RS485 Transceiver (3.3V native) | SP3485E DIP-8 (5-pack) | 1 | $3.00 | $3.00 | AliExpress | Converts ESP32-S3 UART (3.3V) to RS485 differential signalling for Modbus communication to soil probe. 3.3V native operation eliminates level-shifting required by original MAX485CPA+ (5V). DIP-8 package is breadboard-compatible for prototype. |
| 4 | Li-Ion Battery Cells 18650 3000 mAh | Samsung 30Q or LG MJ1 18650 3000 mAh (pair) | 2 pairs | $14.00 | $28.00 | Jaycar / PB Technologies NZ | Primary energy storage. 2 cells per node in 2P configuration for 6000 mAh total at 3.7V. Quality cells specified by model number — not unbranded. Jaycar/PB Technologies preferred for known provenance over AliExpress for safety-critical lithium cells. |
| 5 | Solar MPPT Charge Controller | CN3791 Solar MPPT Charger Module (5-pack) | 1 | $8.00 | $8.00 | AliExpress | Maximum Power Point Tracking solar charger for 6V panel input. Extracts 20–40% more energy from solar panel than TP4056-based charging. Feeds CN3791 output into 18650 battery bank in parallel with Heltec charging circuit. Enables extended battery life in field. |
| 6 | Solar Panel 6V 2W Mini | 6V 2W Monocrystalline mini solar panel 130×110mm | 2 | $7.00 | $14.00 | AliExpress | Trickle-charges the 18650 battery bank during daylight hours. 2W panel at NZ winter insolation (\~4 peak sun hours) yields \~8 Wh/day against \~50 mWh/day consumption — net positive every day. Eliminates need for frequent battery replacement in field. |
| 7 | 5V to 12V Boost Converter | MT3608 step-up boost module (5-pack) | 1 | $6.00 | $6.00 | AliExpress | Boosts 3.7V battery voltage to 12V for the RS485 soil sensor power supply rail (sensor requires 5–30V). Efficiency \~93% at operating load. GPIO-switched via P-channel MOSFET to cut sensor power during deep sleep and eliminate quiescent drain. |
| 8 | P-channel MOSFET (sensor power switch) | AO3401A SOT-23 P-channel MOSFET (10-pack) | 1 | $3.00 | $3.00 | AliExpress | Software-controlled power gate for the 12V VSENSE rail feeding the soil sensor. GPIO38 HIGH \= sensor power off during deep sleep. Eliminates \~3–5 mA sensor quiescent current during sleep (largest single sleep current contributor after MCU). |
| 9 | Ambient Temp/Humidity Sensor | Sensirion SHT31-D breakout module | 2 | $5.00 | $10.00 | AliExpress | Measures above-canopy ambient temperature and relative humidity at block level over I2C. Directly feeds Psa leaf wetness risk model with block-specific data (replacing regional NIWA station data). ±2% RH, ±0.3°C accuracy — significantly better than DHT22 at only marginally higher cost. |
| 10 | Weatherproof Enclosure IP65 | ABS IP65 Junction Box 100×68×50mm with gasket lid | 2 | $10.00 | $20.00 | AliExpress | Houses all electronics in a dust-tight, water-jet-resistant enclosure suitable for outdoor orchard deployment. Sufficient internal volume for PCB, 2× 18650 cells, Heltec board, and all supporting modules. |
| 11 | M12 Waterproof Cable Glands | PG7 M12 nylon cable gland 3–6.5mm OD (10-pack) | 1 | $5.00 | $5.00 | AliExpress | Sealed cable entry points for sensor cable (4-wire) and solar panel cable (2-wire). Two glands per enclosure, IP65-rated. Nylon construction avoids corrosion. |
| 12 | RGB LED Status Indicator | 5mm common cathode RGB LED (10-pack) | 1 | $2.00 | $2.00 | AliExpress | Provides field-visible status indication — connection status, errors, OTA updates — without requiring the grower to access the app or enclosure. State machine covers 12 distinct states (§8.9). |
| 13 | 915 MHz LoRa Antenna | Included with Heltec WiFi LoRa 32 V3 | 2 | $0.00 | $0.00 | Included | 915 MHz external stub whip antenna included with Heltec V3 purchase. SMA connector on Heltec board. For improved range in obstructed orchard environments, upgrade to 5 dBi gain fiberglass antenna (\~$8 each). |
| 14 | 120Ω RS485 Termination Resistors | 1/4W 120Ω ±5% through-hole (10-pack) | 1 | $1.50 | $1.50 | AliExpress / Jaycar | RS485 line termination at the node end of the bus. Required to suppress signal reflections on cables longer than \~1 metre. One per node. |
| 15 | 10kΩ and 150Ω Resistors (mixed) | 1/4W resistor assortment 10kΩ (RS485 bias, pull-ups) and 150Ω (LED current limiting) — 100-pack each | 1 each | $2.00 each | $4.00 | AliExpress / Jaycar | 10kΩ for RS485 A/B line bias and GPIO pull-up/down. 150Ω for LED current limiting to \~10 mA at 3.3V on all three RGB channels. |
| 16 | Decoupling Capacitors (100µF \+ 10µF) | 100µF 16V electrolytic (5-pack) \+ 10µF X5R ceramic 0805 (20-pack) | 1 each | $2.00 each | $4.00 | AliExpress / Jaycar | Decoupling on power rails: 100µF on 12V boost output; 10µF on 3.3V rail and Heltec battery input. Suppresses switching noise from MT3608 boost converter. |
| 17 | 18650 Battery Holder (2-cell parallel) | 2× 18650 parallel battery holder with leads (5-pack) | 1 | $5.00 | $5.00 | AliExpress | Holds 2× 18650 cells in parallel configuration. Includes JST connector compatible with Heltec SH-1.25 battery port (adapter may be required — verify at assembly). |
| 18 | JST Connectors (SH-1.25 and PH-2.0) | SH-1.25 2-pin female \+ PH-2.0 2-pin female \+ male connector pairs (10-pack each) | 1 each | $3.00 each | $6.00 | AliExpress | SH-1.25 for Heltec battery connection; PH-2.0 for solar panel to CN3791 input. Matching the Heltec connector type avoids solder-direct connections to the board. |
| 19 | Prototype PCB (solderable) | 70×90mm double-sided copper PCB prototype board (5-pack) | 1 | $4.00 | $4.00 | AliExpress | Component mounting platform for prototype assembly. Solderable pads allow reliable connections vs. breadboard. 70×90mm fits inside the 100×68mm enclosure with 5mm clearance. |
| 20 | Hookup Wire Kit 22AWG Silicone | 22AWG stranded silicone wire kit, 10 colours, 5m each (AliExpress) | 1 | $15.00 | $15.00 | AliExpress (retained from original BOM) | Internal wiring harness: power rails (22AWG), signal lines (22AWG). Silicone jacket preferred over PVC for flexibility in cold temperatures and resistance to heat from boost converter. |
| 21 | M3 Screws, Nuts, and Nylon Standoffs | M3×8mm A2 stainless screws (50-pack) \+ M3 nuts (50-pack) \+ M3 nylon standoffs 10mm (20-pack) | 1 kit | $6.00 | $6.00 | AliExpress / Jaycar | PCB mounting in enclosure; Heltec board mounting on prototype PCB. Nylon standoffs prevent conductive contact between PCB and enclosure base. |
| 22 | Silicone RTV Sealant (clear) | Clear silicone RTV sealant tube, \-60°C to \+200°C | 1 tube (shared) | $8.00 | $8.00 | Mitre 10 / Bunnings NZ | Additional sealing around LED holes, cable glands, and enclosure lid gasket compression. UV and temperature stable. |
| 23 | Self-Amalgamating Tape | 19mm × 3m roll (2-pack) | 1 | $6.00 | $6.00 | Jaycar NZ | Weatherproofing antenna SMA connector and solar panel cable junction at enclosure entry. |
| 24 | Heatshrink Tubing Assortment | 3:1 adhesive-lined heatshrink, 2–10mm diameter, 1m lengths (assortment pack) | 1 | $5.00 | $5.00 | Jaycar NZ / AliExpress | Cable joint insulation, connector strain relief, and short-circuit prevention on exposed solder joints. |
| 25 | Deployment Stakes (50mm OD) | 50mm OD × 1200mm galvanised steel round post (per unit) | 2 | $12.00 | $24.00 | Mitre 10 / Bunnings NZ | Mounting post for enclosure and solar panel in orchard row. 1200mm height places enclosure at \~100cm above ground for solar exposure and LED visibility. |
| 26 | RS485 Sensor Cable Extension (if required) | 4-core 0.5mm² RS485/Modbus shielded cable, per metre | 4 m | $3.00/m | $12.00 | Element 14 NZ / Jaycar | Extension cable if the 2m sensor cable supplied with probe is insufficient to reach the enclosure stake location. Use only shielded cable for RS485 runs \> 2m to prevent EMI pickup. |

| BOM Summary | Per Unit (NZD) | 2-Unit Prototype (NZD) |
| :---- | :---- | :---- |
| **Electronics and modules (items 1–18)** | $120.25 | $240.50 |
| **Enclosure and mechanical (items 10–13, 21–26)** | $43.00 | $86.00 |
| **Consumables and tooling (items 19–20, 22–24)** | $19.00 | $38.00 |
| **Deployment hardware (items 25–26)** | $18.00 | $36.00 |
| **Shipping (AliExpress estimated, 2–4 weeks)** | \~$25.00 | \~$25.00 (shared) |
| **TOTAL ESTIMATED PROTOTYPE COST (2 units)** | **\~$225 per unit** | **\~$425 total** |
| Original Hardware Expense Sheet total (1 node, before tax/shipping) | $237.64 (1 unit) | \~$408.65 (with tax/ship) |
| **Revised BOM — additional capabilities vs original** | LoRa fallback, Solar charging, Ambient sensor, MPPT, IP65 enclosure, proper RS485 3.3V transceiver |  |

**Note:** The revised 2-unit prototype BOM delivers two fully functional field nodes with LoRa fallback, solar-assisted charging, ambient sensing, and proper IP65 enclosures for approximately $425 total — compared to $408.65 for a single, WiFi-only, non-enclosed prototype in the original specification. The additional $16 for the second unit's marginal cost reflects the bulk savings on shared component packs (resistors, connectors, cable glands) and the absence of a separate LoRa module and battery charger board (now integrated in the Heltec V3).

# **Appendix B: Document Changelog** {#appendix-b:-document-changelog}

| Version / Date | Changes |
| :---- | :---- |
| v0.1-DRAFT — June 2026 | Initial draft. Full technical specification from hardware through integration testing. Component BOM revised from Hardware Expense Sheet v1 (June 2026\) with research-backed alternatives. |

# **Appendix C: Open Decisions Log** {#appendix-c:-open-decisions-log}

| Area | Decision Required | Owner |
| :---- | :---- | :---- |
| LoRa gateway coverage | Confirm TTN gateway coverage at pilot orchard GPS coordinates before deployment. If absent, approve budget for Heltec HT-M02 gateway (\~NZD $180). | Aaqib Sharif |
| Sample interval default | 15 minutes vs 30 minutes default sampling interval. Trade-off: data resolution vs battery life. Recommend 30 minutes for v1 prototype (reduces daily energy by \~45%). | Co-founders |
| Sensor register map verification | Physically verify Modbus register addresses on received sensor units before firmware integration. Do not assume register map matches documentation. | Aaqib Sharif |
| pH channel inclusion | Confirm whether pH readings are included in AI feature inputs given ±0.3 pH FDR accuracy. Recommend: include as trend indicator with explicit disclaimer; exclude from automated threshold alerts. | Hasan Sheikh (AI PRD §7.4) |
| Enclosure grade | IP65 vs IP67 for pilot deployment. If orchard rows are flood-irrigated, upgrade to IP67 (submersion-rated) at \~$5 additional cost per unit. | Aaqib Sharif |
| 18650 cell sourcing | Source Samsung 30Q or LG MJ1 from NZ distributor (Jaycar/PB Tech) for pilot, not AliExpress. Cost premium is justified for safety-critical lithium cells in unmonitored field deployment. | Co-founders |
| SMA antenna upgrade | Consider 5 dBi gain fiberglass LoRa antenna (\~$8 each) over supplied stub antenna for better orchard penetration. Evaluate during Phase 1 bench testing with TTN range test. | Aaqib Sharif |

