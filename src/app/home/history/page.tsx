import { FC } from "react";
import HistoryScreen from "~/screens/history";

const History: FC <{ searchParams: { page: string } }> = ({ searchParams }) => <HistoryScreen page={searchParams.page || "1"} />

export default History