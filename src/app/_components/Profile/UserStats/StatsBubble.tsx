const StatsBubble = ({ data, title }: { data?: number | string | null; title?: string }) => {
    return (
        <div className="m-4 flex h-24 min-w-44 w-fit flex-shrink flex-col justify-between rounded-xl bg-slate-700 p-4 shadow-md sm:w-fit">
            <div className="text-sm font-semibold uppercase tracking-wide text-indigo-500">
                {title}
            </div>
            <p className="mt-2 text-indigo-100">{data}</p>
        </div>
    );
};
export default StatsBubble;