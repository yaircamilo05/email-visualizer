export interface ApiResponse {
  hits: Hit[];
  scan_records: number;
}

export interface Hit {
  _timestamp: number;
  body: string;
  content_transfer_encoding: string;
  content_type: string;
  date: string;
  from: string;
  message_id: string;
  mime_version: string;
  subject: string;
  to: string;
  x_bcc: string;
  x_cc: string;
  x_filename: string;
  x_folder: string;
  x_from: string;
  x_origin: string;
  x_to: string;
}