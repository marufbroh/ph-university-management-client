/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Checkbox, Form, Input } from "antd";
import { useLoginMutation } from "../redux/features/auth/authApi";
import { useAppDispatch } from "../redux/hooks";
import { TUser, setUser } from "../redux/features/auth/authSlice";
import { verifyToken } from "../utils/verifyToken";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { FieldValues } from "react-hook-form";
import PHForm from "../components/form/PHForm";
import PHInput from "../components/form/PHInput";

type FieldType = {
  id?: string;
  password?: string;
  //   remember?: string;
};

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [login] = useLoginMutation();

  const onFinish = async (values: FieldValues) => {
    const toastId = toast.loading("Logging in");
    try {
      const res = await login(values).unwrap();
      const user = verifyToken(res.data.accessToken) as TUser;

      dispatch(setUser({ user, token: res.data.accessToken }));
      toast.success("Logged in", { id: toastId });
      navigate(`/${user.role}/dashboard`);
    } catch (error) {
      toast.error("Something went wrong", { id: toastId });
    }
  };

  return (
    <PHForm onSubmit={onsubmit}>
      <div>
        <label htmlFor="id">ID: </label>
        <PHInput type={"text"} name={"userId"} />
      </div>
      <div>
        <label htmlFor="password">Password: </label>
        <PHInput type={"text"} name={"password"} />
      </div>
      <Button htmlType="submit">Login</Button>
    </PHForm>
  );
};

export default Login;
