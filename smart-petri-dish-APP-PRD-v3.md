# Smart Petri Dish — App PRD
## Guided Health Screening System · v3.0 FINAL

**Date:** April 2026

---

## FINAL DEFINITION

> Smart Petri Dish is a **guided health screening system**
> that helps users take the right next step, with medical validation when needed.
>
> NOT: a hospital replacement / diagnosis tool / telehealth platform.

---

## WHAT IS IN THE APP

- Guided symptom assessment
- Smart test recommendation (structured medical decision database)
- Provider review & validation
- Test instructions delivery
- Device scan & AI preliminary report
- Provider validation of results
- Final guidance delivery

## WHAT IS NOT IN THE APP

- Job opportunities → Website only
- CSR / donations → Website only
- Full telehealth system → Emergency trigger only
- Follow-up scheduling system → Future version
- Pharmacy integration → Post-validation, future version

---

## THE 3 SCREENING PANELS

**Panel 1 — Water Safety Screening**
Indicators: Heavy Metals · pH · Microbial Presence
Method: Electrochemical sensors + visual analysis
Language: "screening", "indicators", "potential contamination"

**Panel 2 — Respiratory Sample Screening**
Indicators: Mucus Analysis · Pattern Detection · Risk Indicators
Method: Sputum visual analysis + AI pattern recognition
Language: "abnormal patterns", "associated with potential issues"

**Panel 3 — Biological Risk Screening Panel**
Indicators: Microbial Activity · Biomarkers · Early Warning Signals
Method: Multi-modal sensing (visual + electrochemical + colorimetric)
Language: "early risk detection", "not diagnosis"

**Mandatory disclaimer on all result screens:**
> "This screening supports early risk detection.
> All results are reviewed and validated by a licensed healthcare provider.
> This is not a medical diagnosis."

---

## FULL USER FLOW — 11 STEPS

```
Step 1  → Welcome & Account Creation
Step 2  → Consent & Privacy
Step 3  → Basic Info (profile)
Step 4  → Quick Health Snapshot
Step 5  → Symptoms Check
Step 6  → Smart Test Recommendation  ← structured DB, not AI guessing
Step 7  → Test Instructions (after provider validation)
Step 8  → Scan & Analysis (device)
Step 9  → AI Preliminary Report
Step 10 → Doctor Review & Validation
Step 11 → Final Results & Guidance
```

---

## APP STRUCTURE (4 tabs)

```
HOME     → Current status + next step
TESTS    → Run and view tests
HISTORY  → Past reports and assessments
PROFILE  → User info and settings
```

---

## STEP-BY-STEP DETAIL

### Step 1 — Welcome & Account Creation

**Screen: Welcome**
- SPD logo + tagline "Guided Health Screening"
- Short value proposition (2 lines)
- CTA: "Create Account" (teal) + "Log In" (ghost)

**Screen: Account Creation**
- Fields: Full Name · Email · Password · Confirm Password
- CTA: "Create Account ↗"
- Footer: "By creating an account you agree to our Terms and Privacy Policy"

---

### Step 2 — Consent & Privacy

**Screen: Consent**
- Title: "Before we begin"
- 3 consent items (toggle each):
  1. I agree to the Terms of Service
  2. I agree to the Privacy Policy
  3. I consent to share my health data with my assigned provider
- HIPAA acknowledgment (required)
- CTA: "I Agree & Continue" — disabled until all 3 toggled

---

### Step 3 — Basic Info (Profile)

**Multi-step form — 3 sub-steps:**

Sub-step 1: Personal
- Full name · Date of birth · Gender · Location (city + zip)

Sub-step 2: Physical
- Height · Weight · Contact phone

Sub-step 3: Medical History *(optional but encouraged)*
- Known conditions (multi-select chips)
- Current medications (free text)
- Allergies (free text)

Progress bar: 33% → 66% → 100%

---

### Step 4 — Quick Health Snapshot

**Screen: How are you feeling today?**
- Severity slider 1–10
- Visual: emoji scale (smiling → distressed)
- Duration: Today / 2–3 days / 1 week / 2+ weeks

---

### Step 5 — Symptoms Check

**Screen: What are you experiencing?**
- Symptom category chips (multi-select):
  Respiratory · Digestive · Urinary · Fever/Chills
  Skin changes · Neurological · Water concern · Other
- For each selected category: 3–4 specific sub-symptoms
- Additional context field:
  - Recent travel? (yes/no → destination if yes)
  - Recent exposure to sick person? (yes/no)
  - Limited access to clean water? (yes/no)
  - Anything else? (free text, optional)

---

### Step 6 — Smart Test Recommendation

> ⚠️ This is a structured medical decision DATABASE, not AI guessing.
> It maps symptom combinations to test types via predefined rules.
> The recommendation is NEVER executed automatically.
> It is transmitted to a licensed provider for review.

