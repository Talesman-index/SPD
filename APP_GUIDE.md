# Smart Petri Dish — Core Diagnostic Journey (v2.1)

This guide outlines the 5-step integrated workflow for the Smart Petri Dish platform, aligning the web application's frontend with the clinical backend and portable device.

## The 5-Step Process

### 1. Account Setup
*   **Action**: Secure digital onboarding.
*   **Data Captured**: Full name, ZIP Code (for regional health context), Date of Birth.
*   **Compliance**: Agreement to Terms, Privacy Policy, and HIPAA-ready data sovereignty.

### 2. Health Profile
*   **Action**: Contextual intake assessment.
*   **Questions**: Environmental exposure (water source, urban/rural), current symptoms (severity, duration).
*   **Logic**: Data is fed into a **medical rules engine**.

### 3. Guided Testing (Doctor Validated Recommendation)
*   **Logic**: Rules engine recommends a panel (Water, Sputum, or Bio).
*   **Validation**: **A doctor validates this recommendation** before the patient can proceed.
*   **Action**: Patient receives instructions and tests their sample at home using the 3-compartment portable device.
*   **Submission**: Asynchronous data upload to the SPD cloud.

### 4. Analysis
*   **Action**: Dual-layer verification.
*   **AI Layer**: Preliminary pattern recognition and biomarker detection.
*   **Professional Layer**: **Second validation** by a licensed physician reviewing the raw Petri dish data and AI report.

### 5. Results & Next Steps
*   **Action**: Actionable clinical guidance.
*   **Outcome**: Full report delivery via the app dashboard.
*   **Pathways**: Guided next steps (Home monitoring, Pharmacy visit, Consultation, or Hospital referral).

---

## Technical Pillars
*   **Palette**: Indigo & Petri (Indigo-900/950, Petri-500 Cyan).
*   **Validation**: Two-stage physician validation (Recommendation + Results).
*   **Security**: End-to-end encryption for all biological data and microscopy images.
