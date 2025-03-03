import { Provider } from "@/components/ui/provider";
import { For, HStack, Stack, Text } from "@chakra-ui/react";
import { Checkbox } from "@/components/ui/checkbox";
type RegRoleProp = {
  rank: string;
  handleRolechange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};
const RegisterRole = ({ rank, handleRolechange }: RegRoleProp) => {
  return (
    <Provider>
      <div className="rolecheck">
        <div className="rolecheck_desc">
          <p>Tell us more about yourself</p>
        </div>

        <div className="rolecheck_wrapper">
          {joinradiodata.map((data) => {
            return (
              <div className="rolecheck_container" key={data.value}>
                {/* <HStack align="flex-start"> */}
                <Stack align="flex-start" flex="1" key={data.value}>
                  <Text>{"outline"}</Text>
                  <Checkbox defaultChecked variant={"outline"}>
                    Checkbox
                  </Checkbox>
                </Stack>
                {/* </HStack> */}
                {/* <p>
                  <input
                    type="checkbox"
                    value={data.value}
                    name="rank"
                    checked={rank === data.value ? true : false}
                    onChange={handleRolechange}
                  />
                  <label htmlFor="radio"></label>
                </p> */}

                <p className="rolecheck_text">{data.value}</p>
              </div>
            );
          })}
        </div>
      </div>
    </Provider>
  );
};

export default RegisterRole;

export const joinradiodata = [
  {
    value: "Registered Architect",
  },
  {
    value: "Design professional",
  },
  {
    value: "Student Architect",
  },
  {
    value: "Others",
  },
];
