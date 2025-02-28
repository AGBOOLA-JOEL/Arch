import React from "react";

const Propage = async ({ params }: { params: Promise<{ slug: string[] }> }) => {
  const { slug } = await params;
  return (
    <div>
      slug 1 {slug[0]}
      slug 2{slug[1]}
    </div>
  );
};

export default Propage;
