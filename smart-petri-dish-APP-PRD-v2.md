# Smart Petri Dish — App PRD & Workflow
## Guided Medical Triage System · v2.0

**Date:** April 2026
**Stack:** React + shadcn/ui + Node.js/FastAPI + PostgreSQL + S3

---

## SYSTEM OVERVIEW

Smart Petri Dish is a **guided medical triage platform** operating in 3 sequential phases:

```
PHASE 1 — PATIENT INTAKE
  User creates profile → fills medical history → completes symptom questionnaire

PHASE 2 — AI PRE-RECOMMENDATION + DOCTOR VALIDATION
  Rule-based engine generates test recommendation →
  Transmitted to doctor dashboard →
  Doctor validates / modifies / rejects + adds instructions

PHASE 3 — GUIDED TEST + RESULTS
  Patient receives step-by-step test instructions →
  Performs test with Smart Petri Dish device →
  AI analyzes sample → Doctor validates result →
  Patient receives final report + next steps
```

**Core principle:** AI suggests. Doctor decides. Patient acts.

---

## SYSTEM ARCHITECTURE

```
Patient App (React/Mobile)
        │
        ├─── Profile + Medical History
        ├─── Symptom Questionnaire
        ├─── Receive Instructions (after doctor validation)
        ├─── Device sync / sample upload
        └─── View validated results

        ↕ API (Node.js / FastAPI)

Medical Rules Engine
        ├─── Symptom → test type mapping
        ├─── Risk scoring
        └─── Pre-recommendation generation

        ↓ Auto-transmit to doctor

Doctor Dashboard (React web)
        ├─── Patient queue (pending recommendations)
        ├─── Review: history + symptoms + AI recommendation
        ├─── Validate / Modify / Reject
        ├─── Write supplementary instructions
        └─── Trigger instruction delivery to patient

        ↓ Instructions sent to patient app

AI Analysis Engine (post-test)
        ├─── Analyze device sample data
        ├─── Generate structured preliminary report
        └─── Forward to doctor for final validation

Database (PostgreSQL)
        ├─── users, patient_profiles, provider_profiles
        ├─── symptom_forms, ai_recommendations
        ├─── doctor_validations, test_instructions
        ├─── samples, health_reports
        └─── notifications, audit_log
```

---

## USER ROLES

| Role | Access | Key Actions |
|------|--------|-------------|
| Patient | Mobile + Web app | Fill symptoms, receive instructions, upload sample, view results |
| Doctor / Provider | Web dashboard | Review AI recommendation, validate instructions, validate results |
| Admin | Admin panel | Manage users, monitor system, approve providers |

---

## PHASE 1 — PATIENT INTAKE

### 1.1 Authentication

**Pages:** /register · /login · /verify-email

**Register flow:**
- Email + password
- Role: Patient (only patients register publicly; doctors are onboarded by admin)
- Email verification required before access

**Login:**
- Email + password
- Redirect to: onboarding (new users) or dashboard (returning)

---

### 1.2 Patient Profile Creation

**Page:** /onboarding (multi-step, can be resumed)

**Step 1 — Personal Info**
- Full name
- Date of birth
- Gender
- Location (city, zip/postal code)

**Step 2 — Contact**
- Phone number
- Email (pre-filled from auth)

**Step 3 — Physical Data**
- Height (cm or ft/in)
- Weight (kg or lbs)

**Step 4 — Medical History** *(optional but strongly encouraged)*
- Known conditions (multi-select + free text)
- Current medications (free text)
- Known allergies (free text)
- Recent hospitalizations (yes/no + date)
- Family history of: cancer, diabetes, hypertension, tuberculosis, other (checkboxes)

**Step 5 — Consent**
- Terms of service
- Privacy policy
- Data sharing with assigned provider (required)
- HIPAA acknowledgment

