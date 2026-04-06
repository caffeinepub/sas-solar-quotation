import Text "mo:core/Text";
import Nat "mo:core/Nat";
import Array "mo:core/Array";
import Time "mo:core/Time";

import Map "mo:core/Map";
import Order "mo:core/Order";


actor {
  type QuotationRecord = {
    id : Text;
    savedAt : Text;
    customerName : Text;
    quotationNumber : Text;
    capacity : Nat;
    salePrice : Nat;
    mobile : Text;
    panelBrand : Text;
    systemType : Text;
    channelPartnerName : Text;
    customerDataJson : Text;
    bankDataJson : Text;
  };

  let quotations = Map.empty<Text, QuotationRecord>();
  var nextId = 1;

  func compareQuotationsByTimestamp(a : QuotationRecord, b : QuotationRecord) : Order.Order {
    Text.compare(b.savedAt, a.savedAt);
  };

  public shared ({ caller }) func saveQuotation(customerName : Text, quotationNumber : Text, capacity : Nat, salePrice : Nat, mobile : Text, panelBrand : Text, systemType : Text, channelPartnerName : Text, customerDataJson : Text, bankDataJson : Text) : async Text {
    let id = nextId.toText();
    let timestamp = Time.now().toText();

    let record : QuotationRecord = {
      id;
      savedAt = timestamp;
      customerName;
      quotationNumber;
      capacity;
      salePrice;
      mobile;
      panelBrand;
      systemType;
      channelPartnerName;
      customerDataJson;
      bankDataJson;
    };

    quotations.add(id, record);
    nextId += 1;
    id;
  };

  public query ({ caller }) func getAllQuotations() : async [QuotationRecord] {
    quotations.values().toArray().sort(
      compareQuotationsByTimestamp
    );
  };

  public shared ({ caller }) func deleteQuotation(id : Text) : async Bool {
    let existed = quotations.containsKey(id);
    quotations.remove(id);
    existed;
  };

  public query ({ caller }) func getQuotationCount() : async Nat {
    quotations.size();
  };
};
