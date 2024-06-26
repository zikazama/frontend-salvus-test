import { useEffect, useState } from "react";
import instance from "../utils/axios";
import { useAuthStore } from "../store/useAuthStore";

export default function Dashboard() {
  const [stats, setStats] = useState([
    {
      id: 1,
      name: "Total Overtime",
      value: 0,
    },
    {
      id: 2,
      name: "Total Transaction",
      value: 0,
    },
    {
      id: 3,
      name: "Total Transaction Item",
      value: 0,
    },
    {
      id: 4,
      name: "Total Menu",
      value: 0,
    },
  ]);

  const authStore = useAuthStore();
  instance.defaults.headers.common["Authorization"] = authStore.token ?? "";

  useEffect(() => {
    console.log("Dashboard mounted");
    // instance get
    instance.get("/dashboard").then((res) => {
        setStats([
        {
          id: 1,
          name: "Total Overtime",
          value: res.data.data.total_overtime,
        },
        {
          id: 2,
          name: "Total Transaction",
          value: res.data.data.total_transaction,
        },
        {
          id: 3,
          name: "Total Transaction Item",
          value: res.data.data.total_transaction_item,
        },
        {
          id: 4,
          name: "Total Menu",
          value: res.data.data.total_menu,
        },
      ]);
      // set state
    });
  }, []);

  return (
    <div className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <dl className="grid grid-cols-1 gap-x-8 gap-y-16 text-center lg:grid-cols-2">
          {stats.map((stat) => (
            <div
              key={stat.id}
              className="mx-auto flex max-w-xs flex-col gap-y-4"
            >
              <dt className="text-base leading-7 text-gray-600">{stat.name}</dt>
              <dd className="order-first text-3xl font-semibold tracking-tight text-gray-900 sm:text-5xl">
                {stat.value}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  );
}
