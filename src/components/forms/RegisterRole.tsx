type RoleProp = {
  rank: string;
  handleRoleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

const RegisterRole = ({ rank, handleRoleChange }: RoleProp) => {
  return (
    <div className="reg_role">
      <h1 className="reg_roledesc">Tell us more about yourself</h1>

      <div className="reg_rolemap">
        {RegRoledata.map((data) => {
          return (
            <div className="reg_roleinput" key={data.value}>
              <input
                type="checkbox"
                value={data.value}
                name={"rank"}
                checked={rank === data.value ? true : false}
                onChange={handleRoleChange}
              />

              <p>{data.value}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default RegisterRole;

export const RegRoledata = [
  { value: "Registered Architect" },
  { value: "Design professional" },
  { value: "Student Architect" },
  { value: "Others" },
];
