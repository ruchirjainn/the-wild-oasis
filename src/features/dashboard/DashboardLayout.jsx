import styled from "styled-components";
import Spinner from "../../ui/Spinner";

import { useRecentBookings } from "./dashboardHooks/useRecentBookings";
import { useRecentStays } from "./dashboardHooks/useRecentStays";
import Stats from "./Stats";
import { useCabins } from "../cabins/cabinHooks/useCabins";
import SalesChart from "./SalesChart";

const StyledDashboardLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: auto 34rem auto;
  gap: 2.4rem;
`;

function DashboardLayout() {
  const { bookings, isLoading: isLoadingBookings } = useRecentBookings();
  const { cabins, isLoading: isLoadingCabins } = useCabins();
  const {
    stays,
    confirmedStays,
    isLoading: isLoadingStays,
    numDays,
  } = useRecentStays();

  if (isLoadingBookings || isLoadingStays || isLoadingCabins)
    return <Spinner />;

  return (
    <StyledDashboardLayout>
      <Stats
        bookings={bookings}
        confirmedStays={confirmedStays}
        numDays={numDays}
        cabinCount={cabins.length}
      />
      <div>Today activity</div>
      <div>Chart stay duration</div>
      <SalesChart bookings={bookings} numDays={numDays} />
    </StyledDashboardLayout>
  );
}

export default DashboardLayout;
