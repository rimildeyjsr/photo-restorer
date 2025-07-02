import { Fragment } from "react";
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  Transition,
  TransitionChild,
} from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { PurchaseCredits } from "./PurchaseCredits";
import { PackageType } from "@/api/types/types";

interface PurchaseCreditsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onPurchase: (packageName: PackageType) => void;
  loading?: boolean;
}

export function PurchaseCreditsModal({
  isOpen,
  onClose,
  onPurchase,
  loading = false,
}: PurchaseCreditsModalProps) {
  return (
    <Transition show={isOpen} as={Fragment}>
      <Dialog onClose={onClose} className="relative z-50">
        <TransitionChild
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/25 backdrop-blur-sm" />
        </TransitionChild>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <TransitionChild
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <DialogPanel className="w-full max-w-3xl transform overflow-hidden rounded-2xl bg-white dark:bg-zinc-900 shadow-xl transition-all">
                <div className="relative p-6">
                  <button
                    onClick={onClose}
                    className="absolute top-4 right-4 rounded-full p-2 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
                  >
                    <XMarkIcon className="h-5 w-5" />
                  </button>

                  <PurchaseCredits onPurchase={onPurchase} loading={loading} />
                </div>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