**Screen: Analyzing your information...**
- Loading animation (2–3s)
- Text: "Reviewing your symptoms and health profile..."

**Screen: Test Recommendation**
- Recommended panel: e.g., "Respiratory Sample Screening"
- Why: brief plain-language rationale (1 sentence)
- Compartment: "Use Compartment B — Green"
- Status badge: "Pending provider review"
- Message: "Your assigned provider will review this recommendation
  and confirm your instructions. This typically takes 2–4 hours."
- CTA: "Notify Me When Ready" (sets push notification)

**DB schema:**
```sql
CREATE TABLE symptom_forms (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  patient_id UUID REFERENCES patient_profiles(id),
  symptom_categories JSONB,
  severity_rating INTEGER CHECK (severity_rating BETWEEN 1 AND 10),
  duration VARCHAR,
  recent_travel BOOLEAN,
  recent_exposure BOOLEAN,
  water_access_limited BOOLEAN,
  additional_notes TEXT,
  status VARCHAR DEFAULT 'submitted',
  submitted_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE screening_recommendations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  patient_id UUID REFERENCES patient_profiles(id),
  symptom_form_id UUID REFERENCES symptom_forms(id),
  recommended_panel VARCHAR NOT NULL,
    -- 'water_safety' | 'respiratory' | 'biological_risk'
  compartment VARCHAR,
  rationale TEXT,
  urgency_level VARCHAR DEFAULT 'standard',
    -- 'standard' | 'urgent' | 'emergency'
  status VARCHAR DEFAULT 'pending_provider_review',
  generated_at TIMESTAMP DEFAULT NOW()
);
```

---

### Step 7 — Test Instructions (after provider validation)

> ⚠️ Patient receives this screen ONLY after provider validates.
> Provider can approve, modify, or redirect the recommendation.

**Screen: Your Instructions Are Ready**
- Push notification + in-app banner
- "Dr. [Name] has reviewed your assessment ✓"

**Instruction screen:**
- Test type badge (e.g., "Respiratory Sample Screening")
- Urgency: "Complete within 24 hours" (if applicable)
- Prescribed by: "Dr. [Name]" + specialty
- Step-by-step guide (numbered, expandable):
  1. Wash your hands thoroughly
  2. Prepare the collection area
  3. Open Compartment B (green)
  4. Follow the sample collection steps
  5. Close and seal the compartment
  6. Place device on a flat surface to begin scanning
- Precautions card (yellow/warm): "Before you start..."
- Doctor's note (if added): teal card, italic
- CTA: "I'm Ready to Start ↗"
- Secondary: "I have a question" (opens message to provider)

---

### Step 8 — Scan & Analysis

**Screen: Scanning in Progress**
- Device connection status (Bluetooth/Wi-Fi indicator)
- Animated scan visualization
- Progress: "Analyzing sample... 0% → 100%"
- Duration estimate: "This takes about 5–10 minutes"
- Do not disturb instructions: "Keep device still on a flat surface"

**Two input modes:**
1. Device sync (Wi-Fi/Bluetooth) — automatic data push (v2)
2. Manual image upload — MVP fallback

---

### Step 9 — AI Preliminary Report

> ⚠️ This screen is INTERNAL STATUS only.
> Patient sees "Analysis complete — awaiting provider review."
> Patient does NOT see the raw AI report.
> Raw report goes directly to the provider dashboard.

**Screen: Analysis Complete**
- Checkmark animation
- "Your sample has been analyzed"
- "Dr. [Name] will review and validate your results"
- Status tracker update: ● ● ● ● ◉ ○ (step 5 of 6 active)
- Estimated time: "Typically reviewed within 2–4 hours"
- CTA: "Notify Me When Ready"

---

### Step 10 — Doctor Review & Validation (Provider Side)

> This happens in the PROVIDER DASHBOARD, not the patient app.
> See Provider Dashboard section below.

**Patient sees during this step:**
- Status: "Provider Review" (step active on tracker)
- Banner: "Dr. [Name] is reviewing your results"
- No action required from patient

---

### Step 11 — Final Results & Guidance

**Screen: Your Results Are Ready**
- Push notification: "Your results have been reviewed by Dr. [Name]"

**Result screen:**
- Result hero card:
  - SAFE → green gradient
  - ATTENTION NEEDED → amber gradient
  - FOLLOW UP REQUIRED → teal dark gradient
  > ⚠️ Do NOT use POSITIVE/NEGATIVE — this implies diagnosis.
  > Use action-oriented outcomes instead.
