export interface ApiResponse {
  took: number;
  took_detail: TookDetail;
  hits: Hit[];
  total: number;
  from: number;
  size: number;
  cached_ratio: number;
  scan_size: number;
  idx_scan_size: number;
  scan_records: number;
  trace_id: string;
  is_partial: boolean;
  result_cache_ratio: number;
  order_by: string;
}

export interface TookDetail {
  total: number;
  idx_took: number;
  wait_queue: number;
  cluster_total: number;
  cluster_wait_queue: number;
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