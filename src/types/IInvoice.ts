export interface IInvoiceImage {
  file_path: string;
  file_name: string;
  file_size: number;
  mime_type: string;
  gps_latitude: string;
  gps_longitude: string;
  id: string;
  invoice_id: string;
  created_at: Date;
}
