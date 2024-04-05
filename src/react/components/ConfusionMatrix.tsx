import { useState } from "react";

export function ConfusionMatrix() {
  const categories = ["A", "B", "C", "D"];
  const [cols] = useState(5);
  return (
    <div>
      <div>Actual category</div>
      <div>Expected category</div>
      {categories.map((expected) => (
        <div className={`grid grid-cols-[${cols}]`}>
          <title>kkk: {expected}</title>
          {categories.map((actual) => (
            <div>
              {expected} {actual}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
