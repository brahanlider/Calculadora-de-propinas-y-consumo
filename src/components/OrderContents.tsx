import { formatCurrency } from "../helpers"
import { TMenuItem, TOrderItem } from "../types"

type TOrderContentsProps = {
  order: TOrderItem[],
  removeItem: (id: TMenuItem['id']) => void
}

export default function OrderContents({ order, removeItem }: TOrderContentsProps) {
  return (
    <div>
      <h2 className="font-black text-4xl">Consumo</h2>
      <div className="space-y-3 mt-5">
        {
          (order.map(item => (
            <div key={item.id}
              className="flex justify-between">
              <p className="text-lg">
                {item.name} - {formatCurrency(item.price)}
              </p>
              <p className="font-black">
                Cantidad : {item.quantity} - {formatCurrency(item.price * item.quantity)}
              </p>
              <button className="bg-red-600 h-8 w-8 rounded-full text-white font-black"
                onClick={() => removeItem(item.id)}>
                x
              </button>
            </div>
          )))
        }
      </div>
    </div>
  )
}
