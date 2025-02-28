const Schpage = async ({ params }: { params: Promise<{ schId: string }> }) => {
  const schId = (await params).schId;
  return <div>page-{schId}</div>;
};

export default Schpage;
