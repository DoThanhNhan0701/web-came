import { IInvoice } from "@/screens/private/ListInvoice";

export const invoiceTypes: IInvoice[] = [
  { id: "1", name: "Đồ dùng", count: 0, icon: "cube-outline" },
  { id: "2", name: "Hóa mỹ phẩm", count: 0, icon: "color-palette-outline" },
  { id: "3", name: "TPCN", count: 0, icon: "nutrition-outline" },
  { id: "4", name: "Máy mặc", count: 0, icon: "shirt-outline" },
  { id: "5", name: "Hàng giao tháng", count: 0, icon: "calendar-outline" },
  { id: "6", name: "Bảng kê TPTS", count: 0, icon: "list-outline" },
  {
    id: "7",
    name: "Bảng kê hàng đại lý (Consignment)",
    count: 0,
    icon: "people-outline",
  },
  { id: "8", name: "TPTS trả trước", count: 0, icon: "card-outline" },
  { id: "9", name: "TPTS trả sau", count: 0, icon: "time-outline" },
  {
    id: "10",
    name: "Định kèm biên bản",
    count: 0,
    icon: "document-attach-outline",
  },
  { id: "11", name: "Định kèm hóa đơn", count: 0, icon: "receipt-outline" },
];
