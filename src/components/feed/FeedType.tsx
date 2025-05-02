type TypeProp = {
  value?: string | number;
  setValue: (value: any) => void;
  setOpen: (value: boolean) => void;
  option: string[];
};

const FeedType = ({ setValue, setOpen, option }: TypeProp) => {
  return (
    <div className="feed_type">
      {option.map((data) => {
        return (
          <p
            key={data}
            onClick={() => {
              setValue(data);
              setOpen(false);
            }}
          >
            {data}
          </p>
        );
      })}
    </div>
  );
};

export default FeedType;
