import * as React from "react";
import { useSelector } from "react-redux";
import { RootState } from "config/store";

const StageFinish = () => {
  const state = useSelector((state: RootState) => state.form);

  return (
    <div>
      <p>finish</p>
      <pre>{JSON.stringify(state, null, 2)}</pre>
    </div>
  );
};

export default StageFinish;
