import { Invoice } from "../types";

// NOTE: This API key should be stored in a secure backend or environment variable in a real-world application.
// It is exposed here only for the purpose of this exercise.
const SLICK_PAY_API_KEY = '27080|UrZLsMIBCf5eE1CNOL38lgPWNHwaLhODlQ4k0TN7';
const API_BASE_URL = 'https://prodapi.slickpay.com/api/v2'; // Corrected URL

/**
 * Creates a new payment invoice using the Slick Pay API.
 * @param userEmail The email of the user making the payment.
 * @param userName The name of the user.
 * @param successUrlOverride Optional URL to redirect to on success.
 * @returns A promise that resolves to the created invoice data.
 */
export const createInvoice = async (userEmail: string, userName: string, successUrlOverride?: string): Promise<Invoice> => {
    // NOTE: The API documentation provided uses a static contact UUID.
    // In a real application, you would first create a contact for the new user
    // and use their unique contact ID here. We will use a placeholder as per the docs.
    const contactId = '37990d08-fc51-4c32-ad40-1552d13c00d1'; 
    const successUrl = successUrlOverride || `${window.location.origin}/payment-success`;

    const response = await fetch(`${API_BASE_URL}/users/invoices`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${SLICK_PAY_API_KEY}`,
        },
        body: JSON.stringify({
            amount: 150000,
            contact: contactId,
            url: successUrl,
            items: [
                {
                    name: "MindLingo Premium Subscription",
                    price: 150000,
                    quantity: 1
                }
            ]
        })
    });

    if (!response.ok) {
        const errorData = await response.json();
        // Provide a more detailed error in the console for debugging, and a user-friendly one in the thrown Error.
        console.error("Slick Pay Error:", JSON.stringify(errorData, null, 2));
        const message = errorData.message || (errorData.errors ? JSON.stringify(errorData.errors) : 'فشل الاتصال بخدمة الدفع.');
        throw new Error(`فشل في إنشاء فاتورة الدفع: ${message}`);
    }

    // A common API pattern is to return the created resource directly.
    const data = await response.json();
    return data as Invoice; 
};

/**
 * Fetches the status of an existing invoice from the Slick Pay API.
 * @param invoiceId The unique ID of the invoice to check.
 * @returns A promise that resolves to the invoice data.
 */
export const getInvoiceStatus = async (invoiceId: string): Promise<Invoice> => {
    const response = await fetch(`${API_BASE_URL}/users/invoices/${invoiceId}`, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Authorization': `Bearer ${SLICK_PAY_API_KEY}`,
        }
    });

    if (!response.ok) {
        throw new Error('فشل التحقق من حالة الدفع.');
    }

    const data = await response.json();
    // Also assuming the data is not nested here.
    return data as Invoice;
};