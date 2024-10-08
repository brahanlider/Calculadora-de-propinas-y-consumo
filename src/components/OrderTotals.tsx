import { useCallback } from "react"
import { TOrderItem } from "../types"
import { formatCurrency } from "../helpers"

type TOrderTotalsProps = {
  order: TOrderItem[],
  tip: number
  placeOrder: () => void

}

export default function OrderTotals({ order, tip, placeOrder }: TOrderTotalsProps) {

  const subTotalAmount = useCallback(() => order.reduce(
    (total, item) => total + (item.quantity * item.price), 0), [order])

  const tipAmount = useCallback(() => subTotalAmount() * tip, [tip, order])
  const totalAmount = useCallback(() => subTotalAmount() + tipAmount(), [tip, order])

  return (

    <>
      <div className="space-y-3">
        <h2 className="font-black text-2xl">Totales y propina</h2>
        <p>Subtotal a pagar:{' '}
          <span className="font-black">{formatCurrency(subTotalAmount())}</span>
        </p>
        <p>Propina:{' '}
          <span className="font-black">{formatCurrency(tipAmount())}</span>
        </p>
        <p>Total a Pagar:{' '}
          <span className="font-black">{formatCurrency(totalAmount())}</span>
        </p>
      </div>

      <button className="w-full bg-black p-3 uppercase text-white font-bold mt-10 disabled:opacity-10"
        disabled={totalAmount() === 0}
        onClick={placeOrder}
      >
        Guardar compra
      </button></>

  )
}