- Type of screening
- Date + "Validated by Dr. [Name]"
- Plain language summary (3 sentences max)
- Doctor's notes
- Next step — ONE clear action:

  Option A: **Monitor at home**
  > "Continue to monitor your symptoms. Contact us if they worsen."

  Option B: **Visit a pharmacy**
  > "Your provider recommends [medication].
  > Find your nearest pharmacy below." ← pharmacy feature activates HERE

  Option C: **Schedule a consultation**
  > "Your provider recommends an in-person consultation.
  > Here are nearby options."

  Option D: **Go to a hospital**
  > "Your provider recommends urgent care.
  > Tap below for directions to the nearest facility."

  Option E: **Emergency telehealth** *(only if urgency_level = 'emergency')*
  > "Your provider has flagged this as urgent.
  > Tap below to speak with a provider now."
  > [Join Video Call] ← Zoom or Google Meet link

**CTAs:**
- Primary: action button based on next step
- Secondary: "Download Report (PDF)"
- Tertiary: "Start New Assessment"

**DB schema:**
```sql
CREATE TABLE screening_results (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  sample_id UUID REFERENCES samples(id),
  patient_id UUID REFERENCES patient_profiles(id),
  provider_id UUID REFERENCES provider_profiles(id),
  ai_report JSONB NOT NULL,
  provider_status VARCHAR DEFAULT 'pending_review',
  provider_notes TEXT,
  outcome VARCHAR,
    -- 'monitor_home' | 'pharmacy' | 'consultation' | 'hospital' | 'emergency'
  outcome_instructions TEXT,
  is_emergency BOOLEAN DEFAULT FALSE,
  telehealth_link VARCHAR,  -- only populated if is_emergency = TRUE
  is_delivered_to_patient BOOLEAN DEFAULT FALSE,
  pharmacy_activated BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT NOW()
);
```

---

## PROVIDER DASHBOARD

**URL:** /provider/dashboard

### Queue View
Columns: Patient · Risk level · Panel type · Submitted at · Action
Sorted by: urgency_level (emergency first → urgent → standard)

Risk badges:
- 🔴 Emergency — immediate review required
- 🟡 Urgent — review within 4h
- 🟢 Standard — review within 24h

### Case Review View `/provider/cases/:id`

**Left panel:**
- Patient profile (name, age, location, medical history)
- Symptom form answers
- System recommendation + rationale

**Right panel — Actions:**

Option A: Approve
- Confirm recommendation
- Optional: add instructions or notes
- Button: "Validate & Send Instructions"

Option B: Modify
- Change panel type
- Rewrite or add to instructions
- Button: "Send Modified Instructions"

Option C: Redirect
- Select outcome (pharmacy / consultation / hospital)
- Add message to patient
- Button: "Send Guidance"

Option D: Flag Emergency
- Activates telehealth link
- Sends urgent notification to patient
- Button: "Flag as Emergency & Notify"

**After result review:**
- Approve AI findings as-is
- Edit risk classification
- Add clinical notes
- Select outcome (monitor / pharmacy / consultation / hospital / emergency)
- Button: "Deliver Results to Patient"

---

## NOTIFICATION SYSTEM

| Event | Patient | Provider |
|-------|---------|----------|
| Assessment submitted | "Submitted — your provider will review soon" | "New case pending: [Patient]" |
| Instructions sent | "Your provider sent your test instructions" | Confirmation |
| Sample received | "Analysis in progress" | "Sample received for [Patient]" |
| Results validated | "Your results are ready" | Confirmation |
| Emergency flagged | "Urgent: your provider flagged this case" | "Emergency case — immediate review" |

---

## SECURITY

| Requirement | Implementation |
|-------------|---------------|
| Data encryption at rest | AES-256 |
| Data in transit | TLS 1.3 |
| Role-based access | Patient / Provider / Admin |
| Audit logging | All validations, edits, accesses |
| HIPAA-ready architecture | De-identified data in MVP |
| AI output labeling | "Preliminary — Awaiting Provider Validation" |
| Result language | Outcome-oriented, not diagnostic |

---

## MVP SCOPE

### ✅ INCLUDED
- Full 11-step flow (Steps 1–11)
- Structured medical decision database (rule-based)
- Provider dashboard (review + validate + redirect)
- Manual image upload (device sync post-MVP)
- AI preliminary report (GPT-4 Vision or rule-based)
- Push + email notifications
- PDF report download
- 4-tab app structure

### ❌ NOT IN MVP
- Bluetooth/Wi-Fi device sync (manual upload only)
- Pharmacy integration (post-validation, future)
- Follow-up scheduling system (future)
- Full telehealth platform (emergency trigger only)
- Job opportunities (website only)
- Mobile native app (web app only in MVP)
- Real patient data (synthetic data in testing)

---

*App PRD v3.0 — Final integrated version.
Structured DB recommendation (not AI guessing).
Telehealth = emergency only.
Pharmacy = post-validation only.
Result language = outcome-oriented, not diagnostic.*
