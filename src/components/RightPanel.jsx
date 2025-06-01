import React from "react";
import { usePlan } from "./PlanContext";
import { FaTrash } from "react-icons/fa";
import { useDebug } from "./DebugContext";

export default function RightPanel() {
  const { selected, remove, addOrUpdate } = usePlan();
  const { isDebug } = useDebug();

  return (
    <div className="bg-gray-100 p-4 rounded-lg">
      <h2 className="text-lg font-bold mb-4">Title</h2>

      {/* Safeguard against empty selections */}
      {Object.entries(selected).map(([groupId, options]) =>
        Object.entries(options).map(([optionId, opt]) => {
          const minQty = opt.min || 0;
          const qty = opt.qty ?? minQty;

          return (
              <div
              className={`mt-3 ${
              isDebug ? "debug-border" : ""
              }`}
              >
              <h3 className="font-semibold text-sm mb-1">{opt.name || groupId}</h3>
              <div className="text-sm text-gray-700">{`Option ${optionId} £${opt.price}`}</div>
              <div className="text-sm text-gray-500">{`${opt.term} / ${opt.billing}`}</div>

              <div className="flex items-center gap-2 mt-2">
                {/* Quantity control */}
                <div className="flex-grow">
                  <div className="flex items-center rounded-md border border-black overflow-hidden text-sm h-[32px] w-max">
                    <button
                    disabled={qty <= minQty}
                    onClick={() =>
                    addOrUpdate(groupId, optionId, {
                    ...opt,
                    qty: qty - 1,
                    })
                    }
                    className={`px-2 text-sm h-full bg-white ${
                    qty <= minQty ? "text-gray-300 cursor-not-allowed" : "text-gray-500"
                    }`}
                    >
                    −
                    </button>
                    <div className="h-full w-[52px] border-x border-black font-medium flex items-center justify-center text-center bg-white">
                      {qty}
                    </div>
                    <button
                      className="px-2 text-sm text-black h-full bg-white"
                      onClick={() =>
                        addOrUpdate(groupId, optionId, {
                          ...opt,
                          qty: qty + 1,
                        })
                      }
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Trash button */}
                <button
                  className="flex items-center justify-center text-sm px-4 py-2.5 rounded-md"
                  onClick={() => remove(groupId, optionId)}
                  title="Remove"
                >
                  <FaTrash className="text-red-500 text-sm" />
                </button>
              </div>
            </div>
          );
        })
      )}
    </div>
  );
}
