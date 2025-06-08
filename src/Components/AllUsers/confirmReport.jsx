import { Tooltip } from "@material-tailwind/react";

function ConfirmReport({
  isOpen,
  setIsOpen,
  submitReport,
  Id,
  report,
  setReport,
}) {
  //   let reporterId = null;
  //   let reportedId = null;

  //   function openReportDialog(fromUserId, toUserId) {
  //     reporterId = fromUserId;
  //     reportedId = toUserId;
  //     document
  //       .getElementById("report-dialog-backdrop")
  //       .classList.remove("hidden");
  //   }

  return (
    <>
      {isOpen && (
        <div
          id="report-dialog-backdrop"
          className=" fixed inset-0 z-[999] grid h-screen w-screen place-items-center bg-black bg-opacity-60 backdrop-blur-sm transition-opacity duration-300"
        >
          <div
            id="report-dialog"
            className="relative mx-auto w-full max-w-[24rem] rounded-lg overflow-hidden shadow-sm bg-white"
          >
            <div className="relative flex flex-col">
              <div className="relative m-2.5 items-center flex justify-center text-white h-24 rounded-md bg-red-600">
                <h3 className="text-2xl">Report User</h3>
              </div>

              <div className="flex flex-col gap-4 p-6">
                <div className="w-full max-w-sm min-w-[200px]">
                  <label className="block mb-2 text-sm text-slate-600">
                    Reason for Reporting
                  </label>
                  <textarea
                    id="report-reason"
                    rows="4"
                    className="w-full resize-none bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-red-400 hover:border-slate-300 shadow-sm focus:shadow"
                    placeholder="Write the reason here..."
                    value={report}
                    onChange={(e) => setReport(e.target.value)}
                  ></textarea>
                </div>
              </div>

              <div class="p-6 pt-0">
                <button
                  onclick="submitReport()"
                  className="w-full rounded-md bg-red-600 py-2 px-4 border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg focus:bg-red-500 active:bg-red-500 active:shadow-none"
                  onClick={() => submitReport(Id)}
                >
                  Submit Report
                </button>
                <p className="flex justify-center mt-6 text-sm text-slate-600">
                  Reporting is anonymous and helps keep the community safe.
                </p>
                <button
                  onclick="closeReportDialog()"
                  className="mt-4 text-sm text-gray-600 underline hover:text-gray-800"
                  onClick={() => setIsOpen(false)}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default ConfirmReport;
