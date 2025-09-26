'use client'
import { CreateOrderActions, CreateOrderData, OnApproveData, OnApproveActions } from "@paypal/paypal-js";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

export default function PaypalComponent({
    CreateOrder,
    onApprove,
    disabled = false,
    onClickFundingSource
}: {
    CreateOrder: (data: CreateOrderData, actions: CreateOrderActions) => Promise<string>,
    onApprove: (data: OnApproveData, actions: OnApproveActions) => Promise<void>,
    disabled?: boolean,
    onClickFundingSource?:(value:string)=>void

}) {


    return (
        <button className="h-full w-full">

            <PayPalScriptProvider options={{
                clientId: process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID as string,
                currency: "USD",
                intent: "capture",

            }}  
            
            
            >
                <PayPalButtons

                    disabled={disabled}
                    onClick={(e)=>onClickFundingSource && onClickFundingSource(e?.fundingSource as string)}
                    // style={{ layout: "vertical", color: 'gold', height: 30, shape: 'pill', tagline:false, label:'checkout'  }}
                    createOrder={CreateOrder}
                    
                    className="overflow-auto"
                    onCancel={(e)=>onClickFundingSource && onClickFundingSource('cancel')}
                    onApprove={onApprove}
                />
            </PayPalScriptProvider>
        </button>
    )
}