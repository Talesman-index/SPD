import React, { useState } from 'react';
import Sidebar from '../../components/layout/Sidebar';
import Topbar from '../../components/layout/Topbar';
import { 
  FileText, Download, Clock, CheckCircle2, 
  AlertCircle, Calendar, Shield, Settings as SettingsIcon,
  User, Bell, Lock, TestTube, ArrowRight, Pill, Waves, ChevronRight,
  Globe, MapPin, Activity, ShieldCheck, Search, Filter, Droplets, Thermometer,
  Ruler, History, HelpCircle, LogOut
} from 'lucide-react';
import { cn } from '../../lib/utils';
import { useToast } from '../../context/ToastContext';
import { useNavigate } from 'react-router-dom';

import MobileLayout from '../../components/layout/MobileLayout';

const NextStepItem = ({ icon, text }) => (
  <div className="bg-white p-4 rounded-[16px] border border-[#e8f4f5] flex items-center gap-4 active:scale-[0.98] transition-all">
    <div className="text-xl shrink-0">{icon}</div>
    <p className="text-[14px] font-bold text-[#0f2f35] leading-snug">{text}</p>
  </div>
);

export const PatientInstructions = () => <PatientTests />; // Alias for now as they share the same UI goals in PRD

const PageLayout = ({ title, type, children }) => {
  if (type === 'patient') {
    return <MobileLayout title={title}>{children}</MobileLayout>;
  }

  return (
    <div className="flex min-h-screen bg-[#f5f0e8] font-manrope">
      <Sidebar type={type} />
      <main className="flex-1 ml-[240px]">
        <Topbar title={title} status="none" />
        <div className="p-8 max-w-7xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
          {children}
        </div>
      </main>
    </div>
  );
};

// --- PATIENT PAGES ---