**DB schema:**
```sql
CREATE TABLE patient_profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id),
  full_name VARCHAR NOT NULL,
  date_of_birth DATE,
  gender VARCHAR,
  city VARCHAR,
  zip_code VARCHAR,
  phone VARCHAR,
  height_cm DECIMAL,
  weight_kg DECIMAL,
  known_conditions JSONB,
  current_medications TEXT,
  allergies TEXT,
  recent_hospitalization BOOLEAN,
  family_history JSONB,
  onboarding_complete BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

---

### 1.3 Symptom Questionnaire

**Page:** /new-assessment

**Trigger:** Patient initiates a new health assessment from their dashboard

**Form structure:**
- Duration of symptoms (today / 2–3 days / 1 week / 2+ weeks)
- Primary symptom category (multi-select):
  - Respiratory (cough, shortness of breath, chest pain)
  - Digestive (nausea, vomiting, diarrhea, abdominal pain)
  - Urinary (burning, frequency, discoloration)
  - Neurological (headache, dizziness, confusion)
  - Skin (rash, swelling, discoloration)
  - Fever / General (fatigue, chills, night sweats)
  - Water concern (quality, smell, color)
- Severity rating (1–10 slider)
- Onset (sudden / gradual)
- Associated symptoms (free text)
- Recent travel (yes/no + region if yes)
- Recent exposure to sick individuals (yes/no)
- Current living conditions (urban / rural / remote)
- Access to clean water (yes / limited / no)

**After submit:**
- Status: "Assessment submitted — awaiting AI analysis"
- System triggers the Medical Rules Engine automatically

**DB schema:**
```sql
CREATE TABLE symptom_forms (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  patient_id UUID REFERENCES patient_profiles(id),
  symptom_categories JSONB,
  severity_rating INTEGER CHECK (severity_rating BETWEEN 1 AND 10),
  duration VARCHAR,
  onset VARCHAR,
  associated_symptoms TEXT,
  recent_travel BOOLEAN,
  travel_region VARCHAR,
  recent_exposure BOOLEAN,
  living_conditions VARCHAR,
  water_access VARCHAR,
  status VARCHAR DEFAULT 'submitted',
  submitted_at TIMESTAMP DEFAULT NOW()
);
```

---

## PHASE 2 — AI PRE-RECOMMENDATION + DOCTOR VALIDATION

### 2.1 Medical Rules Engine

**Trigger:** Automatically runs after symptom form submission

**Input:** symptom_form + patient_profile (history, conditions, location)

**Logic (rule-based MVP, upgradeable to ML):**

```
IF respiratory symptoms + fever + night sweats + rural location
  → Recommend: Sputum Test (TB panel priority)
  → Risk flag: HIGH
  → Urgency: Within 24h

IF urinary symptoms + burning + fever
  → Recommend: Urine Test
  → Risk flag: MEDIUM
  → Urgency: Within 48h

IF water concern OR diarrhea + location = rural/remote
  → Recommend: Water Safety Test
  → Risk flag: MEDIUM
  → Urgency: Within 48h

IF fever + rash + recent travel to endemic region
  → Recommend: Disease Panel (dengue/malaria/typhoid priority)
  → Risk flag: HIGH
  → Urgency: Within 12h

IF multiple categories OR severity >= 8
  → Recommend: Full 3-in-1 Panel
  → Risk flag: HIGH
  → Urgency: Immediate
