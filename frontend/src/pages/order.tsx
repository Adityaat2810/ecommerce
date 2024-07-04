import { ReactElement, useState } from "react";
import TableHOC from "../components/admin/TableHOC"
import { Column } from "react-table";
import { Link } from "react-router-dom";

type DataType={
  _id:string;
  amount:number;
  quantity:number;
  discount:number;
  status:ReactElement;
  action:ReactElement;
}

const column:Column<DataType>[]=[
  {
   Header:"ID",
   accessor:"_id"
  },
  {
    Header:"Quantity",
    accessor:"quantity"
   },
   {
    Header:"Discount",
    accessor:"discount"
   },
   {
    Header:"Amount",
    accessor:"amount"
   },
   {
    Header:"Status",
    accessor:"status"
   },
   {
    Header:"Action",
    accessor:"action"
   },
]

const Orders = () => {

  const [rows ] = useState<DataType[]>([
    {
      _id:"jhfkhdlfdfef",
      amount:556,
      quantity:54,
      discount:4,
      status:<span className="red">
        Processing
      </span>,
      action:<Link to={`/order/dfjkef`}>View</Link>,
    },
    {
      _id:"uyidewdvjwkf",
      amount:759,
      quantity:544,
      discount:443,
      status:<span className="green">
        Delieverd
      </span>,
      action:<Link to={`/order/dfjkef`}>View</Link>,
    },
    {
      _id:"eurevefveekfbk",
      amount:8749,
      quantity:4,
      discount:4,
      status:<span className="green">
        Delievered
      </span>,
      action:<Link to={`/order/dfjkef`}>View</Link>,
    }

  ])
  const table = TableHOC<DataType>(
    column,
    rows,
    "dashboard-product-box",
    "Orders",
    true)()


  return (
    <div className="container">
      <h1> My Orders</h1>
      {table}
    </div>
  )
}

export default Orders