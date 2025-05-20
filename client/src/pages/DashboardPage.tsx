export const DashboardPage = () => {
  return (
    <div className="flex flex-col h-full w-full ">
      <div className="p-5 px-20 flex flex-col gap-2">
        <h2 className="text-base-content text-3xl font-bold">Dashboard</h2>
        <p className="text-base-content/50">
          {new Date().toLocaleDateString("en-US", { weekday: "long", month: "long", year: "numeric", day: "2-digit" })}
        </p>
      </div>
    </div>
  );
};