```

**Output — AI Pre-Recommendation object:**
```json
{
  "recommendation_id": "uuid",
  "patient_id": "uuid",
  "symptom_form_id": "uuid",
  "recommended_test": "sputum | urine | water | disease_panel | full_panel",
  "risk_flag": "low | medium | high | urgent",
  "urgency_hours": 24,
  "rationale": "string — plain language explanation for doctor",
  "confidence_score": 0.87,
  "generated_at": "ISO 8601",
  "status": "pending_doctor_review"
}
```

**DB schema:**
```sql
CREATE TABLE ai_recommendations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  patient_id UUID REFERENCES patient_profiles(id),
  symptom_form_id UUID REFERENCES symptom_forms(id),
  recommended_test VARCHAR NOT NULL,
  risk_flag VARCHAR,
  urgency_hours INTEGER,
  rationale TEXT,
  confidence_score DECIMAL,
  status VARCHAR DEFAULT 'pending_doctor_review',
  generated_at TIMESTAMP DEFAULT NOW()
);
```

---

### 2.2 Doctor Dashboard

**URL:** /doctor/dashboard

**Layout:** sidebar navigation + main content area

**Sidebar items:**
- Queue (pending recommendations — with count badge)
- Active Cases
- Completed
- Patient Search
- My Profile
- Settings

---

**Queue view** (`/doctor/dashboard/queue`)

Columns:
- Patient name + age
- Risk flag (color-coded badge: 🔴 urgent / 🟡 high / 🟢 medium/low)
- Urgency timer (e.g. "Review within 18h")
- Recommended test (AI suggestion preview)
- Action: [Review →]

Sorted by: urgency (most urgent first)

---

**Case review view** (`/doctor/cases/:id`)

**Left panel — Patient context:**
- Full name, age, gender, location
- Medical history (conditions, medications, allergies, family history)
- Symptom form answers (all fields)
- Assessment timeline (past assessments if any)

**Right panel — AI Recommendation:**
- Recommended test (badge)
- Risk flag + confidence score
- AI rationale (plain text)
- Urgency window

**Action panel:**

**Option A — Approve as-is:**
- Confirm checkbox: "I validate this recommendation"
- Optional notes field
- Button: [Validate & Send Instructions ↗]

**Option B — Modify:**
- Change test type (dropdown)
- Change urgency
- Rewrite or add to rationale
- Button: [Validate Modified Recommendation ↗]

**Option C — Reject:**
- Rejection reason (dropdown: Insufficient data / Patient should visit clinic / Low risk, monitor / Other)
- Optional message to patient
- Button: [Reject & Notify Patient]

**Supplementary instructions field** (shown after validate):
- Free text or template-based
- Covers: precautions, sample preparation, timing, what to avoid
- Button: [Send Instructions to Patient ↗]

**DB schema:**
```sql
CREATE TABLE doctor_validations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  recommendation_id UUID REFERENCES ai_recommendations(id),
  provider_id UUID REFERENCES provider_profiles(id),
  patient_id UUID REFERENCES patient_profiles(id),
  decision VARCHAR NOT NULL CHECK (decision IN ('approved', 'modified', 'rejected')),
  final_test_type VARCHAR,
  doctor_notes TEXT,
  rejection_reason VARCHAR,
  supplementary_instructions TEXT,
  validated_at TIMESTAMP DEFAULT NOW()
);
```

---

### 2.3 Instruction Delivery to Patient

**Trigger:** Doctor clicks "Send Instructions to Patient"

**Patient receives (in app):**
- Push notification + in-app alert: "Your doctor has reviewed your assessment"
- Full instruction card with:
  - Which test to perform (e.g. "Sputum Test — Respiratory Panel")
  - Step-by-step preparation (numbered list)
  - Precautions (what to avoid, timing, sample handling)
  - What the test looks for (plain language)
  - Doctor's personal note (if added)
  - Urgency: "Please complete within 24 hours"

**Status updates:**
- Assessment: `submitted` → `ai_analyzed` → `doctor_reviewed` → `instructions_sent`

**DB schema:**
```sql
CREATE TABLE test_instructions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  validation_id UUID REFERENCES doctor_validations(id),
  patient_id UUID REFERENCES patient_profiles(id),
  test_type VARCHAR NOT NULL,
  steps JSONB NOT NULL,
  precautions JSONB,
  doctor_note TEXT,
  urgency_hours INTEGER,
  sent_at TIMESTAMP DEFAULT NOW(),
  patient_acknowledged BOOLEAN DEFAULT FALSE,
  acknowledged_at TIMESTAMP
);
```

---

## PHASE 3 — GUIDED TEST + RESULTS

### 3.1 Patient Test Screen

**Page:** /my-tests/:instruction_id

**Content:**
- Test card: "Your doctor has prescribed: Sputum Test"
- Doctor note (if any)
- Step-by-step instructions (expandable)
- Countdown: "Complete within X hours"
- Button: [I'm Ready to Start →]

**Test guide screen:**
- Step 1: What you need (image)
- Step 2: Prepare your sample (instructions + image)
- Step 3: Load the device (animation or image)
- Step 4: Connect via app (Bluetooth/Wi-Fi pairing)
- Confirmation: "Device connected. Analysis in progress..."

---

### 3.2 Sample Upload / Device Sync

**Two modes:**
1. **Device sync** (Wi-Fi / Bluetooth): automatic data push from Smart Petri Dish
2. **Manual upload** (MVP fallback): upload image file from device camera

**On upload/sync:**
- Sample linked to patient_id + instruction_id
- Status: `sample_received` → `ai_analyzing`

**DB schema:**
```sql
CREATE TABLE samples (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  patient_id UUID REFERENCES patient_profiles(id),
  instruction_id UUID REFERENCES test_instructions(id),
  file_url VARCHAR,
  file_type VARCHAR,
  device_sync BOOLEAN DEFAULT FALSE,
  status VARCHAR DEFAULT 'pending',
  uploaded_at TIMESTAMP DEFAULT NOW(),
  analyzed_at TIMESTAMP
);
```

---

### 3.3 AI Result Analysis

**Trigger:** Sample received and linked to test type

**Input:** Sample image/data + test type context

**Output — Preliminary report:**
```json
{
  "sample_summary": "string",
  "detected_patterns": [
    { "pattern": "string", "confidence": 0.91, "severity": "high" }
  ],
  "risk_classification": "low | medium | high",
  "risk_confidence": 0.91,
  "result_flags": {
    "water": "safe | positive | negative",
    "sputum": "safe | positive | negative",
    "disease_panel": "safe | positive | negative"
  },
  "patient_summary": "plain language, max 150 words",
  "provider_detail": "technical summary for doctor",
  "suggested_next_steps": ["string"],
  "requires_urgent_review": false,
  "generated_at": "ISO 8601"
}
```

**CRITICAL:** AI output is labeled "Preliminary" and locked until doctor validation.

---

### 3.4 Doctor Result Validation

**Doctor receives:** Notification — "New test result ready for review: [Patient Name]"

**On `/doctor/results/:id`:**
- Sample image displayed
- AI preliminary report
- Risk flags per test type
- Patient-friendly summary preview

**Actions:**
- Approve result
- Edit result (modify risk classification or findings)
- Add clinical comments
- Confirm next steps (from predefined list or free text)
- Button: [Send Validated Report to Patient ↗]

---

### 3.5 Patient Receives Final Report

**Patient notification:** "Your test results are ready and have been reviewed by Dr. [Name]"

**Report view (`/my-results/:id`):**
- Risk flag: SAFE / POSITIVE / NEGATIVE (large, color-coded)
- Plain language summary
- Doctor's notes and comments
- Recommended next steps (actionable items)
- Follow-up options: book consultation / nearby pharmacies / community health center

**DB schema:**
```sql
CREATE TABLE health_reports (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  sample_id UUID REFERENCES samples(id),
  patient_id UUID REFERENCES patient_profiles(id),
  provider_id UUID REFERENCES provider_profiles(id),
  ai_report JSONB NOT NULL,
  provider_status VARCHAR DEFAULT 'pending_review',
  provider_notes TEXT,
  provider_recommendations JSONB,
  final_report JSONB,
  risk_classification VARCHAR,
  is_delivered_to_patient BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

---

## PATIENT DASHBOARD

**Page:** /dashboard

**Sections:**
- Active assessment card (with current status + step indicator)
- Pending instructions (if waiting for a test to perform)
- Recent results (last 3 reports)
- Health history timeline
- Upcoming follow-ups
- Quick action: [Start New Assessment]

**Assessment status indicator (visible at all times):**
```
● Submitted → ● AI Analysis → ● Doctor Review → ● Instructions Sent → ● Test Complete → ● Results Ready
```

---

## NOTIFICATIONS SYSTEM

| Event | Patient | Doctor |
|-------|---------|--------|
| Symptom form submitted | "Submitted — your doctor will review soon" | "New case pending review: [Patient]" |
| AI recommendation generated | (silent) | "AI recommendation ready" |
| Doctor validates | "Your doctor has sent you instructions" | Confirmation |
| Test instructions acknowledged | Confirmation | "Patient acknowledged instructions" |
| Sample received | "Analysis in progress" | "Sample received for [Patient]" |
| Result validated by doctor | "Your results are ready" | Confirmation |
| Urgency flag | Alert: "Your doctor marked this URGENT" | Alert: "Urgent case flagged" |

---

## SECURITY & COMPLIANCE

| Requirement | Implementation |
|-------------|---------------|
| Data encryption at rest | AES-256 |
| Data in transit | TLS 1.3 |
| Role-based access control | Patient / Doctor / Admin — strict boundaries |
| Audit logging | All validations, edits, accesses logged with timestamp + user |
| HIPAA-ready architecture | De-identified test data in MVP; full compliance roadmap post-MVP |
| Doctor approval workflow | No doctor can access patient data without admin activation |
| AI output labeling | All AI outputs labeled "Preliminary — Awaiting Doctor Validation" |

---

## MVP SCOPE

### ✅ MVP INCLUDES
- Auth (register / login / verify)
- Patient profile + medical history
- Symptom questionnaire (guided form)
- Medical rules engine (rule-based, not ML)
- AI pre-recommendation generation
- Doctor dashboard (queue + case review + validate/modify/reject)
- Test instruction builder + delivery to patient
- Manual sample upload (fallback)
- AI result analysis (GPT-4 Vision or rule-based)
- Doctor result validation
- Patient result view (plain language)
- In-app notifications
- Email notifications

### ❌ MVP EXCLUDES
- Device Bluetooth/Wi-Fi sync (manual upload only)
- Video consultation
- Pharmacy integration
- Advanced ML (rule-based only)
- Mobile native app (web app only)
- Real patient data (synthetic data in testing)

---

## DEVELOPMENT PHASES

```
Phase 0 — Setup
  [ ] Monorepo + Vite + React + Tailwind + shadcn/ui
  [ ] PostgreSQL + Prisma ORM
  [ ] Auth (Clerk or Supabase)
  [ ] S3 storage
  [ ] CI/CD (Vercel + Railway)

Phase 1 — Intake
  [ ] Auth pages (register / login / verify)
  [ ] Patient onboarding (5-step form)
  [ ] Symptom questionnaire

Phase 2 — Rules Engine + Doctor Flow
  [ ] Medical rules engine (rule mapping + recommendation generation)
  [ ] Doctor dashboard (queue + case review)
  [ ] Validate / Modify / Reject workflow
  [ ] Instruction builder + delivery

Phase 3 — Test + Results
  [ ] Patient instruction view + test guide
  [ ] Sample upload (manual)
  [ ] AI analysis (GPT-4 Vision)
  [ ] Doctor result validation
  [ ] Patient result view

Phase 4 — Notifications + Dashboard
  [ ] In-app notification center
  [ ] Email notifications
  [ ] Patient dashboard (status timeline)
  [ ] Health history

Phase 5 — Polish + Launch
  [ ] Responsive design
  [ ] Accessibility
  [ ] Security audit
  [ ] Error states + loading states
  [ ] Synthetic data seeding
  [ ] Launch checklist
```

---

*App PRD v2.0 — Guided Medical Triage System.
AI suggests. Doctor decides. Patient acts.*
