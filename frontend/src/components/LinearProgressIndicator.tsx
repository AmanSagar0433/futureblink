import { useAppSelector } from "../hooks/useRedux";
import { Bar, HorizontalLoadingBar } from "./shadcn/horizontalLoadingBar";
import clsx from "clsx";

const LinearProgressIndicator = () => {
  const loadingIndicator = useAppSelector((state) => state.loadingIndicator);

  return (
    <>
      <HorizontalLoadingBar
        className={clsx("absolute", {
          hidden: !loadingIndicator,
        })}
      >
        <Bar />
      </HorizontalLoadingBar>
    </>
  );
};

export default LinearProgressIndicator;
