import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Sidebar from '../../components/layout/Sidebar';
import Topbar from '../../components/layout/Topbar';
import { 
  History, FileText, Activity, Calendar, 
  ArrowLeft, Download, Shield, Pill, 
  Waves, Wind, TestTube
} from 'lucide-react';
import { cn } from '../../lib/utils';

const PatientHistory = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Mock patient data
  const patient = {
    name: "Robert Fox",
    id: id || "9823",
    age: 45,
    gender: "Male",
    history: [
      { date: "Oct 12, 2026", event: "Respiratory Assessment", status: "Follow-up Required", icon: Wind, color: "text-orange-500", bg: "bg-orange-50" },
      { date: "Sep 28, 2026", event: "Water Quality Test", status: "Clear", icon: Waves, color: "text-emerald-500", bg: "bg-emerald-50" },
      { date: "Aug 15, 2026", event: "Initial Onboarding", status: "Completed", icon: Shield, color: "text-[#145e69]", bg: "bg-[#e8f4f5]" },
      { date: "Jul 10, 2026", event: "Diagnostic Panel", status: "Negative", icon: TestTube, color: "text-blue-500", bg: "bg-blue-50" },
    ]
  };

  return (
    <div className="flex min-h-screen bg-[#f5f0e8] font-manrope">
      <Sidebar type="doctor" />
      
      <main className="flex-1 ml-[240px]">
        <Topbar title="Patient History" status="none" />
        
        <div className="p-8 max-w-5xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
          {/* Back Action */}
          <button 
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-sm font-bold text-[#145e69] hover:text-[#0f2f35] transition-colors"
          >
            <ArrowLeft size={16} /> Back to Directory
          </button>

          {/* Patient Profile Header */}
          <div className="bg-white p-8 rounded-[32px] border border-[#e2e2e2] shadow-sm flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="flex items-center gap-6">
              <div className="w-20 h-20 rounded-full bg-[#f5f0e8] flex items-center justify-center text-4xl font-bold text-[#145e69]">
                {patient.name.split(' ').map(n => n[0]).join('')}
              </div>
              <div>
                <h2 className="text-2xl font-black text-[#0f2f35]">{patient.name}</h2>
                <div className="flex items-center gap-4 mt-1 text-sm text-[#565656]">
                  <span className="font-bold">ID: {patient.id}</span>
                  <span>{patient.age} years old</span>
                  <span>{patient.gender}</span>
                </div>
              </div>
            </div>
            <div className="flex gap-3">
              <button className="flex items-center gap-2 px-6 py-3 bg-[#f5f0e8] text-[#145e69] rounded-xl text-xs font-bold hover:bg-[#145e69] hover:text-white transition-all">
                <Download size={16} /> Export Record
              </button>
              <button className="px-6 py-3 bg-[#145e69] text-white rounded-xl text-xs font-bold hover:bg-[#0f2f35] transition-all">
                Assign New Test
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Timeline */}
            <div className="md:col-span-2 space-y-6">
              <div className="flex items-center gap-3 mb-2">
                <History className="text-[#145e69]" />
                <h3 className="text-lg font-bold text-[#0f2f35]">Medical Timeline</h3>
              </div>
              
              <div className="relative pl-8 space-y-8 before:absolute before:left-3 before:top-0 before:bottom-0 before:w-px before:bg-[#e2e2e2]">
                {patient.history.map((item, i) => (
                  <div key={i} className="relative group">
                    <div className="absolute -left-[29px] top-1 w-2.5 h-2.5 rounded-full bg-[#145e69] ring-4 ring-white" />
                    <div className="bg-white p-6 rounded-2xl border border-[#e2e2e2] shadow-sm hover:border-[#145e69]/30 transition-all">
                      <div className="flex justify-between items-start mb-4">
                        <div className="flex items-center gap-3">
                          <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center", item.bg, item.color)}>
                            <item.icon size={20} />
                          </div>
                          <div>
                            <h4 className="font-bold text-[#0f2f35]">{item.event}</h4>
                            <p className="text-[10px] font-bold text-[#6b7280] uppercase tracking-widest">{item.date}</p>
                          </div>
                        </div>
                        <span className={cn("px-3 py-1 rounded-full text-[9px] font-bold uppercase tracking-widest", item.bg, item.color)}>
                          {item.status}
                        </span>
                      </div>
                      <button className="text-xs font-bold text-[#145e69] hover:underline">View Report →</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Side Stats */}
            <div className="space-y-8">
              <div className="bg-[#0f2f35] p-8 rounded-[32px] text-white shadow-premium-lg relative overflow-hidden">
                <div className="absolute -top-24 -right-24 w-48 h-48 bg-[#9ed8db]/10 rounded-full blur-3xl pointer-events-none" />
                <h3 className="text-lg font-bold text-white mb-6 relative z-10">Patient Vitals</h3>
                <div className="space-y-6 relative z-10">
                  <VitalRow label="Risk Score" value="7.2/10" color="text-orange-400" />
                  <VitalRow label="Last Update" value="2h ago" color="text-white/80" />
                  <VitalRow label="Total Tests" value="12" color="text-[#9ed8db]" />
                </div>
              </div>

              <div className="bg-white p-8 rounded-[32px] border border-[#e2e2e2] shadow-sm">
                <h3 className="text-lg font-bold text-[#0f2f35] mb-6">Medications</h3>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-[#e8f4f5] flex items-center justify-center text-[#145e69]">
                      <Pill size={16} />
                    </div>
                    <span className="text-sm font-bold text-[#565656]">Amoxicillin</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-[#e8f4f5] flex items-center justify-center text-[#145e69]">
                      <Pill size={16} />
                    </div>
                    <span className="text-sm font-bold text-[#565656]">Vitamin D3</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

const VitalRow = ({ label, value, color }) => (
  <div className="flex justify-between items-center">
    <span className="text-xs font-bold text-white/70 uppercase tracking-widest">{label}</span>
    <span className={cn("font-bold", color)}>{value}</span>
  </div>
);

export default PatientHistory;