export const PatientTests = () => (
  <MobileLayout title="Your Instructions" showBack>
    <div className="px-5 pt-4 space-y-6">
      {/* Notification Card */}
      <div className="bg-[#e8f4f5] border-l-4 border-[#145e69] p-4 rounded-r-[12px] shadow-sm flex items-center gap-4">
        <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-[#145e69] shrink-0">
          <CheckCircle2 size={20} />
        </div>
        <div>
          <p className="text-[14px] font-bold text-[#0f2f35] flex items-center gap-1.5">
            Dr. Sarah Chen validated your test <CheckCircle2 size={14} className="text-[#145e69]" />
          </p>
          <p className="text-[12px] text-[#6b7280]">Tap to view your detailed instructions</p>
        </div>
      </div>

      {/* Test Type Hero */}
      <div className="bg-[#0f2f35] rounded-[20px] p-6 shadow-xl relative overflow-hidden">
        <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-white/5 rounded-full blur-3xl" />
        <div className="relative z-10 flex items-center gap-5 mb-6">
          <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center text-[#f4d092]">
            <TestTube size={32} />
          </div>
          <div>
            <span className="text-[11px] font-bold text-[#9ed8db] uppercase tracking-[0.15em] block mb-1">Recommended Test</span>
            <h2 className="text-[22px] font-black text-white tracking-tight">SPUTUM PANEL</h2>
          </div>
        </div>
        <div className="flex flex-wrap gap-2 relative z-10">
          <span className="px-3 py-1 bg-[#e24b4a] text-white text-[10px] font-bold rounded-full uppercase tracking-wider">Urgent: 24h</span>
          <span className="px-3 py-1 bg-white/10 text-white/80 text-[10px] font-bold rounded-full uppercase tracking-wider">Prescribed by Dr. Chen</span>
        </div>
      </div>

      {/* Instructions Accordion */}
      <div className="bg-white rounded-[20px] border border-[#e8f4f5] shadow-sm overflow-hidden">
        <div className="p-5 border-b border-[#e8f4f5] flex items-center justify-between">
          <h3 className="text-[17px] font-bold text-[#0f2f35]">Step-by-step Instructions</h3>
          <ChevronRight size={18} className="text-[#afafaf]" />
        </div>
        <div className="p-5 space-y-6">
          <InstructionStep 
            num="1" 
            title="Collection Timing" 
            desc="The sample should be collected first thing in the morning, before eating or drinking."
            active
          />
          <InstructionStep 
            num="2" 
            title="Preparation" 
            desc="Rinse your mouth with water to remove any food particles or bacteria."
          />
          <InstructionStep 
            num="3" 
            title="Sample Collection" 
            desc="Cough deeply and collect the sputum into the sterile container provided in your kit."
          />
        </div>
      </div>

      {/* Precautions */}
      <div className="bg-[#fdf3e0] p-5 rounded-[20px] border border-[#f4d092]/30">
        <div className="flex items-center gap-2 mb-3 text-[#b84c00]">
          <AlertCircle size={18} />
          <h4 className="text-[15px] font-bold">Before you start:</h4>
        </div>
        <ul className="space-y-2">
          <li className="text-[13px] text-[#4a4a4a] flex items-start gap-2">
            <div className="w-1 h-1 rounded-full bg-[#b84c00] mt-2 shrink-0" />
            Do not brush your teeth before collection
          </li>
          <li className="text-[13px] text-[#4a4a4a] flex items-start gap-2">
            <div className="w-1 h-1 rounded-full bg-[#b84c00] mt-2 shrink-0" />
            Ensure the container is tightly sealed
          </li>
        </ul>
      </div>

      {/* Doctor Note */}
      <div className="bg-[#e8f4f5] p-5 rounded-[20px] border border-[#145e69]/10">
        <div className="flex items-center gap-2 mb-2 text-[#145e69]">
          <Pill size={16} />
          <h4 className="text-[13px] font-bold uppercase tracking-wider">Note from Dr. Chen</h4>
        </div>
        <p className="text-[14px] text-[#0f2f35]/80 italic leading-relaxed">
          "Please ensure the sample is placed in the petri dish within 10 minutes of collection for the most accurate AI analysis."
        </p>
      </div>

      {/* Bottom Buttons */}
      <div className="pt-4 pb-12 space-y-3">
        <button className="w-full h-[52px] bg-[#145e69] text-white rounded-[14px] font-bold shadow-lg active:scale-95 transition-all flex items-center justify-center gap-2">
          I'm Ready to Start <ArrowRight size={18} />
        </button>
        <button className="w-full h-[52px] bg-transparent text-[#145e69] font-bold active:bg-[#e8f4f5] rounded-[14px] transition-all">
          Ask a question
        </button>
      </div>
    </div>
  </MobileLayout>
);

const InstructionStep = ({ num, title, desc, active }) => (
  <div className={cn(
    "flex gap-4 p-4 rounded-[16px] transition-all",
    active ? "bg-[#f5f0e8] border-l-[3px] border-[#145e69]" : ""
  )}>
    <div className={cn(
      "w-7 h-7 rounded-full flex items-center justify-center font-bold text-[13px] shrink-0",
      active ? "bg-[#145e69] text-white" : "bg-[#f5f0e8] text-[#145e69]"
    )}>
      {num}
    </div>
    <div>
      <h4 className="text-[15px] font-bold text-[#0f2f35] mb-1">{title}</h4>
      <p className="text-[13px] text-[#6b7280] leading-relaxed">{desc}</p>
    </div>
  </div>
);

export const PatientReports = () => (
  <MobileLayout title="Your Results" showBack>
    <div className="px-5 pt-4 space-y-6">
      {/* Result Hero Card */}
      <div className="bg-gradient-to-br from-[#145e69] to-[#1a7a6e] rounded-[24px] p-8 shadow-xl text-center relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-3xl -mr-16 -mt-16" />
        
        <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg text-[#145e69]">
          <CheckCircle2 size={36} />
        </div>
        
        <div className="inline-block px-5 py-1.5 bg-white text-[#145e69] rounded-full text-[14px] font-black uppercase tracking-[0.1em] mb-4">
          NEGATIVO (SAFE)
        </div>
        
        <h2 className="text-[22px] font-black text-white mb-1">Sputum Test Analysis</h2>
        <p className="text-[12px] text-white/60 font-bold uppercase tracking-widest">
          Ref: #SPD-9823 · Validated by Dr. Sarah Chen
        </p>
      </div>

      {/* Diagnostic Conclusion */}
      <div className="bg-white p-6 rounded-[24px] border border-[#e8f4f5] shadow-sm">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-8 h-8 rounded-lg bg-[#e8f4f5] flex items-center justify-center text-[#145e69]">
            <Activity size={18} />
          </div>
          <h3 className="text-[17px] font-black text-[#0f2f35]">Medical Conclusion</h3>
        </div>
        <div className="space-y-4">
          <p className="text-[15px] font-bold text-[#145e69] bg-[#e8f4f5] p-4 rounded-xl">
            "No Mycobacterium tuberculosis detected in the provided sample."
          </p>
          <p className="text-[14px] text-[#565656] leading-relaxed">
            The AI-driven molecular analysis and subsequent clinical review confirm that you are currently negative for the screened pathogens. Your symptoms are likely attributed to a common seasonal viral infection.
          </p>
        </div>
      </div>

      {/* Next Steps */}
      <div className="space-y-4">
        <h3 className="text-[17px] font-black text-[#0f2f35] px-1">Recommended Actions</h3>
        <div className="space-y-3">
          <NextStepItem icon={<Droplets size={20} />} text="Stay hydrated and rest for the next 48 hours." />
          <NextStepItem icon={<Thermometer size={20} />} text="Monitor your temperature morning and evening." />
          <NextStepItem icon={<Calendar size={20} />} text="Follow-up virtual visit booked for Oct 30." />
        </div>
      </div>

      {/* Doctor's validation */}
      <div className="bg-[#f5f0e8] p-5 rounded-[20px] border border-[#e8f4f5] flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-white">
            <img src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=100" alt="Dr Chen" className="w-full h-full object-cover" />
          </div>
          <div>
            <p className="text-[13px] font-bold text-[#0f2f35]">Dr. Sarah Chen</p>
            <p className="text-[11px] text-[#6b7280]">Validated on Oct 25, 2026</p>
          </div>
        </div>
        <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-[#145e69] shadow-sm">
          <ShieldCheck size={20} />
        </div>
      </div>

      {/* Bottom Buttons */}
      <div className="pt-4 pb-12 space-y-3">
        <button className="w-full h-[56px] bg-[#145e69] text-white rounded-[16px] font-bold shadow-lg active:scale-95 transition-all flex items-center justify-center gap-2">
          <Download size={18} /> Download Detailed PDF
        </button>
        <button className="w-full h-[56px] bg-transparent text-[#145e69] font-bold active:bg-[#e8f4f5] rounded-[16px] transition-all">
          Start New Assessment
        </button>
      </div>
    </div>
  </MobileLayout>
);

export const MedicalHistory = () => (
  <MobileLayout title="Medical History">
    <div className="px-5 pt-4 pb-12 space-y-6">
      {/* Search & Filter */}
      <div className="flex gap-2">
        <div className="flex-1 h-12 bg-white border border-[#e8f4f5] rounded-xl flex items-center px-4 gap-3 focus-within:border-[#145e69] transition-all">
          <Search size={18} className="text-[#afafaf]" />
          <input type="text" placeholder="Search history..." className="bg-transparent border-none outline-none text-sm w-full" />
        </div>
        <button className="w-12 h-12 bg-white border border-[#e8f4f5] rounded-xl flex items-center justify-center text-[#0f2f35] active:bg-[#f5f0e8]">
          <Filter size={18} />
        </button>
      </div>

      {/* History List */}
      <div className="space-y-4">
        <h3 className="text-[11px] font-bold text-[#afafaf] uppercase tracking-[0.1em] px-1">October 2026</h3>
        
        <HistoryItem 
          title="Sputum Test Analysis" 
          type="Diagnostic Result"
          date="Oct 25, 2026"
          status="Validated"
          statusColor="text-emerald-500 bg-emerald-50"
          icon={CheckCircle2}
          link="/patient/reports"
        />

        <HistoryItem 
          title="Respiratory Assessment" 
          type="Self-Assessment"
          date="Oct 25, 2026"
          status="In Review"
          statusColor="text-[#145e69] bg-[#e8f4f5]"
          icon={Clock}
          link="/patient/dashboard"
        />

        <HistoryItem 
          title="Fever & Pain Tracking" 
          type="Triage Wizard"
          date="Oct 12, 2026"
          status="Closed"
          statusColor="text-[#6b7280] bg-[#f5f0e8]"
          icon={FileText}
          link="/patient/reports"
        />

        <h3 className="text-[11px] font-bold text-[#afafaf] uppercase tracking-[0.1em] px-1 pt-4">August 2026</h3>

        <HistoryItem 
          title="Water Quality Analysis" 
          type="Environmental Test"
          date="Aug 05, 2026"
          status="Safe"
          statusColor="text-emerald-500 bg-emerald-50"
          icon={Droplets}
          link="/patient/reports"
        />
      </div>
    </div>
  </MobileLayout>
);

const HistoryItem = ({ title, type, date, status, statusColor, icon: Icon, link }) => {
  const navigate = useNavigate();
  return (
    <div 
      onClick={() => navigate(link)}
      className="bg-white p-5 rounded-[20px] border border-[#e8f4f5] shadow-sm flex items-start gap-4 active:scale-[0.98] transition-all cursor-pointer"
    >
      <div className="w-10 h-10 rounded-xl bg-[#f5f0e8] flex items-center justify-center text-[#145e69] shrink-0">
        <Icon size={20} />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex justify-between items-start mb-1">
          <h4 className="text-[15px] font-bold text-[#0f2f35] truncate pr-2">{title}</h4>
          <span className={cn("text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full shrink-0", statusColor)}>
            {status}
          </span>
        </div>
        <p className="text-[12px] text-[#6b7280] mb-3">{type}</p>
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-bold text-[#afafaf]">{date}</span>
          <span className="text-[11px] font-bold text-[#145e69] flex items-center gap-0.5">
            View Details <ChevronRight size={12} />
          </span>
        </div>
      </div>
    </div>
  );
};

export const PatientFollowups = () => (
  <PageLayout title="Follow-ups" type="patient">
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div className="bg-white p-8 rounded-[32px] border border-[#e2e2e2] shadow-sm">
        <h3 className="text-lg font-bold text-[#0f2f35] mb-8">Upcoming Appointments</h3>
        <div className="space-y-4">
          <AppointmentItem doctor="Dr. Sarah Chen" type="Virtual Consultation" date="Oct 30, 2026" time="10:00 AM" />
          <AppointmentItem doctor="Dr. Michael Ross" type="Lab Review" date="Nov 05, 2026" time="2:30 PM" />
        </div>
      </div>
      <div className="bg-[#0f2f35] p-8 rounded-[32px] text-white">
        <h3 className="text-lg font-bold mb-6">Need a consultation?</h3>
        <p className="text-white/60 text-sm leading-relaxed mb-8">
          If your results show markers, you can book a priority virtual visit with our global expert network.
        </p>
        <button className="w-full py-4 bg-[#f4d092] text-[#0f2f35] font-bold rounded-2xl hover:bg-white transition-all">
          Book Appointment
        </button>
      </div>
    </div>
  </PageLayout>
);

const AppointmentItem = ({ doctor, type, date, time }) => (
  <div className="flex items-center justify-between p-4 rounded-2xl border border-[#f5f0e8] hover:border-[#145e69]/20 transition-all">
    <div className="flex items-center gap-4">
      <div className="w-10 h-10 rounded-full bg-[#f5f0e8] flex items-center justify-center text-[#145e69]">
        <Calendar size={20} />
      </div>
      <div>
        <h5 className="text-sm font-bold text-[#0f2f35]">{doctor}</h5>
        <p className="text-[10px] text-[#6b7280] font-bold uppercase tracking-widest">{type}</p>
      </div>
    </div>
    <div className="text-right">
      <p className="text-xs font-bold text-[#0f2f35]">{date}</p>
      <p className="text-[10px] text-[#565656]">{time}</p>
    </div>
  </div>
);

export const PatientSettings = () => {
  const navigate = useNavigate();
  return (
    <MobileLayout 
      title="Profile" 
      rightAction={<button className="text-[13px] font-bold text-[#145e69]">Edit</button>}
    >
      {/* Avatar Section */}
      <section className="px-5 pt-8 pb-10 text-center">
        <div className="w-[72px] h-[72px] rounded-full bg-[#145e69] text-white flex items-center justify-center text-[24px] font-black mx-auto mb-4 border-4 border-white shadow-sm">
          JD
        </div>
        <h2 className="text-[20px] font-bold text-[#0f2f35] mb-0.5">John Doe</h2>
        <p className="text-[13px] text-[#6b7280]">Patient · Member since 2026</p>
        <button className="mt-3 px-4 py-1.5 border border-[#e8f4f5] rounded-full text-[12px] font-bold text-[#0f2f35] active:bg-[#f5f0e8]">
          Edit Profile
        </button>
      </section>

      {/* Settings Sections */}
      <div className="space-y-8 pb-12">
        <SettingGroup title="Health Profile">
          <SettingLink icon={User} label="Age" value="45" />
          <SettingLink icon={User} label="Gender" value="Male" />
          <SettingLink icon={Ruler} label="Height" value="180cm" />
          <SettingLink icon={Activity} label="Weight" value="75kg" />
          <SettingLink icon={MapPin} label="Location" value="NC, USA" />
        </SettingGroup>

        <SettingGroup title="Medical History">
          <SettingLink icon={History} label="Known Conditions" value="Diabetes, ..." />
          <SettingLink icon={Pill} label="Medications" value="Metformin" />
          <SettingLink icon={AlertCircle} label="Allergies" value="Penicillin" />
        </SettingGroup>

        <SettingGroup title="Account">
          <SettingLink icon={Bell} label="Notifications" />
          <SettingLink icon={Globe} label="Language" value="English" />
          <SettingLink icon={Lock} label="Privacy" />
          <SettingLink icon={HelpCircle} label="Help & Support" />
        </SettingGroup>

        <SettingGroup title="Legal">
          <SettingLink icon={FileText} label="Terms of Service" />
          <SettingLink icon={Shield} label="Privacy Policy" />
          <SettingLink icon={Lock} label="HIPAA Notice" />
        </SettingGroup>

        {/* Logout Button */}
        <div className="pt-6">
          <button 
            onClick={() => navigate('/')}
            className="w-full py-4 text-[#e24b4a] font-black text-[15px] active:bg-red-50 transition-all flex items-center justify-center gap-2 border-t border-[#e8f4f5]"
          >
            <LogOut size={18} /> Log Out
          </button>
        </div>
      </div>
    </MobileLayout>
  );
};

const SettingGroup = ({ title, children }) => (
  <section>
    <h3 className="px-5 text-[11px] font-bold text-[#afafaf] uppercase tracking-[0.1em] mb-2">{title}</h3>
    <div className="bg-white border-y border-[#e8f4f5] divide-y divide-[#e8f4f5]">
      {children}
    </div>
  </section>
);

const SettingLink = ({ icon: Icon, label, value }) => (
  <div className="h-[52px] px-5 flex items-center justify-between active:bg-[#f5f0e8] transition-colors cursor-pointer">
    <div className="flex items-center gap-3">
      <div className="text-[#145e69]"><Icon size={20} /></div>
      <span className="text-[15px] text-[#0f2f35] font-medium">{label}</span>
    </div>
    <div className="flex items-center gap-2">
      {value && <span className="text-[14px] text-[#afafaf]">{value}</span>}
      <ChevronRight size={16} className="text-[#afafaf]" />
    </div>
  </div>
);



// --- DOCTOR PAGES ---

export const DoctorActiveCases = () => (
  <PageLayout title="Active Cases" type="doctor">
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <ActiveCaseCard name="Robert Fox" id="9823" priority="High" time="45m remaining" />
      <ActiveCaseCard name="Cody Fisher" id="1245" priority="Normal" time="2h remaining" />
      <ActiveCaseCard name="Jane Cooper" id="6632" priority="Urgent" time="12m remaining" />
    </div>
  </PageLayout>
);

const ActiveCaseCard = ({ name, id, priority, time }) => {
  const navigate = useNavigate();
  return (
    <div className="bg-white p-6 rounded-2xl border border-[#e2e2e2] shadow-sm hover:border-[#145e69]/30 transition-all cursor-pointer group" onClick={() => navigate(`/doctor/cases/${id}`)}>
      <div className="flex justify-between items-start mb-6">
        <div className="w-10 h-10 rounded-full bg-[#f5f0e8] flex items-center justify-center text-[#145e69] font-bold text-xs">
          {name.split(' ').map(n => n[0]).join('')}
        </div>
        <span className={cn(
          "px-3 py-1 rounded-full text-[9px] font-bold uppercase tracking-widest",
          priority === 'Urgent' ? "bg-red-100 text-red-700" : 
          priority === 'High' ? "bg-orange-100 text-orange-700" : "bg-emerald-100 text-emerald-700"
        )}>
          {priority}
        </span>
      </div>
      <h4 className="font-bold text-[#0f2f35] group-hover:text-[#145e69] transition-colors">{name}</h4>
      <p className="text-[10px] text-[#6b7280] font-bold uppercase tracking-widest mb-4">Case ID: {id}</p>
      <div className="flex items-center gap-2 text-xs text-[#565656] mb-6">
        <Clock size={14} /> {time}
      </div>
      <button 
        onClick={(e) => {
          e.stopPropagation();
          navigate(`/doctor/cases/${id}`);
        }}
        className="w-full py-3 bg-[#145e69] text-white text-xs font-bold rounded-xl hover:bg-[#0f2f35] transition-all"
      >
        Continue Review
      </button>
    </div>
  );
};

export const DoctorCompleted = () => (
  <PageLayout title="Completed Reviews" type="doctor">
    <div className="bg-white rounded-[24px] border border-[#e2e2e2] overflow-hidden shadow-sm">
      <table className="w-full text-left">
        <thead>
          <tr className="bg-[#f5f0e8]/50 border-b border-[#e2e2e2]">
            <th className="px-8 py-5 text-[10px] font-bold text-[#6b7280] uppercase tracking-widest">Patient</th>
            <th className="px-8 py-5 text-[10px] font-bold text-[#6b7280] uppercase tracking-widest">Diagnostic</th>
            <th className="px-8 py-5 text-[10px] font-bold text-[#6b7280] uppercase tracking-widest">Date</th>
            <th className="px-8 py-5 text-[10px] font-bold text-[#6b7280] uppercase tracking-widest text-right">Status</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-[#f5f0e8]">
          <CompletedRow name="James Wilson" diagnostic="TB Negative" date="Oct 20, 2026" />
          <CompletedRow name="Elena Rodriguez" diagnostic="Clear Water" date="Oct 19, 2026" />
          <CompletedRow name="Samuel Okafor" diagnostic="Malaria Postive" date="Oct 18, 2026" />
        </tbody>
      </table>
    </div>
  </PageLayout>
);

const CompletedRow = ({ name, diagnostic, date }) => (
  <tr className="hover:bg-[#f5f0e8]/30 transition-all">
    <td className="px-8 py-6 font-bold text-[#0f2f35]">{name}</td>
    <td className="px-8 py-6 text-sm text-[#565656]">{diagnostic}</td>
    <td className="px-8 py-6 text-[10px] font-bold text-[#6b7280] uppercase tracking-widest">{date}</td>
    <td className="px-8 py-6 text-right">
      <div className="inline-flex items-center gap-2 text-[10px] font-bold text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full uppercase tracking-widest">
        <CheckCircle2 size={12} /> Validated
      </div>
    </td>
  </tr>
);

export const DoctorPatients = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('All');
  
  const allPatients = ['Robert Fox', 'Jane Cooper', 'Cody Fisher', 'Guy Hawkins', 'Bessie Cooper', 'Arlene McCoy'];
  const filtered = allPatients.filter(name => name.toLowerCase().includes(search.toLowerCase()));

  return (
    <PageLayout title="My Patients" type="doctor">
      <div className="flex justify-between items-center mb-8 px-2">
        <div className="flex gap-4">
          <button 
            onClick={() => setFilter('All')}
            className={cn("px-6 py-2 rounded-full text-xs font-bold transition-all", filter === 'All' ? "bg-[#145e69] text-white shadow-md" : "bg-white text-[#565656] border border-[#e2e2e2]")}
          >
            All Patients
          </button>
          <button 
            onClick={() => setFilter('Assigned')}
            className={cn("px-6 py-2 rounded-full text-xs font-bold transition-all", filter === 'Assigned' ? "bg-[#145e69] text-white shadow-md" : "bg-white text-[#565656] border border-[#e2e2e2]")}
          >
            Assigned to Me
          </button>
        </div>
        <div className="flex items-center gap-3 bg-white px-4 py-2 rounded-xl border border-[#e2e2e2] w-[300px] focus-within:border-[#145e69] transition-all">
          <SearchIcon />
          <input 
            type="text" 
            placeholder="Search by name..." 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="bg-transparent border-none outline-none text-xs w-full" 
          />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {filtered.length > 0 ? filtered.map(name => (
          <div key={name} className="bg-white p-6 rounded-2xl border border-[#e2e2e2] shadow-sm text-center hover:shadow-md transition-all animate-in zoom-in-95 duration-200">
            <div className="w-16 h-16 rounded-full bg-[#f5f0e8] flex items-center justify-center text-[#145e69] font-bold text-lg mx-auto mb-4">
              {name.split(' ').map(n => n[0]).join('')}
            </div>
            <h4 className="font-bold text-[#0f2f35] mb-1">{name}</h4>
            <p className="text-[10px] text-[#6b7280] font-bold uppercase tracking-widest mb-6">Last visit: 2w ago</p>
            <button 
              onClick={() => navigate(`/doctor/patients/${name.replace(' ', '-').toLowerCase()}`)}
              className="text-xs font-bold text-[#145e69] hover:underline"
            >
              View History
            </button>
          </div>
        )) : (
          <div className="col-span-full py-20 text-center text-[#6b7280] font-bold uppercase tracking-widest">
            No patients found matching "{search}"
          </div>
        )}
      </div>
    </PageLayout>
  );
};

const SearchIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#6b7280" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
);

export const DoctorAnalytics = () => (
  <PageLayout title="Analytics" type="doctor">
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <div className="bg-white p-8 rounded-[32px] border border-[#e2e2e2] shadow-sm">
        <h3 className="text-lg font-bold text-[#0f2f35] mb-8">Risk Distribution</h3>
        <div className="space-y-6">
          <ChartBar label="Urgent" value={15} color="bg-[#e24b4a]" />
          <ChartBar label="High Risk" value={35} color="bg-orange-500" />
          <ChartBar label="Normal" value={50} color="bg-emerald-500" />
        </div>
      </div>
      <div className="bg-[#0f2f35] p-8 rounded-[32px] shadow-premium-lg relative overflow-hidden">
        {/* Subtle Glow */}
        <div className="absolute -top-24 -right-24 w-48 h-48 bg-[#9ed8db]/10 rounded-full blur-3xl pointer-events-none" />
        
        <h3 className="text-lg font-bold text-white mb-8 relative z-10">Average Review Time</h3>
        <div className="flex items-end gap-2 mb-2">
          <span className="text-5xl font-black italic text-[#f4d092]">2.4</span>
          <span className="text-xl font-bold mb-1 text-white">hours</span>
        </div>
        <p className="text-white/40 text-[10px] font-bold uppercase tracking-widest mb-8">12% faster than last month</p>
        <div className="flex gap-2 items-end h-[100px]">
          {[40, 70, 45, 90, 65, 80, 55].map((h, i) => (
            <div key={i} className="flex-1 bg-white/10 rounded-t-lg relative group">
              <div 
                className="absolute bottom-0 w-full bg-[#9ed8db] rounded-t-lg transition-all duration-1000" 
                style={{ height: `${h}%` }}
              />
              <div className="absolute -top-6 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 text-[8px] font-bold bg-white text-[#0f2f35] px-1 rounded transition-all">
                {h}m
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </PageLayout>
);

const ChartBar = ({ label, value, color }) => (
  <div className="space-y-2">
    <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest">
      <span className="text-[#565656]">{label}</span>
      <span className="text-[#0f2f35]">{value}%</span>
    </div>
    <div className="h-2 bg-[#f5f0e8] rounded-full overflow-hidden">
      <div className={cn("h-full rounded-full", color)} style={{ width: `${value}%` }} />
    </div>
  </div>
);

export const DoctorSettings = () => {
  const { addToast } = useToast();
  const [prefs, setPrefs] = useState({ alerts: true, autosave: true });
  const toggle = (key) => {
    setPrefs(prev => ({ ...prev, [key]: !prev[key] }));
    addToast('Professional settings updated', 'success');
  };

  return (
    <PageLayout title="Professional Settings" type="doctor">
      <div className="max-w-2xl space-y-6">
        <SettingSection title="Clinic Schedule">
          <SettingItem icon={Clock} label="Set Availability Hours" />
          <SettingItem icon={Calendar} label="Vacation Mode" />
        </SettingSection>
        <SettingSection title="Preferences">
          <SettingItem icon={Bell} label="Critical Risk Alerts" active={prefs.alerts} onClick={() => toggle('alerts')} />
          <SettingItem icon={Lock} label="Auto-save Review Progress" active={prefs.autosave} onClick={() => toggle('autosave')} />
        </SettingSection>
        <SettingSection title="Credentials">
          <SettingItem icon={Shield} label="Update Professional ID" />
          <SettingItem icon={FileText} label="Digital Signature Settings" />
        </SettingSection>
      </div>
    </PageLayout>
  );
};
