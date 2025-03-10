import { Suspense } from "react";
import SelectRole from "./page";


export default function Layout() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SelectRole />
    </Suspense>
  );
}
