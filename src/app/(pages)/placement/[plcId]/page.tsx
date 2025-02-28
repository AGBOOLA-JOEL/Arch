const Plcpage = async ({ params }: { params: Promise<{ plcId: string }> }) => {
  const plcId = (await params).plcId;
  return <div>page -{plcId}</div>;
};

export default Plcpage;
