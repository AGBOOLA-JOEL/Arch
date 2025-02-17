const page = () => {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  return (
    <div className="home">
      page {apiUrl}
      <div className="home_box">dddd</div>
    </div>
  );
};

export default page;
