import { useState } from "react";
import LoginPage from "./components/LoginPage";
import ProposalViewer from "./components/ProposalViewer";
import QuotationForm from "./components/QuotationForm";
import type { BankDetails, CustomerData, PaymentScheduleData } from "./types";

type View = "login" | "form" | "proposal";

export default function App() {
  const [view, setView] = useState<View>(
    localStorage.getItem("sas_auth") === "true" ? "form" : "login",
  );
  const [customerData, setCustomerData] = useState<CustomerData | null>(null);
  const [bankDetails, setBankDetails] = useState<BankDetails | null>(null);
  const [paymentSchedule, setPaymentSchedule] =
    useState<PaymentScheduleData | null>(null);

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

  if (view === "login") return <LoginPage onLogin={handleLogin} />;

  if (view === "proposal" && customerData && bankDetails && paymentSchedule) {
    return (
      <ProposalViewer
        customer={customerData}
        bank={bankDetails}
        onBack={() => setView("form")}
      />
    );
  }

  return <QuotationForm onGenerate={handleGenerate} />;
}
