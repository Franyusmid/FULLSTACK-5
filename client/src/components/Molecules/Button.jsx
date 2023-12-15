import { CheckCircleIcon } from "@heroicons/react/20/solid"
import {
  DocumentArrowUpIcon,
  ShieldExclamationIcon,
} from "@heroicons/react/24/outline"

function SelectIcon({ icon }) {
  console.log(icon)

  switch (icon) {
    case "check":
      return <CheckCircleIcon className="-ml-0.5 h-5 w-5" aria-hidden="true" />

    case "document":
      return (
        <DocumentArrowUpIcon className="-ml-0.5 h-5 w-5" aria-hidden="true" />
      )

    case "logout":
      return <ShieldExclamationIcon className="-ml-0.5 h-5 w-5" />

    default:
      return
  }
}

export default function Button({ message, icon, clickHandler }) {
  return (
    <>
      <button
        className="inline-flex items-center gap-x-1.5 rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        onClick={clickHandler}
      >
        <SelectIcon icon={icon} />
        {message}
      </button>
    </>
  )
}
