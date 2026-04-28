'use client';

import { X, Download, Printer } from 'lucide-react';
import { useEffect, useRef } from 'react';

interface InvoiceData {
  order_id: string;
  payment_id: string;
  tracking_id: string | null;
  status: string;
  date: string;
  customer: {
    name: string;
    email: string;
    phone: string;
    address: string;
  };
  items: Array<{
    id: string;
    name: string;
  }>;
  pricing: {
    gold_value: number;
    silver_value: number;
    making_charges: number;
    gemstone_value: number;
    wastage: number;
    gst: number;
    total: number;
  };
  store_details: {
    gst_number: string;
    billing_address: string;
    invoice_text: string;
  };
}

interface InvoiceModalProps {
  isOpen: boolean;
  onClose: () => void;
  invoiceData: InvoiceData | null;
  isLoading: boolean;
}

export default function InvoiceModal({ isOpen, onClose, invoiceData, isLoading }: InvoiceModalProps) {
  const invoiceRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handlePrint = () => {
    const printContent = invoiceRef.current;
    if (!printContent) return;

    const printWindow = window.open('', '', 'width=800,height=600');
    if (!printWindow) return;

    printWindow.document.write(`
      <html>
        <head>
          <title>Invoice - ${invoiceData?.order_id}</title>
          <style>
            body { font-family: Arial, sans-serif; margin: 20px; }
            .invoice-container { max-width: 800px; margin: 0 auto; }
            table { width: 100%; border-collapse: collapse; margin: 20px 0; }
            th, td { padding: 12px; text-align: left; border-bottom: 1px solid #ddd; }
            th { background-color: #B8941E; color: white; }
            .total-row { font-weight: bold; font-size: 18px; }
            .header { text-align: center; margin-bottom: 30px; }
            .info-section { margin: 20px 0; }
            @media print {
              button { display: none; }
            }
          </style>
        </head>
        <body>
          ${printContent.innerHTML}
        </body>
      </html>
    `);
    printWindow.document.close();
    printWindow.focus();
    setTimeout(() => {
      printWindow.print();
      printWindow.close();
    }, 250);
  };

  const handleDownload = () => {
    // Use browser's native print to PDF - most reliable method
    handlePrint();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-60 backdrop-blur-sm">
      <div className="relative w-full max-w-4xl max-h-[90vh] bg-white rounded-lg shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="sticky top-0 z-10 bg-gradient-to-r from-[#B8941E] to-[#9a7a19] text-white px-6 py-4 flex items-center justify-between print:hidden">
          <h2 className="text-xl sm:text-2xl font-bold">Tax Invoice</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white/20 rounded-full transition"
            aria-label="Close"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <div className="overflow-y-auto max-h-[calc(90vh-80px)]">
          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#B8941E] mb-4"></div>
              <p className="text-gray-600">Loading invoice...</p>
            </div>
          ) : invoiceData ? (
            <div ref={invoiceRef} data-invoice-content className="bg-white p-8 sm:p-12">
              <div className="max-w-4xl mx-auto space-y-8">
                {/* Header Section */}
                <div className="border-b-4 border-[#B8941E] pb-6">
                  <div className="flex justify-between items-start">
                    <div>
                      <h1 className="text-3xl font-bold text-[#B8941E] mb-2">
                        SREE GANESH JEWELLERS
                      </h1>
                      <p className="text-sm text-gray-600 max-w-xs leading-relaxed">
                        {invoiceData.store_details.billing_address}
                      </p>
                      <p className="text-sm text-gray-900 font-semibold mt-2">
                        GSTIN: {invoiceData.store_details.gst_number}
                      </p>
                    </div>
                    <div className="text-right">
                      <div className="bg-[#B8941E] text-white px-4 py-2 rounded-lg inline-block mb-3">
                        <p className="text-xs font-semibold">TAX INVOICE</p>
                      </div>
                      <p className="text-xs text-gray-600">Invoice Date</p>
                      <p className="text-sm font-semibold text-gray-900">{invoiceData.date}</p>
                      <p className="text-xs text-gray-600 mt-2">Status</p>
                      <span className={`inline-block px-3 py-1 text-xs font-bold rounded ${
                        invoiceData.status === 'PENDING' ? 'bg-yellow-100 text-yellow-800' :
                        invoiceData.status === 'COMPLETED' ? 'bg-green-100 text-green-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {invoiceData.status}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Bill To & Invoice Details */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* Bill To */}
                  <div>
                    <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">
                      Bill To
                    </h3>
                    <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                      <p className="font-bold text-gray-900 text-lg mb-2">{invoiceData.customer.name}</p>
                      <p className="text-sm text-gray-700 mb-1">{invoiceData.customer.address}</p>
                      <p className="text-sm text-gray-700 mb-1">
                        <span className="font-semibold">Email:</span> {invoiceData.customer.email}
                      </p>
                      <p className="text-sm text-gray-700">
                        <span className="font-semibold">Phone:</span> {invoiceData.customer.phone}
                      </p>
                    </div>
                  </div>

                  {/* Invoice Details */}
                  <div>
                    <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">
                      Invoice Details
                    </h3>
                    <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Order ID:</span>
                        <span className="text-sm font-semibold text-gray-900 break-all text-right ml-2">
                          {invoiceData.order_id.substring(0, 20)}...
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Payment ID:</span>
                        <span className="text-sm font-semibold text-gray-900 break-all text-right ml-2">
                          {invoiceData.payment_id}
                        </span>
                      </div>
                      {invoiceData.tracking_id && (
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600">Tracking ID:</span>
                          <span className="text-sm font-semibold text-gray-900">{invoiceData.tracking_id}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Items Table */}
                <div>
                  <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">
                    Order Items
                  </h3>
                  <div className="border border-gray-200 rounded-lg overflow-hidden">
                    <table className="w-full">
                      <thead className="bg-[#B8941E] text-white">
                        <tr>
                          <th className="px-4 py-3 text-left text-xs font-semibold uppercase">S.No</th>
                          <th className="px-4 py-3 text-left text-xs font-semibold uppercase">Item Description</th>
                          <th className="px-4 py-3 text-left text-xs font-semibold uppercase">Item ID</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {invoiceData.items.map((item, index) => (
                          <tr key={item.id} className="hover:bg-gray-50">
                            <td className="px-4 py-3 text-sm text-gray-900">{index + 1}</td>
                            <td className="px-4 py-3 text-sm font-semibold text-gray-900">{item.name}</td>
                            <td className="px-4 py-3 text-sm text-gray-600 font-mono text-xs">
                              {item.id.substring(0, 20)}...
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Pricing Section */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div></div>
                  <div>
                    <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                      <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-4">
                        Price Breakdown
                      </h3>
                      <div className="space-y-3">
                        {invoiceData.pricing.gold_value > 0 && (
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-700">Gold Value</span>
                            <span className="font-semibold text-gray-900">
                              ₹ {invoiceData.pricing.gold_value.toLocaleString('en-IN')}
                            </span>
                          </div>
                        )}
                        {invoiceData.pricing.silver_value > 0 && (
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-700">Silver Value</span>
                            <span className="font-semibold text-gray-900">
                              ₹ {invoiceData.pricing.silver_value.toLocaleString('en-IN')}
                            </span>
                          </div>
                        )}
                        {invoiceData.pricing.making_charges > 0 && (
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-700">Making Charges</span>
                            <span className="font-semibold text-gray-900">
                              ₹ {invoiceData.pricing.making_charges.toLocaleString('en-IN')}
                            </span>
                          </div>
                        )}
                        {invoiceData.pricing.gemstone_value > 0 && (
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-700">Gemstone Value</span>
                            <span className="font-semibold text-gray-900">
                              ₹ {invoiceData.pricing.gemstone_value.toLocaleString('en-IN')}
                            </span>
                          </div>
                        )}
                        {invoiceData.pricing.wastage > 0 && (
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-700">Wastage</span>
                            <span className="font-semibold text-gray-900">
                              ₹ {invoiceData.pricing.wastage.toLocaleString('en-IN')}
                            </span>
                          </div>
                        )}
                        <div className="flex justify-between text-sm border-t border-gray-300 pt-3">
                          <span className="text-gray-700">GST (3%)</span>
                          <span className="font-semibold text-gray-900">
                            ₹ {invoiceData.pricing.gst.toLocaleString('en-IN')}
                          </span>
                        </div>
                        <div className="flex justify-between items-center bg-[#B8941E] text-white p-4 rounded-lg mt-4">
                          <span className="text-base font-bold">Total Amount</span>
                          <span className="text-2xl font-bold">
                            ₹ {invoiceData.pricing.total.toLocaleString('en-IN')}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Footer */}
                <div className="border-t-2 border-gray-200 pt-6">
                  <div className="bg-amber-50 border-l-4 border-[#B8941E] p-4 rounded">
                    <p className="text-sm text-gray-700 italic text-center">
                      {invoiceData.store_details.invoice_text}
                    </p>
                  </div>
                  <div className="mt-6 text-center">
                    <p className="text-xs text-gray-500">
                      This is a computer-generated invoice and does not require a signature.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-600">No invoice data available</p>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        {!isLoading && invoiceData && (
          <div className="sticky bottom-0 bg-white border-t border-gray-200 px-6 py-4 print:hidden">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <button
                onClick={handlePrint}
                className="flex items-center justify-center gap-2 bg-white text-[#B8941E] py-3 rounded-lg font-bold border-2 border-[#B8941E] hover:bg-amber-50 transition"
              >
                <Printer className="w-5 h-5" />
                Print Invoice
              </button>
              <button
                onClick={handleDownload}
                className="flex items-center justify-center gap-2 bg-[#B8941E] text-white py-3 rounded-lg font-bold hover:bg-[#9a7a19] transition"
              >
                <Download className="w-5 h-5" />
                Download PDF
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
