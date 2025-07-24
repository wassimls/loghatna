import { Invoice } from "../types";

// ====================================================================================
// !!! ملاحظة هامة: يجب تحديث هذا الرابط !!!
// ====================================================================================
//
// استبدل هذا الرابط بعنوان URL الخاص بالواجهة الخلفية (Backend) التي قمت بنشرها على render.com.
//
const BACKEND_API_BASE_URL = 'https://mindlingo-payment-backend.onrender.com/api'; 
// مثال: 'https://your-app-name.onrender.com/api'
//
// ====================================================================================


/**
 * Creates a new payment invoice by calling the backend service.
 * @param userDetails - The user's details for the invoice.
 * @param referralCode - An optional referral code.
 * @returns A promise that resolves to an object containing the payment URL.
 */
export const createInvoice = async (
    userDetails: {
        email: string;
        fullName: string;
        phone: string;
        address: string;
    },
    referralCode: string | null
): Promise<{ payment_url: string }> => {
    
    const endpoint = `${BACKEND_API_BASE_URL}/create-invoice`;
    
    const requestBody: { [key: string]: any } = {
        email: userDetails.email,
        fullName: userDetails.fullName,
        phone: userDetails.phone,
        address: userDetails.address,
    };
    if (referralCode) {
        requestBody.referralCode = referralCode;
    }

    try {
        const response = await fetch(endpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify(requestBody)
        });

        const responseData = await response.json();

        if (!response.ok) {
            const errorMessage = responseData.error || `فشل الاتصال بالخادم (الحالة: ${response.status})`;
            throw new Error(errorMessage);
        }

        if (!responseData.payment_url) {
            throw new Error("لم يتمكن الخادم من توفير رابط الدفع.");
        }

        return responseData;

    } catch (error) {
        console.error("Error creating invoice via backend:", error);
        if (error instanceof Error) {
            throw new Error(`فشل في إنشاء فاتورة الدفع: ${error.message}`);
        }
        throw new Error("فشل في إنشاء فاتورة الدفع بسبب خطأ غير متوقع.");
    }
};

/**
 * Verifies the status of a payment by calling the backend service.
 * @param invoiceId - The unique ID of the invoice to check.
 * @returns A promise that resolves to an object containing the payment status.
 */
export const verifyPayment = async (invoiceId: string): Promise<{ status: string }> => {
    const endpoint = `${BACKEND_API_BASE_URL}/verify-payment`;

    try {
        const response = await fetch(endpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify({ invoiceId })
        });

        const responseData = await response.json();

        if (!response.ok) {
            const errorMessage = responseData.error || `فشل الاتصال بالخادم (الحالة: ${response.status})`;
            throw new Error(errorMessage);
        }
        
        return responseData;

    } catch (error) {
         console.error("Error verifying payment via backend:", error);
         if (error instanceof Error) {
            throw new Error(`فشل التحقق من حالة الدفع: ${error.message}`);
         }
         throw new Error("فشل التحقق من حالة الدفع بسبب خطأ غير متوقع.");
    }
};