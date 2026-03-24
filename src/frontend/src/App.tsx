import { useState } from "react";
import LoginPage from "./components/LoginPage";
import ProposalViewer from "./components/ProposalViewer";
import QuotationForm from "./components/QuotationForm";
import SavedQuotations from "./components/SavedQuotations";
import type { BankDetails, CustomerData, PaymentScheduleData } from "./types";

type View = "login" | "form" | "proposal" | "savedList";

// Permanent UPI QR code - hardcoded so it always appears in proposals
const PERMANENT_UPI_QR =
  "/assets/uploads/70545366_SPM_PUNB000005544115-918908054150_07-03-2026_12-20-03_page-0001-1-1.jpg";

export default function App() {
  const [view, setView] = useState<View>(
    localStorage.getItem("sas_auth") === "true" ? "form" : "login",
  );
  const [customerData, setCustomerData] = useState<CustomerData | null>(null);
  const [bankDetails, setBankDetails] = useState<BankDetails | null>(null);
  const [paymentSchedule, setPaymentSchedule] =
    useState<PaymentScheduleData | null>(null);
  const [upiQrImage, setUpiQrImage] = useState<string>(PERMANENT_UPI_QR);

  const handleLogin = () => setView("form");

  const handleGenerate = (
    data: CustomerData,
    bank: BankDetails,
    payment: PaymentScheduleData,
  ) => {
    setCustomerData(data);
    setBankDetails(bank);
    setPaymentSchedule(payment);
    setView("proposal");
  };

  const handleSave = (customer: CustomerData, bank: BankDetails) => {
    const saved = JSON.parse(localStorage.getItem("sas_saved_quotes") || "[]");
    saved.unshift({
      id: Date.now().toString(),
      savedAt: new Date().toISOString(),
      customer,
      bank,
    });
    localStorage.setItem(
      "sas_saved_quotes",
      JSON.stringify(saved.slice(0, 50)),
    );
  };

  const handleViewSavedQuote = (customer: CustomerData, bank: BankDetails) => {
    setCustomerData(customer);
    setBankDetails(bank);
    setPaymentSchedule({
      advance: 5,
      beforeInstallation: 70,
      materialArrival: 25,
      afterInstallation: 0,
    });
    setView("proposal");
  };

  if (view === "login") return <LoginPage onLogin={handleLogin} />;

  if (view === "savedList") {
    return (
      <SavedQuotations
        onBack={() => setView("form")}
        onViewQuote={handleViewSavedQuote}
      />
    );
  }

  if (view === "proposal" && customerData && bankDetails && paymentSchedule) {
    return (
      <ProposalViewer
        customer={customerData}
        bank={bankDetails}
        onBack={() => setView("form")}
        upiQrImage={upiQrImage}
      />
    );
  }

  return (
    <QuotationForm
      onGenerate={handleGenerate}
      onQrUpload={setUpiQrImage}
      upiQrImage={upiQrImage}
      onSave={handleSave}
      onViewSaved={() => setView("savedList")}
    />
  );
}
